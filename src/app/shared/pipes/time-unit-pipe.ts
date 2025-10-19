import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ 
  name: 'timeUnit', 
  standalone: true, 
  pure: false 
})
export class TimeUnitPipe implements PipeTransform {
  private translate = inject(TranslateService);

  transform(value: number, unit: 'year' | 'month'): string {
    const lang = (this.translate.currentLang || 'en').split('-')[0];
    const pluralRules = new Intl.PluralRules(lang);
    const category = pluralRules.select(value); 

    const word =
      this.translate.instant(`time.${unit}.${category}`) ||
      this.translate.instant(`time.${unit}.other`);

    return `${value} ${word}`;
  }
}