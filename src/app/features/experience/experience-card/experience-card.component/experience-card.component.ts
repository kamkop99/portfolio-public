import { ChangeDetectionStrategy, Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TimeUnitPipe } from '../../../../shared/pipes/time-unit-pipe';
import { CardModule } from 'primeng/card';
import { AnimateOnVisibleDown } from '../../../../shared/directives/animate-on-visible/animate-on-visible-down.directive';
import { AnimateOnVisibleSideDirective } from '../../../../shared/directives/animate-on-visible/animate-on-visible-side.directive';
import { animations } from '../../../../shared/models/animations-model';
import { Direction } from '../../../../shared/models';

@Component({
  standalone: true,
  selector: 'app-experience-card',
  imports: [TimeUnitPipe, TranslateModule, CardModule, AnimateOnVisibleDown, AnimateOnVisibleSideDirective],
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
  animations: animations,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceCardComponent {
  @Input({ required: true }) exp!: any;
  @Input() side: Direction = 'left';


  @ViewChild('dot', { static: true }) dot!: ElementRef<HTMLElement>;
  @ViewChild('connector', { static: true }) connector!: ElementRef<HTMLElement>;

  private _filled = signal(false);
  filled = this._filled;

  isLeft(): boolean {
    return this.side === 'left';
  }

  constructor(private translate: TranslateService) { }

  findDoi(text: string): { preDoiText: string, doiText: string, postDoiText: string, link: string } | null {
    const doiRegex = /(10\.\d{4,9}\/[-_;()/:A-Z0-9]+)/i;
    const match = text.match(doiRegex);

    if (match && match[1]) {
      const doi = match[1];

      const doiIndex = text.indexOf(doi);

      const preDoiText = text.substring(0, doiIndex);
      const postDoiText = text.substring(doiIndex + doi.length);

      const link = `https://link.springer.com/article/${doi}`;

      return { preDoiText, doiText: doi, postDoiText, link };
    }
    return null;
  }

  parseDate(date: string): Date {
    const [monthStr, yearStr] = date.split('/');
    const month = Number.parseInt(monthStr, 10);
    const year = Number.parseInt(yearStr, 10);
    return new Date(year, month, 0);
  }

  getYear(date: string): string {
    if (date === null || date === undefined) {
      return this.translate.instant("experience.present");
    }
    return date.split('/')[1];
  }

  getDateDiff(fromDate: string, toDate: string | null) {
    const from = this.parseDate(fromDate);
    const to = toDate ? this.parseDate(toDate) : new Date();

    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth() + 1;

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (years < 0) { years = 0; months = 0; }

    return { y: years, m: months };
  }

  updateFill(timelineTop: number, fillHeight: number): void {
    const dotY = this.dot.nativeElement.getBoundingClientRect().top + window.scrollY;
    const isReached = dotY < (timelineTop + fillHeight);
    this._filled.set(isReached);
  }
}