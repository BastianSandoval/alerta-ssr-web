import { TestBed } from '@angular/core/testing';

import { ValidatorProviderService } from './validator-provider.service';

describe('ValidatorProviderService', () => {
  let service: ValidatorProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
