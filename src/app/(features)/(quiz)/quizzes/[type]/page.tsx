import QuestionContainer from 'app/(features)/(quiz)/components/question/questionContainer';
import { Suspense } from 'react';
import { css } from '../../../../../../styled-system/css/css';
import { QuizNames } from 'app/entity/Quiz';

const loadingTextCss = css({
  textAlign: 'center',
  marginTop: '15%',
  fontSize: '2rem',
});

export default async function Page({ params }: { params: { type: QuizNames } }) {
  return (
    <div>
      <Suspense fallback={<p className={loadingTextCss}>Loading...</p>}>
        <QuestionContainer type={params.type || ''} />
      </Suspense>
    </div>
  );
}
