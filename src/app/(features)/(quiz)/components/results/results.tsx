'use client';
import { AnsweredContents } from 'app/entity/Answer';
import { AnswerHistory, AnsweredHistoryRequestBody } from 'app/entity/AnswerHistory';
import { QuizNames } from 'app/entity/Quiz';
import { QuestionContext } from 'app/providers/QuestionProvider';
import { UserContext } from 'app/providers/UserProvider';
import { getCurrentUser } from 'app/utils/auth';
import { getFetch, postFetch } from 'app/utils/fetch';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const postAnswers = async (data: AnsweredHistoryRequestBody) => {
  return await postFetch<AnswerHistory>('answers', data);
};

const fetchAnswerHistories = async (type: string) => {
  return await getFetch<AnswerHistory>('answer_histories', { quiz_type: type });
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
          setAnswerHistories(response);
        } else {
          const response = await fetchAnswerHistories(type);
          setAnswerHistories(response);
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
