'use client';
import { QuestionContext } from 'app/providers/QuestionProvider';
import { Suspense, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';
import Link from 'next/link';
import { css } from '../../../../../../../../../styled-system/css';
import { cva } from '../../../../../../../../../styled-system/css/cva';
import { MAX_QUESTION_SIZE, Question } from 'app/entity/Question';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import Answers from 'app/(features)/(quiz)/components/answer/answers';
import { QuizNames } from 'app/entity/Quiz';
import { AnsweredContents } from 'app/entity/Answer';
import toast, { Toaster } from 'react-hot-toast';

const loadingTextCss = css({
  textAlign: 'center',
  marginTop: '15%',
  fontSize: '2rem',
});

const containerCss = css({
  display: 'grid',
  placeItems: 'center',
  marginTop: '3%',
});

const questionTitleCss = css({
  fontSize: '2rem',
});

const questionSelectTextCss = css({
  marginTop: '1%',
  marginBottom: '2%',
  fontSize: '1.5rem',
});

const pageLinkCss = cva({
  base: {
    textAlign: 'center',
    verticalAlign: 'middle',
    textDecoration: 'none',
    padding: '1rem 4rem',
    fontWeight: 'bold',
    borderRadius: '100vh',
    background: '#F39C12',
    color: '#fff',
    cursor: 'pointer',
  },
  variants: {
    pageState: {
      invalid: { marginTop: '5%' },
    },
  },
});

const handleLink = (event: React.MouseEvent<HTMLAnchorElement>, answeredContent?: string) => {
  if (!answeredContent) {
    event.preventDefault();
    toast.error('解答を選択してください', {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
    });
  }
};

const QuestionComponent = (
  router: AppRouterInstance,
  type: QuizNames,
  answers: AnsweredContents,
  question?: Question,
) => {
  if (question && question?.id <= MAX_QUESTION_SIZE) {
    // TODO: 回答結果ページへの遷移を対応
    const nextPageLink = question?.id === MAX_QUESTION_SIZE ? 'results' : question?.id + 1;
    const nextPageText = question?.id === MAX_QUESTION_SIZE ? '回答結果を確認する' : '次の質問へ';
    const currentAnsweredContent = answers[type][question?.id];
    return (
      <div className={containerCss}>
        <div>
          <h1 className={questionTitleCss}>
            Q{question?.id}: {question?.contents}
          </h1>
        </div>
        <h2 className={questionSelectTextCss}>選択してください</h2>
        <Answers type={type} questionId={question?.id} />
        <Link href={`${nextPageLink}`} className={pageLinkCss()} onClick={(e) => handleLink(e, currentAnsweredContent)}>
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
      <button type="button" onClick={() => router.back()} className={pageLinkCss({ pageState: 'invalid' })}>
        前のページに戻る
      </button>
    </div>
  );
};

export default function Page({ params }: { params: { type: QuizNames; id: number } }) {
  const { answers } = useContext(QuestionContext);
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
      <Toaster position="top-center" reverseOrder={false} />
      {QuestionComponent(router, params.type, answers, currentQuestion)}
    </Suspense>
  );
}
