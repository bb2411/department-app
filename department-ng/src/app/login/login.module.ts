import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    LoginpageComponent,
    ForgotPasswordComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
