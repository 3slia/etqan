import { Component, signal, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './services/language.service';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { ChatWidgetComponent } from './chat-widget/chat-widget';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent,
    ChatWidgetComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('etqan-app');
  
  constructor(private languageService: LanguageService) {
    // Language Service handles initialization
  }
  
  splashState = signal<'visible' | 'fading' | 'hidden'>('visible');
  winkState = signal<'open' | 'wink_left' | 'wink_right' | 'closed'>('open');
  private winkInterval: any;

  ngOnInit() {
    this.startWinkAnimation();

    // Keep splash screen fully visible for 4 seconds
    setTimeout(() => {
      this.splashState.set('fading');
      
      // Remove from DOM after fade animation completes (0.8s)
      setTimeout(() => {
        this.splashState.set('hidden');
        if (this.winkInterval) clearInterval(this.winkInterval);
      }, 800);
    }, 4000);
  }

  ngOnDestroy() {
    if (this.winkInterval) clearInterval(this.winkInterval);
  }

  startWinkAnimation() {
    this.winkInterval = setInterval(() => {
      this.winkState.set('wink_left');
      setTimeout(() => this.winkState.set('open'), 300);
    }, 2500);
  }

  showScrollTopButton = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.scrollY > 300) {
      this.showScrollTopButton.set(true);
    } else {
      this.showScrollTopButton.set(false);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
