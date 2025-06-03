import type { Metadata } from "next";
import { Users, Target, Zap, ShieldCheck, Heart, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us - Instagram Downloader",
  description:
    "Learn more about Instagram Downloader, our mission to provide a fast, free, and easy way to download Instagram videos, reels, and stories. Discover our commitment to user experience and privacy.",
  keywords: [
    "about instagram downloader",
    "our mission",
    "instagram tool",
    "free video downloader",
    "ig content saver",
  ],
  openGraph: {
    title: "About Instagram Downloader - Your Free IG Content Saver",
    description:
      "Discover the story behind Instagram Downloader and our dedication to a seamless user experience.",
    url: "https://instagram-reels-downloader-tau.vercel.app/about", // Replace with your actual URL
    type: "article",
    images: [
      {
        url: "/placeholder.svg?width=1200&height=630", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "About Instagram Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Instagram Downloader",
    description: "Learn about our free tool for downloading Instagram content.",
    images: ["/placeholder.svg?width=1200&height=630"], // Replace with your actual Twitter image
  },
};

const AboutPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center sm:mb-12">
        <Users className="mx-auto mb-4 h-16 w-16 text-purple-600 dark:text-purple-400" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          About Instagram Downloader
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 sm:mt-4">
          Your simple, fast, and free solution for saving Instagram content.
        </p>
      </header>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-8 lg:p-10">
        <div className="prose prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-p:leading-relaxed prose-a:text-purple-600 hover:prose-a:text-purple-700 dark:prose-a:text-purple-400 dark:hover:prose-a:text-purple-300 mx-auto max-w-none">
          <p className="mb-6 rounded-md border-l-4 border-purple-500 bg-purple-50 p-4 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200">
            <Info className="mr-2 inline-block h-5 w-5 align-text-bottom" />
            Welcome! We're passionate about making it easy for you to save and
            enjoy your favorite Instagram moments.
          </p>

          <section>
            <h2>
              <Target className="mr-2 inline-block h-7 w-7 align-bottom text-purple-600 dark:text-purple-400" />
              Our Mission
            </h2>
            <p>
              At Instagram Downloader, our mission is straightforward: to
              provide a user-friendly, reliable, and free tool that allows
              anyone to quickly download Instagram videos, reels, stories, and
              IGTV content. We believe that accessing publicly shared content
              for personal use should be simple and hassle-free.
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
                <strong>Easy-to-Use Interface:</strong> Just paste the Instagram
                link, and you're ready to go. No complicated steps.
              </li>
              <li>
                <strong>High-Quality Downloads:</strong> Save videos and reels
                in the best available quality.
              </li>
              <li>
                <strong>Support for Various Content Types:</strong> Download
                videos, reels, stories, and IGTV.
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
              platform.
            </p>
            <p>
              We continuously work on improving our service to ensure
              compatibility with Instagram's updates and to enhance your
              experience.
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
                <Link href="/privacy">Privacy Policy</Link>, we do not store
                your downloaded content or the links you paste, beyond what's
                necessary for the immediate download process.
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
            <h2>Disclaimer</h2>
            <p>
              Instagram Downloader is an independent tool and is not affiliated
              with, endorsed, or sponsored by Instagram or Meta Platforms, Inc.
              Instagram™ is a trademark of Meta Platforms, Inc.
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
