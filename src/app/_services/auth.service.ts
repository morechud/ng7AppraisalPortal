import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, min } from 'rxjs/operators';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    userRecords: User;
    uri: string = 'http://localhost:56803/';

    get getCurrentUser(){
        return this.currentUser;
    }

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        //this.currentUserSubject = new BehaviorSubject<User>(this.userRecords);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(user: User) {

      return this.http.post(this.uri+'api/GCSAppraisal/AuthenticateUser', user)
            .pipe(map((user:User) => {

                if (user != null) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //this.userRecords = user;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                   console.log(localStorage.getItem('currentUser'));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}