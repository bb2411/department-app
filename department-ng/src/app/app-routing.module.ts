import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validateGuard } from './common/validate.guard';
import { FacultyComponent } from './faculty/faculty.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:"faculty",
    canActivate:[validateGuard],
    component:FacultyComponent,
    loadChildren:()=>import("./faculty/faculty.module").then(m=>m.FacultyModule)
  },
  {
    path:"student",
    canActivate:[validateGuard],
    component:StudentComponent,
    loadChildren:()=>import("./student/student.module").then(m=>m.StudentModule)
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

