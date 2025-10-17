import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimalMeterGroupComponent } from './decimal-meter-group.component';

describe('DecimalMeterGroupComponent', () => {
  let component: DecimalMeterGroupComponent;
  let fixture: ComponentFixture<DecimalMeterGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecimalMeterGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecimalMeterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
