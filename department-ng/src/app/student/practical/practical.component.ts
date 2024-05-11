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
  message=''
  filetoupload:File | undefined;
  practicallist:Practicallist[]=[];
  practicaldata:PracticalStudent[]=[];
  displaycolumn=['id','description','faculty','subject','date','action'];
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
    return this.practicaldata.some(data=>data.practical_id===practical.id);
  }
  isFileValid(): boolean {
    if (!this.filetoupload) {
      return false;
    }
    return true;
  }
  uploadimage(event:any): void {
    console.log(event);
    console.log(this.filetoupload);
    if(!this.isFileValid()){
      this.message="invalid image";
      return;
    }
    this.backend.addpracticaldata(this.userid,this.practicalidtosubmit,this.filetoupload).subscribe((response)=>{
      this.message=response.message;
      this.ngOnInit();
    })  
  }
  upload(id:any): void {
    if(this.uploadstate){
      this.practicalidtosubmit=0;
      this.uploadstate=false;
    }else{
      this.practicalidtosubmit=id;
      this.uploadstate=true;
    }
  }
  constructor(private storage:StorageService,private backend:PracticaldataService,private route:Router){}
}
