export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export type CategoryId = 
  | 'behavioral'
  | 'product-design'
  | 'strategy'
  | 'execution'
  | 'estimation';

export interface Question {
  id: string;
  title: string;
  content: string;
  howToAnswer?: string;
  example?: string;
  difficulty?: QuestionDifficulty;
  category: CategoryId;
  subcategory: string;
}

export interface ProgressState {
  [category: string]: Set<string>;
}

export interface ProgressContextType {
  getProgress: (category: CategoryId) => Set<string>;
  updateProgress: (category: CategoryId, questionId: string, completed: boolean) => void;
} 