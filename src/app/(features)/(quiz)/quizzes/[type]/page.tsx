import QuestionContainer from 'app/(features)/(quiz)/components/question/questionContainer';
import { Suspense } from 'react';
import { css } from '../../../../../../styled-system/css/css';

const loadingTextCss = css({
  textAlign: 'center',
  marginTop: '15%',
  fontSize: '2rem',
});

export default async function Page({ params }: { params: { type: string } }) {
  return (
    <div>
      <Suspense fallback={<p className={loadingTextCss}>Loading...</p>}>
        <QuestionContainer type={params.type || ''} />
      </Suspense>
    </div>
  );
}
