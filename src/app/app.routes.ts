import { Routes } from '@angular/router';
import { About } from './sections/about/about';
import { Experience } from './sections/experience/experience';
import { Projects } from './sections/projects/projects';

export const routes: Routes = [
    { path: 'about', component: About },
    { path: 'experience', component: Experience },
    { path: 'projects', component: Projects }
];
