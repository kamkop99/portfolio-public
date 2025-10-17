import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT);

  get current(): Theme {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
  }

  private setAttr(next: Theme) {
    const html = this.doc.documentElement;
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  toggleWithTransition() {
    const doc = this.doc;
    const html = doc.documentElement;
    const cur = (html.getAttribute('data-theme') as Theme) ?? this.current;
    const next: Theme = cur === 'light' ? 'dark' : 'light';

    const startVT =
      (doc.startViewTransition && doc.startViewTransition.bind(doc)) ||
      ((html as any).startViewTransition && (html as any).startViewTransition.bind(html));

    if (!startVT) {
      this.setAttr(next);
      return;
    }

    startVT(() => {
      this.setAttr(next);
    });
  }

  init() {
    this.setAttr(this.current);
  }
}
