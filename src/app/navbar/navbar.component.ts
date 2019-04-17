import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedInStaffName;
  currentUser: any;
  isAuthenticated$: Observable<User>;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
    //this.currentUser = localStorage.getItem('currentUser');
    this.isAuthenticated$ = this.authService.currentUser;
    this.authService.getCurrentUser.subscribe((data: User) => {
      this.loggedInStaffName = data.userId;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
}

}
