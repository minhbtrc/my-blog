import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Minh Bui',
  description: 'Generate a PDF resume based on your About page content',
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 