import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  private projectService = inject(ProjectService);

  projects: any[] = [];

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((response) => {
      console.log(response);
      this.projects = response.data;
      console.log(this.projects);
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
