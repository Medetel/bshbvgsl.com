import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-complaint-reg-auth-form',
  templateUrl: './complaint-reg-auth-form.component.html',
  styleUrls: ['./complaint-reg-auth-form.component.css']
})
export class ComplaintRegAuthFormComponent implements OnInit {

  title="ComplaintRegistration Details";
  data : any = {};
  formInvalid : boolean = false;
  E : any = {};
  T: any = {};
  d: any = {};
  CA: any = {};
  DEPUTATION_ID: any;
  EMP_EMPLOYEE_ID: any;
  ReportList : any = {};
  mode : string;
  Trainingtypelist: any = {};
  WitnessDetails: any = {};
  EmployeeDetails: any = {};
  ComplaintDetails: any = {};
  Timelist: any = {};
  Emplist: any = {};
  DI_Id:number;
  fix_code_id: any = {};
  dd: any = {};
  tt: any = {};
  dd3: any = {};
  Depdentlist: any = {};
  EmployeeDetailsTO: any = {};
  DistrictlistDep: any = {};
  fileToUpload: File;
  COMPLAINT_ID: any = {};
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {

    this.route.params.subscribe(params => {      
      this.COMPLAINT_ID = params['COMPLAINT_ID'];  
      this.mode =  params['mode'];   
        
        if(this.COMPLAINT_ID > 0){
            this.GetByIdCompalintAuth(this.COMPLAINT_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View ComplaintRegistration  ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit ComplaintRegistration ";
    }  
  }
   
// GetAlldata(){
//   debugger;
//   this.data = this.userService.GetAllTime();
//   this.data.subscribe(
//     (response: any) => {
//       this.Trainingtypelist = response.Result;
      
//     })
// }


//employee details 
      GetEmployeeForTheId(EMP_DIVISION_ID) {
        debugger;
        this.data = this.userService.GetEmployeeForTheIdDetails1(EMP_DIVISION_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })    
  
        }

//complaint details
        GetComplaintForTheIdTo(COMPLAINT_ID) {
          debugger;
          this.data = this.userService.GetComplaintForTheIdDetails(COMPLAINT_ID);
          this.data.subscribe(
            (response: any) => {       
              this.ComplaintDetails = response;
            })    
    
          }
  

          //witness details
          GetWitnessForTheIdTo(COMPLAINT_ID) {
            debugger;
            this.data = this.userService.GetWitnessForTheIdDetails(COMPLAINT_ID);
            this.data.subscribe(
              (response: any) => {       
                this.WitnessDetails = response;
              })    
      
            }

          imageUpload1(file: FileList) {
            debugger;
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
              data.append("UploadedImage", file.item(0));
              let x = this.userService.uploadImage1(data);
              x.subscribe(
                (response) => {
        
                }, (error) => {
                  let i: any = document.getElementById('Upload1');
                  i.value = "";
                  if (error.status == 400) {
                    //this.FeasibilityPDFUrl = "assets/images/image-default.png";
                    swal('Warning!', error.error.Message, 'warning');
                  }
                });
            }
            else {
              let i: any = document.getElementById('Upload1');
              i.value = "";
              if (!uploadedFilename.match(regex))
                swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
              else if (size > 2048)
                swal('Warning!', "Please upload image file less than 2mb", 'warning');
            }
          }
          getFeasibilityDocBriefFUrl1() {
            let imagename = null;
            try {
              imagename = document.getElementById('Upload1');
              console.log('CourtDoc file');
              console.log(imagename.files[0].name);
              return imagename.files[0].name;
            }
            catch (e) {
              return null; 
            }
          }
//getbyid for view
GetByIdCompalintAuth(COMPLAINT_ID) {
  debugger;

  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetByIdCompalintAuth(COMPLAINT_ID);
  this.data.subscribe(
    (response: any) => {                 
      console.log("getbyid");
      console.log(response);
      this.E = response; 
     this.GetEmployeeForTheId(response.DivisionId)
      // this.GetEmployeeForTheId(response.EMP_DIVISION_ID)
      this.GetComplaintForTheIdTo(response.COMPLAINT_ID)
       this. GetWitnessForTheIdTo(response.COMPLAINT_ID)
    // if(this.E.REPORT_TIME=="Aft")
    // {
    //   this.E.REPORT_TIME="Afternoon"
    // }

    // if(this.E.DOC_STATUS=="G")
    // {
    //   this.E.DOC_STATUS="Generated"
    // }
      if (this.E.Rel_Date != null)
      this.E.Rel_Date = ((this.E.Rel_Date).split('T'))[0];

    if (this.E.DEPUT_ACT_REP_DATE != null)
      this.E.DEPUT_ACT_REP_DATE = ((this.E.DEPUT_ACT_REP_DATE).split('T'))[0];


  document.getElementById('loader-spinner').style.display = "none";
    }, (error) => {
      document.getElementById('loader-spinner').style.display = "none";
      if (error.status == 401 || error.status == 500) {
        this.errorHandler.handleError(error);
      }
      else if (error.status == 400) {
        swal('Warning!', error.error.Message, 'warning');
      }
    });
}



//update
UpdateCMPAuth(CMPAuth: NgForm) {         
           debugger;  
  this.data = this.userService.UpdateCMPAuth(CMPAuth.value, this.COMPLAINT_ID);
  this.data.subscribe(
    (response) => {
      CMPAuth.reset();
      CMPAuth.resetForm();
      CMPAuth.form.markAsPristine();
      CMPAuth.form.markAsUntouched();    
         
      swal('Success!', ' ComplaintAuthrazation updated Successfully .', 'success');
      document.getElementById('loader-spinner').style.display = "none";
      this.router.navigate(['/home/dept-enquiry/complaint-reg-auth/']);
    }, (error) => {
      document.getElementById('loader-spinner').style.display = "none";
      if (error.status == 401 || error.status == 500) {
        this.errorHandler.handleError(error);
      }
      else if (error.status == 400) {
        swal('Warning!', error.error.Message, 'warning');
      }
    });
}


Cancel()
{
         this.E.AUTH_BY = '';
          this.E.AUTH_REMARKS = '';
          this.E.AUTH_DATE = '';
          this.E.MODIFIED_BY = '';
          this.E.MODIFIED_DATE = '';
         
}

SaveCMPAuth(CMPAuth: NgForm)
{}

      
}



