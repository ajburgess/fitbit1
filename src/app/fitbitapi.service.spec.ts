import { TestBed } from '@angular/core/testing';

import { FitbitapiService } from './fitbitapi.service';

describe('FitbitapiService', () => {
  let service: FitbitapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitbitapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
