import { Component, Input } from '@angular/core';
import { AboutItem } from './about-model';
import { CommonModule } from '@angular/common';
import { AnimateOnVisibleLeft } from '../../animations/left/animate-on-visible-left';
import { AnimateOnVisibleRight } from '../../animations/right/animate-on-visible-right';
import { animations } from '../../animations/animations-model';
import { AnimateOnVisibleDown } from '../../animations/down/animate-on-visible-down';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule, AnimateOnVisibleRight, AnimateOnVisibleLeft, AnimateOnVisibleDown, ToastModule, TranslateModule ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  providers: [MessageService],
  animations: animations
})
export class About {
  @Input() data!: AboutItem;
  displayDialog: boolean = false;

  constructor(private messageService: MessageService) {}

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
    this.messageService.add({
      severity: 'success',
      summary: 'Copied!',
      detail: `Discord tag "${text}" copied to clipboard.`,
      life: 1000
    });
  });
}
}
