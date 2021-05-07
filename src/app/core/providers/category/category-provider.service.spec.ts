import { TestBed } from '@angular/core/testing';

import { CategoryProviderService } from './category-provider.service';

describe('CategoryProviderService', () => {
  let service: CategoryProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
