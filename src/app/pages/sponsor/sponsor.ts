import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sponsor',
  standalone: true,
  imports: [CommonModule, TranslatePipe, NgOptimizedImage],
  templateUrl: './sponsor.html',
  styleUrl: './sponsor.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorComponent {
}
