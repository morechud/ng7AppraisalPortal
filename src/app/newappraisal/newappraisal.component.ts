import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../_services/data.service';
import { AppraisalRecords } from '../_models/appraisalrecords';
import { Staff } from '../_models/staff';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-newappraisal',
  templateUrl: './newappraisal.component.html',
  styleUrls: ['./newappraisal.component.scss']
})
export class NewappraisalComponent implements OnInit {

  staffs: Staff;
  selectedStaff: Staff = null;
  staffRecords: User;
  loggedInStaffUniqueId: string;
  myForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  finalScore;
  //appraisalRecord: AppraisalRecords;

  constructor(private router: Router, private data: DataService, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      Teamwork: [''],
      Punctuality : [''],
      Attendance : [''],
      Neatness : [''],
      Creativity : [''],
      ProblemSolving : [''],
      additionalComment : [''],
      FinalScore: [''],
      Year : [''],
      Quarter : ['']
    });

    this.finalScore = this.myForm.controls.Teamwork.value;
    
    this.getStaffUniqueId();
  }

  getStaffUniqueId(){

    this.authService.getCurrentUser.subscribe((data: User) => {
      this.loggedInStaffUniqueId = data.staffUniqueId;
    });

    //Get my staff records - for appraisal purposes
    this.data.getStaffs(this.loggedInStaffUniqueId).subscribe((response: Staff) => {
      this.staffs = response;
      console.log(response);
    });
  }

  FinalScoreResult(){
    return ((Number(this.myForm.value.Teamwork) + Number(this.myForm.value.Punctuality)
    + Number(this.myForm.value.Attendance) + Number(this.myForm.value.Neatness)
    + Number(this.myForm.value.Creativity) + Number(this.myForm.value.ProblemSolving)) / 6) * 100;
  }

  onChangeSelectedStaff(value){
    this.selectedStaff = this.staffs[value];
    console.log(this.selectedStaff);
  }

  onSubmit(ar: AppraisalRecords) {
    //this.appraisalRecord = ar;
    //console.log(this.selectedStaff);
    ar.StaffUniqueId = this.selectedStaff.id;
    ar.StaffId = this.selectedStaff.staffId;
    ar.SupervisorUniqueId = this.selectedStaff.supervisorUniqueId;
    ar.ManagerUniqueId = this.selectedStaff.managerUniqueId;
    ar.submittedBy = this.loggedInStaffUniqueId;
    ar.FinalScore = this.FinalScoreResult().toString();
    //console.log(ar);
    this.data.addAppraisalRecords(ar).subscribe(response =>
      {
        if(response > 0){
          this.router.navigate(['/']);
        }
        else{
          alert('appraisal submission not successfully');
        }
      });
    
}
}
