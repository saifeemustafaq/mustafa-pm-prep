export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  title: string;
  content: string;
  howToAnswer?: string;
  example?: string;
  difficulty?: QuestionDifficulty;
  category: string;
  subcategory: string;
} 