// File: app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediaWave - Social Media Content Downloader",
  description:
    "Download photos and videos from Instagram, Facebook, Twitter, TikTok, and YouTube with just a URL paste.",
  keywords:
    "social media downloader, instagram downloader, facebook downloader, twitter downloader, tiktok downloader, youtube downloader, video downloader, image downloader",
  authors: [{ name: "MediaWave Team" }],
  creator: "MediaWave",
  publisher: "MediaWave",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "MediaWave - Download Social Media Content",
    description:
      "Easily download photos and videos from Instagram, Facebook, Twitter, TikTok, and YouTube.",
    siteName: "MediaWave",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MediaWave - Social Media Content Downloader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediaWave - Social Media Content Downloader",
    description:
      "Download photos and videos from major social platforms with a single click",
    images: ["/twitter-image.png"],
    creator: "@mediawave",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#222222" },
  ],
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "dark:bg-gray-800 dark:text-white",
              style: {
                border: "1px solid",
                borderColor: "var(--border)",
                padding: "16px",
                color: "var(--foreground)",
                background: "var(--background)",
              },
              success: {
                iconTheme: {
                  primary: "#9333ea",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
