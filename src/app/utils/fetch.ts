import { Question } from 'app/entity/Question';
import { QuizNames } from 'app/entity/Quiz';

export const fetchQuestions = async (type: QuizNames) => {
  const res = await fetch(`http://127.0.0.1:3000/questions?quiz_type=${type.toLowerCase()}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: Question[] = await res.json();
  return data;
};
