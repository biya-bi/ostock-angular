import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  template: ''
})
export class NotificationContainer {

  readonly subscription: Subscription;

  constructor(private readonly notificationService: NotificationService) {
    this.subscription = this.notificationService.subscriptionRequest$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
