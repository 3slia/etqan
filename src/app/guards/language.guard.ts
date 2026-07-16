import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export const languageGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const translateService = inject(TranslateService);
  
  const lang = route.paramMap.get('lang');
  const validLangs = ['ar', 'en'];

  if (lang && validLangs.includes(lang)) {
    // Set the language
    translateService.use(lang);
    
    // Update HTML direction and lang attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'ar') {
      document.body.classList.remove('en-lang');
    } else {
      document.body.classList.add('en-lang');
    }
    
    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
    return true;
  }

  // If language is invalid, redirect to default language (ar)
  const savedLang = typeof localStorage !== 'undefined' ? (localStorage.getItem('lang') || 'ar') : 'ar';
  const defaultLang = validLangs.includes(savedLang) ? savedLang : 'ar';
  
  // Create tree for redirection
  return router.createUrlTree(['/', defaultLang]);
};
