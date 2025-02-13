import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => { 
  const router = inject(Router);
  const loggedUser = localStorage.getItem('userData');
  const user = JSON.parse(loggedUser || '{}');
  if(user.email === 'harshkaranjiya10@gmail.com') {
    return true;
  } else  if(loggedUser != null) {
    return true;
  } else {
    router.navigateByUrl('auth');
    return false;
  }
}
export const AuthGuard2: CanActivateFn = (route, state) => { 
  const router = inject(Router);
  const loggedUser = localStorage.getItem('userData');
  const user = JSON.parse(loggedUser || '{}');
  if(user.email === 'harshkaranjiya10@gmail.com') {
    return true;
  } else {
    router.navigateByUrl('auth');
    return false;
  }
}
