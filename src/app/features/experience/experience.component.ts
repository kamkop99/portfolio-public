import { Component, Input, HostListener, OnInit, ViewChildren, ElementRef, QueryList, ViewChild, OnDestroy } from '@angular/core';
import { animations } from '../../shared/models/animations-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ExperienceItem } from '../../shared/models/experience-model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Subscription } from 'rxjs';
import { AnimateOnVisibleRight } from '../../shared/directives/animate-on-visible/animate-on-visible-right.directive';
import { AnimateOnVisibleLeft } from '../../shared/directives/animate-on-visible/animate-on-visible-left.directive';
import { AnimateOnVisibleDown } from '../../shared/directives/animate-on-visible/animate-on-visible-down.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TimeUnitPipe } from '../../shared/pipes/time-unit-pipe';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, FormsModule, ButtonModule, TimelineModule, CardModule, AnimateOnVisibleRight, AnimateOnVisibleLeft, AnimateOnVisibleDown, TranslateModule, TimeUnitPipe],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  providers: [],
  animations: animations
})
export class Experience implements OnInit, OnDestroy {
  
  fillPercent = 0;
  smallScreen = false;
  private sub: Subscription;

  @Input() data: ExperienceItem[] = [];
  @ViewChildren('dot', { read: ElementRef }) dots!: QueryList<ElementRef>;
  @ViewChild('timelineContainer') timelineContainer!: ElementRef;

  constructor(private translate: TranslateService, private bp: BreakpointObserver) {
    this.sub = this.bp
      .observe('(max-width: 1550px)')
      .pipe(map(r => r.matches))
      .subscribe(match => (this.smallScreen = match));
  }

  parseDate(date: string): Date {
    const [monthStr, yearStr] = date.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    return new Date(year, month, 0);
  }

  getYear(date: string): string {
    if (date === null || date === undefined){
      return this.translate.instant("experience.present");
    }
    return  date.split('/')[1];
  }

  getDateDiff(fromDate: string, toDate: string | null) {
    const from = this.parseDate(fromDate);
    const to   = toDate ? this.parseDate(toDate) : new Date();

    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth() + 1;

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (years < 0) { years = 0; months = 0; }

    return { y: years, m: months };
  }

  ngOnInit() {
    if (this.data && this.data.length > 0) {
      const lastIndex = this.data.length -1;
      for (let i = 0; i < this.data.length; i++) {
         this.data[i].__id = i;
        if(i === lastIndex){
          this.data[i].reached = false;
          this.data[i].revealed = false;
        }
        else {
          this.data[i].reached = true;
          this.data[i].revealed = false;
        }
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.smallScreen) {
      return;
    }
    const scrollableHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const offset = 800;
    const scrollY = Math.max(0, window.scrollY - offset);
    const effectiveScrollableHeight = Math.max(1, scrollableHeight - offset);
    const fillCheck = (scrollY / effectiveScrollableHeight) * 150;
    if(fillCheck > 100) {
       this.fillPercent = 100;
    }
    else {
      this.fillPercent = fillCheck;
    }

    const timelineEl = this.timelineContainer.nativeElement.querySelector('.timeline');
    const fillEl = this.timelineContainer.nativeElement.querySelector('.fill');

    const timelineTop = timelineEl.getBoundingClientRect().top + window.scrollY;
    const fillHeight = fillEl.offsetHeight;

    this.dots?.forEach((dotRef: ElementRef) => {
      const dotEl = dotRef.nativeElement as HTMLElement;
      const dotY = dotEl.getBoundingClientRect().top + window.scrollY;

      const isReached = dotY < (timelineTop + fillHeight);
      dotEl.parentElement?.classList.toggle('filled', isReached);
    });
    
  }

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}