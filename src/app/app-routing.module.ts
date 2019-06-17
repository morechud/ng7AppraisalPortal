import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{ HomeComponent } from './home/home.component';
import{ LoginComponent } from './login/login.component';
import{ NewappraisalComponent } from './newappraisal/newappraisal.component';
import{ AppraisallistComponent } from './appraisallist/appraisallist.component';
import {AuthGuard} from './_guards/auth.guard';

const routes: Routes = [
  {path:'', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'newappraisal', component: NewappraisalComponent, canActivate: [AuthGuard]},
  {path:'appraisallist', component: AppraisallistComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }