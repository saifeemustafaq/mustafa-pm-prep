import { Suspense } from 'react';
import { getQuestionsFromMarkdown } from '@/lib/markdown';
import { CategoryId } from '@/types';
import ExecutionQuestionsClient from './ExecutionQuestionsClient';
import Loading from '@/components/Loading';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function ExecutionQuestionsPage() {
  const questions = await getQuestionsFromMarkdown('execution' as CategoryId);

  return (
    <Suspense fallback={<Loading />}>
      <ExecutionQuestionsClient questions={questions} />
    </Suspense>
  );
} 