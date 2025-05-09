import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-lp-payment-form',
  templateUrl: './lp-payment-form.component.html',
  styleUrls: ['./lp-payment-form.component.css']
})
export class LpPaymentFormComponent implements OnInit {
  Agreementlist: any = [];
  LOD_Id_pay: any;
  Lr_id_pay: any;
  SurLanddetails: any = [];
  paymentprojectlist: any = [];
  projvillagelist: any = [];
  LA_Notif_6_1_Date: any;
  LA_Noti6_Number: any;
  Proj_Name: any;
  LandMOA1acquisitionlist: any = [];
  LandAOAacquisitionlist: any = [];
  LandPOA1acquisitionlist: any = [];
  Land61acquisitionlist: any = [];
  Land61acquisition: any = [];
  Land41acquisition: any = [];
  LandDetailslist: any = [];
  title = "Land Possession";
  proposallist: any = [];
  la: any = {};
  laso: any = {};
  lap: any = {};
  laa: any = {};
  lam: any = {};
  lat: any = {};
  data: any = {};
  district: string;
  Taluk: string;
  Village: string;
  ProposalFor: string;
  fileToUpload: File = null;
  formInvalid: boolean = false;
  mode: string
  type: any;
  LA_Id: any;
  hide: boolean = false;
  e: any = {};
  LandDetails: any = [];
  t: any = {};
  topExtentList: any = [];
  projectlist;
  pro: any = {};
  Sch_Name: any;
  Submitted_Date: any;
  Surveylist: any = [];
  l: any = {};
  Pr_Id: any;
  LAS: any = {};
  LAP: any = {};
  LAA: any = {};
  LAM: any = {};
  LAT: any = {};
  LAPA: any = {};
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;

  LandOwnerDetail: any = [];
  p: any = {};
  PD_Id: number
  FileList: any = [];
  f: any = [];
  LandOwnerPaymentDetailsList: any = {};
  LandRecordDetailswithLTP: any = [];
  LODetails: any = {};
  Payment: any = {};
  Pay_File_Show: any;
  LandOwner: any = [];
  landOId: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
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

  GetLandOwnerInfo(LO_Id) {
    this.data = this.userService.getLandOwnerInfo(LO_Id);
    this.data.subscribe(
      (response: any) => {
        this.LandOwnerDetail = response;
      });
  }

  GetProjectId(PD_Id_FK) {
    this.GetAgreementlist(PD_Id_FK)
  }
  GetAgreementlist(PD_Id) {
    this.data = this.userService.GetAgreementlist(PD_Id);
    this.data.subscribe(
      (response: any) => {
        this.Agreementlist = response;
      }, (error) => {

      });
  }


  GetProjectDetailsforPayment(Pd_Id, LP_Id) {

    this.LandRecordDetailswithLTP = [];
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetProjectDetailsforPaymentforLP(Pd_Id, LP_Id)
      .subscribe(
        (data: any) => {

          document.getElementById('loader-spinner').style.display = "none";
          this.LandRecordDetailswithLTP = data;
          for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
            this.LandRecordDetailswithLTP[i].Select = false;
          }

        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetLandOwnerDetailsforPayment(LR_Id: any, LOD_Id: any) {

    if (LOD_Id == this.landOId) {
      this.landOId = LOD_Id
      return true;
    }
    this.LODetails = {};
    this.LODetails = null;
    this.landOId = LOD_Id
    this.Pay_File_Show = "hide";
    this.LODetails = {};
    this.p = {};
    this.LandOwner = [];
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetLandOwnerDetailsforPayment(LR_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.LODetails = data;
          document.getElementById('loader-spinner').style.display = "none";
          this.LandOwner = data.LandOwnDetailslist

          if (data.LandOwnDetailsModel != null) {
            this.p = data.LandOwnDetailsModel;
            if (this.p.LOP_File != null)
              this.Pay_File_Show = "show";
          }
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }


  changeCheckbox(LR_Id, Select, LOD_Id) {

    for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
      if (this.LandRecordDetailswithLTP[i].LR_LOD_Id_Fk != LOD_Id) {
        this.LandRecordDetailswithLTP[i].Select = false;
      }
    }
    for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
      if (this.LandRecordDetailswithLTP[i].LR_Id == LR_Id) {
        if (this.LandRecordDetailswithLTP[i].Select == false) {
          this.LandRecordDetailswithLTP[i].Select = true;
          this.GetLandOwnerDetailsforPayment(this.LandRecordDetailswithLTP[i].LR_Id, LOD_Id);
          this.Lr_id_pay = this.LandRecordDetailswithLTP[i].LR_Id;
          this.LOD_Id_pay = LOD_Id;
          break;
        }
        else { this.LandRecordDetailswithLTP[i].Select = false; }
        break;
      }
    }

  }

  SaveLopPayment(payment) {

    payment.LOP_Id_PK = this.LODetails.LOP_Id_PK;
    payment.LOP_LOD_Id_FK = this.LODetails.LOD_Id_PK;
    payment.LOP_File = this.getLTPPDFUrl();
    for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
      if (this.LandRecordDetailswithLTP[i].Select == false) {
        this.LandRecordDetailswithLTP[i].Select = 0;
      }
      else { this.LandRecordDetailswithLTP[i].Select = 1; }
    }
    payment.LandRecordDetailsModel = this.LandRecordDetailswithLTP;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.SaveLopPayment(payment)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.GetLandOwnerDetailsforPayment(this.Lr_id_pay, this.LOD_Id_pay);
          swal('', 'Saved Successfully!', 'success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  LOPFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

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
          let i: any = document.getElementById('LOP_File');
          i.value = "";
          if (error.status == 400) {          
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LOP_File');
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
      imagename = document.getElementById('LOP_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
}