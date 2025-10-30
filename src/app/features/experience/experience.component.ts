import { Component, HostListener, ViewChildren, ElementRef, QueryList, ViewChild, computed, input, ChangeDetectionStrategy, DestroyRef, inject, InputSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ExperienceItem } from '../../shared/models/experience-model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { ExperienceCardComponent } from './experience-card/experience-card.component/experience-card.component';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [FormsModule, TimelineModule, CardModule, ExperienceCardComponent, CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Experience {
  private readonly destroyRef = inject(DestroyRef);

  fillPercent = 0;
  smallScreen = false;

  readonly data: InputSignal<ExperienceItem[]> = input<ExperienceItem[]>([]);

  readonly vmData = computed<ExperienceItem[]>(() => {
    const src = this.data();
    const last = src.length - 1;
    return src.map((it, i) => ({
      ...it,
      __id: i,
      reached: i !== last,
      revealed: false,
    }));
  });

  @ViewChildren(ExperienceCardComponent) cards!: QueryList<ExperienceCardComponent>;
  @ViewChild('timelineContainer') timelineContainer!: ElementRef;

  constructor(private readonly bp: BreakpointObserver) {
    this.bp.observe('(max-width: 1550px)')
      .pipe(
        map(r => r.matches),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(match => (this.smallScreen = match));
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(_: Event) {
    if (this.smallScreen) return;

    const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const offset = 800;
    const scrollY = Math.max(0, window.scrollY - offset);
    const effectiveScrollableHeight = Math.max(1, scrollableHeight - offset);
    const fillCheck = (scrollY / effectiveScrollableHeight) * 150;
    this.fillPercent = Math.min(100, fillCheck);

    const timelineEl = this.timelineContainer.nativeElement.querySelector('.timeline');
    const fillEl = this.timelineContainer.nativeElement.querySelector('.fill');
    const timelineTop = timelineEl.getBoundingClientRect().top + window.scrollY;
    const fillHeight = fillEl.offsetHeight;

    for (const card of this.cards.toArray()) {
      card.updateFill(timelineTop, fillHeight);
    }
  }
}