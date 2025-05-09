import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-cp-form',
  templateUrl: './cp-form.component.html',
  styleUrls: ['./cp-form.component.css']
})
export class CpFormComponent implements OnInit {

  title = "Add Case Proceedings";
  Case_Id : number;
  mode:string; 
  data : any = {};
  caseDetails : any = [];
  pf : any = {};
  hearingdateview : boolean = false;
  settlementdataview : boolean = false;
  statusview : string ;
  fileToUpload: File = null;
  Case_ProcId : number ;
  formInvalid: boolean = false;

  primaryKey : any = 0;
  row_no : any = 0; 
  details : any ;
  fromUtility : boolean = false;
  caseProjectDetails: any = {};
  Adv_AdvocateName: any;
  CasePeti_PetitionerName: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //  this.mode = params['mode'];
      this.Case_Id = params['Id'];  
      this.mode  =   params['mode'];
      this.Case_ProcId =   params['CaseProcId'];
        this.GetCaseDetails(this.Case_Id);
        this.GetCaseProjectDetails(this.Case_Id);
        if(this.Case_ProcId > 0){
          this.GetCaseProcById(this.Case_ProcId)
        }    
    });

    //Route form utilities
    this.row_no = localStorage.getItem('row_no');
    this.primaryKey = localStorage.getItem('PrimaryKey');
    if(this.row_no > 0){ 
      this.mode = 'view';          
      this.getEditData()
    }


    if(this.mode=='view'){
      this.title = "View Case Proceedings";
    }
    else if(this.mode=='edit'){
      this.title = "Edit Case Proceedings";
    }

    this.GetHearingDate(this.Case_Id)
  }

  GetHearingDate(CaseId){
    this.data = this.userService.GetHearingDate(CaseId);
    this.data.subscribe(
      (response: any) => {
        response;  
        this.pf.CaseProc_HearingDate = ((response).split('T'))[0];       
      });    
  }
  GetCaseProjectDetails(CaseId){
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCaseProjectDetails(CaseId);
    this.data.subscribe(
      (response: any) => {
        this.caseProjectDetails = response;  
       this.Adv_AdvocateName = this.caseProjectDetails.AdvocatesOfCasesModels[0].Adv_AdvocateName
       this.CasePeti_PetitionerName = this.caseProjectDetails.CasePetitionerModels[0].CasePeti_PetitionerName        
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetCaseDetails(CaseId){
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCaseDetails(CaseId);
    this.data.subscribe(
      (response: any) => {
        this.caseDetails = response;        
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  SaveCaseProceeding(CaseProc: NgForm){    

    if(CaseProc.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }      

    else if(CaseProc.value.CaseProc_Courtattend == null){
      swal('Warning!', 'Please select court attended or not.', 'warning');
    }

    else if(CaseProc.value.CaseProc_SettlementDone == null){
      swal('Warning!', 'Please select settlement done or what.', 'warning');
    }

    else if(CaseProc.value.CaseProc_Status == null){
      swal('Warning!', 'Please select case status.', 'warning');
    }

    else{

    CaseProc.value.CaseProc_Case_Id_FK =  this.Case_Id;
    CaseProc.value.CaseProc_ProceedingUploadpath = this.getFeasibilityPDFUrl();
    CaseProc.value.CaseProc_SettlementUploadpath = this.getimageUpload1();      

    this.data = this.userService.PostCaseProceedingDetails(CaseProc.value);    
    this.data.subscribe(
      (response) => {
        CaseProc.reset();
        CaseProc.resetForm();
        CaseProc.form.markAsPristine();
        CaseProc.form.markAsUntouched();        
        swal('Success!', 'Case Proceeding Added Successfully .', 'success');
        this.router.navigate(['/home/caseproceeding/cp-view',this.Case_Id]) ;   
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

  UpdateCaseProceeding(CaseProc: NgForm){  

    CaseProc.value.CaseProc_Case_Id_FK =  this.Case_Id;
    CaseProc.value.CaseProc_ProceedingUploadpath = this.getFeasibilityPDFUrl();
    CaseProc.value.CaseProc_SettlementUploadpath = this.getimageUpload1();

    this.data = this.userService.UpdateCaseProc(this.Case_ProcId,CaseProc.value);
    this.data.subscribe(
      (response) => {
        CaseProc.reset();
        CaseProc.resetForm();
        CaseProc.form.markAsPristine();
        CaseProc.form.markAsUntouched();        
        swal('Success!', 'Case Proceeding Updated Successfully .', 'success');
        this.router.navigate(['/home/caseproceeding/cp-view',this.Case_Id]) ;   
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

  //Proceeding file uplaod
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
              let i: any = document.getElementById('CaseProc_ProceedingUploadpath');
              i.value = "";
              if (error.status == 400) {                
                swal('Warning!', error.error.Message, 'warning');
              }
            });
        }
        else {
          let i: any = document.getElementById('CaseProc_ProceedingUploadpath');
          i.value = "";
          if (!uploadedFilename.match(regex))
            swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
          else if (size > 2048)
            swal('Warning!', "Please upload image file less than 2mb", 'warning');
        }
      }    
    
      getFeasibilityPDFUrl() {
        let imagename = null;
        try {
          imagename = document.getElementById('CaseProc_ProceedingUploadpath');
          return imagename.files[0].name;
        }
        catch (e) {
          return null;
        }
      }

      //Settlement file upload
      imageUploadtwo(file: FileList) {
        
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
              let x = this.userService.uploadImage(data);
              x.subscribe(
                (response) => {                  
                  // this.app.APP_PA_PhotoErrorMessage="";
        
                }, (error) => {
                  let i: any = document.getElementById('CaseProc_SettlementUploadpath');
                  i.value = "";
                  if (error.status == 400) {
                    //this.FeasibilityPDFUrl = "assets/images/image-default.png";
                    swal('Warning!', error.error.Message, 'warning');
                  }
                });
            }
            else {
              let i: any = document.getElementById('CaseProc_SettlementUploadpath');
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
              imagename = document.getElementById('CaseProc_SettlementUploadpath');
              return imagename.files[0].name;
            }
            catch (e) {
              return null;
            }
          }


  CourtAttent(value){
    if(value == 'Y'){
      this.hearingdateview = true;
    }
    else{
      this.hearingdateview = false;
    }
  }

  Settlement(value){    
    if(value == 'Y'){
    this.settlementdataview = true;
    }
    else{
      this.settlementdataview = false;
    }
  }

  Status(value){
    if(value == 'O'){
      this.statusview = 'true';
      }

      else{
        this.statusview = 'false';
      }
  }

  GetCaseProcById(CaseProcId){    
    document.getElementById('loader-spinner').style.display = "block";  
    this.data = this.userService.GetCaseProcById(CaseProcId);   
    this.data.subscribe(
      (response: any) => {        
        this.pf = response;
        if(response.CaseProc_Courtattend == 'Y'){
          this.hearingdateview = true;

          if (this.pf.CaseProc_HearingDate != null)
         this.pf.CaseProc_HearingDate = ((this.pf.CaseProc_HearingDate).split('T'))[0];        
        }
        else{
          this.hearingdateview = false;
        }

        if(response.CaseProc_SettlementDone == 'Y'){
          this.settlementdataview = true;

          if (this.pf.CaseProc_SettlementDate != null)
         this.pf.CaseProc_SettlementDate = ((this.pf.CaseProc_SettlementDate).split('T'))[0];
        }
        else
          this.settlementdataview = false;
        

        if(response.CaseProc_Status == 'Ongoing'){
          this.statusview = 'true';
          if (this.pf.CaseProc_NextHearingDate != null)
          this.pf.CaseProc_NextHearingDate = ((this.pf.CaseProc_NextHearingDate).split('T'))[0];
        }
        else
        {
          this.statusview = 'false';
          if (this.pf.CaseProc_DisposedDate != null)
          this.pf.CaseProc_DisposedDate = ((this.pf.CaseProc_DisposedDate).split('T'))[0];
        }      

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  //Cancel
  cancel(){
    this.router.navigate(['/home/caseproceeding/cp-view',this.Case_Id]);
  }


  //For log
  getEditData(){  
     
    if(this.row_no>0){
      this.fromUtility = true;
    }

    var details = localStorage.getItem('FormDetails');
    this.details = JSON.parse(details);  
    
    localStorage.removeItem('row_no');
    localStorage.removeItem('PrimaryKey'); 
      
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCaseRegistrationforEditedValue(this.details.tableName,this.details.fromDate,this.details.Todate,this.primaryKey,this.row_no);   
    this.data.subscribe(
      (response: any) => {          
         this.pf = response[0];         

         if(this.pf.CaseProc_Courtattend == 'Y'){
          this.hearingdateview = true;

          if (this.pf.CaseProc_HearingDate != null)
         this.pf.CaseProc_HearingDate = ((this.pf.CaseProc_HearingDate).split('T'))[0];        
        }
        else{
          this.hearingdateview = false;
        }

        if(this.pf.CaseProc_SettlementDone == 'Y'){
          this.settlementdataview = true;

          if (this.pf.CaseProc_SettlementDate != null)
         this.pf.CaseProc_SettlementDate = ((this.pf.CaseProc_SettlementDate).split('T'))[0];
        }
        else
          this.settlementdataview = false;
        

        if(this.pf.CaseProc_Status == 'Ongoing'){
          this.statusview = 'true';
          if (this.pf.CaseProc_NextHearingDate != null)
          this.pf.CaseProc_NextHearingDate = ((this.pf.CaseProc_NextHearingDate).split('T'))[0];
        }
        else
        {
          this.statusview = 'false';
          if (this.pf.CaseProc_DisposedDate != null)
          this.pf.CaseProc_DisposedDate = ((this.pf.CaseProc_DisposedDate).split('T'))[0];
        }          
      
        this.GetCaseDetails(this.pf.CaseProc_Case_Id_FK);
       
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });


  }
}
