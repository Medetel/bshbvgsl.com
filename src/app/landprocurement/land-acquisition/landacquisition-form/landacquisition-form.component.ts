import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-landacquisition-form',
  templateUrl: './landacquisition-form.component.html',
  styleUrls: ['./landacquisition-form.component.css']
})
export class LandacquisitionFormComponent implements OnInit {

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
  LandTOP1acquisitionlist: any = [];
  title = "Land Possession";
  proposallist: any = {};
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
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;

  itemsPerPage1: number = 5;
  currentPage1: number = 1;
  totalItems1: number;

  itemsPerPage2: number = 5;
  currentPage2: number = 1;
  totalItems2: number;

  itemsPerPage3: number = 5;
  currentPage3: number = 1;
  totalItems3: number;

  itemsPerPage4: number = 5;
  currentPage4: number = 1;
  totalItems4: number;

  itemsPerPage5: number = 5;
  currentPage5: number = 1;
  totalItems5: number;

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
  totalItems6: number;
  currentPage6: number = 1;
  itemsPerPage6: number = 5;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
   debugger;
    this.route.params.subscribe(params =>
      this.LA_Id = params['LA_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    this.route.params.subscribe(params =>
      this.type = params['type']
    );
    this.Get41acquisitiondetailsforLA(this.itemsPerPage1, this.currentPage1);
    this.Get61acquisitiondetailsforLA(this.itemsPerPage2, this.currentPage2);
    this.GetAllPaymentProjects(this.itemsPerPage, 1);
    this.GetAllLADropdownlistforPOA(this.itemsPerPage3, 1);
    this.GetAllLADropdownlistforAOA(this.itemsPerPage4, 1);
    this.GetAllLADropdownlistforMOA(this.itemsPerPage5, 1);
    this.GetAllLADropdownlistforTOP(this.itemsPerPage6, 1);

    this.getDefaultData();
    this.GetAllProjectforLR()


  }

  getDefaultData() {
    this.data = this.userService.GetAllProposalReportForLADropdown_New();
    this.data.subscribe(
      (response: any) => {
        this.proposallist = response.Result;
      });

  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllPaymentProjects(this.itemsPerPage, pageNumber);
  }

  pageChanged1(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage1, pageNumber);
    else
      this.Get41acquisitiondetailsforLA(this.itemsPerPage1, pageNumber);
  }
  pageChanged2(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage1, pageNumber);
    else
      this.Get61acquisitiondetailsforLA(this.itemsPerPage, pageNumber);
  }
  pageChanged3(pageNumber: number) {
    this.currentPage3 = pageNumber;
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage3, pageNumber);
    else
      this.GetAllLADropdownlistforPOA(this.itemsPerPage3, pageNumber);
  }
  pageChanged4(pageNumber: number) {
    this.currentPage4 = pageNumber;
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage4, pageNumber);
    else
      this.GetAllLADropdownlistforAOA(this.itemsPerPage4, pageNumber);
  }
  pageChanged5(pageNumber: number) {
    this.currentPage5 = pageNumber;
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage5, pageNumber);
    else
      this.GetAllLADropdownlistforMOA(this.itemsPerPage5, pageNumber);
  }
  pageChanged6(pageNumber: number) {
    this.currentPage6 = pageNumber;
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage6, pageNumber);
    else
      this.GetAllLADropdownlistforTOP(this.itemsPerPage6, pageNumber);
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchPaymentProjects(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.paymentprojectlist = data.ProjectReceivedfromProcurementModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }

  GetProposalId(Id) {

    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == Id) {
        this.pro.pro_PR_Id_FK = this.projectlist[i].PD_PR_Id_FK
        this.Pr_Id = this.pro.pro_PR_Id_FK;
        this.GetOtherrelatedinfo(this.projectlist[i].PD_PR_Id_FK)
      }
    }
  }


  clearla(id) {

    this.pro.PD_Id_FK = undefined;
    this.pro.pro_PR_Id_FK = undefined;

    this.LAS.PD_FO_Id_FK = undefined;
    this.LAP.PD_FO_Id_FK = undefined;
    this.LAA.PD_FO_Id_FKK = undefined;
    this.LAM.PD_FO_Id_FKK = undefined;
    this.LAPA.PD_FO_Id_FKK = undefined;
    this.LAT.PD_FO_Id_FK = undefined;


    this.la = null;
    this.laso = null;
    this.lap = null;
    this.laa = null;
    this.lam = null;
    this.lat = null;
    this.la = "";
    this.laso = "";
    this.lap = "";
    this.laa = "";
    this.lam = "";
    this.lat = "";
    this.la = {};
    this.laso = {};
    this.lap = {};
    this.laa = {};
    this.lam = {};
    this.lat = {};
    this.LandDetailslist = [];
    this.LandDetails = [];

    if (id == 2) {
      this.sixOneGrid = true;
      this.fourOneForm = false;
      this.overPossessionForm = false;
      this.modeAwardForm = false;
      this.approvalAwardGrid = true;
      this.preparationAwardForm = false;
      this.sixOneForm = false;
    }
    if (id == 3) {
      this.preparationAwardGrid = true;
      this.fourOneForm = false;
      this.overPossessionForm = false;
      this.modeAwardForm = false;
      this.approvalAwardGrid = true;
      this.preparationAwardForm = false;
      this.sixOneForm = false;
    }
    if (id == 4) {
      this.approvalAwardForm = false;
      this.fourOneForm = false;
      this.overPossessionForm = false;
      this.modeAwardForm = false;
      this.approvalAwardGrid = true;
      this.preparationAwardForm = false;
      this.sixOneForm = false;
    }
    if (id == 5) {
      this.modeAwardGrid = true;
      this.fourOneForm = false;
      this.overPossessionForm = false;
      this.modeAwardForm = false;
      this.approvalAwardGrid = true;
      this.preparationAwardForm = false;
      this.sixOneForm = false;
    }
    if (id == 7) {
      this.overPossessionGrid = true;
      this.fourOneForm = false;
      this.overPossessionForm = false;
      this.modeAwardForm = false;
      this.approvalAwardGrid = true;
      this.preparationAwardForm = false;
      this.sixOneForm = false;
    }
    this.district = null;
    this.Taluk = null;
    this.Village = null;
    this.ProposalFor = null;
    this.Submitted_Date = null;
    this.Proj_Name = null;
    this.Sch_Name = null;
    this.LA_Noti6_Number = null;
    this.LA_Notif_6_1_Date = null;
    // this.GetAllProjectforLR()
    this.GetAllLADropdownlistfor61()

  }

  get41project(id) {
    if (id == 1) {
      this.fourOneGrid = true;
      this.fourOneForm = false;
      this.overPossessionForm = false;
      this.modeAwardForm = false;
      this.approvalAwardGrid = true;
      this.preparationAwardForm = false;
      this.sixOneForm = false;
    }
    this.getDefaultData();
    this.GetAllProjectforLR()
  }


  GetOtherrelatedinfo(Id) {

    this.la.LA_PR_Id_FK = Id;
    this.l.LP_PR_Id_FK = Id;
    //document.getElementById('loader-spinner').style.display = "block";
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

  GetlanddetailsforLA(PD_Id_FK, LA_Id, mode) {

    this.data = this.userService.GetlanddetailsforLA(PD_Id_FK, LA_Id, mode);
    this.data.subscribe(
      (response: any) => {
        this.LandDetailslist = response;
      }, (error) => {
      });
  }

  Get61acquisitiondetailsforLA(itemsPerPage2: number, pageNo: number) {

    //
    // this.mode=mode;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.Get61acquisitiondetailsforLA(itemsPerPage2, pageNo);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.Land61acquisition = response.LandAcquisitionModels;
        this.totalItems2 = response.TotalItemsCount;
        this.currentPage2 = pageNo;
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllLADropdownlistfor61() {
    //this.mode=mode;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllLADropdownlistfor61();
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.Land61acquisitionlist = response;
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetAllLADropdownlistforPOA(itemsPerPage3: number, pageNo: number) {
    //this.mode=mode;    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllLADropdownlistforPOA(itemsPerPage3, pageNo);
    this.data.subscribe(
      (response: any) => {

        document.getElementById('loader-spinner').style.display = "none";
        this.LandPOA1acquisitionlist = response.LandAcquisitionModels;
        this.totalItems3 = response.TotalItemsCount;
        this.currentPage3 = pageNo;
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetAllLADropdownlistforAOA(itemsPerPage4: number, pageNo: number) {
    //this.mode=mode;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllLADropdownlistforAOA(itemsPerPage4, pageNo);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.LandAOAacquisitionlist = response.LandAcquisitionModels;
        this.totalItems4 = response.TotalItemsCount;
        this.currentPage4 = pageNo;
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetAllLADropdownlistforMOA(itemsPerPage5: number, pageNo: number) {
    //this.mode=mode;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllLADropdownlistforMOA(itemsPerPage5, pageNo);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.LandMOA1acquisitionlist = response.LandAcquisitionModels;
        this.totalItems5 = response.TotalItemsCount;
        this.currentPage5 = pageNo;
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllLADropdownlistforTOP(itemsPerPage6: number, pageNo: number) {
    // this.mode=mode;

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllLADropdownlistforTOP(itemsPerPage6, pageNo);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.LandTOP1acquisitionlist = response.LandAcquisitionModels;
        this.totalItems6 = response.TotalItemsCount;
        this.currentPage6 = pageNo;
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  Get41acquisitiondetailsforLA(itemsPerPage1: number, pageNo: number) {
    // this.mode=mode;
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.Get41acquisitiondetailsforLA(itemsPerPage1, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.Land41acquisition = response.LandAcquisitionModels;
        this.totalItems1 = response.TotalItemsCount;
        this.currentPage1 = pageNo;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  selectexculdesurveynoforLa(LD_Id: any, type, id, PD_Id: any) {
    if (type == "in") {
      for (let i = 0; i < this.LandDetailslist.length; i++) {
        if (this.LandDetailslist[i].LD_Id == LD_Id) {
          this.LandDetailslist[i].LD_Not4_Selected = 1;
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
          this.LandDetailslist[i].LD_Not4_Selected = null;
        }
      }
    }
  }

  // RemoveCommunicationDetails(i) {
  //   this.SurLanddetails.splice(i, 1);
  // }

  selectexculdesurveyno(LD_Id, Status, Id, Pd_Id, LA_Id) {
    if (LA_Id != null) {
      for (let i = 0; i < this.Land61acquisitionlist.length; i++) {
        if (this.Land61acquisitionlist[i].LA_Id_PK == LA_Id) {
          Pd_Id = this.Land61acquisitionlist[i].LA_PD_Id_FK;
        }
      }
    }
    if (Status == 'ex') {
      swal({
        title: 'Are you sure?', text: "You want to Exclude!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Reject it!'
      }).then((result) => {
        if (result.value) {
          this.includeexculdesurveyno(LD_Id, Status, Id, Pd_Id, LA_Id);
        }
      })
    }
    else {
      swal({
        title: 'Are you sure?', text: "You want to Approve!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Approve it!'
      }).then((result) => {
        if (result.value) {
          this.includeexculdesurveyno(LD_Id, Status, Id, Pd_Id, LA_Id);
        }
      })
    }
  }

  includeexculdesurveyno(LD_Id, Status, Id, Pd_Id, LA_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.includeexculdesurveyno(LD_Id, Status, Id, Pd_Id, LA_Id)
      .subscribe(
        (data) => {
          this.GetlanddetailsforLA(Pd_Id, LA_Id, this.mode);
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


  GetAllProjectforLR() {
    this.data = this.userService.GetAllProjectsforLA_New();
    this.data.subscribe(
      (response: any) => {
        this.projectlist = response;
      }, (error) => {

      });
  } h
  //Array

  AddExtent(e) {
    let bool = 0;
    if (e.LA_16_2_Extent_16_2 == "" || e.LA_LA_16_2_Date_16_2 == "") { bool = 1 }
    if ((e.LA_16_2_Extent_16_2 != null || e.LA_LA_16_2_Date_16_2 != undefined) || (e.LA_16_2_Extent_16_2 != null || e.LA_LA_16_2_Date_16_2 != undefined)
      && bool == 0) {

      let temp = {
        LA_16_2_Extent_16_2: e.LA_16_2_Extent_16_2,
        LA_LA_16_2_Date_16_2: e.LA_LA_16_2_Date_16_2,
        PV_VillageName: this.getvillage(e.LA_MOAVi_Id_Fk),
        LA_GeneralAwardExtent: e.LA_GeneralAwardExtent,
        LA_GeneralAwardExtent_Rate: e.LA_GeneralAwardExtent_Rate,
        LA_ConsentAwardExtent: e.LA_ConsentAwardExtent,
        LA_ConsentAwardExtent_Rate: e.LA_ConsentAwardExtent_Rate,
        LA_ExtentwithouAward: e.LA_ExtentwithouAward,
        LA_TotalAmount: e.LA_TotalAmount,
        LA_MOA_Note: e.LA_MOA_Note,
        LA_NotMoa_File: this.getimageUpload4(),
        LA_MOAVi_Id_Fk: e.LA_MOAVi_Id_Fk
      }

      this.LandDetails.push(temp);
      this.e = {};
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
    }
  }

  getvillage(VI_Id) {
    for (let i = 0; i < this.projvillagelist.length; i++) {
      if (this.projvillagelist[i].PV_Id == VI_Id) {
        return this.projvillagelist[i].PV_VillageName;
      }
    }
  }

  ClearPDDetails() {
    this.e = {};
  }

  AddTopExtent(t) {
    let bool = 0;
    if (t.TOP_SurveyNo == "" || t.TOP_Extent == "" || t.TOP_Date == "") { bool = 1 }
    if ((t.TOP_SurveyNo != null || t.TOP_SurveyNo != undefined) || (t.TOP_Extent != null || t.TOP_Extent != undefined)
      || (t.TOP_Date != null || t.TOP_Date != undefined)
      && bool == 0) {

      let temp = {
        TOP_SurveyName: this.GetSurveyName(t.TOP_SurveyNo),
        TOP_SurveyNo: t.TOP_SurveyNo,
        TOP_Extent: t.TOP_Extent,
        TOP_Date: t.TOP_Date
      }
      this.topExtentList.push(temp);
      this.t = {};
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
    }
  }

  GetSurveyName(TOP_SurveyNo) {
    for (let i = 0; i < this.Surveylist.length; i++) {
      if (this.Surveylist[i].LD_Id == TOP_SurveyNo) {
        return this.Surveylist[i].LD_SurveyNo;
      }
    }
  }

  GetProjectIdfor61(LA_Id) {
    for (let i = 0; i < this.Land61acquisitionlist.length; i++) {
      if (this.Land61acquisitionlist[i].LA_Id_PK == LA_Id) {
        this.Proj_Name = this.Land61acquisitionlist[i].PD_Project_Name;
        this.district = this.Land61acquisitionlist[i].DI_District;
        this.Taluk = this.Land61acquisitionlist[i].TA_Taluk;
        this.Village = this.Land61acquisitionlist[i].PR_Village;
        this.ProposalFor = this.Land61acquisitionlist[i].PR_For;
        this.Submitted_Date = this.Land61acquisitionlist[i].PR_Submitted_Date;
        this.Sch_Name = this.Land61acquisitionlist[i].Sch_Name;
        this.LA_Noti6_Number = this.Land61acquisitionlist[i].LA_Noti6_Number;
        this.LA_Notif_6_1_Date = this.Land61acquisitionlist[i].LA_Notif_6_1_Date;
        this.GetlanddetailsforLA(this.Land61acquisitionlist[i].LA_PD_Id_FK, LA_Id, this.mode)
        this.GetProjectVillage(this.Land61acquisitionlist[i].LA_PR_Id_FK)
        // this.GetProjectandPropId(this.Land61acquisitionlist[i].LA_PD_Id_FK,this.Land61acquisitionlist[i].LA_PR_Id_FK)
        //  this.Land61acquisitionlist[i].LA_PD_Id_FK;
      }
    }
  }

  ClearTopExtent() {
    this.t = {};
  }

  //topExtentList

  LandDetailsremove(i) {
    this.LandDetails.splice(i, 1);
  }

  TopExtentRemove(i) {
    this.topExtentList.splice(i, 1);
  }
  paymentGrid = true;
  paymentForm = false;


  paymentContent() {
    this.LAPA.PD_FO_Id_FK = undefined;
    this.LandRecordDetailswithLTP = [];
    this.LandOwner = [];
    this.LODetails = {};
    this.LODetails = null;
    this.p = {}
    this.p = null;
    this.p = "";
    this.paymentGrid = false;
    this.paymentForm = true;
  }
  paymentContent1() {
    this.paymentGrid = true;
    this.paymentForm = false;
  }


  SaveLandAquisition(AquisitionForm, itemsPerPage1: number, pageNo: number) {

    if ((AquisitionForm.LA_Noti_Date == null || AquisitionForm.LA_Noti_Date == undefined || AquisitionForm.LA_Noti_Date == "")
      || (AquisitionForm.LA_Noti4_1_AG == null || AquisitionForm.LA_Noti4_1_AG == undefined || AquisitionForm.LA_Noti4_1_AG == "")
      || (AquisitionForm.LA_5_A_Enquiry_Date == null || AquisitionForm.LA_5_A_Enquiry_Date == undefined || AquisitionForm.LA_5_A_Enquiry_Date == "")
      || (AquisitionForm.LA_JMC_Date == null || AquisitionForm.LA_JMC_Date == undefined || AquisitionForm.LA_JMC_Date == "")) {
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    AquisitionForm.LandAcquisition_16_2Models = this.LandDetails;
    AquisitionForm.TakingOverPosModels = this.topExtentList;
    AquisitionForm.LA_Not_FilePath = this.getimageUpload();
    AquisitionForm.LanddetailsforLAmodel = this.SurLanddetails;
    this.data = this.userService.PostLandAquisitiont(AquisitionForm);
    this.data.subscribe(
      (response) => {

        this.fourOneGrid = true;
        this.fourOneForm = false;
        this.Get41acquisitiondetailsforLA(this.itemsPerPage1,this.currentPage1);
        swal('Success!', 'Added Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        // this.router.navigate(['/home/landacquisition']);
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

  GetProjectVillage(PR_Id) {
    this.data = this.userService.GetProjectVillage(PR_Id);
    this.data.subscribe(
      (response: any) => {
        this.projvillagelist = response;
      }, (error) => {

      });
  }

  GetByIdLandAquisition(LA_Id, mod, Gid) {

    this.mode = mod;
    if (Gid == 1) {
      this.fourOneGrid = false;
      this.fourOneForm = true;
    }
    if (Gid == 2) {
      this.sixOneGrid = false;
      this.sixOneForm = true;

    }
    if (Gid == 3) {
      this.preparationAwardGrid = false;
      this.preparationAwardForm = true;

    }
    if (Gid == 4) {
      this.approvalAwardForm = true;
      this.approvalAwardGrid = false;

    }
    if (Gid == 5) {
      this.modeAwardGrid = false;
      this.modeAwardForm = true;

    }
    if (Gid == 6) {
      this.overPossessionGrid = false
      this.overPossessionForm = true;

    }
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdLandAquisition(LA_Id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";

        if (Gid == 1) {
          this.la = response;
          this.pro.PD_Id_FK = this.la.LA_PD_Id_FK;
          this.pro.pro_PR_Id_FK = this.la.LA_PR_Id_FK;


          this.GetProjectId(this.la.LA_PD_Id_FK, LA_Id)
          this.GetOtherrelatedinfo(this.la.LA_PR_Id_FK)
          this.GetlanddetailsforLA(this.la.LA_PD_Id_FK, this.la.LA_Id_PK, this.mode)
          // this.GetSurveyNo(this.la.LA_PD_Id_FK)
          this.la.LA_Noti_Date = ((this.la.LA_Noti_Date).split('T'))[0];
          this.la.LA_5_A_Enquiry_Date = ((this.la.LA_5_A_Enquiry_Date).split('T'))[0];
          this.la.LA_JMC_Date = ((this.la.LA_JMC_Date).split('T'))[0];
        }
        if (Gid == 2) {
          // this.sixOneContent()
          this.laso = response;
          this.LAS.PD_FO_Id_FK = this.laso.LA_Id_PK;
          //this.pro.pro_PR_Id_FK = this.la.LA_PR_Id_FK;


          this.GetProjectIdfor61(this.laso.LA_Id_PK)
          this.GetlanddetailsforLA(this.laso.LA_PD_Id_FK, this.laso.LA_Id_PK, this.mode)
          //this.GetSurveyNo(this.laso.LA_PD_Id_FK)

          this.laso.LA_Notif_6_1_Date = ((this.laso.LA_Notif_6_1_Date).split('T'))[0];
          this.laso.LA_AwardEnq_9_10_Date = ((this.laso.LA_AwardEnq_9_10_Date).split('T'))[0];
        }
        if (Gid == 3) {
          // this.preparationAwardContent()
          this.lap = response;
          this.LAP.PD_FO_Id_FK = this.lap.LA_Id_PK;
          //this.pro.pro_PR_Id_FK = this.la.LA_PR_Id_FK;


          this.GetProjectIdfor61(this.lap.LA_Id_PK)
          //this.GetlanddetailsforLA(this.lap.LA_PD_Id_FK)
          //this.GetSurveyNo(this.laso.LA_PD_Id_FK)
          this.lap.LA_PrepAwardDate = ((this.lap.LA_PrepAwardDate).split('T'))[0];
        }
        if (Gid == 4) {
          // this.approvalAwardContent()
          this.laa = response;
          this.LAA.PD_FO_Id_FK = this.laa.LA_Id_PK;


          this.GetProjectIdfor61(this.laa.LA_Id_PK)
          this.laa.LA_AprovalAwardDate = ((this.laa.LA_AprovalAwardDate).split('T'))[0];
        }
        if (Gid == 5) {
          // this.modeAwardContent()
          this.lam = response;
          this.LAM.PD_FO_Id_FK = this.lam.LA_Id_PK;
          //this.pro.pro_PR_Id_FK = this.la.LA_PR_Id_FK;

          this.LandDetails = this.lam.LandAcquisition_16_2Models;
          this.GetProjectIdfor61(this.lam.LA_Id_PK)
          this.lam.LA_DateOfSubmission = ((this.lam.LA_DateOfSubmission).split('T'))[0];

          //this.GetlanddetailsforLA(this.lam.LA_PD_Id_FK)
          // this.GetProjectVillage(this.lam.)
        }
        if (Gid == 6) {
          // this.overPossessionContent()
          this.lat = response;
          this.LAT.PD_FO_Id_FK = this.lat.LA_Id_PK;
          //this.pro.pro_PR_Id_FK = this.la.LA_PR_Id_FK;


          this.GetProjectIdfor61(this.lat.LA_Id_PK)
          this.GetlanddetailsforLA(this.lat.LA_PD_Id_FK, this.lat.LA_Id_PK, this.mode)
          this.lat.LA_POC_Date = ((this.lat.LA_POC_Date).split('T'))[0];
        }

        setTimeout(() => {
          this.GetOtherrelatedinfo(this.la.LA_PD_Id_FK);
        }, 500)

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  UpdateLandAquisition(AquisitionForm, id, la_Id) {
    if (id == 1) {
      if ((AquisitionForm.LA_Noti_Date == null || AquisitionForm.LA_Noti_Date == undefined || AquisitionForm.LA_Noti_Date == "")
        || (AquisitionForm.LA_Noti4_1_AG == null || AquisitionForm.LA_Noti4_1_AG == undefined || AquisitionForm.LA_Noti4_1_AG == "")
        || (AquisitionForm.LA_5_A_Enquiry_Date == null || AquisitionForm.LA_5_A_Enquiry_Date == undefined || AquisitionForm.LA_5_A_Enquiry_Date == "")
        || (AquisitionForm.LA_JMC_Date == null || AquisitionForm.LA_JMC_Date == undefined || AquisitionForm.LA_JMC_Date == "")) {
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
    }
    if (id == 2) {
      if ((AquisitionForm.LA_Noti6_Number == null || AquisitionForm.LA_Noti6_Number == undefined || AquisitionForm.LA_Noti6_Number == "")
        || (AquisitionForm.LA_Notif_6_1_Date == null || AquisitionForm.LA_Notif_6_1_Date == undefined || AquisitionForm.LA_Notif_6_1_Date == "")
        || (AquisitionForm.LA_ExtNotif_6_1_Date_AG == null || AquisitionForm.LA_ExtNotif_6_1_Date_AG == undefined || AquisitionForm.LA_ExtNotif_6_1_Date_AG == "")
        || (AquisitionForm.LA_AwardEnq_9_10_Date == null || AquisitionForm.LA_AwardEnq_9_10_Date == undefined || AquisitionForm.LA_AwardEnq_9_10_Date == "")) {
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
    }
    if (id == 3) {
      if ((AquisitionForm.LA_POADoc_No == null || AquisitionForm.LA_POADoc_No == undefined || AquisitionForm.LA_POADoc_No == "")
        || (AquisitionForm.LA_PrepAwardDate == null || AquisitionForm.LA_PrepAwardDate == undefined || AquisitionForm.LA_PrepAwardDate == "")
        || (AquisitionForm.LA_PrepAwardExtent == null || AquisitionForm.LA_PrepAwardExtent == undefined || AquisitionForm.LA_PrepAwardExtent == "")
        || (AquisitionForm.LA_PrepAwardAmount == null || AquisitionForm.LA_PrepAwardAmount == undefined || AquisitionForm.LA_PrepAwardAmount == "")) {
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
    }
    if (id == 4) {
      if ((AquisitionForm.LA_AOADoc_No == null || AquisitionForm.LA_AOADoc_No == undefined || AquisitionForm.LA_AOADoc_No == "")
        || (AquisitionForm.LA_AprovalAwardDate == null || AquisitionForm.LA_AprovalAwardDate == undefined || AquisitionForm.LA_AprovalAwardDate == "")
        || (AquisitionForm.LA_AprovalAwardExtent == null || AquisitionForm.LA_AprovalAwardExtent == undefined || AquisitionForm.LA_AprovalAwardExtent == "")
        || (AquisitionForm.LA_AprovalAwardAmount == null || AquisitionForm.LA_AprovalAwardAmount == undefined || AquisitionForm.LA_JMC_Date == "")) {
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
    }
    if (id == 5) {
      if ((AquisitionForm.LA_MOADoc_No == null || AquisitionForm.LA_MOADoc_No == undefined || AquisitionForm.LA_MOADoc_No == "")) {
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
    }
    if (id == 6) {
      if ((AquisitionForm.LA_TOPDoc_No == null || AquisitionForm.LA_TOPDoc_No == undefined || AquisitionForm.LA_TOPDoc_No == "")
        || (AquisitionForm.LA_POC_Date == null || AquisitionForm.LA_POC_Date == undefined || AquisitionForm.LA_POC_Date == "")
      ) {
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }
    }

    if (la_Id != null) {
      AquisitionForm.LA_Id_PK = la_Id;
    }
    AquisitionForm.UId = id;
    AquisitionForm.LandAcquisition_16_2Models = this.LandDetails;
    // AquisitionForm.LA_Not_FilePath = this.getimageUpload();
    if (AquisitionForm.LA_Not_FilePath != null && !AquisitionForm.LA_Not_FilePath.match("http"))
      AquisitionForm.LA_Not_FilePath = this.getimageUpload();
    if (AquisitionForm.LA_Not6_File != null && !AquisitionForm.LA_Not6_File.match("http"))
      AquisitionForm.LA_Not6_File = this.getimageUpload1();
    if (AquisitionForm.LA_NotPoa_File != null && !AquisitionForm.LA_NotPoa_File.match("http"))
      AquisitionForm.LA_NotPoa_File = this.getimageUpload2();
    if (AquisitionForm.LA_NotAoa_File != null && !AquisitionForm.LA_NotAoa_File.match("http"))
      AquisitionForm.LA_NotAoa_File = this.getimageUpload3();
    if (AquisitionForm.LA_NotMoa_File != null && !AquisitionForm.LA_NotMoa_File.match("http"))
      AquisitionForm.LA_NotMoa_File = this.getimageUpload4();
    if (AquisitionForm.LA_NotPos_File != null && !AquisitionForm.LA_NotPos_File.match("http"))
      AquisitionForm.LA_NotPos_File = this.getimageUpload5();
    AquisitionForm.TakingOverPosModels = this.topExtentList;

    AquisitionForm.LA_PD_Id_FK = this.pro.PD_Id_FK;
    AquisitionForm.LA_PR_Id_FK = this.pro.pro_PR_Id_FK;

    this.data = this.userService.UpdateLandAquisition(AquisitionForm.LA_Id_PK, AquisitionForm);
    this.data.subscribe(
      (response) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.fourOneGrid = true;
        this.fourOneForm = false;
        this.sixOneGrid = true;
        this.sixOneForm = false;
        this.preparationAwardGrid = true;
        this.preparationAwardForm = false;
        this.approvalAwardForm = false;
        this.approvalAwardGrid = true;
        this.modeAwardGrid = true;
        this.modeAwardForm = false;
        this.overPossessionGrid = true;
        this.overPossessionForm = false;

        // this.Get41acquisitiondetailsforLA(this.itemsPerPage1, 1);
        // this.Get61acquisitiondetailsforLA(this.itemsPerPage2, 1);
        swal('Success!', 'Updated Successfully .', 'success');
        // this.Get41acquisitiondetailsforLA(this.itemsPerPage1, 1);
        // this.Get61acquisitiondetailsforLA(this.itemsPerPage2, 1);
        this.Get61acquisitiondetailsforLA(this.itemsPerPage2, this.currentPage2);
        this.GetAllLADropdownlistfor61();
        this.GetAllLADropdownlistforAOA(this.itemsPerPage4, this.currentPage4);
        this.GetAllLADropdownlistforMOA(this.itemsPerPage5, this.currentPage5);
        this.GetAllLADropdownlistforTOP(this.itemsPerPage6, this.currentPage6);

        //this.router.navigate(['/home/landacquisition/landacquisition-form']);
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

  // surya

  fourOneGrid = true;
  fourOneForm = false;
  fourOneContent() {

    this.mode = "save";

    this.clearla(0)

    this.fourOneGrid = false;
    this.fourOneForm = true;
  }
  fourOneContent1() {
    this.fourOneGrid = true;
    this.fourOneForm = false;
  }
  sixOneGrid = true;
  sixOneForm = false;
  sixOneContent() {
    this.clearla(0)
    this.mode = "save";
    this.sixOneGrid = false;
    this.sixOneForm = true;
  }
  sixOneContent1() {
    this.sixOneGrid = true;
    this.sixOneForm = false;
  }
  preparationAwardGrid = true;
  preparationAwardForm = false;
  preparationAwardContent() {
    this.clearla(0)
    this.mode = "save";
    this.preparationAwardGrid = false;
    this.preparationAwardForm = true;
  }
  preparationAwardContent1() {
    this.preparationAwardGrid = true;
    this.preparationAwardForm = false;
  }
  approvalAwardForm = false;
  approvalAwardGrid = true;
  approvalAwardContent() {
    this.clearla(0)
    this.mode = "save";
    this.approvalAwardForm = true;
    this.approvalAwardGrid = false;
  }
  approvalAwardContent1() {
    this.approvalAwardForm = false;
    this.approvalAwardGrid = true;
  }

  modeAwardGrid = true;
  modeAwardForm = false;
  modeAwardContent() {
    this.clearla(0)
    this.mode = "save";
    this.modeAwardGrid = false;
    this.modeAwardForm = true;
  }
  modeAwardContent1() {
    this.modeAwardGrid = true;
    this.modeAwardForm = false;
  }

  overPossessionGrid = true;
  overPossessionForm = false;

  overPossessionContent() {
    this.clearla(0)
    this.mode = "save";
    this.overPossessionGrid = false
    this.overPossessionForm = true;
  }

  overPossessionContent1() {
    this.overPossessionGrid = true;
    this.overPossessionForm = false;
  }


  // last

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
          let i: any = document.getElementById('LA_Not_FilePath');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LA_Not_FilePath');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getimageUpload() {
    let imagename = null;
    try {
      imagename = document.getElementById('LA_Not_FilePath');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  imageUpload1(file: FileList) {

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
          let i: any = document.getElementById('LA_Not6_File');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LA_Not6_File');
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
      imagename = document.getElementById('LA_Not6_File');
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
          let i: any = document.getElementById('LA_NotPoa_File');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LA_NotPoa_File');
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
      imagename = document.getElementById('LA_NotPoa_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  imageUpload3(file: FileList) {

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
          let i: any = document.getElementById('LA_NotAoa_File');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LA_NotAoa_File');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getimageUpload3() {
    let imagename = null;
    try {
      imagename = document.getElementById('LA_NotAoa_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  imageUpload4(file: FileList) {

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
          let i: any = document.getElementById('LA_NotMoa_File');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LA_NotMoa_File');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getimageUpload4() {
    let imagename = null;
    try {
      imagename = document.getElementById('LA_NotMoa_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  imageUpload5(file: FileList) {

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
          let i: any = document.getElementById('LA_NotPos_File');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LA_NotPos_File');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getimageUpload5() {
    let imagename = null;
    try {
      imagename = document.getElementById('LA_NotPos_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  GetProjectId(PD_Id_FK, LA_Id) {

    if (LA_Id == undefined) {
      LA_Id = 0;
    }
    this.GetProposalId(PD_Id_FK)
    this.GetlanddetailsforLA(PD_Id_FK, LA_Id, this.mode)
    this.la.LA_PD_Id_FK = PD_Id_FK;
    this.l.LP_PD_Id_FK = PD_Id_FK;
    // this.GetSurveyNo(PD_Id_FK);
    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == PD_Id_FK) {
        this.Sch_Name = this.projectlist[i].Sch_Name;

        document.getElementById('loader-spinner').style.display = "none";
      }
    }
  }

  // GetProjectandPropId(PD_Id_FK,PR_Id) {
  //   
  //   this.GetProposalId(PD_Id_FK)
  //   this.GetlanddetailsforLA(PD_Id_FK)
  //   this.la.LA_PD_Id_FK = PD_Id_FK;
  //   this.l.LP_PD_Id_FK = PD_Id_FK;
  //   this.GetSurveyNo(PD_Id_FK);
  //   for (let i = 0; i < this.projectlist.length; i++) {
  //     if (this.projectlist[i].PD_Id == PD_Id_FK) {
  //       this.Sch_Name = this.projectlist[i].Sch_Name;

  //       document.getElementById('loader-spinner').style.display = "none";
  //     }
  //   }
  // }

  Cancel() {
    this.router.navigate(['/home/landacquisition']);
  }

  GetByIdInspection(IR_Id) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdLandPurchase(IR_Id);
    this.data.subscribe(
      (response: any) => {
        this.l = response;
        this.pro.PD_Id_FK = this.l.LP_PD_Id_FK;
        this.pro.pro_PR_Id_FK = this.l.LP_PR_Id_FK;
        this.l.LP_DPC_Date = ((this.l.LP_DPC_Date).split('T'))[0];
        this.l.LP_BA_Date = ((this.l.LP_BA_Date).split('T'))[0];
        this.l.LP_GO_Date = ((this.l.LP_GO_Date).split('T'))[0];
        //this.GetProjectId(this.l.LP_PD_Id_FK)
        this.GetOtherrelatedinfo(this.l.LP_PR_Id_FK);

        // setTimeout(() => {
        //   this.GetOtherrelatedinfo(this.l.LP_Id_PK);
        // }, 500)

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  SaveLandPurchase(LandPurchaseForm: NgForm) {

    LandPurchaseForm.value.LP_PR_Id_FK = this.Pr_Id;
    if (LandPurchaseForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      this.data = this.userService.PostLandPurchaseDetails(LandPurchaseForm.value);
      this.data.subscribe(
        (response) => {

          LandPurchaseForm.reset();
          LandPurchaseForm.resetForm();
          LandPurchaseForm.form.markAsPristine();
          LandPurchaseForm.form.markAsUntouched();
          swal('Success!', 'Land Purchase Detail Added Successfully .', 'success');
          document.getElementById('loader-spinner').style.display = "none";
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

    LandPurchaseForm.value.LP_PR_Id_FK = this.Pr_Id;
    if (LandPurchaseForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {

      LandPurchaseForm.value.LP_PD_Id_FK = this.pro.PD_Id_FK;
      LandPurchaseForm.value.LP_PR_Id_FK = this.pro.pro_PR_Id_FK;

      this.data = this.userService.UpdateLandPurchase(LandPurchaseForm.value, this.LA_Id, 0);
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

  public preAward: boolean = false;
  public appAward: boolean = false;
  public mAward: boolean = false;
  public oPossession: boolean = false;


  preparationAward() {
    this.preAward = !this.preAward;
  }
  approvalAward() {
    this.appAward = !this.appAward;
  }
  modeAward() {
    this.mAward = !this.mAward;
  }
  overPossession() {
    this.oPossession = !this.oPossession;
  }

  //payment

  GetAllPaymentProjects(itemsPerPage: number, pageNo: number) {
    debugger;
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


  GetLandOwnerInfo(LO_Id) {
    this.data = this.userService.getLandOwnerInfo(LO_Id);
    this.data.subscribe(
      (response: any) => {
        this.LandOwnerDetail = response;
      });
  }


  GetProjectDetailsforPayment(LA_Id) {

    let PD_Id: any;
    for (let i = 0; i < this.Land61acquisitionlist.length; i++) {
      if (this.Land61acquisitionlist[i].LA_Id_PK == LA_Id) {
        PD_Id = this.Land61acquisitionlist[i].LA_PD_Id_FK;

      }
    }


    this.LandRecordDetailswithLTP = [];
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetProjectDetailsforPayment(PD_Id, LA_Id)
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
          this.GetAllLADropdownlistfor61();
          this.GetAllPaymentProjects(this.itemsPerPage3,this.currentPage3);

          document.getElementById('loader-spinner').style.display = "none";

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

  delete(LA_Id_PK, Id) {

    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteLandAcquisition(LA_Id_PK, Id);
        this.data.subscribe(
          (response: any) => {
            this.Get41acquisitiondetailsforLA(this.itemsPerPage1, 1);
            this.Get61acquisitiondetailsforLA(this.itemsPerPage2, 1);
            this.GetAllPaymentProjects(this.itemsPerPage, 1);
            this.GetAllLADropdownlistforPOA(this.itemsPerPage3, 1);
            this.GetAllLADropdownlistforAOA(this.itemsPerPage4, 1);
            this.GetAllLADropdownlistforMOA(this.itemsPerPage5, 1);
            this.GetAllLADropdownlistforTOP(this.itemsPerPage6, 1);
          },
        );
      }
    })
  }
}
