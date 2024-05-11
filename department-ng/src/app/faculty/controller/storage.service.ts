import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private static token:any;
  public static userid=100003;
  static settoken(token:any){
    StorageService.token=token;
  }
  static gettoken(){
    return StorageService.token;
  }
  setuserid(userid:any){
    console.log(userid+"storage used");
    StorageService.userid=userid;
    console.log(StorageService.userid+"storage used");
  }
  getuserid(){
    return StorageService.userid;
  }
  constructor() {}
}
