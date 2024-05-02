import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable, from, of, switchMap, take } from 'rxjs';
import { ApiConnector } from '../connectors/api.connector';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly swPush: SwPush, private readonly apiConnector: ApiConnector) {
  }

  requestSubscription(): Observable<boolean> {
    if (!environment.production) {
      return of(null);
    }
    return from(this.swPush.requestSubscription({ serverPublicKey: environment.vapidPublicKey }))
      .pipe(take(1), switchMap((subscription) => this.apiConnector.subscribeToNotifications(subscription.toJSON())));
  }

}
