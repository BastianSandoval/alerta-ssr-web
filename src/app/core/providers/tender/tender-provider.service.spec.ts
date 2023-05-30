import { TestBed } from '@angular/core/testing';

import { TenderProviderService } from './tender-provider.service';

describe('TenderProviderService', () => {
  let service: TenderProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenderProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
