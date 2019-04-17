import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {AuthService} from '../_services/auth.service';
import {User} from '../_models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  isLoginError = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
        private router: Router) { }

  get f() { return this.myForm.controls; }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      UserId: ['', Validators.required],
      Password: ['', Validators.required]
    });

  }

  onSubmit(user: User) {

    if (this.myForm.invalid) {
      return;
  }
    
    this.authService.login(user).subscribe((response: User) =>
      {
        this.router.navigate(['/']);
        //console.log(response);
      },
      (error: HttpErrorResponse) => {
        this.isLoginError = true;
        window.alert('Error authenticating the user: '+error.message);
      });
     }
}
