"use client";

import { LandingPageComponent } from "@/components/landing-page";
import { Metadata } from "next";

// Note: metadata must be exported from a server component
// Since this is a client component (marked with "use client")
// We need to move the metadata to a separate file or layout.tsx

function HomePageContent() {
  return <LandingPageComponent />;
}

export default function HomePage() {
  return <HomePageContent />;
}
