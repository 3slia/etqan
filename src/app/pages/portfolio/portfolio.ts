import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { TranslatePipe } from '@ngx-translate/core';
import { DataService, PortfolioCategory } from '../../services/data.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, TranslatePipe, NgOptimizedImage],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {
  
  constructor(private seoService: SeoService, private dataService: DataService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.seoService.updateSeoTags({
      title: 'أعمالنا السابقة',
      description: 'تصفح معرض أعمال إتقان كود وتعرف على المشاريع البرمجية والتطبيقات الناجحة التي أطلقناها لعملائنا.',
      url: 'https://etqan-code.com/portfolio'
    });
  }
  
  get categories(): PortfolioCategory[] {
    return this.dataService.getPortfolioCategories();
  }

  activeFilter: string = 'all';

  get filters() {
    return [
      { id: 'all', title: 'الكل', transPath: 'PORTFOLIO_PAGE.ALL_FILTER' },
      ...this.categories.map(c => ({ id: c.id, transPath: (c as any).transPath }))
    ];
  }

  get allProjects() {
    return this.categories.flatMap(category => 
      category.projects.map(project => ({
        ...project,
        categoryId: category.id, categoryTransPath: category.transPath
      }))
    );
  }

  get filteredProjects() {
    if (this.activeFilter === 'all') {
      return this.allProjects;
    }
    return this.allProjects.filter(p => p.categoryId === this.activeFilter);
  }

  setFilter(filterId: string) {
    this.activeFilter = filterId;
    this.cdr.markForCheck();
  }

  getTechIcon(tech: string): string {
    const techMap: {[key: string]: string} = {
      'Angular': 'angular/angular-original.svg',
      'Node.js': 'nodejs/nodejs-original.svg',
      'MongoDB': 'mongodb/mongodb-original.svg',
      'Flutter': 'flutter/flutter-original.svg',
      'Firebase': 'firebase/firebase-plain.svg',
      'NestJS': 'nestjs/nestjs-original.svg',
      'Next.js': 'nextjs/nextjs-original.svg',
      'React': 'react/react-original.svg',
      'Vue.js': 'vuejs/vuejs-original.svg',
      'Laravel': 'laravel/laravel-original.svg',
      'MySQL': 'mysql/mysql-original.svg',
      'Swift': 'swift/swift-original.svg',
      'Kotlin': 'kotlin/kotlin-original.svg',
      'Python': 'python/python-original.svg',
      'Figma': 'figma/figma-original.svg',
      'PostgreSQL': 'postgresql/postgresql-original.svg',
      'Docker': 'docker/docker-original.svg',
      'TailwindCSS': 'tailwindcss/tailwindcss-original.svg',
      'Socket.io': 'socketio/socketio-original.svg',
      'Stripe': 'stripe/stripe-original.svg'
    };
    
    const iconPath = techMap[tech];
    return iconPath ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconPath}` : '';
  }
}
