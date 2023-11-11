'use client';
import { QuestionContext } from 'app/providers/QuestionProvider';
import { Suspense, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';
import { css } from '../../../../../../../../../styled-system/css';
import { MAX_QUESTION_SIZE, Question } from 'app/entity/Question';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { QuizNames } from 'app/entity/Quiz';
import { AnsweredContents } from 'app/entity/Answer';
import { Toaster } from 'react-hot-toast';
import Results from 'app/(features)/(quiz)/components/results/results';
import Questions from 'app/(features)/(quiz)/components/question/questions';

const loadingTextCss = css({
  textAlign: 'center',
  marginTop: '15%',
  fontSize: '2rem',
});

const PageContainer = (
  router: AppRouterInstance,
  type: QuizNames,
  answers: AnsweredContents,
  isLastQuestion: boolean,
  pageType: 'questions' | 'results',
  question?: Question,
) => {
  if (pageType === 'questions') {
    return Questions(router, type, answers, isLastQuestion, question);
  }
  return Results(type);
};

export default function Page({ params }: { params: { type: QuizNames; id: string } }) {
  const questionId = Number(params.id);
  const pageType = params.id[0] === 'results' ? 'results' : 'questions';
  const { user } = useContext(UserContext);
  const { answers, questions } = useContext(QuestionContext);
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(undefined);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);
  const router = useRouter();
  const currentUser = getCurrentUser(user);
  const handleUserRedirect = () => {
    if (!currentUser.name) router.push('/');
  };

  useEffect(() => {
    handleUserRedirect();
    const initCurrentQuestion = questions.find((q) => q.id === questionId);
    setCurrentQuestion(initCurrentQuestion);
    setIsLastQuestion(initCurrentQuestion?.id === MAX_QUESTION_SIZE);
  }, [questions, questionId]);

  return (
    <Suspense fallback={<p className={loadingTextCss}>Loading...</p>}>
      <Toaster position="top-center" reverseOrder={false} />
      {PageContainer(router, params.type, answers, isLastQuestion, pageType, currentQuestion)}
    </Suspense>
  );
}
