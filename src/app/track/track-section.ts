import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { TrackService } from './track-service';

@Directive({
  selector: '[trackSection]'
})
export class TrackSection implements OnInit, OnDestroy {
  @Input('trackSection') id = '';

  private io!: IntersectionObserver;

  constructor(
    private host: ElementRef<HTMLElement>,
    private trackService: TrackService
  ) {}

  ngOnInit() {
    this.io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.trackService.setActiveSection(this.id);
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    this.io.observe(this.host.nativeElement);
  }

  ngOnDestroy() {
    this.io.disconnect();
  }
}