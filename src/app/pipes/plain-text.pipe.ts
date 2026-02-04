import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plainText',
  standalone: true
})
export class PlainTextPipe implements PipeTransform {
  transform(value?: string | null): string {
    if (!value) {
      return '';
    }

    return value
      .replace(/^#{1,3}\s+/gm, '')
      .replace(/^\-\s+/gm, '')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
