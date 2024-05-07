import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginpageComponent } from './loginpage/loginpage.component';

const routes: Routes = [
  {
    path:"",
    component:LoginpageComponent
  },
  {
    path:"forgot-password",
    component:ForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
