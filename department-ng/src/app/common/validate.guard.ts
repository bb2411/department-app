import { CanActivateFn } from '@angular/router';
import { StorageService } from '../faculty/controller/storage.service';

export const validateGuard: CanActivateFn = (route, state) => {
  if(StorageService.gettoken()){
    return true;
  }else{
    return false;
  }
};
