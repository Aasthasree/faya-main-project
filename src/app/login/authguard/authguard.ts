import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../authservice/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (localStorage['authToken']) {
    // User is authenticated
    return true;
  } else {
    // User is not authenticated and trying to access a route other than the login page,
    router.navigate(['/login']);
    return false;
  }
};






