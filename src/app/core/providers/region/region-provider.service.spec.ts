import { TestBed } from '@angular/core/testing';

import { RegionProviderService } from './region-provider.service';

describe('RegionProviderService', () => {
  let service: RegionProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
