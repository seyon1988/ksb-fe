import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ThemeOption {
  id: string;
  badgeText: string;
  name: string;
  maroon: string;
  maroonDeep: string;
  paper?: string;
  card?: string;
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
      id: 'theme-1',
      badgeText: 'Theme 1',
      name: 'Dark Terracotta Orange',
      maroon: '#D9531C',
      maroonDeep: '#B83A0C',
      paper: '#FBF5E8',
      card: '#FFFFFF',
      ink: '#241012',
      gold: '#F2B705',
      description: 'Modern Architectural & Construction Studio (Warm Light Mode)'
    },
    {
      id: 'theme-2',
      badgeText: 'Theme 2',
      name: 'Blue Theme',
      maroon: '#0077B6',
      maroonDeep: '#003B73',
      paper: '#F8FAFC',
      card: '#FFFFFF',
      ink: '#0F172A',
      gold: '#00A8E8',
      description: 'Clean White & Royal Blue Theme (Financial & Premium Light Mode)'
    },
    {
      id: 'theme-3',
      badgeText: 'Theme 3',
      name: 'Emerald Luxury',
      maroon: '#059669',
      maroonDeep: '#064E3B',
      paper: '#F0FDF4',
      card: '#FFFFFF',
      ink: '#022C22',
      gold: '#10B981',
      description: 'Fresh Eco-Friendly Architectural & Landscape Studio (Light Mode)'
    },
    {
      id: 'theme-4',
      badgeText: 'Theme 4',
      name: 'Cyber Charcoal & Gold',
      maroon: '#F59E0B',
      maroonDeep: '#D97706',
      paper: '#0F172A',
      card: '#1E293B',
      ink: '#F8FAFC',
      gold: '#FBBF24',
      description: 'Ultra-Modern High-Tech Dark Construction Studio (Dark Mode)'
    },
    {
      id: 'theme-5',
      badgeText: 'Theme 5',
      name: 'Nordic Midnight Blue',
      maroon: '#38BDF8',
      maroonDeep: '#0284C7',
      paper: '#0B132B',
      card: '#1C2541',
      ink: '#F1F5F9',
      gold: '#00F5D4',
      description: 'Scandinavian Electric Cyan & Midnight Blue Studio (Dark Mode)'
    },
    {
      id: 'theme-6',
      badgeText: 'Theme 6',
      name: 'Rose Gold & Velvet',
      maroon: '#E11D48',
      maroonDeep: '#9F1239',
      paper: '#FFF1F2',
      card: '#FFFFFF',
      ink: '#4C0519',
      gold: '#FB7185',
      description: 'Boutique Interior & Luxury Renovation Studio (Light Mode)'
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
    root.style.setProperty('--paper-line', `${selected.maroon}20`);

    if (selected.paper) {
      root.style.setProperty('--paper', selected.paper);
    }
    if (selected.card) {
      root.style.setProperty('--card', selected.card);
    } else {
      root.style.setProperty('--card', '#FFFFFF');
    }
    if (selected.ink) {
      root.style.setProperty('--ink', selected.ink);
      const isDark = selected.paper && (selected.paper.startsWith('#0') || selected.paper.startsWith('#1'));
      root.style.setProperty('--ink-soft', isDark ? 'rgba(241, 245, 249, 0.75)' : 'rgba(15, 23, 42, 0.68)');
      root.style.setProperty('--border', isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 59, 115, 0.12)');
    }
    if (selected.gold) {
      root.style.setProperty('--gold', selected.gold);
      root.style.setProperty('--gold-deep', selected.gold);
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
