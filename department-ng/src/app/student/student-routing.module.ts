import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validateGuard } from '../common/validate.guard';
import { AttandanceComponent } from './attandance/attandance.component';
import { PracticalComponent } from './practical/practical.component';

const routes: Routes = [
  {
    path:'',
    canActivate:[validateGuard],
    component:AttandanceComponent
  },
  {
    path:"attandance",
    canActivate:[validateGuard],
    component:AttandanceComponent
  },
  {
    path:"practicals",
    canActivate:[validateGuard],
    component:PracticalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
