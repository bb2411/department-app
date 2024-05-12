import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { StorageService } from '../../faculty/controller/storage.service';
import { Practical, Practicallist, PracticalStudent } from '../controller/practical';
import { PracticaldataService } from '../controller/practicaldata.service';
@Component({
  standalone:true,
  selector: 'app-practical',
  templateUrl: './practical.component.html',
  styleUrl: './practical.component.css',
  imports:[MatSelectModule,CommonModule,FormsModule,MatTableModule,MatInputModule,MatButtonModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,]
})
export class PracticalComponent implements OnInit{
  practicalselected:PracticalStudent | undefined;
  imageurl:string | undefined;
  viewimage=false;
  message=''
  filetoupload:File | undefined;
  practicallist:Practicallist[]=[];
  practicaldata:PracticalStudent[]=[];
  displaycolumn=['id','description','faculty','subject','date','status','reply','action'];
  practicalidtosubmit=0;
  userid=0;
  uploadstate=false;
  FileInput(event: any): void {
    this.filetoupload = event.target.files[0];
  }
  ngOnInit(): void {
    this.userid=this.storage.getuserid();
    if(!this.userid){
      this.route.navigate(['auth'])
    }
    this.backend.getpracticaldata(this.userid).subscribe((response:Practical)=>{
      console.log(response);
      this.practicallist=response.practicallist;
      this.practicaldata=response.practicalsubmitted;
    });
  }
  isPracticalSubmitted(practical: Practicallist){
    return this.practicaldata.find(data=>data.practical_id===practical.id);
  }
  isFileValid(): boolean {
    if (!this.filetoupload) {
      return false;
    }
    return true;
  }
  uploadimage(event:any): void {
    console.log(this.filetoupload);
    if(!this.isFileValid()){
      this.message="invalid image";
      return;
    }
    let flag=this.practicaldata.find(i=> i.practical_id===this.practicalidtosubmit);
    if(!flag){
      this.backend.addpracticaldata(this.userid,this.practicalidtosubmit,this.filetoupload).subscribe((response)=>{
        this.message=response.message;
        this.ngOnInit();
        this.upload(this.practicalidtosubmit);
      })  
    }else{
      this.backend.updatepracticaldata(this.userid,this.practicalidtosubmit,this.filetoupload).subscribe((response)=>{
        this.message=response.message;
        this.ngOnInit();
        this.upload(this.practicalidtosubmit);
      })  
    }
  }
  upload(id:any): void {
    this.message='';
    if(this.uploadstate){
      this.practicalidtosubmit=0;
      this.uploadstate=false;
    }else{
      this.viewimage=false;
      this.practicalidtosubmit=id;
      this.uploadstate=true;
    }
  }
  showimage(id:any): void {
    this.message='';
    if(id===this.practicalselected?.practical_id){
      this.practicalselected=this.practicaldata.find(i=>i.practical_id===id);
      console.log(this.practicalselected)
      this.imageurl='data:image/png;base64,'+this.practicalselected?.code_file;
      this.viewimage=false;
      this.practicalselected=undefined;
    }else{
      this.practicalselected=this.practicaldata.find(i=>i.practical_id===id);
      console.log(this.practicalselected)
      this.imageurl='data:image/png;base64,'+this.practicalselected?.code_file;
      this.viewimage=true;
    }
  }
  getstatus(element:any){
    let data=this.practicaldata.find(i=>i.practical_id===element.id);
    return data?.status;
  }
  getreply(element:any){
    let data=this.practicaldata.find(i=>i.practical_id===element.id);
    return data?.reply;

  }
  constructor(private storage:StorageService,private backend:PracticaldataService,private route:Router){}
}
