import type { Metadata } from "next";
import {
  Users,
  Target,
  Zap,
  ShieldCheck,
  Heart,
  Info,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us - Social Media Downloader",
  description:
    "Learn more about Social Media Downloader, our mission to provide a fast, free, and easy way to download videos from Instagram, YouTube, TikTok, Facebook, and Twitter. Discover our commitment to user experience and privacy.",
  keywords: [
    "about social media downloader",
    "our mission",
    "video downloader",
    "free video downloader",
    "social media content saver",
    "instagram downloader",
    "youtube downloader",
    "tiktok downloader",
    "facebook downloader",
    "twitter downloader",
  ],
  openGraph: {
    title: "About Social Media Downloader - Your Free Video Saver",
    description:
      "Discover the story behind Social Media Downloader and our dedication to a seamless user experience across multiple platforms.",
    url: "https://instagram-reels-downloader-tau.vercel.app/about", // Replace with your actual URL
    type: "article",
    images: [
      {
        url: "/placeholder.svg?width=1200&height=630", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "About Social Media Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Social Media Downloader",
    description:
      "Learn about our free tool for downloading videos from multiple social media platforms.",
    images: ["/placeholder.svg?width=1200&height=630"], // Replace with your actual Twitter image
  },
};

const AboutPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center sm:mb-12">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          About Social Media Downloader
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 sm:mt-4">
          Your simple, fast, and free solution for saving videos from multiple
          social media platforms.
        </p>
      </header>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-8 lg:p-10">
        <div className="prose prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-p:leading-relaxed prose-a:text-purple-600 hover:prose-a:text-purple-700 dark:prose-a:text-purple-400 dark:hover:prose-a:text-purple-300 mx-auto max-w-none">
          <p className="mb-6 rounded-md border-l-4 border-purple-500 bg-purple-50 p-4 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200">
            <Info className="mr-2 inline-block h-5 w-5 align-text-bottom" />
            Welcome! We're passionate about making it easy for you to save and
            enjoy your favorite videos from Instagram, YouTube, TikTok,
            Facebook, and Twitter.
          </p>

          <section>
            <h2>
              <Target className="mr-2 inline-block h-7 w-7 align-bottom text-purple-600 dark:text-purple-400" />
              Our Mission
            </h2>
            <p>
              At Social Media Downloader, our mission is straightforward: to
              provide a user-friendly, reliable, and free tool that allows
              anyone to quickly download videos from multiple social media
              platforms. We believe that accessing publicly shared content for
              personal use should be simple and hassle-free across all major
              platforms.
            </p>
          </section>

          <section>
            <h2>
              <Zap className="mr-2 inline-block h-7 w-7 align-bottom text-purple-600 dark:text-purple-400" />
              What We Offer
            </h2>
            <p>
              Our platform is designed with you in mind, offering features like:
            </p>
            <ul>
              <li>
                <strong>Multi-Platform Support:</strong> Download videos from
                Instagram, YouTube, TikTok, Facebook, and Twitter all in one
                place.
              </li>
              <li>
                <strong>Easy-to-Use Interface:</strong> Just paste the video
                link, and you're ready to go. No complicated steps.
              </li>
              <li>
                <strong>High-Quality Downloads:</strong> Save videos in the best
                available quality with multiple resolution options.
              </li>
              <li>
                <strong>Video Preview:</strong> Watch videos before downloading
                to ensure it's the right content.
              </li>
              <li>
                <strong>No Registration Required:</strong> Use our service
                instantly without needing to create an account or log in.
              </li>
              <li>
                <strong>Completely Free:</strong> Our core downloading service
                is offered at no cost.
              </li>
              <li>
                <strong>Fast and Reliable:</strong> We strive to provide quick
                download speeds and a dependable service.
              </li>
            </ul>
          </section>

          <section>
            <h2>
              <Heart className="mr-2 inline-block h-7 w-7 align-bottom text-purple-600 dark:text-purple-400" />
              Why Choose Us?
            </h2>
            <p>
              In a sea of online tools, we aim to stand out by focusing on
              simplicity, speed, and user trust. We understand that you want a
              tool that just works, without intrusive ads or confusing
              processes. We are committed to maintaining a clean and efficient
              platform that works across all major social media platforms.
            </p>
            <p>
              We continuously work on improving our service to ensure
              compatibility with platform updates and to enhance your experience
              across all supported social media sites.
            </p>
          </section>

          <section>
            <h2>
              <ShieldCheck className="mr-2 inline-block h-7 w-7 align-bottom text-purple-600 dark:text-purple-400" />
              Our Commitment to You
            </h2>
            <p>
              Your experience and privacy are important to us. While our service
              is free, we are committed to:
            </p>
            <ul>
              <li>
                <strong>User Privacy:</strong> We aim to minimize data
                collection. As detailed in our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>, we do not
                store your downloaded content or the links you paste, beyond
                what's necessary for the immediate download process.
              </li>
              <li>
                <strong>Transparency:</strong> We believe in being open about
                how our service works and how we manage data, especially
                concerning third-party advertising which helps keep our service
                free.
              </li>
              <li>
                <strong>Respect for Copyright:</strong> Our tool is intended for
                downloading publicly available content for personal, fair use.
                We encourage all users to respect the intellectual property
                rights of content creators. Please do not use this tool to
                download copyrighted material without permission.
              </li>
            </ul>
          </section>

          <section>
            <h2>Supported Platforms</h2>
            <p>We currently support downloading from:</p>
            <ul>
              <li>
                <strong>Instagram:</strong> Videos, Reels, Stories, and IGTV
                content
              </li>
              <li>
                <strong>YouTube:</strong> Videos and Shorts
              </li>
              <li>
                <strong>TikTok:</strong> Videos and Sounds
              </li>
              <li>
                <strong>Facebook:</strong> Videos and Reels
              </li>
              <li>
                <strong>Twitter:</strong> Videos and GIFs
              </li>
            </ul>
          </section>

          <section>
            <h2>Disclaimer</h2>
            <p>
              Social Media Downloader is an independent tool and is not
              affiliated with, endorsed, or sponsored by any social media
              platforms. All platform names and trademarks belong to their
              respective owners.
            </p>
          </section>

          <div className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/">Try Our Downloader</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
