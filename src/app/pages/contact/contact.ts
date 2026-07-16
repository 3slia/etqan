import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../services/seo.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateSeoTags({
      title: 'اتصل بنا',
      description: 'تواصل مع إتقان كود لطلب عرض سعر أو الاستفسار عن خدماتنا البرمجية. فريقنا متواجد لخدمتك ومساعدتك في مشروعك القادم.',
      url: 'https://etqan-code.com/contact'
    });
  }
  formData = {
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceType: '',
    projectDetails: ''
  };

  isLoading = false;
  statusMessage = '';
  isSuccess = false;

  async onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.statusMessage = '';

    try {
      const response = await fetch('https://ais-dev-eznrx5rqx72xlim6csrk5q-302505248692.europe-west2.run.app/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        this.isSuccess = true;
        this.statusMessage = result.message || 'تم إرسال طلبك بنجاح!';
        this.formData = {
          fullName: '', companyName: '', email: '', phone: '', serviceType: '', projectDetails: ''
        };
      } else {
        this.isSuccess = false;
        this.statusMessage = result.error || 'حدث خطأ أثناء الإرسال.';
      }
    } catch (error) {
      console.error('Submission error:', error);
      this.isSuccess = false;
      this.statusMessage = 'تعذر الاتصال بالخادم. يرجى التأكد من تشغيل الخدمة.';
    } finally {
      this.isLoading = false;
    }
  }
}
