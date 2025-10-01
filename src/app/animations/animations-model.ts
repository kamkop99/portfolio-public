import { trigger, state, style, transition, animate } from '@angular/animations';

export const revealFromLeft = trigger('revealFromLeft', [
  state('hidden', style({
    opacity: 0,
    transform: 'translateX(-100px) translateY(0px)'
  })),
  state('visible', style({
    opacity: 1,
    transform: 'translateX(0) translateY(0)'
  })),
  transition('hidden => visible', [
    animate('600ms cubic-bezier(0.35, 0, 0.25, 1)')
  ]),
  transition('visible => hidden', [
    animate('0ms')
  ])
]);

export const revealFromRight = trigger('revealFromRight', [
  state('hidden', style({
    opacity: 0,
    transform: 'translateX(100px) translateY(0px)'
  })),
  state('visible', style({
    opacity: 1,
    transform: 'translateX(0) translateY(0)'
  })),
  transition('hidden => visible', [
    animate('600ms cubic-bezier(0.35, 0, 0.25, 1)')
  ]),
  transition('visible => hidden', [
    animate('0ms')
  ])
]);

export const revealFromDown = trigger('revealFromDown', [
  state('hidden', style({
    opacity: 0,
    transform: 'translateX(0px) translateY(100px)',
  })),
  state('visible', style({
    opacity: 1,
    transform: 'translateX(0) translateY(0)'
  })),
  transition('hidden => visible', [
    animate('600ms cubic-bezier(0.35, 0, 0.25, 1)')
  ]),
  transition('visible => hidden', [
    animate('0ms')
  ])
]);

export const animations = [
  revealFromLeft,
  revealFromRight,
  revealFromDown
];