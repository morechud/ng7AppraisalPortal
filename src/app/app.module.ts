import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewappraisalComponent } from './newappraisal/newappraisal.component';
import { AppraisallistComponent } from './appraisallist/appraisallist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StaffComponent } from './staff/staff.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthService } from './_services/auth.service';
import { DataService } from './_services/data.service';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NewappraisalComponent,
    AppraisallistComponent,
    NavbarComponent,
    StaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [AuthService, 
    DataService, 
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
