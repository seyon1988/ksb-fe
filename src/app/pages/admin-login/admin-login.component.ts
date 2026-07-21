import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    MessageModule
  ],
  template: `
    <div class="login-page">
      <p-card styleClass="login-p-card">
        <div class="login-header">
          <div class="lock-icon"><i class="pi pi-lock text-gold"></i></div>
          <h2>{{ langService.translate('adminLoginTitle') }}</h2>
          <p>KSB Construction Management Portal</p>
        </div>

        <p-message *ngIf="authService.sessionMessage()" severity="warn" styleClass="w-full mb-3">
          {{ authService.sessionMessage() }}
        </p-message>

        <p-message *ngIf="errorMessage" severity="error" styleClass="w-full mb-3">
          {{ errorMessage }}
        </p-message>

        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group mb-3">
            <label for="username">{{ langService.translate('usernameLabel') }}</label>
            <input
              pInputText
              type="text"
              id="username"
              name="username"
              autocomplete="username"
              [(ngModel)]="username"
              required
              placeholder="Enter admin username"
              [disabled]="loading"
              class="w-full"
            />
          </div>

          <div class="form-group mb-4">
            <label for="password">{{ langService.translate('passwordLabel') }}</label>
            <p-password
              [(ngModel)]="password"
              name="password"
              autocomplete="current-password"
              [feedback]="false"
              [toggleMask]="true"
              placeholder="Enter password"
              [disabled]="loading"
              styleClass="w-full"
              inputStyleClass="w-full">
            </p-password>
          </div>

          <div class="submit-btn-wrapper">
            <p-button
              type="submit"
              [label]="loading ? 'Authenticating...' : langService.translate('loginBtn')"
              icon="pi pi-sign-in"
              styleClass="login-submit-btn"
              [disabled]="loading || !username || !password">
            </p-button>
          </div>
        </form>
      </p-card>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1.5rem;
    }
    ::ng-deep .login-p-card {
      background: #FFFFFF !important;
      border: 1px solid var(--border) !important;
      border-radius: 18px !important;
      width: 100%;
      max-width: 440px;
      box-shadow: 0 12px 36px -8px rgba(36, 16, 18, 0.14) !important;
      color: var(--ink) !important;
    }
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .lock-icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: var(--maroon);
    }
    .login-header h2 {
      color: var(--maroon-deep);
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }
    .login-header p {
      color: var(--ink-soft);
      font-size: 0.875rem;
    }

    .form-group label {
      display: block;
      color: var(--maroon-deep);
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 0.4rem;
    }
    .w-full {
      width: 100% !important;
    }

    .submit-btn-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 1.5rem;
    }
    ::ng-deep .login-submit-btn {
      height: 34px !important;
      padding: 0 1.25rem !important;
      font-size: 0.825rem !important;
      font-weight: 600 !important;
      border-radius: 8px !important;
      background: var(--maroon) !important;
      color: #FFFFFF !important;
      border: 1px solid var(--maroon-deep) !important;
      box-shadow: 0 4px 14px rgba(217, 83, 28, 0.25) !important;
      transition: all 0.2s ease !important;
    }
    ::ng-deep .login-submit-btn:hover {
      background: var(--maroon-deep) !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 6px 18px rgba(217, 83, 28, 0.35) !important;
    }
    ::ng-deep .login-submit-btn:disabled {
      opacity: 0.6 !important;
      background: var(--maroon) !important;
      cursor: not-allowed !important;
    }

    /* Password Input Eye Icon Positioning */
    ::ng-deep .p-password {
      position: relative !important;
      display: block !important;
      width: 100% !important;
    }
    ::ng-deep .p-password .p-inputtext {
      width: 100% !important;
      padding-right: 2.5rem !important;
    }
    ::ng-deep .p-password .p-password-toggle-mask-icon,
    ::ng-deep .p-password .p-password-toggle-icon,
    ::ng-deep .p-password i.pi-eye,
    ::ng-deep .p-password i.pi-eye-slash,
    ::ng-deep .p-password button,
    ::ng-deep .p-password-toggle-button {
      position: absolute !important;
      right: 0.75rem !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      margin: 0 !important;
      padding: 0 !important;
      color: var(--ink-soft) !important;
      cursor: pointer !important;
      z-index: 2 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      background: transparent !important;
      border: none !important;
    }
  `]
})
export class AdminLoginComponent {
  authService = inject(AuthService);
  langService = inject(LanguageService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  onLogin(): void {
    if (!this.username || !this.password) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.detail || this.langService.translate('loginError');
      }
    });
  }
}
