import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
  effect,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../core/services/theme.service';
import { TrackService } from '../../core/services/track.service';
import { SectionModel } from '../../shared/models/section-model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar implements OnInit, AfterViewInit, OnDestroy {
  readonly sections = input<SectionModel[]>([]);

  readonly menuOpen = signal(false);
  readonly currentLang = signal<'pl' | 'en'>('pl');
  readonly activeId = signal<string | null>(null);

  private readonly translate = inject(TranslateService);
  private readonly themeService = inject(ThemeService);
  private readonly trackService = inject(TrackService);

  private observer?: IntersectionObserver;

  readonly flags = {
    en: 'flags/en.svg',
    pl: 'flags/pl.svg',
  } as const;

  constructor() {
    this.translate.use(this.currentLang());

    effect(() => {
      const id = this.trackService.activeSectionSig?.() ?? '';
      if (id) this.activeId.set(id);
    });
  }

  ngOnInit(): void {
    this.themeService.init();
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.id;
            this.activeId.set(id);
            this.trackService.setActiveSection(id);
          }
        }
      },
      { threshold: 0.5 }
    );

    queueMicrotask(() => {
      for (const sections of this.sections()){
        const el = document.getElementById(sections.id);
        if (el) this.observer!.observe(el);
      }
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleLang(): void {
    const next = this.currentLang() === 'pl' ? 'en' : 'pl';
    this.currentLang.set(next);
    this.translate.use(next);
  }

  onToggleTheme(): void {
    this.themeService.toggleWithTransition();
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onNavItemClick(id: string): void {
    this.scrollTo(id);
    this.closeMenu();
  }

  isActive(id: string): boolean {
    return this.activeId() === id;
  }

  get isDark(): boolean {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }
}
