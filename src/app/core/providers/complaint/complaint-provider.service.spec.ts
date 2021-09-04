import { TestBed } from '@angular/core/testing';

import { ComplaintProviderService } from './complaint-provider.service';

describe('ComplaintProviderService', () => {
  let service: ComplaintProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplaintProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
