import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TrackSection } from './track-section.directive';
import { TrackService } from '../../../core/services/track.service';

class MockTrackService {
  setActiveSection = jasmine.createSpy('setActiveSection');
}

class MockIntersectionObserver {
  constructor(public callback: any) {}
  observe = jasmine.createSpy('observe');
  disconnect = jasmine.createSpy('disconnect');

  triggerIntersect(isIntersecting: boolean) {
    this.callback([{ isIntersecting }]);
  }
}
(globalThis as any).IntersectionObserver = MockIntersectionObserver;

@Component({
  template: `<div trackSection="about"></div>`,
  standalone: true,
  imports: [TrackSection],
})
class HostComponent {}

describe('TrackSection Directive', () => {
  let fixture: ComponentFixture<HostComponent>;
  let mockService: MockTrackService;
  let directiveInstance: TrackSection;
  let mockObserver: MockIntersectionObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: TrackService, useClass: MockTrackService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    mockService = TestBed.inject(TrackService) as any;
    directiveInstance = fixture.debugElement
      .query(By.directive(TrackSection))
      .injector.get(TrackSection);

    mockObserver = directiveInstance['io'] as unknown as MockIntersectionObserver;
  });

  it('should create the directive instance', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should start observing the host element on init', () => {
    expect(mockObserver.observe).toHaveBeenCalledWith(
      jasmine.any(HTMLElement)
    );
  });

  it('should call trackService.setActiveSection when element becomes visible', () => {
    mockObserver.triggerIntersect(true);
    expect(mockService.setActiveSection).toHaveBeenCalledWith('about');
  });

  it('should disconnect observer on destroy', () => {
    directiveInstance.ngOnDestroy();
    expect(mockObserver.disconnect).toHaveBeenCalled();
  });
});
