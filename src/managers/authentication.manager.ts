import { Injectable, Injector } from "@angular/core";
import { Observable, Subject, of, shareReplay, take, tap } from "rxjs";
import { OauthProvider } from "../models/oauth-provider";
import { UserProfile } from "../models/user-profile";
import { GoogleApiService } from "../services/google-api.service";
import { KeycloakApiService } from "../services/keycloak-api.service";

const OAUTH_PROVIDER_KEY = 'oAuthProvider';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationManager {

    private readonly userProfileSubject = new Subject<UserProfile>();

    readonly userProfile$ = this.userProfileSubject.asObservable();

    private tryLogin$: Observable<UserProfile>;

    constructor(private readonly injector: Injector) {
        this.autoLogin();
    }

    logIn(provider: OauthProvider) {
        this.setProvider(provider);
        this.getAuthenticationService(provider).logIn().pipe(
            take(1),
            tap(userProfile => this.userProfileSubject.next(userProfile))).subscribe();
    }

    logOut() {
        const provider = this.getProvider();
        if (provider) {
            localStorage.removeItem(OAUTH_PROVIDER_KEY);
            this.userProfileSubject.next(undefined);
            this.getAuthenticationService(provider).logOut();
        }
    }

    tryLogIn(): Observable<UserProfile> {
        if (!this.tryLogin$) {
            const provider = this.getProvider();
            this.tryLogin$ = provider ? this.getAuthenticationService(provider).logIn().pipe(shareReplay(1)) : of(undefined);
        }
        return this.tryLogin$;
    }

    private getAuthenticationService(provider: OauthProvider) {
        if (provider === OauthProvider.google) {
            return this.injector.get(GoogleApiService);
        }
        if (provider === OauthProvider.keycloak) {
            return this.injector.get(KeycloakApiService);
        }
        return undefined;
    }

    private autoLogin() {
        const provider = this.getProvider();
        if (provider) {
            this.logIn(provider);
        }
    }

    private setProvider(provider: OauthProvider) {
        if (provider) {
            localStorage.setItem(OAUTH_PROVIDER_KEY, OauthProvider[provider]);
        } else {
            localStorage.removeItem(OAUTH_PROVIDER_KEY);
        }
    }

    private getProvider(): OauthProvider | undefined {
        const item = localStorage.getItem(OAUTH_PROVIDER_KEY);
        return item ? OauthProvider[item.toLowerCase() as keyof typeof OauthProvider] : undefined;
    }

}