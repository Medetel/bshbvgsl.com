import { Component, OnInit } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../shared/ErrorHandler';

@Component({
  selector: 'app-lp-agreement-form',
  templateUrl: './lp-agreement-form.component.html',
  styleUrls: ['./lp-agreement-form.component.css']
})
export class LpAgreementFormComponent implements OnInit {
  proposallst: any;
  SurLanddetails: any = [];
  LandDetailslist: any = [];
  Landownerlist: any = [];
  title = "Agreement";
  proposallist: any = [];
  l: any = {};
  data: any;
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
    if (this.mode == null || this.mode == undefined) {
      this.mode = "save"
    }

    if (this.LP_Id > 0) {
      this.GetByIdInspection(this.LP_Id);
    }
    this.GetAllProjectforLR()
    this.getDefaultData();
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
    this.GetONLandOwner(PD_Id_FK)
    this.GetlanddetailsforLPandLA(PD_Id_FK)
    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == PD_Id_FK) {
        this.Sch_Name = this.projectlist[i].Sch_Name;

        document.getElementById('loader-spinner').style.display = "none";
      }
    }
  }

  GetlanddetailsforLA(PD_Id_FK, LP_Id, LOD_Id_Fk, mode) {
    if (LP_Id == undefined) {
      LP_Id = 0;
    }
    this.data = this.userService.GetlanddetailsforLP(PD_Id_FK, LOD_Id_Fk, LP_Id, mode);
    this.data.subscribe(
      (response: any) => {
        this.LandDetailslist = response;
      }, (error) => {

      });
  }

  GetONLandOwner(PD_Id) {
    this.data = this.userService.GetONLandOwner(PD_Id);
    this.data.subscribe(
      (response: any) => {
        this.Landownerlist = response;
      }, (error) => {

      });
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
      if (this.projectlist[i].PD_Id == Id) {
        this.l.LP_PR_Id_FK = this.projectlist[i].PD_PR_Id_FK
        this.GetOtherrelatedinfo(this.l.LP_PR_Id_FK)
      }

    }
  }

  getDefaultData() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllProposalReportdropdownLP_New();
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.proposallist = response;
      });
  }

  GetOtherrelatedinfo(Id) {
    this.data = this.userService.getAllProposalReportdropdown();
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.proposallst = response;
        for (let i = 0; i < this.proposallst.length; i++) {
          if (this.proposallst[i].PR_Id_PK == Id) {
            this.district = this.proposallst[i].DI_District;
            this.Taluk = this.proposallst[i].TA_Taluk;
            this.Village = this.proposallst[i].PR_Village;
            this.ProposalFor = this.proposallst[i].PR_For;
            this.Submitted_Date = this.proposallst[i].PR_Submitted_Date;
          }
        }

      });
    // this.la.LA_PR_Id_FK = Id;
    // this.l.LP_PR_Id_FK = Id;
    //document.getElementById('loader-spinner').style.display = "block";
  }

  selectexculdesurveynoforLa(LD_Id: any, type, id, PD_Id: any) {

    if (type == "in") {
      for (let i = 0; i < this.LandDetailslist.length; i++) {
        if (this.LandDetailslist[i].LD_Id == LD_Id) {
          this.LandDetailslist[i].LD_LPAId_Selected = 1;
        }
      }
      let temp = {
        LD_Id: LD_Id
      }
      this.SurLanddetails.push(temp);
    }
    else {

      for (let i = 0; i < this.SurLanddetails.length; i++) {
        if (this.SurLanddetails[i].LD_Id == LD_Id)
          this.SurLanddetails.splice(i, 1);
      }
      for (let i = 0; i < this.LandDetailslist.length; i++) {
        if (this.LandDetailslist[i].LD_Id == LD_Id) {
          this.LandDetailslist[i].LD_LPAId_Selected = null;
        }
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
      // for (let i = 0; i < this.Surveylist.length; i++) {
      //   if (this.Surveylist[i].LD_Selected == false) {
      //     this.Surveylist[i].LD_Selected = 0;
      //   }
      //   else { this.Surveylist[i].LD_Selected = 1; }
      // }
      LandPurchaseForm.value.LP_file = this.getimageUpload1();
      LandPurchaseForm.value.LanddetailsforLPmodel = this.SurLanddetails;
      //AquisitionForm.LanddetailsforLAmodel =this.SurLanddetails;
      this.data = this.userService.PostLandPurchaseDetails(LandPurchaseForm.value);
      this.data.subscribe(
        (response) => {

          LandPurchaseForm.reset();
          LandPurchaseForm.resetForm();
          LandPurchaseForm.form.markAsPristine();
          LandPurchaseForm.form.markAsUntouched();


          swal('Success!', 'Agreement Details Added Successfully .', 'success');
          this.router.navigate(['/home/landpurchase/land-pur-agreement']);
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

  selectexculdesurveyno(LD_Id, Status, Id, Pd_Id, LA_Id, LOD_Id_Fk) {
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
          this.includeexculdesurveyno(LD_Id, Status, Id, Pd_Id, LA_Id, LOD_Id_Fk);
        }
      })
    }
    else {
      swal({
        title: 'Are you sure?', text: "You want to Approve!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Approve it!'
      }).then((result) => {
        if (result.value) {
          this.includeexculdesurveyno(LD_Id, Status, Id, Pd_Id, LA_Id, LOD_Id_Fk);
        }
      })
    }
  }

  includeexculdesurveyno(LD_Id, Status, Id, Pd_Id, LA_Id, LOD_Id_Fk) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.includeexculdesurveynoforLP(LD_Id, Status, Id, Pd_Id, LA_Id)
      .subscribe(
        (data) => {
          this.GetlanddetailsforLA(Pd_Id, LA_Id, LOD_Id_Fk, this.mode);
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


  UpdateLandPurchase(LandPurchaseForm: NgForm) {

    if (LandPurchaseForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      if (LandPurchaseForm.value.LP_file != null && !LandPurchaseForm.value.LP_file.match("http"))
        LandPurchaseForm.value.LP_file = this.getimageUpload1();
      this.data = this.userService.UpdateLandPurchase(LandPurchaseForm.value, this.LP_Id, 1);
      this.data.subscribe(
        (response) => {

          LandPurchaseForm.reset();
          LandPurchaseForm.resetForm();
          LandPurchaseForm.form.markAsPristine();
          LandPurchaseForm.form.markAsUntouched();
          swal('Success!', 'Land Purchase Updated Successfully .', 'success');
          this.router.navigate(['/home/landpurchase/land-pur-agreement']);
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
        this.l.LP_Note_Date = ((this.l.LP_Note_Date).split('T'))[0];
        // this.l.LP_DPC_Date = ((this.l.LP_DPC_Date).split('T'))[0];
        // this.l.LP_BA_Date = ((this.l.LP_BA_Date).split('T'))[0];
        // this.l.LP_GO_Date = ((this.l.LP_GO_Date).split('T'))[0];
        this.GetlanddetailsforLA(this.l.LP_PD_Id_FK, this.l.LP_Id_PK, this.l.LP_LOD_Id_Fk, this.mode)
        this.GetONLandOwner(this.l.LP_PD_Id_FK)
        this.GetOtherrelatedinfo(this.l.LP_PR_Id_FK);
        setTimeout(() => {
          this.GetOtherrelatedinfo(this.l.LP_PR_Id_FK);
          for (let i = 0; i < this.projectlist.length; i++) {
            if (this.projectlist[i].PD_Id == this.l.LP_PD_Id_FK) {
              this.Sch_Name = this.projectlist[i].Sch_Name;

              document.getElementById('loader-spinner').style.display = "none";
            }
          }
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