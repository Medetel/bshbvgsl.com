import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-land-project-form',
  templateUrl: './land-project-form.component.html',
  styleUrls: ['./land-project-form.component.css']
})
export class LandProjectFormComponent implements OnInit {

  proposallst: any;
  ProjCode: any;
  numericpattern = "^[0-9]*$";
  mode: any;
  PD_Id: any;
  luplist: any;
  ptlist: any;
  formSubmitted: boolean;
  title = "Add Project"
  village;
  hobli;
  taluk;
  project: any = {};
  proj: any = {};
  districtlist;
  fileToUpload: File = null;
  FeasibilityPDFUrl: string = "assets/images/default.jpg";
  data: any;
  Schemelist;
  Phaselist;
  proposallist: any = {};
  Block: any = {};
  ProposalFor: any;
  district: any;
  Ta_Id: any;
  //numpattern = "[^\s]+[a-zA-Z ]*[^\s]+";
  formInvalid:boolean;
  hide: boolean;
  DivisionList: any;
  DistrictList: any;
  DSWOId_NO_Division_Id_Fk: any;
  DSWOId_NO_DI_Id_Fk: any;
  modeofprocurement : any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
  }

  ngOnInit() {
    this.GetAllDivision();
    this.GetAllSchemes();
    this.GetAllPhase();
    this.GetAllDistrict();
    this.getAllproperty();
    //this.GetAllDistricts(this.project.PD_Phase);
    this.GetAllLanduseperMasterplan();
    
    this.route.params.subscribe(params =>
      this.PD_Id = params['PD_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if(this.PD_Id==null){
      this.project.PD_Phase=1001;
    }
    if(this.mode == 'view'){
        
    }
    if(this.mode == 'edit'){
       
    }
    if (this.PD_Id != null && this.mode != null)
      this.GetProjectForTheId(this.PD_Id);
      this.getDefaultData();
  }

  GetProjectForTheId(PD_Id) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetProjectForTheId(PD_Id)
      .subscribe(
        (data: any) => {
          this.project = data;
          if(this.project.PD_MOP_Acuistion != null)
          {
            this.modeofprocurement = 'Acquisition';
          }
          else if(this.project.PD_MOP_Purchase != null){
            this.modeofprocurement = this.project.PD_MOP_Purchase;
          }
          else if(this.project.PD_MOP_Landsharing != null){
            this.modeofprocurement = this.project.PD_MOP_Landsharing;
          }
          else {
            this.modeofprocurement = this.project.PD_MOP_JV;
          }

          
          this.project.DSWOId_NO_Division_Id_Fk = this.project.PD_Phase;
          this.project.DSWOId_NO_DI_Id_Fk = this.project.PD_DI_Id_FK;
          this.project.PD_TA_Id_FK = this.project.PD_TA_Id_FK;
          console.log(this.project.DSWOId_NO_DI_Id_Fk);
          this.project.PD_Project_Code = ((this.project.PD_Project_Code).split('-'))[0];
          this.GetOtherrelatedinfo(this.project.PD_PR_Id_FK);
          this.GetAllDistricts(this.project.PD_Phase);
          this.GetBlocks(this.project.PD_DI_Id_FK);
          
          //this.getTaluk(this.project.PD_DI_Id_FK);
          //this.getHobli(this.project.PD_TA_Id_FK, 0);
          //  this.getVillage(this.project.PD_VI_Id_FK);
          if (this.project.PD_Feasibility_Report != null)
            // this.SupAgreementPDFUrl=data.SA_Aggrement_Doc;
            this.project.PD_Feasibility_Report = data.PD_Feasibility_Report;
          //this.isUpdate=true;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
  GetAllDistricts(DSWOId_NO_Division_Id_Fk) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllDistrictsnoti(DSWOId_NO_Division_Id_Fk);
    this.data.subscribe(
      (response: any) => {
        this.DistrictList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  
  GetBlocks(DI_Id) {
    debugger;
    if (DI_Id > 0) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getAllBlockName(DI_Id);
      this.data.subscribe(
        (response: any) => {
          this.Block = response;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
  }
  GetAllDivision() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllDivision();
    this.data.subscribe(
      (response: any) => {
        this.DivisionList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetOtherrelatedinfo(Id) {
    
    this.data = this.userService.GetAllProposalReportForDropdown();
    this.data.subscribe(
      (response: any) => {
        this.proposallst = response.Result;
        for (let i = 0; i < this.proposallst.length; i++) {
          if (this.proposallst[i].PR_Id_PK == Id) {
            this.project.PD_DI_Id_FK = this.proposallst[i].DI_Id;
           // this.project.PD_TA_Id_FK = this.proposallst[i].TA_Id;
            this.project.PD_Village = this.proposallst[i].PR_Village;
            this.district = this.proposallst[i].DI_Id;
            this.Ta_Id = this.proposallst[i].TA_Id;
            //if(this.project.PD_DI_Id_FK!=null){
            this.getTaluk(this.project.PD_DI_Id_FK);
            // }
    
            this.ProposalFor = this.proposallst[i].PR_For;
            // document.getElementById('loader-spinner').style.display = "none";
          }
        }
      });
    //document.getElementById('loader-spinner').style.display = "block";
    
  }

  getDefaultData() {
    this.data = this.userService.GetAllProposalReportForDropdown();
    this.data.subscribe(
      (response: any) => {
        this.proposallist = response.Result;
      });
  }

  GetAllDistrict() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.districtlist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
      });
  }

  GetAllSchemes() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllSchemes();
    this.data.subscribe(
      (response: any) => {
        this.Schemelist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
      });
  }

  GetAllPhase() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllPhase();
    this.data.subscribe(
      (response: any) => {
        this.Phaselist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
      });

  }
  getAllproperty() {

    this.data = this.userService.GetAllPlanproject();
    this.data.subscribe(
      (response: any) => {
        this.ptlist = response;
      }, (error) => {
      });

  }

  // Cancel(){    
  //   this.router.navigate(['/home/Land-planning'])    
  // }

  GetAllLanduseperMasterplan() {

    this.data = this.userService.GetAllLanduseperMasterplan();
    this.data.subscribe(
      (response: any) => {
        this.luplist = response;
      }, (error) => {
      });

  }
  getvillhobli() {
    
  }

  getTaluk(DistrictId: any) {
    
    this.data = this.userService.getAllTalukName(DistrictId);
    this.data.subscribe(
      (response: any) => {
        this.taluk = response;
      }, (error) => {
      });
  }

  getHobli(TalukId, No: any) {
    
    this.data = this.userService.getAllHobliName(TalukId);
    this.data.subscribe(
      (response: any) => {
        if (No == 1) { this.project.PD_HO_Id_FK = undefined }
        this.hobli = response;
      }, (error) => {
      });
  }
  getVillage(HobliId) {

    this.data = this.userService.getAllVillageName(HobliId);
    this.data.subscribe(
      (response: any) => {
        this.village = response;
      }, (error) => {
      });
  }

  FeasibilityFileInput(file: FileList) {

    
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;


    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.FeasibilityPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {         
          // this.app.APP_PA_PhotoErrorMessage="";

        }, (error) => {
          let i: any = document.getElementById('PD_Feasibility_Report');
          i.value = "";
          if (error.status == 400) {
            this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('PD_Feasibility_Report');
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
      imagename = document.getElementById('PD_Feasibility_Report');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  onSubmit(form: NgForm) {
  debugger;
    if (!form.invalid) {
      this.ProjCode = form.value.PD_Project_Code;
      form.value.PD_DI_Id_FK = form.value.DSWOId_NO_DI_Id_Fk;
      //form.value.PD_TA_Id_FK = form.value.PD_TA_Id_FK;
      form.value.PD_Phase = form.value.DSWOId_NO_Division_Id_Fk;
      document.getElementById('loader-spinner').style.display = "block";
      form.value.PD_Feasibility_Report = this.getFeasibilityPDFUrl();
      this.userService.CreateProjectDetails(form.value)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Project Code ' + this.ProjCode + ' is Created Successfully!', 'success');
            this.router.navigate(['/home/Land-planning']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }

  update(form: NgForm) {
    debugger;
    if (!form.invalid) {
      this.ProjCode = form.value.PD_Project_Code;
      form.value.PD_DI_Id_FK = form.value.DSWOId_NO_DI_Id_Fk;
      //form.value.PD_TA_Id_FK = form.value.PD_TA_Id_FK;
      form.value.PD_Phase = form.value.DSWOId_NO_Division_Id_Fk;
      document.getElementById('loader-spinner').style.display = "block";
      form.value.PD_Feasibility_Report = this.getFeasibilityPDFUrl();
      this.userService.updateProjectDetails(form.value, this.PD_Id)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Project Code ' + this.ProjCode + ' is Updated Successfully!', 'success');
            this.router.navigate(['/home/Land-planning']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }
}
