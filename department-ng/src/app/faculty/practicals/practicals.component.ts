import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FacultydataService } from '../controller/facultydata.service';
import { PracticalService } from '../controller/practical.service';
import { StorageService } from '../controller/storage.service';
import { Facultyresponse } from '../facultyresponse';
@Component({
  standalone:true,
  selector: 'app-practicals',
  templateUrl: './practicals.component.html',
  styleUrl: './practicals.component.css',
  imports:[MatSelectModule,CommonModule,FormsModule,MatTableModule,MatInputModule]
})
export class PracticalsComponent implements OnInit{
  selecteddivision=''
  selectedbatch=0
  selectedsubject=''
  subjects:any=[]
  batches=[]
  topic='';
  message='';
  state=true;
  userid:any
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.userid = localStorage.getItem("userid");
    }
    let state=this.controller.getdataapi(this.storage.getuserid());
    if(state){
      this.subjects=this.controller.getsubject();
      this.batches=this.controller.getbatch();
    }
    console.log(this.controller.getsubject())
  }
  changepage(whichbtn:String){
    if(whichbtn=="btn1"){
      this.state=false;
    }else{
      this.state=true;
    }
  }
  areSelectionsMade(): boolean {
    return this.selectedsubject !== 'None' && this.selectedbatch !== 0 && this.selecteddivision !== '';
  }  
  areSelectionsMade2(): boolean {
    return this.selectedsubject !== 'None' && this.selectedbatch !== 0;
  }  
  addpractical(){
    this.api.sendpracticaldata(this.userid,this.selectedsubject,this.topic,this.selectedbatch,this.selecteddivision).subscribe((response:Facultyresponse)=>{
      if(response.status==200){
        this.message=response.message+",practical id is :"+response.data;
        this.selectedbatch=0;
        this.selecteddivision='';
        this.topic='';
        this.selectedsubject='';
      }else{
        this.message="Something Went Wrong";
      }
    });

  } 
  constructor(private controller:FacultydataService,private api:PracticalService,private storage:StorageService){
    let state=this.controller.getdataapi(this.storage.getuserid());
    if(state){
      this.subjects=this.controller.getsubject();
      this.batches=this.controller.getbatch();
    }
    console.log(this.controller.getsubject());
  }
}
