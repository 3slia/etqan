import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslatePipe, NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, AfterViewInit {
  currentLang$: Observable<string>;

  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object, private seoService: SeoService, private translate: TranslateService) {
    this.currentLang$ = this.translate.onLangChange.pipe(
      map(event => event.lang),
      startWith(this.translate.currentLang() || this.translate.getFallbackLang() || 'ar')
    );
  }

  ngOnInit() {
    this.seoService.updateSeoTags({
      title: 'من نحن',
      description: 'تعرف على قصة إتقان كود، رؤيتنا، مهمتنا، وقيمنا في تقديم أفضل الحلول البرمجية وتطوير المواقع وتطبيقات الجوال بجودة عالمية.',
      url: 'https://etqan-code.com/about'
    });
  }

  ngAfterViewInit() {
    // Minimalist layout: No complex animations needed.
  }
}
