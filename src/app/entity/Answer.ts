export type Answer = {
  question_id: number;
  contents: string;
};

const answerChoices = {
  Slack: {
    1: ['⌘+Z', '⌘+X', '⌘+C', '⌘+V'],
    2: ['⌘+G', '⌘+F', '⌘+E', '⌘+D'],
    3: ['⌘+K', '⌘+L', '⌘+M', '⌘+N'],
    4: ['⌘+[', '⌘+]', '⌘+;', "⌘+'"],
    5: ['⌘+Shift+K', '⌘+Shift+L', '⌘+Shift+M', '⌘+Shift+N'],
    6: ['⌘+Shift+S', '⌘+Shift+D', '⌘+Shift+F', '⌘+Shift+G'],
    7: ['⌘+Shift+L', '⌘+Shift+K', '⌘+Shift+J', '⌘+Shift+H'],
    8: ['Option+Click', 'Shift+Click', 'Command+Click', 'Control+Click'],
    9: ['⌘+Shift+A', '⌘+Shift+S', '⌘+Shift+D', '⌘+Shift+F'],
    10: ['⌘+Shift+T', '⌘+Shift+Y', '⌘+Shift+U', '⌘+Shift+I'],
  },
};
