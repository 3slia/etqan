import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.css'
})
export class ChatWidgetComponent implements AfterViewChecked, OnInit {
  @ViewChild('chatBody') private chatBody!: ElementRef;
  
  isOpen = false;
  messages: Array<{sender: string, text: string}> = [
    { sender: 'bot', text: 'أهلاً بك! 👋 فريق إتقان كود يرحب بك. إزاي نقدر نساعدك في إطلاق منصتك التعليمية اليوم؟' }
  ];
  userInput = '';
  isTyping = false;
  unreadCount = 0;
  sessionTimer: any;
  isSessionActive = true;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    const saved = localStorage.getItem('etqan_chat_history');
    if (saved) {
      try {
        this.messages = JSON.parse(saved);
        if (this.messages.length > 0 && this.messages[this.messages.length - 1].sender === 'system') {
          this.isSessionActive = false;
        } else {
          this.resetSessionTimer();
        }
      } catch(e) {}
    } else {
      this.resetSessionTimer();
    }
  }

  saveMessages() {
    localStorage.setItem('etqan_chat_history', JSON.stringify(this.messages));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadCount = 0;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  restartSession() {
    this.messages = [
      { sender: 'bot', text: 'أهلاً بك! 👋 فريق إتقان كود يرحب بك. إزاي نقدر نساعدك في إطلاق منصتك التعليمية اليوم؟' }
    ];
    this.isSessionActive = true;
    this.saveMessages();
    this.resetSessionTimer();
  }

  closeAndClearChat() {
    this.isOpen = false;
    this.restartSession();
  }

  scrollToBottom(): void {
    try {
      if (this.chatBody && this.isOpen) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }

  resetSessionTimer() {
    if (!this.isSessionActive) return;
    if (this.sessionTimer) clearTimeout(this.sessionTimer);
    
    this.sessionTimer = setTimeout(() => {
      this.endSession();
    }, 3 * 60 * 1000);
  }

  endSession() {
    this.isSessionActive = false;
    this.messages.push({ sender: 'system', text: 'تم إنهاء الجلسة لعدم التفاعل لمدة 3 دقائق.' });
    this.saveMessages();
    this.scrollToBottom();
  }

  onBotReply(botText: string) {
    this.messages.push({ sender: 'bot', text: botText });
    this.saveMessages();
    this.resetSessionTimer();

    const audio = new Audio('https://actions.google.com/sounds/v1/ui/message_notification.ogg');
    audio.play().catch(e => console.log('Audio blocked by browser policy:', e));

    if (!this.isOpen) {
      this.unreadCount++;
    } else {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  async sendMessage() {
    if (!this.userInput.trim() || !this.isSessionActive) return;
    
    const userMsg = this.userInput;
    this.messages.push({ sender: 'user', text: userMsg });
    this.userInput = '';
    this.isTyping = true;
    this.saveMessages();
    this.resetSessionTimer();

    const botText = await this.chatService.getBotResponse(userMsg);
    this.isTyping = false;
    this.onBotReply(botText);
  }
}
