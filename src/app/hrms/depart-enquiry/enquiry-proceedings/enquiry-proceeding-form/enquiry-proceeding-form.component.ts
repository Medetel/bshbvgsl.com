import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-enquiry-proceeding-form',
  templateUrl: './enquiry-proceeding-form.component.html',
  styleUrls: ['./enquiry-proceeding-form.component.css']
})
export class EnquiryProceedingFormComponent implements OnInit {

  data : any = {};
  formInvalid : boolean = false;
  e : any = {};
  ProcList:any={};
  p: any = {};
  sck: any = {};
  SCN_REPLY_ID: any;
  EMP_EMPLOYEE_ID: any;
  SClist: any = {};
  ProceedingDetails: any={};
  SCklist: any = {};
  Districtlist: any = [];
  Emplist: any = {};
  ENQUIRY_ID:any;
  PROCEEDING_ID: any={};
  enqplist: any={};
  C: any = {};
  c: any={};
  SCNlist: any = {};
  Complist: any = {};
  tt: any = {};
  sc: any = {};
  fileToUpload: File;
  title: string;
  ChargeDetails: any=[]
  mode: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {
  //  this.GetAllData();
  
    this.route.params.subscribe(params => {      
      this.PROCEEDING_ID = params['PROCEEDING_ID'];  
    
      this.mode =  params['mode'];   
        
        if(this.PROCEEDING_ID > 0){
            this.GetByIdProc(this.PROCEEDING_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View Enq.Proceeding ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit Enq.Proceeding ";
    } 
    
    


this.ENQUIRY_ID = localStorage.getItem('ENQUIRY_ID');  
this.SCN_REPLY_ID = localStorage.getItem('SCN_REPLY_ID');


// this.PROCEEDING_ID = localStorage.getItem('PROCEEDING_ID');
//this.mode =  localStorage.getItem('mode');

    if(this.SCN_REPLY_ID > 0){
      this.GetComplaints(this.SCN_REPLY_ID)
  }   

  if(this.ENQUIRY_ID > 0){
    this.GetEnqProc(this.ENQUIRY_ID)
  }


  }

  GetAllData() {

   this.data = this.userService.GetAllSCNinIDE();
   this.data.subscribe(
     (response: any) => {
       this.SCNlist = response.Result;
       
     })


     this.data = this.userService.GetAllProceeding1();
   this.data.subscribe(
     (response: any) => {
       this.ProceedingDetails = response.Result;
       
     })

   
    }

    // addcomp(){

    
    //   localStorage.setItem('ENQUIRY_ID',this.ENQUIRY_ID);
    //   localStorage.setItem('mode',this.mode);
      
    // }

    //detilas of enq
    GetEnqDetails(ENQUIRY_ID) {
    
      this.data = this.userService.GetEnqDetails(ENQUIRY_ID);
      this.data.subscribe(
        (response: any) => {        
          this.enqplist = response;         
        })
         }


         GetEnqProc(ENQUIRY_ID) {
       
         
          
          this.data = this.userService.GetEnqProcDetails(ENQUIRY_ID);
          this.data.subscribe(
            (response: any) => {        
              this.ProcList = response;         
            })
             }
    GetComplaints(SCN_REPLY_ID) {
     
      this.data = this.userService.GetComplaints1(SCN_REPLY_ID);
      this.data.subscribe(
        (response: any) => {        
          this.Complist = response;
          this.GetSCk(this.SCN_REPLY_ID)
                  this. GetSCND(this.SCN_REPLY_ID) 
                  this.GetEnqDetails(this.ENQUIRY_ID)
        })
         }

     

         //scn details
         GetSCND(SCN_REPLY_ID) {
         
          this.data = this.userService.GetSCND1(SCN_REPLY_ID);
          this.data.subscribe(
            (response: any) => {        
              this.SClist = response;
            })
             }


             //getsck
              //scn details
         GetSCk(SCN_REPLY_ID) {
        
          this.data = this.userService.GetSCk1(SCN_REPLY_ID);
          this.data.subscribe(
            (response: any) => {        
              this.SCklist = response;
            })
             }

      

//adding charges 
AddChargeDetails(c) { 
             
      if ((c.CHARGES_FRAMED != null || c.CHARGES_FRAMED != undefined) && (c.ALLEGATIONS_RAISED != null || c.ALLEGATIONS_RAISED != undefined)
      && (c.REMARKS != null || c.REMARKS != undefined)   ){
        let temp = {
          CHARGES_FRAMED: c.CHARGES_FRAMED,
          ALLEGATIONS_RAISED: c.ALLEGATIONS_RAISED,
          REMARKS: c.REMARKS,        
        }
  
        this.ChargeDetails.push(temp);       
        this.c = {};  
  
        console.log('charge Details');
        console.log(this.ChargeDetails);
      }
  
      else {
        swal('warning', 'Please enter mandatory fields!', 'warning');
      }
    }

  //add
  CleaChrge() {
    this.c = {};
  }



  ChargeDetailsremove(i){ 
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    })     
    this.ChargeDetails.splice(i, 1);      
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
            let x = this.userService.uploadImage1(data);
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
     //save for proceeding

      
        SaveProc(Proc: NgForm) {  
          debugger
        
              
          console.log('CMP Forms');
          console.log(Proc.value);
      
          if (Proc.invalid) {
            this.formInvalid = true;
            swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
            return;
          }
      
          else {            
            // Proc.value.COMPLNT_UPLOAD_PATH = this.getFeasibilityDocBriefFUrl();
            // Proc.value.WitnessModel=this.WitenssDetails;
            // Proc.value.EMP_FIRST_NAME=this.EmployeeDetails.EMP_FIRST_NAME
            console.log('Data');
            console.log(Proc.value);
            Proc.value.ENQUIRY_ID= +this.ENQUIRY_ID;
            this.data = this.userService.PostProc(Proc.value);
            this.data.subscribe(
              (response) => {
                Proc.reset();
                Proc.resetForm();
                Proc.form.markAsPristine();
                Proc.form.markAsUntouched();
                swal('Success!', 'Enq.Proceeding Added Successfully .', 'success');
                this.router.navigate(['/home/dept-enquiry/enquiry-proceeding/']);
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
      

       

       
//delete
delete(PROCEEDING_ID){
  swal({
       title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
      this.data = this.userService.DeleteProc(PROCEEDING_ID);
      this.data.subscribe(
       (response: any) => {
           this.GetEnqProc(this.ENQUIRY_ID);          
       },(error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401|| error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      }       
    ); 
  } 
  })
  }

    
       
        GetByIdProc(PROCEEDING_ID){
        
        
          document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.GetByIdProc(PROCEEDING_ID);
          this.data.subscribe(
            (response: any) => {
              this.p = response;      
        
              if (this.e.PROC_Date != null)
              this.e.PROC_Date = ((this.e.PROC_Date).split('T'))[0];  
              // this.ChargeDetails = this.e.ChargeModel;
                      
              // this.GetAllData()             
              //  this.GetSCk(this.e.SCN)
              //     this. GetSCND(this.e.SCN) 
              //     this.GetComplaints(this.e.SCN)


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

//update
UpdateProc(Proc: NgForm) {  
  debugger  
 

  this.data = this.userService.UpdateProc(Proc.value,this.PROCEEDING_ID);
      this.data.subscribe(
        (response) => {
          Proc.reset();
          Proc.resetForm();
          Proc.form.markAsPristine();
          Proc.form.markAsUntouched();
          
          // this.ChargeDetails = [];         
         
          
          swal('Success!', ' Enq.Proceeding  updated Successfully .', 'success');
          document.getElementById('loader-spinner').style.display = "none";   
          this.router.navigate(['/home/dept-enquiry/enquiry-proceeding/']) ;         
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

Cancel(){
  
}   
}


