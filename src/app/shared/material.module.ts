import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

export const materialModules = [
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule
];


@NgModule({
  imports: [...materialModules],
  exports: [...materialModules]
})
export class MaterialModule {}
