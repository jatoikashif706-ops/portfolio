import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Base configuration for site metadata
const siteConfig = {
  name: "Kashif Qurban - Software Engineer Portfolio",
  description:
    "Full-Stack Software Engineer specializing in Next.js, React Native, TypeScript, and AI integrations. Building high-performance web and mobile applications.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourportfolio.com",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/jatoikashif706-ops",
    linkedin: "https://www.linkedin.com/in/kashif-qurban-92594228a/",
    email: "mailto:jatoikashif706@gmail.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617", // Tailwind slate-950
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Full-Stack Web & Mobile Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js 15",
    "React Native",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "Node.js",
    "Mobile App Developer",
  ],
  authors: [{ name: "Kashif Qurban", url: siteConfig.url }],
  creator: "Kashif Qurban",
  publisher: "Kashif Qurban",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // OpenGraph (Facebook, LinkedIn, Discord)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Software Engineering Portfolio`,
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  // Favicons & Manifest
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
