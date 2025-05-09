import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-viability-form',
  templateUrl: './viability-form.component.html',
  styleUrls: ['./viability-form.component.css']
})
export class ViabilityFormComponent implements OnInit {

  proposallst: any=[];
  title="Add Viablity report";
  proposallist : any=[];
  v : any = {};
  data : any;
  district : string;
  Taluk : string ;
  Village : string;
  ProposalFor : string;
  fileToUpload: File = null;
  formInvalid : boolean = false;
  mode : string
  VR_Id : number
  hide : boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //  this.mode = params['mode'];
      this.VR_Id = params['VR_Id'];
      this.mode = params['mode'];
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Viablity report";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Viablity report";
      }
    });
    if(this.VR_Id > 0){
      this.GetByIdViability(this.VR_Id);
     }
    this.getDefaultData()
     
  }

  SaveViabilityReport(viabilityForm : NgForm){

    viabilityForm.value.VR_ReportPath = this.getimageUpload1();   

    if(viabilityForm.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }     

     if(viabilityForm.value.VR_ReportPath == null){
      this.formInvalid = true;      
      swal('Warning!', 'Please upload file.', 'warning');
      return;
    }
  
    else{    
     // viabilityForm.value.VR_ReportPath = this.getimageUpload1(); 
     document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.PostViabilityReport(viabilityForm.value);    
        this.data.subscribe(
      (response) => {       
        document.getElementById('loader-spinner').style.display = "none";        
        viabilityForm.reset();
        viabilityForm.resetForm();
        viabilityForm.form.markAsPristine();
        viabilityForm.form.markAsUntouched();        
        swal('Success!', 'Viability Report Added Successfully .', 'success');
        this.router.navigate(['/home/viabilityreport']) ;   
           
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

  UpdateViabilityReport(viabilityForm : NgForm){
    
    
    if(viabilityForm.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }   
      
    else{          
      document.getElementById('loader-spinner').style.display = "block";     
        this.data = this.userService.UpdateViabilityReport(this.VR_Id,viabilityForm.value);    
        this.data.subscribe(
      (response) => {       
        document.getElementById('loader-spinner').style.display = "none";     
        viabilityForm.reset();
        viabilityForm.resetForm();
        viabilityForm.form.markAsPristine();
        viabilityForm.form.markAsUntouched();        
        swal('Success!', 'Viability Report Updated Successfully .', 'success');
        this.router.navigate(['/home/viabilityreport']) ;   
              
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

  getDefaultData(){
    if(this.VR_Id > 0){
    this.data = this.userService.getAllProposalReportdropdown();
    this.data.subscribe(
      (response: any) => {
        this.proposallist = response;              
      });  
    }  
    else{
      this.data = this.userService.getAllProposalReportdropdownOnfilter('ViabilityReport');
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
            // document.getElementById('loader-spinner').style.display = "none";   
          }
        }           
      });  
    //document.getElementById('loader-spinner').style.display = "block";
    
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
          let i: any = document.getElementById('VR_ReportPath');
          i.value = "";
          if (error.status == 400) {                
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('VR_ReportPath');
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
      imagename = document.getElementById('VR_ReportPath');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  GetByIdViability(VR_Id){
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdViabilityReport(VR_Id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.v = response;
        this.GetOtherrelatedinfo(this.v.VR_PR_Id_FK);
        setTimeout (() => {
        this.GetOtherrelatedinfo(this.v.VR_PR_Id_FK);
      }, 500)      
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }  
}