import { TestBed } from '@angular/core/testing';

import { GetAttandanceDataService } from './get-attandance-data.service';

describe('GetAttandanceDataService', () => {
  let service: GetAttandanceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAttandanceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
