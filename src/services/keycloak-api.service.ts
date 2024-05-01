import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AbstractOAuthProvider } from './abstract-oauth.provider';

@Injectable({
  providedIn: 'root'
})
export class KeycloakApiService extends AbstractOAuthProvider {

  constructor(protected override readonly oAuthService: OAuthService) {
    super(oAuthService);
  }

  protected override getAuthConfig(): AuthConfig {
    return {
      issuer: 'http://192.168.2.12:2080/realms/ostock-realm',
      strictDiscoveryDocumentValidation: false,
      redirectUri: document.location.origin,
      clientId: 'ostock',
      scope: 'openid profile email',
      requireHttps: false, // TODO: Change this before going live
      loginUrl: 'http://192.168.2.12:2080',
      logoutUrl: document.location.origin + '/logout'
    };
  }

}
