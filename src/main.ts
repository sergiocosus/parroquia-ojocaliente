import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import './icons';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import localeESMX from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeESMX);

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
