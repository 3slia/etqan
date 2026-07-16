import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  sender: 'user' | 'bot' | 'system';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private fallbackResponses = [
    'سؤال ممتاز جداً! عشان أقدر أجاوبك بتفاصيل تقنية دقيقة تناسب مشروعك، ممكن تسيبلي رقمك (واتساب) ومهندس متخصص من عندنا هيكلمك فوراً يوضحلك كل حاجة؟',
    'كلام جميل جداً. احنا عندنا حلول برمجية كتير ممكن تناسب الفكرة دي، بس الأفضل إننا نتناقش فيها. سيبلي رقمك 5 دقايق وهتلاقي خبير بيكلمك يفهمك كل التفاصيل.',
    'أنا مساعد آلي ومهمتي أوصلك بأفضل خبير عندنا عشان يجاوبك باحترافية على النقطة دي بالذات. ممكن تسيب رقمك وهنتواصل معاك حالاً؟'
  ];

  async getBotResponse(userMsg: string): Promise<string> {
    if (environment.geminiApiKey === 'YOUR_API_KEY_HERE' || !environment.geminiApiKey) {
      return this.getLocalFallbackResponse(userMsg);
    }

    try {
      const prompt = `أنت مستشار تقني وخبير مبيعات في شركة "إتقان كود" لبرمجة المنصات التعليمية.
هدفك مساعدة العميل، الإجابة على أسئلته بوضوح واحترافية، ثم توجيهه بلطف لترك رقمه للتواصل.
إذا سأل عن المميزات: اشرح حماية الفيديوهات، منع الشير، استيعاب آلاف الطلاب، وسهولة الاستخدام.
رد بلهجة مصرية عملية وذكية (سطرين بالكتير). أجب على سؤاله أولاً، ثم اطلب رقمه.
رسالة العميل: "${userMsg}"`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${environment.geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('API Error or Timeout:', error);
      return this.getLocalFallbackResponse(userMsg);
    }
  }

  private getLocalFallbackResponse(input: string): string {
    const text = input.toLowerCase();
    
    if (text.includes('سعر') || text.includes('بكام') || text.includes('تكلفة') || text.includes('فلوس') || text.includes('عروض')) {
      return 'التكلفة بتعتمد على حجم شغلك، بس الأهم إنه "استثمار" بيحميك من خساير تسريب الفيديوهات وشير الأكونتات. سيبلي رقمك (واتساب) وهتواصل معاك فوراً نحدد باقة تناسب ميزانيتك بالظبط.';
    }

    if (text.includes('مميزات') || text.includes('مزايا') || text.includes('خصائص') || text.includes('تفاصيل') || text.includes('بتعملوا ايه')) {
      return 'أهم مميزاتنا: 1. حماية عسكرية للفيديوهات ضد التحميل. 2. منع شير الأكونتات نهائياً. 3. سيرفرات تتحمل آلاف الطلاب في نفس اللحظة بدون تقطيع. تحب أسجل رقمك ومهندس من عندنا يشرحلك النظام العملي؟';
    }
    
    if (text.includes('سلام') || text.includes('مرحبا') || text.includes('أهلا') || text.includes('مساء') || text.includes('صباح') || text.includes('ازيك')) {
      return 'أهلاً بحضرتك. إحنا في "إتقان كود" بنبني منصات تعليمية قوية ومحمية ضد السرقة. إيه أكبر تحدي بيواجهك حالياً في شغلك الأونلاين وعاوزنا نحلهولك؟';
    }

    if (text.includes('أعمال') || text.includes('شغل') || text.includes('أمثلة') || text.includes('نماذج')) {
      return 'شغلنا بيتكلم عننا؛ عملنا منصات لأسماء كبيرة بتشيل آلاف الطلاب في نفس اللحظة بدون ما تقع. سيبلي رقمك وهبعتلك على الواتساب نماذج حية تدخل تجربها بنفسك.';
    }

    if (text.includes('حماية') || text.includes('تتسرق') || text.includes('تهكير') || text.includes('شير') || text.includes('سرقة') || text.includes('امان')) {
      return 'نقطة قوتنا الأولى! منصتنا بتمنع شير الأكونتات نهائياً بتشفير عسكري للفيديوهات، وتحديد عدد الأجهزة لكل طالب. مجهودك مستحيل يتسرق معانا. تحب نتواصل ونشرحلك النظام العملي؟';
    }

    if (text.includes('وقت') || text.includes('مدة') || text.includes('امتى') || text.includes('هياخد') || text.includes('تسليم')) {
      return 'السرعة مع الجودة مبدأنا. بنسلمك منصتك جاهزة بالكامل في خلال أسبوعين لـ 4 أسابيع بالكتير. الوقت بيضيع أرباح، سيب رقمك ونبدأ فوراً.';
    }

    if (text.includes('تواصل') || text.includes('رقم') || text.includes('تليفون') || text.includes('واتساب') || text.includes('اكلمكم')) {
      return 'أكيد، سيبلي رقم حضرتك هنا ومسئول المبيعات هيكلمك خلال دقايق يجاوب على كل استفساراتك ونبدأ شغل.';
    }
    
    if (text.includes('01') || text.includes('رقمي') || /\\d{8,}/.test(text)) {
      return 'ممتاز، سجلت رقمك بنجاح. خبير من فريقنا هيكلمك في أقرب وقت عشان نبدأ نحول فكرتك لمنصة قوية على أرض الواقع.';
    }

    return this.fallbackResponses[Math.floor(Math.random() * this.fallbackResponses.length)];
  }
}
