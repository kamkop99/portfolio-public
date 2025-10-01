import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { ExtraOptions, provideRouter, withHashLocation, withRouterConfig } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled', // Ensure scrolling to fragments works
  scrollPositionRestoration: 'disabled' // Prevents browser's default scroll interfering
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideRouter(routes, withHashLocation(), withRouterConfig(routerOptions))
  ]
};
