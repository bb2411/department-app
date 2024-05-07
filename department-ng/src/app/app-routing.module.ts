import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyComponent } from './faculty/faculty.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:"faculty",
    component:FacultyComponent,
    loadChildren:()=>import("./faculty/faculty.module").then(m=>m.FacultyModule)
  },
  {
    path:'auth',
    loadChildren:()=>import("./login/login.module").then(m=>m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

