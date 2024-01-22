import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


export const authGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isAuthenticated) {
    return true;
  }

  // If not authenticated, redirect to the login page
  router.navigate(['/login']);
  return false;

};
