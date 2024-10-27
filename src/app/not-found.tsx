import { Suspense } from 'react';
import NotFoundContent from '@/components/NotFoundContent';

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
