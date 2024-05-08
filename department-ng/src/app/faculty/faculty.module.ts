import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { DashboardFacultyComponent } from './dashboard-faculty/dashboard-faculty.component';
import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultyComponent } from './faculty.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { ResultsComponent } from './results/results.component';
@NgModule({
  declarations: [
    DashboardFacultyComponent,
    NavbarComponent,
    ResultsComponent,
    AccountComponent,
    NoticeBoardComponent,
    FacultyComponent,
    FooterComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    FacultyRoutingModule,
    RouterModule
  ],
  exports:[RouterModule]
})
export class FacultyModule { }
