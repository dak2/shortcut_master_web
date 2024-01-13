'use client';
import { AnsweredContents } from 'app/entity/Answer';
import { AnswerHistory, AnsweredHistoryRequestBody } from 'app/entity/AnswerHistory';
import { QuizNames } from 'app/entity/Quiz';
import { QuestionContext } from 'app/providers/QuestionProvider';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const postAnswers = async (data: AnsweredHistoryRequestBody) => {
  return await fetch('http://127.0.0.1:3000/answers', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const fetchAnswerHistories = async (type: string) => {
  return await fetch(`http://127.0.0.1:3000/answer_histories?quiz_type=${type.toLowerCase()}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const mappingToAnswerHistoryRequestBody = (answers: AnsweredContents, type: QuizNames): AnsweredHistoryRequestBody => {
  const answerHistoryRequestBody: AnsweredHistoryRequestBody = { quiz_type: type, answers: [] };
  for (const [answerId, answerContent] of Object.entries(answers[type])) {
    answerHistoryRequestBody.answers.push({ answer_id: Number(answerId), contents: answerContent.replace(/\s+/g, '') });
  }
  return answerHistoryRequestBody;
};

export default function Results(type: QuizNames) {
  const { answers } = useContext(QuestionContext);
  const { user } = useContext(UserContext);
  const currentUser = getCurrentUser(user);
  const router = useRouter();
  const [answerHistories, setAnswerHistories] = useState<AnswerHistory[]>([]);
  const handleUserRedirect = () => {
    if (!currentUser.name) router.push('/');
  };

  useEffect(() => {
    handleUserRedirect();
    void (async () => {
      try {
        if (Object.keys(answers[type]).length > 0) {
          const answerHistoryRequestBody = mappingToAnswerHistoryRequestBody(answers, type);
          const response = await postAnswers(answerHistoryRequestBody);
          if (response.ok) {
            const data = await response.json();
            setAnswerHistories(data);
          } else {
            throw new Error('Network response was not ok. Please check your credentials and try again');
          }
        } else {
          const response = await fetchAnswerHistories(type);
          if (response.ok) {
            const data = await response.json();
            setAnswerHistories(data);
          } else {
            throw new Error('Network response was not ok. Please check your credentials and try again');
          }
        }
      } catch (error) {
        throw new Error(`Failed to fetch: ${error}. Please try again`);
      }
    })();
  }, []);

  return (
    <div>
      {answerHistories.map((ans) => {
        return (
          <div key={ans.answer_id}>
            {ans.contents} : {ans.is_correct ? '○' : '×'}
          </div>
        );
      })}
    </div>
  );
}
