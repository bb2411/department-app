import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from '../../common/constant';

@Injectable({
  providedIn: 'root'
})
export class FacultydataService {
  static userid:any;
  static subject:any=[];
  static batch:any=[];
  getsubject(){
    return FacultydataService.subject;
  }
  getuserid(){
    return FacultydataService.userid;
  }
  getbatch(){
    return FacultydataService.batch;
  }
  getdataapi(facid:any):Observable<res>{
    console.log(facid+"get data");
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append("facid", facid);
    let response=this.api.post<res>(baseurl+"/faculty/getdata",formData,{headers:headers});
    response.subscribe((res:res)=>{
      console.log("response1")
      console.log(res)
      if(res.status==200){
        FacultydataService.subject=res.subjects;
        FacultydataService.batch=res.batches;
        console.log("response11")
        console.log(FacultydataService.subject);
      }
    })
    return response;
  }
  constructor(private api:HttpClient) { }
}
export interface res{
  status:any;
  batches:any;
  subjects:any;
}
