import ResumeGenerator from '@/components/ResumeGenerator';

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Resume</h1>
      
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium mb-3">Generate your professional resume</h2>
        <p className="text-gray-600 mb-4">
          This tool creates a professional PDF resume based on your profile information from the About page. 
          Choose to download the PDF directly or view it in your browser first.
        </p>
        <ResumeGenerator />
      </div>
      
      <div className="mt-8 text-gray-600 text-sm">
        <h3 className="font-medium mb-2">Troubleshooting</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>If direct download doesn't work, use the "View in Browser" option</li>
          <li>From the browser preview, you can save the PDF using your browser's print or save options</li>
          <li>Some browsers may block automatic downloads - check your browser settings</li>
          <li>The resume is formatted for A4 paper size and ready for printing</li>
        </ul>
      </div>
    </div>
  );
} 