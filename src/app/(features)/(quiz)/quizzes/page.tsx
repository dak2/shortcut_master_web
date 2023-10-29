import { Suspense } from 'react';
import Quizzes from 'app/(features)/(quiz)/components/quiz/quizzes';
import { css } from '../../../../../styled-system/css';

const loadingTextCss = css({
  textAlign: 'center',
  marginTop: '15%',
  fontSize: '2rem',
});

const titleCss = css({
  textAlign: 'center',
  fontSize: '1.2rem',
  marginTop: '2%',
});

// entry point of quizzes
export default async function Page() {
  return (
    <div>
      <h2 className={titleCss}>クイズを選ぶ</h2>
      <Suspense fallback={<p className={loadingTextCss}>Loading...</p>}>
        <Quizzes />
      </Suspense>
    </div>
  );
}
