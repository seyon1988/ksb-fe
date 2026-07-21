import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <p class="copyright-text">
          <span class="copyright-tablet-badge">
            © 2026 KSB Construction &amp; Renovation Services. All Rights Reserved.
          </span>
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--paper);
      color: var(--ink-soft);
      padding: 15px 0.5rem;
      border-top: none;
      margin-top: auto;
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }
    .copyright-text {
      margin: 0;
      line-height: 1.15;
    }
    .copyright-tablet-badge {
      display: inline-block;
      background: linear-gradient(135deg, var(--maroon) 0%, var(--maroon-deep) 100%);
      color: #FFFFFF;
      padding: 0.18rem 0.85rem;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.75rem;
      box-shadow: 0 3px 10px rgba(122, 14, 19, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  `]
})
export class FooterComponent {
  langService = inject(LanguageService);
}
