import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-htc-ltc-form',
  templateUrl: './htc-ltc-form.component.html',
  styleUrls: ['./htc-ltc-form.component.css']
})
export class HtcLtcFormComponent implements OnInit {

  title="Add Employee HTC / LTC";
  data : any = {};
  formInvalid : boolean = false;
  h : any = {};
  d: any = {};
  W: any = {};
  LVCONS_ID: any;
  EMP_EMPLOYEE_ID: any;
  WitenssDetails: any = [];
  EmployeeDetails: any = {};
  Districtlist: any = [];
  Emplist: any = {};
  DI_Id:number;
  C: any = {};
  Trainingtypelist: any = {};
  TrainingCategorylist: any = {};
  tt: any = {};
  tc: any = {};
  fileToUpload: File;
  hide:any;
  mode: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {
   this.GetAllData();
    this.route.params.subscribe(params => {      
      this.LVCONS_ID = params['LVCONS_ID'];  
      this.mode =  params['mode'];   
        
        if(this.LVCONS_ID > 0){
             this.GetByIdHTC(this.LVCONS_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View HTC/LTC ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit HTC/LTC ";
    }  
    this.h.DivisionId = +localStorage.getItem('divisonId');
    this.GetEmployee(this.h.DivisionId);
  }

  GetAllData() {
 
   this.data = this.userService.GetAllDistrictsHTC();
   this.data.subscribe(
     (response: any) => {
       this.Districtlist = response.Result;
       
     })    

          }

    

    GetEmployee(DI_Id) {
     
      this.data = this.userService.GetEmployeeHTC(DI_Id);
      this.data.subscribe(
        (response: any) => {        
          this.Emplist = response;
        })
         }

     


      GetEmployeeForTheId(EMP_EMPLOYEE_ID) {
      
        this.data = this.userService.GetEmployeeForTheIdHTC(EMP_EMPLOYEE_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })   
  
  
        }

        //upload file
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
            data.append("UploadedImage", file.item(0));
            let x = this.userService.uploadImage1(data);
            x.subscribe(
              (response) => {
      
              }, (error) => {
                let i: any = document.getElementById('PHAR_DOC_UPLOAD_PATH');
                i.value = "";
                if (error.status == 400) {
                  //this.FeasibilityPDFUrl = "assets/images/image-default.png";
                  swal('Warning!', error.error.Message, 'warning');
                }
              });
          }
          else {
            let i: any = document.getElementById('PHAR_DOC_UPLOAD_PATH');
            i.value = "";
            if (!uploadedFilename.match(regex))
              swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
            else if (size > 2048)
              swal('Warning!', "Please upload image file less than 2mb", 'warning');
          }
        }
      
      
      
        getFeasibilityDocBriefFUrl() {
          let imagename = null;
          try {
            imagename = document.getElementById('COMPLNT_UPLOAD_PATH');
            console.log('CourtDoc file');
            console.log(imagename.files[0].name);
            return imagename.files[0].name;
          }
          catch (e) {
            return null;
          }
        }
      
        SaveHTC(HTC: NgForm) {          
       
            
          console.log('HTC Forms');
          console.log(HTC.value);
      
          if (HTC.invalid) {
            this.formInvalid = true;
            swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
            return;
          }
      
          else {            
            HTC.value.PHAR_DOC_UPLOAD_PATH = this.getFeasibilityDocBriefFUrl();
         
            // HTC.value.EMP_FIRST_NAME=this.EmployeeDetails.EMP_FIRST_NAME
            console.log('Data');
            console.log(HTC.value);

            this.data = this.userService.PostHTC(HTC.value);
            this.data.subscribe(
              (response) => {
                HTC.reset();
                HTC.resetForm();
                HTC.form.markAsPristine();
                HTC.form.markAsUntouched();
                swal('Success!', 'HTC/LTC Added Successfully .', 'success');
                this.router.navigate(['/home/emp-claims/htc-ltc/']);
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
         
        
        UpdateHTC(HTC: NgForm) {    
    
       
          HTC.value.PHAR_DOC_UPLOAD_PATH = this.getFeasibilityDocBriefFUrl();  
             
          // CMP.value.EMP_FIRST_NAME=this.EmployeeDetails.EMP_FIRST_NAME
        
          this.data = this.userService.UpdateHTC(HTC.value,this.LVCONS_ID);
              this.data.subscribe(
                (response) => {
                  HTC.reset();
                  HTC.resetForm();
                  HTC.form.markAsPristine();
                  HTC.form.markAsUntouched();            
                  
                  swal('Success!', ' HTC/LTC  updated Successfully .', 'success');
                  document.getElementById('loader-spinner').style.display = "none";   
                  this.router.navigate(['/home/emp-claims/htc-ltc/']) ;         
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
       
        GetByIdHTC(LVCONS_ID){
        
        
          document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.GetByIdHTC(LVCONS_ID);
          this.data.subscribe(
            (response: any) => {
              this.h = response;      
        
              if (this.h.CONS_AVAILED_DATE != null)
              this.h.CONS_AVAILED_DATE = ((this.h.CONS_AVAILED_DATE).split('T'))[0];             
                             
              this.GetEmployeeForTheId(response.EmpID)
              this.GetEmployee(response.DivisionId)
            
             
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
        Cancel(){
          
        }
}



