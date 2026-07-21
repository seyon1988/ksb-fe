import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { SessionWarningComponent } from './components/session-warning/session-warning.component';
import { ThemeService } from './services/theme.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent, 
    WhatsappButtonComponent,
    SessionWarningComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'KSB Construction & Renovation Services';
  themeService = inject(ThemeService);
  router = inject(Router);

  ngOnInit(): void {
    // 1. Fetch & apply theme from open DB endpoint on initial page refresh / load
    this.themeService.loadThemeFromDb();

    // 2. Fetch & re-apply theme on every new page open / router navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.themeService.loadThemeFromDb();
      });
  }
}
