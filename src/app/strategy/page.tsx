import { getQuestionsFromMarkdown } from '@/lib/markdown';
import QuestionList from '@/components/QuestionList';

export const revalidate = 3600;

export default async function StrategyQuestions() {
  const questions = await getQuestionsFromMarkdown('strategy');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Strategy Questions</h1>
        <p className="text-gray-600">
          Practice answering questions about business strategy and market analysis.
        </p>
      </div>

      <QuestionList questions={questions} category="strategy" />
    </div>
  );
} 