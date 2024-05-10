import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseurl } from '../../common/constant';

@Injectable({
  providedIn: 'root'
})
export class FacultydataService {
  static userid:any;
  subject:any=[];
  batch:any=[];
  getsubject(){
    return this.subject;
  }
  getuserid(){
    return FacultydataService.userid;
  }
  getbatch(){
    return this.batch;
  }
  getdataapi(facid:any){
    console.log(facid+"get data");
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append("facid", facid);
    let response=this.api.post<res>(baseurl+"/faculty/getdata",formData,{headers:headers});
    response.subscribe((res:res)=>{
      console.log("response")
      console.log(res)
      if(res.status==200){
        this.subject=res.subjects;
        this.batch=res.batches;
        console.log(response);
      }
    })
    return true;
  }
  constructor(private api:HttpClient) { }
}
interface res{
  status:any;
  batches:any;
  subjects:any;
}
