import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { SkillsComponent } from './pages/skills/skills';
import { ProjectsComponent } from './pages/projects/projects';
import { ProjectDetailComponent } from './pages/project-detail/project-detail';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'skills', component: SkillsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },

  { path: 'contact', component: Contact }
];
