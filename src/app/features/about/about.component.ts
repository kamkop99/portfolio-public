import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AboutItem } from '../../shared/models/about-model';
import { AnimateOnVisibleDown } from '../../shared/directives/animate-on-visible/animate-on-visible-down.directive';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { AnimateOnVisibleSideDirective } from '../../shared/directives/animate-on-visible/animate-on-visible-side.directive';

@Component({
  selector: 'app-about',
  imports: [AnimateOnVisibleDown, ToastModule, TranslateModule, AnimateOnVisibleSideDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  data = input.required<AboutItem>();
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
