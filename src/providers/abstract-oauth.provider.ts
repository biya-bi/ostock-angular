import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, from, map, of, switchMap, take } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { OAuthProvider } from './oauth.provider';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractOAuthProvider implements OAuthProvider {

  constructor(protected readonly oAuthService: OAuthService) {
    this.oAuthService.configure(this.getAuthConfig());
  }

  logIn(): Observable<UserProfile> {
    return from(this.oAuthService.loadDiscoveryDocument()).pipe(
      take(1),
      switchMap(() => from(this.oAuthService.tryLoginImplicitFlow())),
      switchMap(() => {
        if (!this.oAuthService.hasValidAccessToken() || this.tokenExpired()) {
          this.oAuthService.initLoginFlow(undefined, this.getInitFlowParams());
          return of(null);
        }
        return from(this.oAuthService.loadUserProfile());
      }),
      map((result) => result as UserProfile));
  }

  logOut() {
    // For Keycloak, for some reason, logoutUrl is lost on oAuthService and requires 
    // reconfiguration before logging out.
    this.oAuthService.configure(this.getAuthConfig());
    this.oAuthService.logOut();
  }

  protected abstract getAuthConfig(): AuthConfig;

  protected getInitFlowParams() {
    return {};
  }

  protected tokenExpired() {
    return Date.now() - this.oAuthService.getIdTokenExpiration() > 0;
  }

}
