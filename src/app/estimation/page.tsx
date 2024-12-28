import { Suspense } from 'react';
import { getQuestionsFromMarkdown } from '@/lib/markdown';
import { CategoryId } from '@/types';
import EstimationQuestionsClient from './EstimationQuestionsClient';
import Loading from '@/components/Loading';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function EstimationQuestionsPage() {
  const questions = await getQuestionsFromMarkdown('estimation' as CategoryId);

  return (
    <Suspense fallback={<Loading />}>
      <EstimationQuestionsClient questions={questions} />
    </Suspense>
  );
} 