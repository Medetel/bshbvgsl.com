import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-police-verification',
  templateUrl: './police-verification.component.html',
  styleUrls: ['./police-verification.component.css']
})
export class PoliceVerificationComponent implements OnInit {
  
  mode: any;
  hide: boolean;
  data: any = [];
  DistrictsList: any = [];  
  d : any =[];
  p : any =[];
  AllEmployeeList: any = [];
  detailsEmployee: any =[];  
  formInvalid: boolean;  
  fixedcodelist: any =[];
  fileToUpload: File;
  VfrId: any;
  EmployeeVerificationDetails: any =[];
  totalItems: any;
  itemsPerPage: number;
  currentPage: number;
  EmployeeId: number;
  empId: number;
  title2 : string= "Add Police Verifications";

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.getDegaultData()
    this.route.params.subscribe(params => {
      this.VfrId = params['id'];
      this.mode = params['mode'];
      this.empId = params['empId'];
      this.GetByIddependentDetails(this.VfrId);
      if (this.mode == 'view') {
        this.hide = true;
      }
    });

    if((this.empId)>0){       
      this.EmployeeId = this.empId;
    }


    if(+localStorage.getItem('EmployeeId')>0){     
      this.EmployeeId = +localStorage.getItem('EmployeeId')
      localStorage.removeItem('EmployeeId');
    }   
      
    
    if(this.EmployeeId > 0){
      this.ChangeOfEmployee(this.EmployeeId)
      this.GetAllEmployeeVerifications(0,0);
    }

    if (this.mode == 'view') {     
      this.title2 = "View Police Verifications"
    }

     if (this.mode == 'edit') {      
      this.title2 = 'Update Police Verifications'
    }


  }

  ChangeOfEmployee(EmployeeId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEmployeeIds(EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.detailsEmployee = response;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  getDegaultData() {
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

      this.data = this.userService.GetAllhrmsfixedCodes('VerificationType');
      this.data.subscribe(
        (response: any) => {
          this.fixedcodelist = response;
        })

      
  }

  ChangeOfDivision(DivisionId){ 
    this.data = this.userService.GetAllEmployees(DivisionId);
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;
      })
  }


  SaveEmplVerificationDetails(EMPLDetails: NgForm) {
        if (EMPLDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {    

      EMPLDetails.value.EMP_ID = this.EmployeeId;
      EMPLDetails.value.DOC_UPLOAD_PATH = this.getFeasibilityPDFUrl1();
      this.data = this.userService.PostEmployeeVerificationsDetails(EMPLDetails.value);
      this.data.subscribe(
        (response) => {
          EMPLDetails.reset();
          EMPLDetails.resetForm();
          EMPLDetails.form.markAsPristine();
          EMPLDetails.form.markAsUntouched();
          swal('Success!', 'Employee Verification Details Added Successfully .', 'success');
          //this.router.navigate(['/home/serviceregister/policeverification']);
          this.GetAllEmployeeVerifications(this.itemsPerPage, this.currentPage);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
  }


  UpdateEmplVerificationDetails(EMPLDetails: NgForm) {  
    if (EMPLDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      EMPLDetails.value.EMP_ID = this.EmployeeId;
      EMPLDetails.value.DOC_UPLOAD_PATH = this.getFeasibilityPDFUrl1();
      this.data = this.userService.UpdateEmployeeVerificationDetails(EMPLDetails.value,this.VfrId);
      this.data.subscribe(
        (response) => {
          EMPLDetails.reset();
          EMPLDetails.resetForm();
          EMPLDetails.form.markAsPristine();
          EMPLDetails.form.markAsUntouched();
          swal('Success!', 'Employee Verification Details Updated Successfully .', 'success');
          //this.router.navigate(['/home/serviceregister/policeverification']);
          this.GetAllEmployeeVerifications(this.itemsPerPage, this.currentPage);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
  }


  GetByIddependentDetails(VfrId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdVerificationDetails(VfrId);
    this.data.subscribe(
      (response: any) => {
        this.p = response;
        this.p.VRF_Date = ((this.p.VRF_Date).split('T'))[0]; 
        this.ChangeOfDivision(response.EMP_DIVISION_ID)     
        this.ChangeOfEmployee(response.EMP_ID);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  imageUpload1(file: FileList) {
    debugger;
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF|.JPEG|.jpeg)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //  this.IS_UploadPath = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('DOC_UPLOAD_PATH');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('DOC_UPLOAD_PATH');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getFeasibilityPDFUrl1() {
    let imagename = null;
    try {
      imagename = document.getElementById('DOC_UPLOAD_PATH');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  Cancel(){   
    this.router.navigate(['/home/serviceregister/policeverification']);
  }


  GetAllEmployeeVerifications(itemsPerPage: number, pageNo: number) {
    //this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeeVerifications(itemsPerPage, pageNo,this.EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.EmployeeVerificationDetails = response.HRMSVerification;
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  delete(VRF_ID) {
    debugger;
    swal({
      title: 'Are you sure?', text: "You want to delete! ", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteEmployeeVerificationDetails(VRF_ID);
        this.data.subscribe(
          (response: any) => {
            this.GetAllEmployeeVerifications(this.itemsPerPage, this.currentPage);
          },
        );
      }
    })
  }

  gotoAdd(EmployeeId){      
    localStorage.setItem('EmployeeId',EmployeeId);  
    this.router.navigate(['/home/serviceregister/policeverification-form']);
  }

  OnChangeVeri(VerTy){
    if(VerTy == 4088)
    this.p.VRF_CERRTIFY_AUTH = 'UIDIA'
    else if(VerTy == 4089)
    this.p.VRF_CERRTIFY_AUTH = 'Regional Transport Office(RTO)'
    else if(VerTy == 4090)
    this.p.VRF_CERRTIFY_AUTH = 'Income Tax Department'
    else if(VerTy == 4091)
    this.p.VRF_CERRTIFY_AUTH = 'Election commision of India'
  }
}
