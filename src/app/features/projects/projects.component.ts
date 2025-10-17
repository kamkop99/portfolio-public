import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { ProjectItem } from '../../shared/models/projects-model';
import { SplitterModule } from 'primeng/splitter';
import { FieldsetModule } from 'primeng/fieldset';
import { MeterGroupModule } from 'primeng/metergroup';
import { ButtonModule } from 'primeng/button';
import { AnimateOnVisibleLeft } from '../../shared/directives/animate-on-visible/animate-on-visible-left.directive';
import { AnimateOnVisibleRight } from '../../shared/directives/animate-on-visible/animate-on-visible-right.directive';
import { animations } from '../../shared/models/animations-model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { DecimalMeterGroupComponent } from '../../shared/components/decimal-meter-group.component/decimal-meter-group.component';
import { TechColorService } from '../../core/services/tech-color.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, SplitterModule, FieldsetModule, MeterGroupModule, AnimateOnVisibleRight, AnimateOnVisibleLeft, ButtonModule, TranslateModule, DecimalMeterGroupComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: animations
})
export class Projects implements OnDestroy {
  @Input() data: ProjectItem [] = [];
  outerLayout: 'horizontal' | 'vertical' = 'horizontal';
  private sub: Subscription;


  constructor(private bp: BreakpointObserver, private techColorService: TechColorService) {
  this.sub = this.bp
    .observe('(max-width: 1550px)')
    .subscribe(r => {
      this.outerLayout = r.matches ? 'vertical' : 'horizontal';
    });
  }

  private getColorForTech(tech: string): string {
    return this.techColorService.getColorForTech(tech);
  }

  toMeterItems(techInfo: Record<string, string>) {
    const list = Object.entries(techInfo).map(([label, s]) => ({
      label,
      value: parseFloat(s),
      color: this.getColorForTech(label)
    }));

    const sum = list.reduce((a, b) => a + (isFinite(b.value) ? b.value : 0), 0);
    if (Math.abs(sum - 100) < 0.05) {
      return list.map(i => ({ ...i, value: Math.round(i.value * 10) / 10 }));
    }

    const norm = list.map(i => ({ ...i, value: (i.value / (sum || 1)) * 100 }));
    const rounded = norm.map(i => ({ ...i, value: Math.round(i.value * 10) / 10 }));
    const total = rounded.reduce((s, i) => s + i.value, 0);
    const diff = Math.round((100 - total) * 10) / 10;
    if (Math.abs(diff) >= 0.1) {
      const idxMax = rounded.reduce((imax, it, idx, arr) => (it.value > arr[imax].value ? idx : imax), 0);
      rounded[idxMax].value = Math.round((rounded[idxMax].value + diff) * 10) / 10;
    }
    return rounded;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
