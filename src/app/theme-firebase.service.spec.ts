import { TestBed } from '@angular/core/testing';

import { ThemeFirebaseService } from './theme-firebase.service';

describe('ThemeFirebaseService', () => {
  let service: ThemeFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
