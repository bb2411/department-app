import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [
    StudentComponent,
    NavbarComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
