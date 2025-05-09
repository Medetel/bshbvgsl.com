import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-initiate-depart-enquiry-form',
  templateUrl: './initiate-depart-enquiry-form.component.html',
  styleUrls: ['./initiate-depart-enquiry-form.component.css']
})
export class InitiateDepartEnquiryFormComponent implements OnInit {

  data : any = {};
  formInvalid : boolean = false;
  e : any = {};
  s: any = {};
  sck: any = {};
  COMPLAINT_ID: any;
  EMP_EMPLOYEE_ID: any;
  SClist: any = {};
  SCklist: any = {};
  Districtlist: any = [];
  Emplist: any = {};
  ENQUIRY_ID:any;
  C: any = {};
  c: any={};
  SCNlist: any = [];
  Complist: any = [];
  tt: any = {};
  sc: any = {};
  W : any = {};
  fileToUpload: File;
  title: string;
  ChargeDetails: any=[]
  mode: any;
  WitenssDetails: any = [];
  back: any;
  hide: boolean;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {
   this.GetAllData();
    this.route.params.subscribe(params => {      
      this.ENQUIRY_ID = params['ENQUIRY_ID'];  
      this.mode =  params['mode'];   
      this.back =  params['back'];  
        if(this.ENQUIRY_ID > 0){
            this.GetByIdIDE(this.ENQUIRY_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View Inititated Dep.Enq ";
      this.hide=true

    }
    else if(this.mode=='Edit'){
      this.title = "Edit Inititated Dep.Enq ";
    }  
  }

  GetAllData() {
 
   this.data = this.userService.GetAllSCNinIDE();
   this.data.subscribe(
     (response: any) => {
       this.SCNlist = response.Result;
       
     })


   
    }

    

    GetComplaints(SCN_REPLY_ID) {

      this.data = this.userService.GetComplaints(SCN_REPLY_ID);
      this.data.subscribe(
        (response: any) => {        
          this.Complist = response;
        })
         }

     

         //scn details
         GetSCND(SCN_REPLY_ID) {
      
          this.data = this.userService.GetSCND(SCN_REPLY_ID);
          this.data.subscribe(
            (response: any) => {        
              this.SClist = response;
              console.log("SClist");
              console.log( this.SClist);
            })
             }


             //getsck
              //scn details
         GetSCk(SCN_REPLY_ID) {
       
          this.data = this.userService.GetSCk(SCN_REPLY_ID);
          this.data.subscribe(
            (response: any) => {        
              this.SCklist = response;
            })
             }

      

//adding charges 
AddChargeDetails(c) {
  
             
      if ((c.CHARGES_FRAMED != null || c.CHARGES_FRAMED != undefined) && (c.ALLEGATIONS_RAISED != null || c.ALLEGATIONS_RAISED != undefined)
       ){

        // && (c.REMARKS != null || c.REMARKS != undefined) 
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
      
        SaveIDE(IDE: NgForm,SCN_REPLY_ID) {          
          
          console.log('IDE Forms');
          console.log(IDE.value);
      
          if (IDE.invalid) {
            this.formInvalid = true;
            swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
            return;
          }
      
          else {   
            IDE.value.SCN_REPLY_ID=SCN_REPLY_ID;
            IDE.value.ChargeModel=this.ChargeDetails;
            IDE.value.WitnessModel=this.WitenssDetails;
            console.log('Data');
            console.log(IDE.value);

            this.data = this.userService.PostIDE(IDE.value);
            this.data.subscribe(
              (response) => {
                IDE.reset();
                IDE.resetForm();
                IDE.form.markAsPristine();
                IDE.form.markAsUntouched();
                swal('Success!', 'Intitate Dept.Enq Added Successfully .', 'success');
                this.router.navigate(['/home/dept-enquiry/initiative-depart/']);
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
      

       

        AddWitnessDetails(W) {
        debugger;
          console.log('Witness Details');
          console.log(W)              
          if ((W.Witnessname != null || W.Witnessname != undefined) && (W.witnessadr != null || W.witnessadr != undefined)
          && (W.witnesscontsct != null || W.witnesscontsct != undefined)   ){
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

      WitnessDetailsremove(i){ 
        swal({
          title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
        })     
        this.WitenssDetails.splice(i, 1);      
       }  
    

//gettting locaal storage 
// addcomp()
// {
//   localStorage.setItem('ENQUIRY_ID',this.ENQUIRY_ID);  
// }
       



       
        GetByIdIDE(ENQUIRY_ID){
        
        
          document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.GetByIdIDE(ENQUIRY_ID);
          this.data.subscribe(
            (response: any) => {
              this.e = response;      
        
              if (this.e.ENQ_START_DATE != null)
              this.e.ENQ_START_DATE = ((this.e.ENQ_START_DATE).split('T'))[0];  
              this.ChargeDetails = this.e.ChargeModel;
              this.WitenssDetails = this.W.WitnessModel;
                      
              this.GetAllData()             
               this.GetSCk(this.e.SCN)
                  this. GetSCND(this.e.SCN) 
                  this.GetComplaints(this.e.SCN)


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
UpdateIDE(IDE: NgForm) {    
  //alert(this.ENQUIRY_ID);
  IDE.value.ChargeModel=this.ChargeDetails;   
   this.data = this.userService.UpdateIDE(IDE.value,this.ENQUIRY_ID);
      this.data.subscribe(
        (response) => {
          IDE.reset();
          IDE.resetForm();
          IDE.form.markAsPristine();
          IDE.form.markAsUntouched();          
          this.ChargeDetails = [];  
          this.WitenssDetails = [];      
                   
          swal('Success!', ' Intiate Dept.Enq  updated Successfully .', 'success');
          document.getElementById('loader-spinner').style.display = "none";   
          this.router.navigate(['/home/dept-enquiry/initiative-depart/']) ;         
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

Back(ComplId){
 
  localStorage.setItem('Back','indep')
  //this.ENQUIRY_ID
  localStorage.setItem('Id',this.ENQUIRY_ID.toString())
  this.router.navigate(['/home/dept-enquiry/complaints-reg-form',ComplId,'View']);
  //[routerLink]="['/home/dept-enquiry/complaint-reg-auth/complaint-reg-auth-form',c.COMPLAINT_ID,'View']"
}

Back1(ComplId,Scnid){
  localStorage.setItem('Back1','2nd') 
  localStorage.setItem('Id',this.ENQUIRY_ID.toString())
  this.router.navigate(['/home/dept-enquiry/show-cause-form',ComplId,Scnid,'View']); 
}


Back2(ComplId,Scnid){

    localStorage.setItem('Back2','3rd') 
    localStorage.setItem('Id',this.ENQUIRY_ID.toString())
    this.router.navigate(['/home/dept-enquiry/show-cause-ack-form',ComplId,Scnid,'View']);   
  }

  addcomp(){
    
    localStorage.setItem('ENQUIRY_ID',this.ENQUIRY_ID);
    localStorage.setItem('mode',this.mode);    
  }

  Cancel(){
    
  }
}


