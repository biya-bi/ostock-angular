import { Component } from '@angular/core';
import { AuthenticationManager } from '../../managers/authentication.manager';
import { OAuthProviderType } from '../../models/oauth-provider-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  OAuthProviderType = OAuthProviderType;

  constructor(private readonly authenticationManager: AuthenticationManager) { }

  login(providerType: OAuthProviderType) {
    this.authenticationManager.logIn(providerType);
  }

}
