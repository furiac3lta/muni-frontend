import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'richText',
  standalone: true
})
export class RichTextPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value?: string | null): SafeHtml {
    if (!value) {
      return '';
    }

    const escaped = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const lines = escaped.split(/\r?\n/);
    const blocks: string[] = [];
    let inList = false;

    const closeList = () => {
      if (inList) {
        blocks.push('</ul>');
        inList = false;
      }
    };

    const formatInline = (text: string) => {
      return text
        .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, '<img src="$2" alt="$1" />')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
    };

    lines.forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) {
        closeList();
        return;
      }

      const headingMatch = line.match(/^(#{1,3})\s*(.+)$/);
      if (headingMatch) {
        closeList();
        const level = headingMatch[1].length;
        const text = formatInline(headingMatch[2]);
        if (level === 1) blocks.push(`<h1>${text}</h1>`);
        if (level === 2) blocks.push(`<h2>${text}</h2>`);
        if (level === 3) blocks.push(`<h3>${text}</h3>`);
        return;
      }
      if (line.startsWith('- ')) {
        if (!inList) {
          blocks.push('<ul>');
          inList = true;
        }
        blocks.push(`<li>${formatInline(line.substring(2))}</li>`);
        return;
      }

      closeList();
      blocks.push(`<p>${formatInline(line)}</p>`);
    });

    closeList();

    const html = blocks.join('');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
