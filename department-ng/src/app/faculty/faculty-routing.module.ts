import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AttandanceComponent } from './attandance/attandance.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { PracticalsComponent } from './practicals/practicals.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path:"",
    component:NavbarComponent
  },
  {
    path:"notice-board",
    component:NoticeBoardComponent
  },
  {
    path:"attandance",
    component:AttandanceComponent
  },
  {
    path:"practicals",
    component:PracticalsComponent
  },
  {
    path:"results",
    component:ResultsComponent
  },
  {
    path:"accounts",
    component:AccountComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FacultyRoutingModule { }
