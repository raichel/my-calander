import { TestBed } from '@angular/core/testing';

import { CalanderFirebaseService } from './calander-firebase-service';

describe('CalanderFirebaseService', () => {
  let service: CalanderFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalanderFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
