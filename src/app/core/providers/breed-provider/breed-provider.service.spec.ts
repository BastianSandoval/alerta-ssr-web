import { TestBed } from '@angular/core/testing';

import { BreedProviderService } from './breed-provider.service';

describe('DogApiProviderService', () => {
  let service: BreedProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreedProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
