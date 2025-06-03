import type { Metadata } from "next"
import { AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service - Instagram Downloader",
  description:
    "Read the Terms of Service for using our Instagram Downloader tool. Understand your rights and responsibilities when using our platform.",
  keywords: ["terms of service", "instagram downloader terms", "legal", "conditions of use"],
  openGraph: {
    title: "Terms of Service - Instagram Downloader",
    description: "Understand the terms and conditions for using our Instagram video and reels downloader.",
    url: "https://instagram-reels-downloader-tau.vercel.app/terms", // Replace with your actual URL
    type: "article",
    images: [
      {
        url: "/placeholder.svg?width=1200&height=630", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - Instagram Downloader",
    description: "Our Terms of Service for the Instagram Downloader tool.",
    images: ["/placeholder.svg?width=1200&height=630"], // Replace with your actual Twitter image
  },
}

const TermsOfServicePage = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center sm:mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 sm:mt-4">
          Last Updated: June 3, 2025 {/* Replace with actual date */}
        </p>
      </header>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-8 lg:p-10">
        <div className="prose prose-slate mx-auto max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-p:leading-relaxed prose-a:text-purple-600 hover:prose-a:text-purple-700 dark:prose-a:text-purple-400 dark:hover:prose-a:text-purple-300 prose-ul:list-disc prose-ul:pl-6">
          <p className="mb-6 rounded-md border-l-4 border-purple-500 bg-purple-50 p-4 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200">
            <AlertCircle className="mr-2 inline-block h-5 w-5 align-text-bottom" />
            Please read these Terms of Service carefully before using our service. Your access to and use of the Service
            is conditioned on your acceptance of and compliance with these Terms.
          </p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              <strong>1.1.</strong> These Terms of Service (ToS) govern your use of the website
              <a
                href="https://instagram-reels-downloader-tau.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium"
              >
                {" "}
                (https://instagram-reels-downloader-tau.vercel.app/)
              </a>{" "}
              and its associated services (the "Website" or "Service"). By using the Website or Service, you agree to be
              bound by the terms and conditions set forth in this ToS.
            </p>
            <p>
              <strong>1.2.</strong> Please read this ToS carefully before using the Website or Service. If you do not
              agree to the terms of this ToS, you must not access or use the Website or Service.
            </p>
          </section>

          <section>
            <h2>2. Changes to the ToS</h2>
            <p>
              <strong>2.1.</strong> We reserve the right to update, modify, or replace any part of the ToS at any time
              by posting the updated ToS on the Website. Your continued use of the Website or Service after the
              effective date of the updated ToS constitutes your acceptance of the new terms. We encourage you to review
              this page periodically for any changes.
            </p>
          </section>

          <section>
            <h2>3. Prohibited Uses</h2>
            <p>
              <strong>3.1.</strong> You may not use the Website or Service for any illegal activities, including but not
              limited to:
            </p>
            <ul>
              <li>
                Distributing or accessing content that infringes on others&apos; intellectual property rights, including
                downloading copyrighted material without permission from the copyright holder.
              </li>
              <li>
                Transmitting or distributing material that promotes violence, discrimination, or illegal activities.
              </li>
              <li>Harassing, stalking, or intimidating other users of the Website or Service.</li>
              <li>
                Attempting to gain unauthorized access to our systems or engaging in any activity that disrupts,
                diminishes the quality of, interferes with the performance of, or impairs the functionality of, the
                Service.
              </li>
            </ul>
            <p>
              <strong>3.2.</strong> You agree not to engage in any activities that could harm or disable the Website or
              Service or interfere with other users&apos; use and enjoyment of the Website or Service. This includes,
              but is not limited to, using any automated system, such as "robots," "spiders," or "offline readers," that
              accesses the Service in a manner that sends more request messages to our servers than a human can
              reasonably produce in the same period by using a conventional on-line web browser.
            </p>
          </section>

          <section>
            <h2>4. Intellectual Property Rights</h2>
            <p>
              <strong>4.1.</strong> All content on the Website, including but not limited to text, graphics, logos,
              icons, images, audio clips, video clips, data compilations, and software, and the compilation thereof
              (collectively, the "Content") is the property of the Website owner, its affiliates, partners or licensors,
              and is protected by international copyright laws.
            </p>
            <p>
              <strong>4.2.</strong> You are granted a limited, revocable, and non-exclusive license to access and make
              personal, non-commercial use of the Website. You may not modify, copy, distribute, transmit, display,
              perform, reproduce, publish, license, create derivative works from, transfer, or sell any Content from the
              Website without the express prior written permission of the Website owner.
            </p>
            <p>
              <strong>4.3.</strong> Our service allows you to download publicly available content from Instagram for
              personal use. You are solely responsible for ensuring that your use of any downloaded content complies
              with all applicable laws and Instagram's terms of service. We do not host or store any Instagram content
              on our servers.
            </p>
          </section>

          <section>
            <h2>5. Disclaimers and Limitations of Liability</h2>
            <p>
              <strong>5.1.</strong> The Website and Service are provided on an &ldquo;as is&ldquo; and &ldquo;as
              available&ldquo; basis without any warranties of any kind, express or implied, including but not limited
              to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not
              warrant that the service will be uninterrupted, timely, secure, or error-free.
            </p>
            <p>
              <strong>5.2.</strong> To the fullest extent permitted by applicable law, we shall not be liable for any
              direct, indirect, incidental, special, consequential, or punitive damages (including, without limitation,
              damages for loss of profits, data, use, goodwill, or other intangible losses) arising out of or in
              connection with your access to or use of or inability to access or use the Website or Service, even if we
              have been advised of the possibility of such damages.
            </p>
            <p>
              <strong>5.3.</strong> We are not affiliated with Instagram or Meta Platforms, Inc. The Instagram name and
              logo are trademarks of Meta Platforms, Inc.
            </p>
          </section>

          <section>
            <h2>6. Governing Law</h2>
            <p>
              <strong>6.1.</strong> These ToS shall be governed by and construed in accordance with the laws of{" "}
              <span className="font-semibold">Algeria</span>, without regard to its conflict of law provisions. Any
              legal suit, action, or proceeding arising out of or related to these ToS or the Services shall be
              instituted exclusively in the federal or state courts located in Algeria.
            </p>
          </section>

          <section>
            <h2>7. Contact Information</h2>
            <p>
              <strong>7.1.</strong> If you have any questions or concerns about these ToS, please contact the Website
              owner at{" "}
              <a href="mailto:your-email@example.com" className="font-medium">
                your-email@example.com
              </a>
              . {/* Replace with your actual email */}
            </p>
          </section>

          <section>
            <h2>8. Acceptance of ToS</h2>
            <p>
              By accessing or using the Website or Service, you acknowledge that you have read, understood, and agree to
              be bound by the terms and conditions of this ToS. If you do not agree with these terms, please do not use
              our Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsOfServicePage
