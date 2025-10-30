import { Directive, ElementRef, OnDestroy, AfterViewInit, inject, signal } from '@angular/core';

@Directive()
export abstract class BaseAnimateOnVisible implements AfterViewInit, OnDestroy {
  protected element = inject(ElementRef<HTMLElement>).nativeElement;
  protected observer!: IntersectionObserver;

  protected readonly isVisible = signal(false);

  ngAfterViewInit(): void {
    this.element.classList.add('is-hidden');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        this.isVisible.set(nowVisible);

        if (nowVisible) {
          requestAnimationFrame(() => {
            this.element.classList.add('is-visible');
            this.element.classList.remove('is-hidden');
          });
        } else {
          requestAnimationFrame(() => {
            this.element.classList.add('is-hidden');
            this.element.classList.remove('is-visible');
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px 0px 0px',
      }
    );
    requestAnimationFrame(() => this.observer.observe(this.element));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
