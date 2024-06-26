import { Component, OnInit } from '@angular/core';
import { FacultydataService } from '../controller/facultydata.service';
import { StorageService } from '../controller/storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  message='';
  data:Facultydata | undefined;
  ngOnInit(): void {
    this.source.getaccount(StorageService.userid).subscribe((response:Facultydata)=>{
      if(response.status!==400){
        this.data=response;
      }else{
        this.message=response.message;
      }
      console.log(this.data,response);
    })
  }
  constructor(private source:FacultydataService){}
}
export interface Facultydata{
  name:string;
  id:string;
  email:string;
  post:string;
  department:string;
  education:string;
  personal_number:string;
  message:string;
  status:number;
}

