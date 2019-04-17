import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { AppraisalRecords } from '../_models/appraisalrecords';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  uri: string = 'http://localhost:56803/';
  constructor(private http: HttpClient) { 
  }

  getAppraisalList(id){
    if(id !== null)
    {
      return this.http.get(this.uri+'api/gcsappraisal/getappraisalrecordsbyId?Id='+ id);
    }

    return null;
  }

  addAppraisalRecords(appraisalRecords: AppraisalRecords){
    console.log('posting to API');

    return this.http.post(this.uri+'api/GCSAppraisal/AddAppraisalRecord', appraisalRecords);
  }

  getStaffs(id: string){

    if(id != null)
    {
      return this.http.get(this.uri+'api/gcsappraisal/getstaffs?id='+ id);
    }
    return this.http.get(this.uri+'api/gcsappraisal/getstaffs');
  }

  getStaffById(id){
    return this.http.get(this.uri+'api/gcsappraisal/getStaffById?id='+ id);
  }
}





