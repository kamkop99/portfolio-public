import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export type DecimalMeterItem = {
  label: string;
  value: number;
  color?: string;
};

@Component({
  selector: 'app-decimal-meter-group',
  templateUrl: './decimal-meter-group.component.html',
  imports: [CommonModule],
  styleUrls: ['./decimal-meter-group.component.scss']
})
export class DecimalMeterGroupComponent {
  @Input() items: DecimalMeterItem[] = [];
  @Input() max = 100;
  @Input() decimals: 0 | 1 | 2 = 1;

  fmt(n: number): string {
    return n.toFixed(this.decimals);
  }

  widthFor(n: number): string {
    const w = (n / this.max) * 100;
    return `${w}%`;
  }

  trackByLabel = (_: number, it: DecimalMeterItem) => it.label;
}
