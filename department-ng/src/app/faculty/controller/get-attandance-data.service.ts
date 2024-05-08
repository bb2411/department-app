import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from '../../common/constant';
import { Faculty } from '../faculty';
import { Lectures } from '../lectures';
import { Facultyresponse } from './../facultyresponse';

@Injectable({
  providedIn: 'root'
})
export class GetAttandanceDataService {
  get_attandane_data(pid:any):Observable<Faculty>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append("fac_id", pid);
    return this.backendcall.post<Faculty>(baseurl+"/faculty/get_attandance_data",formData,{headers:headers});
  }
  record_attandance(time:any,students:any,batch:any,subject:any,Division:any,facid:any,topic:any):Observable<Facultyresponse>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append("student",students);
    formData.append("batch",batch);
    formData.append("subject",subject);
    formData.append("time",time);
    formData.append("division",Division);
    formData.append("faculty_id",facid);
    formData.append("topic",topic);
    return this.backendcall.post<Facultyresponse>(baseurl+"/faculty/put_attandance_data",formData,{headers:headers});
  }

  showattandance(facid:any,batch:any,subject:any):Observable<Lectures>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append("batch",batch);
    formData.append("subject",subject);
    formData.append("faculty_id",facid);
    return this.backendcall.post<Lectures>(baseurl+"/faculty/showattandance",formData,{headers:headers});
  }
  constructor(private backendcall:HttpClient) { }
}
