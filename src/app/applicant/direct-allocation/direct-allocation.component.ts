import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Application, Project, DirectAllotment } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-direct-allocation',
  templateUrl: './direct-allocation.component.html',
  styleUrls: ['./direct-allocation.component.css']
})
export class DirectAllocationComponent implements OnInit {

  ProjectNameList: any;
  CategoryList: any;
  GetUnAllotedApplicantTransactionDetails: any;
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
  totalItems: number;
  AFD: any;
  Prop: any;
  data: any;
  PD: any;
  showPropSelector: any;
  showPropSelectorDetails: any;
  showAllotmentSelector: any;
  APP_Id: any;
  fileToUpload: File = null;
  d: DirectAllotment;
  Dir: any;
  PropID: any;
  ProjectId: any;
  InstDetails: any = [];

  constructor(private userService: UserService, private errorHandler: ErrorHandler, private router: Router) {
    this.a = new Application();
    this.isApp = false;
    this.p = new Project();
    this.isProp = false;
    this.d = new DirectAllotment();
    this.Dir = false;
  }

  ngOnInit() {
    this.showfindetails = false;
    this.showappdetails = false;
    this.showAppDetails = false;
    this.showPropSelectorDetails = false;
    this.showPropSelector = false;
    this.showAllotmentSelector = false;
  }

  pageChanged(pageNumber:number){
    this.GetPropertyDetails(this.p,this.itemsPerPage,pageNumber);
  }

  displaySelectedConditions(event) {
    if (event.target.checked) {
      this.PropID = event.target.value;  // Store selected property ID
    } else {
      this.PropID = null;  // Clear if no property selected
    }
  }

  GetUnAllotedApplicantDetails(a) {  
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
    this.userService.GetUnAllotedApplicantDetails(Appno, RegNo, PhoneNo, Namee)
      .subscribe(
        (data: any) => {
          
          document.getElementById('loader-spinner').style.display = "none";
          this.ApplicantQuery = data.DirectAllocation;          
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  DisplayPropertyDetails(APP_Id) {
    this.showPropSelectorDetails = true;
    this.showPropSelector = true;
    this.GetAllProjectsNameForApplicant(APP_Id);
  }

  GetAllProjectsNameForApplicant(APP_Id) {
    
    this.APP_Id = APP_Id;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllProjectsForApplicant(APP_Id);    
    this.data.subscribe(
      (response: any) => {
        this.ProjectNameList = response;
        this.GetAllCategoriesForApplicant(APP_Id);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetAllCategoriesForApplicant(APP_Id) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getCategoryForApplicant(APP_Id);    
    this.data.subscribe(
      (response: any) => {
        this.CategoryList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetPropertyDetails(p,itemsPerPage,pageNo) {
    
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
    this.userService.GetPropertyDetailsfordirectAllotment(PDId, PropertyNo, Catgry,itemsPerPage,pageNo)
      .subscribe(
        (data: any) => {
          
          this.PropertyDetails = data.projectsModels;
          this.totalItems= data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          this.showappdetails = true;
          this.showAppDetails = true;
          this.showfindetails = true;
          this.showAllotmentSelector = true;
          this.GetUnAllotedApplicantTransactionDetailsQuery(this.APP_Id);
          this.GetUnAllotedApplicationScrutinyQueryDetails(this.APP_Id);
          this.getAppViewUnAllotedProjectQueryDetails(this.APP_Id);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetUnAllotedApplicantTransactionDetailsQuery(APP_Id) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetUnAllotedApplicantTransactionDetailsQuery(APP_Id)
      .subscribe(
        (data: any) => {
          this.GetUnAllotedApplicantTransactionDetails = data.TransactionModels;        
          this.GetDebitTotal();
          this.GetCreditTotal();
          this.GetClosingBalance();
          document.getElementById('loader-spinner').style.display = "none";
        }, (error: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetDebitTotal() {
    
    let totals = 0;
    for (let i = 0; i < this.GetUnAllotedApplicantTransactionDetails.length; i++) {
      totals += this.GetUnAllotedApplicantTransactionDetails[i].Debit;
    }
    this.DebitTotal = totals;
  }
  GetCreditTotal() {
    let totals = 0;
    for (let i = 0; i < this.GetUnAllotedApplicantTransactionDetails.length; i++) {
      totals += this.GetUnAllotedApplicantTransactionDetails[i].Credit;
    }
    this.CreditTotal = totals;
  }
  GetClosingBalance() {
    this.ClosingBalance = this.DebitTotal - this.CreditTotal;
  }

  GetUnAllotedApplicationScrutinyQueryDetails(APP_Id) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetUnAllotedApplicationScrutinyQueryDetails(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.showappdetails = true
        this.AFD = response;
        if (this.AFD.APP_IsJoint == 'N')
          this.AFD.APP_IsJoint = 'No';
        else
          this.AFD.APP_IsJoint = 'Yes';
       
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        this.showappdetails = false;
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  getAppViewUnAllotedProjectQueryDetails(APP_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAppViewUnAllotedProjectQueryDetails(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.PD = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  DocumentFileInput(file: FileList) {
    
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
       
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
         
        }, (error) => {
          let i: any = document.getElementById('DocumentFileInput');
          i.value = "";
          if (error.status == 400) {          
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('DocumentFileInput');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }

  Save(DirectAllotment: NgForm) {
    
    DirectAllotment.value.App_Note = this.d.Note;
    DirectAllotment.value.App_Verif_Documents = this.getDocumentImage();
    DirectAllotment.value.APP_Reg_No = this.APP_Id;
    DirectAllotment.value.PropId = this.PropID;
    DirectAllotment.value.DirectAllocationModel = this.InstDetails;
    this.data = this.userService.UpdateDirectAllotmentDocuments(this.APP_Id, DirectAllotment.value);
    this.data.subscribe(
      (response) => {
        swal('Success!', 'Property alloted successfully.', 'success');
        this.GetPropertyDetails(Project,5,1);
        this.InstDetails = [];
        this.d.Note = '';        
        document.getElementById('loader-spinner').style.display = "none";
        
      }, (error) => {       
        if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  getDocumentImage() {
    let imagename = null;
    try {
      imagename = document.getElementById('DocumentFileInput');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  AddPaymentDetails(d) {
    let bool = 0;
    if (d.PaymentDueDate == "" || d.PaymentAmount == "") { bool = 1 }
    if ((d.PaymentDueDate != null || d.PaymentAmount != null) && bool != 1) {
      let IDTemp = {
        PaymentDueDate: d.PaymentDueDate,
        PaymentAmount: d.PaymentAmount
      }
      this.InstDetails.push(IDTemp);
      this.d.PaymentDueDate = "";
      this.d.PaymentAmount = "";
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
    }
  }

  resetpaymentdetail(d) {
    d.PaymentDueDate = '';
    d.PaymentAmount = '';
  }

  DeletepaymentDetails(pos) {
    
    if (pos != null) {
      swal({
        title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.InstDetails.splice(pos, 1);
        }
      })
    }
  }

  Redirect() {   
   
    this.router.navigate(['/khbnotificationltr/', this.APP_Id, this.p.PD_Id]);
  }

  ResetForm() {
    this.ApplicantQuery = [];
    this.PropertyDetails = [];
    this.showappdetails = false;
    this.showAppDetails = false;
    this.showfindetails = false;
    this.showAllotmentSelector = false;
    this.GetUnAllotedApplicantTransactionDetails = [];
    this.PD = [];
    this.AFD = [];
    this.a.ApplicationNo = '';
    this.a.RegNo = '';
    this.a.MobileNumber = '';
    this.a.ApplicantName = '';
    this.p.PD_Id = '';
    this.p.PropNo = '';
    this.p.CA_CategoryName = '';
    this.showpropdetails = false;
    this.showPropSelectorDetails = false;
    this.showPropSelector = false;
    this.PropID = null;
  }
}