import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, from, map, of, switchMap, take } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import { AuthenticationService } from './authentication.service';

const authConfig: AuthConfig = {
  issuer: "https://token.actions.githubusercontent.com",
  redirectUri: window.location.origin,
  clientId: 'dde1094aff15f4f85f68',
  scope: 'read:user',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  userinfoEndpoint: 'https://api.github.com/user',
  loginUrl: 'https://github.com/login/oauth/authorize',
}

@Injectable({
  providedIn: 'root'
})
export class GithubApiService implements AuthenticationService {

  constructor(private readonly oAuthService: OAuthService) {
    this.oAuthService.configure(authConfig);
  }

  logIn(): Observable<UserProfile> {
    return from(this.oAuthService.loadDiscoveryDocumentAndTryLogin()).pipe(
      take(1),
      switchMap(() => from(this.oAuthService.tryLoginCodeFlow())),
      switchMap(() => {
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.configure(authConfig);
          this.oAuthService.initCodeFlow();
          return of(null);
        }
        return from(this.oAuthService.loadUserProfile())
      }),
      map((result) => result as UserProfile));
  }

  logOut(): void {
    this.oAuthService.logOut();
  }

}
