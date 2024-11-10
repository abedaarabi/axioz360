"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/lib/storge-helper";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookieConsent", null);
    setCookieConsent(storedCookieConsent);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (cookieConsent === null) {
      setLocalStorage("cookie-consent", cookieConsent);
    }
    const newValue = cookieConsent ? "granted" : "denied";
    // Check if gtag function exists before calling it
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });
    }
  }, [cookieConsent]);

  if (isLoading || cookieConsent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We use cookies to enhance your experience. By continuing, you agree
            to our{" "}
            <a
              href="/cookie-policy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              cookie policy
            </a>
            .
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setCookieConsent(false)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Decline
          </button>
          <button
            onClick={() => setCookieConsent(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
