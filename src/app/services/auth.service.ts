import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of, map, BehaviorSubject } from 'rxjs';

export interface AdminDetails {
  id: number;
  admin_id: number;
  full_name?: string;
  email?: string;
  phone?: string;
  role?: string;
  updated_at: string;
}

export interface AdminUserResponse {
  id: number;
  username: string;
  is_active: boolean;
  created_at: string;
  details?: AdminDetails;
}

export interface LoginResponse {
  access_token: string;
  access_token_expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  token_type: string;
  user: AdminUserResponse;
}

export interface RefreshResponse {
  access_token: string;
  access_token_expires_at: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private get API_URL(): string {
    if (typeof window !== 'undefined' && window.location.port === '4200') {
      return 'http://localhost:8000/api/auth';
    }
    return '/api/auth';
  }
  private ACCESS_TOKEN_KEY = 'ksb_access_token';
  private ACCESS_EXPIRES_KEY = 'ksb_access_token_expires_at';
  private REFRESH_TOKEN_KEY = 'ksb_refresh_token';
  private REFRESH_EXPIRES_KEY = 'ksb_refresh_token_expires_at';
  private USER_KEY = 'ksb_user';

  currentUser = signal<AdminUserResponse | null>(null);
  isAuthenticated = signal<boolean>(false);
  sessionWarningVisible = signal<boolean>(false);
  sessionMessage = signal<string>('');

  constructor() {
    this.checkInitialSession();
  }

  private checkInitialSession(): void {
    const token = this.getAccessToken();
    const userJson = localStorage.getItem(this.USER_KEY);
    if (token && userJson) {
      try {
        this.currentUser.set(JSON.parse(userJson));
        this.isAuthenticated.set(true);
      } catch (e) {
        this.logout();
      }
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getAccessExpiresAt(): Date | null {
    const val = localStorage.getItem(this.ACCESS_EXPIRES_KEY);
    return val ? new Date(val) : null;
  }

  getRemainingAccessTimeMs(): number {
    const expiresAt = this.getAccessExpiresAt();
    if (!expiresAt) return 0;
    return expiresAt.getTime() - new Date().getTime();
  }

  getRemainingTimeFormatted(): { hours: number; minutes: number; text: string } {
    const ms = Math.max(0, this.getRemainingAccessTimeMs());
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let text = '';
    if (hours > 0) {
      text += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    text += `${minutes} minute${minutes !== 1 ? 's' : ''}`;

    return { hours, minutes, text: text.trim() };
  }

  isAccessTokenExpiringSoon(): boolean {
    const ms = this.getRemainingAccessTimeMs();
    // Returns true if remaining time is less than 1 hour (3600000 ms) and greater than 0
    return ms > 0 && ms <= 60 * 60 * 1000;
  }

  isAccessTokenExpired(): boolean {
    return this.getRemainingAccessTimeMs() <= 0;
  }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => {
        if (res && res.access_token) {
          localStorage.setItem(this.ACCESS_TOKEN_KEY, res.access_token);
          localStorage.setItem(this.ACCESS_EXPIRES_KEY, res.access_token_expires_at);
          localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refresh_token);
          localStorage.setItem(this.REFRESH_EXPIRES_KEY, res.refresh_token_expires_at);
          localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));

          this.currentUser.set(res.user);
          this.isAuthenticated.set(true);
          this.sessionWarningVisible.set(false);
          this.sessionMessage.set('');
        }
      })
    );
  }

  refreshToken(): Observable<RefreshResponse | null> {
    const refreshTok = this.getRefreshToken();
    if (!refreshTok) {
      this.logout('Session Timed Out. Please log in again.');
      return of(null);
    }

    return this.http.post<RefreshResponse>(`${this.API_URL}/refresh`, { refresh_token: refreshTok }).pipe(
      tap((res) => {
        if (res && res.access_token) {
          localStorage.setItem(this.ACCESS_TOKEN_KEY, res.access_token);
          localStorage.setItem(this.ACCESS_EXPIRES_KEY, res.access_token_expires_at);
          this.sessionWarningVisible.set(false);
          this.sessionMessage.set('Session extended successfully for 6 hours!');
        }
      }),
      catchError(() => {
        this.logout('Session Timed Out. Refresh token expired.');
        return of(null);
      })
    );
  }

  logout(reason?: string): void {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      this.http.post(`${this.API_URL}/logout`, { refresh_token: refreshToken }).subscribe({
        error: () => {}
      });
    }

    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.ACCESS_EXPIRES_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_EXPIRES_KEY);
    localStorage.removeItem(this.USER_KEY);

    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.sessionWarningVisible.set(false);

    if (reason) {
      this.sessionMessage.set(reason);
    } else {
      this.sessionMessage.set('');
    }

    this.router.navigate(['/admin-login']);
  }

  getProfile(): Observable<AdminUserResponse | null> {
    if (this.isAccessTokenExpired()) {
      this.logout('Session Timed Out: Access token expired.');
      return of(null);
    }

    const token = this.getAccessToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<AdminUserResponse>(`${this.API_URL}/me`, { headers }).pipe(
      tap((user) => this.currentUser.set(user)),
      catchError((err) => {
        if (err.status === 401) {
          this.logout('Session Timed Out: Unauthorized access.');
        }
        return of(null);
      })
    );
  }
}
