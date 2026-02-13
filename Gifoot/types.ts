
export interface LoveNote {
  message: string;
  category: 'sweet' | 'gaming' | 'emotional' | 'future';
}

export enum AppSection {
  HERO = 'hero',
  STORY = 'story',
  MEMORY = 'memory',
  LETTER = 'letter',
  AI_NOTE = 'ai-note',
  PROPOSAL = 'proposal'
}
