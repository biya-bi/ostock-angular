import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AbstractOAuthProvider } from './abstract-oauth.provider';

@Injectable({
  providedIn: 'root'
})
export class KeycloakOAuthProvider extends AbstractOAuthProvider {

  constructor(protected override readonly oAuthService: OAuthService) {
    super(oAuthService);
  }

  protected override getAuthConfig(): AuthConfig {
    return {
      issuer: 'http://keycloak.infra:8080/realms/ostock',
      strictDiscoveryDocumentValidation: false,
      redirectUri: document.location.origin,
      clientId: 'ostock',
      scope: 'openid profile email',
      requireHttps: false, // TODO: Change this before going live
      loginUrl: 'http://keycloak.infra:8080/realms/ostock',
      logoutUrl: document.location.origin + '/logout'
    };
  }

}
