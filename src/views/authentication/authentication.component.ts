import { Component, Input } from '@angular/core';
import { UserProfile } from '../../models/user-profile';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  @Input() userProfile: UserProfile;
}
