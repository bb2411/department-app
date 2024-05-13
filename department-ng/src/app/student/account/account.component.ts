import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../faculty/controller/storage.service';
import { GetstudentdataService } from './../controller/getstudentdata.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  message='';
  data:Studentdata | undefined;
  ngOnInit(): void {
    this.source.getaccount(StorageService.userid).subscribe((response:Studentdata)=>{
      if(response.status!==400){
        this.data=response;
      }else{
        this.message=response.message;
      }
      console.log(this.data,response);
    })
  }
  constructor(private source:GetstudentdataService){}
}
export interface Studentdata{
  name:string;
  id:string;
  email:string;
  course:string;
  sem_id:string;
  division:string;
  father_number:string;
  mother_number:string;
  personal_number:string;
  message:string;
  status:number;
}
