import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
@Component({
  selector: 'app-landpurchase-form',
  templateUrl: './landpurchase-form.component.html',
  styleUrls: ['./landpurchase-form.component.css']
})
export class LandpurchaseFormComponent implements OnInit {

  title = "Add Land Purchase";
  proposallist: any = [];
  l: any = {};
  data: any = {};
  district: string;
  Taluk: string;
  Village: string;
  ProposalFor: string;
  formInvalid: boolean = false;
  mode: string
  LP_Id: number
  hide: boolean = false;
  projectlist;
  Sch_Name: any;
  Submitted_Date: any;
  Surveylist: any = [];
  fileToUpload: File = null;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.LP_Id = params['LP_Id'];
      this.mode = params['mode'];

      if (this.LP_Id > 0) {
        this.GetByIdInspection(this.LP_Id);
      }

      if (this.mode == 'view') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "View Land Purchase";
      }
      else if (this.mode == 'edit') {
        this.title = "Edit Land Purchase";
      }
    });

    this.getDefaultData();
    this.GetAllProjectforLR()
  }


  GetAllProjectforLR() {
    this.data = this.userService.GetAllProjectforLP_New();
    this.data.subscribe(
      (response: any) => {
        this.projectlist = response;
      }, (error) => {

      });
  }

  GetProjectId(PD_Id_FK) {
    this.GetProposalId(PD_Id_FK)
    this.GetlanddetailsforLPandLA(PD_Id_FK)
    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == PD_Id_FK) {
        this.Sch_Name = this.projectlist[i].Sch_Name;

        document.getElementById('loader-spinner').style.display = "none";
      }
    }
  }

  GetlanddetailsforLPandLA(PD_Id_FK) {
    this.data = this.userService.GetlanddetailsforLPandLA(PD_Id_FK);
    this.data.subscribe(
      (response: any) => {
        this.Surveylist = response;
      }, (error) => {

      });
  }

  GetProposalId(Id) {

    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == Id)
        this.l.LP_PR_Id_FK = this.projectlist[i].PD_PR_Id_FK
      this.GetOtherrelatedinfo(this.l.LP_PR_Id_FK)
    }
  }

  getDefaultData() {
    this.data = this.userService.getAllProposalReportdropdown();
    this.data.subscribe(
      (response: any) => {
        this.proposallist = response.Result;
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

  SaveLandPurchase(LandPurchaseForm: NgForm) {

    if (LandPurchaseForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      for (let i = 0; i < this.Surveylist.length; i++) {
        if (this.Surveylist[i].LD_Selected == false) {
          this.Surveylist[i].LD_Selected = 0;
        }
        else { this.Surveylist[i].LD_Selected = 1; }
      }
      LandPurchaseForm.value.LP_file = this.getimageUpload1();
      LandPurchaseForm.value.LandPurchaseandAcquisitionLDModel = this.Surveylist;
      this.data = this.userService.PostLandPurchaseDetails(LandPurchaseForm.value);
      this.data.subscribe(
        (response) => {

          LandPurchaseForm.reset();
          LandPurchaseForm.resetForm();
          LandPurchaseForm.form.markAsPristine();
          LandPurchaseForm.form.markAsUntouched();


          swal('Success!', 'Land Purchase Detail Added Successfully .', 'success');
          this.router.navigate(['/home/landpurchase']);
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

  UpdateLandPurchase(LandPurchaseForm: NgForm) {

    if (LandPurchaseForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      this.data = this.userService.UpdateLandPurchase(LandPurchaseForm.value, this.LP_Id, 0);
      this.data.subscribe(
        (response) => {

          LandPurchaseForm.reset();
          LandPurchaseForm.resetForm();
          LandPurchaseForm.form.markAsPristine();
          LandPurchaseForm.form.markAsUntouched();
          swal('Success!', 'Land Purchase Updated Successfully .', 'success');
          this.router.navigate(['/home/landpurchase']);
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

  GetByIdInspection(IR_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdLandPurchase(IR_Id);
    this.data.subscribe(
      (response: any) => {
        this.l = response;

        this.l.LP_DPC_Date = ((this.l.LP_DPC_Date).split('T'))[0];
        this.l.LP_BA_Date = ((this.l.LP_BA_Date).split('T'))[0];
        this.l.LP_GO_Date = ((this.l.LP_GO_Date).split('T'))[0];

        setTimeout(() => {
          this.GetOtherrelatedinfo(this.l.LP_Id_PK);
        }, 500)

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
          let i: any = document.getElementById('LP_file');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LP_file');
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
      imagename = document.getElementById('LP_file');
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

}