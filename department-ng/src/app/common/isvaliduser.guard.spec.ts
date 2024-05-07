import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isvaliduserGuard } from './isvaliduser.guard';

describe('isvaliduserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isvaliduserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
