import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';


import { ProjectsComponent } from './app/pages/projects/projects';

const routes: Routes = [


  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./app/pages/home/home')
        .then(m => m.Home)
  },


  {
    path: 'about',
    loadComponent: () =>
      import('./app/pages/about/about')
        .then(m => m.About)
  },

  // PROJECT LIST PAGE (EAGER LOADED)
  {
    path: 'projects',
    component: ProjectsComponent
  },


  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./app/pages/project-detail/project-detail')
        .then(m => m.ProjectDetailComponent)
  },

  {
    path: 'skills',
    loadComponent: () =>
      import('./app/pages/skills/skills')
        .then(m => m.SkillsComponent)
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./app/pages/contact/contact')
        .then(m => m.Contact)
  },

  {
    path: '**',
    redirectTo: '/home'
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
  ]
});
