import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getAccessToken();

  if (!token) {
    authService.logout();
    return false;
  }

  // Check if access token is expired
  if (authService.isAccessTokenExpired()) {
    // Attempt automatic refresh token extension
    const refreshToken = authService.getRefreshToken();
    if (refreshToken) {
      return authService.refreshToken().pipe(
        map((res) => {
          if (res && res.access_token) {
            return true;
          }
          authService.logout('Session Timed Out: Refresh token expired.');
          return false;
        })
      );
    } else {
      authService.logout('Session Timed Out. Please log in again.');
      return false;
    }
  }

  return true;
};
