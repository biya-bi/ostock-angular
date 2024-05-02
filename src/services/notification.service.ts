import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable, from, of, switchMap, take } from 'rxjs';
import { ApiConnector } from '../connectors/api.connector';
import { environment } from '../environments/environment';
import { AuthenticationManager } from '../managers/authentication.manager';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly subscriptionRequest$: Observable<boolean>;

  constructor(
    private readonly swPush: SwPush,
    private readonly apiConnector: ApiConnector,
    private readonly authenticationManager: AuthenticationManager) {

    this.subscriptionRequest$ = this.authenticationManager.userProfile$.pipe(
      switchMap((userProfile) => userProfile ? this.requestSubscription() : of(undefined)));
  }

  private requestSubscription(): Observable<boolean> {
    if (!environment.production) {
      return of(null);
    }
    return from(this.swPush.requestSubscription({ serverPublicKey: environment.vapidPublicKey }))
      .pipe(switchMap((subscription) => this.apiConnector.subscribeToNotifications(subscription.toJSON())));
  }

}
