import { Directive, HostBinding } from '@angular/core';
import { BaseAnimateOnVisible } from '../base-animate-on-visible';

@Directive({
  selector: '[appAnimateOnVisibleRight]'
})
export class AnimateOnVisibleRight extends BaseAnimateOnVisible {

  @HostBinding('@revealFromRight')
  get animationState() {
    return this.isVisible() ? 'visible' : 'hidden';
  }

}
