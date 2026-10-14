#!/usr/bin/env python3
"""Build the reviewed three-page CV from the same JSON used by the website.

Run --check in CI to detect source/PDF/preview drift without regenerating artifacts.
Requires scripts/requirements-resume.txt; generation also needs pdftoppm (Poppler).
"""
import argparse
import hashlib
import json
import os
import shutil
import subprocess
import tempfile
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCES = [ROOT / 'src/db' / f'{name}.json' for name in
           ('profile', 'experiences', 'projects', 'skills', 'education', 'certificates')]
SOURCES += [Path(__file__).resolve(), ROOT / 'scripts/requirements-resume.txt']
OUTPUT = ROOT / 'public/resume'
MANIFEST = OUTPUT / 'manifest.json'

def load(name):
    return json.loads((ROOT / 'src/db' / f'{name}.json').read_text())

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def source_digest():
    result = hashlib.sha256()
    for path in SOURCES:
        result.update(str(path.relative_to(ROOT)).encode())
        result.update(path.read_bytes())
    return result.hexdigest()

def verify_content(path, profile):
    from pypdf import PdfReader
    assert not {'email', 'phone', 'address', 'dateOfBirth'} & profile.keys(), 'Private contact fields must not be published'
    reader = PdfReader(path)
    assert len(reader.pages) == profile['resume']['pages'], 'Unexpected page count'
    text = '\n'.join(page.extract_text() for page in reader.pages)
    normalize = lambda value: ' '.join(value.split())
    expected = [profile['name'].upper(), profile['title'], profile['summary']]
    for company in load('experiences'):
        expected.append(company['company'])
        for position in company['positions']:
            expected += [position['title'], position['period'], position['description']]
            expected += position['points']
            for section in position.get('sections', []):
                expected += [section['title'], *section['points']]
    for project in (item for item in load('projects') if item.get('resume', True)):
        expected += [project['title'], *project.get('points', [])]
    for edu in (item for item in load('education') if item.get('resume', True)):
        expected += [edu['title'], edu['institution'], edu['period']]
    for cert in load('certificates'):
        if cert.get('resume'):
            expected += [cert['name'], cert['issuer'], cert['date']]
    import re
    assert not re.search(r'[\w.+-]+@[\w.-]+\.[a-z]{2,}', text, re.I), 'Personal email in public PDF'
    for page in reader.pages:
        for annotation in page.get('/Annots', []):
            uri = str(annotation.get_object().get('/A', {}).get('/URI', ''))
            assert not uri.lower().startswith(('mailto:', 'tel:')), 'Private contact link in public PDF'
    normalized = normalize(text)
    for item in expected:
        assert normalize(item) in normalized, f'PDF content missing: {item}'
    return text

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    profile = load('profile')
    pdf_path = OUTPUT / profile['resume']['filename']
    if args.check:
        manifest = json.loads(MANIFEST.read_text())
        assert manifest['sourceSha256'] == source_digest(), 'CV source changed: rebuild the PDF and preview'
        for filename, sha in manifest['files'].items():
            assert digest(OUTPUT / filename) == sha, f'Artifact changed: {filename}'
        verify_content(pdf_path, profile)
        print('PASS: website data, all PDF content, three-page layout and preview hashes are in sync')
        return

    from reportlab.pdfgen import canvas
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.platypus import Paragraph
    from reportlab.lib.colors import HexColor
    from reportlab.lib.pagesizes import A4

    poppler = shutil.which('pdftoppm')
    if not poppler:
        raise SystemExit('Install Poppler (pdftoppm) before generating the PDF preview.')
    font_dir = Path(os.environ.get('RESUME_FONT_DIR', '/System/Library/Fonts/Supplemental'))
    font_files = [('Body', 'Arial.ttf'), ('Bold', 'Arial Bold.ttf'), ('Title', 'Times New Roman.ttf')]
    fonts = {'Body': 'Helvetica', 'Bold': 'Helvetica-Bold', 'Title': 'Times-Roman'}
    if all((font_dir / file).exists() for _, file in font_files):
        for name, file in font_files:
            pdfmetrics.registerFont(TTFont(name, str(font_dir / file)))
            fonts[name] = name
        pdfmetrics.registerFontFamily('Body', normal='Body', bold='Bold', italic='Body', boldItalic='Bold')
    w, h = A4
    left, right = 47, w - 47
    width = right - left
    ink, gray, rule = '#202124', '#555960', '#A7ABB0'
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='resume-') as temp:
        staged_pdf = Path(temp) / pdf_path.name
        c = canvas.Canvas(str(staged_pdf), pagesize=A4, invariant=True)
        c.setTitle(f"{profile['name']} - {profile['title']}")
        c.setAuthor(profile['name'])

        def paragraph(text, y, x=left, available=width, font='Body', size=10, leading=14, color=ink, align=0):
            # Only trusted renderer markup enters here; all JSON text is escaped at the call site.
            item = Paragraph(text, ParagraphStyle('p', fontName=fonts[font], fontSize=size,
                             leading=leading, textColor=HexColor(color), alignment=align))
            _, height = item.wrap(available, 1000)
            if y < 0 or y + height > 818:
                raise ValueError(f'PDF text outside page: {text[:60]}')
            item.drawOn(c, x, h - y - height)
            return y + height

        def line(y):
            c.setStrokeColor(HexColor(rule)); c.setLineWidth(.45)
            c.line(left, h-y, right, h-y)

        def section(text, y):
            y = paragraph(escape(text.upper()), y, font='Bold', size=9.3, leading=13)
            line(y+5)
            return y+15

        def entry(title, subtitle, date, y):
            paragraph(escape(date), y+1, x=right-142, available=142, size=9, leading=13, color=gray, align=2)
            y = paragraph(escape(title), y, available=width-145, font='Bold', size=11, leading=15)
            if subtitle:
                y = paragraph(escape(subtitle), y+2, size=9.4, leading=13, color=gray)
            return y+7

        def points(items, y):
            if not items:
                return y
            for text in items:
                paragraph('•', y, available=8, size=9.5)
                y = paragraph(escape(text), y, x=left+12, available=width-12)+5
            return y+7

        def company_block(company, y):
            for position in company['positions']:
                y = entry(company['company'], position['title'], position['period'], y)
                if position['description']:
                    y = paragraph(escape(position['description']), y)+13
                y = points(position['points'], y)
                for group in position.get('sections', []):
                    y = paragraph(escape(group['title']), y, font='Bold')+6
                    y = points(group['points'], y)
            return y

        def footer(page, end):
            if end >= 784:
                raise ValueError(f'Page {page} content exceeds the reviewed layout ({end:.1f} pt); edit pagination, never silently clip.')
            line(796)
            paragraph(escape(profile['name'].upper()), 805, size=7.3, leading=10, color=gray)
            paragraph(f"{page} / {profile['resume']['pages']}", 805, x=right-40, available=40, size=8, leading=10, color=gray, align=2)
            print(f'Page {page}: content ends at {end:.1f} pt')

        def next_page(page, end):
            footer(page, end); c.showPage()
            paragraph(escape(profile['name'].upper()), 38, font='Bold', size=10)
            paragraph(escape(profile['title']), 38, x=right-180, available=180, size=9, color=gray, align=2)
            return 72

        def link(url, label):
            return f'<link href="{escape(url, quote=True)}" color="{ink}">{escape(label)}</link>'

        y = paragraph(escape(profile['name'].upper()), 38, font='Title', size=27, leading=33)
        y = paragraph(escape(profile['title']), y+3, font='Bold', size=11.5, leading=16)
        y = paragraph(escape(profile['tagline']), y+2, size=9.6, color=gray)
        contacts = [escape(profile['location'])]
        y = paragraph(' | '.join(contacts), y+9, size=8.7, leading=12)
        y = paragraph(' | '.join(link(profile[key], profile[key].removeprefix('https://').removeprefix('www.').rstrip('/')) for key in ['github','linkedin']), y+2, size=8.7, leading=12)
        line(y+11)
        y = paragraph(escape(profile['summary']), y+23)+17
        y = section('Professional experience', y)
        companies = load('experiences')
        y = company_block(companies[0], y)
        y = next_page(1, y)
        y = section('Professional experience / continued', y)
        for company in companies[1:]:
            y = company_block(company, y)
        y = section('Technical expertise', y+3)
        for group in (item for item in load('skills') if item.get('resume', True)):
            y = paragraph(f"<b>{escape(group['title'])}:</b> {escape(', '.join(group['skills']))}.", y, size=9.7, leading=13.5)+7
        y = next_page(2, y)
        y = section('Selected engineering projects', y)
        for project in (item for item in load('projects') if item.get('resume', True)):
            y = entry(project['title'], ' | '.join(project['tags']), project.get('status', ''), y)
            y = points(project.get('points', []), y)
            if project.get('url'):
                y = paragraph(link(project['url'], project['url'].removeprefix('https://')), y-3, size=8.8, leading=12, color=gray)+15
        y = section('Education', y)
        for edu in (item for item in load('education') if item.get('resume', True)):
            y = entry(edu['title'], edu['institution'], edu['period'], y)+6
        y = section('Professional development', y+2)
        courses = [f"{escape(cert['name'])} - {escape(cert['issuer'])} ({escape(cert['date'])})" for cert in load('certificates') if cert.get('resume')]
        y = paragraph('<br/>'.join(courses), y, size=9.2, color=gray)
        footer(3, y); c.save()
        verify_content(staged_pdf, profile)
        subprocess.run([poppler, '-f','1','-singlefile','-scale-to','1200','-png',str(staged_pdf),str(Path(temp)/'preview')], check=True)
        # Publish artifacts only after all validation succeeds.
        shutil.copyfile(staged_pdf, pdf_path)
        shutil.copyfile(Path(temp)/'preview.png', OUTPUT/'preview.png')
    manifest = {'sourceSha256': source_digest(), 'files': {name: digest(OUTPUT/name) for name in [pdf_path.name,'preview.png']}}
    MANIFEST.write_text(json.dumps(manifest, indent=2)+'\n')
    print(f'Built {pdf_path.relative_to(ROOT)} and preview.png')

if __name__ == '__main__':
    main()
