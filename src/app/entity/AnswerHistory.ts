export type AnswerHistory = {
  answer_id: number;
  is_correct: boolean;
  contents: string;
};

export type AnsweredHistoryRequestBody = { quiz_type: string; answers: Omit<AnswerHistory, 'is_correct'>[] };
