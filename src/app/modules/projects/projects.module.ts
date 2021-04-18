import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RouteKeys } from '../../models/route-keys';
import { MaterialModule } from '../../shared/material.module';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project/project.component';

const routes: Route[] = [
  { path: '', pathMatch: 'full', component: ProjectListComponent },
  { path: ':id', component: ProjectComponent, data: { key: RouteKeys.projectList } }
];

@NgModule({
  declarations: [ProjectListComponent, ProjectCardComponent, ProjectComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule]
})
export class ProjectsModule {}
