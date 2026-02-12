'use client';

import React from 'react';

interface MarkdownProps {
  content: string;
}

// Simple markdown to HTML converter
function parseMarkdown(markdown: string): string {
  let html = markdown;
  
  // Code blocks (must come before inline code)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
  
  // Headers with IDs for TOC linking
  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  html = html.replace(/^#### (.*$)/gim, (_, text) => `<h4 id="${slugify(text)}">${text}</h4>`);
  html = html.replace(/^### (.*$)/gim, (_, text) => `<h3 id="${slugify(text)}">${text}</h3>`);
  html = html.replace(/^## (.*$)/gim, (_, text) => `<h2 id="${slugify(text)}">${text}</h2>`);
  html = html.replace(/^# (.*$)/gim, (_, text) => `<h1 id="${slugify(text)}">${text}</h1>`);
  
  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr />');
  
  // Tables
  html = html.replace(/^\|(.+)\|$/gim, (match, content) => {
    const cells = content.split('|').map((c: string) => c.trim());
    const isHeader = cells.some((c: string) => /^[-:]+$/.test(c));
    if (isHeader) return '';
    const tag = 'td';
    const cellsHtml = cells.map((c: string) => `<${tag}>${c}</${tag}>`).join('');
    return `<tr>${cellsHtml}</tr>`;
  });
  html = html.replace(/(<tr>[\s\S]*?<\/tr>[\s]*)+/g, '<table>$&</table>');
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');
  
  // Unordered lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
  
  // Paragraphs
  html = html.split(/\n\n+/).map(block => {
    block = block.trim();
    if (!block) return '';
    if (block.startsWith('<h') || 
        block.startsWith('<ul') || 
        block.startsWith('<ol') || 
        block.startsWith('<blockquote') ||
        block.startsWith('<table') ||
        block.startsWith('<pre') ||
        block.startsWith('<hr')) {
      return block;
    }
    return `<p>${block.replace(/\n/g, '<br />')}</p>`;
  }).join('\n\n');
  
  return html;
}

export default function Markdown({ content }: MarkdownProps) {
  const html = parseMarkdown(content);
  
  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
}
