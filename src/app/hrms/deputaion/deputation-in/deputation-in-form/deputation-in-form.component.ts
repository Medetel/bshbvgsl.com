import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-deputation-in-form',
  templateUrl: './deputation-in-form.component.html',
  styleUrls: ['./deputation-in-form.component.css']
})
export class DeputationInFormComponent implements OnInit {

  title="Deputation Details";
  data : any = {};
  formInvalid : boolean = false;
  E : any = {};
  T: any = {};
  d: any = {};
  DEPUTATION_ID: any;
  EMP_EMPLOYEE_ID: any;
  ReportList : any = {};
  mode : string;
  Trainingtypelist: any = {};
  TrainingCategorylist: any = {};
  EmployeeDetails: any = {};
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
  hide:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {
   this.GetAlldata();
    this.route.params.subscribe(params => {      
      this.DEPUTATION_ID = params['DEPUTATION_ID'];  
      this.mode =  params['mode'];   
        
        if(this.DEPUTATION_ID > 0){
           this.GetByIdDPTAuth(this.DEPUTATION_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View Deputation Type ";
    }
    else if(this.mode=='Edit'){
      this.title = "Deputation Details ";
    }  
  }
  SaveDPT(DPT){

  }
  Cancel(){
    
  }
GetAlldata(){
 
  
  this.data = this.userService.GetAllTime();
  this.data.subscribe(
    (response: any) => {
      this.Trainingtypelist = response.Result;
      
    })
}
      GetEmployeeForTheId(EMP_DIVISION_ID) {
     
        this.data = this.userService.GetEmployeeForTheIdDetails(EMP_DIVISION_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })    
  
        }


        GetEmployeeForTheIdTo(EMP_EMPLOYEE_ID) {
      
          this.data = this.userService.GetEmployeeForTheIdDetailsTO(EMP_EMPLOYEE_ID);
          this.data.subscribe(
            (response: any) => {       
              this.EmployeeDetailsTO = response;
            })    
    
          }

          getFeasibilityDocBriefFUrl1Edit() {
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
  




  

          imageUpload1(file: FileList) {
          
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
              data.append("DepIN", file.item(0));
              let x = this.userService.uploaddepin(data);
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
//getbyid for view
GetByIdDPTAuth(DEPUTATION_ID) {


  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetByIdDPTA(DEPUTATION_ID);
  this.data.subscribe(
    (response: any) => {                 
      console.log("getbyid");
      console.log(response);
      this.E = response; 

      this.GetEmployeeForTheId(response.EMP_DIVISION_ID)
      this.GetEmployeeForTheIdTo(response.EMP_EMPLOYEE_ID)
    this.GetAlldata()
    if(this.E.REPORT_TIME=="Aft")
    {
      this.E.REPORT_TIME="Afternoon"
    }

    if(this.E.REPORT_TIME=="For")
    {
      this.E.REPORT_TIME="Forenoon"
    }
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
UpdateDPTIn(DPT: NgForm) {         
  DPT.value.Upload1 = this.getFeasibilityDocBriefFUrl1Edit();    
  this.data = this.userService.UpdateDPTIn(DPT.value, this.DEPUTATION_ID);
  this.data.subscribe(
    (response) => {
      DPT.reset();
      DPT.resetForm();
      DPT.form.markAsPristine();
      DPT.form.markAsUntouched();    
         
      swal('Success!', ' DeputationIn updated Successfully .', 'success');
      document.getElementById('loader-spinner').style.display = "none";
      this.router.navigate(['/home/deputation/deputationin/']);
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

      
}



