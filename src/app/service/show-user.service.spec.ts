import { TestBed } from '@angular/core/testing';

import { ShowUserService } from './show-user.service';

describe('ShowUserService', () => {
  let service: ShowUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
