import { Component, Input, Type, ElementRef, ViewChildren, QueryList}  from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../experience/experience.component';
import { animations } from '../../shared/models/animations-model';
import { AnimateOnVisibleDown } from '../../shared/directives/animate-on-visible/animate-on-visible-down.directive';
import { Projects } from '../projects/projects.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { TrackSection } from '../../shared/directives/track-section/track-section.directive';
import { About } from '../about/about.component';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  imports: [CommonModule, AnimateOnVisibleDown, TrackSection, RouterModule],
  animations: animations
})
export class Content implements OnInit {
  @Input() sections: any[] = [];
  private currentFragment: string | null = null;

  componentMap: { [key: string]: Type<any> } = {
    about: About,
    experience: Experience,
    projects: Projects
  };

  @ViewChildren('section') sectionElements!: QueryList<ElementRef>;

  constructor(private route: ActivatedRoute) {}

  getComponent(componentId: string): Type<any> | null {
    return this.componentMap[componentId] || null;
  }
  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      this.currentFragment = fragment;
      this.scrollToFragment();
    });
  }

  ngAfterViewInit() {
    this.sectionElements.changes.subscribe(() => {
      this.scrollToFragment();
    });
  }

  private scrollToFragment(): void {
    if (!this.currentFragment || !this.sectionElements?.length) return;
    
    const element = this.sectionElements.toArray().find(
      el => el.nativeElement.id === this.currentFragment
    );
    element?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
