import { remark } from 'remark';
import html from 'remark-html';
import { Question, CategoryId } from '@/types';
import { getMarkdownContent } from './actions';

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export async function getQuestionsFromMarkdown(category: CategoryId): Promise<Question[]> {
  const fileContent = await getMarkdownContent(category);
  
  const questions: Question[] = [];
  const sections = fileContent.split('\n## ');
  
  for (const section of sections.slice(1)) {
    const lines = section.split('\n');
    const subcategory = lines[0];
    
    const questionBlocks = section.split('\n### ').slice(1);
    
    for (const block of questionBlocks) {
      const parts = block.split('\n#### ');
      const title = parts[0].trim();
      
      const howToAnswer = parts.find(p => p.startsWith('How to Answer'))?.
        replace('How to Answer\n', '').trim();
      
      const example = parts.find(p => p.startsWith('Example Answer'))?.
        replace('Example Answer\n', '').trim();
      
      questions.push({
        id: `${category}-${subcategory}-${title}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        title,
        content: title,
        howToAnswer: howToAnswer ? await markdownToHtml(howToAnswer) : undefined,
        example: example ? await markdownToHtml(example) : undefined,
        category,
        subcategory,
      });
    }
  }
  
  return questions;
} 