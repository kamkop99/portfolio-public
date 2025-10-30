import { Directive, HostBinding, input } from '@angular/core';
import { BaseAnimateOnVisible } from './base-animate-on-visible.directive';

@Directive({
  selector: '[appAnimateOnVisibleDown]',
  standalone: true,
})
export class AnimateOnVisibleDown extends BaseAnimateOnVisible {
  readonly distance = input<string>('100px');
  readonly durationMs = input<number>(600);
  readonly delayMs = input<number>(0);

  @HostBinding('class.reveal') baseRevealClass = true;
  @HostBinding('class.reveal-down') downClass = true;

  @HostBinding('style.--distance') get cssDistance() {
    return this.distance();
  }
  @HostBinding('style.--duration') get cssDuration() {
    return `${this.durationMs()}ms`;
  }
  @HostBinding('style.--delay') get cssDelay() {
    return `${this.delayMs()}ms`;
  }
}
