'use client';
import { QuestionContext } from 'app/providers/QuestionContext';
import { Suspense, use, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';
import { css } from '../../../../../../../../../styled-system/css';
import { Question } from 'app/entity/Question';

const loadingTextCss = css({
  textAlign: 'center',
  marginTop: '15%',
  fontSize: '2rem',
});

// entry point of questions
export default function Page({ params }: { params: { type: string; id: number } }) {
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
    const questionId = Number(params.id);
    const initCurrentQuestion = questions.find((q) => q.id === questionId);
    setCurrentQuestion(initCurrentQuestion);
  }, [questions, params.id]);

  return (
    // TODO: 次の質問への遷移
    <Suspense fallback={<p className={loadingTextCss}>Loading...</p>}>
      <div>aaaaa: {questions.length}</div>
      <div>aaaaa: {currentQuestion?.contents}</div>
    </Suspense>
  );
}
