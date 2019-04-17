import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../_services/data.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-appraisallist',
  templateUrl: './appraisallist.component.html',
  styleUrls: ['./appraisallist.component.scss']
})
export class AppraisallistComponent implements OnInit {

  tableColumns  :  string[] = ['StaffId'];
  staffs: Object;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(private data: DataService, private authService: AuthService) { 
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
  });
  }

  ngOnInit() {
    this.data.getStaffs(null).subscribe(data => {
      this.staffs = data;
      this.dtTrigger.next();
      //console.log(this.staffs);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
