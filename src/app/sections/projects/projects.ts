import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { ProjectItem } from './projects-model';
import { SplitterModule } from 'primeng/splitter';
import { FieldsetModule } from 'primeng/fieldset';
import { MeterGroupModule } from 'primeng/metergroup';
import { ButtonModule } from 'primeng/button';
import { AnimateOnVisibleLeft } from '../../animations/left/animate-on-visible-left';
import { AnimateOnVisibleRight } from '../../animations/right/animate-on-visible-right';
import { animations } from '../../animations/animations-model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

const techPalette: { [key: string]: string } = {
  TypeScript: "#3178C6",
  SCSS: "#CD6799",
  HTML: "#E34C26"
};
@Component({
  selector: 'app-projects',
  imports: [CommonModule, SplitterModule, FieldsetModule, MeterGroupModule, AnimateOnVisibleRight, AnimateOnVisibleLeft, ButtonModule, TranslateModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  animations: animations
})
export class Projects implements OnDestroy {
  @Input() data: ProjectItem [] = [];
  outerLayout: 'horizontal' | 'vertical' = 'horizontal';
  private sub: Subscription;


  constructor(private bp: BreakpointObserver) {
  this.sub = this.bp
    .observe('(max-width: 1550px)')
    .subscribe(r => {
      this.outerLayout = r.matches ? 'vertical' : 'horizontal';
    });
  }

  private getColorForTech(tech: string): string {
    return techPalette[tech];
  }

  public getTechValues(techStack: Record<string, string>) {
    return Object.entries(techStack).map(([label, val]) => ({
        label,
        value: Number(val),
        color: this.getColorForTech(label)
      }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
