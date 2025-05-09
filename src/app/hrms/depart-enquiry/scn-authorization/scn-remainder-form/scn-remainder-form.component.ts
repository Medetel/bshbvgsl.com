import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-scn-remainder-form',
  templateUrl: './scn-remainder-form.component.html',
  styleUrls: ['./scn-remainder-form.component.css']
})
export class ScnRemainderFormComponent implements OnInit {
  title="SCN Details";
  data : any = {};
  formInvalid : boolean = false;
  sa : any = {};
  r: any = {};
  d: any = {};
  CA: any = {};
  SCN_ID: any;
  EMP_EMPLOYEE_ID: any;
  ReportList : any = {};
  mode : string;
  SCNReminderDetails: any = {};
  WitnessDetails: any = {};
  EmployeeDetails: any = {};
  ComplaintDetails: any = {};
  Timelist: any = {};
  Emplist: any = {};
  DI_Id:number;
  fix_code_id: any = {};
  dd: any = {};
  tt: any = {};
  dd3: any = {};
  Depdentlist: any = {};
  SCNDetails: any = {};
  DistrictlistDep: any = {};
  SCN_REMINDER_ID: any={};
  fileToUpload: File;
  COMPLAINT_ID: any = {};
  myDate = new Date();
  fromDate : any;
  toDate : any;
  constructor(private userService: UserService,private datepipe: DatePipe,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {

    this.route.params.subscribe(params => {      
      this.SCN_ID = params['SCN_ID'];  
      // this.SCN_REMINDER_ID = params['SCN_REMINDER_ID'];  
      this.mode =  params['mode'];   
        
        if(this.SCN_ID > 0){
            this.GetSCNForTheId(this.SCN_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View SCNRegistration  ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit SCNRegistration ";
    }  
  }
   



//employee details 
      GetSCNForTheId(SCN_ID) {
        debugger;
        this.data = this.userService.GetSCNForTheIdDetailsReminder(SCN_ID);
        this.data.subscribe(
          (response: any) => {       
            this.SCNReminderDetails = response;
            this.GetByIdReminder(this.SCN_ID)   
            console.log("scn");
            console.log(response)
          })    
  
        }



         

         
//getbyid for view
GetByIdReminder(SCN_ID) {
 
// alert(SCN_ID)
  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetByIdReminder(SCN_ID);
  this.data.subscribe(
    (response: any) => {                 
      console.log("getbyid");
      console.log(response);
      this.r = response; 
    //  this.GetSCNForTheId(this.SCN_ID)     
    
      if (this.r.DATE != null)
      this.r.DATE = ((this.r.DATE).split('T'))[0];

    // if (this.sa.DEPUT_ACT_REP_DATE != null)
    //   this.sa.DEPUT_ACT_REP_DATE = ((this.sa.DEPUT_ACT_REP_DATE).split('T'))[0];


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



 //upload for doc
     //upload file
     imageUpload3(file: FileList) {
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
        let x = this.userService.uploadImageR(data);
        x.subscribe(
          (response) => {
  
          }, (error) => {
            let i: any = document.getElementById('OM_UPLOAD_PATH');
            i.value = "";
            if (error.status == 400) {
              //this.FeasibilityPDFUrl = "assets/images/image-default.png";
              swal('Warning!', error.error.Message, 'warning');
            }
          });
      }
      else {
        let i: any = document.getElementById('OM_UPLOAD_PATH');
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
        imagename = document.getElementById('OM_UPLOAD_PATH');
        console.log('CourtDoc file');
        console.log(imagename.files[0].name);
        return imagename.files[0].name;
      }
      catch (e) {
        return null;
      }
    }

    Updatereminder(reminder:any) {
  debugger;
  
  const formData = reminder.value;
  
      if (this.SCNReminderDetails.SCN_REMINDER_ID == 0) {
        // if((this.datepipe.transform(reminder.value.DATE, 'yyyy-MM-dd')) > (this.datepipe.transform(this.myDate, 'yyyy-MM-dd'))){
        //   swal('Due Date is invalid and it should be less than system Date' );
        //   return;
        //   //EXM.value.Start_Date ='';                 
        // }
        
        this.data = this.userService.PostReminder(this.SCN_ID,formData);
        this.data.subscribe(
          (response: any) => {
            // reminder.reset();
            // reminder.resetForm();
            // reminder.form.markAsPristine();
            // reminder.form.markAsUntouched();
            swal('Success!', 'Reminder Added Successfully .', 'success');
            this.router.navigate(['/home/dept-enquiry/scn-remainer/']);
  
          })
      }
    if
        (this.SCNReminderDetails.SCN_REMINDER_ID > 0)
      {
        this.data = this.userService.UpdateReminder(this.SCNReminderDetails.SCN_REMINDER_ID,formData);
        this.data.subscribe(
          (response: any) => {
            // reminder.reset();
            // reminder.resetForm();
            // reminder.form.markAsPristine();
            // reminder.form.markAsUntouched();
            swal('Success!', 'Reminder Updatated Successfully .', 'success');
            this.router.navigate(['/home/dept-enquiry/scn-remainer/']);
          })
  
      }
    }

Cancel()
{
         this.r.DATE = '';
          this.r.Reply = '';
          this.r.Additional = '';
          this.r.Remarks = '';
          // this.r.MODIFIED_DATE = '';
         
}

SaveUpdateReminder(){
  
}

      
}




