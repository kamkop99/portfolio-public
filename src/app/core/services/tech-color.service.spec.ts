import { TestBed } from '@angular/core/testing';

import { TechColorService } from './tech-color.service';

describe('TechColorService', () => {
  let service: TechColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
