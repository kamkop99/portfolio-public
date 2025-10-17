import { Injectable } from '@angular/core';
import colors from '../../../assets/colors.json';
import { LinguistLanguagesMap, TechColorsMap } from '../../shared/models/tech-colors-model';

@Injectable({
  providedIn: 'root'
})
export class TechColorService {
  private languages = colors as LinguistLanguagesMap;

  private TECH_COLOR_MAP: TechColorsMap = Object.fromEntries(
  Object.entries(this.languages)
    .filter(([, value]) => !!value.color)
    .map(([key, value]) => [key, value.color!])
  );
  getColorForTech(tech: string): string {
    return this.TECH_COLOR_MAP[tech] || '';
  }
}
