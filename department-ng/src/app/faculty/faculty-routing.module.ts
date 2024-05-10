import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validateGuard } from './../common/validate.guard';
import { AccountComponent } from './account/account.component';
import { AttandanceComponent } from './attandance/attandance.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { PracticalsComponent } from './practicals/practicals.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path:"notice-board",
    component:NoticeBoardComponent
  },
  {
    path:"attandance",
    canActivate:[validateGuard],
    component:AttandanceComponent
  },
  {
    path:"practicals",
    canActivate:[validateGuard],
    component:PracticalsComponent
  },
  {
    path:"results",
    canActivate:[validateGuard],
    component:ResultsComponent
  },
  {
    path:"accounts",
    canActivate:[validateGuard],
    component:AccountComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FacultyRoutingModule { }
