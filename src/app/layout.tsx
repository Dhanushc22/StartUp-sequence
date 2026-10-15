import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Nexitech | Digital Engineering & Enterprise AI Solutions",
  description: "Nexitech builds what comes next: high-performance web platforms, intelligent mobile applications, custom enterprise software, and frontier AI solutions for ambitious businesses.",
  keywords: [
    "Digital Engineering",
    "Enterprise AI Solutions",
    "Web Application Development",
    "Mobile Applications",
    "Custom Software",
    "Autonomous AI Agents",
    "Nexitech"
  ],
  authors: [{ name: "Nexitech Technologies" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Nexitech | Digital Engineering & Enterprise AI Solutions",
    description: "Creating the next generation of digital products. High-performance web, mobile, and AI solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Nexitech",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" data-fx="full">
      <body className="min-h-full flex flex-col font-matter bg-sf text-tx overscroll-none overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
