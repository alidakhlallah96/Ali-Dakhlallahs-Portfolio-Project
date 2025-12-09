import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjectsService } from '../../app/services/projects';
import { Project } from '../../app/models/project';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.css']
})
export class ProjectDetailComponent implements OnInit {

  projectList: Project[] = [];
  project: Project | undefined;
  currentIndex: number = 0;

  constructor(
    private service: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectList = this.service.getProjects();

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.currentIndex = this.projectList.findIndex(p => p.id === id);
      this.project = this.projectList[this.currentIndex];
    });
  }

  goBackward(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const previousId = this.projectList[this.currentIndex].id;
      this.router.navigate(['/projects', previousId]);
    }
  }

  goForward(): void {
    if (this.currentIndex < this.projectList.length - 1) {
      this.currentIndex++;
      const nextId = this.projectList[this.currentIndex].id;
      this.router.navigate(['/projects', nextId]);
    }
  }
  goBackToList(): void {
    this.router.navigate(['/projects']);
  }

  }

