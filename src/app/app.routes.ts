import { Routes } from '@angular/router';
import { Experience } from './features/experience/experience.component';
import { Projects } from './features/projects/projects.component';
import { About } from './features/about/about.component';

export const routes: Routes = [
    { path: 'about', component: About },
    { path: 'experience', component: Experience },
    { path: 'projects', component: Projects }
];
