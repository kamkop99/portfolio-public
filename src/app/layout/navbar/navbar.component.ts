import { AfterViewInit, ChangeDetectionStrategy, Component, input, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AboutSection } from '../../shared/models/about-model';
import { ExperienceSection } from '../../shared/models/experience-model';
import { TranslateService } from '@ngx-translate/core';
import { TrackService } from '../../core/services/track.service';
import { ThemeService } from '../../core/services/theme.service';
import { ProjectsSection } from '../../shared/models/projects-model';

type Section = AboutSection | ExperienceSection | ProjectsSection;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar implements OnInit, AfterViewInit, OnDestroy {
  sections = input<Section[]>([]);
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
    private trackService: TrackService,
    private themeService: ThemeService
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
      this.themeService.init();
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
      this.sections().forEach((it) => {
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

  onToggleTheme() { this.themeService.toggleWithTransition(); }

  get isDark(): boolean {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
}
