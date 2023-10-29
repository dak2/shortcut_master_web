'use client';
import { QuestionContext } from 'app/providers/QuestionContext';
import { Suspense, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';
import Link from 'next/link';
import { css } from '../../../../../../../../../styled-system/css';
import { MAX_QUESTION_SIZE, Question } from 'app/entity/Question';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

const loadingTextCss = css({
  textAlign: 'center',
  marginTop: '15%',
  fontSize: '2rem',
});

const containerCss = css({
  display: 'grid',
  placeItems: 'center',
  marginTop: '10%',
});

const questionTitleCss = css({
  fontSize: '2rem',
});

const pageLinkCss = css({
  marginTop: '10%',
  textAlign: 'center',
  verticalAlign: 'middle',
  textDecoration: 'none',
  padding: '1rem 4rem',
  fontWeight: 'bold',
  borderRadius: '100vh',
  background: '#F39C12',
  color: '#fff',
  cursor: 'pointer',
});

const questionComponent = (router: AppRouterInstance, question?: Question) => {
  if (question && question?.id <= MAX_QUESTION_SIZE) {
    const nextPageLink = question?.id === MAX_QUESTION_SIZE ? 'results' : question?.id + 1;
    const nextPageText = question?.id === MAX_QUESTION_SIZE ? '回答結果を確認する' : '次の質問へ';
    return (
      <div className={containerCss}>
        <div>
          <h1 className={questionTitleCss}>
            Q{question?.id}: {question?.contents}
          </h1>
        </div>
        <p>入力してください</p>
        <Link href={`${nextPageLink}`} className={pageLinkCss}>
          <p>{nextPageText}</p>
        </Link>
      </div>
    );
  }
  return (
    <div className={containerCss}>
      <div>
        <h1 className={questionTitleCss}>無効な質問ページです</h1>
      </div>
      <button type="button" onClick={() => router.back()} className={pageLinkCss}>
        前のページに戻る
      </button>
    </div>
  );
};

export default function Page({ params }: { params: { type: string; id: number } }) {
  const questionId = Number(params.id);
  const { user } = useContext(UserContext);
  const { questions } = useContext(QuestionContext);
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(undefined);
  const router = useRouter();
  const currentUser = getCurrentUser(user);
  const handleUserRedirect = () => {
    if (!currentUser.name) router.push('/');
  };

  useEffect(() => {
    handleUserRedirect();
    const initCurrentQuestion = questions.find((q) => q.id === questionId);
    setCurrentQuestion(initCurrentQuestion);
  }, [questions, questionId]);

  return (
    <Suspense fallback={<p className={loadingTextCss}>Loading...</p>}>
      {questionComponent(router, currentQuestion)}
    </Suspense>
  );
}
