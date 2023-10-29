export type Quiz = {
  id: number;
  name: QuizNames;
  type: QuizTypes;
};

export type QuizNames = 'Slack' | 'VSCode' | 'Chrome' | 'GitHub';

type QuizTypes = 'macOS' | 'Windows';
