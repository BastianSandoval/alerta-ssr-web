import { TestBed } from '@angular/core/testing';

import { TenderProvider.Service.TsService } from './tender-provider.service.ts.service';

describe('TenderProvider.Service.TsService', () => {
  let service: TenderProvider.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenderProvider.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
