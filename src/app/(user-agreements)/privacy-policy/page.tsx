import type { Metadata } from "next";
import { ShieldCheck, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Instagram Downloader",
  description:
    "Our Privacy Policy explains how we handle information when you use our Instagram Downloader tool, especially regarding third-party advertising like Google AdSense.",
  keywords: [
    "privacy policy",
    "instagram downloader privacy",
    "data protection",
    "google adsense privacy",
  ],
  openGraph: {
    title: "Privacy Policy - Instagram Downloader",
    description:
      "Learn about our data practices and your privacy rights when using our Instagram Downloader.",
    url: "https://instagram-reels-downloader-tau.vercel.app/privacy", // Replace with your actual URL
    type: "article",
    images: [
      {
        url: "/placeholder.svg?width=1200&height=630", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Instagram Downloader",
    description: "Our Privacy Policy for the Instagram Downloader tool.",
    images: ["/placeholder.svg?width=1200&height=630"], // Replace with your actual Twitter image
  },
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center sm:mb-12">
        <ShieldCheck className="mx-auto mb-4 h-16 w-16 text-purple-600 dark:text-purple-400" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 sm:mt-4">
          Last Updated: June 3, 2025 {/* Replace with actual date */}
        </p>
      </header>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-8 lg:p-10">
        <div className="prose prose-slate dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-p:leading-relaxed prose-a:text-purple-600 hover:prose-a:text-purple-700 dark:prose-a:text-purple-400 dark:hover:prose-a:text-purple-300 prose-ul:list-disc prose-ul:pl-6 mx-auto max-w-none">
          <p className="mb-6 rounded-md border-l-4 border-purple-500 bg-purple-50 p-4 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200">
            <AlertCircle className="mr-2 inline-block h-5 w-5 align-text-bottom" />
            Your privacy is important to us. This Privacy Policy explains how we
            handle information, particularly in relation to third-party services
            like Google AdSense.
          </p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              <strong>1.1.</strong> This Privacy Policy (Policy) outlines the
              privacy practices for the website
              <a
                href="https://instagram-reels-downloader-tau.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium"
              >
                {" "}
                (https://instagram-reels-downloader-tau.vercel.app/)
              </a>{" "}
              (the "Website" or "Service"). While our core service aims to
              minimize data collection, this policy details information
              handling, especially concerning third-party advertising.
            </p>
            <p>
              <strong>1.2.</strong> By using the Website or Service, you
              acknowledge and agree to the practices described in this Policy.
              It is important to understand that while we strive not to collect
              personal information directly, third-party services integrated
              with our Website may do so.
            </p>
          </section>

          <section>
            <h2>2. Information We Do Not Collect Directly</h2>
            <p>
              <strong>2.1.</strong> Our core service of downloading Instagram
              reels and videos is designed not to require you to provide
              personal information such as your name, email address, or
              Instagram credentials. We do not store the URLs you paste or the
              content you download on our servers beyond the temporary
              processing required to facilitate the download.
            </p>
          </section>

          <section>
            <h2>
              3. Third-Party Advertising and Analytics (e.g., Google AdSense)
            </h2>
            <p>
              <strong>3.1.</strong> We use third-party advertising services,
              such as Google AdSense, to display advertisements on our Website.
              These third-party vendors, including Google, use cookies to serve
              ads based on a user's prior visits to our Website or other
              websites.
            </p>
            <p>
              <strong>3.2.</strong> Google's use of advertising cookies enables
              it and its partners to serve ads to our users based on their visit
              to our sites and/or other sites on the Internet. These cookies and
              other tracking technologies (like web beacons) may collect
              information such as your IP address, browser type, internet
              service provider, referring/exit pages, operating system,
              date/time stamp, and clickstream data. This information is used by
              third parties to analyze trends, administer the site, track users'
              movements around the site, and gather demographic information.
            </p>
            <p>
              <strong>3.3.</strong> For more information on how Google uses data
              when you use our partners' sites or apps, please visit{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://policies.google.com/technologies/partner-sites"
                className="font-medium"
              >
                Google's Privacy & Terms - Partner Sites
              </a>
              . You can also learn more about Google AdSense privacy practices
              from resources like:
            </p>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.privacypolicies.com/blog/privacy-policy-google-adsense/"
                  className="font-medium"
                >
                  PrivacyPolicies.com - Google AdSense Guide
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.termsfeed.com/blog/privacy-policy-google-adsense/"
                  className="font-medium"
                >
                  TermsFeed.com - Google AdSense Privacy Policy
                </a>
              </li>
            </ul>
            <p>
              <strong>3.4. Opting Out of Personalized Advertising:</strong>{" "}
              Users may opt out of personalized advertising by visiting Google's{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://adssettings.google.com/authenticated"
                className="font-medium"
              >
                Ads Settings
              </a>
              . Alternatively, you can opt out of a third-party vendor's use of
              cookies for personalized advertising by visiting{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aboutads.info/choices/"
                className="font-medium"
              >
                www.aboutads.info/choices
              </a>
              .
            </p>
          </section>

          <section>
            <h2>4. Cookies</h2>
            <p>
              <strong>4.1.</strong> As mentioned, cookies are used by
              third-party advertisers. A cookie is a small file placed on your
              device. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent. However, if you do not
              accept cookies, you may not be able to use some portions of our
              Service or ads may be less relevant.
            </p>
          </section>

          <section>
            <h2>5. Changes to the Privacy Policy</h2>
            <p>
              <strong>5.1.</strong> We reserve the right to update, modify, or
              replace any part of this Policy at any time by posting the updated
              Policy on the Website. It is your responsibility to check this
              page periodically for changes. Your continued use of or access to
              the Website or Service following the posting of any changes to
              this Policy constitutes acceptance of those changes.
            </p>
          </section>

          <section>
            <h2>6. Contact Information</h2>
            <p>
              <strong>6.1.</strong> If you have any questions or concerns about
              this Privacy Policy, please contact the Website owner at{" "}
              <a href="mailto:your-email@example.com" className="font-medium">
                your-email@example.com
              </a>
              . {/* Replace with your actual email */}
            </p>
          </section>

          <section>
            <h2>7. Acceptance of Privacy Policy</h2>
            <p>
              By accessing or using the Website or Service, you acknowledge that
              you have read, understood, and agree to be bound by the terms and
              conditions of this Policy. If you do not agree with this Policy,
              please do not use our Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
