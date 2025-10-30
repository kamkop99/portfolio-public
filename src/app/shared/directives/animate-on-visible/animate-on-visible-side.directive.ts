import { Directive, HostBinding, input } from '@angular/core';
import { BaseAnimateOnVisible } from './base-animate-on-visible.directive';
import { Direction } from '../../models';

@Directive({
  selector: '[appAnimateOnVisibleSideDirective]',
  standalone: true,
})
export class AnimateOnVisibleSideDirective extends BaseAnimateOnVisible {
  readonly direction = input<Direction>('left');
  readonly distance = input<string>('100px');
  readonly durationMs = input<number>(600);
  readonly delayMs = input<number>(0);

  @HostBinding('class.reveal') baseRevealClass = true;

  @HostBinding('class.reveal-side') sideBaseClass = true;
  @HostBinding('class.reveal-side-left') get leftClass() {
    return this.direction() === 'left';
  }
  @HostBinding('class.reveal-side-right') get rightClass() {
    return this.direction() === 'right';
  }

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
