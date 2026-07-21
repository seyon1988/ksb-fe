import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="whatsapp-float-container">
      <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="whatsapp-link" aria-label="Chat on WhatsApp">
        <!-- Desktop Floating Pill Button -->
        <div class="whatsapp-btn-desktop">
          <i class="pi pi-whatsapp wa-icon"></i>
          <span>{{ langService.translate('chatWhatsAppBtn') }}</span>
        </div>

        <!-- Mobile Circular Icon-Only Button (Situated 25% from bottom, right side) -->
        <div class="whatsapp-btn-mobile">
          <i class="pi pi-whatsapp wa-icon-mobile"></i>
        </div>
      </a>
    </div>
  `,
  styles: [`
    .whatsapp-float-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      transition: all 0.3s ease;
    }

    .whatsapp-link {
      text-decoration: none;
      display: inline-block;
    }

    /* Desktop View */
    .whatsapp-btn-desktop {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #25D366;
      color: #FFFFFF;
      padding: 0.65rem 1.35rem;
      border-radius: 50px;
      font-weight: 700;
      font-size: 0.95rem;
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
      transition: all 0.25s ease;
    }
    .whatsapp-btn-desktop:hover {
      transform: translateY(-4px) scale(1.04);
      box-shadow: 0 12px 28px rgba(37, 211, 102, 0.6);
      background: #20BA5A;
    }
    .wa-icon {
      font-size: 1.25rem;
    }

    .whatsapp-btn-mobile {
      display: none;
    }

    /* Mobile View (25% bottom offset & right side circular icon) */
    @media (max-width: 768px) {
      .whatsapp-float-container {
        bottom: 25%;
        right: 16px;
      }
      .whatsapp-btn-desktop {
        display: none !important;
      }
      .whatsapp-btn-mobile {
        display: flex !important;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: #25D366;
        color: #FFFFFF;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
        border: 2px solid #FFFFFF;
        transition: transform 0.2s ease;
      }
      .whatsapp-btn-mobile:active {
        transform: scale(0.92);
      }
      .wa-icon-mobile {
        font-size: 1.85rem;
      }
    }
  `]
})
export class WhatsappButtonComponent {
  langService = inject(LanguageService);
  whatsappUrl = 'https://wa.me/94777578710?text=Hello%20KSB%20Services,%20I%20would%20like%20to%20inquire%20about%20a%20construction%2Frenovation%20project.';
}
