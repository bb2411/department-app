import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { GetAttandanceDataService } from '../controller/get-attandance-data.service';
import { Facultyresponse } from '../facultyresponse';
import { lecturedata, Lectures } from '../lectures';
import { Faculty, student } from './../faculty';
@Component({
  standalone:true,
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrl: './attandance.component.css',
  imports:[MatSelectModule,CommonModule,FormsModule,MatTableModule,MatInputModule]
})
export class AttandanceComponent implements OnInit {
    message="";
    topic="";
    displaytable=false;
    attandancelist=new Set<number>();
    displayedColumns:string[]=["id","name","fathernumber"]
    selectedsubject="None";
    selectdivison="";
    selectbatch=0;
    state=true;
    userid:any | undefined;
    protected student:student[]=[];
    protected data:Faculty[]=[];
    changepage(whichbtn:String){
      if(whichbtn=="btn1"){
        this.state=false;
        this.message='';
        this.student=[];
        this.selectbatch=0;
        this.selectdivison='';
        this.topic='';
        this.displaytable=false;
        this.selectedsubject='';
      }else{
        this.state=true;
        this.message='';
        this.student=[];
        this.selectbatch=0;
        this.selectdivison='B';
        this.topic='';
        this.displaytable=false;
        this.selectedsubject='';
      }
      this.getdata();
    }
    ngOnInit(): void {
      if (typeof localStorage !== 'undefined') {
        this.userid = localStorage.getItem("userid");
      }
      this.getdata();
    }    
    getdata(){
      this.controller.get_attandane_data(this.userid).subscribe((response:Faculty)=>{
        this.data.push(response);
      })
    }
    displayvalidstudent(){
      this.student=[];
      this.data[0].students.forEach(element => {
        if(element.semid==this.selectbatch && element.division==this.selectdivison){
          this.student.push(element);
        }
      });
      if(this.student.length<=0){
        this.message="No Student Found";
      }else{
        this.displaytable=true;
      }
    }
    areSelectionsMade(): boolean {
      return this.selectedsubject !== 'None' && this.selectbatch !== 0 && this.selectdivison !== '';
    }  
    areSelectionsMade2(): boolean {
      return this.selectedsubject !== 'None' && this.selectbatch !== 0;
    }   
    addtoattandance(id:any){
      if(this.attandancelist.has(id)){
        this.attandancelist.delete(id);
      }else{
        this.attandancelist.add(id);
      }
    }
    finalsubmit(){
      let time=new Date();
      console.log(JSON.stringify(Array.from(this.attandancelist)),this.selectbatch,this.selectdivison,this.selectedsubject,time.toISOString().slice(0, 19).replace('T', ''));
      let ftime=time.toISOString().slice(0, 19).replace('T', ' ');
      this.controller.record_attandance(ftime,JSON.stringify(Array.from(this.attandancelist)),this.selectbatch,this.selectedsubject,this.selectdivison,this.userid,this.topic).subscribe((response:Facultyresponse)=>{
        let message=response.message+"  ,lecture ID is "+response.data;
        this.message=message;
        this.student=[];
        this.selectbatch=0;
        this.selectdivison='';
        this.topic='';
        this.displaytable=false;
        this.selectedsubject='';
      });
    }
    displaycolumns2=['student_id','name','fathernumber','lecture_date'];
    protected selecteddate:any;
    protected selectedlecture:any;
    protected attandancedatamain:lecturedata[]=[];
    protected attandancedata:lecturedata[]=[];
    protected lectures=new Array();
    protected dates=new Array();
    showattandance(){
      this.controller.showattandance(this.userid,this.selectbatch,this.selectedsubject).subscribe((response:Lectures)=>{
        console.log(response);
        response.data.filter((item)=>{
          if(!this.lectures.includes(item.topic)){
            this.lectures.push(item.topic);
          }
          if(!this.dates.includes(item.lecture_date)){
            this.dates.push(item.lecture_date);
          }
        })
        this.attandancedatamain=response.data;
        this.attandancedata=response.data;
        this.message=response.message;
        if(this.attandancedatamain.length<=0){
          this.message="No Record Found";
        }else{
          this.displaytable=true;
        }
      });
    }
    changedlecture(){
      this.attandancedata=this.attandancedatamain.filter((item)=>item.topic==this.selectedlecture)
    }
    constructor(private controller:GetAttandanceDataService){
    }
}
