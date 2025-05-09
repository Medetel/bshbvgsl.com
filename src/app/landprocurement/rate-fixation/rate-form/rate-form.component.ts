import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.css']
})
export class RateFormComponent implements OnInit {

  proposallst: any=[];
  title="Add Rate Fixation";
  proposallist : any=[];
  r : any = {};
  data : any ;
  district : string;
  Taluk : string ;
  Village : string;
  ProposalFor : string;
  fileToUpload: File = null;
  formInvalid : boolean = false;
  mode : string
  RF_Id : number
  hide : boolean = false;
  projectlist;
  projvillagelist: any=[];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      //  this.mode = params['mode'];
      this.RF_Id = params['RF_Id_PK'];
      this.mode = params['mode'];

      
      
      if(this.mode == 'view'){
        this.hide = true;       
      }
      if(this.mode == 'edit'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Rate Fixation";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Rate Fixation";
      }
    });
    
    if(this.RF_Id > 0){
      this.GetByIdRateFixation(this.RF_Id);
     }
    this.GetAllProjectforLR()
     this.getDefaultData()
  }


  GetAllProjectforLR(){
    this.data = this.userService.GetAllProjectforLR();
    this.data.subscribe(
      (response:any) =>{        
        this.projectlist = response;
      },(error)=>{
        
      });
  }

  GetProposalId(RF_PD_Id_FK){
    
    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == RF_PD_Id_FK) {
        this.r.RF_PR_Id_FK = this.projectlist[i].PD_PR_Id_FK;
        this.GetOtherrelatedinfo(this.r.RF_PR_Id_FK)
        this.GetProjectVillage(this.r.RF_PR_Id_FK);
        document.getElementById('loader-spinner').style.display = "none";
      }
    }
  }

  GetProjectVillage(PR_Id){
    this.data = this.userService.GetProjectVillage(PR_Id);
    this.data.subscribe(
      (response:any) =>{       
        this.projvillagelist = response;
      },(error)=>{
        
      });
  }


  SaveRateFixation(rateFixationForm : NgForm){
      rateFixationForm.value.RF_Report_Path = this.getimageUpload1(); 
      rateFixationForm.value.RF_Award_Upload = this.getAwardUpload1(); 
        if(rateFixationForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }    
  
       if(rateFixationForm.value.RF_Report_Path == null){
        this.formInvalid = true;      
        swal('Warning!', 'Please upload file.', 'warning');
        return;
      }
    
      else{    
       
          this.data = this.userService.PostRateFixation(rateFixationForm.value);    
          this.data.subscribe(
        (response) => {      
                 
          rateFixationForm.reset();
          rateFixationForm.resetForm();
          rateFixationForm.form.markAsPristine();
          rateFixationForm.form.markAsUntouched();        
          swal('Success!', 'Rate Fixation Added Successfully .', 'success');
          this.router.navigate(['/home/ratefixation']) ;   
          document.getElementById('loader-spinner').style.display = "none";           
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
  
    UpdateRateFixation(rateFixationForm : NgForm){     
       
      rateFixationForm.value.RF_Report_Path = this.getimageUpload1();
      rateFixationForm.value.RF_Award_Upload = this.getAwardUpload1(); 
      if(rateFixationForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }        
        
      else{          
        
          this.data = this.userService.UpdateRateFixation(this.RF_Id,rateFixationForm.value);    
          this.data.subscribe(
        (response) => {       
                 
          rateFixationForm.reset();
          rateFixationForm.resetForm();
          rateFixationForm.form.markAsPristine();
          rateFixationForm.form.markAsUntouched();        
          swal('Success!', 'Rate Fixation Updated Successfully .', 'success');
          this.router.navigate(['/home/ratefixation']) ;
          document.getElementById('loader-spinner').style.display = "none";           
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
      if(this.RF_Id > 0){
      this.data = this.userService.getAllProposalReportdropdown();
      this.data.subscribe(
        (response: any) => {
          this.proposallist = response;              
        });  
      }  
      else{      
        this.data = this.userService.getAllProposalReportdropdownOnfilter('RateFixation');
        this.data.subscribe(
        (response: any) => {
         this.proposallist = response.Result;                     
        });
      }      
    
   }

   GetTotal(){
    let TotalAcres = "0";
    this.r.RF_Total = parseFloat(TotalAcres) + parseFloat(this.r.RF_Val_asper_SRRate || 0) + parseFloat(this.r.RF_Val_asper_MarketRate || 0)
    + parseFloat(this.r.RF_asper_AwardRate || 0) + parseFloat(this.r.RF_Marlaki || 0)+ parseFloat(this.r.RF_Structures || 0);
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
              document.getElementById('loader-spinner').style.display = "none";   
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
            let i: any = document.getElementById('RF_Report_Path');
            i.value = "";
            if (error.status == 400) {                
              swal('Warning!', error.error.Message, 'warning');
            }
          });
      }
      else {
        let i: any = document.getElementById('RF_Report_Path');
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
        imagename = document.getElementById('RF_Report_Path');
        return imagename.files[0].name;
      }
      catch (e) {
        return null;
      }
    }

    //award upload
    imageAwardUpload(file: FileList) {   
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
            let i: any = document.getElementById('RF_Award_Upload');
            i.value = "";
            if (error.status == 400) {                
              swal('Warning!', error.error.Message, 'warning');
            }
          });
      }
      else {
        let i: any = document.getElementById('RF_Award_Upload');
        i.value = "";
        if (!uploadedFilename.match(regex))
          swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
        else if (size > 2048)
          swal('Warning!', "Please upload image file less than 2mb", 'warning');
      }
    }   
  
    getAwardUpload1() {
      let imagename = null;
      try {
        imagename = document.getElementById('RF_Award_Upload');
        return imagename.files[0].name;
      }
      catch (e) {
        return null;
      }
    }
  
  
  
    GetByIdRateFixation(RF_Id){
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetByIdRateFixation(RF_Id);
      this.data.subscribe(
        (response: any) => {
          this.r = response;
          this.GetProjectVillage(this.r.RF_PR_Id_FK);
          this.GetOtherrelatedinfo(this.r.RF_PR_Id_FK);

          setTimeout (() => {
          this.GetOtherrelatedinfo(this.r.RF_PR_Id_FK);
        }, 500)      
             
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
      }
  
      // Cancel(){    
      //   this.router.navigate(['/home/ratefixation']) ;      
      // }

  

}
