import { Directive, HostBinding } from '@angular/core';
import { BaseAnimateOnVisible } from './base-animate-on-visible.directive';

@Directive({
  selector: '[appAnimateOnVisibleLeft]'
})
export class AnimateOnVisibleLeft extends BaseAnimateOnVisible {

  @HostBinding('@revealFromLeft')
  get animationState() {
    return this.isVisible() ? 'visible' : 'hidden';
  }

}
