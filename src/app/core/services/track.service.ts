import { Injectable, signal } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  readonly activeSectionSig = signal<string>('');

  constructor(private location: Location) {}

  setActiveSection(sectionId: string) {
    this.activeSectionSig.set(sectionId);
    const basePath = this.location.path(false);
    this.location.replaceState(`${basePath}#${sectionId}`);
  }
}