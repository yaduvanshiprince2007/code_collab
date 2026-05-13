import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authservice = inject(AuthService);

  const token = authservice.getToken() ?? null;
  if(!token) return next(req);
  const _req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next(_req);
};
