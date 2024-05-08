import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FacultydataService } from '../controller/facultydata.service';
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
    this.controller.getdataapi(this.userid);
    this.subjects=this.controller.getsubject();
    this.batches=this.controller.getbatch();
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
  constructor(private controller:FacultydataService){}
}
