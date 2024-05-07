import { CanActivateFn } from '@angular/router';

export const isvaliduserGuard: CanActivateFn = (route, state) => {
  const token=localStorage.getItem("token");
  if(token){
    return true;
  }else{
    return false;
  }
};
