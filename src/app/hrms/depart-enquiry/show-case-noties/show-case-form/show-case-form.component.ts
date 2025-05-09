import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-show-case-form',
  templateUrl: './show-case-form.component.html',
  styleUrls: ['./show-case-form.component.css']
})
export class ShowCaseFormComponent implements OnInit {

  //   constructor() { }

  //   ngOnInit() {
  //   }
  //   public showComplainees:boolean = false;
  //   public showDGO:boolean = false;
  //   public showWitness:boolean = false;

  // }
  title = "Add Employee Deputation Out";
  data: any = {};
  formInvalid: boolean = false;
  E: any = {};
  DP: any = {};
  d: any = {};
  SCN_ID: any;
  back : string = '';
  EMP_EMPLOYEE_ID: any;
  ReportList: any = {};
  mode: string;
  Trainingtypelist: any = {};
  TrainingCategorylist: any = {};
  EmployeeDetails: any = {};
  Districtlist: any = {};
  Emplist: any = {};
  DI_Id: number;
  N: any = {};
  dd: any = {};
  cr: any = {};
  dd3: any = {};
  Depdentlist: any = {};
  Departmentlist: any = {};
  Complaintdetils: any = [];
  fileToUpload: File;
  COMPLAINT_ID: any = {};
  back1 : string = '';
  s: any = {};
  EnqId:number;
  scnmode: any;
  hide: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
  ) {

  }

  ngOnInit() {
 
    
    this.route.params.subscribe(params => {
      this.COMPLAINT_ID = params['COMPLAINT_ID'];
      this.SCN_ID = params['SCN_ID'];
      this.mode = params['mode'];
      // this.back= params['back'];
       this.back =  params['back'];  
      if (this.COMPLAINT_ID > 0) {
        this.GetAllComplaintSCN(this.COMPLAINT_ID)        
      
      }
      // if (this.SCN_ID > 0) {
         //this. GetByIdSCN(this.SCN_ID);

      // }
    });

    if (this.mode == 'View') {
      this.title = "View DepartmentExam Type ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit DepartmentExam Type ";
    }


    this.back1 = localStorage.getItem('Back1');
    localStorage.removeItem('Back1')

// for enq_id

    this.EnqId = +localStorage.getItem('ENQUIRY_ID'); 
    localStorage.removeItem('ENQUIRY_ID') 

//for mode
    this.scnmode= +localStorage.getItem('mode');
    localStorage.removeItem('mode')



   
    if(+localStorage.getItem('Id')>0){
      this.COMPLAINT_ID = +localStorage.getItem('Id');      
      localStorage.removeItem('Id')
    }

  }

  AddScn(){
    localStorage.setItem('SCN_ID', this.SCN_ID);
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
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImages12(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('REPLY_UPLOAD_PATH');
          i.value = "";
          if (error.status == 400) {
            //this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('REPLY_UPLOAD_PATH');
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
      imagename = document.getElementById('REPLY_UPLOAD_PATH');
      console.log('CourtDoc file');
      console.log(imagename.files[0].name);
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  GetAllComplaintSCN(COMPLAINT_ID) {
      this.data = this.userService.GetAllComplaintSCN(COMPLAINT_ID);
    this.data.subscribe(
      (response: any) => {
        this.Complaintdetils = response; 
        this.GetByIdSCN(this.SCN_ID)
        console.log("Complaintdetils");
        console.log(this.Complaintdetils)
      })
  }


  SaveUpdateSCN(s:any) {
  
   

    s.REPLY_UPLOAD_PATH=this.getFeasibilityDocBriefFUrl1();
    if (this.SCN_ID == 0) {
      this.data = this.userService.PostSCN(this.COMPLAINT_ID,s);
      this.data.subscribe(
        (response: any) => {
          // sl.reset();
          // sl.resetForm();
          // sl.form.markAsPristine();
          // sl.form.markAsUntouched();
          swal('Success!', 'Show Cuase Notice Added Successfully .', 'success');
          this.router.navigate(['/home/dept-enquiry/show-cause/']);

        })
    }
  if
      (this.SCN_ID > 0)
    {
      this.data = this.userService.UpdateSCN(this.SCN_ID,s);
      this.data.subscribe(
        (response: any) => {
          // sl.reset();
          // sl.resetForm();
          // sl.form.markAsPristine();
          // sl.form.markAsUntouched();
          swal('Success!', 'Show Cuase Notice Updatated Successfully .', 'success');
          this.router.navigate(['/home/dept-enquiry/show-cause/']);
        })

    }
  }

  //cancel buton 
  Cancel() {
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
 


  //getbyid
  GetByIdSCN(SCN_ID) {
    
  
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdSCN(SCN_ID);
    this.data.subscribe(
      (response: any) => {                 
        console.log("getbyid");
        console.log(response);
        if(response!=null)
        {
        this.s = response; 
  
        // this.GetAllComplaintSCN(response.COMPLAINT_ID)
        // this.GetEmployee(response.DivisionId)
  
        if (this.s != null){
          if (this.s.SCN_REPLY_DUE_DATE != null)
        this.s.SCN_REPLY_DUE_DATE = ((this.s.SCN_REPLY_DUE_DATE).split('T'))[0];
        }
      }
      if (this.s.SCN_ACK_DATE != null)
        this.s.SCN_ACK_DATE = ((this.s.SCN_ACK_DATE).split('T'))[0];
  
      // if (this.E.Cretification_Date != null)
      //   this.E.Cretification_Date = ((this.E.Cretification_Date).split('T'))[0];
  
      //   if (this.E.Registration_Date != null)
      //   this.E.Registration_Date = ((this.E.Registration_Date).split('T'))[0];
  
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



