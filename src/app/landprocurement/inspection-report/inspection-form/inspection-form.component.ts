import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.css']
})
export class InspectionFormComponent implements OnInit {

  proposallst: any=[];
  title = "Add Inspection Report";
  proposallist : any =[];
  i : any = {};
  data : any;
  district : string;
  Taluk : string ;
  Village : string;
  ProposalFor : string;
  fileToUpload: File = null;
  formInvalid : boolean = false;
  mode : string
  IR_Id : number
  hide : boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {

    this.route.params.subscribe(params => {      
      this.IR_Id = params['IR_Id'];
      this.mode = params['mode'];

      
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Inspection Report";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Inspection Report";
      }
    });

    
    if(this.IR_Id > 0){
      this.GetByIdInspection(this.IR_Id);
     }
     this.getDefaultData();
  }

  SaveInspectionReport(InspectionForm : NgForm){    
    
    InspectionForm.value.IR_ReportPath = this.getimageUpload1(); 
    if(InspectionForm.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }     

    if(InspectionForm.value.IR_ReportPath == null){
      this.formInvalid = true;      
      swal('Warning!', 'Please upload file.', 'warning');
      return;
    }  
  
    else{  
      document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.PostInspectionReport(InspectionForm.value);    
        this.data.subscribe(
      (response) => {       
        document.getElementById('loader-spinner').style.display = "none";
        InspectionForm.reset();
        InspectionForm.resetForm();
        InspectionForm.form.markAsPristine();
        InspectionForm.form.markAsUntouched();        
        swal('Success!', 'Inspection Report Added Successfully .', 'success');
        this.router.navigate(['/home/inspectionreport']) ;   
                   
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });
    }
  }

  UpdateInspectionReport(InspectionForm : NgForm){    

    if(InspectionForm.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }     
  
    else{        
      InspectionForm.value.IR_ReportPath = this.getimageUpload1(); 
      document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.UpdateInspectionReport(this.IR_Id,InspectionForm.value);    
        this.data.subscribe(
      (response) => {       
        document.getElementById('loader-spinner').style.display = "none";  
        InspectionForm.reset();
        InspectionForm.resetForm();
        InspectionForm.form.markAsPristine();
        InspectionForm.form.markAsUntouched();        
        swal('Success!', 'Inspection Report Updated Successfully .', 'success');
        this.router.navigate(['/home/inspectionreport']) ;   
                 
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });
    }
  }


  imageUpload(file: FileList) {   
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {           
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {           

        }, (error) => {
          let i: any = document.getElementById('IR_ReportPath');
          i.value = "";
          if (error.status == 400) {                
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('IR_ReportPath');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }   

  getimageUpload1() {    
    let imagename = null;
    try {
      imagename = document.getElementById('IR_ReportPath');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  getDefaultData(){
    if(this.IR_Id > 0){
    this.data = this.userService.getAllProposalReportdropdown();
    this.data.subscribe(
      (response: any) => {
        this.proposallist = response;              
      });
    }

    else{
      this.data = this.userService.getAllProposalReportdropdownOnfilter('InspectionReport');
      this.data.subscribe(
      (response: any) => {
        this.proposallist = response.Result;              
      });
    }      
  }


  GetOtherrelatedinfo(Id){   
    

    this.data = this.userService.getAllProposalReportdropdown();
    this.data.subscribe(
      (response: any) => {
        this.proposallst = response;   
        for(let i = 0 ; i< this.proposallst.length; i++){
          if(this.proposallst[i].PR_Id_PK == Id){
            this.district = this.proposallst[i].DI_District;
            this.Taluk = this.proposallst[i].TA_Taluk;
            this.Village = this.proposallst[i].PR_Village;
            this.ProposalFor =  this.proposallst[i].PR_For;  
           
          }
        }               
      });
  }


  GetByIdInspection(IR_Id){   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdInspectionReport(IR_Id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;
         this.GetOtherrelatedinfo(response.IR_PR_Id_FK);     
           
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
}
