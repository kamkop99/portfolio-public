import { ElementRef, AfterViewInit, OnDestroy, inject, signal, Injectable, OnInit } from '@angular/core';

@Injectable()
export abstract class BaseAnimateOnVisible implements AfterViewInit, OnDestroy {
  protected element = inject(ElementRef).nativeElement as HTMLElement;
  protected observer!: IntersectionObserver;

  protected isVisible = signal(false);

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.isVisible.set(entry.isIntersecting);
      },
      { 
        threshold: 0.1, 
        rootMargin: "100px 0px 0px 0px"
      }
    );
    this.observer.observe(this.element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
