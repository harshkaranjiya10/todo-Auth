import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable, take } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => { 
  const router = inject(Router);
  const loggedUser = localStorage.getItem('userData');

  if(loggedUser != null) {
    return true;
  } else {
    router.navigateByUrl('auth');
    return false;
  }
}
