import { TestBed } from '@angular/core/testing';

import { CommuneProviderService } from './commune-provider.service';

describe('CommuneProviderService', () => {
  let service: CommuneProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommuneProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
