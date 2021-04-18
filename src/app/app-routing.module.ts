import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // component: HomeComponent
    redirectTo: 'projects'
  },
  {
    path: 'projects',
    loadChildren: () => import('./modules/projects/projects.module').then((m) => m.ProjectsModule)
  },
  // {
  //   // path: 'figures',
  //   // loadChildren: () => import('./editor/editor.module').then((m) => m.EditorModule)
  // },
  {
    path: 'editor',
    loadChildren: () => import('./modules/editor/editor.module').then((m) => m.EditorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
