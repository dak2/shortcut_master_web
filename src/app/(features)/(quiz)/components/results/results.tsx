'use client';
import { QuizNames } from 'app/entity/Quiz';
import { QuestionContext } from 'app/providers/QuestionProvider';
import { useContext, useEffect } from 'react';

const postAnswers = async (data: any) => {
  return await fetch('http://127.0.0.1:3000/answers', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// TODO: ここで回答を送信する
export default function Results(type: QuizNames) {
  const { answers } = useContext(QuestionContext);
  const hasAnswered = Object.keys(answers[type]).length > 0;

  useEffect(() => {
    if (hasAnswered) {
    }
  }, []);
  return <div>Results</div>;
}
