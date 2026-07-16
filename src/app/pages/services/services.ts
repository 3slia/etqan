import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { TranslatePipe } from '@ngx-translate/core';
import { DataService, ServiceItem } from '../../services/data.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './services.html',
  styleUrl: './services.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  activeServiceIndex = 0;

  constructor(private seoService: SeoService, private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.seoService.updateSeoTags({
      title: 'خدماتنا',
      description: 'نقدم مجموعة متكاملة من الخدمات البرمجية لتطوير أعمالك، تشمل تصميم مواقع الويب، برمجة تطبيقات الموبايل، والحلول السحابية المتقدمة.',
      url: 'https://etqan-code.com/services'
    });
  }

  get detailedServices(): ServiceItem[] {
    return this.dataService.getServices();
  }

  setActiveService(index: number) {
    this.activeServiceIndex = index;
    this.cdr.markForCheck();
  }
}
