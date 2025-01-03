'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Disclosure, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { event } from '@/lib/analytics';

interface QuestionCardProps {
  title: string;
  content: string;
  howToAnswer?: string;
  example?: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  category: string;
}

const QuestionCard: FC<QuestionCardProps> = ({
  title,
  content,
  howToAnswer,
  example,
  isCompleted,
  onToggleComplete,
  category,
}) => {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete();
    handleQuestionComplete();
  };

  const handleQuestionComplete = () => {
    event({
      action: 'complete_question',
      category: 'User Progress',
      label: `Question Completed in ${category}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "bg-white rounded-xl shadow-sm border-2 overflow-hidden transition-all duration-200 relative",
        isCompleted ? "border-emerald-200 bg-emerald-50/30" : "border-gray-100 hover:border-blue-200"
      )}
    >
      {isCompleted && (
        <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-[0.07]">
          <svg
            className="w-full h-full text-emerald-900"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </div>
      )}
      
      <Disclosure>
        {({ open }) => (
          <div>
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => {}}
                    onClick={handleCheckboxClick}
                    className="peer h-5 w-5 rounded-md border-2 border-gray-300 text-emerald-500 
                             focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200"
                  />
                </div>
                <div>
                  <h3 className={clsx(
                    "text-lg font-medium transition-colors duration-200",
                    isCompleted ? "text-emerald-700" : "text-gray-900"
                  )}>{title}</h3>
                </div>
              </div>
              <Disclosure.Button className={clsx(
                "p-2 rounded-lg transition-all duration-200",
                open ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              )}>
                <motion.svg
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </Disclosure.Button>
            </div>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="border-t border-gray-100">
                <div className="p-5 space-y-6">
                  <div className="text-gray-600 leading-relaxed">
                    {content}
                  </div>

                  {howToAnswer && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100"
                    >
                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                        <span className="mr-2">📝</span>
                        How to Answer
                      </h4>
                      <div 
                        className="text-blue-800 prose prose-sm max-w-none prose-headings:text-blue-900 prose-a:text-blue-600"
                        dangerouslySetInnerHTML={{ __html: howToAnswer }}
                      />
                    </motion.div>
                  )}

                  {example && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-100"
                    >
                      <h4 className="font-semibold text-emerald-900 mb-3 flex items-center">
                        <span className="mr-2">💡</span>
                        Example Answer
                      </h4>
                      <div 
                        className="text-emerald-800 prose prose-sm max-w-none prose-headings:text-emerald-900 prose-a:text-emerald-600"
                        dangerouslySetInnerHTML={{ __html: example }}
                      />
                    </motion.div>
                  )}
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </motion.div>
  );
};

export default QuestionCard; 