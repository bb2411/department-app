import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from '../../common/constant';
import { Facultyresponse } from '../facultyresponse';

@Injectable({
  providedIn: 'root'
})
export class PracticalService {
  sendpracticaldata(facid:any,subject:any,topic:any,batch:any,division:any):Observable<Facultyresponse>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append("fac_id", facid);
    formData.append("subject",subject);
    formData.append("topic",topic);
    formData.append("batch",batch);
    formData.append("division",division);
    return this.backendcall.post<Facultyresponse>(baseurl+"/faculty/addpractical",formData,{headers:headers})
  }
  postreply(userid:any,practicalid:any,studentid:any,replymessage:any,status:any):Observable<Facultyresponse>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append("practical_id",practicalid);
    formData.append("faculty_id", userid);
    formData.append("student_id",studentid);  
    formData.append("reply",replymessage);
    formData.append("status",status);
    return this.backendcall.post<Facultyresponse>(baseurl+"/practical/checkedpractical",formData,{headers:headers});
  }
  constructor(private backendcall:HttpClient) { }
}
