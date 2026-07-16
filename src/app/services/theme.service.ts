import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkTheme = signal<boolean>(true); // Default to dark since the UI is designed as dark by default

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        this.isDarkTheme.set(false);
      }
    }

    effect(() => {
      const isDark = this.isDarkTheme();
      if (isPlatformBrowser(this.platformId)) {
        if (!isDark) {
          document.body.classList.add('light-theme');
          document.body.classList.remove('dark-theme'); // clean up old class if present
        } else {
          document.body.classList.remove('light-theme');
          document.body.classList.remove('dark-theme');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
    });
  }

  toggleTheme() {
    this.isDarkTheme.update(dark => !dark);
  }
}
