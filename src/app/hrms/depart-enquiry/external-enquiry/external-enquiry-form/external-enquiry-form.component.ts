import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-external-enquiry-form',
  templateUrl: './external-enquiry-form.component.html',
  styleUrls: ['./external-enquiry-form.component.css']
})
export class ExternalEnquiryFormComponent implements OnInit {
  title=" Departmental Exam"; 
  data : any = {};
  formInvalid : boolean = false;
  E : any = {};
  d: any = {};
  EEN_ID: any;
  EMP_EMPLOYEE_ID: any;
  // NMNT_ID : number;
  mode : string;
  Trainingtypelist: any = {};
  TrainingCategorylist: any = {};
  EmployeeDetails: any = {};
  Districtlist: any = [];
  Emplist: any = {};
  DI_Id:number;
  N: any = {};  
  fileToUpload: File;
  myDate = new Date();
  fromDate : any;
  toDate : any;
  hide: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datepipe: DatePipe  ) 
  { 

  }

  ngOnInit() {
   this.GetAllData();
    this.route.params.subscribe(params => {      
      this.EEN_ID = params['EEN_ID'];  
      this.mode =  params['mode'];   
        
        if(this.EEN_ID > 0){
           this.GetByIdEXM(this.EEN_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View External Enq Type ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit External Enq Type ";
    }  
    this.E.DivisionId = +localStorage.getItem('divisonId');
    this.GetEmployee(this.E.DivisionId);
  }

  public show1:boolean = false;

  toggle(){
    this.show1 = !this.show1;
  }

 
  GetAllData() {
   
    this.data = this.userService.GetAllDistrictExam();
    this.data.subscribe(
      (response: any) => {
        this.Districtlist = response.Result;
        
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
            let x = this.userService.uploadImageenq(data);
            x.subscribe(
              (response) => {
      
              }, (error) => {
                let i: any = document.getElementById('EEN_COMP_UPLOAD');
                i.value = "";
                if (error.status == 400) {
                  //this.FeasibilityPDFUrl = "assets/images/image-default.png";
                  swal('Warning!', error.error.Message, 'warning');
                }
              });
          }
          else {
            let i: any = document.getElementById('EEN_COMP_UPLOAD');
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
            imagename = document.getElementById('EEN_COMP_UPLOAD');
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
            imagename = document.getElementById('EEN_COMP_UPLOAD');
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
          this.E.EEN_INTIAT_BY = '';
          this.E.EEN_COMPLAIMNT_DATE = '';
          this.E.EEN_NATURE_COMP = '';
          this.E.EEN_CHARGES_LAID = '';
          this.E.EEN_SEVERTY = '';
          this.E.EEN_REMARKS = '';
          this.E.EEN_COMP_UPLOAD = '';
          //  this.E.Cretification_Date = '';
          //  this.E.discrioption = '';
}
    //save
    SaveExam(EXM: NgForm) {  
  
      if (EXM.invalid) {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
  
      else {
        console.log('Data');
        console.log(EXM.value);
        EXM.value.EEN_COMP_UPLOAD = this.getFeasibilityDocBriefFUrl1(); 
        
        EXM.value.EEN_UPLOAD = this.getFeasibilityDocBriefFUrl2();
        EXM.value.EEN_Other_UPLOAD = this.getFeasibilityDocBriefFUrl3();
        EXM.value.EEN_OM_UPLOAD = this.getFeasibilityDocBriefFUrl4();
        this.data = this.userService.PostExternal(EXM.value);
        this.data.subscribe(
          (response) => {
            EXM.reset();
            EXM.resetForm();
            EXM.form.markAsPristine();
            EXM.form.markAsUntouched();
            swal('Success!', 'External.Enq Added Successfully .', 'success');
            this.router.navigate(['/home/dept-enquiry/external-enquiry-grid/']);
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
GetByIdEXM(EEN_ID) {
  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetByIdExternal(EEN_ID);
  this.data.subscribe(
    (response: any) => {                 
      console.log("getbyid");
      console.log(response);
      this.E = response; 

      this.GetEmployeeForTheId(response.EmpID)
      this.GetEmployee(response.DivisionId)    

      if (this.E.EEN_COMPLAIMNT_DATE != null)
      this.E.EEN_COMPLAIMNT_DATE = ((this.E.EEN_COMPLAIMNT_DATE).split('T'))[0];

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
UpdateEXM(EXM: NgForm) {         
             
  EXM.value.EEN_COMP_UPLOAD = this.getFeasibilityDocBriefFUrl1(); 
        
  EXM.value.EEN_UPLOAD = this.getFeasibilityDocBriefFUrl2Edit();
  EXM.value.EEN_Other_UPLOAD = this.getFeasibilityDocBriefFUrl3Edit();
  EXM.value.EEN_OM_UPLOAD = this.getFeasibilityDocBriefFUrl4Edit();

  this.data = this.userService.UpdateExternal(EXM.value, this.EEN_ID);
  this.data.subscribe(
    (response) => {
      EXM.reset();
      EXM.resetForm();
      EXM.form.markAsPristine();
      EXM.form.markAsUntouched();    
         
      swal('Success!', ' External.Enq updated Successfully .', 'success');
      document.getElementById('loader-spinner').style.display = "none";
      this.router.navigate(['/home/dept-enquiry/external-enquiry-grid/']);
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
  
//upload for een_upload

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
    let x = this.userService.uploadImageenq(data);
    x.subscribe(
      (response) => {

      }, (error) => {
        let i: any = document.getElementById('EEN_UPLOAD');
        i.value = "";
        if (error.status == 400) {
          //this.FeasibilityPDFUrl = "assets/images/image-default.png";
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }
  else {
    let i: any = document.getElementById('EEN_UPLOAD');
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
    imagename = document.getElementById('EEN_UPLOAD');
    console.log('CourtDoc file');
    console.log(imagename.files[0].name);
    return imagename.files[0].name;
  }
  catch (e) {
    return null;
  }
}


getFeasibilityDocBriefFUrl2Edit() {
  let imagename = null;
  try {
    imagename = document.getElementById('EEN_UPLOAD');
    console.log('CourtDoc file');
    console.log(imagename.files[0].name);
    return imagename.files[0].name;
  }
  catch (e) {
    return null;
  }
}



//other upload

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
    let x = this.userService.uploadImageenq(data);
    x.subscribe(
      (response) => {

      }, (error) => {
        let i: any = document.getElementById('EEN_Other_UPLOAD');
        i.value = "";
        if (error.status == 400) {
          //this.FeasibilityPDFUrl = "assets/images/image-default.png";
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }
  else {
    let i: any = document.getElementById('EEN_Other_UPLOAD');
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
    imagename = document.getElementById('EEN_Other_UPLOAD');
    console.log('CourtDoc file');
    console.log(imagename.files[0].name);
    return imagename.files[0].name;
  }
  catch (e) {
    return null;
  }
}

getFeasibilityDocBriefFUrl3Edit() {
  let imagename = null;
  try {
    imagename = document.getElementById('EEN_Other_UPLOAD');
    console.log('CourtDoc file');
    console.log(imagename.files[0].name);
    return imagename.files[0].name;
  }
  catch (e) {
    return null;
  }
}


//om upload
imageUpload4(file: FileList) {
      
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
    let x = this.userService.uploadImageenq(data);
    x.subscribe(
      (response) => {

      }, (error) => {
        let i: any = document.getElementById('EEN_OM_UPLOAD');
        i.value = "";
        if (error.status == 400) {
          //this.FeasibilityPDFUrl = "assets/images/image-default.png";
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }
  else {
    let i: any = document.getElementById('EEN_OM_UPLOAD');
    i.value = "";
    if (!uploadedFilename.match(regex))
      swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
    else if (size > 2048)
      swal('Warning!', "Please upload image file less than 2mb", 'warning');
  }
}
getFeasibilityDocBriefFUrl4() {
  let imagename = null;
  try {
    imagename = document.getElementById('EEN_OM_UPLOAD');
    console.log('CourtDoc file');
    console.log(imagename.files[0].name);
    return imagename.files[0].name;
  }
  catch (e) {
    return null;
  }
}

getFeasibilityDocBriefFUrl4Edit() {
  let imagename = null;
  try {
    imagename = document.getElementById('EEN_OM_UPLOAD');
    console.log('CourtDoc file');
    console.log(imagename.files[0].name);
    return imagename.files[0].name;
  }
  catch (e) {
    return null;
  }
}




}


