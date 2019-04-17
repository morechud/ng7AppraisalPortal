import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {AuthService} from '../_services/auth.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
        private authService: AuthService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //const currentUser = localStorage.getItem('currentUser');

      return this.authService.getCurrentUser.pipe(
        take(1),
        map((currentUser: User) => {

          if(currentUser != null){
            //console.log('current User not null on browser');
            return true;
          }
          this.router.navigate(['/login']);
          return false;
        })
      );
      // if (currentUser != null) {
      //     // authorised so return true
      //     return true;
      // }

      // not logged in so redirect to login page with the return url
      // this.router.navigate(['/login']);
      // return false;
  }
}
