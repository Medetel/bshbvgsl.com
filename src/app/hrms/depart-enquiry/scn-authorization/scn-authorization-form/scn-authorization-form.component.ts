import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-scn-authorization-form',
  templateUrl: './scn-authorization-form.component.html',
  styleUrls: ['./scn-authorization-form.component.css']
})
export class ScnAuthorizationFormComponent implements OnInit {

  title="SCN Details";
  data : any = {};
  formInvalid : boolean = false;
  sa : any = {};
  T: any = {};
  d: any = {};
  CA: any = {};
  SCN_ID: any;
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
  SCNDetails: any = {};
  DistrictlistDep: any = {};
  fileToUpload: File;
  COMPLAINT_ID: any = {};
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {

    this.route.params.subscribe(params => {      
      this.SCN_ID = params['SCN_ID'];  
      this.mode =  params['mode'];   
        
        if(this.SCN_ID > 0){
            this.GetByIdSCNAuth(this.SCN_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View SCNRegistration  ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit SCNRegistration ";
    }  
  }
   



//employee details 
      GetSCNForTheId(SCN_ID) {
       
        this.data = this.userService.GetSCNForTheIdDetails1(SCN_ID);
        this.data.subscribe(
          (response: any) => {       
            this.SCNDetails = response;
            console.log("scn");
            console.log(response)
          })    
  
        }



         

         
//getbyid for view
GetByIdSCNAuth(SCN_ID) {

  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetByIdSCNAuth(SCN_ID);
  this.data.subscribe(
    (response: any) => {                 
      console.log("getbyid");
      console.log(response);
      this.sa = response; 
     this.GetSCNForTheId(this.SCN_ID)     
    
    //   if (this.sa.Rel_Date != null)
    //   this.sa.Rel_Date = ((this.sa.Rel_Date).split('T'))[0];

    // if (this.sa.DEPUT_ACT_REP_DATE != null)
    //   this.sa.DEPUT_ACT_REP_DATE = ((this.sa.DEPUT_ACT_REP_DATE).split('T'))[0];


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
UpdateSCNAuth(SCNAuth: NgForm) {         
        
  this.data = this.userService.UpdateSCNAuth(SCNAuth.value, this.SCN_ID);
  this.data.subscribe(
    (response) => {
      SCNAuth.reset();
      SCNAuth.resetForm();
      SCNAuth.form.markAsPristine();
      SCNAuth.form.markAsUntouched();    
         
      swal('Success!', ' SCNAutharazation updated Successfully .', 'success');
      document.getElementById('loader-spinner').style.display = "none";
      this.router.navigate(['/home/dept-enquiry/scn-auth']);
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
         this.sa.AUTH_BY = '';
          this.sa.AUTH_REMARKS = '';
          this.sa.AUTH_DATE = '';
          this.sa.MODIFIED_BY = '';
          this.sa.MODIFIED_DATE = '';
         
}


SaveSCNAuth(SCNAuth: NgForm){
  
}
      
}




