import { Directive, HostBinding, Input } from '@angular/core';
import { BaseAnimateOnVisible } from './base-animate-on-visible.directive';
import { Direction } from '../../models';

@Directive({
  selector: '[appAnimateOnVisibleSideDirective]'
})
export class AnimateOnVisibleSideDirective extends BaseAnimateOnVisible {
  @Input() direction: Direction = 'left';

  @HostBinding('@revealFromSide')
  get animationState() {
    return this.isVisible() ? `visible-${this.direction}` : 'hidden';
  }

}
