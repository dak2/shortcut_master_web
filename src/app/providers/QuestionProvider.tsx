'use client';
import { Question } from 'app/entity/Question';
import { QuizNames } from 'app/entity/Quiz';
import React, { createContext, useState, SetStateAction, Dispatch, useEffect } from 'react';

import { AnsweredContents } from 'app/entity/Answer';
import { getFetch } from 'app/utils/fetch';
type QuestionContextType = {
  type: QuizNames;
  setType: React.Dispatch<React.SetStateAction<QuizNames>>;
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  answers: AnsweredContents;
  setAnswers?: Dispatch<SetStateAction<AnsweredContents>>;
};

const defaultQuestionContext: QuestionContextType = {
  type: 'slack',
  setType: () => {},
  questions: [],
  setQuestions: () => {},
  answers: { slack: {}, vscode: {}, chrome: {}, github: {} },
  setAnswers: () => {},
};

const QuestionContext = createContext<QuestionContextType>(defaultQuestionContext);

const fetchQuestions = async (type: QuizNames) => {
  return await getFetch<Question>('questions', { quiz_type: type });
};

function QuestionProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState<QuizNames>('slack');
  const [questions, setQuestions] = useState<Question[]>(defaultQuestionContext.questions);
  const [answers, setAnswers] = useState<AnsweredContents>(defaultQuestionContext.answers);

  useEffect(() => {
    (async () => {
      const questions = type.length > 0 ? await fetchQuestions(type) : [];
      setQuestions(questions);
    })();
  }, []);

  return (
    <QuestionContext.Provider value={{ type, setType, questions, setQuestions, answers, setAnswers }}>
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionContext, QuestionProvider };
