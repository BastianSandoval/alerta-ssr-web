import { TestBed } from '@angular/core/testing';

import { InstitutionProviderService } from './institution-provider.service';

describe('InstitutionProviderService', () => {
  let service: InstitutionProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
