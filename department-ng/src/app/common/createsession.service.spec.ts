import { TestBed } from '@angular/core/testing';

import { CreatesessionService } from './createsession.service';

describe('CreatesessionService', () => {
  let service: CreatesessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatesessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
