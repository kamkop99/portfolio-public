import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  input,
  signal,
  inject,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TimeUnitPipe } from '../../../../shared/pipes/time-unit-pipe';
import { CardModule } from 'primeng/card';
import { AnimateOnVisibleDown } from '../../../../shared/directives/animate-on-visible/animate-on-visible-down.directive';
import { AnimateOnVisibleSideDirective } from '../../../../shared/directives/animate-on-visible/animate-on-visible-side.directive';
import { Direction } from '../../../../shared/models';
import { ExperienceItem } from '../../../../shared/models/experience-model';

@Component({
  standalone: true,
  selector: 'app-experience-card',
  imports: [TimeUnitPipe, TranslateModule, CardModule, AnimateOnVisibleDown, AnimateOnVisibleSideDirective],
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceCardComponent {
  readonly exp = input.required<ExperienceItem>();
  readonly side = input<Direction>('left');

  @ViewChild('dot', { static: true }) dot!: ElementRef<HTMLElement>;
  @ViewChild('connector', { static: true }) connector!: ElementRef<HTMLElement>;

  readonly filled = signal(false);

  private readonly translate = inject(TranslateService);

  isLeft(): boolean {
    return this.side() === 'left';
  }

  findDoi(text: string): { preDoiText: string; doiText: string; postDoiText: string; link: string } | null {
    const doiRegex = /(10\.\d{4,9}\/[-_;()/:A-Z0-9]+)/i;
    const match = doiRegex.exec(text);
    if (!match?.[1]) return null;

    const doi = match[1];
    const doiIndex = text.indexOf(doi);
    const preDoiText = text.substring(0, doiIndex);
    const postDoiText = text.substring(doiIndex + doi.length);
    const link = `https://link.springer.com/article/${doi}`;

    return { preDoiText, doiText: doi, postDoiText, link };
  }
  parseDate(date: string): Date {
    const [monthStr, yearStr] = date.split('/');
    const month = Number.parseInt(monthStr, 10);
    const year = Number.parseInt(yearStr, 10);
    return new Date(year, month, 0);
  }

  getYear(date: string | null | undefined): string {
    if (date === null || date === undefined) {
      return this.translate.instant('experience.present');
    }
    return date.split('/')[1] ?? '';
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

    if (years < 0) {
      years = 0;
      months = 0;
    }

    return { y: years, m: months };
  }

  updateFill(timelineTop: number, fillHeight: number): void {
    const dotY = this.dot.nativeElement.getBoundingClientRect().top + window.scrollY;
    const isReached = dotY < timelineTop + fillHeight;
    this.filled.set(isReached);
  }
}
