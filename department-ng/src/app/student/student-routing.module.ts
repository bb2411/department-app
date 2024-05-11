import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttandanceComponent } from './attandance/attandance.component';
import { PracticalComponent } from './practical/practical.component';

const routes: Routes = [
  {
    path:'',
    component:AttandanceComponent
  },
  {
    path:"attandance",
    component:AttandanceComponent
  },
  {
    path:"practicals",
    component:PracticalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
