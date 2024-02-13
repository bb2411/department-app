import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../common/auth.service';
import { Auth } from '../../common/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  login(form:any){
    this.auth.login(form.value.userid,form.value.password).subscribe((response:Auth)=>{
      if(response.status==200){
        localStorage.setItem("usertype",response.usertype);
        localStorage.setItem("token",response.token);
        this.route.navigate(['/auth/forgot-password']);
      }else if(response.status==400){
        alert(response.msg);
        this.route.navigate(['auth'])
      }
    });
  }
  constructor(private auth:AuthService,private route:Router){}
}
