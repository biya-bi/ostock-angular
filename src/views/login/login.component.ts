import { Component } from '@angular/core';
import { AuthenticationManager } from '../../managers/authentication.manager';
import { OauthProvider } from '../../models/oauth-provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  OauthProvider = OauthProvider;

  constructor(private readonly authenticationManager: AuthenticationManager) { }

  login(provider: OauthProvider) {
    this.authenticationManager.logIn(provider);
  }

}
