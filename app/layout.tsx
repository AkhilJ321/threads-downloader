import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thread-Downloader',
  description: 'Instagram Thread Downloader App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-gradient-to-r from-rose-100 via-rose-200 to-rose-300">
        {children}
      </body>
    </html>
  );
}
