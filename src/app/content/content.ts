import { Component, Input, Type, ElementRef, ViewChildren, QueryList}  from '@angular/core';
import { CommonModule } from '@angular/common';
import { About } from '../sections/about/about';
import { Experience } from '../sections/experience/experience';
import { animations } from '../animations/animations-model';
import { AnimateOnVisibleDown } from '../animations/down/animate-on-visible-down';
import { Projects } from '../sections/projects/projects';
import { TrackSection } from '../track/track-section';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-content',
  templateUrl: './content.html',
  styleUrl: './content.scss',
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
