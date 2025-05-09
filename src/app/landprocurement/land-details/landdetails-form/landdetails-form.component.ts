import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-landdetails-form',
  templateUrl: './landdetails-form.component.html',
  styleUrls: ['./landdetails-form.component.css']
})
export class LanddetailsFormComponent implements OnInit {

  title="Add Land Owner Details";
  proposallist : any = {};
  o : any = {};
  data : any = {};  
  ProposalFor : string;
  fileToUpload: File = null;
  formInvalid : boolean = false;
  mode : string
  LOD_Id : number
  hide : boolean = false;
  FileList : any = [];
  f : any = [];
  Sharinglist:any=[];
  Schedulelist:any=[];
  LandTypellist:any=[];
  projectlist;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      
      this.LOD_Id = params['LOD_Id_PK'];
      this.mode = params['mode'];

      if(this.LOD_Id > 0){
       this.GetByIdLandOwnerDetails(this.LOD_Id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Land Owner Details";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Land Owner Details";
      }
    });
    this.getDefaultData()
    this.GetAllProjectforLR()
  }

  GetAllProjectforLR(){
   
    this.data = this.userService.GetAllProjectforLR();
    this.data.subscribe(
      (response:any) =>{       
        this.projectlist = response;
      },(error)=>{
        
      });
  }

  SaveLandOwnerDetails(landownerform : NgForm){
    //landownerform.value.LOFU_FileName = this.getimageUpload1(); 
     debugger;

     
      if(landownerform.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }   
   
    else{    
      landownerform.value.LandOwnerFileDetailsModels =  this.FileList;

        this.data = this.userService.PostLandOwnerDetails(landownerform.value);    
        this.data.subscribe(
      (response) => {   
               
        landownerform.reset();
        landownerform.resetForm();
        landownerform.form.markAsPristine();
        landownerform.form.markAsUntouched();        
        swal('Success!', 'Land Owner Detail Added Successfully .', 'success');
        this.router.navigate(['/home/landdetails']) ;   
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
    if(this.LOD_Id > 0){
    this.data = this.userService.getAllProposalReportdropdown();
    this.data.subscribe(
      (response: any) => {
        this.proposallist = response.Result;              
      });  
    }  
    else{      
      this.data = this.userService.getAllProposalReportdropdownOnfilter('LandOwnerDetail');
      this.data.subscribe(
      (response: any) => {
       this.proposallist = response.Result;                     
      });
    }  
 
    this.data = this.userService.GetLandType();
      this.data.subscribe(
      (response: any) => {
        this.LandTypellist= response;  
      })  
      this.data = this.userService.GetSchedule();
      this.data.subscribe(
      (response: any) => {
       this.Schedulelist= response;  
       
      })  
      this.data = this.userService.GetSharingPattern();
      this.data.subscribe(
      (response: any) => {
        this.Sharinglist= response;  
      })  
   }

   GetOtherrelatedinfo(Id){ 
    //document.getElementById('loader-spinner').style.display = "block";
    for(let i = 0 ; i< this.proposallist.length; i++){
      if(this.proposallist[i].PR_Id_PK == Id){        
        this.ProposalFor =  this.proposallist[i].PR_For;   
        document.getElementById('loader-spinner').style.display = "none";   
      }
    }    
  }


  GetByIdLandOwnerDetails(LOD_Id){   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdLandOwnerDetails(LOD_Id);
    this.data.subscribe(
      (response: any) => {
        this.o = response;
        this.FileList = this.o.LandOwnerFileDetailsModels;

        setTimeout (() => {
        this.GetOtherrelatedinfo(this.o.LOD_PR_Id_FK);
      }, 500)      
           
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }


    UpdateLandOwnerDetails(landownerform : NgForm){    

      if(landownerform.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{  
        landownerform.value.LandOwnerFileDetailsModels =  this.FileList; 
           
          this.data = this.userService.UpdateLandOwnerDetails(this.LOD_Id,landownerform.value);    
          this.data.subscribe(
        (response) => { 
                 
          landownerform.reset();
          landownerform.resetForm();
          landownerform.form.markAsPristine();
          landownerform.form.markAsUntouched();        
          swal('Success!', 'Land Owner Details Updated Successfully .', 'success');
          this.router.navigate(['/home/landdetails']) ;   
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

    FileDetails(f){     
      let temp = {
        LOFU_DOC_Type: f.LOFU_DOC_Type,
        LOFU_FileName: this.getimageUpload1()
      }        
      this.FileList.push(temp);
      this.f = {};
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
            let i: any = document.getElementById('LOFU_FileName');
            i.value = "";
            if (error.status == 400) {                
              swal('Warning!', error.error.Message, 'warning');
            }
          });
      }
      else {
        let i: any = document.getElementById('LOFU_FileName');
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
        imagename = document.getElementById('LOFU_FileName');
        return imagename.files[0].name;
      }
      catch (e) {
        return null;
      }
    }
    removeFile(i){
      this.FileList.splice(i, 1); 
    }

}
