import { TestBed } from '@angular/core/testing';

import { RainbowSixSiegeService } from './rainbow-six-siege.service';

describe('TeamService', () => {
  let service: RainbowSixSiegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RainbowSixSiegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
