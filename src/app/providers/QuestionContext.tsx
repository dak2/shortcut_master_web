'use client';
import { Question } from 'app/entity/Question';
import { QuizNames } from 'app/entity/Quiz';
import { fetchQuestions } from 'app/utils/fetch';
import React, { createContext, useState, SetStateAction, Dispatch, useEffect } from 'react';

type QuestionContextType = {
  type: string;
  setType: React.Dispatch<React.SetStateAction<QuizNames>>;
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
};

const defaultQuestionContext = {
  type: '',
  setType: () => {},
  questions: [],
  setQuestions: () => {},
};

const QuestionContext = createContext<QuestionContextType>(defaultQuestionContext);

function QuestionProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState<QuizNames>('Slack');
  const [questions, setQuestions] = useState<Question[]>(defaultQuestionContext.questions);

  useEffect(() => {
    (async () => {
      const questions = type.length > 0 ? await fetchQuestions(type) : [];
      setQuestions(questions);
    })();
  }, []);

  return (
    <QuestionContext.Provider value={{ type, setType, questions, setQuestions }}>{children}</QuestionContext.Provider>
  );
}

export { QuestionContext, QuestionProvider };
