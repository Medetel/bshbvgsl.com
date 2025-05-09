import { Component, OnInit } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../shared/ErrorHandler';

@Component({
  selector: 'app-lp-payment-grid',
  templateUrl: './lp-payment-grid.component.html',
  styleUrls: ['./lp-payment-grid.component.css']
})
export class LpPaymentGridComponent implements OnInit {
  title = "Payment";

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
  // title = "Land Possession";
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
  LA_Id: number
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
  s: Search;
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
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {

    this.GetAllPaymentProjects(this.itemsPerPage, 1);
  }
  pageChanged(pageNumber: number) {
    this.GetAllPaymentProjects(this.itemsPerPage, pageNumber);
  }

  GetAllPaymentProjects(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllPaymentProjects(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.paymentprojectlist = data.ProjectReceivedfromProcurementModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

}