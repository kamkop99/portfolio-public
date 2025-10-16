import { Component, Directive } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseAnimateOnVisible } from './base-animate-on-visible.directive';

@Directive({
  selector: '[testAnimateOnVisible]',
  standalone: true,
})
class TestAnimateOnVisibleDirective extends BaseAnimateOnVisible {}

@Component({
  template: `<div testAnimateOnVisible></div>`,
  standalone: true,
  imports: [TestAnimateOnVisibleDirective],
})
class HostComponent {}

describe('BaseAnimateOnVisible', () => {
  beforeAll(() => {
    (globalThis as any).IntersectionObserver = class {
      observe() {}
      disconnect() {}
    } as any;
  });

  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const dir = fixture.debugElement
      .query(By.directive(TestAnimateOnVisibleDirective))
      .injector.get(TestAnimateOnVisibleDirective);
    expect(dir).toBeTruthy();
  });
});