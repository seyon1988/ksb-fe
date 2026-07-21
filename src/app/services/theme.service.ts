import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ThemeOption {
  id: string;
  badgeText: string;
  name: string;
  maroon: string;
  maroonDeep: string;
  paper?: string;
  ink?: string;
  gold?: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private http = inject(HttpClient);

  themes: ThemeOption[] = [
    {
      id: 'option-2',
      badgeText: 'Option 2',
      name: 'Dark Terracotta Orange',
      maroon: '#D9531C',
      maroonDeep: '#B83A0C',
      paper: '#FBF5E8',
      ink: '#241012',
      gold: '#F2B705',
      description: 'Modern Architectural & Construction Studio (Vibrant, warm, construction-native)'
    },
    {
      id: 'theme-2',
      badgeText: 'Theme 2',
      name: 'Theme 2 (BOC Flex White & Blue)',
      maroon: '#0077B6',
      maroonDeep: '#003B73',
      paper: '#F8FAFC',
      ink: '#0F172A',
      gold: '#00A8E8',
      description: 'BOC Flex Inspired Clean White & Royal Blue Theme (Financial & Premium Services)'
    }
  ];

  activeThemeId = signal<string>('theme-2');

  constructor() {
    // 1. Instant local render from localStorage if available
    const savedTheme = localStorage.getItem('ksb_active_theme');
    if (savedTheme && this.themes.some(t => t.id === savedTheme)) {
      this.setTheme(savedTheme, false);
    } else {
      this.setTheme('theme-2', false);
    }

    // 2. Fetch active theme from Database on page boot
    this.loadThemeFromDb();
  }

  loadThemeFromDb(): void {
    this.http.get<{ theme_id: string }>('/api/settings/theme').subscribe({
      next: (res) => {
        if (res && res.theme_id && this.themes.some(t => t.id === res.theme_id)) {
          this.setTheme(res.theme_id, true);
        }
      },
      error: () => {}
    });
  }

  setTheme(themeId: string, save = true, reload = false): void {
    const selected = this.themes.find(t => t.id === themeId);
    if (!selected) return;

    const previousTheme = this.activeThemeId();
    this.activeThemeId.set(themeId);

    // Update global CSS variables on document element
    const root = document.documentElement;
    root.style.setProperty('--maroon', selected.maroon);
    root.style.setProperty('--maroon-deep', selected.maroonDeep);
    root.style.setProperty('--paper-line', `${selected.maroon}14`);

    if (selected.paper) {
      root.style.setProperty('--paper', selected.paper);
    }
    if (selected.ink) {
      root.style.setProperty('--ink', selected.ink);
    }
    if (selected.gold) {
      root.style.setProperty('--gold', selected.gold);
    }

    if (save) {
      localStorage.setItem('ksb_active_theme', themeId);
      // Persist to backend SQLite Database & auto reload page after save
      this.http.post('/api/settings/theme', { theme_id: themeId }).subscribe({
        next: () => {
          if (reload || previousTheme !== themeId) {
            window.location.reload();
          }
        },
        error: () => {
          if (reload || previousTheme !== themeId) {
            window.location.reload();
          }
        }
      });
    }
  }
}
