import { Suspense } from 'react';
import { getQuestionsFromMarkdown } from '@/lib/markdown';
import { CategoryId } from '@/types';
import ProductDesignQuestionsClient from './ProductDesignQuestionsClient';
import Loading from '@/components/Loading';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function ProductDesignQuestionsPage() {
  const questions = await getQuestionsFromMarkdown('product-design' as CategoryId);

  return (
    <Suspense fallback={<Loading />}>
      <ProductDesignQuestionsClient questions={questions} />
    </Suspense>
  );
} 