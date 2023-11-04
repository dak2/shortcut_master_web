'use client';

import { answerChoices } from 'app/entity/Answer';
import { QuizNames } from 'app/entity/Quiz';

export default function Answers(quizName: QuizNames) {
  console.log(answerChoices[quizName]);
  return (
    <div>
      <h1>Answers</h1>
    </div>
  );
}
