import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthenticationManager } from '../managers/authentication.manager';

export const authenticationGuard: CanActivateFn = () => {
  const authenticationManager = inject(AuthenticationManager);
  const router = inject(Router);
  return authenticationManager.tryLogIn().pipe(switchMap((profile) => profile ? of(true) : router.navigate(['/login'])));
};