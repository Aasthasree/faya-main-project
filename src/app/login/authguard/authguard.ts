//Angular imports
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);

  if (localStorage['authToken']) {
    // User is authenticated

    if (state.url === '/login') {
      // If the user is already authenticated and tries to access the login page,
      router.navigate(['/admin']);
    }
    return true;
  } else if (state.url !== '/login') {
    // User is not authenticated and trying to access a route other than the login page,
    router.navigate(['/login']);
    return false;

  } else {
    // User is not authenticated but trying to access the login page
    return true;
  }
};