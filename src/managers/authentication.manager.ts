import { Injectable, Injector } from "@angular/core";
import { Observable, Subject, of, shareReplay, take, tap } from "rxjs";
import { OAuthProviderType } from "../models/oauth-provider-type";
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

    logIn(providerType: OAuthProviderType) {
        this.setProvider(providerType);
        this.getAuthenticationService(providerType).logIn().pipe(
            take(1),
            tap(userProfile => this.userProfileSubject.next(userProfile))).subscribe();
    }

    logOut() {
        const providerType = this.getProviderType();
        if (providerType) {
            localStorage.removeItem(OAUTH_PROVIDER_KEY);
            this.userProfileSubject.next(undefined);
            this.getAuthenticationService(providerType).logOut();
        }
    }

    tryLogIn(): Observable<UserProfile> {
        if (!this.tryLogin$) {
            const provider = this.getProviderType();
            this.tryLogin$ = provider ? this.getAuthenticationService(provider).logIn().pipe(shareReplay(1)) : of(undefined);
        }
        return this.tryLogin$;
    }

    private getAuthenticationService(providerType: OAuthProviderType) {
        if (providerType === OAuthProviderType.google) {
            return this.injector.get(GoogleApiService);
        }
        if (providerType === OAuthProviderType.keycloak) {
            return this.injector.get(KeycloakApiService);
        }
        return undefined;
    }

    private autoLogin() {
        const providerType = this.getProviderType();
        if (providerType) {
            this.logIn(providerType);
        }
    }

    private setProvider(providerType: OAuthProviderType) {
        if (providerType) {
            localStorage.setItem(OAUTH_PROVIDER_KEY, OAuthProviderType[providerType]);
        } else {
            localStorage.removeItem(OAUTH_PROVIDER_KEY);
        }
    }

    private getProviderType(): OAuthProviderType | undefined {
        const item = localStorage.getItem(OAUTH_PROVIDER_KEY);
        return item ? OAuthProviderType[item.toLowerCase() as keyof typeof OAuthProviderType] : undefined;
    }

}