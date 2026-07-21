import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { LanguageService } from '../../services/language.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, CardModule, ImageModule, DividerModule],
  template: `
    <div class="gallery-page">
      <div class="gallery-header">
        <div class="container">
          <h1><i class="pi pi-images text-maroon me-2"></i> {{ langService.translate('galleryTitle') }}</h1>
          <p class="gallery-intro">{{ langService.translate('galleryIntro') }}</p>

          <div class="privacy-banner">
            <i class="pi pi-lock text-gold me-2"></i>
            <span>{{ langService.translate('privacyNotice') }}</span>
          </div>
        </div>
      </div>

      <div class="container gallery-content">
        <div class="project-cards">
          <p-card *ngFor="let proj of projects" styleClass="project-p-card mb-4">
            <ng-template pTemplate="title">
              <div class="project-meta">
                <span class="project-cat-pill">
                  <i class="pi pi-tag me-1.5"></i>
                  {{ langService.currentLang() === 'ta' ? proj.categoryTa : proj.categoryEn }}
                </span>
                <span class="project-date-pill">
                  <i class="pi pi-calendar me-1.5"></i>
                  Completed: {{ proj.completionDate }}
                </span>
              </div>
              <h2 class="project-title mt-2">
                {{ langService.currentLang() === 'ta' ? proj.titleTa : proj.titleEn }}
              </h2>
            </ng-template>

            <ng-template pTemplate="subtitle">
              <p class="project-desc">
                {{ langService.currentLang() === 'ta' ? proj.descTa : proj.descEn }}
              </p>
            </ng-template>

            <!-- Before / During / After Photo Grid with PrimeNG Image Preview -->
            <div class="photo-grid mt-3">
              <div class="photo-box">
                <span class="photo-badge-overlay before">
                  {{ langService.translate('beforeLabel') }}
                </span>
                <p-image 
                  [src]="proj.beforeImg" 
                  [alt]="proj.titleEn + ' Before'" 
                  [preview]="true" 
                  imageClass="gallery-img">
                </p-image>
              </div>

              <div class="photo-box">
                <span class="photo-badge-overlay during">
                  {{ langService.translate('duringLabel') }}
                </span>
                <p-image 
                  [src]="proj.duringImg" 
                  [alt]="proj.titleEn + ' During Work'" 
                  [preview]="true" 
                  imageClass="gallery-img">
                </p-image>
              </div>

              <div class="photo-box">
                <span class="photo-badge-overlay after">
                  {{ langService.translate('afterLabel') }}
                </span>
                <p-image 
                  [src]="proj.afterImg" 
                  [alt]="proj.titleEn + ' After Completion'" 
                  [preview]="true" 
                  imageClass="gallery-img">
                </p-image>
              </div>
            </div>
          </p-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gallery-header {
      background: var(--paper);
      padding: 3.5rem 1.5rem 2.5rem;
      text-align: center;
      border-bottom: 1px solid var(--border);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .gallery-header h1 {
      font-family: var(--font-display);
      font-size: 2.25rem;
      color: var(--maroon-deep);
      margin-bottom: 1rem;
    }
    .gallery-intro {
      max-width: 750px;
      margin: 0 auto 1.5rem;
      color: var(--ink-soft);
      font-size: 1.05rem;
      line-height: 1.6;
    }
    .privacy-banner {
      display: inline-flex;
      align-items: center;
      background: rgba(242, 183, 5, 0.18);
      color: #8A6400;
      border: 1px solid rgba(242, 183, 5, 0.4);
      padding: 0.5rem 1.2rem;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .gallery-content {
      padding: 4.5rem 1.5rem 5.5rem;
    }
    .project-cards {
      display: flex;
      flex-direction: column;
      gap: 40px;
      margin-top: 1.5rem;
      margin-bottom: 2.5rem;
    }
    ::ng-deep .project-p-card {
      background: #FFFFFF !important;
      border: 1px solid var(--border) !important;
      border-radius: 18px !important;
      color: var(--ink) !important;
      box-shadow: 0 6px 24px -6px rgba(36, 16, 18, 0.08) !important;
      margin-bottom: 0 !important;
    }
    .project-meta {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .project-cat-pill {
      background: rgba(217, 83, 28, 0.1);
      color: var(--maroon);
      border: 1px solid rgba(217, 83, 28, 0.25);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
    }
    .project-date-pill {
      background: rgba(242, 183, 5, 0.15);
      color: #8A6400;
      border: 1px solid rgba(242, 183, 5, 0.35);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
    }

    .project-title {
      font-family: var(--font-display);
      color: var(--maroon-deep);
      font-size: 1.4rem;
      margin-top: 0.6rem;
    }
    .project-desc {
      color: var(--ink-soft);
      font-size: 0.975rem;
      line-height: 1.6;
      margin: 0;
    }

    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
      row-gap: 40px;
    }
    .photo-box {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      aspect-ratio: 4 / 3;
      background: var(--paper);
      border: 1px solid var(--border);
      width: 100%;
      height: 100%;
    }
    ::ng-deep .photo-box .p-image,
    ::ng-deep .photo-box .p-image-preview-container {
      width: 100% !important;
      height: 100% !important;
      display: block !important;
    }
    ::ng-deep .photo-box .p-image img,
    ::ng-deep .gallery-img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      display: block !important;
      border-radius: 10px;
      transition: transform 0.4s ease !important;
    }
    ::ng-deep .photo-box:hover .gallery-img {
      transform: scale(1.04) !important;
    }

    .photo-badge-overlay {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 10;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.65rem;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .photo-badge-overlay.before {
      background: var(--maroon);
      color: #FFFFFF;
    }
    .photo-badge-overlay.during {
      background: #F2B705;
      color: #3D2D00;
    }
    .photo-badge-overlay.after {
      background: #28a745;
      color: #FFFFFF;
    }
  `]
})
export class GalleryComponent {
  langService = inject(LanguageService);
  projectService = inject(ProjectService);
  projects = this.projectService.getProjects();
}
