import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-external-enquiry-closure-form',
  templateUrl: './external-enquiry-closure-form.component.html',
  styleUrls: ['./external-enquiry-closure-form.component.css']
})
export class ExternalEnquiryClosureFormComponent implements OnInit {
  data: any = {};
  formInvalid: boolean = false;
  e: any = {};
  ProcList: any = [];
  p: any = {};
  aa: any = {};
  SCN_REPLY_ID: any;
  EMP_EMPLOYEE_ID: any;
  SClist: any = {};
  ProceedingDetails: any = {};
  SCklist: any = {};
  Districtlist: any = [];
  Emplist: any = {};
  EEN_ID: any;
  enqplist: any = [];
  C: any = {};
  c: any = {};
  SCNlist: any = {};
  Complist: any = {};
  tt: any = {};
  sc: any = {};
  fileToUpload: File;
  title: string;
  ChargeDetails: any = []
  mode: any;
  EId: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
  ) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.EEN_ID = params['EEN_ID'];

      this.mode = params['mode'];

      // if (this.EEN_ID > 0) {
      //   this.GetEnqExtDetails(this.EEN_ID)
      // }

      if (this.EEN_ID > 0) {
        this.GetByIdClosure(this.EEN_ID)
      }
    });

    if (this.mode == 'View') {
      this.title = "View Enq.Closure ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Enq.Closure ";
    }



  } 
  GetEnqExtDetails(EEN_ID) {
    
   
    this.data = this.userService.GetEnqExtDetails(EEN_ID);
    this.data.subscribe(
      (response: any) => {
        this.ProcList = response.Result;
        console.log("ProcList");
        console.log(this.ProcList);
      })
  }

 //save for proceeding
  GetByIdClosure(EEN_ID) {

   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdClosures(EEN_ID);
    this.data.subscribe(
      (response: any) => {
        this.e = response;
        this.e.EEC_RECOMM_BY = this.e.EEC_RECOMM_BYs;       
        this.e.EEC_COMMENT_BY = this.e.EEC_COMMENT_BYs;
        if (this.e.EEC_WEF != null)
        this.e.EEC_WEF = ((this.e.EEC_WEF).split('T'))[0];
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
  UpdateEXM(EXM){

  }

  SaveExam(EXM){

  }
  Cancel(){
    
  }
  //update
  UpdateIDE(IDE: NgForm) { 


    this.data = this.userService.UpdateextClosure(IDE.value, this.EEN_ID);
    this.data.subscribe(
      (response) => {
        IDE.reset();
        IDE.resetForm();
        IDE.form.markAsPristine();
        IDE.form.markAsUntouched();

        swal('Success!', ' External.Enq updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/dept-enquiry/initiative-depart/']);
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


//save 

  SaveClosure(Closure:any) {
    
    console.log("hi")
    console.log(Closure)
      Closure.EEN_ID=this.EId
          this.data = this.userService.PostClosures(Closure);
          this.data.subscribe(
            (response: any) => {
              swal('Success!', 'External Enq.Closure Added Successfully .', 'success');
              this.e={};                    
              // swal('Success!', 'External Enq.Closure Added Successfully .', 'success');
              this.router.navigate(['/home/dept-enquiry/ex-enquiry-closure-grid/']);
    
            })
    
      
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
 

}


