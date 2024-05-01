import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AbstractOAuthProvider } from './abstract-oauth.provider';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService extends AbstractOAuthProvider {

  constructor(protected override readonly oAuthService: OAuthService) {
    super(oAuthService);
  }

  protected override getAuthConfig(): AuthConfig {
    return {
      issuer: "https://accounts.google.com",
      strictDiscoveryDocumentValidation: false,
      redirectUri: document.location.origin,
      clientId: '479603210590-tg2941ec6ivracsia1sv2bf93di5b3rp.apps.googleusercontent.com',
      scope: 'openid profile email',
    };
  }

  protected override getInitFlowParams(): {} {
    return { prompt: 'select_account' };
  }

}
