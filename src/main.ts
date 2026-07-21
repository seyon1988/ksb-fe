import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Suppress PrimeUI license warning log
const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('PrimeUI')) {
    return;
  }
  originalWarn.apply(console, args);
};

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
