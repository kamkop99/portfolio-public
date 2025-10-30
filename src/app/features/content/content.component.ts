import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnDestroy,
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
import { animations } from '../../shared/models/animations-model';
import { SectionModel } from '../../shared/models/section-model';

@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  imports: [AnimateOnVisibleDown, TrackSection, NgComponentOutlet],
  animations,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Content implements AfterViewInit, OnDestroy {
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

  private fragmentSub?: import('rxjs').Subscription;
  private changesSub?: import('rxjs').Subscription;

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

  ngOnDestroy(): void {
    this.fragmentSub?.unsubscribe();
    this.changesSub?.unsubscribe();
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
