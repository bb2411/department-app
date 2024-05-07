import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Createsession } from './createsession';
import { baseurl } from './constant';

@Injectable({
  providedIn: 'root'
})
export class CreatesessionService {
  callserver(){
    return this.httpclint.get<Createsession>(baseurl+"/creatsession");
  }
  constructor(private httpclint:HttpClient) { }
}
