import { Download, ExternalLink } from 'lucide-react'
import { profile } from '@/data/profile'

/** Serve the reviewed PDF instead of rebuilding a different layout in the browser. */
export default function ResumeGenerator() {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={profile.resume.url} download={profile.resume.filename} className="btn btn-primary gap-2 font-medium">
        <Download className="h-4 w-4" aria-hidden="true" />
        Download CV
      </a>
      <a href={profile.resume.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline gap-2 font-medium">
        View PDF <ExternalLink className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  )
}
