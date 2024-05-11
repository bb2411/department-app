import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { StorageService } from '../../faculty/controller/storage.service';
import { Attandance, attandancerow, lecture } from '../controller/attandance';
import { GetstudentdataService } from '../controller/getstudentdata.service';

@Component({
  standalone:true,
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrl: './attandance.component.css',
  imports:[MatSelectModule,CommonModule,FormsModule,MatTableModule,MatInputModule]
})
export class AttandanceComponent implements OnInit {
  displayedcolumn=['id','topic','subject_name','faculty_name','date'];
  userid=0;
  totallecture=0;
  attendedlecture=0;
  selectedsubject='';
  subjects:any[]=[];
  Attandance:attandancerow[]=[];
  lectureall:lecture[]=[]
  Lecture:lecture[]=[]
  data:Attandance | undefined;
  ngOnInit(): void {
    this.userid=this.storage.getuserid();
    if(!this.userid){
      this.route.navigate(["auth"]);
    }
    this.controller.getdata(this.userid).subscribe((response:Attandance)=>{
      console.log(response);
      this.data=response;
      this.Attandance=response.attandance;
      this.lectureall=response.lectures;
      this.Lecture=response.lectures;
      this.totallecture=response.lectures.length;
      this.attendedlecture=response.attandance.length;
      this.subjects=Array.from(new Set(response.lectures.map(i=>i.subject_name)));
    })
  }
  getrow(row:any){
    if(this.Attandance.find(a=> a.id===row.id))  {
      return 'bg-success';
    }else{
      return 'bg-error';
    }
  }
  changedsubject(){
    this.Lecture=this.lectureall.filter(i => i.subject_name===this.selectedsubject);
    this.totallecture=this.Lecture.length;
    const attendedSubject = this.Attandance.filter(attendance => {
      const lecture = this.Lecture.find(l => l.id === attendance.id);
      return lecture !== undefined;
    });
    const uniqueAttended = new Set(attendedSubject.map(attendance => attendance.id));
    this.attendedlecture = uniqueAttended.size;
  }
  constructor(private controller:GetstudentdataService,private storage:StorageService,private route:Router){}
}
