import { Injectable } from '@angular/core';

export interface ProjectItem {
  id: string;
  titleEn: string;
  titleTa: string;
  categoryEn: string;
  categoryTa: string;
  descEn: string;
  descTa: string;
  beforeImg: string;
  duringImg: string;
  afterImg: string;
  completionDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: ProjectItem[] = [
    {
      id: 'proj-1',
      titleEn: 'Residential House Renovation',
      titleTa: 'குடியிருப்பு வீடு புதுப்பித்தல் திட்டம்',
      categoryEn: 'Full Renovation & Tiling',
      categoryTa: 'முழுமையான புதுப்பித்தல் & டைல்ஸ்',
      descEn: 'Complete interior & exterior overhaul including wall repair, modern floor tiling, plastering, and weather-seal painting.',
      descTa: 'சுவர் பழுதுபார்ப்பு, நவீன தரை டைல்ஸ், பூச்சு வேலைகள் மற்றும் வர்ணம் பூசுதல் உள்ளிட்ட முழுமையான புதுப்பித்தல்.',
      beforeImg: '/assets/projects/proj-1-before.jpg',
      duringImg: '/assets/projects/proj-1-during.jpg',
      afterImg: '/assets/projects/proj-1-after.jpg',
      completionDate: '2025'
    },
    {
      id: 'proj-2',
      titleEn: 'Modern Roof Construction & Waterproofing',
      titleTa: 'நவீன கூரை கட்டுமானம் & நீர்க்கசிவு தடுப்பு',
      categoryEn: 'Roofing & Structures',
      categoryTa: 'கூரை வேலைகள்',
      descEn: 'Replacement of damaged roof trusses, brand new tile roofing, and installation of rainwater gutters.',
      descTa: 'சேதமடைந்த கூரைகளை அகற்றி புதிய கூரை மற்றும் மழைநீர் வடிகால் அமைத்தல்.',
      beforeImg: '/assets/projects/proj-2-before.jpg',
      duringImg: '/assets/projects/proj-2-during.jpg',
      afterImg: '/assets/projects/proj-2-after.jpg',
      completionDate: '2025'
    },
    {
      id: 'proj-3',
      titleEn: 'Interior Living & Kitchen Upgrade',
      titleTa: 'வரவேற்பறை & சமையலறை அலங்காரம்',
      categoryEn: 'Interior Improvements',
      categoryTa: 'உட்புற மேம்பாடுகள்',
      descEn: 'Custom granite countertop installation, wall tiling, lighting fixtures, and interior painting.',
      descTa: 'கிரானைட் சமையலறை தளம், சுவர் டைல்ஸ் மற்றும் புதிய விளக்குகள் அமைத்தல்.',
      beforeImg: '/assets/projects/proj-3-before.jpg',
      duringImg: '/assets/projects/proj-3-during.jpg',
      afterImg: '/assets/projects/proj-3-after.jpg',
      completionDate: '2026'
    }
  ];

  getProjects(): ProjectItem[] {
    return this.projects;
  }
}
