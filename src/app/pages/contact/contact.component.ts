import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, CardModule, PanelModule, ButtonModule, MessageModule, DividerModule, TagModule],
  template: `
    <div class="contact-page">
      <div class="contact-header">
        <div class="container">
          <h1><i class="pi pi-envelope text-maroon me-2"></i> {{ langService.translate('contactTitle') }}</h1>
          <p>{{ langService.translate('contactSubtitle') }}</p>
        </div>
      </div>

      <div class="container contact-content">
        <div class="contact-grid">
          <!-- Modern Executive Direct Contact Card (Card 1) -->
          <div class="modern-contact-card">
            <div class="card-brand-bar">
              <div class="brand-title-group">
                <span class="brand-badge-icon"><i class="pi pi-building text-maroon"></i></span>
                <div>
                  <h2>KSB Construction &amp; Renovation Services</h2>
                  <span class="verified-tag"><i class="pi pi-check-circle text-gold me-1"></i> Verified Direct Business Portal</span>
                </div>
              </div>
            </div>

            <!-- Director Executive Passport Profile Section -->
            <div class="director-hero-profile mt-4">
              <img src="/assets/biranavan.png" alt="Mr. Selvanathan Biranavan" class="director-passport-photo" />
              <div class="director-hero-info">
                <h3 class="director-name-heading">{{ langService.translate('directorName') }}</h3>
                <p class="director-role-tag"><i class="pi pi-user text-maroon me-1"></i> {{ langService.translate('directorTitle') }}</p>
                <div class="availability-pill mt-2">
                  <span class="online-dot"></span>
                  <span>Available for Residential Projects</span>
                </div>
              </div>
            </div>

            <!-- Contact Tiles Grid (Location & Direct Phone) -->
            <div class="contact-tiles-grid mt-4">
              <div class="contact-tile">
                <div class="tile-icon gold-tile">
                  <i class="pi pi-map-marker text-gold"></i>
                </div>
                <div class="tile-content">
                  <span class="tile-label">{{ langService.translate('addressLabel') }}</span>
                  <strong>{{ langService.translate('location') }}</strong>
                </div>
              </div>

              <div class="contact-tile">
                <div class="tile-icon maroon-tile">
                  <i class="pi pi-phone text-maroon"></i>
                </div>
                <div class="tile-content">
                  <span class="tile-label">{{ langService.translate('phoneLabel') }}</span>
                  <strong><a href="tel:+94777578710" class="phone-link-bold">+94 777578710</a></strong>
                </div>
              </div>
            </div>

            <!-- Primary Action Buttons -->
            <div class="action-buttons-group mt-4">
              <a href="https://wa.me/94777578710" target="_blank" rel="noopener noreferrer" class="action-link">
                <p-button
                  [label]="langService.translate('chatWhatsAppBtn')"
                  icon="pi pi-whatsapp"
                  severity="success"
                  styleClass="w-full primary-wa-btn"
                  size="large">
                </p-button>
              </a>
              <a href="tel:+94777578710" class="action-link">
                <p-button
                  label="Direct Phone Call"
                  icon="pi pi-phone"
                  severity="warn"
                  styleClass="w-full direct-call-btn"
                  size="large">
                </p-button>
              </a>
            </div>
          </div>

          <!-- Modern Business Inquiry & Confidentiality Card (Card 2) -->
          <div class="modern-inquiry-card">
            <div class="inquiry-header">
              <div class="header-icon"><i class="pi pi-shield text-maroon"></i></div>
              <div>
                <h2>Direct Customer Inquiries</h2>
              </div>
            </div>

            <p class="inquiry-lead-text mt-3">
              We provide residential construction, renovation, interior/exterior work, and project supervision.
              Our projects are managed with maximum care, structural precision, and transparency.
            </p>

            <div class="pillars-grid">
              <div class="pillar-chip">
                <i class="pi pi-building text-maroon me-3"></i>
                <span>Residential Building</span>
              </div>
              <div class="pillar-chip">
                <i class="pi pi-home text-gold me-3"></i>
                <span>Renovation & Upgrades</span>
              </div>
              <div class="pillar-chip">
                <i class="pi pi-palette text-maroon me-3"></i>
                <span>Interior & Exterior</span>
              </div>
              <div class="pillar-chip">
                <i class="pi pi-check-square text-ember me-3"></i>
                <span>Supervision & Care</span>
              </div>
            </div>

            <!-- Modern Confidentiality Alert Box -->
            <div class="confidentiality-box">
              <div class="lock-icon-wrap">
                <i class="pi pi-lock text-gold"></i>
              </div>
              <div class="confidentiality-content">
                <strong>Client Confidentiality Policy</strong>
                <p>{{ langService.translate('privacyNotice') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-header {
      background: var(--paper);
      padding: 4rem 1.5rem 3rem;
      text-align: center;
      border-bottom: 1px solid var(--border);
    }
    .container {
      max-width: 1150px;
      margin: 0 auto;
    }
    .contact-header h1 {
      font-family: var(--font-display);
      font-size: 2.25rem;
      color: var(--maroon-deep);
      margin-bottom: 0.75rem;
    }
    .contact-header p {
      color: var(--ink-soft);
      max-width: 650px;
      margin: 0 auto;
      font-size: 1.05rem;
      line-height: 1.6;
    }

    .contact-content {
      padding: 3.5rem 1.5rem;
    }
    .contact-grid {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 820px;
      margin: 0 auto;
    }

    /* Modern Executive Contact Card */
    .modern-contact-card {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 2.25rem;
      box-shadow: 0 8px 28px -6px rgba(36, 16, 18, 0.08);
      display: flex;
      flex-direction: column;
    }

    .card-brand-bar {
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.25rem;
    }
    .brand-title-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .brand-badge-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(122, 14, 19, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }
    .brand-title-group h2 {
      font-family: var(--font-display);
      color: var(--maroon-deep);
      font-size: 1.4rem;
      margin: 0 0 0.2rem;
    }
    .verified-tag {
      font-size: 0.825rem;
      color: #8A6400;
      font-weight: 600;
    }

    /* Director Profile Hero */
    .director-hero-profile {
      display: flex;
      align-items: stretch;
      gap: 1.5rem;
      background: var(--paper);
      padding: 1.35rem 1.6rem;
      border-radius: 16px;
      border: 1px solid var(--border);
      flex-wrap: wrap;
      margin-top: 1.75rem !important;
      margin-bottom: 1.75rem !important;
    }
    .director-passport-photo {
      width: 140px;
      height: 188px;
      object-fit: cover;
      object-position: top center;
      background: #FFFFFF;
      padding: 4px;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      box-shadow: 0 4px 14px rgba(36, 16, 18, 0.12);
      flex-shrink: 0;
    }
    .director-hero-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 188px;
      padding: 0.25rem 0;
      box-sizing: border-box;
      flex: 1;
    }
    .director-name-heading {
      font-family: var(--font-display);
      color: var(--maroon-deep);
      font-size: 1.35rem;
      margin: 0 0 0.3rem;
    }
    .director-role-tag {
      color: var(--maroon);
      font-weight: 600;
      font-size: 0.95rem;
      margin: 0;
    }
    .availability-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #FFFFFF;
      padding: 0.35rem 0.85rem;
      border-radius: 50px;
      border: 1px solid var(--border);
      font-size: 0.825rem;
      font-weight: 600;
      color: var(--ink);
    }
    .online-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
    }

    /* Contact Tiles Grid */
    .contact-tiles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
      margin-top: 1.75rem !important;
      margin-bottom: 1.75rem !important;
    }
    .contact-tile {
      background: var(--paper);
      border: 1px solid var(--border);
      padding: 1rem 1.25rem;
      border-radius: 14px;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .tile-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      flex-shrink: 0;
    }
    .gold-tile { background: rgba(242, 183, 5, 0.2); }
    .maroon-tile { background: rgba(122, 14, 19, 0.08); }

    .tile-content {
      display: flex;
      flex-direction: column;
    }
    .tile-label {
      font-size: 0.8rem;
      color: var(--ink-soft);
      font-weight: 500;
    }
    .tile-content strong {
      color: var(--maroon-deep);
      font-size: 0.975rem;
    }
    .phone-link-bold {
      color: var(--maroon);
      text-decoration: none;
      font-weight: 700;
      font-size: 1.05rem;
    }

    /* Action Buttons Group */
    .action-buttons-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
      margin-top: 1.75rem !important;
      margin-bottom: 0.5rem !important;
    }
    .action-link {
      text-decoration: none;
      width: 100%;
    }
    ::ng-deep .direct-call-btn {
      background: var(--maroon) !important;
      border: 1px solid var(--maroon-deep) !important;
      color: #FFFFFF !important;
      font-weight: 700 !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 4px 14px rgba(122, 14, 19, 0.25) !important;
    }
    ::ng-deep .direct-call-btn:hover {
      background: var(--maroon-deep) !important;
      border-color: var(--maroon-deep) !important;
      color: #FFFFFF !important;
      box-shadow: 0 6px 20px rgba(74, 6, 9, 0.35) !important;
      transform: translateY(-2px);
    }

    /* Modern Inquiry Card */
    .modern-inquiry-card {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 2.25rem;
      box-shadow: 0 8px 28px -6px rgba(36, 16, 18, 0.08);
      display: flex;
      flex-direction: column;
    }
    .inquiry-header {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .header-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(122, 14, 19, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      flex-shrink: 0;
    }
    .inquiry-header h2 {
      font-family: var(--font-display);
      color: var(--maroon-deep);
      font-size: 1.4rem;
      margin: 0;
    }
    .inquiry-lead-text {
      color: var(--ink);
      font-size: 1.025rem;
      line-height: 1.65;
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 0.85rem;
      margin-top: 2.75rem !important;
      margin-bottom: 2.75rem !important;
    }
    .pillar-chip {
      background: var(--paper);
      border: 1px solid var(--border);
      padding: 0.85rem 1.25rem;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--maroon-deep);
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .pillar-chip i {
      font-size: 1.35rem;
      margin-right: 0.85rem !important;
      flex-shrink: 0;
    }

    /* Confidentiality Box */
    .confidentiality-box {
      background: linear-gradient(135deg, rgba(242, 183, 5, 0.15) 0%, rgba(251, 245, 232, 0.9) 100%);
      border: 1.5px solid rgba(201, 146, 0, 0.4);
      border-radius: 14px;
      padding: 1.4rem 1.6rem;
      margin-top: 2.75rem !important;
      margin-bottom: 0.75rem;
      display: flex;
      gap: 1.15rem;
      align-items: flex-start;
    }
    .lock-icon-wrap {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(36, 16, 18, 0.08);
    }
    .confidentiality-content strong {
      color: #8A6400;
      font-size: 0.925rem;
      display: block;
      margin-bottom: 0.2rem;
    }
    .confidentiality-content p {
      color: var(--ink-soft);
      font-size: 0.875rem;
      margin: 0;
      line-height: 1.5;
      font-style: italic;
    }

    .w-full { width: 100% !important; }

    @media (max-width: 680px) {
      .modern-contact-card, .modern-inquiry-card {
        padding: 1.5rem 1.25rem;
      }
      .pillars-grid {
        gap: 0.85rem;
      }
      .pillar-chip {
        padding: 0.85rem 1.1rem;
        gap: 1rem;
        font-size: 0.95rem;
      }
      .pillar-chip i {
        font-size: 1.35rem;
        margin-right: 0.85rem !important;
        flex-shrink: 0;
      }
      .action-buttons-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      .action-link {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      ::ng-deep .primary-wa-btn,
      ::ng-deep .direct-call-btn,
      ::ng-deep .whatsapp-btn {
        width: 100% !important;
        justify-content: center !important;
        text-align: center !important;
        margin: 0 auto !important;
      }
    }
  `]
})
export class ContactComponent {
  langService = inject(LanguageService);
}
