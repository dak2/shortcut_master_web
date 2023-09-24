import { Suspense } from 'react';
import Dashboard from 'app/(features)/(dashboard)/components/dashboard';

// entry point of dashboard
export default async function Page() {
  return (
    <div>
      <Suspense fallback={<p>Loading Dashboard...</p>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
