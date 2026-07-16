import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) { }

  updateSeoTags(config: { title: string, description: string, image?: string, url?: string }) {
    // 1. Update Title
    this.title.setTitle(`${config.title} | إتقان كود`);

    // 2. Update Meta Description
    this.meta.updateTag({ name: 'description', content: config.description });

    // 3. Update Open Graph (Facebook/LinkedIn)
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }
    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
    }

    // 4. Update Twitter Cards
    this.meta.updateTag({ property: 'twitter:title', content: config.title });
    this.meta.updateTag({ property: 'twitter:description', content: config.description });
    if (config.image) {
      this.meta.updateTag({ property: 'twitter:image', content: config.image });
    }
  }
}
