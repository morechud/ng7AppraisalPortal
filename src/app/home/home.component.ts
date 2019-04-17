import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../_services/data.service';
import { Subscription } from 'rxjs';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { Staff } from '../_models/staff';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  currentUser: User;
  staff: Staff;
  loggedInStaffUniqueId;
  currentUserSubscription: Subscription;

  constructor(private data: DataService, private authService: AuthService) { 
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
  });
  }

  ngOnInit() {
    this.authService.getCurrentUser.subscribe((data: User) => {
      this.loggedInStaffUniqueId = data.staffUniqueId;
    });
    //console.log(this.loggedInStaffUniqueId);
    this.data.getStaffById(this.loggedInStaffUniqueId).subscribe((data:Staff)=>{
      this.staff = data;
      console.log(data);
    });
  }

  ngOnDestroy(): void {
  }

}
