import { Component, OnInit, Type } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Content } from './content/content';
import { Sidebar } from './sidebar/sidebar';


@Component({
  selector: 'app-root',
  imports: [Content, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  sections: any[] = [];

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
          this.sections = Object.entries(data).map(([id, value]) => {
            return {
                id: id,
                icon: value.icon,
                title: value.title,
                content: value.content,
              }
          });
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
