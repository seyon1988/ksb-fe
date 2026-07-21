import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, ButtonModule, BadgeModule],
  template: `
    <header class="navbar-wrapper">
      <div class="nav-container">
        <!-- Brand Title & Icon -->
        <a routerLink="/" class="nav-brand" (click)="closeAllMenus()">
          <i class="pi pi-building brand-icon text-maroon"></i>
          <span class="brand-title">{{ langService.translate('brandName') }}</span>
        </a>

        <!-- Desktop Horizontal Menu -->
        <div class="nav-menu-desktop">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <i class="pi pi-home"></i> {{ langService.translate('home') }}
          </a>
          <a routerLink="/projects" routerLinkActive="active">
            <i class="pi pi-images"></i> {{ langService.translate('projects') }}
          </a>
          <a routerLink="/contact" routerLinkActive="active">
            <i class="pi pi-phone"></i> {{ langService.translate('contact') }}
          </a>
          <p-button 
            [label]="langService.translate('langToggle')" 
            icon="pi pi-globe" 
            [rounded]="true" 
            severity="secondary"
            styleClass="lang-btn"
            (onClick)="langService.toggleLanguage()">
          </p-button>
        </div>

        <!-- Right User Actions (Desktop Only) -->
        <div class="nav-right-actions desktop-only">
          <div class="user-profile-menu-container">
            <button 
              type="button" 
              class="user-avatar-btn" 
              [class.active-open]="userMenuOpen"
              [class.is-authenticated]="authService.isAuthenticated()"
              (click)="toggleUserMenu($event)" 
              title="User Account & Portal">
              <i class="pi pi-user avatar-icon"></i>
            </button>

            <!-- Profile Overlay Popover -->
            <div class="user-popover-card" *ngIf="userMenuOpen" (click)="$event.stopPropagation()">
              <ng-container *ngIf="!authService.isAuthenticated()">
                <div class="popover-header">
                  <div class="avatar-circle-lg guest"><i class="pi pi-user text-maroon"></i></div>
                  <div class="popover-user-info">
                    <h4 class="popover-name">Guest User</h4>
                    <p class="popover-sub">Access KSB Admin Portal</p>
                  </div>
                </div>
                <div class="popover-body">
                  <button class="admin-login-action-btn" (click)="navigateToLogin()">
                    <i class="pi pi-sign-in"></i> Admin Login
                  </button>
                </div>
              </ng-container>

              <ng-container *ngIf="authService.isAuthenticated()">
                <div class="popover-header logged-in-bg">
                  <div class="avatar-circle-lg logged-in"><i class="pi pi-user"></i></div>
                  <div class="popover-user-info">
                    <h4 class="popover-name">{{ getUserFullName() }}</h4>
                    <p class="popover-sub">{{ getUserEmail() }}</p>
                    <span class="role-badge"><i class="pi pi-shield"></i> {{ getUserRole() }}</span>
                  </div>
                </div>

                <div class="popover-menu-list">
                  <a routerLink="/admin" class="popover-nav-item" (click)="closeMenu()">
                    <i class="pi pi-sliders-h"></i> Admin Dashboard &amp; Settings
                  </a>
                </div>

                <div class="popover-footer">
                  <button class="sign-out-action-btn" (click)="onSignOut()">
                    <i class="pi pi-power-off"></i> Sign Out
                  </button>
                </div>
              </ng-container>
            </div>
          </div>
        </div>

        <!-- Mobile Hamburger Button -->
        <button 
          type="button" 
          class="mobile-hamburger-btn" 
          [class.active-open]="mobileMenuOpen"
          (click)="toggleMobileMenu($event)"
          aria-label="Toggle Navigation Menu">
          <i class="pi" [ngClass]="mobileMenuOpen ? 'pi-times' : 'pi-bars'"></i>
        </button>
      </div>

      <!-- Vertically Stacked Mobile Menu Drawer -->
      <div class="mobile-menu-drawer" *ngIf="mobileMenuOpen" (click)="$event.stopPropagation()">
        <div class="mobile-nav-list">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMobileMenu()">
            <i class="pi pi-home me-2"></i> {{ langService.translate('home') }}
          </a>
          <a routerLink="/projects" routerLinkActive="active" (click)="closeMobileMenu()">
            <i class="pi pi-images me-2"></i> {{ langService.translate('projects') }}
          </a>
          <a routerLink="/contact" routerLinkActive="active" (click)="closeMobileMenu()">
            <i class="pi pi-phone me-2"></i> {{ langService.translate('contact') }}
          </a>
        </div>

        <div class="mobile-actions-divider"></div>

        <div class="mobile-action-item">
          <p-button 
            [label]="langService.translate('langToggle')" 
            icon="pi pi-globe" 
            severity="secondary"
            styleClass="mobile-lang-btn"
            (onClick)="langService.toggleLanguage()">
          </p-button>
        </div>

        <div class="mobile-user-section">
          <ng-container *ngIf="!authService.isAuthenticated()">
            <button class="mobile-login-btn" (click)="navigateToLoginMobile()">
              <i class="pi pi-user me-2"></i> Admin Sign In
            </button>
          </ng-container>

          <ng-container *ngIf="authService.isAuthenticated()">
            <div class="mobile-user-card">
              <div class="mobile-user-info">
                <div class="avatar-circle-sm"><i class="pi pi-user"></i></div>
                <div>
                  <strong class="m-user-name">{{ getUserFullName() }}</strong>
                  <span class="m-user-role"><i class="pi pi-shield"></i> {{ getUserRole() }}</span>
                </div>
              </div>
              <div class="mobile-user-links">
                <a routerLink="/admin" class="mobile-user-link" (click)="closeMobileMenu()">
                  <i class="pi pi-sliders-h me-1"></i> Admin Dashboard
                </a>
                <button class="mobile-signout-btn" (click)="onSignOutMobile()">
                  <i class="pi pi-power-off me-1"></i> Sign Out
                </button>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar-wrapper {
      background: rgba(251, 245, 232, 0.94);
      backdrop-filter: blur(16px) saturate(180%);
      border-bottom: 1px solid rgba(36, 16, 18, 0.08);
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 0.75rem 50px;
      box-shadow: 0 10px 30px -10px rgba(36, 16, 18, 0.12), 0 4px 12px -2px rgba(36, 16, 18, 0.06);
    }
    .nav-container {
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
    }
    .brand-icon {
      font-size: 1.25rem;
      color: var(--maroon);
      background: transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .brand-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.125rem;
      color: var(--maroon-deep);
    }

    .nav-menu-desktop { display: flex; gap: 20px; align-items: center; }
    .nav-menu-desktop a {
      color: var(--ink);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.85rem;
      padding: 0 0.85rem;
      height: 34px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .nav-menu-desktop a:hover { color: var(--maroon); background: rgba(217, 83, 28, 0.08); }
    .nav-menu-desktop a.active { color: #fff; background: var(--maroon); font-weight: 600; }

    .nav-right-actions { display: flex; align-items: center; gap: 20px; }
    ::ng-deep .lang-btn {
      height: 34px !important;
      padding: 0 0.85rem !important;
      font-size: 0.825rem !important;
      font-weight: 600 !important;
      margin-left: 40px !important;
      border: 1px solid var(--border) !important;
      border-radius: 8px !important;
    }

    .user-profile-menu-container { position: relative; }
    .user-avatar-btn {
      width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border);
      background: #fff; color: var(--maroon-deep); cursor: pointer;
      display: flex; align-items: center; justify-content: center; outline: none;
    }
    .user-avatar-btn.is-authenticated { background: var(--maroon); color: #fff; }
    .user-avatar-btn.is-authenticated .avatar-icon { color: #fff; }
    .avatar-icon { font-size: 0.95rem; color: var(--maroon-deep); }

    .user-popover-card {
      position: absolute; top: 125%; right: 0; width: 280px; background: #fff;
      border: 1px solid var(--border); border-radius: 16px;
      box-shadow: 0 12px 36px -6px rgba(36, 16, 18, 0.16); padding: 1.25rem; z-index: 1100;
    }
    .popover-header { display: flex; align-items: center; gap: 0.85rem; padding-bottom: 0.85rem; border-bottom: 1px solid var(--border); }
    .avatar-circle-lg { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
    .avatar-circle-lg.logged-in { background: var(--maroon); color: #fff; }
    .popover-name { color: var(--maroon-deep); font-size: 0.95rem; font-weight: 700; margin: 0; }
    .popover-sub { color: var(--ink-soft); font-size: 0.775rem; margin: 0; }
    .role-badge { font-size: 0.725rem; font-weight: 600; color: #8A6400; background: rgba(242, 183, 5, 0.18); padding: 0.15rem 0.5rem; border-radius: 4px; }
    .admin-login-action-btn, .sign-out-action-btn { width: 100%; height: 34px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
    .admin-login-action-btn { background: var(--maroon); color: #fff; border: none; }
    .sign-out-action-btn { background: rgba(217, 83, 28, 0.08); color: var(--ember); border: 1px solid rgba(217, 83, 28, 0.3); }
    .popover-nav-item { display: flex; align-items: center; gap: 0.6rem; color: var(--ink); text-decoration: none; font-size: 0.85rem; font-weight: 500; padding: 0.5rem; }

    /* Mobile Hamburger & Drawer Styles */
    .mobile-hamburger-btn {
      display: none; width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border);
      background: #fff; color: var(--maroon-deep); font-size: 1.2rem; cursor: pointer;
      align-items: center; justify-content: center;
    }

    .mobile-menu-drawer {
      display: flex; flex-direction: column; gap: 0.85rem; padding: 1.15rem; margin-top: 0.75rem;
      background: #fff; border: 1px solid var(--border); border-radius: 16px;
      box-shadow: 0 16px 40px -8px rgba(36, 16, 18, 0.2);
    }
    .mobile-nav-list { display: flex; flex-direction: column; gap: 0.45rem; }
    .mobile-nav-list a {
      display: flex; align-items: center; gap: 0.75rem; height: 34px; padding: 0 0.85rem; border-radius: 8px;
      border: 1px solid var(--border); color: var(--ink); text-decoration: none; font-weight: 600; font-size: 0.825rem;
      box-sizing: border-box; transition: all 0.2s ease;
    }
    .mobile-nav-list a i, .mobile-login-btn i { margin-right: 0.5rem !important; }
    .mobile-nav-list a:hover, .mobile-nav-list a.active { background: var(--maroon); color: #fff; border-color: var(--maroon-deep); }
    .mobile-actions-divider { height: 1px; background: var(--border); margin: 0.25rem 0; }
    ::ng-deep .mobile-lang-btn {
      width: 100% !important; height: 34px !important; padding: 0 0.85rem !important;
      font-size: 0.825rem !important; font-weight: 600 !important; border: 1px solid var(--border) !important;
      border-radius: 8px !important; margin-left: 0 !important; justify-content: center !important;
    }
    .mobile-login-btn {
      width: 100%; height: 34px; padding: 0 0.85rem; background: var(--maroon); color: #fff;
      border: 1px solid var(--maroon-deep); border-radius: 8px; font-weight: 600; font-size: 0.825rem;
      cursor: pointer; display: flex; align-items: center; justify-content: center; box-sizing: border-box;
    }
    .mobile-user-card { background: var(--paper); border: 1px solid var(--border); border-radius: 12px; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.65rem; }
    .mobile-user-info { display: flex; align-items: center; gap: 0.75rem; }
    .avatar-circle-sm { width: 32px; height: 32px; border-radius: 50%; background: var(--maroon); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; }
    .m-user-name { display: block; color: var(--maroon-deep); font-size: 0.85rem; }
    .m-user-role { font-size: 0.725rem; color: #8A6400; background: rgba(242, 183, 5, 0.2); padding: 0.1rem 0.4rem; border-radius: 4px; }
    .mobile-user-links { display: flex; gap: 0.5rem; }
    .mobile-user-link, .mobile-signout-btn { flex: 1; height: 34px; padding: 0 0.85rem; border-radius: 8px; font-size: 0.825rem; font-weight: 600; display: flex; align-items: center; justify-content: center; text-decoration: none; box-sizing: border-box; }
    .mobile-user-link { background: #fff; border: 1px solid var(--border); color: var(--maroon-deep); }
    .mobile-signout-btn { background: rgba(217, 83, 28, 0.1); color: var(--ember); border: 1px solid rgba(217, 83, 28, 0.3); cursor: pointer; }

    @media (max-width: 819px) {
      .navbar-wrapper { padding: 0.75rem 1.25rem !important; }
      .nav-menu-desktop, .desktop-only { display: none !important; }
      .mobile-hamburger-btn { display: flex !important; }
    }
  `]
})
export class NavbarComponent {
  langService = inject(LanguageService);
  authService = inject(AuthService);
  router = inject(Router);

  userMenuOpen = false;
  mobileMenuOpen = false;

  toggleUserMenu(event: Event): void {
    event.stopPropagation();
    this.userMenuOpen = !this.userMenuOpen;
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu(event: Event): void {
    event.stopPropagation();
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.userMenuOpen = false;
  }

  closeMenu(): void {
    this.userMenuOpen = false;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  closeAllMenus(): void {
    this.userMenuOpen = false;
    this.mobileMenuOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.userMenuOpen = false;
    this.mobileMenuOpen = false;
  }

  navigateToLogin(): void {
    this.closeAllMenus();
    this.router.navigate(['/admin-login']);
  }

  navigateToLoginMobile(): void {
    this.closeAllMenus();
    this.router.navigate(['/admin-login']);
  }

  onSignOut(): void {
    this.closeAllMenus();
    this.authService.logout();
  }

  onSignOutMobile(): void {
    this.closeAllMenus();
    this.authService.logout();
  }

  getUserInitial(): string {
    const user = this.authService.currentUser();
    const name = user?.details?.full_name || user?.username || 'A';
    return name.charAt(0).toUpperCase();
  }

  getUserFullName(): string {
    const user = this.authService.currentUser();
    return user?.details?.full_name || user?.username || 'Admin User';
  }

  getUserEmail(): string {
    const user = this.authService.currentUser();
    return user?.details?.email || `@${user?.username || 'admin'}`;
  }

  getUserRole(): string {
    const user = this.authService.currentUser();
    return user?.details?.role || 'Admin';
  }
}
