import { Observable } from "rxjs";
import { UserProfile } from "../models/user-profile";

export interface OAuthProvider {
    logIn(): Observable<UserProfile>;
    logOut(): void;
}