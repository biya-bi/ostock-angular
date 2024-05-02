import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private readonly notificationService: NotificationService) {
    this.notificationService.requestSubscription().pipe(take(1)).subscribe();
  }
}
