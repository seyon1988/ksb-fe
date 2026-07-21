import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-session-warning',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, MessageModule, TagModule],
  template: `
    <!-- Top Warning Banner when < 1 hour remaining -->
    <div *ngIf="showBanner" class="session-warning-banner">
      <div class="banner-content">
        <i class="pi pi-exclamation-triangle text-ember icon-pulse"></i>
        <span>
          <strong>Session Expiry Warning:</strong> Your session will expire in 
          <p-tag severity="warn" [value]="remainingTimeText()"></p-tag>. Do you want to extend your session?
        </span>
      </div>

      <div class="banner-actions">
        <p-button 
          label="Extend Session (6 Hours)" 
          icon="pi pi-refresh" 
          severity="success" 
          size="small" 
          [loading]="extending"
          (onClick)="extendSession()">
        </p-button>

        <p-button 
          label="Sign Out" 
          icon="pi pi-power-off" 
          severity="secondary" 
          size="small" 
          [outlined]="true"
          (onClick)="signOut()">
        </p-button>
      </div>
    </div>
  `,
  styles: [`
    .session-warning-banner {
      background: rgba(242, 183, 5, 0.18);
      border-bottom: 2px solid var(--gold-deep);
      color: var(--maroon-deep);
      padding: 0.75rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      position: sticky;
      top: 60px;
      z-index: 999;
      box-shadow: 0 4px 16px rgba(36, 16, 18, 0.08);
    }
    .banner-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.95rem;
    }
    .icon-pulse {
      font-size: 1.4rem;
      color: var(--ember);
      animation: pulse 0.68s infinite;
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }
    .banner-actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }
  `]
})
export class SessionWarningComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);

  extending = false;
  remainingTimeText = signal<string>('');
  showBanner = false;
  private intervalId: any;

  ngOnInit(): void {
    this.checkTime();
    this.intervalId = setInterval(() => this.checkTime(), 15000); // Check every 15s
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  checkTime(): void {
    if (!this.authService.isAuthenticated()) {
      this.showBanner = false;
      return;
    }

    const { text } = this.authService.getRemainingTimeFormatted();
    this.remainingTimeText.set(text);

    // Show warning banner if remaining time is <= 60 minutes (1 hour)
    if (this.authService.isAccessTokenExpiringSoon()) {
      this.showBanner = true;
    } else {
      this.showBanner = false;
    }

    // Auto logout if access token is fully expired
    if (this.authService.isAccessTokenExpired()) {
      this.authService.logout('Session Timed Out. Access token expired.');
    }
  }

  extendSession(): void {
    this.extending = true;
    this.authService.refreshToken().subscribe(() => {
      this.extending = false;
      this.checkTime();
    });
  }

  signOut(): void {
    this.authService.logout();
  }
}
