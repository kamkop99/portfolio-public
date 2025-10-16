import { Component, Input } from '@angular/core';
import { AboutItem } from '../../shared/models/about-model';
import { CommonModule } from '@angular/common';
import { AnimateOnVisibleLeft } from '../../shared/directives/animate-on-visible/animate-on-visible-left.directive';
import { AnimateOnVisibleRight } from '../../shared/directives/animate-on-visible/animate-on-visible-right.directive';
import { animations } from '../../shared/models/animations-model';
import { AnimateOnVisibleDown } from '../../shared/directives/animate-on-visible/animate-on-visible-down.directive';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule, AnimateOnVisibleRight, AnimateOnVisibleLeft, AnimateOnVisibleDown, ToastModule, TranslateModule ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
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
