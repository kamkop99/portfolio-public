import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type DecimalMeterItem = {
  label: string;
  value: number;
  color?: string;
};

@Component({
  selector: 'app-decimal-meter-group',
  standalone: true,
  imports: [],
  templateUrl: './decimal-meter-group.component.html',
  styleUrls: ['./decimal-meter-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecimalMeterGroupComponent {
  readonly items = input<DecimalMeterItem[]>([]);
  readonly max = input(100);
  readonly decimals = input<0 | 1 | 2>(1);

  fmt(n: number): string {
    return n.toFixed(this.decimals());
  }

  widthFor(n: number): number {
    return (n / this.max()) * 100;
  }
}