import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../common/auth';
import { AuthService } from '../../common/auth.service';
import { FacultydataService } from '../../faculty/controller/facultydata.service';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {

  responsemessage='';
  login(form:any){
    this.auth.login(form.value.userid,form.value.password).subscribe((response:Auth)=>{
      if(response.status==200){
        localStorage.setItem("userid",response.userid);
        localStorage.setItem("usertype",response.usertype);
        localStorage.setItem("token",response.token);
        let usertype:String=response.usertype;
        if(usertype=="admin"){
          return;
        }else if(usertype=="faculty"){
          FacultydataService.userid=response.userid;
          this.route.navigate(["faculty"])
        }else if(usertype=="student"){
          return;
        }
      }else if(response.status==400){
        this.responsemessage=response.msg;
        this.route.navigate(['auth'])
      }else{
        this.responsemessage=response.msg;
      }
    });
  }
  constructor(private auth:AuthService,private route:Router,private fd:FacultydataService){}
}