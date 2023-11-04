export type Quiz = {
  id: number;
  name: QuizNamesUpperCase;
  type: QuizTypes;
};

type QuizNamesUpperCase = 'Slack' | 'VSCode' | 'Chrome' | 'GitHub';

export type QuizNames = 'slack' | 'vscode' | 'chrome' | 'github';

type QuizTypes = 'macOS' | 'Windows';
