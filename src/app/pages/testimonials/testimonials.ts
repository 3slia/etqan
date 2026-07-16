import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent implements OnInit {
  
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateSeoTags({
      title: 'آراء العملاء',
      description: 'اقرأ ما يقوله عملاؤنا عن تجربتهم مع إتقان كود. شهادات نعتز بها من شركاء نجاحنا في مختلف القطاعات.',
      url: 'https://etqan-code.com/testimonials'
    });
  }
  testimonials = [1, 2, 3, 4, 5, 6];


  activeIndex = 0;

  setActive(index: number) {
    this.activeIndex = index;
  }
}
