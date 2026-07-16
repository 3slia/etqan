import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService implements OnDestroy {
  private currentLangSubject = new BehaviorSubject<string>('ar');
  public currentLang$ = this.currentLangSubject.asObservable();
  private routerSub: Subscription;

  constructor(
    private translate: TranslateService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initLanguage();

    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const regex = new RegExp('^/(ar|en)');
      const urlMatches = event.urlAfterRedirects.match(regex);
      if (urlMatches) {
        this.setLanguage(urlMatches[1]);
      }
    });
  }

  private initLanguage() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setFallbackLang('ar');
    
    let savedLang = 'ar';
    if (isPlatformBrowser(this.platformId)) {
      savedLang = localStorage.getItem('lang') || 'ar';
    }
    
    this.setLanguage(savedLang);
  }

  public setLanguage(lang: string) {
    if (this.currentLangSubject.value !== lang) {
      this.translate.use(lang);
      this.currentLangSubject.next(lang);
      
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      }
    }
  }

  public toggleLanguage(currentUrl: string): void {
    const newLang = this.currentLangSubject.value === 'ar' ? 'en' : 'ar';
    let newUrl = '';
    
    const regex = new RegExp('^/(ar|en)');
    if (currentUrl.match(regex)) {
      newUrl = currentUrl.replace(regex, '/' + newLang);
    } else {
      newUrl = '/' + newLang + currentUrl;
    }
    
    this.router.navigateByUrl(newUrl);
  }

  public get currentLanguage(): string {
    return this.currentLangSubject.value;
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
