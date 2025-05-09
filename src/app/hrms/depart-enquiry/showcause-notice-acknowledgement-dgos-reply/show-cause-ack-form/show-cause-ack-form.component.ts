import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-show-cause-ack-form',
  templateUrl: './show-cause-ack-form.component.html',
  styleUrls: ['./show-cause-ack-form.component.css']
})
export class ShowCauseAckFormComponent implements OnInit {

  
  title="SCN Acknowldge Details";
  data : any = {};
  formInvalid : boolean = false;
  sk : any = {};
  T: any = {};
  d: any = {};
  CA: any = {};
  back : string = '';
  DEPUTATION_ID: any;
  EMP_EMPLOYEE_ID: any;
  ReportList : any = {};
  mode : string;
  Trainingtypelist: any = {};
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
  SCNDetails: any = {};
  EmployeeDetailsTO: any = {};
  DistrictlistDep: any = {};
  fileToUpload: File;
  COMPLAINT_ID: any = {};
  SCN_ID : any = {};
  Back2 : string = '';
  sckid:any;
  EnqId: any;
  scnmode:any;
  hide: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {

    this.route.params.subscribe(params => {      
      this.COMPLAINT_ID = params['COMPLAINT_ID'];  
      this.SCN_ID = params['SCN_ID'];  
      this.mode =  params['mode'];   
      this.back =  params['back'];  
        // if(this.COMPLAINT_ID > 0){
        //     this.GetByIdCompalintDetails(this.COMPLAINT_ID)
        // }
            if(this.SCN_ID > 0){
              this.GetByIdAck(this.SCN_ID)
            }
          
          
    });

    if(this.mode=='View'){
      this.title = "View ComplaintRegistration  ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit ComplaintRegistration ";
    }  

    // this.sckid =localStorage.getItem('sckid');
    // localStorage.removeItem('sckid')



this.sckid = +localStorage.getItem('ENQUIRY_ID'); 
localStorage.removeItem('ENQUIRY_ID') 

this.scnmode = +localStorage.getItem('mode'); 
localStorage.removeItem('mode') 

   
    if(+localStorage.getItem('Id')>0){
      this.COMPLAINT_ID = +localStorage.getItem('Id');      
      localStorage.removeItem('Id')
    }
  }



//complaint details
GetByIdCompalintDetails(COMPLAINT_ID) {
         
          this.data = this.userService.GetComplaintAckDetails(COMPLAINT_ID);
          this.data.subscribe(
            (response: any) => {       
              this.ComplaintDetails = response;
              this.GetEmployeeForACk(response.EMP_DIVISION_ID)
              this.GetSCNForAck(this.SCN_ID)
             // this.GetByIdAck(this.SCN_ID)
            })    
    
          }
  

          //employee details 
      GetEmployeeForACk(EMP_DIVISION_ID) {
      
        this.data = this.userService.GetEmployeeForACk(EMP_DIVISION_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })    
  
        }

          GetSCNForAck(SCN_ID) {
           
            this.data = this.userService.GetSCNForAck(SCN_ID);
            this.data.subscribe(
              (response: any) => {       
                this.SCNDetails = response;
                console.log("scn");
                console.log(response)
              })    
      
            }
//dgo upload
          imageUploaddgo(file: FileList) {
        
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
              data.append("imagedo", file.item(0));
              let x = this.userService.uploadImagedgo(data);
              x.subscribe(
                (response) => {
        
                }, (error) => {
                  let i: any = document.getElementById('DGO_Upload');
                  i.value = "";
                  if (error.status == 400) {
                    //this.FeasibilityPDFUrl = "assets/images/image-default.png";
                    swal('Warning!', error.error.Message, 'warning');
                  }
                });
            }
            else {
              let i: any = document.getElementById('DGO_Upload');
              i.value = "";
              if (!uploadedFilename.match(regex))
                swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
              else if (size > 2048)
                swal('Warning!', "Please upload image file less than 2mb", 'warning');
            }
          }
          getFeasibilityDocBriefdgo() {
            let imagename = null;
            try {
              imagename = document.getElementById('DGO_Upload');
              console.log('CourtDoc file');
              console.log(imagename.files[0].name);
              return imagename.files[0].name;
            }
            catch (e) {
              return null; 
            }
          }

//om upload
imageUpload0m(file: FileList) {

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
    data.append("imageom", file.item(0));
    let x = this.userService.uploadImageom(data);
    x.subscribe(
      (response) => {

      }, (error) => {
        let i: any = document.getElementById('OM_Upload');
        i.value = "";
        if (error.status == 400) {
          //this.FeasibilityPDFUrl = "assets/images/image-default.png";
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }
  else {
    let i: any = document.getElementById('OM_Upload');
    i.value = "";
    if (!uploadedFilename.match(regex))
      swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
    else if (size > 2048)
      swal('Warning!', "Please upload image file less than 2mb", 'warning');
  }
}
getFeasibilityDocBriefom() {
  let imagename = null;
  try {
    imagename = document.getElementById('OM_Upload');
    console.log('CourtDoc file');
    console.log(imagename.files[0].name);
    return imagename.files[0].name;
  }
  catch (e) {
    return null; 
  }
}



GetByIdAck(SCN_ID) {


  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetByIdAck(SCN_ID);
  this.data.subscribe(
    (response: any) => {                 
      console.log("getbyid");
      console.log(response);
      this.sk = response; 
      this.GetByIdCompalintDetails(response.COMPLAINT_ID)
      // this.GetEmployeeForACk(response.EMP_DIVISION_ID)
      // this.GetSCNForAck(this.SCN_ID)
      // if(this.sk.SCNREPLY_ACTION=="1")
      // {
      //   this.sk.SCNREPLY_ACTION="Close COmplaint"
      // }


      // if(this.sk.SCNREPLY_ACTION=="2")
      // {
      //   this.sk.SCNREPLY_ACTION="Intiated ENQ"
      // }

      
      // if(this.sk.SUSPND_IND=="1")
      // {
      //   this.sk.SUSPND_IND="Yes"
      // }

      // if(this.sk.SUSPND_IND=="2")
      // {
      //   this.sk.SUSPND_IND="No"
      // }
      if (this.sk.SCNREPLY_RECVD_DATE != null)
      this.sk.SCNREPLY_RECVD_DATE = ((this.sk.SCNREPLY_RECVD_DATE).split('T'))[0];


   

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
          //save

          SaveUpdateSCnAck(SCK:any) {
     
            SCK.OM_Upload=this.getFeasibilityDocBriefom();
            SCK.DGO_Upload=this.getFeasibilityDocBriefdgo();
            
                if (this.SCNDetails.SCN_REPLY_ID == 0) {
                  this.data = this.userService.PostACK(this.SCN_ID,SCK);
                  this.data.subscribe(
                    (response: any) => {
                      swal('Success!', 'SCN aknowldge Added Successfully .', 'success');
                      this.sk={};                    

                     
                      swal('Success!', 'SCN aknowldge Added Successfully .', 'success');
                      this.router.navigate(['/home/dept-enquiry/show-cause-ack/']);
            
                    })
                }
              if
                  (this.SCNDetails.SCN_REPLY_ID > 0)
                {
                  this.data = this.userService.UpdateACK(this.SCNDetails.SCN_REPLY_ID,SCK);
                  this.data.subscribe(
                    (response: any) => {
                      // SCK.reset();
                      // SCK.resetForm();
                      // SCK.form.markAsPristine();
                      // SCK.form.markAsUntouched();
                      swal('Success!', 'SCN aknowldge Updatated Successfully .', 'success');
                      this.router.navigate(['/home/dept-enquiry/show-cause-ack/']);
                    })
            
                }
              }


Cancel()
{
         this.sk.SCNREPLY_RECVD_DATE = '';
          this.sk.SCNREPLY_MODE = '';
          this.sk.SCNREPLY_DGO_REP_DTL = '';
          this.sk.SCNREPLY_REP_STFTRY = '';
          this.sk.SCNREPLY_REP_ACCPT = '';
          this.sk.SCNREPLY_ACTION = '';
          this.sk.SUSPND_IND = '';
          this.sk.REMARKS = '';
          this.sk.MODIFIED_BY = '';
          this.sk.MODIFIED_DATE = '';
         
}



      
}




