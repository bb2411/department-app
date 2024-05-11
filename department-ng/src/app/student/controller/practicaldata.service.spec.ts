import { TestBed } from '@angular/core/testing';

import { PracticaldataService } from './practicaldata.service';

describe('PracticaldataService', () => {
  let service: PracticaldataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticaldataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
