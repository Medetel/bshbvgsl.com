import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-training-details-form',
  templateUrl: './training-details-form.component.html',
  styleUrls: ['./training-details-form.component.css']
})
export class TrainingDetailsFormComponent implements OnInit {

  title="Add Employee Training";
  data : any = {};
  formInvalid : boolean = false;
  E : any = {};
  d: any = {};
  TRAINING_ID: any;
  EMP_EMPLOYEE_ID: any;
  // NMNT_ID : number;
  mode : string;
  NomineeDetails: any = {};
  EmployeeDetails: any = {};
  Districtlist: any = [];
  Emplist: any = {};
  DI_Id:number;
  T: any = {};
  Trainingtypelist: any = {};
  TrainingCategorylist: any = {};
  tt: any = {};
  tc: any = {};
  fileToUpload: File;
  datePipe: any;
  error: { isError: boolean; errorMessage: string; };
  isValidDate: boolean;
  Start_Date: any;
  End_Date: any;
  myDate = new Date();
  fromDate : any;
  toDate : any;
  routing : string = null;
  hide:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datepipe: DatePipe
    ) 
  { 

  }

  ngOnInit() {
  //  this.getdate();


  this.routing = localStorage.getItem('switchurl');
  localStorage.removeItem('switchurl');

   this.GetAllData();
    this.route.params.subscribe(params => {      
      this.TRAINING_ID = params['TRAINING_ID'];  
      this.mode =  params['mode'];   
        
        if(this.TRAINING_ID > 0){
           this.GetByIdTranee(this.TRAINING_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View Training Type ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit Training Type ";
    } 
    
    this.T.DivisionId = +localStorage.getItem('divisonId');
    this.GetEmployee(this.T.DivisionId);
  }
  //datevalidation
 getstartdate(startdate)
 {
   debugger;
   let sdate=new Date();
  if((startdate<=sdate)){
    swal('Warning!', "Start date", 'warning');
  }

  // if((this.Start_Date != null &&this.End_Date !=null) && (this.End_Date) < (this.Start_Date)){
  //   this.error={isError:true,errorMessage:'End date should be grater then start date.'};
  //   this.isValidDate = false;
  // }
  // return this.isValidDate;
}


  GetAllData() {
   debugger;
   this.data = this.userService.GetAllDistricts1();
   this.data.subscribe(
     (response: any) => {
       this.Districtlist = response.Result;
       
     })


     this.data = this.userService.GetAllTrainingType();
     this.data.subscribe(
       (response: any) => {
         this.Trainingtypelist = response.Result;
         
       })


       this.data = this.userService.GetAllCategorys();
       this.data.subscribe(
         (response: any) => {
           this.TrainingCategorylist = response.Result;
           
         })
    }

    

    GetEmployee(DI_Id) {
      debugger;
      this.data = this.userService.GetEmployee1(DI_Id);
      this.data.subscribe(
        (response: any) => {        
          this.Emplist = response;
        })
        this.EmployeeDetails.EMP_FIRST_NAME = null;
        this.EmployeeDetails.DI_District = null;
        this.EmployeeDetails.Department_Name = null;
        this.EmployeeDetails.desg_name = null;
        this.EmployeeDetails.EMP_CATEGORY = null;
        this.EmployeeDetails.EMP_GROUP = null;
        this.EmployeeDetails.EMP_TYPE = null;
         }

     


      GetEmployeeForTheId(EMP_EMPLOYEE_ID) {
        debugger;
        this.data = this.userService.GetEmployeeForTheId1(EMP_EMPLOYEE_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })
    
   
  
  
        }


        //upload file
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
                let i: any = document.getElementById('DOC_UPLOAD_PATH');
                i.value = "";
                if (error.status == 400) {
                  //this.FeasibilityPDFUrl = "assets/images/image-default.png";
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
      
      
      
        getFeasibilityDocBriefFUrl() {
          let imagename = null;
          try {
            imagename = document.getElementById('DOC_UPLOAD_PATH');
            console.log('CourtDoc file');
            console.log(imagename.files[0].name);
            return imagename.files[0].name;
          }
          catch (e) {
            return null;
          }
        }

        
        getFeasibilityDocBriefFUrlEdit() {
          let imagename = null;
          try {
            imagename = document.getElementById('DOC_UPLOAD_PATH');
            console.log('CourtDoc file');
            console.log(imagename.files[0].name);
            return imagename.files[0].name;
          }
          catch (e) {
            return null;
          }
        }
      
        SaveTRN(TRN: NgForm) {
         
          debugger;

           if (TRN.invalid) {
            this.formInvalid = true;
            swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
            return;
          }

          if((this.datepipe.transform(TRN.value.Start_Date, 'yyyy-MM-dd')) >= (this.datepipe.transform(this.myDate, 'yyyy-MM-dd'))){
            swal('Start Date is invalid');
            return;
            //EXM.value.Start_Date ='';                 
          }
    
          if((this.datepipe.transform(TRN.value.Start_Date, 'yyyy-MM-dd')) >= (this.datepipe.transform(TRN.value.End_Date, 'yyyy-MM-dd'))){
            swal('end Date should be greater than Start Date');
            return;
           //EXM.value.End_Date ='';                 
          }     
         
      
          else {
            console.log('Data');
            console.log(TRN.value);
            TRN.value.Upload = this.getFeasibilityDocBriefFUrl();
           
            this.data = this.userService.PostTRN(TRN.value);
            this.data.subscribe(
              (response) => {
                TRN.reset();
                TRN.resetForm();
                TRN.form.markAsPristine();
                TRN.form.markAsUntouched();
                swal('Success!', 'TraniningDetails Added Successfully .', 'success');
                this.router.navigate(['/home/training/']);
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
      


        // //update
        // UpdateNominee(TRN: NgForm) {         
                     
        //   this.data = this.userService.UpdateNominee(Nom.value, this.NMNT_ID);
        //   this.data.subscribe(
        //     (response) => {
        //       Nom.reset();
        //       Nom.resetForm();
        //       Nom.form.markAsPristine();
        //       Nom.form.markAsUntouched();    
                 
        //       swal('Success!', ' Nominee updated Successfully .', 'success');
        //       document.getElementById('loader-spinner').style.display = "none";
        //       this.router.navigate(['/home/nominationapp/']);
        //     }, (error) => {
        //       document.getElementById('loader-spinner').style.display = "none";
        //       if (error.status == 401 || error.status == 500) {
        //         this.errorHandler.handleError(error);
        //       }
        //       else if (error.status == 400) {
        //         swal('Warning!', error.error.Message, 'warning');
        //       }
        //     });
        // }
      
       
       
       
        GetByIdTranee(TRAINING_ID) {
          debugger;
      
          document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.GetByIdTRN(TRAINING_ID);
          this.data.subscribe(
            (response: any) => {                 
              console.log("getbyid");
              console.log(response);
              this.T = response; 

              this.GetEmployeeForTheId(response.EmpID)
              this.GetEmployee(response.DivisionId)

              if (this.T.Start_Date != null)
              this.T.Start_Date = ((this.T.Start_Date).split('T'))[0];
    
            if (this.T.End_Date != null)
              this.T.End_Date = ((this.T.End_Date).split('T'))[0];
    
            if (this.T.Cretification_Date != null)
              this.T.Cretification_Date = ((this.T.Cretification_Date).split('T'))[0];
    
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
        UpdateTRN(TRN: NgForm) {         
          TRN.value.Upload = this.getFeasibilityDocBriefFUrlEdit();           
          this.data = this.userService.UpdateTRN(TRN.value, this.TRAINING_ID);
          this.data.subscribe(
            (response) => {
              TRN.reset();
              TRN.resetForm();
              TRN.form.markAsPristine();
              TRN.form.markAsUntouched();    
                 
              swal('Success!', ' Training Details updated Successfully .', 'success');
              document.getElementById('loader-spinner').style.display = "none";
              this.router.navigate(['/home/training/']);
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
          this.T.DivisionId = '';
          this.T.EmpID = '';
          this.T.TrainingId = '';
          this.T.CategoryId = '';
          this.T.Conductedby = '';
          this.T.Registration = '';
          this.T.Subject = '';
          this.T.Start_Date = '';
          this.T.End_Date = '';
           this.T.Cretification_Date = '';
           this.T.Remarks = '';
        }

        Back(){   
          if(this.routing != null)
          this.router.navigate([this.routing]);
          else
          this.router.navigate(['/home/training']);    
        }
      

}


