import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { AuthService, AdminUserResponse } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule, MessageModule, DividerModule],
  template: `
    <div class="admin-dashboard">
      <div class="container">
        <!-- Dashboard Header -->
        <div class="dashboard-header">
          <div>
            <h1><i class="pi pi-sliders-h me-2 text-amber"></i> {{ langService.translate('dashboardTitle') }}</h1>
            <p *ngIf="profile">
              {{ langService.translate('welcomeAdmin') }} <strong>{{ profile.details?.full_name || profile.username }}</strong>
            </p>
          </div>
          <div class="header-actions">
            <p-button 
              label="Extend Session (Refresh)" 
              icon="pi pi-refresh" 
              severity="success" 
              [loading]="extending"
              (onClick)="extendSession()">
            </p-button>

            <p-button 
              [label]="langService.translate('logoutBtn')" 
              icon="pi pi-power-off" 
              severity="danger" 
              [outlined]="true"
              (onClick)="logout()">
            </p-button>
          </div>
        </div>

        <p-message *ngIf="authService.sessionMessage()" severity="info" styleClass="w-full mb-4">
          {{ authService.sessionMessage() }}
        </p-message>

        <!-- Token Status & Expiry Grid -->
        <div class="stats-grid">
          <p-card styleClass="stat-p-card">
            <div class="stat-card-inner">
              <div class="stat-icon amber"><i class="pi pi-clock"></i></div>
              <div class="stat-info">
                <h3>Access Token Expiry (6 Hours)</h3>
                <p-tag [severity]="authService.isAccessTokenExpiringSoon() ? 'warn' : 'success'" [value]="remainingTimeText()"></p-tag>
              </div>
            </div>
          </p-card>

          <p-card styleClass="stat-p-card">
            <div class="stat-card-inner">
              <div class="stat-icon blue"><i class="pi pi-key"></i></div>
              <div class="stat-info">
                <h3>Refresh Token (7 Days)</h3>
                <p-tag severity="info" value="Active Token Rotation"></p-tag>
              </div>
            </div>
          </p-card>

          <p-card styleClass="stat-p-card">
            <div class="stat-card-inner">
              <div class="stat-icon green"><i class="pi pi-shield"></i></div>
              <div class="stat-info">
                <h3>Auth Guard & Interceptor</h3>
                <p-tag severity="success" value="Active Pre-Fetch Expiry Check"></p-tag>
              </div>
            </div>
          </p-card>
        </div>

        <!-- Global Theme Management Table Card -->
        <p-card styleClass="dashboard-p-card mb-4">
          <div class="theme-header-group">
            <div class="theme-title-area">
              <h2><i class="pi pi-palette me-2 text-gold"></i> Global Website Theme System</h2>
              <p class="subtitle">Select and switch live color palette themes across the entire portal in real time.</p>
            </div>
          </div>

          <p-divider styleClass="my-3"></p-divider>

          <div class="theme-table-wrapper mt-3">
            <table class="theme-table">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Theme Name</th>
                  <th>Primary Tone</th>
                  <th>Deep Accent</th>
                  <th>Vibe &amp; Style Identity</th>
                  <th>Status &amp; Control</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let theme of themeService.themes" [class.active-row]="themeService.activeThemeId() === theme.id">
                  <td>
                    <p-tag 
                      [severity]="themeService.activeThemeId() === theme.id ? 'success' : 'secondary'" 
                      [value]="theme.id.toUpperCase()">
                    </p-tag>
                  </td>
                  <td>
                    <strong class="theme-name-text">{{ theme.name }}</strong>
                  </td>
                  <td>
                    <div class="color-swatch-box">
                      <span class="swatch" [style.background-color]="theme.maroon"></span>
                      <code>{{ theme.maroon }}</code>
                    </div>
                  </td>
                  <td>
                    <div class="color-swatch-box">
                      <span class="swatch" [style.background-color]="theme.maroonDeep"></span>
                      <code>{{ theme.maroonDeep }}</code>
                    </div>
                  </td>
                  <td>
                    <span class="vibe-desc">{{ theme.description }}</span>
                  </td>
                  <td>
                    <p-button 
                      [label]="themeService.activeThemeId() === theme.id ? 'Active Theme' : 'Apply Theme'" 
                      [icon]="themeService.activeThemeId() === theme.id ? 'pi pi-check' : 'pi pi-palette'"
                      [severity]="themeService.activeThemeId() === theme.id ? 'success' : 'warn'"
                      [outlined]="themeService.activeThemeId() !== theme.id"
                      size="small"
                      (onClick)="themeService.setTheme(theme.id)">
                    </p-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </p-card>

        <!-- Admin Profile Details Card -->
        <p-card styleClass="dashboard-p-card" *ngIf="profile">
          <div class="profile-header-banner">
            <div class="avatar-circle">
              <i class="pi pi-user text-amber"></i>
            </div>
            <div>
              <h2>{{ profile.details?.full_name || profile.username }}</h2>
              <p class="subtitle"><i class="pi pi-shield me-1"></i> {{ profile.details?.role || 'Admin' }} &bull; KSB Construction System</p>
            </div>
          </div>

          <p-divider styleClass="my-4"></p-divider>

          <h3 class="section-title mb-3"><i class="pi pi-id-card me-2 text-sky"></i> Profile Information</h3>

          <div class="profile-cards-grid">
            <div class="profile-tile">
              <div class="tile-icon sky"><i class="pi pi-hashtag"></i></div>
              <div class="tile-body">
                <span class="tile-label">Admin ID</span>
                <span class="tile-value">#{{ profile.id }}</span>
              </div>
            </div>

            <div class="profile-tile">
              <div class="tile-icon amber"><i class="pi pi-user"></i></div>
              <div class="tile-body">
                <span class="tile-label">Username</span>
                <span class="tile-value"><code>{{ profile.username }}</code></span>
              </div>
            </div>

            <div class="profile-tile">
              <div class="tile-icon purple"><i class="pi pi-user-edit"></i></div>
              <div class="tile-body">
                <span class="tile-label">Full Name</span>
                <span class="tile-value">{{ profile.details?.full_name || 'N/A' }}</span>
              </div>
            </div>

            <div class="profile-tile">
              <div class="tile-icon emerald"><i class="pi pi-briefcase"></i></div>
              <div class="tile-body">
                <span class="tile-label">Assigned Role</span>
                <span class="tile-value"><p-tag severity="secondary" [value]="profile.details?.role || 'Admin'"></p-tag></span>
              </div>
            </div>

            <div class="profile-tile">
              <div class="tile-icon blue"><i class="pi pi-envelope"></i></div>
              <div class="tile-body">
                <span class="tile-label">Email Address</span>
                <span class="tile-value">{{ profile.details?.email || 'N/A' }}</span>
              </div>
            </div>

            <div class="profile-tile">
              <div class="tile-icon green"><i class="pi pi-phone"></i></div>
              <div class="tile-body">
                <span class="tile-label">Phone Contact</span>
                <span class="tile-value">{{ profile.details?.phone || 'N/A' }}</span>
              </div>
            </div>

            <div class="profile-tile">
              <div class="tile-icon rose"><i class="pi pi-check-circle"></i></div>
              <div class="tile-body">
                <span class="tile-label">Account Status</span>
                <span class="tile-value"><p-tag [severity]="profile.is_active ? 'success' : 'danger'" [value]="profile.is_active ? 'Active' : 'Inactive'"></p-tag></span>
              </div>
            </div>
          </div>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 3rem 1.5rem;
      min-height: 80vh;
    }
    .container {
      max-width: 1150px;
      margin: 0 auto;
    }
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
      background: #FFFFFF;
      border: 1px solid var(--border);
      box-shadow: 0 4px 20px -4px rgba(36, 16, 18, 0.08);
      padding: 1.75rem 2rem;
      border-radius: 16px;
    }
    .dashboard-header h1 {
      color: var(--maroon-deep);
      font-size: 1.75rem;
      margin-bottom: 0.25rem;
    }
    .dashboard-header p {
      color: var(--ink-soft);
      font-size: 0.95rem;
      margin: 0;
    }
    .dashboard-header strong {
      color: var(--maroon);
    }
    .header-actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    ::ng-deep .stat-p-card {
      background: #FFFFFF !important;
      border: 1px solid var(--border) !important;
      border-radius: 14px !important;
      box-shadow: 0 4px 16px -4px rgba(36, 16, 18, 0.06) !important;
    }
    .stat-card-inner {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .stat-icon {
      font-size: 1.6rem;
      padding: 0.8rem;
      border-radius: 12px;
      background: rgba(122, 14, 19, 0.08);
      color: var(--maroon);
    }
    .stat-info h3 {
      color: var(--ink-soft);
      font-size: 0.85rem;
      margin-bottom: 0.4rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    ::ng-deep .dashboard-p-card {
      background: #FFFFFF !important;
      border: 1px solid var(--border) !important;
      border-radius: 16px !important;
      color: var(--ink) !important;
      box-shadow: 0 6px 24px -6px rgba(36, 16, 18, 0.08) !important;
    }

    /* Theme Table Styling */
    .theme-header-group h2 {
      color: var(--maroon-deep);
      font-size: 1.35rem;
      margin: 0 0 0.2rem;
    }
    .subtitle {
      color: var(--ink-soft);
      font-size: 0.9rem;
      margin: 0;
    }

    .theme-table-wrapper {
      overflow-x: auto;
    }
    .theme-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      font-size: 0.925rem;
    }
    .theme-table th {
      background: var(--paper);
      color: var(--maroon-deep);
      font-weight: 700;
      text-align: left;
      padding: 0.85rem 1rem;
      border-bottom: 2px solid var(--border);
    }
    .theme-table td {
      padding: 1rem;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
    }
    .theme-table tr.active-row {
      background: rgba(242, 183, 5, 0.08);
    }
    .theme-name-text {
      color: var(--maroon-deep);
      font-size: 0.975rem;
    }
    .color-swatch-box {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--paper);
      padding: 0.3rem 0.65rem;
      border-radius: 6px;
      border: 1px solid var(--border);
    }
    .swatch {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.15);
    }
    .vibe-desc {
      color: var(--ink-soft);
      font-size: 0.875rem;
    }

    /* Profile Header */
    .profile-header-banner {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .avatar-circle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(242, 183, 5, 0.2);
      border: 2px solid var(--gold-deep);
      color: var(--maroon-deep);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    .profile-header-banner h2 {
      color: var(--maroon-deep);
      font-size: 1.4rem;
      margin: 0 0 0.25rem 0;
    }
    .section-title {
      color: var(--maroon-deep);
      font-size: 1.1rem;
      font-weight: 600;
    }

    .profile-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
    }
    .profile-tile {
      background: var(--paper);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .profile-tile:hover {
      border-color: var(--maroon);
      transform: translateY(-2px);
    }
    .tile-icon {
      font-size: 1.25rem;
      width: 42px;
      height: 42px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(122, 14, 19, 0.08);
      color: var(--maroon);
      flex-shrink: 0;
    }
    .tile-icon.sky { color: var(--maroon); background: rgba(122, 14, 19, 0.08); }
    .tile-icon.amber { color: #8A6400; background: rgba(242, 183, 5, 0.18); }
    .tile-icon.purple { color: var(--maroon-deep); background: rgba(78, 7, 11, 0.08); }
    .tile-icon.emerald { color: #047857; background: rgba(16, 185, 129, 0.12); }
    .tile-icon.blue { color: var(--maroon); background: rgba(122, 14, 19, 0.08); }
    .tile-icon.green { color: #047857; background: rgba(16, 185, 129, 0.12); }
    .tile-icon.rose { color: var(--ember); background: rgba(217, 83, 28, 0.12); }

    .tile-body {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 0;
    }
    .tile-label {
      color: var(--ink-soft);
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    .tile-value {
      color: var(--maroon-deep);
      font-weight: 700;
      font-size: 0.95rem;
      word-break: break-word;
    }
    .tile-value code {
      background: #FFFFFF;
      color: var(--maroon);
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      border: 1px solid var(--border);
      font-size: 0.85rem;
    }
    .w-full {
      width: 100% !important;
    }
  `]
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  langService = inject(LanguageService);
  themeService = inject(ThemeService);
  router = inject(Router);

  profile: AdminUserResponse | null = null;
  extending = false;
  remainingTimeText = signal<string>('');
  private intervalId: any;

  ngOnInit(): void {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 10000);

    // Initialize immediately from stored user signal to avoid layout flash
    this.profile = this.authService.currentUser();

    // Fetch fresh profile from API backend
    this.authService.getProfile().subscribe((data) => {
      if (data) {
        this.profile = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.intervalId && clearInterval(this.intervalId);
  }

  updateTime(): void {
    const { text } = this.authService.getRemainingTimeFormatted();
    this.remainingTimeText.set(text || 'Expired');
  }

  extendSession(): void {
    this.extending = true;
    this.authService.refreshToken().subscribe(() => {
      this.extending = false;
      this.updateTime();
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
