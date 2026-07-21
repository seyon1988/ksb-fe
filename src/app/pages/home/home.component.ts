import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { LanguageService } from '../../services/language.service';

export interface ServiceSlide {
  id: number;
  icon: string;
  iconColor: string;
  titleKey: string;
  descKey: string;
  imageWeb: string;
  imageMobile: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, TagModule, BadgeModule],
  template: `
    <div class="home-page">
      <!-- Slideshow Hero Section with Integrated Executive Details -->
      <section 
        class="slideshow-hero-section" 
        (mouseenter)="pauseAutoSlide()" 
        (mousemove)="onHeroMouseMove($event)"
        (mouseleave)="onHeroMouseLeave()">
        
        <div class="container">
          <div class="slide-carousel-container">
            
            <!-- Active Slide Card -->
            <div class="slide-card fade-in-animation" *ngIf="currentSlide() as slide">
              
              <picture class="slide-image">
                <source media="(max-width: 767px)" [attr.srcset]="slide.imageMobile">
                <img [src]="slide.imageWeb" alt="{{ slide.titleKey }}" class="slide-bg-img">
              </picture>

              <h1 class="hero-title">{{ langService.translate('heroTitle') }}</h1>
              
              <!-- 3 Horizontally Stacked Inner Cards on Slide 7 -->
              <div class="slide7-cards-row" *ngIf="activeIndex() === 6">
                <!-- Card 1: Overview Text -->
                <p class="about-overview-text">
                  {{ langService.translate('aboutDesc') }}
                </p>

                <!-- Card 2: Executive Director Contact Banner -->
                <div class="slideshow-director-card">
                  <img src="/assets/biranavan.png" alt="Mr. Selvanathan Biranavan" class="slideshow-passport-photo" />
                  <div class="director-details">
                    <strong class="company-name-tag">KSB Construction &amp; Renovation Services</strong>
                    <p class="director-meta">
                      <span class="d-name">{{ langService.translate('directorName') }}</span>
                      <span class="meta-divider">|</span>
                      <span class="d-location"><i class="pi pi-map-marker text-gold me-1"></i>Jaffna, Sri Lanka</span>
                    </p>
                    <p class="director-phone">
                      <i class="pi pi-phone text-maroon me-1"></i>
                      <a href="tel:+94777578710" class="phone-link-hero">+94 777578710</a>
                    </p>
                  </div>
                </div>

                <!-- Card 3: Featured Service Highlight Box -->
                <div class="featured-service-box">
                  <div class="service-icon-wrap" [ngClass]="slide.iconColor">
                    <i [class]="slide.icon"></i>
                  </div>
                  <div class="service-text-wrap">
                    <h3>{{ langService.translate(slide.titleKey) }}</h3>
                    <p>{{ langService.translate(slide.descKey) }}</p>
                  </div>
                </div>
              </div>

              <!-- Standard Featured Service Highlight Box for Slides 1 - 6 -->
              <div class="featured-service-box" *ngIf="activeIndex() !== 6">
                <div class="service-icon-wrap" [ngClass]="slide.iconColor">
                  <i [class]="slide.icon"></i>
                </div>
                <div class="service-text-wrap">
                  <h3>{{ langService.translate(slide.titleKey) }}</h3>
                  <p>{{ langService.translate(slide.descKey) }}</p>
                </div>
              </div>


            </div>

            <!-- Slide Navigation Controls -->
            <button 
              class="nav-arrow prev-arrow" 
              [class.arrow-blink-active]="activeArrowGlow() === 'left'"
              (click)="prevSlide()" 
              aria-label="Previous Slide">
              <i class="pi pi-chevron-left"></i>
            </button>

            <button 
              class="nav-arrow next-arrow" 
              [class.arrow-blink-active]="activeArrowGlow() === 'right'"
              (click)="nextSlide()" 
              aria-label="Next Slide">
              <i class="pi pi-chevron-right"></i>
            </button>
          </div>

          <!-- Slide Dots / Indicators -->
          <div class="slideshow-dots">
            <button 
              *ngFor="let s of slides; let i = index" 
              class="dot-btn" 
              [class.active]="i === activeIndex()"
              (click)="goToSlide(i)"
              [attr.aria-label]="'Go to slide ' + (i + 1)">
            </button>
          </div>

        </div>
      </section>
    </div>
  `,
  styles: [`
    .slideshow-hero-section {
      background: var(--paper);
      padding: 2.5rem 1.5rem 1.5rem;
      border-bottom: none;
      position: relative;
    }
    .container {
      max-width: 1150px;
      margin: 0 auto;
    }

    .slide-carousel-container {
      position: relative;
      max-width: 960px;
      margin: 0 auto;
    }

    .slide-card {
      background: #FFFFFF;
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 2.25rem 2.75rem;
      box-shadow: 0 10px 32px -8px rgba(36, 16, 18, 0.1);
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
    }
    .slide-image {
      display: block;
      width: 100%;
      margin-bottom: 1rem;
      max-height: 380px;
      overflow: hidden;
      border-radius: 12px;
    }
    .slide-bg-img {
      width: 100%;
      height: 380px;
      object-fit: cover;
      border-radius: 12px;
      display: block;
    }

    .slide-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .slide-counter-badge {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--maroon);
      background: rgba(122, 14, 19, 0.08);
      padding: 0.25rem 0.75rem;
      border-radius: 50px;
      border: 1px solid rgba(122, 14, 19, 0.2);
    }

    .hero-title {
      font-family: var(--font-display);
      font-size: 2.25rem;
      font-weight: 800;
      line-height: 1.25;
      margin: 0.75rem 0;
      color: var(--maroon-deep);
    }

    /* Slide 7 Horizontally Stacked Cards Row */
    .slide7-cards-row {
      display: flex;
      flex-direction: row;
      gap: 1.25rem;
      align-items: stretch;
      justify-content: center;
      width: 100%;
      max-width: 100%;
      margin: 1rem 0 0 0;
    }
    .slide7-cards-row > * {
      flex: 1;
      margin: 0 !important;
      max-width: none !important;
      width: auto !important;
    }
    .slide7-cards-row .about-overview-text {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 991px) {
      .slide7-cards-row {
        flex-direction: column;
      }
    }

    .about-overview-text {
      font-size: 1.025rem;
      color: var(--ink);
      line-height: 1.65;
      max-width: 840px;
      margin: 0 auto 1.25rem;
      background: var(--paper);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 1rem 1.35rem;
      text-align: center;
    }

    /* Executive Director Contact Banner inside Slide */
    .slideshow-director-card {
      background: var(--paper);
      border: 1.5px solid var(--border);
      border-radius: 14px;
      padding: 0.9rem 1.35rem;
      display: flex;
      align-items: center;
      gap: 1.35rem;
      max-width: 840px;
      margin: 0 auto 1.5rem;
      text-align: left;
    }
    .slideshow-passport-photo {
      width: 65px;
      height: 85px;
      object-fit: cover;
      object-position: top center;
      background: #FFFFFF;
      padding: 3px;
      border: 1.5px solid var(--border);
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(36, 16, 18, 0.1);
      flex-shrink: 0;
    }
    .director-details {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .company-name-tag {
      color: var(--maroon-deep);
      font-family: var(--font-display);
      font-size: 1.05rem;
      font-weight: 700;
    }
    .director-meta {
      font-size: 0.9rem;
      color: var(--ink);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .d-name {
      font-weight: 600;
      color: var(--maroon);
    }
    .meta-divider {
      color: var(--border);
    }
    .d-location {
      color: var(--ink-soft);
    }
    .director-phone {
      font-size: 0.95rem;
      margin: 0;
      display: flex;
      align-items: center;
    }
    .phone-link-hero {
      color: var(--maroon-deep);
      font-weight: 700;
      text-decoration: none;
    }

    /* Featured Service Highlight Box inside Slide */
    .featured-service-box {
      background: #FFFFFF;
      border: 1.5px solid var(--border);
      border-radius: 14px;
      padding: 1.25rem 1.75rem;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      text-align: left;
      margin: 0 auto;
      max-width: 840px;
      width: 100%;
      flex: 1;
      min-height: 110px;
      box-sizing: border-box;
      transition: all 0.3s ease;
      box-shadow: 0 4px 14px rgba(36, 16, 18, 0.04);
    }
    .service-icon-wrap {
      font-size: 2.2rem;
      width: 58px;
      height: 58px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: rgba(122, 14, 19, 0.08);
      color: var(--maroon);
    }
    .service-icon-wrap.gold { color: #8A6400; background: rgba(242, 183, 5, 0.2); }
    .service-icon-wrap.ember { color: var(--ember); background: rgba(217, 83, 28, 0.12); }

    .service-text-wrap h3 {
      font-family: var(--font-display);
      font-size: 1.2rem;
      color: var(--maroon-deep);
      margin-bottom: 0.25rem;
    }
    .service-text-wrap p {
      color: var(--ink-soft);
      font-size: 0.925rem;
      margin: 0;
      line-height: 1.5;
    }

    .hero-actions {
      display: flex;
      gap: 1.25rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Navigation Arrows Base Style (Color 1 - Normal White State) */
    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 1.5px solid rgba(36, 16, 18, 0.13);
      color: var(--maroon-deep);
      font-size: 1.25rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(36, 16, 18, 0.12);
      z-index: 10;
    }
    .nav-arrow i {
      font-weight: 700;
      font-size: 1.25rem;
    }

    /* Standard Hover Behavior (Color 2 - Primary Theme Fill, Stops Blinking on Direct Hover) */
    .nav-arrow:hover,
    .nav-arrow.arrow-blink-active:hover {
      animation: none !important;
      background: var(--maroon) !important;
      color: #FFFFFF !important;
      border-color: var(--maroon) !important;
    }

    .prev-arrow { left: -25px; }
    .next-arrow { right: -25px; }

    /* Blinking Animation: Exactly 2 Blinks (0.36s per blink) */
    .nav-arrow.arrow-blink-active {
      animation: arrowSwitchBlink 0.36s 2 forwards !important;
    }

    @keyframes arrowSwitchBlink {
      0%, 45% {
        background-color: #FFFFFF;
        color: var(--maroon-deep);
        border-color: rgba(36, 16, 18, 0.13);
      }
      50%, 95% {
        background-color: var(--maroon);
        color: #FFFFFF;
        border-color: var(--maroon);
      }
      100% {
        background-color: #FFFFFF;
        color: var(--maroon-deep);
        border-color: rgba(36, 16, 18, 0.13);
      }
    }

    /* Dots */
    .slideshow-dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1.75rem;
    }
    .dot-btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(36, 16, 18, 0.2);
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .dot-btn.active {
      width: 32px;
      border-radius: 10px;
      background: var(--maroon);
    }

    /* Animation */
    .fade-in-animation {
      animation: fadeIn 0.4s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0.4; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Web View Desktop Specific: 100% Height Fill & Full Width Span with 50px Left/Right Margins */
    @media (min-width: 992px) {
      .home-page {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: calc(100vh - 120px);
      }
      .slideshow-hero-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1.5rem 50px 1rem 50px !important;
        border-bottom: none !important;
        width: 100%;
        box-sizing: border-box;
      }
      .container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        max-width: 100% !important;
        width: 100%;
        padding: 0;
      }
      .slide-carousel-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        max-width: 100% !important;
        width: 100%;
      }
      .slide-card {
        flex: 1;
        min-height: calc(100vh - 230px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 100%;
        width: 100%;
        padding: 2.25rem 4rem;
      }
    }

    @media (max-width: 680px) {
      .slide-card { padding: 1.75rem 1.25rem; }
      .prev-arrow { left: -10px; }
      .next-arrow { right: -10px; }
      .hero-title { font-size: 1.75rem; }
      .slideshow-director-card { flex-direction: column; text-align: center; }
      .featured-service-box { flex-direction: column; text-align: center; }
    }
  `]
})
// Duplicate ServiceSlide interface removed; the definition above now includes image fields.

export class HomeComponent implements OnInit, OnDestroy {
  langService = inject(LanguageService);

  slides: ServiceSlide[] = [
    { id: 1, icon: 'pi pi-home', iconColor: 'gold', titleKey: 'homeReno', descKey: 'homeRenoDesc', imageWeb: '/assets/slides/slide1_web.jpg', imageMobile: '/assets/slides/slide1_mobile.jpg' },
    { id: 2, icon: 'pi pi-palette', iconColor: 'maroon', titleKey: 'interiorWork', descKey: 'interiorWorkDesc', imageWeb: '/assets/slides/slide2_web.jpg', imageMobile: '/assets/slides/slide2_mobile.jpg' },
    { id: 3, icon: 'pi pi-sparkles', iconColor: 'ember', titleKey: 'paintingFinishing', descKey: 'paintingFinishingDesc', imageWeb: '/assets/slides/slide3_web.jpg', imageMobile: '/assets/slides/slide3_mobile.jpg' },
    { id: 4, icon: 'pi pi-th-large', iconColor: 'maroon', titleKey: 'flooringTiling', descKey: 'flooringTilingDesc', imageWeb: '/assets/slides/slide4_web.jpg', imageMobile: '/assets/slides/slide4_mobile.jpg' },
    { id: 5, icon: 'pi pi-shield', iconColor: 'ember', titleKey: 'roofingWork', descKey: 'roofingWorkDesc', imageWeb: '/assets/slides/slide5_web.jpg', imageMobile: '/assets/slides/slide5_mobile.jpg' },
    { id: 6, icon: 'pi pi-building', iconColor: 'maroon', titleKey: 'houseConst', descKey: 'houseConstDesc', imageWeb: '/assets/slides/slide6_web.jpg', imageMobile: '/assets/slides/slide6_mobile.jpg' },
    { id: 7, icon: 'pi pi-check-square', iconColor: 'gold', titleKey: 'supervision', descKey: 'supervisionDesc', imageWeb: '/assets/slides/slide7_web.jpg', imageMobile: '/assets/slides/slide7_mobile.jpg' }
  ];

  activeIndex = signal<number>(0);
  activeArrowGlow = signal<'left' | 'right' | null>(null);
  private autoTimer: any;
  private mouseStopTimer: any;
  private lastMouseX: number | null = null;

  currentSlide(): ServiceSlide {
    return this.slides[this.activeIndex()];
  }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    if (this.mouseStopTimer) {
      clearTimeout(this.mouseStopTimer);
    }
  }

  startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoTimer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.autoTimer) {
      clearInterval(this.autoTimer);
    }
  }

  pauseAutoSlide(): void {
    this.stopAutoSlide();
  }

  resumeAutoSlide(): void {
    this.startAutoSlide();
  }

  onHeroMouseMove(event: MouseEvent): void {
    const currentX = event.clientX;

    if (this.lastMouseX !== null) {
      if (currentX < this.lastMouseX) {
        // Moving mouse left -> Left arrow blinks
        this.activeArrowGlow.set('left');
      } else if (currentX > this.lastMouseX) {
        // Moving mouse right -> Right arrow blinks
        this.activeArrowGlow.set('right');
      }
    }
    this.lastMouseX = currentX;

    if (this.mouseStopTimer) {
      clearTimeout(this.mouseStopTimer);
    }
    this.mouseStopTimer = setTimeout(() => {
      this.activeArrowGlow.set(null);
      this.lastMouseX = null;
    }, 720);
  }

  onHeroMouseLeave(): void {
    if (this.mouseStopTimer) {
      clearTimeout(this.mouseStopTimer);
    }
    this.activeArrowGlow.set(null);
    this.lastMouseX = null;
    this.resumeAutoSlide();
  }

  nextSlide(): void {
    const next = (this.activeIndex() + 1) % this.slides.length;
    this.activeIndex.set(next);
  }

  prevSlide(): void {
    const prev = (this.activeIndex() - 1 + this.slides.length) % this.slides.length;
    this.activeIndex.set(prev);
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.activeIndex.set(index);
    }
  }
}
