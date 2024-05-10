import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AttandanceComponent } from './attandance/attandance.component';
import { PracticalComponent } from './practical/practical.component';


@NgModule({
  declarations: [
    StudentComponent,
    NavbarComponent,
    AttandanceComponent,
    PracticalComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
