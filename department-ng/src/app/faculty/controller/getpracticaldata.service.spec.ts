import { TestBed } from '@angular/core/testing';

import { GetpracticaldataService } from './getpracticaldata.service';

describe('GetpracticaldataService', () => {
  let service: GetpracticaldataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetpracticaldataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
