import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { ProjectItem } from '../../shared/models/projects-model';
import { SplitterModule } from 'primeng/splitter';
import { FieldsetModule } from 'primeng/fieldset';
import { MeterGroupModule } from 'primeng/metergroup';
import { ButtonModule } from 'primeng/button';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslateModule } from '@ngx-translate/core';
import { DecimalMeterGroupComponent } from '../../shared/components/decimal-meter-group.component/decimal-meter-group.component';
import { TechColorService } from '../../core/services/tech-color.service';
import { AnimateOnVisibleSideDirective } from '../../shared/directives/animate-on-visible/animate-on-visible-side.directive';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-projects',
  imports: [SplitterModule, FieldsetModule, MeterGroupModule, ButtonModule, TranslateModule, DecimalMeterGroupComponent, AnimateOnVisibleSideDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects {
  readonly data = input<ProjectItem[]>([]);

  private readonly bp = inject(BreakpointObserver);
  private readonly techColorService = inject(TechColorService);

  private static readonly QUERY = '(max-width: 1550px)';

  private readonly isNarrow = toSignal(
    this.bp.observe([Projects.QUERY]),
    {
      initialValue: {
        matches: false,
        breakpoints: { [Projects.QUERY]: false },
      },
    }
  );

  readonly outerLayout = computed<'horizontal' | 'vertical'>(
    () => (this.isNarrow().matches ? 'vertical' : 'horizontal')
  );

  readonly renderSplitter = signal(true);


  constructor() {
    let last: 'horizontal' | 'vertical' | null = null;
    effect(() => {
      const cur = this.outerLayout();
      if (cur !== last) {
        last = cur;
        this.renderSplitter.set(false);
        queueMicrotask(() => this.renderSplitter.set(true));
      }
    });
  }

  private getColorForTech(tech: string): string {
    return this.techColorService.getColorForTech(tech);
  }

  toMeterItems(techInfo: Record<string, string>) {
    const list = Object.entries(techInfo).map(([label, s]) => ({
      label,
      value: Number.parseFloat(s),
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
}
