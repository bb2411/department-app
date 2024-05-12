import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FacultydataService, res } from '../controller/facultydata.service';
import { GetpracticaldataService } from '../controller/getpracticaldata.service';
import { PracticalService } from '../controller/practical.service';
import { Practicalrecord, Practicalresponse } from '../controller/practicalrecord';
import { Facultyresponse } from '../facultyresponse';
import { StorageService } from './../controller/storage.service';
@Component({
    standalone: true,
    selector: 'app-practicals',
    templateUrl: './practicals.component.html',
    styleUrl: './practicals.component.css',
    imports: [MatSelectModule, CommonModule, FormsModule, MatTableModule, MatInputModule]
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
    this.controller.getdataapi(StorageService.userid).subscribe((response:res)=>{
      this.subjects=response.subjects;
      this.batches=response.batches;
    });
    console.log(FacultydataService.subject);
    console.log("practicals");
    console.log(this.controller.getsubject())
  }
  changepage(whichbtn:String){
    this.message='';
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
    return this.selectedsubject_ !== 'None' && this.selectedbatch_ !== 0 && this.selecteddivision_ !== '';
  }  
  addpractical(){
    this.api.sendpracticaldata(StorageService.userid,this.selectedsubject,this.topic,this.selectedbatch,this.selecteddivision).subscribe((response:Facultyresponse)=>{
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



  //check practical
  selectedstatus='';
  replymessage='';
  showtable=false;
  viewimage=false;
  imageurl:any | undefined;
  selectedbatch_=0;
  selecteddivision_='';
  selectedsubject_='';
  practicalrecord:Practicalrecord[]=[];
  practicalrecord_selected:Practicalrecord | undefined;
  displaycolumn=['practical_id','name','student_id','topic','submit_date','reply','status','action'];
  getpracticalstocheck(){
    this.getpracticals.getpracticals(StorageService.userid,this.selectedsubject_,this.selectedbatch_,this.selecteddivision_).subscribe((res:Practicalresponse)=>{
      console.log(res);
      if(res.status===200){
        this.message='';
        this.showtable=true;
        this.practicalrecord=res.practicalrecord;
      }else{
        this.showtable=false;
        this.practicalrecord=[];
        this.message=res.message;
      }
    })
  }
  viewimagefor(element:Practicalrecord){
    if(this.practicalrecord_selected?.practical_id===element.practical_id && this.practicalrecord_selected?.student_id===element.student_id){
      this.viewimage=false;
      this.practicalrecord_selected=undefined;
    }else{
      this.viewimage=true;
      this.imageurl='data:image/png;base64,'+element.file;
      this.practicalrecord_selected=this.practicalrecord.find(i=> i.student_id===element.student_id && i.practical_id===element.practical_id);
    }
  }
  ispracticalsubmitted(row:Practicalrecord){
    if(row.status==='APPROVED'){
      return true;
    }else{
      return false;
    }
  }
  submitreply(){
    this.api.postreply(StorageService.userid,this.practicalrecord_selected?.practical_id,this.practicalrecord_selected?.student_id,this.replymessage,this.selectedstatus).subscribe((response:Facultyresponse)=>{
      this.message=response.message;
      this.practicalrecord_selected=undefined;
      this.viewimage=false;
    });
  }
  constructor(private controller:FacultydataService,private getpracticals:GetpracticaldataService,private api:PracticalService,private storage:StorageService){}
}
