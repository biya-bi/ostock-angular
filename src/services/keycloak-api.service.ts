import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, from, map, of, switchMap, take } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { AuthenticationService } from './authentication.service';

const authConfig: AuthConfig = {
  issuer: 'http://192.168.2.12:2080/realms/ostock-realm',
  strictDiscoveryDocumentValidation: false,
  redirectUri: document.location.origin,
  clientId: 'ostock',
  scope: 'openid profile email',
  requireHttps: false, // TODO: Change this before going live
  loginUrl: 'http://192.168.2.12:2080',
  logoutUrl: document.location.origin + '/logout'
}

@Injectable({
  providedIn: 'root'
})
export class KeycloakApiService implements AuthenticationService {

  constructor(private readonly oAuthService: OAuthService) {
    this.oAuthService.configure(authConfig);
  }

  logIn(): Observable<UserProfile> {
    return from(this.oAuthService.loadDiscoveryDocument()).pipe(
      take(1),
      switchMap(() => from(this.oAuthService.tryLoginImplicitFlow())),
      switchMap(() => {
        if (!this.oAuthService.hasValidAccessToken() || this.tokenExpired()) {
          this.oAuthService.initLoginFlow();
          return of(null);
        }
        return from(this.oAuthService.loadUserProfile());
      }),
      map((result) => result as UserProfile));
  }

  logOut() {
    // For some reason, logoutUrl is lost on oAuthService and requires reconfiguration before logging out.
    this.oAuthService.configure(authConfig);
    this.oAuthService.logOut();
  }

  private tokenExpired() {
    return Date.now() - this.oAuthService.getIdTokenExpiration() > 0;
  }

}
