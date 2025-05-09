import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-complaints-reg-form',
  templateUrl: './complaints-reg-form.component.html',
  styleUrls: ['./complaints-reg-form.component.css']
})
export class ComplaintsRegFormComponent implements OnInit {
  data: any = {};
  formInvalid: boolean = false;
  E: any = {};
  d: any = {};
  W: any = {};
  COMPLAINT_ID: any;
  EMP_EMPLOYEE_ID: any;
  WitenssDetails: any = [];
  EmployeeDetails: any = {};
  Districtlist: any = [];
  Emplist: any = [];
  DI_Id: number;
  C: any = {};
  Trainingtypelist: any = {};
  TrainingCategorylist: any = {};
  tt: any = {};
  tc: any = {};
  fileToUpload: File;
  title: string;
  mode: any;
  scnmode: any;
  back: string = '';
  back1: string = '';
  myDate = new Date();
  fromDate: any;
  toDate: any;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(new Date().setDate(new Date().getDate() - 1))
  Scn_Id: number;
  EnqId: number;
  hide: boolean;

  constructor(private userService: UserService, private router: Router, private datepipe: DatePipe, private route: ActivatedRoute, private errorHandler: ErrorHandler,
  ) {

  }

  ngOnInit() {
    debugger
    this.GetAllData();
    this.route.params.subscribe(params => {
      this.COMPLAINT_ID = params['COMPLAINT_ID'];
      this.mode = params['mode'];
      this.back = params['back'];

    });

    if (this.mode == 'View') {
      this.title = "View Complaint Registration ";
      this.hide = true;
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Complaint Registration ";
    }

    //this.back = localStorage.getItem('Back');
    // localStorage.removeItem('Back')

    // this.back1 = localStorage.getItem('Back1');
    // localStorage.removeItem('Back1')

    if (+localStorage.getItem('Id') > 0) {
      this.COMPLAINT_ID = +localStorage.getItem('Id');
      localStorage.removeItem('Id')
    }

    this.Scn_Id = +localStorage.getItem('SCN_ID');
    localStorage.removeItem('SCN_ID')


    this.EnqId = +localStorage.getItem('ENQUIRY_ID');

    localStorage.removeItem('ENQUIRY_ID')






    this.scnmode = +localStorage.getItem('mode');
    localStorage.removeItem('mode')



    if (this.COMPLAINT_ID > 0) {
      this.GetByIdComplaintReg(this.COMPLAINT_ID)
    }

    // this.C.DivisionId = +localStorage.getItem('divisonId');
    // this.GetEmployee(this.C.DivisionId);

  }

  GetAllData() {

    this.data = this.userService.GetAllDistrictsCmp();
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

  Cancel(){
    
  }

  GetEmployee(DI_Id) {

    this.data = this.userService.GetEmployeecmp(DI_Id);
    this.data.subscribe(
      (response: any) => {
        this.Emplist = response;
      })
  }




  GetEmployeeForTheId(EMP_EMPLOYEE_ID) {

    this.data = this.userService.GetEmployeeForTheId2(EMP_EMPLOYEE_ID);
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
      let x = this.userService.uploadImagecomp(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('COMPLNT_UPLOAD_PATH');
          i.value = "";
          if (error.status == 400) {
            //this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('COMPLNT_UPLOAD_PATH');
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

  getFeasibilityDocBriefFUrlEdit() {
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

  //save cmp

  SaveCMP(CMP: NgForm) {


    if ((this.datepipe.transform(CMP.value.COMPLAINT_INITIATED_DATE, 'yyyy-MM-dd')) > (this.datepipe.transform(this.myDate, 'yyyy-MM-dd'))) {
      swal('Complaint Date is invalid and it should be less than system Date');
      return;
      //EXM.value.Start_Date ='';                 
    }
    console.log('CMP Forms');
    console.log(CMP.value);

    if (CMP.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      CMP.value.COMPLNT_UPLOAD_PATH = this.getFeasibilityDocBriefFUrl();
      //CMP.value.WitnessModel=this.WitenssDetails;
      CMP.value.EMP_FIRST_NAME = this.EmployeeDetails.EMP_FIRST_NAME
      console.log('Data');
      console.log(CMP.value);

      this.data = this.userService.PostCMP(CMP.value);
      this.data.subscribe(
        (response) => {
          CMP.reset();
          CMP.resetForm();
          CMP.form.markAsPristine();
          CMP.form.markAsUntouched();
          swal('Success!', 'CompalintRegistration Added Successfully .', 'success');
          this.router.navigate(['/home/dept-enquiry/']);
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
  }




  AddWitnessDetails(W) {

    console.log('Witness Details');
    console.log(W)
    if ((W.Witnessname != null || W.Witnessname != undefined) && (W.witnessadr != null || W.witnessadr != undefined)
      && (W.witnesscontsct != null || W.witnesscontsct != undefined)) {
      let temp = {
        WITNESS_NAME: W.Witnessname,
        WITNESS_ADD: W.witnessadr,
        WITNESS_CONTACT_NO: W.witnesscontsct,

      }

      this.WitenssDetails.push(temp);

      this.W = {};


      console.log('Witness Details');
      console.log(this.WitenssDetails);
    }

    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
    }
  }

  //add
  ClearWitness() {
    this.W = {};
  }



  WitnessDetailsremove(i) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    })
    this.WitenssDetails.splice(i, 1);
  }

  UpdateCMP(CMP: NgForm) {

    CMP.value.WitnessModel = this.WitenssDetails;
    CMP.value.COMPLNT_UPLOAD_PATH = this.getFeasibilityDocBriefFUrlEdit();

    CMP.value.EMP_FIRST_NAME = this.EmployeeDetails.EMP_FIRST_NAME

    this.data = this.userService.UpdateCMP(CMP.value, this.COMPLAINT_ID);
    this.data.subscribe(
      (response) => {
        CMP.reset();
        CMP.resetForm();
        CMP.form.markAsPristine();
        CMP.form.markAsUntouched();
        // this.WitenssDetails = [];    

        swal('Success!', ' ComplaintRegstration  updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/dept-enquiry/']);
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

  GetByIdComplaintReg(COMPLAINT_ID) {


    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdComplaintReg(COMPLAINT_ID);
    this.data.subscribe(
      (response: any) => {
        this.C = response;

        if (this.C.COMPLAINT_INITIATED_DATE != null)
          this.C.COMPLAINT_INITIATED_DATE = ((this.C.COMPLAINT_INITIATED_DATE).split('T'))[0];


        this.WitenssDetails = this.C.WitnessModel;

        this.GetEmployeeForTheId(response.EmpID)
        this.GetEmployee(response.DivisionId)


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



  // //update
  // UpdateTRN(Nom: NgForm) {         

  //   this.data = this.userService.UpdateTRN(Nom.value, this.TRAINING_ID);
  //   this.data.subscribe(
  //     (response) => {
  //       Nom.reset();
  //       Nom.resetForm();
  //       Nom.form.markAsPristine();
  //       Nom.form.markAsUntouched();    

  //       swal('Success!', ' Training Details updated Successfully .', 'success');
  //       document.getElementById('loader-spinner').style.display = "none";
  //       this.router.navigate(['/home/training/']);
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

  // Cancel()
  // {
  //   this.T.DivisionId = '';
  //   this.T.EmpID = '';
  //   this.T.TrainingId = '';
  //   this.T.CategoryId = '';
  //   this.T.Conductedby = '';
  //   this.T.Registration = '';
  //   this.T.Subject = '';Fadd
  //   this.T.Start_Date = '';
  //   this.T.End_Date = '';
  //    this.T.Cretification_Date = '';
  //    this.T.Remarks = '';
  //}

}


