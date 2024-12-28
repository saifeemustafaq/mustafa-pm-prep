import { Suspense } from 'react';
import { getQuestionsFromMarkdown } from '@/lib/markdown';
import { CategoryId } from '@/lib/constants';
import BehavioralQuestionsClient from './BehavioralQuestionsClient';
import Loading from '@/components/Loading';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function BehavioralQuestionsPage() {
  const questions = await getQuestionsFromMarkdown('behavioral' as CategoryId);

  return (
    <Suspense fallback={<Loading />}>
      <BehavioralQuestionsClient questions={questions} />
    </Suspense>
  );
} 