import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  try {
    const authService = inject(AuthService);

    const val = await authService.validateToken();
    if (val) {
      return true;
    }
    return router.createUrlTree(['/auth/login']);
  } catch (err) {
    return router.createUrlTree(['/auth/login']);
  }
};
