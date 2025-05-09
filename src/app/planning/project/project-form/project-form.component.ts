import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

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
  //numpattern = "[^\s]+[a-zA-Z ]*[^\s]+";

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
  }

  ngOnInit() {
    this.GetAllSchemes();
    this.GetAllPhase();
    this.GetAllDistrict();
    this.getAllproperty();
    this.GetAllLanduseperMasterplan();
    this.route.params.subscribe(params =>
      this.PD_Id = params['PD_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if (this.PD_Id != null && this.mode != null)
      this.GetProjectForTheId(this.PD_Id);
  }

  GetProjectForTheId(PD_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetProjectForTheId(PD_Id)
      .subscribe(
        (data: any) => {
          this.project = data;
          this.project.PD_Project_Code = ((this.project.PD_Project_Code).split('-'))[0];
          
          this.getTaluk(this.project.PD_DI_Id_FK);
          this.getHobli(this.project.PD_TA_Id_FK, 0);
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
   
    if (!form.invalid) {
      this.ProjCode=form.value.PD_Project_Code;
      document.getElementById('loader-spinner').style.display = "block";
      form.value.PD_Feasibility_Report = this.getFeasibilityPDFUrl();
      this.userService.CreateProjectDetails(form.value)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Project Code ' +this.ProjCode+ ' is Created Successfully!', 'success');
            this.router.navigate(['/home/planning']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }

  update(form: NgForm) {
    
    if (!form.invalid) {
      this.ProjCode=form.value.PD_Project_Code;
      document.getElementById('loader-spinner').style.display = "block";
      form.value.PD_Feasibility_Report = this.getFeasibilityPDFUrl();
      this.userService.updateProjectDetails(form.value, this.PD_Id)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Project Code ' +this.ProjCode+ ' is Updated Successfully!', 'success');
            this.router.navigate(['/home/planning']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }
  
}
