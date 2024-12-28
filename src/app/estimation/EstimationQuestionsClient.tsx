'use client';

import { useState } from 'react';
import { Question } from '@/types';
import QuestionList from '@/components/QuestionList';
import Progress from '@/components/ui/Progress';
import { categoryConfig } from '@/lib/constants';

interface EstimationQuestionsClientProps {
  questions: Question[];
}

export default function EstimationQuestionsClient({ questions }: EstimationQuestionsClientProps) {
  const [overallProgress, setOverallProgress] = useState(0);
  const config = categoryConfig['estimation'];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Estimation Questions
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Practice answering market sizing and estimation questions with structured frameworks.
        </p>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-medium text-blue-600">{overallProgress}%</span>
          </div>
          <Progress
            value={overallProgress}
            label="Overall Progress"
            size="md"
            color={config.progressColor}
          />
        </div>
      </div>

      <QuestionList 
        questions={questions} 
        category="estimation" 
        onProgressUpdate={setOverallProgress}
      />
    </div>
  );
} 