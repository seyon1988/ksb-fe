import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Skip adding auth header for login or refresh endpoints
  if (req.url.includes('/api/auth/login') || req.url.includes('/api/auth/refresh')) {
    return next(req);
  }

  // Check if token is expired prior to request
  if (authService.isAuthenticated() && authService.isAccessTokenExpired()) {
    authService.logout('Session Timed Out: Access token expired before request.');
    return throwError(() => new Error('Session Expired'));
  }

  const token = authService.getAccessToken();
  let authReq = req;

  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout('Session Timed Out. Please log in again.');
      }
      return throwError(() => error);
    })
  );
};
