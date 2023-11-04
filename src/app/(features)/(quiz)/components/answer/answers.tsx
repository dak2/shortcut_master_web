'use client';

import { answerChoices } from 'app/entity/Answer';
import { QuizNames } from 'app/entity/Quiz';
import { css } from '../../../../../../styled-system/css';
import { flex } from '../../../../../../styled-system/patterns/flex';

const containerCss = flex({
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  width: '50%',
});

const answerBoxCss = css({
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
});

export default function Answers(type: QuizNames, questionId: number) {
  return (
    <div className={containerCss}>
      {answerChoices[type][questionId].map((answer, index) => {
        return (
          <div key={`answer-${index}`} className={answerBoxCss}>
            {answer}
          </div>
        );
      })}
    </div>
  );
}
