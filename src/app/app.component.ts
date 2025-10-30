import { ChangeDetectionStrategy, Component, OnInit, signal, Type } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Content } from './features/content/content.component';
import { Navbar } from './layout/navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [Content, Navbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  sections = signal<any>([]);

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.setDefaultLang('pl');
    this.loadSections();
    this.translate.onLangChange.subscribe(() => {
      this.loadSections();
    });
  }

  private loadSections() {
    this.translate
      .get('sections')
      .subscribe(
        (data: Record<string, { title: string; icon: string; content: unknown }>) => {
          this.sections.set(Object.entries(data).map(([id, value]) => {
            return {
                id: id,
                icon: value.icon,
                title: value.title,
                content: value.content,
              }
          }));
        },
        (error: any) => {
          console.error('Error loading translations:', error);
        }
    );
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
