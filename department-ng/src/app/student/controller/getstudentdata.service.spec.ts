import { TestBed } from '@angular/core/testing';

import { GetstudentdataService } from './getstudentdata.service';

describe('GetstudentdataService', () => {
  let service: GetstudentdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetstudentdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
