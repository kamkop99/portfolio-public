import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private activeSectionSource = new BehaviorSubject<string>('');
  activeSection$: Observable<string> = this.activeSectionSource.asObservable();

  constructor(private location: Location) {}

  setActiveSection(sectionId: string) {
    this.activeSectionSource.next(sectionId);
    const basePath = this.location.path(false); 
    this.location.replaceState(`${basePath}#${sectionId}`);
  }
}