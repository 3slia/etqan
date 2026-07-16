import { Component, OnInit, ElementRef, ViewChildren, QueryList, HostListener, Inject, PLATFORM_ID, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { TranslatePipe } from '@ngx-translate/core';
import { DataService, ServiceItem, PortfolioProject } from '../../services/data.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('featureCard') featureCards!: QueryList<ElementRef>;
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef>;

  constructor(
    private seoService: SeoService, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService,
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  get currentLang() {
    return this.languageService.currentLanguage;
  }

  ngOnInit() {
    this.seoService.updateSeoTags({
      title: 'الرئيسية',
      description: 'شركة إتقان كود للبرمجيات وتطوير مواقع الويب وتطبيقات الجوال. نقدم أفضل الحلول التقنية لتنمية أعمالك.',
      url: 'https://etqan-code.com/'
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.checkScroll(), 100);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
    }
  }

  checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    this.featureCards?.forEach((card) => {
      const cardTop = card.nativeElement.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.nativeElement.classList.add('show');
      }
    });

    this.serviceCards?.forEach((card) => {
      const cardTop = card.nativeElement.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.nativeElement.classList.add('show');
      }
    });
    
    this.cdr.detectChanges();
  }

  get features() {
    return this.dataService.getHomeFeatures();
  }

  get services(): ServiceItem[] {
    return this.dataService.getServices();
  }

  get portfolio(): PortfolioProject[] {
    return this.dataService.getHomePortfolioProjects();
  }

  activeProjectIndex = 0;

  get testimonials(): number[] {
    return this.dataService.getTestimonials(3);
  }

  activeTestimonialIndex = 0;

  nextTestimonial() {
    if (this.activeTestimonialIndex < this.testimonials.length - 1) {
      this.activeTestimonialIndex++;
    } else {
      this.activeTestimonialIndex = 0;
    }
    this.cdr.markForCheck();
  }

  prevTestimonial() {
    if (this.activeTestimonialIndex > 0) {
      this.activeTestimonialIndex--;
    } else {
      this.activeTestimonialIndex = this.testimonials.length - 1;
    }
    this.cdr.markForCheck();
  }
}
