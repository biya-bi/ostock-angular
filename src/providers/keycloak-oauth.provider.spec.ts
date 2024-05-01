import { TestBed } from '@angular/core/testing';

import { KeycloakOAuthProvider } from './keycloak-oauth.provider';

describe('KeycloakOAuthProvider', () => {
  let service: KeycloakOAuthProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakOAuthProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
