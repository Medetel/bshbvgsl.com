import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Application, Project } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-applicant-query',
  templateUrl: './applicant-query.component.html',
  styleUrls: ['./applicant-query.component.css']
})
export class ApplicantQueryComponent implements OnInit {

  ProjectNameList: any;
  CategoryList: any;
  GetApplicantTransactionDetails: any;
  DebitTotal: number;
  CreditTotal: number;
  ClosingBalance: number;
  ApplicantQuery;
  PropertyDetails;
  PropertyDetailsByid;
  a: Application;
  p: Project;
  isApp: boolean;
  isProp: boolean;
  showAppDetails: any;
  showpropertysection: any;
  showappdetails: any;
  showpropdetails: any;
  showfindetails: any;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number = null;
  AFD: any = [];
  Prop: any;
  data: any;
  PD: any;
  encode: string;


  constructor(private userService: UserService, private errorHandler: ErrorHandler) {
    this.showAppDetails = true;
    this.showpropertysection = false;
    this.a = new Application();
    this.isApp = false;
    this.p = new Project();
    this.isProp = false;
    this.showappdetails = false;
    this.showpropdetails = false;
    this.showfindetails = false;

  }

  ngOnInit() {

  }
  myFunction() {
    window.print();
  }

  pageChanged(pageNumber: number) {

    // if (this.isSearch)
    //   this.onSearch(this.s, this.itemsPerPage, pageNumber);
    // else
    if (pageNumber.toString() != "NaN")
      this.GetPropertyDetails(this.p, this.itemsPerPage, pageNumber);
    else
      return false;
  }

  SelectOption(option) {
    if (option == "Application") {
      this.showAppDetails = true;
      this.showappdetails = false;
      this.showfindetails = false;
      this.showpropertysection = false;
      this.Resetform();
      this.ResetPropform();
    }
    else {
      this.GetAllProjectsName();
      this.GetAllCategories()
      this.showAppDetails = false;
      this.showpropertysection = true;
      this.totalItems = null;
    }
  }

  GetApplicantDetails(a) {
    // this.encode=encodeURIComponent(this.a.ApplicationNo);
    this.isApp = false;
    if (this.a.ApplicationNo == null || this.a.ApplicationNo == '') { var Appno = 'empty'; }
    else {
      Appno = this.a.ApplicationNo;
    }
    if (this.a.RegNo == null || this.a.RegNo == '') { var RegNo = 'empty'; }
    else {
      RegNo = this.a.RegNo;
    }
    if (this.a.MobileNumber == null || this.a.MobileNumber == '') { var PhoneNo = 0; }
    else {
      PhoneNo = this.a.MobileNumber;
    }
    if (this.a.ApplicantName == null || this.a.ApplicantName == '') { var Namee = 'empty'; }
    else {
      Namee = this.a.ApplicantName;
    }
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetApplicantDetails(Appno, RegNo, PhoneNo, Namee)
      .subscribe(
        (data: any) => {

          document.getElementById('loader-spinner').style.display = "none";
          this.ApplicantQuery = data.ApplicationQuery;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError("error");
        });
  }

  GetApplicantDetailsById(APP_Id) {
    this.showappdetails = true;
    this.showfindetails = true;
    this.GetApplicantTransactionDetailsQuery(APP_Id);
    this.GetApplicationScrutinyQueryDetails(APP_Id);
    this.getAppViewProjectQueryDetails(APP_Id);
  }

  GetApplicationScrutinyQueryDetails(APP_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetApplicationScrutinyQueryDetails(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.AFD = response;
        if (this.AFD.APP_IsJoint == 'N')
          this.AFD.APP_IsJoint = 'No';
        else
          this.AFD.APP_IsJoint = 'Yes';
       

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  getAppViewProjectQueryDetails(APP_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAppViewProjectQueryDetails(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.PD = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetApplicantTransactionDetailsQuery(APP_Id) {
    this.GetApplicantTransactionDetails = null;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetApplicantTransactionDetailsQuery(APP_Id)
      .subscribe(
        (data: any) => {
          this.GetApplicantTransactionDetails = data.TransactionModels;
          this.GetDebitTotal();
          this.GetCreditTotal();
          this.GetClosingBalance();
          document.getElementById('loader-spinner').style.display = "none";
        }, (error: any) => {
          swal('Warning!', "This Page is for applicant", 'warning');
        });
  }

  GetDebitTotal() {

    let totals = 0;
    for (let i = 0; i < this.GetApplicantTransactionDetails.length; i++) {
      totals += this.GetApplicantTransactionDetails[i].Debit;
    }
    this.DebitTotal = totals;
  }

  GetCreditTotal() {
    let totals = 0;
    for (let i = 0; i < this.GetApplicantTransactionDetails.length; i++) {
      totals += this.GetApplicantTransactionDetails[i].Credit;
    }
    this.CreditTotal = totals;
  }

  GetClosingBalance() {
    this.ClosingBalance = this.DebitTotal - this.CreditTotal;
  }

  GetAllProjectsName() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllProjectsBasedOnRole();
    this.data.subscribe(
      (response: any) => {
        this.ProjectNameList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetAllCategories() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getCategory();
    this.data.subscribe(
      (response: any) => {
        this.CategoryList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetPropertyDetails(p, itemsPerPage, pageNo) {
    this.isProp = false;
    if (this.p.PD_Id == null || this.p.PD_Id == '') { var PDId = 'empty'; }
    else {
      PDId = this.p.PD_Id;
    }
    if (this.p.PropNo == null || this.p.PropNo == '') { var PropertyNo = 'empty'; }
    else {
      PropertyNo = this.p.PropNo;
    }
    if (this.p.CA_CategoryName == null || this.p.CA_CategoryName == '') { var Catgry = 'empty'; }
    else {
      Catgry = this.p.CA_CategoryName.substring(0, 3);
    }
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetPropertyDetailsQuery(PDId, PropertyNo, Catgry, itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          this.PropertyDetails = data.projectsModels;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetPropertyDetailsById(PR_Id) {
    this.showpropdetails = true;
    this.showappdetails = true;
    this.showfindetails = true;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetPropertyDetailsById(PR_Id)
    this.data.subscribe(
      (response: any) => {
        this.Prop = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  Resetform() {
    this.showappdetails = false;
    this.showfindetails = false;
    this.ApplicantQuery = [];
    this.a.ApplicationNo = '';
    this.a.RegNo = '';
    this.a.MobileNumber = '';
    this.a.ApplicantName = '';
  }

  ResetPropform() {
    this.showpropdetails = false;
    this.PropertyDetails = [];
    this.p.PD_Id = '';
    this.p.PropNo = '';
    this.p.CA_CategoryName = '';
  }

  isNAUrl(url: string | null): boolean {
    debugger;
    // Check if the URL exists and ends with "NA.pdf"
    return url ? url.includes('NA.pdf') : false;
}
}