import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RouteKeys } from '../../models/route-keys';
import { SharedModule } from '../../shared/shared.module';
import { FigureComponent } from './components/fl-edit/figure.component';
import { EditorApiService } from './services/editor-api.service';
import { EditorComponent } from './components/editor/editor.component';
import { LemmaComponent } from './components/lemma/lemma.component';

const routes: Routes = [
  {
    path: ':projectId/:figureId',
    component: EditorComponent,
    data: { key: RouteKeys.figureEditor }
  },
  {
    path: ':projectId',
    component: EditorComponent,
    data: { key: RouteKeys.figureEditor }
  }
];

@NgModule({
  declarations: [FigureComponent, EditorComponent, LemmaComponent],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule, FormsModule],
  providers: [EditorApiService]
})
export class EditorModule {}
