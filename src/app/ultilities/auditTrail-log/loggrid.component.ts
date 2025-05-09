import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ErrorHandler } from '../../shared/ErrorHandler';


@Component({
  selector: 'app-loggrid',
  templateUrl: './loggrid.component.html',
  styleUrls: ['./loggrid.component.css']
})
export class LogGridComponent implements OnInit {

  title = "Audit Trail Logs";
  l: any = {};
  PageList: any = [];
  data: any;
  InsertLogList: any = [];
  DeleteLogList: any = [];
  EditLogList: any = [];
  EditDetailsList: any = [];
  TableName: any;
  FromDate: any;
  ToDate: any;
  details: any = [];
  rowNo: number = 0;
  primaryKey: any;
  acc: any = 0;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      if (params['mode'] == 'reroute') {
        this.details = localStorage.getItem('FormDetails');
        this.details = JSON.parse(this.details);
        if (this.details != null) {
          this.l = this.details;
          this.onSubmitLogDetailsreroute(this.details)
        }
      }

    });


    this.GetAllPageList()
  }

  GetAllPageList() {
    this.data = this.userService.getAllPagesList();
    this.data.subscribe(
      (response: any) => {
        this.PageList = response.Result;
      })
  }

  onSubmitLogDetails(LoInfo: NgForm) {
    this.TableName = LoInfo.value.tableName;
    this.FromDate = LoInfo.value.fromDate;
    this.ToDate = LoInfo.value.Todate;

    localStorage.setItem('FormDetails', JSON.stringify(LoInfo.value));
    var details = localStorage.getItem('FormDetails') 

    //Insert Log List
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetInsertLogList(LoInfo.value.tableName, LoInfo.value.fromDate, LoInfo.value.Todate);
    this.data.subscribe(
      (response: any) => {
        this.InsertLogList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        this.InsertLogList = {};
        document.getElementById('loader-spinner').style.display = "none";
      });

    //delete Log List
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetDeleteLogList(LoInfo.value.tableName, LoInfo.value.fromDate, LoInfo.value.Todate);
    this.data.subscribe(
      (response: any) => {
        this.DeleteLogList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });

    //edit log list

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEditLogList(LoInfo.value.tableName, LoInfo.value.fromDate, LoInfo.value.Todate);
    this.data.subscribe(
      (response: any) => {
        this.EditLogList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  //re roure

  onSubmitLogDetailsreroute(details: any) {

    this.TableName = details.tableName;
    this.FromDate = details.fromDate;
    this.ToDate = details.Todate;
    localStorage.setItem('FormDetails', JSON.stringify(details));
    var details1 = localStorage.getItem('FormDetails')
    //Insert Log List
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetInsertLogList(this.TableName, this.FromDate, this.ToDate);
    this.data.subscribe(
      (response: any) => {
        this.InsertLogList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        this.InsertLogList = {};
        document.getElementById('loader-spinner').style.display = "none";
      });

    //delete Log List
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetDeleteLogList(this.TableName, this.FromDate, this.ToDate);
    this.data.subscribe(
      (response: any) => {
        this.DeleteLogList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });

    //edit log list

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEditLogList(this.TableName, this.FromDate, this.ToDate)
    this.data.subscribe(
      (response: any) => {
        this.EditLogList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  EditDetailsLogList(PrimaryKeyId, index) {
    this.primaryKey = PrimaryKeyId;
    this.acc = index;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEditDetailsLog(this.TableName, this.FromDate, this.ToDate, PrimaryKeyId);
    this.data.subscribe(
      (response: any) => {
        this.EditDetailsList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  //Go to Views
  gotoView(Id, TableName) {
    localStorage.setItem('row_no', Id);
    localStorage.setItem('PrimaryKey', this.primaryKey);

    //Based on Page we need to route
    if (TableName == 'CaseRegistration')
      this.router.navigate(['/home/caseregistration/case-reg-form']);

    if (TableName == 'CaseProceeding')
      this.router.navigate(['/home/caseproceeding/case-pro-form']);

    if (TableName == 'Advocate')
      this.router.navigate(['/home/employedadvocates/employedadvocates-form']);

    if (TableName == 'AdvocatePayment')
      this.router.navigate(['/home/advocate-pay/advocate-pay-form']);

    if (TableName == 'ApplicationForms')
      this.router.navigate(['/home/application-form/view']);

  }

}