import { TestBed } from '@angular/core/testing';

import { CommentProviderService } from './comment-provider.service';

describe('CommentProviderService', () => {
  let service: CommentProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
