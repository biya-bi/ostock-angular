import { TestBed } from '@angular/core/testing';

import { GoogleOAuthProvider } from './google-oauth.provider';

describe('GoogleOAuthProvider', () => {
  let service: GoogleOAuthProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleOAuthProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
