import { Suspense } from 'react';
import { getQuestionsFromMarkdown } from '@/lib/markdown';
import { CategoryId } from '@/types';
import StrategyQuestionsClient from './StrategyQuestionsClient';
import Loading from '@/components/Loading';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function StrategyQuestionsPage() {
  const questions = await getQuestionsFromMarkdown('strategy' as CategoryId);

  return (
    <Suspense fallback={<Loading />}>
      <StrategyQuestionsClient questions={questions} />
    </Suspense>
  );
} 