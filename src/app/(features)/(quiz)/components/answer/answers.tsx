'use client';

import { AnsweredContents, answerChoices } from 'app/entity/Answer';
import { QuizNames } from 'app/entity/Quiz';
import { cva } from '../../../../../../styled-system/css/cva';
import { flex } from '../../../../../../styled-system/patterns/flex';
import { useContext } from 'react';
import { QuestionContext } from 'app/providers/QuestionProvider';
import toast from 'react-hot-toast';

const containerCss = flex({
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  width: '50%',
});

const answerBoxRecipe = cva({
  base: {
    width: '20rem',
    marginBottom: '5%',
    padding: '4rem',
    color: 'inherit',
    textDecoration: 'none',
    border: '1px solid #eaeaea',
    display: 'grid',
    placeItems: 'center',
    whiteSpace: 'wrap',
    transition: 'color 0.15s ease, border-color 0.15s ease',
    borderRadius: '45px',
    cursor: 'pointer',
    fontSize: '1.3rem',
    _hover: {
      color: '#0070f3',
      borderColor: '#0070f3',
    },
    _focus: {
      color: '#0070f3',
      borderColor: '#0070f3',
    },
    _active: {
      color: '#0070f3',
      borderColor: '#0070f3',
    },
  },
  variants: {
    answerState: {
      selected: {
        color: '#0070f3',
        border: '1px solid #0070f3',
      },
    },
  },
});

export default function Answers({ type, questionId }: { type: QuizNames; questionId: number }) {
  const { answers, setAnswers } = useContext(QuestionContext);
  const currentAnswer = answers[type][questionId];
  const handleAnswer = (currentAnswer: string) => {
    toast.dismiss();
    if (setAnswers) {
      setAnswers((prev: AnsweredContents) => {
        return { ...prev, [type]: { ...prev[type], [questionId]: currentAnswer } };
      });
    }
  };

  return (
    <div className={containerCss}>
      {answerChoices[type][questionId].map((answer, index) => {
        const isSelected = currentAnswer === answer;
        return (
          <button
            key={`answer-${index}`}
            className={answerBoxRecipe(isSelected ? { answerState: 'selected' } : {})}
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
}
