import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-proposal-form',
  templateUrl: './proposal-form.component.html',
  styleUrls: ['./proposal-form.component.css']
})
export class ProposalFormComponent implements OnInit {

  title = "Add Proposal"
  pr: any = {};
  data: any;
  Districts: any = [];
  Taluks: any = [];
  Block: any = [];
  fileToUpload: File = null;
  formInvalid: boolean = false;
  PR_Id_PK: number;
  mode: string = "";
  hide: boolean = false;
  ProposalId: string = '';
  uploadPath: string;
  uploadPath2: string;
  vi: any = {};
  villageDetails: any = [];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //  this.mode = params['mode'];
      this.PR_Id_PK = params['PR_Id'];
      this.mode = params['mode'];

      if (this.PR_Id_PK > 0) {
        this.GetProposalReportById(this.PR_Id_PK);
      }

      if (this.mode == 'view') {
        this.hide = true;
      }
      if (this.mode == 'edit') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "View Proposal";
      }
      else if (this.mode == 'edit') {
        this.title = "Edit Proposal";
      }
    });

    this.GetAllDistrict();
  }

  SaveProposalForm(ProposalForm: NgForm) {
    debugger;
    if (ProposalForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else if (ProposalForm.value.PR_For == null) {
      swal('Warning!', 'Please select Proposal for.', 'warning');
    }

    else {
      ProposalForm.value.PR_Report_Path = this.getimageUpload1();
      ProposalForm.value.GramachavadiUploadPath = this.getimageUpload2();
      ProposalForm.value.PR_DemandSurveyFile = this.getimageDemandUpload1();
      ProposalForm.value.ProjectvillageModel = this.villageDetails;
      console.log('data'+JSON.stringify(ProposalForm.value));
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.PostProposalReport(ProposalForm.value);
    
      this.data.subscribe(
        (response) => {
          this.ProposalId = response;
          console.log('data'+JSON.stringify(response));
          ProposalForm.reset();
          ProposalForm.resetForm();
          ProposalForm.form.markAsPristine();
          ProposalForm.form.markAsUntouched();
          swal('Success!', 'Proposal Report Added Successfully with generation of Proposal ID:' + this.ProposalId + '.', 'success');
          this.router.navigate(['/home/landprocurement']);
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

  UpdateProposalForm(ProposalForm: NgForm) {
    let imag = this.getimageUpload1();
    if (imag != null) {
      ProposalForm.value.PR_Report_Path = this.getimageUpload1();
    }

    else {
      ProposalForm.value.PR_Report_Path = 'NoUpdate'
    }

    let imag1 = this.getimageUpload2();
    if (imag1 != null)
      ProposalForm.value.GramachavadiUploadPath = this.getimageUpload2();
    else
      ProposalForm.value.GramachavadiUploadPath = this.uploadPath2;
    ProposalForm.value.PR_DemandSurveyFile = this.getimageDemandUpload1();
    ProposalForm.value.ProjectvillageModel = this.villageDetails;   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.UpdateProposalReport(this.PR_Id_PK, ProposalForm.value);
    this.data.subscribe(
      (response) => {
        ProposalForm.reset();
        ProposalForm.resetForm();
        ProposalForm.form.markAsPristine();
        ProposalForm.form.markAsUntouched();

        swal('Success!', ' Proposal Report updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/landprocurement']);
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

  GetAllDistrict() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.Districts = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  
  GetBlocks(DI_Id) {
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

  // GetTaluks(DistrictId) {
  //   if (DistrictId > 0) {
  //     document.getElementById('loader-spinner').style.display = "block";
  //     this.data = this.userService.getAllTalukName(DistrictId);
  //     this.data.subscribe(
  //       (response: any) => {
  //         this.Taluks = response;
  //         document.getElementById('loader-spinner').style.display = "none";
  //       }, (error) => {
  //         document.getElementById('loader-spinner').style.display = "none";
  //       });
  //   }
  // }
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
          let i: any = document.getElementById('PR_Report_Path');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('PR_Report_Path');
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
      imagename = document.getElementById('PR_Report_Path');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  imageUpload2(file: FileList) {
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
          let i: any = document.getElementById('GramachavadiUploadPath');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('GramachavadiUploadPath');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getimageUpload2() {
    let imagename = null;
    try {
      imagename = document.getElementById('GramachavadiUploadPath');     
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  imageDemandUpload(file: FileList) {
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
          let i: any = document.getElementById('PR_DemandSurveyFile');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('PR_DemandSurveyFile');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getimageDemandUpload1() {
    let imagename = null;
    try {
      imagename = document.getElementById('PR_DemandSurveyFile');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  GetProposalReportById(PR_Id_fk) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdProposalReport(PR_Id_fk);
    this.data.subscribe(
      (response: any) => {

        this.pr = response;
        this.uploadPath = this.pr.PR_Report_Path;
        this.uploadPath2 = this.pr.GramachavadiUploadPath;
        this.villageDetails = this.pr.ProjectvillageModel;
        if (this.pr.PR_Submitted_Date != null)
          this.pr.PR_Submitted_Date = ((this.pr.PR_Submitted_Date).split('T'))[0];
        if (this.pr.GramaChavadiDate != null)
          this.pr.GramaChavadiDate = ((this.pr.GramaChavadiDate).split('T'))[0];
        if (this.pr.PR_Demandsurvey_Date != null)
          this.pr.PR_Demandsurvey_Date = ((this.pr.PR_Demandsurvey_Date).split('T'))[0];
        // this.GetTaluks(this.pr.PR_Distict_Id)
        this.GetBlocks(this.pr.PR_Distict_Id);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  // Cancel(){    
  //   this.router.navigate(['/home/landprocurement'])    
  // }

  AddVillage(village) {
    let bool = 0;
    if (village == "") { bool = 1 }
    if ((village != null || village != undefined) && bool == 0) {
      let temp = {
        PV_VillageName: village
      }
      this.villageDetails.push(temp);
      this.vi = {};
    }
    else {
      swal('warning', 'Please enter Village Name!', 'warning');     
    }
  }

  RemoveVIDetails = function (position) {
    this.villageDetails.splice(position, 1);
  }

}