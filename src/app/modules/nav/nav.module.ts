import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../shared/material.module';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class NavModule { }
