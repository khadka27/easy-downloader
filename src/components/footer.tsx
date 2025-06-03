import Link from "next/link"
import { Instagram, Copyright } from "lucide-react" // Assuming you might want social icons

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:py-10 max-w-screen-2xl">
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div className="rounded-md bg-gradient-to-r from-purple-500 to-pink-500 p-1.5">
              <Instagram className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold text-md">Instagram Downloader</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-md">
            Download Instagram videos, reels, stories, and IGTV content quickly and easily. This tool is for personal
            use only and respects content creators' rights.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 text-center sm:items-end sm:text-right">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium sm:justify-end">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            {/* <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link> */}
          </nav>
          {/* Optional Social Links
          <div className="flex gap-3">
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
          */}
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Copyright className="h-3 w-3" /> {currentYear} Instagram Downloader. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground">Not affiliated with Instagram or Meta Platforms, Inc.</p>
        </div>
      </div>
    </footer>
  )
}
