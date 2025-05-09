import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
  selector: 'app-medical-reimburesment',
  templateUrl: './medical-reimburesment.component.html',
  styleUrls: ['./medical-reimburesment.component.css']
})
export class MedicalReimburesmentComponent implements OnInit {
  title="Add Medical Reimburshment ";  
  data : any = {};
  formInvalid : boolean = false;
  m : any = {};
  h: any = {};
  d: any = {};
  H: any = {};
  P: any = {};
  p: any = {};
  MEDI_CLAIM_ID: any;
  EMP_EMPLOYEE_ID: any;
  patientlist : any = [];
  mode : string;
  HOSPITAL_ID: any = {};
  TrainingCategorylist: any = {};
  EmployeeDetails: any = {};
  Districtlist: any = {};
  Emplist: any = {};
  DI_Id:number;
  N: any = {};
  dd: any = {};
  r: any = {};
  HosptalDetails: any = [];
  PharmcyDetails: any = [];
  Depdentlist: any = {};
  Departmentlist: any = {};
  hsptltlist: any = {};
  fileToUpload: File;
  hide:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {
   this.GetAllData();
    this.route.params.subscribe(params => {      
      this.MEDI_CLAIM_ID = params['MEDI_CLAIM_ID'];  
      this.mode =  params['mode'];   
        
        if(this.MEDI_CLAIM_ID > 0){
            this.GetByIdMRB(this.MEDI_CLAIM_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View Medical Reimburshment ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit Medical Reimburshment ";
    }  
    this.m.DivisionId = +localStorage.getItem('divisonId');
    this.GetEmployee(this.m.DivisionId);
  }

 
  
  GetAllData() {
    debugger;
    this.data = this.userService.GetAllDistrictMedical();
    this.data.subscribe(
      (response: any) => {
        this.Districtlist = response.Result;
        
      })      

      //patientlist
      this.data = this.userService.GetAllhsptllMedical();
      this.data.subscribe(
        (response: any) => {
          this.hsptltlist = response.Result;
          
        }) 
       
     }
 
   

    GetEmployee(DI_Id) {
      debugger;
      this.data = this.userService.GetEmployeeMedical(DI_Id);
      this.data.subscribe(
        (response: any) => {        
          this.Emplist = response;
        })
         }
      

        
      GetEmployeeForTheId(EMP_EMPLOYEE_ID) {
        debugger;
        this.data = this.userService.GetEmployeeForTheIdMedical(EMP_EMPLOYEE_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })
    
    
        }
        

        AddHsptlDetails(H) {
          debugger;
          this.H.HSP_DOC_UPLOAD_PATH=this.getFeasibilityDocBriefFUrlInHsptl();
        //  this.H.HOSPITAL_ID= this.HOSPITAL_ID
              console.log('hsptl Details');
              console.log(H)              
              if ((H.HOSPITAL_ID != null || H.HOSPITAL_ID != undefined) && (H.DOCTOR_NAME != null || H.DOCTOR_NAME != undefined)
              && (H.CONSULT_DATE != null || H.CONSULT_DATE != undefined) && (H.ADMIT_DATE != null || H.ADMIT_DATE != undefined)
              && (H.DISCHARGE_DATE != null || H.DISCHARGE_DATE != undefined)&& (H.BILL_NO != null || H.BILL_NO != undefined)
              && (H.BILL_DATE != null || H.BILL_DATE != undefined)
              && (H.BILL_AMOUNT != null || H.BILL_AMOUNT != undefined)  
              && (H.MOU != null || H.MOU != undefined) && (this.H.HSP_DOC_UPLOAD_PATH != null || this.H.HSP_DOC_UPLOAD_PATH != undefined)){
                let temp = {
                  HOSPITAL_ID: H.HOSPITAL_ID,
                  DOCTOR_NAME: H.DOCTOR_NAME,
                  CONSULT_DATE: H.CONSULT_DATE,

                  ADMIT_DATE: H.ADMIT_DATE,
                  DISCHARGE_DATE: H.DISCHARGE_DATE,
                  BILL_NO: H.BILL_NO,

                  BILL_DATE: H.BILL_DATE,
                  BILL_AMOUNT: H.BILL_AMOUNT,                 
                   MOU: H.MOU,
                  HSP_DOC_UPLOAD_PATH: this.H.HSP_DOC_UPLOAD_PATH,
                
                }
          
                this.HosptalDetails.push(temp);
               
                this.H = {};
          
          
                console.log('HosptalDetails');
                console.log(this.HosptalDetails);
              }
          
              else {
                swal('warning', 'Please enter mandatory fields!', 'warning');
              }
            }

          //add
          ClearHosptl() {
            this.H = {};
          }



          hsptlDetailsremove(i){ 
            swal({
              title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
            })     
            this.HosptalDetails.splice(i, 1);      
           }  


           //pharmacy
           AddPharmacyDetails(p) {
            debugger;
              this.p.PHAR_DOC_UPLOAD_PATH=this.getFeasibilityDocBriefFUrlInPharmcy();
                console.log('hsptl Details');
                console.log(p)              
                if ((p.PHARMACY_NAME != null || p.PHARMACY_NAME != undefined) && (p.BILL_NO != null || p.BILL_NO != undefined)
                && (p.BILL_DATE != null || p.BILL_DATE != undefined) && (p.BILL_AMOUNT != null || p.BILL_AMOUNT != undefined) 
                 && (this.p.PHAR_DOC_UPLOAD_PATH != null || this.p.PHAR_DOC_UPLOAD_PATH != undefined)){
                  let temp = {
                    PHARMACY_NAME: p.PHARMACY_NAME,
                    BILL_NO: p.BILL_NO,
                    BILL_DATE: p.BILL_DATE,
  
                    BILL_AMOUNT: p.BILL_AMOUNT,
                    PHAR_DOC_UPLOAD_PATH: this.p.PHAR_DOC_UPLOAD_PATH,
                    // CONSULT_DATE: H.CONSULT_DATE,
                  
                  }
            
                  this.PharmcyDetails.push(temp);
                 
                  this.H = {};
            
            
                  console.log('PharmcyDetails');
                  console.log(this.PharmcyDetails);
                }
            
                else {
                  swal('warning', 'Please enter mandatory fields!', 'warning');
                }
              }
  
            //add
            ClearPharmcy() {
              this.H = {};
            }


            PharmcyDetailsremove(i){ 
              swal({
                title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
              })     
              this.PharmcyDetails.splice(i, 1);      
             }  



        imageUploadM(file: FileList) {
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
            let x = this.userService.uploadImageM(data);
            x.subscribe(
              (response) => {
      
              }, (error) => {
                let i: any = document.getElementById('DOC_Upload');
                i.value = "";
                if (error.status == 400) {
                  //this.FeasibilityPDFUrl = "assets/images/image-default.png";
                  swal('Warning!', error.error.Message, 'warning');
                }
              });
          }
          else {
            let i: any = document.getElementById('DOC_Upload');
            i.value = "";
            if (!uploadedFilename.match(regex))
              swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
            else if (size > 2048)
              swal('Warning!', "Please upload image file less than 2mb", 'warning');
          }
        }
        getFeasibilityDocBriefFUrlInmedical() {
          let imagename = null;
          try {
            imagename = document.getElementById('DOC_Upload');
            console.log('CourtDoc file');
            console.log(imagename.files[0].name);
            return imagename.files[0].name;
          }
          catch (e) {
            return null;
          }
        }
       
        //upload for hsptl
        
        imageUploadH(file: FileList) {
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
            let x = this.userService.uploadImageM(data);
            x.subscribe(
              (response) => {
      
              }, (error) => {
                let i: any = document.getElementById('HSP_DOC_UPLOAD_PATH');
                i.value = "";
                if (error.status == 400) {
                  //this.FeasibilityPDFUrl = "assets/images/image-default.png";
                  swal('Warning!', error.error.Message, 'warning');
                }
              });
          }
          else {
            let i: any = document.getElementById('HSP_DOC_UPLOAD_PATH');
            i.value = "";
            if (!uploadedFilename.match(regex))
              swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
            else if (size > 2048)
              swal('Warning!', "Please upload image file less than 2mb", 'warning');
          }
        }
        getFeasibilityDocBriefFUrlInHsptl() {
          let imagename = null;
          try {
            imagename = document.getElementById('HSP_DOC_UPLOAD_PATH');
            console.log('CourtDoc file');
            console.log(imagename.files[0].name);
            return imagename.files[0].name;
          }
          catch (e) {
            return null;
          }
        }
       

         //upload for pharmcy
        
         imageUploadP(file: FileList) {
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
            let x = this.userService.uploadImageM(data);
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
        getFeasibilityDocBriefFUrlInPharmcy() {
          let imagename = null;
          try {
            imagename = document.getElementById('PHAR_DOC_UPLOAD_PATH');
            console.log('CourtDoc file');
            console.log(imagename.files[0].name);
            return imagename.files[0].name;
          }
          catch (e) {
            return null;
          }
        }
//cancel buton 
// Cancel()
// {
//   this.E.DivisionId = '';
//           this.E.EmpID = '';
//           this.E.TrainingId = '';
//           this.E.CategoryId = '';
//           this.E.Documentdis = '';
//           this.E.Registration = '';
//           this.E.Subject = '';
//           this.E.Start_Date = '';
//           this.E.End_Date = '';
//            this.E.Cretification_Date = '';
//            this.E.discrioption = '';
// }


BindData(CLAIM_FOR:any,EmpID:any)
  {
    debugger
    if(CLAIM_FOR=='S'){
    this.m.PATIENT_NAME=this.EmployeeDetails.EMP_FIRST_NAME
    }
  else{
      this.get(EmpID)
      }

  }


get(EMP_EMPLOYEE_ID) {
  debugger;
  this.data = this.userService.GetAllPatientMedical(EMP_EMPLOYEE_ID);
  this.data.subscribe(
    (response: any) => {       
      this.patientlist = response;
    })


  }

    //save
    SaveMedical(Medical: NgForm) {

      debugger;
  
      console.log('Medical Forms');
      console.log(Medical.value);
  
      if (Medical.invalid) {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
  
      else {
        console.log('Data');
        console.log(Medical.value);   
        Medical.value.HospitalModel=this.HosptalDetails;
        Medical.value.PharmcyModel=this.PharmcyDetails;
        Medical.value.DOC_Upload = this.getFeasibilityDocBriefFUrlInmedical();    
        this.data = this.userService.PostMedical(Medical.value);
        this.data.subscribe(
          (response) => {
            Medical.reset();
            Medical.resetForm();
            Medical.form.markAsPristine();
            Medical.form.markAsUntouched();
            swal('Success!', 'Medical Reimburesment Added Successfully .', 'success');
            this.router.navigate(['/home/emp-claims/']);
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
GetByIdMRB(MEDI_CLAIM_ID) {
  debugger; 

  this.HosptalDetails = this.H.HospitalModel;
  this.PharmcyDetails = this.p.PharmcyModel;
  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetByIdMRB(MEDI_CLAIM_ID);
  this.data.subscribe(
    (response: any) => {                 
      console.log("getbyid");
      console.log(response);
      this.m = response; 

      this.GetEmployeeForTheId(response.EmpID)
      this.GetEmployee(response.DivisionId)
      // this.GetDepartment(response.DivisionId1)
      if (this.m.Rel_Date != null)
      this.m.Rel_Date = ((this.m.Rel_Date).split('T'))[0];

    if (this.m.Rep_Date != null)
      this.m.Rep_Date = ((this.m.Rep_Date).split('T'))[0];


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
UpdateMedical(Medical: NgForm) {         
  Medical.value.HospitalModel=this.HosptalDetails;
  Medical.value.PharmcyModel=this.PharmcyDetails;      
  this.data = this.userService.UpdateMRB(Medical.value, this.MEDI_CLAIM_ID);
  this.data.subscribe(
    (response) => {
      Medical.reset();
      Medical.resetForm();
      Medical.form.markAsPristine();
      Medical.form.markAsUntouched();    
         
      swal('Success!', ' Medical Reimbursment updated Successfully .', 'success');
      document.getElementById('loader-spinner').style.display = "none";
      this.router.navigate(['/home/emp-claims/']);
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