import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'fl-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(
    public projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.projectService.loadProjects();
  }

}
