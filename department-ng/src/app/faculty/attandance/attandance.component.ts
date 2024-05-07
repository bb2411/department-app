import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { GetAttandanceDataService } from '../controller/get-attandance-data.service';
import { Facultyresponse } from '../facultyresponse';
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
      }else{
        this.state=true;
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
      this.displaytable=true;
      this.student=[];
      this.data[0].students.forEach(element => {
        if(element.semid==this.selectbatch && element.division==this.selectdivison){
          this.student.push(element);
        }
      });
    }
    areSelectionsMade(): boolean {
      return this.selectedsubject !== 'None' && this.selectbatch !== 0 && this.selectdivison !== '';
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
        alert(response.message);
      });
    }
    constructor(private controller:GetAttandanceDataService){
    }
}
