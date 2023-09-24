import { Suspense } from 'react';
import Quizzes from 'app/(features)/(quiz)/components/quizzes';

// entry point of quizzes
export default async function Page() {
  return (
    <div>
      <h2>クイズ一覧</h2>
      <Suspense fallback={<p>Loading Quizzes...</p>}>
        <Quizzes />
      </Suspense>
    </div>
  );
}
