import { getQuestionsFromMarkdown } from '@/lib/markdown';
import QuestionList from '@/components/QuestionList';

export const revalidate = 3600;

export default async function EstimationQuestions() {
  const questions = await getQuestionsFromMarkdown('estimation');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Estimation Questions</h1>
        <p className="text-gray-600">
          Practice answering questions about market sizing and quantitative analysis.
        </p>
      </div>

      <QuestionList questions={questions} category="estimation" />
    </div>
  );
} 