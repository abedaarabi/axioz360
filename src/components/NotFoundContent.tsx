'use client';

import { useSearchParams } from 'next/navigation';

export default function NotFoundContent() {
  const searchParams = useSearchParams();
  
  // Use searchParams here as needed
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      {/* Add your 404 page content here */}
    </div>
  );
}
