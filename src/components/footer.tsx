import Link from "next/link";
import {
  Sparkles,
  Copyright,
  Instagram,
  Youtube,
  Facebook,
  Music,
  Globe,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:py-10">
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <Link href="/" className="mb-2 flex items-center gap-2">
            <div className="rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-1.5">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-md font-semibold">
              Social Media Downloader
            </span>
          </Link>
          <p className="max-w-md text-sm text-muted-foreground">
            Download videos from Instagram, YouTube, TikTok, Facebook, and
            Twitter quickly and easily. This tool is for personal use only and
            respects content creators' rights.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 text-center sm:items-end sm:text-right">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium sm:justify-end">
            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About Us
            </Link>
            <Link
              href="/terms-of-service"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </nav>

          {/* Platform Icons */}
          <div className="flex gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Instagram className="h-4 w-4" />
              <Youtube className="h-4 w-4" />
              <Music className="h-4 w-4" />
              <Facebook className="h-4 w-4" />
              <Globe className="h-4 w-4" />
            </div>
          </div>

          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Copyright className="h-3 w-3" /> {currentYear} Social Media
            Downloader. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Not affiliated with any social media platforms.
          </p>
        </div>
      </div>
    </footer>
  );
}
