'use client';

import { Suspense } from 'react';
import { LandingPageComponent } from "@/components/landing-page";

function HomePageContent() {
  return <LandingPageComponent />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
