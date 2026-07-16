import { Routes } from '@angular/router';
import { languageGuard } from './guards/language.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/ar' },
  { 
    path: ':lang', 
    canActivate: [languageGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
      { path: 'services', loadComponent: () => import('./pages/services/services').then(m => m.ServicesComponent) },
      { path: 'portfolio', loadComponent: () => import('./pages/portfolio/portfolio').then(m => m.PortfolioComponent) },
      { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent) },
      { path: 'testimonials', loadComponent: () => import('./pages/testimonials/testimonials').then(m => m.TestimonialsComponent) },
      { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent) },
    ]
  },
  { path: '**', redirectTo: '/ar' }
];
