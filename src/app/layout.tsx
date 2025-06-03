// import { Metadata } from "next";
// import { DM_Sans as FontSans } from "next/font/google";

// import { Navbar, Footer } from "@/components/layout";
// import { AdSense } from "@/components/adsense/AdSense";
// import { ThemeProvider } from "@/components/providers/theme-provider";
// import { ReactQueryProvider } from "@/components/providers/react-query-provider";

// import { cn } from "@/lib/utils";

// import "./globals.css";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// export const metadata: Metadata = {
//   title: "Instagram Video Downloader",
//   description: "Download Instagram Videos",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <AdSense pId="9504654793147997"/>
//       </head>
//       <body
//         className={cn(
//           fontSans.variable,
//           "overflow-x-hidden bg-background font-sans antialiased"
//         )}
//       >
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <ReactQueryProvider>
//             <Navbar />
//             <main className="relative h-[calc(100vh-6rem)] overflow-y-auto px-2 sm:px-4">
//               {children}
//             </main>
//             <Footer />
//           </ReactQueryProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import type React from "react";
import type { Metadata, Viewport } from "next";
import { DM_Sans as FontSans } from "next/font/google";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AdSense } from "@/components/adsense/AdSense"; // Assuming this is for loading AdSense script
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";

import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Improves font loading performance
});

// Site-wide metadata (can be overridden by individual pages)
export const metadata: Metadata = {
  // Recommended: Use a template for titles to ensure consistency
  // Individual pages can then set metadata.title and it will be appended/prepended
  title: {
    default: "Instagram Downloader - Download Reels, Videos & Stories",
    template: "%s | Instagram Downloader", // Example: "About Us | Instagram Downloader"
  },
  description:
    "Easily download Instagram videos, reels, stories, and IGTV content in high quality. Fast, free, and simple to use Instagram downloader tool. No login required.",
  keywords: [
    "instagram downloader",
    "download instagram videos",
    "instagram reels downloader",
    "instagram story downloader",
    "save instagram videos",
    "ig downloader",
    "instagram video saver",
    "free instagram downloader",
  ],
  authors: [
    {
      name: "Your Site Name or Your Name",
      url: "https://instagram-reels-downloader-tau.vercel.app",
    },
  ], // Replace
  creator: "Your Site Name or Your Name", // Replace
  publisher: "Your Site Name or Your Name", // Replace
  manifest: "/site.webmanifest", // Create this file for PWA capabilities
  icons: {
    icon: "/favicon.ico", // Standard favicon
    shortcut: "/favicon-16x16.png", // For older browsers
    apple: "/apple-touch-icon.png", // For Apple devices
    // You can add more sizes here if needed
  },
  // Open Graph (for social sharing - Facebook, LinkedIn, etc.)
  openGraph: {
    title: "Instagram Downloader - Download Reels, Videos & Stories",
    description:
      "The easiest way to download Instagram videos, reels, and stories online. Free, fast, and high quality.",
    url: "https://instagram-reels-downloader-tau.vercel.app", // Replace with your site's canonical URL
    siteName: "Instagram Downloader", // Replace with your site name
    images: [
      {
        url: "https://instagram-reels-downloader-tau.vercel.app/og-image.png", // Replace with your default OG image URL (e.g., 1200x630px)
        width: 1200,
        height: 630,
        alt: "Instagram Downloader - Download Instagram Content",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter Card (for Twitter sharing)
  twitter: {
    card: "summary_large_image",
    title: "Instagram Downloader - Fast & Free IG Video Saver",
    description:
      "Download your favorite Instagram videos, reels, and stories quickly and easily with our free online tool.",
    // site: "@yourtwitterhandle", // Optional: Your Twitter handle
    // creator: "@yourtwitterhandle", // Optional: Content creator's Twitter handle
    images: [
      "https://instagram-reels-downloader-tau.vercel.app/twitter-image.png",
    ], // Replace with your Twitter card image URL (e.g., 1200x600px or 1:1 for summary)
  },
  // Robots directives (general guidance for crawlers)
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
  // Optional: If your site has an RSS feed or sitemap
  // alternates: {
  //   canonical: "https://instagram-reels-downloader-tau.vercel.app", // Base canonical URL
  //   types: {
  //     "application/rss+xml": "https://instagram-reels-downloader-tau.vercel.app/rss.xml",
  //   },
  // },
  // Verification for search consoles (optional, can also be done via DNS or HTML file)
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  //   yandex: "YOUR_YANDEX_SITE_VERIFICATION_CODE",
  //   other: {
  //     "msvalidate.01": "YOUR_BING_SITE_VERIFICATION_CODE",
  //   },
  // },
  appleWebApp: {
    title: "Instagram Downloader",
    statusBarStyle: "default", // or "black-translucent"
    capable: true,
  },
  formatDetection: {
    telephone: false, // Disable auto-detection of phone numbers if not needed
  },
  // If you have specific category for your website
  // category: "utility",
};

// Viewport settings for responsiveness and theme color
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Optional: Prevents zooming, consider accessibility implications
  themeColor: [
    // For browser UI theming
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }, // Replace with your light theme color
    { media: "(prefers-color-scheme: dark)", color: "#000000" }, // Replace with your dark theme color
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* AdSense script loader - ensure pId is correct */}
        {/* The AdSense component should ideally only load the script here. */}
        {/* If it renders UI, that part should be in the body. */}
        <AdSense pId="9504654793147997" />
        {/* Other head elements like custom fonts not handled by Next/Font, verification tags, etc. */}
      </head>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased", // Added flex flex-col
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Header /> {/* Your site header */}
            <main className="relative w-full flex-grow overflow-y-auto px-2 py-4 sm:px-4">
              {" "}
              {/* Adjusted for flex layout and added padding */}
              {children}
            </main>
            <Footer /> {/* Your site footer */}
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
