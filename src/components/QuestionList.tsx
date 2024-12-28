'use client';

import { useState, useEffect } from 'react';
import { Question, CategoryId } from '@/types';
import QuestionCard from './ui/QuestionCard';
import { motion } from 'framer-motion';
import { createProgressUpdateEvent } from '@/lib/events';
import { useProgress } from '@/contexts/ProgressContext';

interface QuestionListProps {
  questions: Question[];
  category: CategoryId;
  onProgressUpdate?: (progress: number) => void;
}

interface GroupedQuestions {
  [subcategory: string]: Question[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function QuestionList({ questions, category, onProgressUpdate }: QuestionListProps) {
  const { getProgress, updateProgress } = useProgress();
  const [groupedQuestions, setGroupedQuestions] = useState<GroupedQuestions>({});
  const completedQuestions = getProgress(category);

  // Group questions by subcategory
  useEffect(() => {
    const grouped = questions.reduce<GroupedQuestions>((acc, question) => {
      if (!acc[question.subcategory]) {
        acc[question.subcategory] = [];
      }
      acc[question.subcategory].push(question);
      return acc;
    }, {});
    setGroupedQuestions(grouped);
  }, [questions]);

  const toggleComplete = (questionId: string) => {
    updateProgress(category, questionId, !completedQuestions.has(questionId));
  };

  // Calculate progress for each subcategory
  const getSubcategoryProgress = (subcategoryQuestions: Question[]) => {
    const completed = subcategoryQuestions.filter(q => completedQuestions.has(q.id)).length;
    return Math.round((completed / subcategoryQuestions.length) * 100);
  };

  // Calculate and emit overall progress whenever completedQuestions changes
  useEffect(() => {
    const totalQuestions = questions.length;
    const completedCount = questions.filter(q => completedQuestions.has(q.id)).length;
    const overallProgress = Math.round((completedCount / totalQuestions) * 100);
    onProgressUpdate?.(overallProgress);
    createProgressUpdateEvent(category, overallProgress);
  }, [completedQuestions, questions, category, onProgressUpdate]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {Object.entries(groupedQuestions).map(([subcategory, subcategoryQuestions]) => (
        <motion.div
          key={subcategory}
          variants={item}
          className="border-b pb-8 last:border-b-0"
        >
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold text-gray-900">{subcategory}</h2>
                <span className="text-sm text-gray-500">
                  ({subcategoryQuestions.length} questions)
                </span>
              </div>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm text-gray-500"
              >
                {getSubcategoryProgress(subcategoryQuestions)}% Complete
              </motion.span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${getSubcategoryProgress(subcategoryQuestions)}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {subcategoryQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                {...question}
                isCompleted={completedQuestions.has(question.id)}
                onToggleComplete={() => toggleComplete(question.id)}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 