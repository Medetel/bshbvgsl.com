import { Component, OnInit } from '@angular/core';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-land-town-planning-form',
  templateUrl: './land-town-planning-form.component.html',
  styleUrls: ['./land-town-planning-form.component.css']
})
export class LandTownPlanningFormComponent implements OnInit {

  LTP: any = {};
  data: any;
  projectlist: any = [];
  projectDetails: any = {};
  LandRecordDetailswithLTP: any;
  LandRecordDetailswithoutLTP: any;
  fileToUpload: File = null;
  LTP_File_Show: any;
  proj: any = {};
  PD_Id: any;
  mode: any;
  LTPId:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllProjectforLR();
    this.route.params.subscribe(params =>
      this.PD_Id = params['PD_Id']
    );
    this.route.params.subscribe(params =>
      this.LTPId = params['LTP_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if (this.PD_Id != null && this.mode != null) {
      this.proj.LTP_Pd_Id_Fk = this.PD_Id;
      this.GetProjectDetailsforLandtoTown(this.PD_Id,this.LTPId);
    }
  }

  GetAllProjectforLR() {
    this.data = this.userService.GetAllProjectforLR();
    this.data.subscribe(
      (response: any) => {       
        this.projectlist = response;
      }, (error) => {

      });
  }

  GetProjectDetailsforLandtoTown(PD_Id,LTPId) {
    
    this.LTP_File_Show = "hide";
    this.projectDetails = {};
    this.LandRecordDetailswithoutLTP = [];
    this.LandRecordDetailswithLTP = [];
    this.LTP = {};
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetProjectDetailsforLandtoTown(PD_Id,LTPId)
      .subscribe(
        (data: any) => {

          this.projectDetails = data;
          if(this.mode != 'view'){
            this.projectDetails.LTP_Id="";
          }else{
            this.projectDetails.LTP_Id=this.LTPId;
          }

          document.getElementById('loader-spinner').style.display = "none";
          if (this.mode == 'view') {
            this.LandRecordDetailswithLTP = data.LandRecordDetailswithLTP;
          }
          this.LandRecordDetailswithoutLTP = data.LandRecordDetailswithoutLTP;

          if (this.mode == 'view') {
            if (data.LandtoTownPlanModel != null) {
              this.LTP = data.LandtoTownPlanModel;
              if (this.LTP.LTP_Date != null)
                this.LTP.LTP_Date = ((this.LTP.LTP_Date).split('T'))[0];
              if (this.LTP.LTP_File != null)
                this.LTP_File_Show = "show";
            }
          }

          for (let i = 0; i < this.LandRecordDetailswithoutLTP.length; i++) {
            if (this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk != null) {
              this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk = true;
            }
            else { this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk = false; }
          }

          //this.isUpdate=true;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  changeCheckbox(LR_Id, LR_LTP_Id_Fk) {
    for (let i = 0; i < this.LandRecordDetailswithoutLTP.length; i++) {
      if (this.LandRecordDetailswithoutLTP[i].LR_Id == LR_Id) {
        if (this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk == false) {
          this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk = true;
          break;
        }
        else { this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk = false; }
        break;
      }
    }
  }

  SaveSurveyNoforTownPlanning(LTPDetails, Pd_Id) {
    for (let i = 0; i < this.LandRecordDetailswithoutLTP.length; i++) {
      if (this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk == false) {
        this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk = 0;
      }
      else { this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk = 1; }
    }
    LTPDetails.LTP_Id = this.projectDetails.LTP_Id;
    LTPDetails.LTP_File = this.getLTPPDFUrl();
    LTPDetails.LandRecordDetailsModel = this.LandRecordDetailswithoutLTP;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.SaveSurveyNoforTownPlanning(LTPDetails, Pd_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', 'Saved Successfully!', 'success');
          this.router.navigate(['/home/land-town-planning']);
          //this.GetProjectDetailsforLandtoTown(Pd_Id,this.LTPId);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  LTPFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    // let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.LayoutPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {        

        }, (error) => {
          let i: any = document.getElementById('LTP_File');
          i.value = "";
          if (error.status == 400) {
            // this.LayoutPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LTP_File');
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
      imagename = document.getElementById('LTP_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
}
