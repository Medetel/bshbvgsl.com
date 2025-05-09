import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deputation-out-form',
  templateUrl: './deputation-out-form.component.html',
  styleUrls: ['./deputation-out-form.component.css']
})
export class DeputationOutFormComponent implements OnInit {

  title="Add Employee Deputation Out";  
  data : any = {};
  formInvalid : boolean = false;
  E : any = {};
  DP: any = {};
  d: any = {};
  DEPUTATION_ID: any;
  EMP_EMPLOYEE_ID: any;
  ReportList : any = {};
  mode : string;
  Trainingtypelist: any = {};
  TrainingCategorylist: any = {};
  EmployeeDetails: any = {};
  Districtlist: any = {};
  Emplist: any = {};
  DI_Id:number;
  N: any = {};
  dd: any = {};
  r: any = {};
  dd3: any = {};
  Depdentlist: any = {};
  Departmentlist: any = {};
  DistrictlistDep: any = {};
  fileToUpload: File;
  myDate = new Date();
  fromDate : any;
  toDate : any;
  hide:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datepipe: DatePipe  ) 
  { 

  }

  ngOnInit() {
   this.GetAllData();

    this.route.params.subscribe(params => {      
      this.DEPUTATION_ID = params['DEPUTATION_ID'];  
      this.mode =  params['mode'];   
        
        if(this.DEPUTATION_ID > 0){
           this.GetByIdDPT(this.DEPUTATION_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View Deputation Type ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit Deputation Type ";
    }  

    // this.E.DivisionId = +localStorage.getItem('divisonId');
    // this.GetEmployee(this.E.DivisionId);
  }

  ChangeTraining(TrainingId){
    this.E.Organization = null;
  }
  
  GetAllData() {
  
    this.data = this.userService.GetEmployeeDeputation();
    this.data.subscribe(
      (response: any) => {        
        this.Emplist = response;
      })


    this.data = this.userService.GetAllDistrictDeputation();
    this.data.subscribe(
      (response: any) => {
        this.Districtlist = response.Result;
        
      })
      this.data = this.userService.GetAllDistrictDeputationDEp();
      this.data.subscribe(
        (response: any) => {
          this.DistrictlistDep = response.Result;
          
        })
      this.data = this.userService.GetAllDeputType();
      this.data.subscribe(
        (response: any) => {
          this.Trainingtypelist = response.Result;
          console.log("type");
          console.log(response)
        })
        this.data = this.userService.GetAllReport();
        this.data.subscribe(
          (response: any) => {
            this.ReportList = response.Result;
            
          })
 
        this.data = this.userService.GetAllCategorysE();
        this.data.subscribe(
          (response: any) => {
            this.TrainingCategorylist = response.Result;
            
          })
     }
 
   

    // GetEmployee() {
    
    //   this.data = this.userService.GetEmployeeDeputation();
    //   this.data.subscribe(
    //     (response: any) => {        
    //       this.Emplist = response;
    //     })
    //      }
      

         GetDepartment(DI_Id) {
       
          this.data = this.userService.GetDepartment(DI_Id);
          this.data.subscribe(
            (response: any) => {        
              this.Departmentlist = response;
            })
             }
      GetEmployeeForTheId(EMP_EMPLOYEE_ID) {
      
        this.data = this.userService.GetEmployeeForTheIdDeputation(EMP_EMPLOYEE_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })
  
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
            data.append("depout", file.item(0));
            let x = this.userService.uploaddepout(data);
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


       
//cancel buton 
Cancel()
{
  this.E.DivisionId = '';
          this.E.EmpID = '';
          this.E.TrainingId = '';
          this.E.CategoryId = '';
          this.E.Documentdis = '';
          this.E.Registration = '';
          this.E.Subject = '';
          this.E.Start_Date = '';
          this.E.End_Date = '';
           this.E.Cretification_Date = '';
           this.E.discrioption = '';
}
    //save
    SaveDPT(DPT: NgForm) {
    
    
  
      // if((this.datepipe.transform(DPT.value.Rel_Date, 'yyyy-MM-dd')) < (this.datepipe.transform(this.myDate, 'yyyy-MM-dd'))){
      //   swal('Reporting Date is invalid');
      //   return;
      //   //EXM.value.Start_Date ='';                 
      // }
  
      // if((this.datepipe.transform(DPT.value.Rep_Date, 'yyyy-MM-dd')) < (this.datepipe.transform(DPT.value.Rel_Date, 'yyyy-MM-dd'))){
      //   swal('Relieving Date is invalid');
      //   return;
      //  //EXM.value.End_Date ='';                 
      // }
  
      console.log('EXM Forms');
      console.log(DPT.value);
  
      if (DPT.invalid) {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
  
      else {
        console.log('Data');
        console.log(DPT.value);   
        DPT.value.Upload1 = this.getFeasibilityDocBriefFUrl1();    
        this.data = this.userService.PostDPT(DPT.value);
        this.data.subscribe(
          (response) => {
            DPT.reset();
            DPT.resetForm();
            DPT.form.markAsPristine();
            DPT.form.markAsUntouched();
            swal('Success!', 'Deputation Added Successfully .', 'success');
            this.router.navigate(['/home/deputation/']);
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
  
//getbyid for view
GetByIdDPT(DEPUTATION_ID) {


  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetByIdDPT(DEPUTATION_ID);
  this.data.subscribe(
    (response: any) => {                 
      console.log("getbyid");
      console.log(response);
      this.E = response; 

      this.GetEmployeeForTheId(response.EmpID)
      // this.GetEmployee(response.DivisionId)
      this.GetDepartment(response.DivisionId1)
      if (this.E.Rel_Date != null)
      this.E.Rel_Date = ((this.E.Rel_Date).split('T'))[0];

    if (this.E.Rep_Date != null)
      this.E.Rep_Date = ((this.E.Rep_Date).split('T'))[0];


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
UpdateDPT(DPT: NgForm) {         
  DPT.value.Upload1 = this.getFeasibilityDocBriefFUrl1Edit();               
  this.data = this.userService.UpdateDPT(DPT.value, this.DEPUTATION_ID);
  this.data.subscribe(
    (response) => {
      DPT.reset();
      DPT.resetForm();
      DPT.form.markAsPristine();
      DPT.form.markAsUntouched();    
         
      swal('Success!', ' Deputation updated Successfully .', 'success');
      document.getElementById('loader-spinner').style.display = "none";
      this.router.navigate(['/home/deputation/']);
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


