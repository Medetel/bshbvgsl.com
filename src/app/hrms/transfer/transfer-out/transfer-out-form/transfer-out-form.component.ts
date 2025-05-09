import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transfer-out-form',
  templateUrl: './transfer-out-form.component.html',
  styleUrls: ['./transfer-out-form.component.css']
})
export class TransferOutFormComponent implements OnInit {

  title = "Add Employee Transfer Relieving";
  data: any;
  type: any;
  DistrictList: any = [];
  DistrictList1: any = [];
  DepartmentList: any = [];
  DistrictList2: any = [];
  DesignationList: any = [];
  DI_Id: any;
  DivisionId: any={};
  isSearch: boolean;
  s: Search;
  D:any =[];
  transfer_id: any={};
  De:any = [];
  D1:any = [];
  TR:any = [];
  ee:any = [];
  Des:any = [];
  Emplist:any = [];
  EmployeeDetails:any = [];
  EMP_EMPLOYEE_ID:any=[];
  Department_Id:any=[];
  formInvalid: boolean;
  fileToUpload: File;
  mode: any;
  myDate = new Date();
  fromDate : any;
  toDate : any;
  routing : string = null;
  hide:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datepipe: DatePipe ) {this.s = new Search();
      this.isSearch = false;
  
    }

  ngOnInit() {

    this.routing = localStorage.getItem('switchurl');
    localStorage.removeItem('switchurl');

    this.GetAllData();
    this.route.params.subscribe(params => {      
      this.transfer_id = params['transfer_id'];  
      this.mode =  params['mode'];           
        if(this.transfer_id > 0){
            this.GetByIdEmployeeTransfer(this.transfer_id)
        }    
    });  
  
    this.TR.DivisionId = +localStorage.getItem('divisonId');
    //this.GetEmployee(this.TR.DivisionId);
    this.GetAllData();
  
 
  }
  Cancel(){
    
  }
  //getting district details
GetAllData(){
  this.data = this.userService.GetDistrictDetailslist();
  this.data.subscribe(
    (response: any) => {
      this.DistrictList = response.Result;
    })   
      // this.data = this.userService.GetAllDesignationTransfer();
      // this.data.subscribe(
      //   (response: any) => {
      //     this.DesignationList = response.Result;
      //   })
    this.data = this.userService.GetAllDesignation();
    this.data.subscribe(
      (response: any) => {
        this.DesignationList = response;
      })
      //Tranfer location
  
      this.data = this.userService.GetDistrictDetails1();
      this.data.subscribe(
        (response: any) => {
          this.DistrictList1 = response.Result;
        })    
        //  emplouyee
    
      this.data = this.userService.GetEmployeeTransfer();
      this.data.subscribe(
        (response: any) => {
          this.Emplist = response.Result;
        })
        this.data = this.userService.GetDistrictDetails2();
 this.data.subscribe(
 (response: any) => {
 this.DistrictList2 = response.Result;
 })

        this.data = this.userService.GetAllDepartments();
        this.data.subscribe(
      (response: any) => {
        this.DepartmentList = response.Result;
      })
     
      }
  

    //get employee id
    GetEmployeeForTheId(EMP_EMPLOYEE_ID) {
      
      this.data = this.userService.GetEmployeeDetailsById(EMP_EMPLOYEE_ID);
      this.data.subscribe(
        (response: any) => {       
          this.EmployeeDetails = response;         
        })
      }
   
  
     

     //upload file
    
 imageUpload(file: FileList) {
      
  let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

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
    data.append("transferrelieving", file.item(0));
    let x = this.userService.uploadImagetrnsrel(data);
    x.subscribe(
      (response) => {

      }, (error) => {
        let i: any = document.getElementById('om_upload_path');
        i.value = "";
        if (error.status == 400) {
          //this.FeasibilityPDFUrl = "assets/images/image-default.png";
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }
  else {
    let i: any = document.getElementById('om_upload_path');
    i.value = "";
    if (!uploadedFilename.match(regex))
      swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
    else if (size > 2048)
      swal('Warning!', "Please upload image file less than 2mb", 'warning');
  }
}

  getOMDocBriefFUrl() {
    debugger;
    let imagename = null;
    try {
      imagename = document.getElementById('om_upload_path');
      console.log('om_upload_path');
      console.log(imagename.files[0].name);
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  getOMDocBriefFUrlEdit() {
    debugger;
    let imagename = null;
    try {
      imagename = document.getElementById('om_upload_path');
      console.log('om_upload_path');
      console.log(imagename.files[0].name);
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  //SAVE
  SaveTRF(TRF: NgForm) {
  



    // if((this.datepipe.transform(TRF.value.tranfr_rep_date, 'yyyy-MM-dd')) < (this.datepipe.transform(this.myDate, 'yyyy-MM-dd'))){
    //   swal('Reporting Date is invalid');
    //   return;
    //   //EXM.value.Start_Date ='';                 
    // }

    // if((this.datepipe.transform(TRF.value.tranfr_relv_date, 'yyyy-MM-dd')) > (this.datepipe.transform(TRF.value.tranfr_rep_date, 'yyyy-MM-dd'))){
    //   swal('Relieving Date is invalid');
    //   return;
    //  //EXM.value.End_Date ='';                 
    // }

   console.log('TRF Forms');
   console.log(TRF.value);
   //TRF.value.om_upload_path = this.getOMDocBriefFUrl();

    if (TRF.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      console.log('Data');
      console.log(TRF.value);
      TRF.value.om_upload_path = this.getOMDocBriefFUrl();
     
      this.data = this.userService.CreateTRF(TRF.value);
      this.data.subscribe(
        (response) => {
          TRF.reset();
          TRF.resetForm();
          TRF.form.markAsPristine();
          TRF.form.markAsUntouched();
          swal('Success!', 'TransferDetails Added Successfully .', 'success');
          this.router.navigate(['/home/transfer']);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401|| error.status == 500) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
  }


  GetByIdEmployeeTransfer(transfer_id){
  
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdEmployeeTransfer(transfer_id);
    this.data.subscribe(
      (response: any) => {
        this.TR = response; 
             
        // this.TR.Department_Id=response.Department_Id;
        if (this.TR.tranfr_relv_date != null)
        this.TR.tranfr_relv_date = ((this.TR.tranfr_relv_date).split('T'))[0]; 
        if (this.TR.tranfr_rep_date != null)
        this.TR.tranfr_rep_date = ((this.TR.tranfr_rep_date).split('T'))[0]; 
                 
        //this.GetEmployee(response.DivisionId)
         this.GetEmployeeForTheId(response.EMP_EMPLOYEE_ID)
        // this.GetEmployee(response.DivisionId)
        //  this.GetEmployeeForTheId(response.EMP_EMPLOYEE_ID)       


        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401|| error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }

//update
UpdateTRF(TRF: NgForm) {   
TRF.value.om_upload_path = this.getOMDocBriefFUrlEdit();
this.data = this.userService.UpdateTRF(TRF.value,this.transfer_id);
this.data.subscribe(
  (response) => {
    TRF.reset();
    TRF.resetForm();
    TRF.form.markAsPristine();
    TRF.form.markAsUntouched();   
          
    
    swal('Success!', ' Transfer  updated Successfully .', 'success');
    document.getElementById('loader-spinner').style.display = "none";   
    this.router.navigate(['/home/transfer/']) ;         
  }, (error) => {
    document.getElementById('loader-spinner').style.display = "none";
    if (error.status == 401|| error.status == 500) {
      this.errorHandler.handleError(error);
    }
    else if (error.status == 400) {
      swal('Warning!', error.error.Message, 'warning');
    }
  });    
}


Back(){   
  if(this.routing != null)
  this.router.navigate([this.routing]);
  else
  this.router.navigate(['/home/transfer']);    
}
}
