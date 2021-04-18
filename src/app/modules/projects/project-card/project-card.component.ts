import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../models/project.models';

@Component({
  selector: 'fl-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
