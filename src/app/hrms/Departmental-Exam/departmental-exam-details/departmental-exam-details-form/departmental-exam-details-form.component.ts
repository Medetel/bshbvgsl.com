import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms/src/forms';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-departmental-exam-details-form',
  templateUrl: './departmental-exam-details-form.component.html',
  styleUrls: ['./departmental-exam-details-form.component.css']
})
export class DepartmentalExamDetailsFormComponent implements OnInit {

  title=" Departmental Exam"; 
  data : any = {};
  formInvalid : boolean = false;
  E : any = {};
  d: any = {};
  EXAMINATION_ID: any;
  EMP_EMPLOYEE_ID: any;
  // NMNT_ID : number;
  mode : string;
  Trainingtypelist: any = {};
  TrainingCategorylist: any = {};
  EmployeeDetails: any = {};
  Districtlist: any = {};
  Emplist: any = {};
  DI_Id:number;
  N: any = {};
  dd: any = {};
  dd2: any = {};
  dd3: any = {};
  Depdentlist: any = {};
  Depdentlist2: any = {};
  Depdentlist3: any = {};
  fileToUpload: File;
  myDate = new Date();
  fromDate : any;
  toDate : any;
  routing : string = null;
  hide:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datepipe: DatePipe  ) 
  { 

  }

  ngOnInit() {

    this.routing = localStorage.getItem('switchurl');
    localStorage.removeItem('switchurl');

   this.GetAllData();
    this.route.params.subscribe(params => {      
      this.EXAMINATION_ID = params['EXAMINATION_ID'];  
      this.mode =  params['mode'];   
        
        if(this.EXAMINATION_ID > 0){
           this.GetByIdEXM(this.EXAMINATION_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View DepartmentExam Type ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit DepartmentExam Type ";
    }  
    this.E.DivisionId = +localStorage.getItem('divisonId');
    this.GetEmployee(this.E.DivisionId);
  }

 
  GetAllData() {
   
    this.data = this.userService.GetAllDistrictExam();
    this.data.subscribe(
      (response: any) => {
        this.Districtlist = response.Result;
        
      })
 
 
      this.data = this.userService.GetAllExamType();
      this.data.subscribe(
        (response: any) => {
          this.Trainingtypelist = response.Result;
          console.log("type");
          console.log(response)
        })
 
 
        this.data = this.userService.GetAllCategorysE();
        this.data.subscribe(
          (response: any) => {
            this.TrainingCategorylist = response.Result;
            
          })
     }
 
   

    GetEmployee(DI_Id) {
 
      this.data = this.userService.GetEmployeeExam(DI_Id);
      this.data.subscribe(
        (response: any) => {        
          this.Emplist = response;
        })
         }
      
      GetEmployeeForTheId(EMP_EMPLOYEE_ID) {
   
        this.data = this.userService.GetEmployeeForTheIdExam(EMP_EMPLOYEE_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })
    
   
  
  
        }




        //upload for certificate
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
      //upload for other doc
       //upload file
       imageUpload2(file: FileList) {
    
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
              let i: any = document.getElementById('Upload2');
              i.value = "";
              if (error.status == 400) {
                //this.FeasibilityPDFUrl = "assets/images/image-default.png";
                swal('Warning!', error.error.Message, 'warning');
              }
            });
        }
        else {
          let i: any = document.getElementById('Upload2');
          i.value = "";
          if (!uploadedFilename.match(regex))
            swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
          else if (size > 2048)
            swal('Warning!', "Please upload image file less than 2mb", 'warning');
        }
      }
      getFeasibilityDocBriefFUrl2() {
        let imagename = null;
        try {
          imagename = document.getElementById('Upload2');
          console.log('CourtDoc file');
          console.log(imagename.files[0].name);
          return imagename.files[0].name;
        }
        catch (e) {
          return null;
        }
      }
    //upload for doc
     //upload file
     imageUpload3(file: FileList) {
    
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
            let i: any = document.getElementById('Upload3');
            i.value = "";
            if (error.status == 400) {
              //this.FeasibilityPDFUrl = "assets/images/image-default.png";
              swal('Warning!', error.error.Message, 'warning');
            }
          });
      }
      else {
        let i: any = document.getElementById('Upload3');
        i.value = "";
        if (!uploadedFilename.match(regex))
          swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
        else if (size > 2048)
          swal('Warning!', "Please upload image file less than 2mb", 'warning');
      }
    }
    getFeasibilityDocBriefFUrl3() {
      let imagename = null;
      try {
        imagename = document.getElementById('Upload3');
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
    SaveExam(EXM: NgForm) {
    
    
  
      if((this.datepipe.transform(EXM.value.Start_Date, 'yyyy-MM-dd')) >= (this.datepipe.transform(this.myDate, 'yyyy-MM-dd'))){
        swal('Start Date is invalid');
        return;
        //EXM.value.Start_Date ='';                 
      }

      if((this.datepipe.transform(EXM.value.Start_Date, 'yyyy-MM-dd')) >= (this.datepipe.transform(EXM.value.End_Date, 'yyyy-MM-dd'))){
        swal('end Date should be greater than Start Date');
        return;
       //EXM.value.End_Date ='';                 
      }
  

      console.log('EXM Forms');
      console.log(EXM.value);
  
      if (EXM.invalid) {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
  
      else {
        console.log('Data');
        console.log(EXM.value);
        EXM.value.Upload1 = this.getFeasibilityDocBriefFUrl1();
        EXM.value.Upload2 = this.getFeasibilityDocBriefFUrl2();
        EXM.value.Upload3 = this.getFeasibilityDocBriefFUrl3();
        this.data = this.userService.PostEXM(EXM.value);
        this.data.subscribe(
          (response) => {
            EXM.reset();
            EXM.resetForm();
            EXM.form.markAsPristine();
            EXM.form.markAsUntouched();
            swal('Success!', 'ExamDepartment Added Successfully .', 'success');
            this.router.navigate(['/home/deptexam/']);
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
GetByIdEXM(EXAMINATION_ID) {


  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetByIdEXM(EXAMINATION_ID);
  this.data.subscribe(
    (response: any) => {                 
      console.log("getbyid");
      console.log(response);
      this.E = response; 

      this.GetEmployeeForTheId(response.EmpID)
      this.GetEmployee(response.DivisionId)

      if (this.E.Start_Date != null)
      this.E.Start_Date = ((this.E.Start_Date).split('T'))[0];

    if (this.E.End_Date != null)
      this.E.End_Date = ((this.E.End_Date).split('T'))[0];

    if (this.E.Cretification_Date != null)
      this.E.Cretification_Date = ((this.E.Cretification_Date).split('T'))[0];

      if (this.E.Registration_Date != null)
      this.E.Registration_Date = ((this.E.Registration_Date).split('T'))[0];

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
UpdateEXM(Nom: NgForm) {         
             
  this.data = this.userService.UpdateEXM(Nom.value, this.EXAMINATION_ID);
  this.data.subscribe(
    (response) => {
      Nom.reset();
      Nom.resetForm();
      Nom.form.markAsPristine();
      Nom.form.markAsUntouched();    
         
      swal('Success!', ' DepartmentExam updated Successfully .', 'success');
      document.getElementById('loader-spinner').style.display = "none";
      this.router.navigate(['/home/deptexam/']);
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


Back(){   
  if(this.routing != null)
  this.router.navigate([this.routing]);
  else
  this.router.navigate(['/home/deptexam']);    
}

      
}


