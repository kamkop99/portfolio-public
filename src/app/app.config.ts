import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { ExtraOptions, provideRouter, withRouterConfig } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'disabled'
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    providePrimeNG({
        theme: { preset: Aura, options: { darkModeSelector: '.p-dark' } },
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
    provideRouter(routes, withRouterConfig(routerOptions)),
    provideNoopAnimations()// NOSONAR
  ]
};
