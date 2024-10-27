"use client";
import Script from "next/script";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: any;
  }
}

/**
 * GoogleAnalytics Component
 *
 * This component initializes and manages Google Analytics tracking for a Next.js application.
 * It uses the App Router and handles route changes to send pageview events to Google Analytics.
 *
 * @param {Object} props - The component props
 * @param {string} props.GA_TRACKING_ID - The Google Analytics tracking ID
 * @returns {JSX.Element} The Google Analytics script tags
 */
export default function GoogleAnalytics({
  GA_TRACKING_ID,
}: {
  GA_TRACKING_ID: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Construct the full URL including search params
    const url = pathname + (searchParams ? searchParams.toString() : "");

    // Send pageview event to Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, GA_TRACKING_ID]);

  return (
    <>
      {/* Load the Google Analytics script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      {/* Initialize Google Analytics */}
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('consent', 'default', {
            analytics_storage: 'denied',
          })

          gtag('config', '${GA_TRACKING_ID}');
        `,
        }}
      />
    </>
  );
}
