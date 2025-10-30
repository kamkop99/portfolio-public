import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  QueryList,
  Type,
  ViewChildren,
  inject,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimateOnVisibleDown } from '../../shared/directives/animate-on-visible/animate-on-visible-down.directive';
import { TrackSection } from '../../shared/directives/track-section/track-section.directive';
import { About } from '../about/about.component';
import { Experience } from '../experience/experience.component';
import { Projects } from '../projects/projects.component';
import { SectionModel } from '../../shared/models/section-model';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  imports: [AnimateOnVisibleDown, TrackSection, NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Content implements AfterViewInit {
  @Input({ required: true }) sections: SectionModel[] = [];

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  private readonly componentMap: Record<string, Type<unknown>> = {
    about: About,
    experience: Experience,
    projects: Projects,
  };

  @ViewChildren('section', { read: ElementRef })
  private readonly sectionEls!: QueryList<ElementRef<HTMLElement>>;

  private readonly fragmentSub: Subscription;
  private changesSub?: Subscription;

  trackById = (s: SectionModel) => s.id;

  getComponent(componentId: string): Type<unknown> | null {
    return this.componentMap[componentId] ?? null;
  }

  constructor() {
    this.fragmentSub = this.route.fragment.subscribe(() => {
      queueMicrotask(() => this.scheduleScroll());
    });

    this.destroyRef.onDestroy(() => {
      this.fragmentSub?.unsubscribe();
      this.changesSub?.unsubscribe();
    });
  }

  ngAfterViewInit(): void {
    this.changesSub = this.sectionEls.changes.subscribe(() => this.scheduleScroll());

    queueMicrotask(() => this.scheduleScroll());
  }

  private scheduleScroll(): void {
    const fragment = this.route.snapshot.fragment;
    if (!fragment) return;
    requestAnimationFrame(() => this.tryScroll(fragment));
  }

  private tryScroll(fragment: string, retries = 10): void {
    const el =
      document.getElementById(fragment) ??
      this.sectionEls?.toArray().find((r) => r.nativeElement.id === fragment)?.nativeElement;

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (retries > 0) {
      requestAnimationFrame(() => this.tryScroll(fragment, retries - 1));
    }
  }
}
