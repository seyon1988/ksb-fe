import { Injectable, signal } from '@angular/core';

export type Language = 'en' | 'ta';

export interface Translations {
  [key: string]: {
    en: string;
    ta: string;
  };
}

export const DICTIONARY: Translations = {
  // Navbar
  brandName: { en: 'KSB Construction', ta: 'கே.எஸ்.பி கட்டுமான சேவைகள்' },
  home: { en: 'Home', ta: 'முகப்பு' },
  projects: { en: 'Projects Gallery', ta: 'கட்டுமானங்கள்' },
  contact: { en: 'Contact Us', ta: 'தொடர்புகளுக்கு' },
  admin: { en: 'Admin', ta: 'நிர்வாகி' },
  langToggle: { en: 'தமிழ்', ta: 'English' },

  // Hero Section
  heroTitle: { en: 'Residential Construction & Renovation Services', ta: 'குடியிருப்பு கட்டுமானம் மற்றும் புதுப்பித்தல் சேவைகள்' },
  heroSubtitle: { en: 'Quality Workmanship, Attention to Detail, and Reliable Project Management in Sri Lanka.', ta: 'இலங்கையில் தரமான வேலைத்திறன், துல்லியமான கவனிப்பு மற்றும் நம்பகமான திட்ட மேலாண்மை.' },
  viewProjectsBtn: { en: 'View Our Projects', ta: 'எமது திட்டங்களைப் பார்க்க' },
  chatWhatsAppBtn: { en: 'Chat on WhatsApp', ta: 'WhatsApp இல் தொடர்பு கொள்ள' },

  // About Section
  aboutTitle: { en: 'About KSB Services', ta: 'KSB நிறுவனத்தைப் பற்றி' },
  aboutDesc: {
    en: 'Operated by Mr. Selvanathan Biranavan, KSB Construction & Renovation Services specializes in residential construction and property improvement projects across Sri Lanka. Built on trust, client referrals, and proven quality.',
    ta: 'திரு. செல்வநாதன் பிரணவன் அவர்களால் நடத்தப்படும் KSB கட்டுமானம் & புதுப்பித்தல் சேவைகள், இலங்கை முழுவதும் குடியிருப்பு கட்டுமானம் மற்றும் சொத்து மேம்பாட்டுத் திட்டங்களில் நிபுணத்துவம் பெற்றது.'
  },
  directorName: { en: 'Mr. Selvanathan Biranavan', ta: 'திரு. செல்வநாதன் பிரணவன்' },
  directorTitle: { en: 'Managing Director & Project Supervisor', ta: 'நிர்வாக இயக்குனர் & திட்ட மேற்பார்வையாளர்' },
  location: { en: 'Jaffna, Sri Lanka', ta: 'யாழ்ப்பாணம், இலங்கை' },

  // Services
  servicesTitle: { en: 'Services We Provide', ta: 'நாங்கள் வழங்கும் சேவைகள்' },
  houseConst: { en: 'Residential House Construction', ta: 'குடியிருப்பு வீடுகள் கட்டுமானம்' },
  houseConstDesc: { en: 'From planning to completion, complete house building tailored to your needs.', ta: 'திட்டமிடல் முதல் நிறைவு வரை முழுமையான வீடு கட்டுமானம்.' },
  homeReno: { en: 'Home Renovations & Upgrades', ta: 'வீட்டுப் புதுப்பித்தல் மற்றும் நவீனமயமாக்கல்' },
  homeRenoDesc: { en: 'Transforming existing residential spaces with quality structural updates.', ta: 'நிலவும் குடியிருப்பு இடங்களை புதிய பொலிவுடன் மாற்றுதல்.' },
  interiorWork: { en: 'Interior Improvements', ta: 'உட்புற மேம்பாடுகள்' },
  interiorWorkDesc: { en: 'Modern interior finishes, ceiling work, and custom wall designs.', ta: 'நவீன உட்புற அலங்காரம் மற்றும் சுவர்களின் வடிவமைப்பு.' },
  paintingFinishing: { en: 'Painting & Finishing Work', ta: 'வர்ணம் பூசுதல் & அழகுபடுத்துதல்' },
  paintingFinishingDesc: { en: 'Premium interior and exterior painting with weather-resistant protection.', ta: 'உயர்தர உட்புற மற்றும் வெளிப்புற வர்ணம் பூசும் சேவைகள்.' },
  flooringTiling: { en: 'Flooring & Tiling', ta: 'தரை விரிப்பு & டைல்ஸ் பதித்தல்' },
  flooringTilingDesc: { en: 'Precision tiling for living rooms, kitchens, bathrooms, and verandas.', ta: 'வரவேற்பறை, சமையலறை, குளியலறை மற்றும் வராண்டாக்களுக்கு டைல்ஸ் பதித்தல்.' },
  roofingWork: { en: 'Roofing & Exterior Work', ta: 'கூரை வேலைகள் & வெளிப்புற பராமரிப்பு' },
  roofingWorkDesc: { en: 'Durable roofing construction, repairs, and rainwater drainage setups.', ta: 'உறுதியான கூரை அமைத்தல் மற்றும் மழைநீர் வடிகால் அமைப்புகள்.' },
  supervision: { en: 'Construction Supervision', ta: 'கட்டுமான திட்ட மேற்பார்வை' },
  supervisionDesc: { en: 'Professional site oversight ensuring safety and timely project completion.', ta: 'பாதுகாப்பு மற்றும் சரியான நேர நிறைவை உறுதி செய்யும் தொழில்முறை மேற்பார்வை.' },

  // Projects Gallery
  galleryTitle: { en: 'Our Completed Projects', ta: 'நிறைவுற்ற எமது திட்டங்கள்' },
  galleryIntro: {
    en: 'Below are selected examples of residential construction and renovation projects completed by our team. We respect our clients’ privacy; exact property addresses are kept confidential.',
    ta: 'எமது குழுவால் நிறைவு செய்யப்பட்ட குடியிருப்பு கட்டுமானம் மற்றும் புதுப்பித்தல் திட்டங்களின் சான்றுகள் கீழே கொடுக்கப்பட்டுள்ளன.'
  },
  beforeLabel: { en: 'Before', ta: 'முன்னர்' },
  duringLabel: { en: 'During Work', ta: 'வேலையின் போது' },
  afterLabel: { en: 'After Completion', ta: 'நிறைவுக்கு பின்' },

  // Contact
  contactTitle: { en: 'Get In Touch', ta: 'எங்களை தொடர்பு கொள்ளவும்' },
  contactSubtitle: { en: 'For inquiries regarding residential construction and renovation projects, please contact us directly via WhatsApp or phone.', ta: 'குடியிருப்பு கட்டுமானம் மற்றும் புதுப்பித்தல் பற்றிய விசாரணைகளுக்கு நேரடியாக WhatsApp மூலம் தொடர்பு கொள்ளவும்.' },
  phoneLabel: { en: 'Phone / WhatsApp', ta: 'தொலைபேசி / WhatsApp' },
  addressLabel: { en: 'Operating Location', ta: 'செயல்படும் இடம்' },
  privacyNotice: { en: 'Note: To protect client confidentiality, personal client details and property addresses are not displayed online.', ta: 'குறிப்பு: வாடிக்கையாளர் ரகசியத்தன்மையைப் பாதுகாக்க, தனிப்பட்ட விவரங்கள் காட்டப்படாது.' },

  // Admin Login
  adminLoginTitle: { en: 'Admin Portal Login', ta: 'நிர்வாகி நுழைவுப் பகுதி' },
  usernameLabel: { en: 'Username', ta: 'பயனர்பெயர்' },
  passwordLabel: { en: 'Password', ta: 'கடவுச்சொல்' },
  loginBtn: { en: 'Sign In', ta: 'உள்நுழைக' },
  loginError: { en: 'Invalid username or password. Please try again.', ta: 'தவறான பயனர்பெயர் அல்லது கடவுச்சொல்.' },

  // Admin Dashboard
  dashboardTitle: { en: 'KSB Admin Control Panel', ta: 'KSB நிர்வாகக் கட்டுப்பாட்டுப் பலகை' },
  welcomeAdmin: { en: 'Welcome back,', ta: 'நல்வரவு,' },
  logoutBtn: { en: 'Sign Out', ta: 'வெளியேறு' },
  systemStatus: { en: 'System & Database Status', ta: 'அமைப்பு மற்றும் தரவுத்தள நிலை' },
  dbConnected: { en: 'Aiven PostgreSQL Connected', ta: 'Aiven PostgreSQL இணைக்கப்பட்டது' },
  jwtVerified: { en: 'JWT Token Active & Valid', ta: 'JWT டோக்கன் செல்லுபடியாகும்' }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang = signal<Language>('en');

  constructor() {
    const saved = localStorage.getItem('ksb_lang') as Language;
    if (saved === 'en' || saved === 'ta') {
      this.currentLang.set(saved);
    }
  }

  toggleLanguage(): void {
    const next = this.currentLang() === 'en' ? 'ta' : 'en';
    this.currentLang.set(next);
    localStorage.setItem('ksb_lang', next);
  }

  translate(key: string): string {
    const lang = this.currentLang();
    if (DICTIONARY[key]) {
      return DICTIONARY[key][lang] || DICTIONARY[key]['en'];
    }
    return key;
  }
}
