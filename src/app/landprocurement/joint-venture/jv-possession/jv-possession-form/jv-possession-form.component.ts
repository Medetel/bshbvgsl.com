import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../shared/ErrorHandler';

@Component({
  selector: 'app-jv-possession-form',
  templateUrl: './jv-possession-form.component.html',
  styleUrls: ['./jv-possession-form.component.css']
})
export class JvPossessionFormComponent implements OnInit {
  Agreementlst: any;
  pdid: any;
  title="Possession";
  Lod_Id: any;
  LandDetailslist: any=[];
  Agree_Date: any;
  Agreement_Number: any;
  Proj_Name: any;
  Agreementlist: any=[];
  
  proposallist : any=[];
  l: any = {};
  data : any ;
  district : string;
  Taluk : string ;
  Village : string;
  ProposalFor : string;  
  formInvalid : boolean = false;
  mode : string
  LP_Id : number
  hide : boolean = false;
  projectlist;
  Sch_Name: any;
  Submitted_Date: any;
  Surveylist: any=[];
  fileToUpload: File = null;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 

  }

  ngOnInit() {
    this.route.params.subscribe(params => {      
      this.LP_Id = params['LP_Id'];
      this.mode = params['mode'];

      
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Land Purchase";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Land Purchase";
      }
    });
    if(this.mode==null || this.mode==undefined)
    {
      this.mode="save"
    }
    // this.getDefaultData();    
    this.GetAllProjectforLR()
    if(this.LP_Id > 0){
      this.GetByIdInspection(this.LP_Id);
     }
  }


  GetAllProjectforLR(){
    this.data = this.userService.GetAllProjectforJV_New();
    this.data.subscribe(
      (response:any) =>{
       
        this.projectlist = response;
      },(error)=>{
        
      });
  }

  

  GetProjectId(PD_Id_FK) {
    this.pdid=PD_Id_FK
    // this.GetProposalId(PD_Id_FK)
    this.GetAgreementlist(PD_Id_FK)
    this.GetlanddetailsforLPandLA(PD_Id_FK)
    // this.la.LA_PD_Id_FK = PD_Id_FK;
    // this.l.LP_PD_Id_FK = PD_Id_FK;
    //this.GetSurveyNo(PD_Id_FK);
    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == PD_Id_FK) {
        this.Sch_Name = this.projectlist[i].Sch_Name;

        // document.getElementById('loader-spinner').style.display = "none";
      }
    }
  }

  GetAgreementlist(PD_Id) {
    this.data = this.userService.GetJVAgreementlist(PD_Id);
    this.data.subscribe(
      (response: any) => {      
        this.Agreementlist = response;
      }, (error) => {

      });
  }

  GetProjectproposaldetails(LP_Id) {
    
    this.data = this.userService.GetJVAgreementlist(this.pdid);
    this.data.subscribe(
      (response: any) => {        
        this.Agreementlst = response;
        for (let i = 0; i < this.Agreementlst.length; i++) {
          if (this.Agreementlst[i].JV_Id_PK == LP_Id) {
            this.Proj_Name=this.Agreementlst[i].PD_Project_Name;
            this.district = this.Agreementlst[i].DI_District;
            this.Taluk = this.Agreementlst[i].TA_Taluk;
            this.Village = this.Agreementlst[i].PR_Village;
            this.ProposalFor = this.Agreementlst[i].PR_For;
            this.Submitted_Date = this.Agreementlst[i].PR_Submitted_Date;
            this.Sch_Name=this.Agreementlst[i].Sch_Name;
            this.Agreement_Number = this.Agreementlst[i].JV_Note_No;
            this.Agree_Date=this.Agreementlst[i].JV_Note_Date;
            this.Lod_Id=this.Agreementlst[i].JV_LOD_Id_Fk;
            this.GetlanddetailsforLA(this.l.JV_PD_Id_FK,LP_Id,this.Lod_Id,this.mode)
            // this.GetlanddetailsforLA(this.Land61acquisitionlist[i].LA_PD_Id_FK,LA_Id,this.mode)
            // this.GetProjectVillage(this.Land61acquisitionlist[i].LA_PR_Id_FK)
            // this.GetProjectandPropId(this.Land61acquisitionlist[i].LA_PD_Id_FK,this.Land61acquisitionlist[i].LA_PR_Id_FK)
            //  this.Land61acquisitionlist[i].LA_PD_Id_FK;
          }
        }
      }, (error) => {

      });
    
  }

  GetlanddetailsforLPandLA(PD_Id_FK){
    this.data = this.userService.GetlanddetailsforJVandLA(PD_Id_FK);
    this.data.subscribe(
      (response:any) =>{        
        this.Surveylist = response;
      },(error)=>{
        
      });
  }

  GetProposalId(Id) {
    
    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == Id)
        this.l.JV_PR_Id_FK = this.projectlist[i].PD_PR_Id_FK
      //this.Pr_Id = this.pro.pro_PR_Id_FK;
      this.GetOtherrelatedinfo(this.l.JV_PR_Id_FK)
    }
  }

  getDefaultData(){
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllProposalReportdropdownJV_New();
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.proposallist = response;
      });
         
  }

 

  GetOtherrelatedinfo(Id) {    
   
    for (let i = 0; i < this.proposallist.length; i++) {
      if (this.proposallist[i].PR_Id_PK == Id) {
        this.district = this.proposallist[i].DI_District;
        this.Taluk = this.proposallist[i].TA_Taluk;
        this.Village = this.proposallist[i].PR_Village;
        this.ProposalFor = this.proposallist[i].PR_For;
        this.Submitted_Date = this.proposallist[i].PR_Submitted_Date;
        document.getElementById('loader-spinner').style.display = "none";
      }
    }
  }

  SaveLandPurchase(LandPurchaseForm : NgForm){   

      if(LandPurchaseForm.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }   
   
    else{ 
      for (let i = 0; i < this.Surveylist.length; i++) {
        if (this.Surveylist[i].LD_Selected == false) {
          this.Surveylist[i].LD_Selected = 0;
        }
        else { this.Surveylist[i].LD_Selected = 1; }
      }
      LandPurchaseForm.value.JV_file = this.getimageUpload1(); 
      LandPurchaseForm.value.LandPurchaseandAcquisitionLDModel=this.Surveylist;
        this.data = this.userService.PostLandPurchaseDetails(LandPurchaseForm.value);    
        this.data.subscribe(
      (response) => {   
               
        LandPurchaseForm.reset();
        LandPurchaseForm.resetForm();
        LandPurchaseForm.form.markAsPristine();
        LandPurchaseForm.form.markAsUntouched();    
        
        
        swal('Success!', 'Agreement Details Added Successfully .', 'success');
        this.router.navigate(['/home/landpurchase/land-pur-agreement']) ;   
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


  UpdateLandPurchase(LandPurchaseForm : NgForm){   

    if(LandPurchaseForm.invalid)
  {
    this.formInvalid = true;
    swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
    return;
  }   
 
  // else{ 
    if (LandPurchaseForm.value.JV_POSfile_path != null && !LandPurchaseForm.value.JV_POSfile_path.match("http"))
    LandPurchaseForm.value.JV_POSfile_path = this.getimageUpload1();
      this.data = this.userService.UpdateJV(LandPurchaseForm.value,LandPurchaseForm.value.JV_Id_PK,3);    
      this.data.subscribe(
    (response) => {   
             
      LandPurchaseForm.reset();
      LandPurchaseForm.resetForm();
      LandPurchaseForm.form.markAsPristine();
      LandPurchaseForm.form.markAsUntouched();        
      swal('Success!', 'Updated Successfully .', 'success');
      this.router.navigate(['/home/joint-venture/jv-possession']) ;   
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
  // }
}

  GetByIdInspection(IR_Id){   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdJV(IR_Id);
    this.data.subscribe(
      (response: any) => {
        this.l = response;
        this.pdid=this.l.JV_PD_Id_FK
        this.l.JV_Possession_Date = ((this.l.JV_Possession_Date).split('T'))[0];
        this.GetAgreementlist(this.l.JV_PD_Id_FK)
        this.GetlanddetailsforLA(this.l.JV_PD_Id_FK,this.l.JV_Id_PK,this.l.JV_LOD_Id_Fk,this.mode)
        this.GetProjectproposaldetails(this.l.JV_Id_PK)
      //   setTimeout (() => {
      //     this.GetProjectproposaldetails(this.l.JV_Id_PK)
      // }, 500)      
           
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
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
            let i: any = document.getElementById('JV_POSfile_path');
            i.value = "";
            if (error.status == 400) {                
              swal('Warning!', error.error.Message, 'warning');
            }
          });
      }
      else {
        let i: any = document.getElementById('JV_POSfile_path');
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
        imagename = document.getElementById('JV_POSfile_path');
        return imagename.files[0].name;
      }
      catch (e) {
        return null;
      }
    }

    changeCheckbox(LD_Id, PR_AuctionProperty) {
      for (let i = 0; i < this.Surveylist.length; i++) {
        if (this.Surveylist[i].LD_Id == LD_Id) {
          if (this.Surveylist[i].LD_Selected == false) {
            this.Surveylist[i].LD_Selected = true;
            this.Surveylist[i].LPA_Ld_Id_Fk = this.Surveylist[i].LD_Id;
            break;
          }
          else { this.Surveylist[i].LD_Selected = false; }
          break;
        }
      }
    }
    
    GetlanddetailsforLA(PD_Id_FK,LP_Id,LOD_Id_Fk,mode) {
      if(LP_Id==undefined){
        LP_Id=0;
      }
      this.data = this.userService.GetlanddetailsforJV(PD_Id_FK,LOD_Id_Fk,LP_Id,mode);
      this.data.subscribe(
        (response: any) => {
          
          this.LandDetailslist = response;
        }, (error) => {
  
        });
    }

    selectexculdesurveyno(LD_Id, Status, Id, Pd_Id,LA_Id,LOD_Id_Fk) {
      // if(LA_Id!=null){
      //   for (let i = 0; i < this.Land61acquisitionlist.length; i++) {
      //     if (this.Land61acquisitionlist[i].LA_Id_PK == LA_Id) {
      //       Pd_Id=this.Land61acquisitionlist[i].LA_PD_Id_FK;
      //     }
      //   }
      // }
          if (Status == 'ex') {
            swal({
              title: 'Are you sure?', text: "You want to Exclude!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Reject it!'
            }).then((result) => {
              if (result.value) {
                this.includeexculdesurveyno(LD_Id, Status, Id, Pd_Id,LA_Id,LOD_Id_Fk);
              }
            })
          }
          else {
            swal({
              title: 'Are you sure?', text: "You want to Approve!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Approve it!'
            }).then((result) => {
              if (result.value) {
                this.includeexculdesurveyno(LD_Id, Status, Id, Pd_Id,LA_Id,LOD_Id_Fk);
              }
            })
          }
        }
      
        includeexculdesurveyno(LD_Id, Status, Id, Pd_Id,LA_Id,LOD_Id_Fk) {
          document.getElementById('loader-spinner').style.display = "block";
          this.userService.includeexculdesurveynoforJV(LD_Id, Status, Id, Pd_Id,LA_Id)
            .subscribe(
              (data) => {
                this.GetlanddetailsforLA(Pd_Id,LA_Id,LOD_Id_Fk,this.mode);
                document.getElementById('loader-spinner').style.display = "none";
                if (Status == 'ex')
                  swal('Rejected!', 'Selected Successfully.', 'success');
                else
                  swal('Approved!', 'Excluded Successfully.', 'success');
              }, (error) => {
                document.getElementById('loader-spinner').style.display = "none";
                // swal({ text: 'Please delete all pro belonging to this office.' });
                this.errorHandler.handleError(error);
              });
        }
}
