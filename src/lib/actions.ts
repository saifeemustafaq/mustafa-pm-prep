'use server';

import fs from 'fs';
import path from 'path';
import { CategoryId } from './constants';

export async function getQuestionCounts(): Promise<Record<CategoryId, number>> {
  const contentDir = path.join(process.cwd(), 'src/content');
  const counts: Partial<Record<CategoryId, number>> = {};

  const files = fs.readdirSync(contentDir);
  for (const file of files) {
    if (file.endsWith('.md')) {
      const category = file.replace('.md', '') as CategoryId;
      const content = fs.readFileSync(path.join(contentDir, file), 'utf8');
      const sections = content.split('\n## ');
      let questionCount = 0;
      
      sections.slice(1).forEach(section => {
        const questionBlocks = section.split('\n### ').slice(1);
        questionCount += questionBlocks.length;
      });

      counts[category] = questionCount;
    }
  }

  return counts as Record<CategoryId, number>;
}

export async function getMarkdownContent(category: CategoryId): Promise<string> {
  const filePath = path.join(process.cwd(), 'src/content', `${category}.md`);
  return fs.readFileSync(filePath, 'utf8');
} 