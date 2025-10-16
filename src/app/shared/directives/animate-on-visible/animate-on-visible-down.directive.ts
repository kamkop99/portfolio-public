import { Directive, HostBinding, ContentChild, ElementRef } from '@angular/core';
import { BaseAnimateOnVisible } from './base-animate-on-visible.directive';

@Directive({
  selector: '[appAnimateOnVisibleDown]'
})
export class AnimateOnVisibleDown extends BaseAnimateOnVisible {

  @HostBinding('@revealFromDown')
  get animationState() {
    return this.isVisible() ? 'visible' : 'hidden';
  }

}
