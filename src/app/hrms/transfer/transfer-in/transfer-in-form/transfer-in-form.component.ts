import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transfer-in-form',
  templateUrl: './transfer-in-form.component.html',
  styleUrls: ['./transfer-in-form.component.css']
})
export class TransferInFormComponent implements OnInit {

  title="Transfer Order Details";
  data : any = {};
  formInvalid : boolean = false;
  E : any = {};
  T: any = {};
  d: any = {};
  transfer_id: any;
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
      this.transfer_id = params['transfer_id'];  
      this.mode =  params['mode'];   
        
        if(this.transfer_id > 0){
           this.GetByIdTRFAuth(this.transfer_id)
        }    
    });

    if(this.mode=='View'){
      this.title = "View Transfer Reporting Type ";
    }
    else if(this.mode=='Edit'){
      this.title = "Transfer Reporting  ";
    }  
  }
   
GetAlldata(){
 
  this.data = this.userService.GetAllTime();
  this.data.subscribe(
    (response: any) => {
      this.Trainingtypelist = response.Result;
      
    })
}
      GetEmployeeForTheId(EMP_DIVISION_ID) {
       
        this.data = this.userService.GetEmployeeForTheIdDetailTs(EMP_DIVISION_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })    
  
        }


        GetEmployeeForTheIdTo(EMP_EMPLOYEE_ID) {
        
          this.data = this.userService.GetEmployeeForTheIdDetailsTO1(EMP_EMPLOYEE_ID);
          this.data.subscribe(
            (response: any) => {       
              this.EmployeeDetailsTO = response;
            })    
    
          }
          SaveDPT(dsd){

          }
          Cancel(){
            
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
              data.append("trnsreporting", file.item(0));
              let x = this.userService.uploadImagetrnsrep(data);
              x.subscribe(
                (response) => {
        
                }, (error) => {
                  let i: any = document.getElementById('repdoc');
                  i.value = "";
                  if (error.status == 400) {
                    //this.FeasibilityPDFUrl = "assets/images/image-default.png";
                    swal('Warning!', error.error.Message, 'warning');
                  }
                });
            }
            else {
              let i: any = document.getElementById('repdoc');
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
              imagename = document.getElementById('repdoc');
              console.log('CourtDoc file');
              console.log(imagename.files[0].name);
              return imagename.files[0].name;
            }
            catch (e) {
              return null;
            }
          }
          
           
          getFeasibilityDocBriefFUrl1Edit() {
            let imagename = null;
            try {
              imagename = document.getElementById('repdoc');
              console.log('CourtDoc file');
              console.log(imagename.files[0].name);
              return imagename.files[0].name;
            }
            catch (e) {
              return null;
            }
          }





//getbyid for view
GetByIdTRFAuth(transfer_id) {
 


  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetByIdTRFA(transfer_id);
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
UpdateTRFIn(DPT: NgForm) {         
  DPT.value.repdoc = this.getFeasibilityDocBriefFUrl1Edit();         
  this.data = this.userService.UpdateTRFIn(DPT.value, this.transfer_id);
  this.data.subscribe(
    (response) => {
      DPT.reset();
      DPT.resetForm();
      DPT.form.markAsPristine();
      DPT.form.markAsUntouched();    
         
      swal('Success!', ' Transfer Reportring updated Successfully .', 'success');
      document.getElementById('loader-spinner').style.display = "none";
      this.router.navigate(['/home/transfer/transferin/']);
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



