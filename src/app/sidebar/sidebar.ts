import { AfterViewInit, Component, Input, OnDestroy, OnInit, NgZone, ApplicationRef } from '@angular/core'; // Import NgZone
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AboutSection } from '../sections/about/about-model';
import { ExperienceSection } from '../sections/experience/experience-model';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { startWith, map, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TrackService } from '../track/track-service';
type Section = AboutSection | ExperienceSection;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit, AfterViewInit, OnDestroy {
  @Input() sections: Section[] = [];
  activeId: string | null = null;
  private observer?: IntersectionObserver;
  private subscription!: Subscription;

  currentLang: 'pl' | 'en' = 'pl';
  menuOpen = false;

  readonly flags = {
    en: 'flags/en.svg',
    pl: 'flags/pl.svg',
  } as const;

  constructor(
    private translate: TranslateService,
    private trackService: TrackService
  ) {
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }
  
  ngOnInit(): void {
      this.subscription = this.trackService.activeSection$.subscribe(
      (sectionId) => {
        this.activeId = sectionId;
      }
    );
  }
  
  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            this.activeId = e.target.id;
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    setTimeout(() => {
      this.sections.forEach((it) => {
        const el = document.getElementById(it.id);
        if (el && this.observer) {
          this.observer.observe(el);
        }
      });
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.subscription?.unsubscribe();
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  isActive(id: string) {
    return this.activeId === id;
  }

  toggleLang(): void {
    this.currentLang = this.currentLang === 'pl' ? 'en' : 'pl';
    this.translate.use(this.currentLang);
  }
    toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
