import { TestBed } from '@angular/core/testing';

import { DonationAmountProviderService } from './donation-amount-provider.service';

describe('DonationAmountProviderService', () => {
  let service: DonationAmountProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationAmountProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
