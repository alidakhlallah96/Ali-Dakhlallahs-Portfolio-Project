import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjectsService } from '../../app/services/projects';
import { Project } from '../../app/models/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent {

  projects: Project[] = [];

  constructor(
    private service: ProjectsService,
    private router: Router
  ) {
    this.projects = this.service.getProjects();
  }

  openProject(id: number) {
    this.router.navigate(['/projects', id]);
  }
}
