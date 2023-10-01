import { Suspense } from 'react';
import Dashboard from 'app/(features)/(dashboard)/components/dashboard';
import { css } from '../../../../../styled-system/css';

const loadingTextCss = css({
  textAlign: 'center',
  marginTop: '15%',
});

// entry point of dashboard
export default async function Page() {
  return (
    <div>
      <Suspense fallback={<p className={loadingTextCss}>Loading Dashboard...</p>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
