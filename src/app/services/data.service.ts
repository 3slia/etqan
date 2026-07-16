import { Injectable } from '@angular/core';

export interface ServiceItem {
  icon: string;
  features?: number[];
}

export interface PortfolioProject {
  id: number;
  transPath?: string;
  techStack?: string[];
  link?: string | null;
  image: string;
  categoryId?: string;
  categoryTransPath?: string;
}

export interface PortfolioCategory {
  id: string;
  transPath: string;
  projects: PortfolioProject[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getServices(): ServiceItem[] {
    return [
      { icon: 'book', features: [1, 2, 3, 4] },
      { icon: 'monitor', features: [1, 2, 3, 4] },
      { icon: 'smartphone', features: [1, 2, 3, 4] },
      { icon: 'pen-tool', features: [1, 2, 3, 4] },
      { icon: 'database', features: [1, 2, 3, 4] },
      { icon: 'zap', features: [1, 2, 3, 4] },
      { icon: 'trending-up', features: [1, 2, 3, 4] },
      { icon: 'shield', features: [1, 2, 3, 4] }
    ];
  }

  getHomeFeatures() {
    return [
      { icon: 'user-check' },
      { icon: 'book-open' },
      { icon: 'server' },
      { icon: 'headphones' }
    ];
  }

  getTestimonials(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  getPortfolioCategories(): PortfolioCategory[] {
    return [
      {
        id: 'education',
        transPath: 'PORTFOLIO_PAGE.CATEGORIES.0',
        projects: [
          {
            id: 1, transPath: 'PORTFOLIO_PAGE.CATEGORIES.0.PROJECTS.0',
            techStack: ['Angular', 'Node.js', 'AWS MediaLive', 'MongoDB'],
            link: 'https://elmobd3-mohamed-samy.com/',
            image: '/assets/images/elmobd3-preview.png'
          },
          {
            id: 11, transPath: 'PORTFOLIO_PAGE.CATEGORIES.0.PROJECTS.1',
            techStack: ['Angular', 'Node.js', 'TailwindCSS', 'MongoDB'],
            link: 'https://www.abdelmaseeh.com/',
            image: '/assets/images/volt-preview.png'
          },
          {
            id: 2, transPath: 'PORTFOLIO_PAGE.CATEGORIES.0.PROJECTS.2',
            techStack: ['Flutter', 'Firebase', 'NestJS'],
            image: '/assets/images/edtech-mockup.png'
          }
        ]
      },
      {
        id: 'web',
        transPath: 'PORTFOLIO_PAGE.CATEGORIES.1',
        projects: [
          {
            id: 3, transPath: 'PORTFOLIO_PAGE.CATEGORIES.1.PROJECTS.0',
            techStack: ['Next.js', 'React', 'Stripe', 'MongoDB'],
            image: '/svc-web.png'
          },
          {
            id: 4, transPath: 'PORTFOLIO_PAGE.CATEGORIES.1.PROJECTS.1',
            techStack: ['Angular', 'TailwindCSS', 'Sanity CMS'],
            image: '/svc-web.png'
          }
        ]
      },
      {
        id: 'mobile',
        transPath: 'PORTFOLIO_PAGE.CATEGORIES.2',
        projects: [
          {
            id: 5, transPath: 'PORTFOLIO_PAGE.CATEGORIES.2.PROJECTS.0',
            techStack: ['Flutter', 'Google Maps API', 'Socket.io'],
            image: '/svc-mobile.png'
          },
          {
            id: 6, transPath: 'PORTFOLIO_PAGE.CATEGORIES.2.PROJECTS.1',
            techStack: ['Swift', 'Kotlin', 'WebRTC'],
            image: '/svc-mobile.png'
          }
        ]
      },
      {
        id: 'erp',
        transPath: 'PORTFOLIO_PAGE.CATEGORIES.3',
        projects: [
          {
            id: 7, transPath: 'PORTFOLIO_PAGE.CATEGORIES.3.PROJECTS.0',
            techStack: ['Angular', 'Node.js', 'PostgreSQL', 'Docker'],
            image: '/svc-erp.png'
          },
          {
            id: 8, transPath: 'PORTFOLIO_PAGE.CATEGORIES.3.PROJECTS.1',
            techStack: ['Vue.js', 'Laravel', 'MySQL'],
            image: '/svc-erp.png'
          }
        ]
      },
      {
        id: 'uiux',
        transPath: 'PORTFOLIO_PAGE.CATEGORIES.4',
        projects: [
          {
            id: 9, transPath: 'PORTFOLIO_PAGE.CATEGORIES.4.PROJECTS.0',
            techStack: ['Figma', 'Adobe XD', 'Prototyping'],
            image: '/hero-devices.png'
          }
        ]
      },
      {
        id: 'ai',
        transPath: 'PORTFOLIO_PAGE.CATEGORIES.5',
        projects: [
          {
            id: 10, transPath: 'PORTFOLIO_PAGE.CATEGORIES.5.PROJECTS.0',
            techStack: ['Python', 'OpenAI API', 'Rasa'],
            image: '/svc-ai.png'
          }
        ]
      }
    ];
  }

  getHomePortfolioProjects(): PortfolioProject[] {
    return [
      { id: 1, image: '/assets/images/elmobd3-preview.png', link: 'https://elmobd3-mohamed-samy.com/' },
      { id: 11, image: '/assets/images/volt-preview.png', link: 'https://www.abdelmaseeh.com/' },
      { id: 3, image: '/svc-mobile.png', link: null },
      { id: 4, image: '/svc-erp.png', link: null },
    ];
  }
}
