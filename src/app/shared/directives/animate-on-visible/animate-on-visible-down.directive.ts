import { Directive, HostBinding, ContentChild, ElementRef, Input } from '@angular/core';
import { BaseAnimateOnVisible } from './base-animate-on-visible.directive';

@Directive({
  selector: '[appAnimateOnVisibleDown]'
})
export class AnimateOnVisibleDown extends BaseAnimateOnVisible {

  @Input() delayMs = 0;
  @Input() durationMs = 600;

  @HostBinding('@revealFromDown')
  get animationBinding() {
    return {
      value: this.isVisible() ? 'visible' : 'hidden',
      params: {
        delay: this.delayMs,
        duration: this.durationMs
      }
    };
  }

}
