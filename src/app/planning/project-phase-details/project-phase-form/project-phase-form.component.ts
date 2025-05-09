import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-project-phase-form',
  templateUrl: './project-phase-form.component.html',
  styleUrls: ['./project-phase-form.component.css']
})
export class ProjectPhaseFormComponent implements OnInit {
  PP_Id: any;
  title = "Project Phase";
  ProjPhase: any = {};
  data: any;
  projectlist: any = [];
  projectDetails: any = {};
  LandRecordDetailswithLTP: any;
  LandRecordDetailswithoutLTP: any;
  fileToUpload: File = null;
  PP_File_Show: any;
  proj: any = {};
  Phaselist:any=[];
  PD_Id:any;
  mode:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllProjectforLR();
    this.GetAllPhase();
    this.route.params.subscribe(params =>
      this.PD_Id = params['PD_Id']
    );
    this.route.params.subscribe(params =>
      this.PP_Id = params['PP_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if (this.PD_Id != null && this.mode != null){
      this.proj.PP_Pd_Id_Fk=this.PD_Id;
      this.GetProjectDetailsforTownPlanning(this.PD_Id,this.PP_Id);
    }
  }

  GetAllProjectforLR() {
    this.data = this.userService.GetAllProjectforLU();
    this.data.subscribe(
      (response: any) => {
       
        this.projectlist = response;
      }, (error) => {

      });
  }

  GetProjectDetailsforTownPlanning(PD_Id,PP_Id) {
    
    this.PP_File_Show = "hide";
    this.projectDetails = {};
    this.LandRecordDetailswithLTP = [];
    this.ProjPhase = {};
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetProjectDetailsforTownPlanning(PD_Id,PP_Id)
      .subscribe(
        (data: any) => {
          this.projectDetails = data;
          document.getElementById('loader-spinner').style.display = "none";
          this.LandRecordDetailswithLTP = data.LandRecordDetailswithLTP;

          if (data.ProjectPhaseModel != null) {
            this.ProjPhase = data.ProjectPhaseModel;
           if (this.ProjPhase.PP_File != null)
              this.PP_File_Show = "show";
          }
          for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
            if (this.LandRecordDetailswithLTP[i].LR_Selected == 1) {
              this.LandRecordDetailswithLTP[i].LR_Selected = true;
            }
            else { this.LandRecordDetailswithLTP[i].LR_Selected = false; }
          }
          //this.isUpdate=true;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
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
        document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
      });

  }

  changeCheckbox(LR_Id, LR_LTP_Id_Fk) {
    for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
      if (this.LandRecordDetailswithLTP[i].LR_Id == LR_Id) {
        if (this.LandRecordDetailswithLTP[i].LR_Selected == false) {
          this.LandRecordDetailswithLTP[i].LR_Selected = true;
          break;
        }
        else { this.LandRecordDetailswithLTP[i].LR_Selected = false; }
        break;
      }
    }
  }

  SaveSurveyNoforProjectPhase(PPDetails, Pd_Id) {
    if(PPDetails.PP_Phase_Id_Fk==null || PPDetails.PP_Phase_Id_Fk==undefined || PPDetails.PP_Phase_Id_Fk==" "){
      swal('warning', 'Phase is required!', 'warning');
      return;
    }
    let flag=0;
    for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
      if (this.LandRecordDetailswithLTP[i].LR_Selected == false) {
        this.LandRecordDetailswithLTP[i].LR_Selected = 0;
      }
      else { this.LandRecordDetailswithLTP[i].LR_Selected = 1; 
      flag=1;
      }
    }
    if(flag==0){
      swal('warning', 'Please select atleast one survey No.!', 'warning');
      return;
    }
    PPDetails.PP_Id = this.projectDetails.PP_Id;
    PPDetails.PP_File = this.getLTPPDFUrl();
    PPDetails.LandRecordDetailsModel = this.LandRecordDetailswithLTP;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.SaveSurveyNoforProjectPhase(PPDetails, Pd_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', 'Saved Successfully!', 'success');
          this.router.navigate(['/home/project-phase']);   
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  PPFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    // let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
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
          let i: any = document.getElementById('PP_File');
          i.value = "";
          if (error.status == 400) {    
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('PP_File');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getLTPPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('PP_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
}
