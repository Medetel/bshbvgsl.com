import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User, Register, Login, Office, Search } from './user.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()

export class UserService {

  //testing
// readonly rootUrl = 'http://localhost:14080';

  //Staging 
//readonly rootUrl = 'https://BSHBAPI.esdinfra.com';

// Live
readonly rootUrl = 'https://api.bshbvgsl.com';



  httpOptions: any;

  constructor(private http: HttpClient) {
    let accesstoken = localStorage.getItem('accessToken');
    if (accesstoken != null && accesstoken != '' && typeof (accesstoken) != undefined) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accesstoken,
          'No-Auth': 'True'
        })
      };
    }
  }

  getAllowedPages() {
    let accesstoken = localStorage.getItem('accessToken');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accesstoken
      })
    };
    return this.http.get(this.rootUrl + '/api/AllowedPages', this.httpOptions);
  }

  uploadImage(data) {
    return this.http.post(this.rootUrl + '/api/DistrictandTaluk/image', data);
  }
  uploadpromotion(data) {
    return this.http.post(this.rootUrl + '/api/Promotion/PromotionUpload', data);
  }

  uploadCD_Letter_Doc(data) {
    return this.http.post(this.rootUrl + '/api/ConsultantDetails/Upload_CD_Letter_Doc', data);
  }
  uploadCD_Aggrement_Doc(data) {
    return this.http.post(this.rootUrl + '/api/ConsultantDetails/Upload_CD_Aggrement_Doc', data);
  }
  uploadCD_CD_WorkOrder_Doc(data) {
    return this.http.post(this.rootUrl + '/api/ConsultantDetails/Upload_CD_WorkOrder_Doc', data);
  }
  
   
   
   
    SA_Letter_Doc(data) {
    return this.http.post(this.rootUrl + '/api/ConsultantDetails/SA_Letter_Doc', data);
    }
    SA_Aggrement_Doc(data) {
    return this.http.post(this.rootUrl + '/api/ConsultantDetails/SA_Aggrement_Doc', data);
    }
    SA_WorkOrder_Doc(data) {
    return this.http.post(this.rootUrl + '/api/ConsultantDetails/SA_WorkOrder_Doc', data);
    }

   uploaddepout(data) {
  
    return this.http.post(this.rootUrl + '/api/DeputDetails/depout', data);
    }
   
    uploaddepin(data) {
    return this.http.post(this.rootUrl + '/api/DeputAuthDetails/DepIN', data);
    }
   


  uploadExcel(data, Proj_ID: any) {
    return this.http.post(this.rootUrl + '/api/DistrictandTaluk/Excel/' + Proj_ID, data);
  }

  calculateAge(dateOfBirth) {

    return this.http.get(this.rootUrl + '/api/ApplicationForm/calculateAge/' + dateOfBirth, this.httpOptions);
  }

  getApplicationFormDetails(APP_Id) {

    return this.http.get(this.rootUrl + '/api/ApplicationForm/GetApplicationFormDetails/' + APP_Id, this.httpOptions);
  }

  GetApplicationScrutinyFormDetails(APP_Id) {
    return this.http.get(this.rootUrl + '/api/ApplicationForm/GetApplicationScrutinyFormDetails/' + APP_Id, this.httpOptions);
  }

  GetApplicationDetails(APP_Id) {
    return this.http.get(this.rootUrl + '/api/WorkAroundSln/GetApplicationDetails/' + APP_Id, this.httpOptions);
  }

  getProjectDetails(NO_Id, PD_Id) {
    return this.http.get(this.rootUrl + '/api/ApplicationForm/GetProjectDetails/' + NO_Id + "/" + PD_Id, this.httpOptions);
  }
  getAppViewProjectDetails(NO_Id, APP_Id) {
    return this.http.get(this.rootUrl + '/api/ApplicationForm/getAppViewProjectDetails/' + NO_Id + "/" + APP_Id, this.httpOptions);
  }
  getAppdraftViewProjectDetails(NO_Id, APP_Id) {
    return this.http.get(this.rootUrl + '/api/ApplicationForm/getAppdraftViewProjectDetails/' + NO_Id + "/" + APP_Id, this.httpOptions);
  }
  GetAllBanks(NO_Id) {
    return this.http.get(this.rootUrl + '/api/ApplicationForm/GetAllBanks/' + NO_Id, this.httpOptions);
  }

  GetAllInstaBanks(APP_Id) {
    return this.http.get(this.rootUrl + '/api/PaymentConfiguration/GetAllInstaBanks/' + APP_Id + "/", this.httpOptions);
  }

  saveKHBNotification(data: any) {
    return this.http.post(this.rootUrl + '/api/KHBNotification/Save', data, this.httpOptions);
  }

  saveApplication(data: any) {
    return this.http.post(this.rootUrl + '/api/ApplicationForm', data, this.httpOptions);
  }

  SaveOfflineApplication(data: any) {
    return this.http.post(this.rootUrl + '/api/ApplicationForm/AddofflineApplication', data, this.httpOptions);
  }
  saveApplicationdraft(data: any) {
    return this.http.post(this.rootUrl + '/api/ApplicationForm/saveApplicationdraft', data, this.httpOptions);
  }

  updateApplication(APP_Id: any, data: any) {
    data['APP_Id'] = APP_Id;
    return this.http.put(this.rootUrl + '/api/ApplicationForm/Update', data, this.httpOptions);
  }

  updateApplicationofoffline(APP_No: any, data: any) {
    data['APP_No'] = APP_No;
    return this.http.put(this.rootUrl + '/api/WorkAroundSln/Update', data, this.httpOptions);
  }

  getAllRoles(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Roles/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  getAllUsers(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Users/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  getAllClaimsForTheRole(roleId: string) {
    return this.http.get(this.rootUrl + '/api/Claims/' + roleId, this.httpOptions);
  }
  getRoleForTheId(roleId: string) {
    return this.http.get(this.rootUrl + '/api/Roles/' + roleId, this.httpOptions);
  }
  GetLastLoginDate(Id: any) {
    return this.http.get(this.rootUrl + '/api/Roles/Login/' + Id, this.httpOptions);
  }
  getUserForTheId(Id: string) {
    return this.http.get(this.rootUrl + '/api/Users/' + Id, this.httpOptions);
  }

  getOfficeForTheId(OfficeId: string) {
    return this.http.get(this.rootUrl + '/api/Offices/' + OfficeId, this.httpOptions);
  }

  getAllClaims(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Roles/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetAllRoleNames() {
    return this.http.get(this.rootUrl + '/api/Roles/GetAllOffices/', this.httpOptions);
  }
  GetAllMenuNames() {
    return this.http.get(this.rootUrl + '/api/Roles/GetAllMenuNames/', this.httpOptions);
  }
  GetAllProjectsforUser() {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/GetAllProjectsforUser/', this.httpOptions);
  }

  getAllDistrictName() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllDistrict', this.httpOptions);
  }

  GetAllSchemes() {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/GetAllScheme', this.httpOptions);
  }

  GetAllPhase() {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/GetAllPhase', this.httpOptions);
  }
  getAllBlockName(DI_Id) {
    return this.http.get(this.rootUrl + '/api/KHBNotification/GetAllBlockByDistrict_Id/' + DI_Id, this.httpOptions);
  }
  getAllTalukName(DistrictId) {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllTaluk/' + DistrictId, this.httpOptions);
  }
  GetAuctionNotifications(PD_id) {
    return this.http.get(this.rootUrl + '/api/WorkAroundSln/GetAuctionNotifications/' + PD_id, this.httpOptions);
  }

  getApproveAuthority(Lua_Id) {
    return this.http.get(this.rootUrl + '/api/ApprovedDrawing/GetApproveAuthority/' + Lua_Id, this.httpOptions);
  }

  getAllHobliName(HobliId) {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllHobli/' + HobliId, this.httpOptions);
  }

  getAllVillageName(VillageId) {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllVillage/' + VillageId, this.httpOptions);
  }

  getCategory() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllCategory', this.httpOptions);
  }

  GetPropertyType() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetPropertyTypes', this.httpOptions);
  }

  getAllCategory(S_ProjectID) {
    return this.http.get(this.rootUrl + '/api/Scrutiny/GetAllCategory/' + S_ProjectID, this.httpOptions);
  }
  GetAllDistrict(DSWOId_NO_Division_Id_Fk) {
    return this.http.get(this.rootUrl + '/api/KHBNotification/GetAllDistrictByDivision_Id/' + DSWOId_NO_Division_Id_Fk , this.httpOptions);
  }
  GetAllDistrictsnotific(DSWOId_NO_Division_Id_Fk:any) {
    return this.http.get(this.rootUrl + '/api/KHBNotification/GetAllDistrictByDivision_Id/'+ DSWOId_NO_Division_Id_Fk , this.httpOptions);
  }
  GetAllDistrictsnoti(DSWOId_NO_Division_Id_Fk) {
    return this.http.get(this.rootUrl + '/api/KHBNotification/GetAllDistrictByDivision_Id/'+ DSWOId_NO_Division_Id_Fk , this.httpOptions);
  }
  GetAllColony(District_Id_Fk:any) {
    return this.http.get(this.rootUrl + '/api/KHBNotification/GetAllColonyByDistrict_Id/'+ District_Id_Fk , this.httpOptions);
  }
  GetAllDivision() {
    return this.http.get(this.rootUrl + '/api/KHBNotification/GetAllDivision', this.httpOptions);
  }
  GetPropertiesCount(categoryId, Proj_Id) {
    return this.http.get(this.rootUrl + '/api/KHBNotification/GetPropertiesCount/' + categoryId + "/" + Proj_Id, this.httpOptions);
  }

  getAllBanks() {
    return this.http.get(this.rootUrl + '/api/Bankdetails_Controller/GetAllBanksName', this.httpOptions);
  }


  getRelations() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllRelations', this.httpOptions);
  }

  GetGuardianRelation() {
    return this.http.get(this.rootUrl + '/api/ApplicationForm/GetGuardianRelation', this.httpOptions);
  }

  getRelegions() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllRelegions', this.httpOptions);
  }

  CheckApplicationNo(App_No: any) {
    return this.http.get(this.rootUrl + '/api/ApplicationForm/CheckApplicationNo/' + App_No + "/", this.httpOptions);
  }

  getReservations() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllReservations', this.httpOptions);
  }

  getAllProjects() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllProjects', this.httpOptions);
  }
  getAllProjectsforchangequota() {
    return this.http.get(this.rootUrl + '/api/CategoryController/GetAllProjectCPQ', this.httpOptions);
  }
  CreateProjectDetails(projectdetails) {
    return this.http.post(this.rootUrl + '/api/ProjectDetails/CreateProjectDetails', projectdetails, this.httpOptions);
  }
  SaveElottery(Qlottery) {
    return this.http.post(this.rootUrl + '/api/MannualLottery/SaveElottery', Qlottery, this.httpOptions);
  }
  SendElotterySms(Qlottery) {
    return this.http.post(this.rootUrl + '/api/MannualLottery/SendElotterySms', Qlottery, this.httpOptions);
  }
  SaveExchange(excng) {
    return this.http.post(this.rootUrl + '/api/PropertyRegister/SaveExchange', excng, this.httpOptions);
  }

  SaveOrderDoc(OrdDocObj) {
    return this.http.put(this.rootUrl + '/api/Allotment/SaveOrderDoc', OrdDocObj, this.httpOptions);
  }
  CreatePostCancelRequest(projectdetails, PR_Id) {
    return this.http.post(this.rootUrl + '/api/Cancellation/CreatePostCancelRequest/' + PR_Id, projectdetails, this.httpOptions);
  }
  SaveNotification(Auctiondetails) {
    return this.http.post(this.rootUrl + '/api/AuctionNotification/SaveNotification', Auctiondetails, this.httpOptions);
  }
  insertRefunddata(Refunddetails) {
    return this.http.post(this.rootUrl + '/api/NotAllottedRefund/insertRefunddata', Refunddetails, this.httpOptions);
  }
  SaveBidder(bidder, AN_Id) {
    return this.http.post(this.rootUrl + '/api/AuctionNotification/SaveBidder/' + AN_Id, bidder, this.httpOptions);
  }
  SaveBasePriceforProperties(auctionproperties) {
    return this.http.put(this.rootUrl + '/api/AuctionNotification/SaveBasePriceforProperties', auctionproperties, this.httpOptions);
  }

  SavePropertiesforAuction(auctionproperties, AN_Id) {
    return this.http.put(this.rootUrl + '/api/AuctionNotification/SavePropertiesforAuction/' + AN_Id, auctionproperties, this.httpOptions);
  }

  SaveSurveyNoforTownPlanning(LTPDetails, Pd_Id) {
    return this.http.post(this.rootUrl + '/api/LandtoTownPlanning/SaveSurveyNoforTownPlanning/' + Pd_Id, LTPDetails, this.httpOptions);
  }

  SaveRevisedProperties(revise: any) {
    return this.http.post(this.rootUrl + '/api/WorkAroundSln/SaveRevisedProperties', revise, this.httpOptions);
  }

  SaveLopPayment(Payment) {
    return this.http.post(this.rootUrl + '/api/LandOwnerPayment/SaveLopPayment', Payment, this.httpOptions);
  }

  SaveSurveyNoforProjectPhase(PPDetails, Pd_Id) {
    return this.http.post(this.rootUrl + '/api/ProjectDetails/SaveSurveyNoforProjectPhase/' + Pd_Id, PPDetails, this.httpOptions);
  }

  CreateCancelRequest(canceldetails, APP_No, Amount, APP_Status) {
    return this.http.post(this.rootUrl + '/api/CancellationandRefundRequest/CreateCancelRequest/' + APP_No + "/" + Amount + "/" + APP_Status, canceldetails, this.httpOptions);
  }

  PostCancellation(canceldetails, APP_No, Amount) {
    return this.http.post(this.rootUrl + '/api/CancellationandRefundRequest/PostCancellation/' + APP_No + "/" + Amount + "/", canceldetails, this.httpOptions);
  }

  CreateRefundRequest(APP_Id, Amount) {

    return this.http.post(this.rootUrl + '/api/CancellationandRefundRequest/CreateRefundRequest/' + APP_Id + "/" + Amount, null, this.httpOptions);
  }
  UpdateApplicantDetails(payment: any) {
    return this.http.put(this.rootUrl + '/api/ApplicationForm/UpdateApplicantDetails', payment, this.httpOptions);
  }

  VerifyDetails(scroll: any) {
    return this.http.put(this.rootUrl + '/api/ApplicationForm/VerifyDetails', scroll, this.httpOptions);
  }

  SubmitPaymentDetails(payment) {
    return this.http.put(this.rootUrl + '/api/ApplicationForm/SubmitPaymentDetails', payment, this.httpOptions);
  }

  CreateFinalCost(S_NotificationID, S_ProjectID, cost) {
    return this.http.post(this.rootUrl + '/api/Allotment/CreateFinalCost/' + S_NotificationID + "/" + S_ProjectID, cost, this.httpOptions);
  }

  SaveandPrintAllotmentLetter(allotmentdata) {

    return this.http.post(this.rootUrl + '/api/Allotment/SaveandPrintAllotmentLetter', allotmentdata, this.httpOptions);
  }
  SaveandPrintNoticeLetter(allotmentdata, Not_type: any, Notice_Date: any) {
    return this.http.post(this.rootUrl + '/api/Allotment/SaveandPrintNoticeLetter/' + Not_type + "/" + Notice_Date + "/", allotmentdata, this.httpOptions);
  }

  createInstallment(APP_No) {
    return this.http.post(this.rootUrl + '/api/Allotment/createInstallment/' + APP_No, null, this.httpOptions);
  }
  createInstallmentnew(APP_No, installmentNo :number, Days:any) {
     return this.http.post(this.rootUrl + '/api/Allotment/createInstallmentnew/' + APP_No+ "/" + installmentNo + "/" + Days,null, this.httpOptions);
    }

  UpdateInstallment(Ins) {
    return this.http.post(this.rootUrl + '/api/Allotment/UpdateInstallment', Ins, this.httpOptions);
  }

  CreateLandDetails(Landdetails) {
    return this.http.post(this.rootUrl + '/api/LandRecords/CreateLandDetails', Landdetails, this.httpOptions);
  }

  SaveAuthority(Project_Id, Approve: any) {

    return this.http.post(this.rootUrl + '/api/ApprovedDrawing/SaveAuthority/' + Project_Id, Approve, this.httpOptions);
  }

  UpdateAuthority(Project_Id, Approve: any) {

    return this.http.put(this.rootUrl + '/api/ApprovedDrawing/Update/' + Project_Id, Approve, this.httpOptions);
  }

  getRolesforSelectedOffice() {
    return this.http.get(this.rootUrl + '/api/Roles/getRolesforSelectedOffice', this.httpOptions);
  }

  GetAllOffices(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Offices/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllOfficelevels() {
    return this.http.get(this.rootUrl + '/api/Offices/GetOfficelevel/', this.httpOptions);
  }
  GetAllDistrictNames() {
    return this.http.get(this.rootUrl + '/api/Offices/GetDistrict/', this.httpOptions);
  }

  registerUser(register: Register) {

    return this.http.post(this.rootUrl + '/api/Account/Register', register, this.httpOptions);
  }
  InsertAlertDetails(register: Register) {

    return this.http.post(this.rootUrl + '/api/Alert/CreateAlertConfiguration', register, this.httpOptions);
  }

  registerCustomer(register: Register) {

    return this.http.post(this.rootUrl + '/api/CustomerAccount/Register', register, this.httpOptions);
  }

  createRole(user: User) {
    return this.http.post(this.rootUrl + '/api/Roles/Create', user, this.httpOptions);
  }

  createLoginLoc(user: User) {
    return this.http.put(this.rootUrl + '/api/Roles/createLoginLoc', user, this.httpOptions);
  }

  updateRole(user: User, roleId: string) {
    return this.http.put(this.rootUrl + '/api/Roles/Update/' + roleId, user, this.httpOptions);
  }

  searchRoles(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Roles/Search/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  searchUsers(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Users/Search/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  searchOffices(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Offices/Search/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  updateOffice(office: Office, OfficeId: string) {
    return this.http.put(this.rootUrl + '/api/Offices/Update/' + OfficeId, office, this.httpOptions);
  }

  saveClaims(claimsList, roleId) {
    return this.http.put(this.rootUrl + '/api/Claims/' + roleId + '/assignclaims', claimsList, this.httpOptions);
  }

  CreateOffice(office: Office) {
    return this.http.post(this.rootUrl + '/api/Offices/Create', office, this.httpOptions);
  }

  forgotPassword(passwordDetails: any) {
    return this.http.post(this.rootUrl + '/api/CustomerAccount/ForgotPassword', passwordDetails, this.httpOptions);
  }

  changePassword(userDetails: any) {
    return this.http.post(this.rootUrl + '/api/Account/ChangePassword', userDetails, this.httpOptions);
  }

  changePasswordForTheId(userDetails: any) {
    return this.http.put(this.rootUrl + '/api/Account/Update', userDetails, this.httpOptions);
  }

  deleteRole(id: string) {
    return this.http.put(this.rootUrl + '/api/Roles/Delete/' + id, this.httpOptions);
  }

  activateInactivateUser(id: string) {
    return this.http.put(this.rootUrl + '/api/Users/ActivateInactivate/' + id, null, this.httpOptions);
  }

  activateInactivateRoles(id: string) {
    return this.http.put(this.rootUrl + '/api/Roles/ActivateInactivate/' + id, null, this.httpOptions);
  }

  activateInactivateOffices(id: string) {
    return this.http.put(this.rootUrl + '/api/Offices/ActivateInactivate/' + id, null, this.httpOptions);
  }

  searchProperties(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number, PD_Id: any) {
    return this.http.get(this.rootUrl + '/api/Propertyregister/Search/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo + "/" + PD_Id + "/", this.httpOptions);
  }
  searchRevProperties(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number, PD_Id: any) {
    return this.http.get(this.rootUrl + '/api/RevisedPropertyRegister/Search/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo + "/" + PD_Id + "/", this.httpOptions);
  }

  SearchApplicants(searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/UpdateObjection/Search/' + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  SearchProjectsforId(project: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Propertyregister/SearchProjects/' + project + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  SearchRevProjectsforId(project: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/RevisedPropertyRegister/SearchProjects/' + project + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetAllProperties(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/PropertyRegister/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetAllRevProperties(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/RevisedPropertyRegister/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  Changestatus(PR_Id: any, PR_Status: any) {

    return this.http.put(this.rootUrl + '/api/PropertyRegister/Change/' + PR_Id + "/" + PR_Status, this.httpOptions);
  }
  UpdatePropertyRegister(propertyregister, PR_Id) {
    return this.http.put(this.rootUrl + '/api/PropertyRegister/UpdatePropertyRegister/' + PR_Id, propertyregister, this.httpOptions);
  }
  GetAllOddRegular() {

    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllOddRegular', this.httpOptions);
  }

  GetAllIntermediateCorner() {

    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllIntermediateCorner', this.httpOptions);
  }
  GetAllProperty() {

    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllProperty', this.httpOptions);
  }
  GetAllCategory() {

    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllCategory', this.httpOptions);
  }
  GetProjectbyCode(projectcode) {
    return this.http.get(this.rootUrl + '/api/PropertyRegister/' + projectcode, this.httpOptions);
  }
  ActivateInactivateProject(id: string) {
    return this.http.put(this.rootUrl + '/api/ProjectDetails/ActivateInactivate/' + id, null, this.httpOptions);
  }
  ApproveorRejectBidder(PRId, Status) {
    return this.http.put(this.rootUrl + '/api/AuctionNotification/ApproveorRejectBidder/' + PRId + "/" + Status, null, this.httpOptions);
  }

  CancelAllotedProperties(cancelProperties) {
    return this.http.post(this.rootUrl + '/api/AuctionNotification/CancelAllotedProperties', cancelProperties, this.httpOptions);
  }

  ProcessRequestOrder(requestdata) {
    return this.http.post(this.rootUrl + '/api/Payment/ProcessRequestOrder', requestdata, this.httpOptions);
  }

  CompleteOrderProcess(verifydata) {
    return this.http.post(this.rootUrl + '/api/Payment/CompleteOrderProcess', verifydata, this.httpOptions);
  }

  GetCustomerOrderDetailById(Transaction_Id: any) {
    return this.http.get(this.rootUrl + '/api/Payment/GetCustomerOrderDetailById/' + Transaction_Id, this.httpOptions);
  }


  ApproveorRejectNotification(Status, AN_Id, Remarks) {
    return this.http.put(this.rootUrl + '/api/AuctionNotification/ApproveorRejectNotification/' + Status + "/" + AN_Id + "/" + Remarks, null, this.httpOptions);
  }

  includeexculdesurveyno(LD_Id, Status, Id, Pd_Id, LA_Id) {
    return this.http.put(this.rootUrl + '/api/LandAcquisition/includeexculdesurveyno/' + LD_Id + "/" + Status + "/" + Id + "/" + Pd_Id + "/" + LA_Id + '/', null, this.httpOptions);
  }
  includeexculdesurveynoforLP(LD_Id, Status, Id, Pd_Id, LA_Id) {
    return this.http.put(this.rootUrl + '/api/LandPurchase/includeexculdesurveynoforLP/' + LD_Id + "/" + Status + "/" + Id + "/" + Pd_Id + "/" + LA_Id + '/', null, this.httpOptions);
  }
  includeexculdesurveynoforJV(LD_Id, Status, Id, Pd_Id, LA_Id) {
    return this.http.put(this.rootUrl + '/api/JVPurchase/includeexculdesurveynoforJV/' + LD_Id + "/" + Status + "/" + Id + "/" + Pd_Id + "/" + LA_Id + '/', null, this.httpOptions);
  }

  Deleteproperty(PR_Id) {
    return this.http.put(this.rootUrl + '/api/AuctionNotification/Deleteproperty/' + PR_Id, null, this.httpOptions);
  }

  ActivateInactivateConsultant(id: string) {
    return this.http.put(this.rootUrl + '/api/ConsultantDetails/ActivateInactivate/' + id, null, this.httpOptions);
  }

  ActivateInactivateKhbDrawing(id: string) {
    return this.http.put(this.rootUrl + '/api/KhbDrawing/ActivateInactivate/' + id, null, this.httpOptions);
  }

  ActivateInactivateStatutory(id: string) {
    return this.http.put(this.rootUrl + '/api/StatutoryAuthority/ActivateInactivate/' + id, null, this.httpOptions);
  }
  SearchProjects(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/Search/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  SearchAllottedList(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number, PD_Id: any) {
    return this.http.get(this.rootUrl + '/api/Cancellation/Search/' + PD_Id + "/" + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  SearchOnlineCancelList(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Cancellation/SearchOnlineCancelList/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  SearchReceivedProject(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/SearchReceivedProject/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  SearchProjectsPhase(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/SearchProjectsPhase/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  SearchLandtoTownProjects(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandtoTownPlanning/SearchLandtoTownProjects/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  SearchRevisedProperties(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/WorkAroundSln/SearchRevisedProperties/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  SearchPaymentProjects(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandOwnerPayment/SearchPaymentProjects/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  SearchProperties(searchCriteria: any, searchText: any, AN_Id: any) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/Search/' + searchCriteria + "/" + searchText + "/" + AN_Id, this.httpOptions);
  }
  SearchUserProperties(searchCriteria: any, searchText: any) {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/SearchUserProperties/' + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  GetAllProjects(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllProjectsReceived(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/GetAllProjectsReceived/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllProjectsPhase(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/GetAllProjectsPhase/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllLandtoTownProjects(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandtoTownPlanning/GetAllLandtoTownProjects/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllRevisedProperties(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/WorkAroundSln/GetAllRevisedProperties/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllPaymentProjects(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandOwnerPayment/GetAllPaymentProjects/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllPropertiesforexcng(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/PropertyRegister/GetAllPropertiesforexcng/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetCancelVacantList(PD_Id, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Cancellation/GetCancelVacantList/' + PD_Id + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetCancelAllottedList(PD_Id, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Cancellation/GetCancelAllottedList/' + PD_Id + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetOnlineCancelList(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Cancellation/GetOnlineCancelList/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllRefunds(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/NotAllottedRefund/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetAllNotifications(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetPropertiesforAuction(AN_Id) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetPropertiesforAuction/' + AN_Id, this.httpOptions);
  }

  GetAllAllocatedProperties(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetAllAllocatedProperties/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  SearchAllocatedProperties(Biddercriteria: any, Biddersearch: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/SearchAllocatedProperties/' + Biddercriteria + "/" + Biddersearch + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetPropertiesforBPUpdation(searchCriteria: any, searchText: any, PD_Id: any, Ca_Id: any, Prop_Id: any) {
    return this.http.get(this.rootUrl + '/api/WorkAroundSln/GetPropertiesforBPUpdation/' + searchCriteria + '/' + searchText + '/' + PD_Id + '/' + Ca_Id + '/' + Prop_Id + '/', this.httpOptions);
  }
  GetProperties(PD_Id: any, Cat_Id: any, SearchText: any) {
    return this.http.get(this.rootUrl + '/api/WorkAroundSln/GetProperties/' + PD_Id + '/' + Cat_Id + '/' + SearchText + '/', this.httpOptions);
  }

  GetPaymentconfigForTheId(PC_Id) {
    return this.http.get(this.rootUrl + '/api/PaymentConfiguration/GetPaymentconfigForTheId/' + PC_Id, this.httpOptions);
  }
  GetApplicantforallotmentCancel(APP_No) {
    return this.http.get(this.rootUrl + '/api/Cancellation/GetApplicantforallotmentCancel/' + APP_No, this.httpOptions);
  }

  GetBidderforApproval(AN_Id) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetBidderforApproval/' + AN_Id, this.httpOptions);
  }

  GetBiddersforIntimation(AN_Id) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetBiddersforIntimation/' + AN_Id, this.httpOptions);
  }
  GetPropertiesforSelect(AN_Id) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetPropertiesforSelect/' + AN_Id, this.httpOptions);
  }

  GetPropertiescountforSelect(AN_Id) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetPropertiescountforSelect/' + AN_Id, this.httpOptions);
  }
  GetAllNotificationList(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/KHBNotification/GetAllNotificationList/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetAllResPercentage(itemsPerPage: number, pageNo: number, LO_NO_Id_FK, LO_PD_Id_FK, LO_CA_Id_FK, LO_PT_Id_FK) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GetAllResPercentage/' + itemsPerPage + "/" + pageNo + "/" + LO_NO_Id_FK + "/" + LO_PD_Id_FK + "/" + LO_CA_Id_FK + "/" + LO_PT_Id_FK, this.httpOptions);
  }

  updateProjectDetails(ProjectDetails, Pd_Id: string) {
    return this.http.put(this.rootUrl + '/api/ProjectDetails/Update/' + Pd_Id, ProjectDetails, this.httpOptions);
  }
  updateLandDetails(landdetails) {
    return this.http.put(this.rootUrl + '/api/LandRecords/Update', landdetails, this.httpOptions);
  }
  updateStatutoryDetails(PD_Id, StatutoryDetails) {
    return this.http.put(this.rootUrl + '/api/StatutoryAuthority/Update/' + PD_Id, StatutoryDetails, this.httpOptions);
  }

  updateConsultantDetails(ConsultantDetails, CD_Id: any) {
    return this.http.put(this.rootUrl + '/api/ConsultantDetails/Update/' + CD_Id, ConsultantDetails, this.httpOptions);
  }

  updateKhbDrawingDetails(KhbDetails, LP_Id: any) {
    return this.http.put(this.rootUrl + '/api/KhbDrawing/Update/' + LP_Id, KhbDetails, this.httpOptions);
  }

  GetAllLanduseperMasterplan() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllLanduseperMasterplan', this.httpOptions);
  }
  GetProjectForTheId(Pd_Id: any) {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/' + Pd_Id, this.httpOptions);
  }

  GetApplicantDetailsforCancel(APP_Id: any) {
    return this.http.get(this.rootUrl + '/api/CancellationandRefundRequest/GetApplicantDetailsforCancel/' + APP_Id, this.httpOptions);
  }
  GetApplicantDetailsforPostAllotCancel(APP_Id: any) {
    return this.http.get(this.rootUrl + '/api/CancellationandRefundRequest/GetApplicantDetailsforPostAllotCancel/' + APP_Id, this.httpOptions);
  }

  GetApplicantDetailsforInstapay(APP_Id: any, AppNo: any) {
    return this.http.get(this.rootUrl + '/api/CancellationandRefundRequest/GetApplicantDetailsforInstapay/' + APP_Id + "/" + AppNo, this.httpOptions);
  }

  Payinstallment(challaninsta) {
    return this.http.post(this.rootUrl + '/api/PaymentConfiguration/Payinstallment', challaninsta, this.httpOptions);
  }

  GetApplicantDetailsforRefund(APP_Id: any) {
    return this.http.get(this.rootUrl + '/api/CancellationandRefundRequest/GetApplicantDetailsforRefund/' + APP_Id, this.httpOptions);
  }

  GetPropertyforId(PR_Id: any) {
    return this.http.get(this.rootUrl + '/api/PropertyRegister/GetPropertyforId/' + PR_Id, this.httpOptions);
  }

  GetLandRecordbyId(LR_Id: any) {
    return this.http.get(this.rootUrl + '/api/LandRecords/LandRecord/' + LR_Id, this.httpOptions);
  }

  GetConsultantForTheId(CD_Id: any) {

    return this.http.get(this.rootUrl + '/api/ConsultantDetails/GetConsultantdetail/' + CD_Id, this.httpOptions);
  }

  GetStatutoryForTheId(PD_Id: any) {

    return this.http.get(this.rootUrl + '/api/StatutoryAuthority/GetStatutorydetail/' + PD_Id, this.httpOptions);
  }

  GetAllProject() {
    return this.http.get(this.rootUrl + '/api/LandRecords/GetAllProject', this.httpOptions);
  }

  GetProjectsforWAS() {
    return this.http.get(this.rootUrl + '/api/WorkAroundSln/GetProjectsforWAS', this.httpOptions);
  }
  GetAllProjectforAuction() {

    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetAllProjectforAuction', this.httpOptions);
  }

  GetAllLayoutAuthority() {

    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllAuthority', this.httpOptions);
  }

  GetProjectDetailsforLR(projectCode, Id) {
    return this.http.get(this.rootUrl + '/api/LandRecords/' + projectCode + '/' + Id + '/', this.httpOptions);
  }

  GetAllProjectforLR() {
    return this.http.get(this.rootUrl + '/api/LandRecords/GetAllProjectsforLP/', this.httpOptions);
  }

  GetAllProjectforLP_New() {
    return this.http.get(this.rootUrl + '/api/LandRecords/GetAllProjectsforLP_New/', this.httpOptions);
  }

  GetAllProjectforJV_New() {
    return this.http.get(this.rootUrl + '/api/LandRecords/GetAllProjectsforJV_New/', this.httpOptions);
  }

  GetAllProjectforLU() {
    return this.http.get(this.rootUrl + '/api/LandRecords/GetAllProjectsforLU/', this.httpOptions);
  }

  GetAllProjectsforLA() {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAllProjectsforLA/', this.httpOptions);
  }

  GetAllProjectsforLA_New() {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAllProjectsforLA_New/', this.httpOptions);
  }

  GetProjectVillage(PR_Id) {
    return this.http.get(this.rootUrl + '/api/RateFixation/GetProjectVillage/' + PR_Id, this.httpOptions);
  }

  GetlanddetailsforLPandLA(Proj_Id) {
    return this.http.get(this.rootUrl + '/api/LandPurchase/GetlanddetailsforLPandLA/' + Proj_Id, this.httpOptions);
  }

  GetlanddetailsforJVandLA(Proj_Id) {
    return this.http.get(this.rootUrl + '/api/JVPurchase/GetlanddetailsforJVandLA/' + Proj_Id, this.httpOptions);
  }

  GetlanddetailsforLA(Proj_Id, LA_Id, mode) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetlanddetailsforLA/' + Proj_Id + '/' + LA_Id + '/' + mode + '/', this.httpOptions);
  }

  GetlanddetailsforLP(Proj_Id, LOD_Id_Fk, LP_Id, mode) {
    return this.http.get(this.rootUrl + '/api/LandPurchase/GetlanddetailsforLP/' + Proj_Id + '/' + LOD_Id_Fk + '/' + LP_Id + '/' + mode + '/', this.httpOptions);
  }
  GetlanddetailsforJV(Proj_Id, LOD_Id_Fk, LP_Id, mode) {
    return this.http.get(this.rootUrl + '/api/JVPurchase/GetlanddetailsforJV/' + Proj_Id + '/' + LOD_Id_Fk + '/' + LP_Id + '/' + mode + '/', this.httpOptions);
  }

  Get41acquisitiondetailsforLA(itemsPerPage1: number, PageNo1: number) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/Get41acquisitiondetailsforLA/' + itemsPerPage1 + '/' + PageNo1, this.httpOptions);
  }
  Get61acquisitiondetailsforLA(itemsPerPage2: number, PageNo2: number) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/Get61acquisitiondetailsforLA/' + itemsPerPage2 + '/' + PageNo2, this.httpOptions);
  }
  GetAllLADropdownlistfor61() {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAllLADropdownlistfor61/', this.httpOptions);
  }
  GetAllLADropdownlistforPOA(itemsPerPage3: number, PageNo3: number) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAllLADropdownlistforPOA/' + itemsPerPage3 + '/' + PageNo3, this.httpOptions);
  }
  GetAllLADropdownlistforAOA(itemsPerPage4: number, PageNo4: number) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAllLADropdownlistforAOA/' + itemsPerPage4 + '/' + PageNo4, this.httpOptions);
  }
  GetAllLADropdownlistforMOA(itemsPerPage5: number, PageNo5: number) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAllLADropdownlistforMOA/' + itemsPerPage5 + '/' + PageNo5, this.httpOptions);
  }
  GetAllLADropdownlistforTOP(itemsPerPage6: number, PageNo6: number) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAllLADropdownlistforTOP/' + itemsPerPage6 + '/' + PageNo6, this.httpOptions);
  }
  GetLandOwner(projId) {
    return this.http.get(this.rootUrl + '/api/LandRecords/GetLandOwner/' + projId, this.httpOptions);
  }

  GetONLandOwner(projId) {
    return this.http.get(this.rootUrl + '/api/ObjectionNotification/GetLandOwner/' + projId, this.httpOptions);
  }

  GetAgreementlist(projId) {
    return this.http.get(this.rootUrl + '/api/LandPurchase/GetAgreementlist/' + projId, this.httpOptions);
  }
  GetJVAgreementlist(projId) {
    return this.http.get(this.rootUrl + '/api/JVPurchase/GetJVAgreementlist/' + projId, this.httpOptions);
  }

  GetSurveyNo(projId) {
    return this.http.get(this.rootUrl + '/api/LandRecords/GetSurveyNo/' + projId, this.httpOptions);
  }

  GetSurveyNoforLandAcquisition(projId) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetSurveyNoforLandAcquisition/' + projId, this.httpOptions);
  }

  GetONSurveyNo(LOD_Id, mode, ON_Id) {
    return this.http.get(this.rootUrl + '/api/ObjectionNotification/GetSurveyNo/' + LOD_Id + '/' + mode + '/' + ON_Id + '/', this.httpOptions);
  }

  SearchConsultants(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ConsultantDetails/Search/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  getAllConsultants() {

    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllConsultants', this.httpOptions);
  }

  CreateConsultant(consultantdetails: any) {

    return this.http.post(this.rootUrl + '/api/ConsultantDetails/CreateConsultant', consultantdetails, this.httpOptions);
  }

  CreateKhbDrawing(KhbDrawingDetails: any) {

    return this.http.post(this.rootUrl + '/api/KhbDrawing/CreateKhbDrawing', KhbDrawingDetails, this.httpOptions);
  }

  GetProjectforConsultantbyCode(PD_Id) {
    return this.http.get(this.rootUrl + '/api/ConsultantDetails/' + PD_Id, this.httpOptions);
  }

  GetProjectforKHBbyCode(PD_Id) {
    return this.http.get(this.rootUrl + '/api/KhbDrawing/' + PD_Id, this.httpOptions);
  }

  GetProjectDetailsforLandtoTown(PD_Id, LTPId) {
    return this.http.get(this.rootUrl + '/api/LandtoTownPlanning/' + PD_Id + '/' + LTPId + '/', this.httpOptions);
  }

  GetRevisedBasePriceDetails(RBP_Id) {
    return this.http.get(this.rootUrl + '/api/WorkAroundSln/' + RBP_Id, this.httpOptions);
  }

  GetLandOwnerDetailsforPayment(LR_Id) {
    return this.http.get(this.rootUrl + '/api/LandOwnerPayment/GetLandOwnerDetailsforPayment/' + LR_Id, this.httpOptions);
  }
  GetProjectDetailsforPayment(PD_Id, LA_Id) {
    return this.http.get(this.rootUrl + '/api/LandOwnerPayment/' + PD_Id + '/' + LA_Id + '/', this.httpOptions);
  }
  GetProjectDetailsforPaymentforLP(PD_Id, LA_Id) {
    return this.http.get(this.rootUrl + '/api/LandOwnerPayment/GetProjectDetailsforPaymentforLP/' + PD_Id + '/' + LA_Id + '/', this.httpOptions);
  }
  GetProjectDetailsforTownPlanning(PD_Id, PP_Id) {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/GetProjectDetailsforTownPlanning/' + PD_Id + '/' + PP_Id, this.httpOptions);
  }
  GetAllforApprovedrawing(PD_Id) {

    return this.http.get(this.rootUrl + '/api/ApprovedDrawing/GetApprovedDrawing/' + PD_Id, this.httpOptions);
  }

  getKhbNotification(NotificationID, ProjectID, CaTName) {

    return this.http.get(this.rootUrl + '/api/Allotment/GetAllotmentLetterDetails/' + NotificationID + "/" + ProjectID + "/" + CaTName, this.httpOptions);
  }

  GetNoticeLetter(AppId, NotificationID, ProjectID, Type) {
    return this.http.get(this.rootUrl + '/api/Allotment/GetNoticeLetter/' + AppId + "/" + NotificationID + "/" + ProjectID + "/" + Type, this.httpOptions);
  }

  GetorderLetter(AppId, NotificationID, ProjectID, Type) {
    return this.http.get(this.rootUrl + '/api/Allotment/GetNoticeLetter/' + AppId + "/" + NotificationID + "/" + ProjectID + "/" + Type, this.httpOptions);
  }

  GetKhbchallan(AppNo) {
    return this.http.get(this.rootUrl + '/api/ApplicationForm/GetKhbchallan/' + AppNo, this.httpOptions);
  }

  GetKhbAmountForPayment(AppNo) {
    return this.http.get(this.rootUrl + '/api/ApplicationForm/GetKhbAmountForPayment/' + AppNo, this.httpOptions);
  }

  GetKhbchallaninsta(AppNo, AmtType) {
    return this.http.get(this.rootUrl + '/api/ApplicationForm/GetKhbchallaninsta/' + AppNo + "/" + AmtType, this.httpOptions);
  }

  GetAuctionIntimation(AuctionNoId) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetAuctionIntimation/' + AuctionNoId, this.httpOptions);
  }
  GetAuctionDetails(AuctionNoId) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetAuctionDetails/' + AuctionNoId, this.httpOptions);
  }

  GetAuctionNotificationDetails(AuctionNoId) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetAuctionNotificationDetails/' + AuctionNoId, this.httpOptions);
  }

  GetAllFees() {

    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllFees', this.httpOptions);
  }
  GetAllTypeofEntrusts() {

    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllTypeofEntrustment', this.httpOptions);
  }
  GetAllConsultants(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ConsultantDetails/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllPlanproject() {

    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllProjectType', this.httpOptions);
  }

  userAuthentication(user: Login) {
    var data = "username=" + user.UserName + "&password=" + user.Password + "&grant_type=password";
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' })
    }
    return this.http.post(this.rootUrl + '/token', data, httpOptions);
  }

  CheckUserTypeEmp(username: any) {
    return this.http.get(this.rootUrl + '/api/Account/CheckUserTypeEmp?username=' + username, this.httpOptions);
  }

  CheckUserType(username: any) {

    return this.http.get(this.rootUrl + '/api/Account/CheckUserType?username=' + username, this.httpOptions);
  }

  getPropertyRegisterDetails(projectId: any) {

    return this.http.get(this.rootUrl + '/api/PropertyPlanning/GetPropertyRegisterDetails/' + projectId, this.httpOptions);
  }

  GetAvailablePropertylistForTheId(projectId: any, Type: any) {

    return this.http.get(this.rootUrl + '/api/PropertyPlanning/getavailableproperty/' + projectId + '/' + Type + '/', this.httpOptions);
  }

  GetAvailablePropertylistForTheIdCheck(projectId: any, Type: any) {

    return this.http.get(this.rootUrl + '/api/PropertyPlanning/GetAvailablepropertyCheck/' + projectId + '/' + Type + '/', this.httpOptions);
  }

  GetProjectDetailforDashboard(projectId: any, Type: any) {

    return this.http.get(this.rootUrl + '/api/PropertyPlanning/GetProjectDetailforDashboard/' + projectId + '/' + Type + '/', this.httpOptions);
  }

  GetBlockedPropertylistForTheId(projectId: any) {

    return this.http.get(this.rootUrl + '/api/PropertyPlanning/getBlockedproperty/' + projectId, this.httpOptions);
  }

  saveStatutoryDetails(id, data: any) {

    return this.http.post(this.rootUrl + '/api/StatutoryAuthority/Save/' + id, data, this.httpOptions);
  }

  GetAllStatutoryAuthorityList() {
    return this.http.get(this.rootUrl + '/api/StatutoryAuthority/GetAllStatutoryAuthority/', this.httpOptions);
  }
  GetProjectDetailsforSA(projectCode) {
    return this.http.get(this.rootUrl + '/api/StatutoryAuthority/' + projectCode, this.httpOptions);
  }
  GetListViewforRefund(NAR_Id) {
    return this.http.get(this.rootUrl + '/api/NotAllottedRefund/GetListViewforRefund/' + NAR_Id, this.httpOptions);
  }

  Geteligible(Not_Id, Proj_Id, App_No) {
    return this.http.get(this.rootUrl + '/api/NotAllottedRefund/Geteligible/' + Not_Id + "/" + Proj_Id + "/" + App_No + "/", this.httpOptions);
  }
  GeteligibleCancelList(Not_Id, Proj_Id, App_No) {
    return this.http.get(this.rootUrl + '/api/NotAllottedRefund/GeteligibleCancelList/' + Not_Id + "/" + Proj_Id + "/" + App_No + "/", this.httpOptions);
  }
  GetIneligible(Not_Id, Proj_Id, App_No) {
    return this.http.get(this.rootUrl + '/api/NotAllottedRefund/GetIneligible/' + Not_Id + "/" + Proj_Id + "/" + App_No + "/", this.httpOptions);
  }

  GetProjectDetailsforRefund(projectCode, App_No) {
    return this.http.get(this.rootUrl + '/api/NotAllottedRefund/' + projectCode + "/" + App_No + "/", this.httpOptions);
  }

  GetAllProjectforSA() {
    return this.http.get(this.rootUrl + '/api/StatutoryAuthority/GetAllProject/', this.httpOptions);
  }
  AddLRNotes(id, LRN) {
    return this.http.post(this.rootUrl + '/api/LandRecords/AddLRNotes/' + id, LRN, this.httpOptions);
  }

  GetRemarks(LR_Id) {
    return this.http.get(this.rootUrl + '/api/LandRecords/GetLRNotes/' + LR_Id, this.httpOptions);
  }

  GetProcRemarks(LR_Id) {
    return this.http.get(this.rootUrl + '/api/LandRecords/GetLRProcNotes/' + LR_Id, this.httpOptions);
  }
  GetAllStatutory(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/StatutoryAuthority/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  SearchStatutory(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/StatutoryAuthority/Search/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetAllKhbDrawings(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/KhbDrawing/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  SearchKhbDrawings(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/KhbDrawing/Search/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  getApplicationsForScrutiny(DSWOID_NO_Id: number, PD_Id: number, CA_Id: number, RES_Id: number, PT_PropertyType) {

    return this.http.get(this.rootUrl + '/api/Scrutiny/GetApplicationListForScrutiny/' + DSWOID_NO_Id + "/" + PD_Id + "/" + CA_Id + "/" + RES_Id + "/" + PT_PropertyType + "/", this.httpOptions);
  }
  GetLotteryApplications(DSWOID_NO_Id: any, PD_Id: any, LotDate: any) {
    return this.http.get(this.rootUrl + '/api/Reports/GetApplicationListForScrutiny/' + DSWOID_NO_Id + "/" + PD_Id + "/" + LotDate + "/", this.httpOptions);
  }
  GETApplicationsList(DSWOID_NO_Id: number, PD_Id: number, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/UpdateObjection/GetApplicationListForUpdateObjection/' + DSWOID_NO_Id + "/" + PD_Id + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  getProjectNotificationDetails(DSWOID_NO_Id: number, PD_Id: number) {
    return this.http.get(this.rootUrl + '/api/Scrutiny/GetAllDetailsForScrutiny/' + DSWOID_NO_Id + "/" + PD_Id + "/", this.httpOptions);
  }

  GetApplicantDetailsforElottery(notificationId: number, projectId: number,R_Created_Date:Date) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GetApplicantDetailsforElottery/' + notificationId + "/" + projectId + "/" +R_Created_Date + "/", this.httpOptions);
  }

  GetAllottedDetailsforElottery(lot_Not_ID, lot_Proj_ID, PT_Id, CA_Id) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GetAllottedDetailsforElottery/' + lot_Not_ID + "/" + lot_Proj_ID + "/" + PT_Id + "/" + CA_Id + "/", this.httpOptions);
  }

  GetPropertyDetailsforElottery(lot_Proj_ID: any, PT_Id: any, CA_Id: any) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GetPropertyDetailsforElottery/' + lot_Proj_ID + "/" + PT_Id + "/" + CA_Id + "/", this.httpOptions);
  }

  GetEligibleApplicantDetailsforElottery(lot_Not_ID: any, lot_Proj_ID: any, PT_Id: any, CA_Id: any, RES_Id: any) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GetEligibleApplicantDetailsforElottery/' + lot_Not_ID + "/" + lot_Proj_ID + "/" + PT_Id + "/" + CA_Id + "/" + RES_Id + "/", this.httpOptions);
  }

  GetAlert() {
    return this.http.get(this.rootUrl + '/api/Alert/GetAlert', this.httpOptions);
  }
  GetAlertReceived() {
    return this.http.get(this.rootUrl + '/api/Alert/GetAlertReceived', this.httpOptions);
  }
  GetAlertEscalated() {
    return this.http.get(this.rootUrl + '/api/Alert/GetAlertEscalated', this.httpOptions);
  }
  GetAlertResolved() {
    return this.http.get(this.rootUrl + '/api/Alert/GetAlertResolved', this.httpOptions);
  }
  GetAlertUsers() {
    return this.http.get(this.rootUrl + '/api/Alert/GetAllUsers', this.httpOptions);
  }
  GetInstallmentPaySchedule(NO_Id, PD_Id) {
    return this.http.get(this.rootUrl + '/api/Allotment/GetInstallmentPaySchedule/' + NO_Id + "/" + PD_Id, this.httpOptions);
  }
  GetInstallment(INS_Id) {
    return this.http.get(this.rootUrl + '/api/Allotment/GetInstallment/' + INS_Id, this.httpOptions);
  }

  getProjectDetailsForScrutiny(DSWOID_NO_Id) {
    return this.http.get(this.rootUrl + '/api/Scrutiny/GetProjectDetails/' + DSWOID_NO_Id, this.httpOptions);
  }
  GetApplicantsWithoutRes(NotificationId:any,ProjectId:any) {
    return this.http.get(this.rootUrl + '/api/ApplicationQuery/GetApplicantsWithoutRes/' + NotificationId + "/" + ProjectId, this.httpOptions);
  }
  getNotificationDetailsForScrutiny(S_ProjectID) {
    return this.http.get(this.rootUrl + '/api/Scrutiny/getNotificationDetailsForScrutiny/' + S_ProjectID, this.httpOptions);
  }


  getAllProjectDetailsForScrutiny() {
    return this.http.get(this.rootUrl + '/api/Scrutiny/getAllProjectDetailsForScrutiny', this.httpOptions);
  }

  GetAllTypeofNotifications() {
    return this.http.get(this.rootUrl + '/api/PaymentConfiguration/GetAllTypeofNotifications', this.httpOptions);
  }

  GetAllTPropertyType() {

    return this.http.get(this.rootUrl + '/api/PaymentConfiguration/GetAllTPropertyType', this.httpOptions);
  }

  getProjectDetailsForRefund(DSWOID_NO_Id) {
    return this.http.get(this.rootUrl + '/api/NotAllottedRefund/getProjectDetailsForRefund/' + DSWOID_NO_Id, this.httpOptions);
  }
  GetAllCancellation() {
    return this.http.get(this.rootUrl + '/api/Cancellation/GetAll', this.httpOptions);
  }
  GetAllLayout(Sch_Id) {
    return this.http.get(this.rootUrl + '/api/Cancellation/GetAllCancellationprojectlist/' + Sch_Id, this.httpOptions);
  }
  getNotifications() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetNotifications', this.httpOptions);
  }
  getReservation(S_ProjectID:any){
    return this.http.get(this.rootUrl + '/api/Scrutiny/GetAllReservationsforProject/' + S_ProjectID, this.httpOptions);
    }
  getRefNotifications() {
    return this.http.get(this.rootUrl + '/api/NotAllottedRefund/getRefNotifications', this.httpOptions);
  }
  getPropertyTypes() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetPropertyTypes', this.httpOptions);
  }
  GetAllPropertyTypes(S_ProjectID) {
    return this.http.get(this.rootUrl + '/api/Scrutiny/GetAllPropertyTypes/' + S_ProjectID, this.httpOptions);
  }
  GetAllReservationsforProject(S_ProjectID) {
    return this.http.get(this.rootUrl + '/api/Scrutiny/GetAllReservationsforProject/' + S_ProjectID, this.httpOptions);
  }
  updateApplicationScrutiny(ScrutinyObj) {
    return this.http.put(this.rootUrl + '/api/Scrutiny/Update', ScrutinyObj, this.httpOptions);
  }
  saveObjection(APP_Id: any, data: any) {
    data['APP_Id'] = APP_Id;
    return this.http.post(this.rootUrl + '/api/UpdateObjection', data, this.httpOptions);
  }
  getApplicationDetailsForUpdateObjection(APP_No: any) {

    return this.http.get(this.rootUrl + '/api/UpdateObjection/GetApplicationFormDetails/' + APP_No, this.httpOptions);
  }
  getAllLottery(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  getLotteryDetails(LO_Id) {

    return this.http.get(this.rootUrl + '/api/MannualLottery/GetLotteryDetails/' + LO_Id, this.httpOptions);
  }
  saveLottery(data: any) {

    return this.http.post(this.rootUrl + '/api/MannualLottery', data, this.httpOptions);
  }
  checkApplicationNo(DSWOID_NO_Id: number, PD_Id: number, CA_Id: number, RES_Id: number, PT_PropertyType, APP_No: any) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/CheckApplicationNoForLottery/' + DSWOID_NO_Id + "/" + PD_Id + "/" + CA_Id + "/" + RES_Id + "/" + PT_PropertyType + "/" + APP_No, this.httpOptions);
  }

  getPropertyNo(projectId: number, categoryId: number, proprtyTypeId: number, Tot_Prop) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GetPropertyNo/' + projectId + "/" + categoryId + "/" + proprtyTypeId + "/" + Tot_Prop, this.httpOptions);
  }
  getDSWOIDNotificationDetails(DSWOId_NO_Id) {

    return this.http.get(this.rootUrl + '/api/KHBNotification/GetDSWOIDNotificationDetails/' + DSWOId_NO_Id, this.httpOptions);
  }
  getDSWOIDNotification() {
    return this.http.get(this.rootUrl + '/api/KHBNotification/GetDSWOIDNotification', this.httpOptions);
  }
  generateToken() {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GetAllEligibleApplications', this.httpOptions);
  }
  getTokenNoForLottery(DSWOID_NO_Id: number, PD_Id: number, CA_Id: number, RES_Id: number, PT_Id) {
    return this.http.put(this.rootUrl + '/api/MannualLottery/GetTokenNoForLottery/' + DSWOID_NO_Id + "/" + PD_Id + "/" + CA_Id + "/" + RES_Id + "/" + PT_Id, null, this.httpOptions);
  }
  GetTokenNoCount(DSWOID_NO_Id: number, PD_Id: number, CA_Id: number, RES_Id: number, PT_Id) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GetTokenNoCount/' + DSWOID_NO_Id + "/" + PD_Id + "/" + CA_Id + "/" + RES_Id + "/" + PT_Id, this.httpOptions);
  }
  GettokenstoAllot(DSWOID_NO_Id: number, PD_Id: number, CA_Id: number, RES_Id: number, PT_Id) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GettokenstoAllot/' + DSWOID_NO_Id + "/" + PD_Id + "/" + CA_Id + "/" + RES_Id + "/" + PT_Id, this.httpOptions);
  }
  GetApplicantToken(DSWOID_NO_Id: number, PD_Id: number, CA_Id: number, RES_Id: number, PT_Id) {
    return this.http.get(this.rootUrl + '/api/MannualLottery/GetApplicantToken/' + DSWOID_NO_Id + "/" + PD_Id + "/" + CA_Id + "/" + RES_Id + "/" + PT_Id, this.httpOptions);
  }
  getProvisionalList(DSWOID_NO_Id: number, PD_Id: number, RES_Id: number) {
    return this.http.get(this.rootUrl + '/api/Scrutiny/GetProvisionalList/' + DSWOID_NO_Id + "/" + PD_Id + "/" + RES_Id, this.httpOptions);
  }


  getProvisionalIneligibleList(DSWOID_NO_Id: number, PD_Id: number, RES_Id: number) {
    return this.http.get(this.rootUrl + '/api/Scrutiny/GetProvisionalIneligibleList/' + DSWOID_NO_Id + "/" + PD_Id + "/" + RES_Id, this.httpOptions);
  }
  UpdateNotification(DSWOId_NO_Id: any, data: any) {
    data['DSWOId_NO_Id'] = DSWOId_NO_Id;
    return this.http.put(this.rootUrl + '/api/KHBNotification/Update', data, this.httpOptions);
  }
  getApplicants(DSWOID_NO_Id: number, PD_Id: number) {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetApplicants/' + DSWOID_NO_Id + "/" + PD_Id, this.httpOptions);
  }

  GetApplicantsStatus(DSWOID_NO_Id: number, PD_Id: number, RES_Id:any, Status: any) {
    return this.http.get(this.rootUrl + '/api/ApplicationQuery/GetApplicants/' + DSWOID_NO_Id + "/" + PD_Id + "/" + RES_Id + "/" + Status + "/", this.httpOptions);
    }
  getAllReservationsProvisionalList(DSWOID_NO_Id: number, PD_Id: number) {
    return this.http.get(this.rootUrl + '/api/Scrutiny/GetAllReservationsProvisionalList/' + DSWOID_NO_Id + "/" + PD_Id, this.httpOptions);
  }

  getAllReservationsFinalList(DSWOID_NO_Id: number, PD_Id: number) {
    return this.http.get(this.rootUrl + '/api/Scrutiny/GetAllReservationsFinalList/' + DSWOID_NO_Id + "/" + PD_Id, this.httpOptions);
  }

  getAllPaymentConfig(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/PaymentConfiguration/GetAll/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  savePaymentConfig(data: any) {

    return this.http.post(this.rootUrl + '/api/PaymentConfiguration/SavePaymentConfigPreAllotment', data, this.httpOptions);
  }

  getPaymentConfigDetails(PC_Id) {

    return this.http.get(this.rootUrl + '/api/PaymentConfiguration/GetPaymentConfigDetails/' + PC_Id, this.httpOptions);
  }
  getAllotmentList(DSWOID_NO_Id: number, PD_Id: number, CaTName: number) {
    return this.http.get(this.rootUrl + '/api/Allotment/GetAllotmentList/' + DSWOID_NO_Id + "/" + PD_Id + "/" + CaTName, this.httpOptions);
  }
  GetNoticeList(DSWOID_NO_Id: number, PD_Id: number) {
    return this.http.get(this.rootUrl + '/api/Allotment/GetNoticeList/' + DSWOID_NO_Id + "/" + PD_Id + "/", this.httpOptions);
  }

  AllProjectDetails(itemsPerPage: number, pageNo: number, id) {
    return this.http.get(this.rootUrl + '/Api/ProjectDetails/AllProjectDetails/' + itemsPerPage + "/" + pageNo + "/" + id, this.httpOptions);
  }

  createAdvocate(data: any) {

    return this.http.post(this.rootUrl + '/api/Advocate/CreateAdvocate', data, this.httpOptions);
  }

  GetVillagesBasedOnTaluk(TalukId: number) {
    return this.http.get(this.rootUrl + '/Api/DistrictandTaluk/GetAllVillagebasedTaluk/' + TalukId, this.httpOptions);
  }

  GetAllAdvocates() {
    return this.http.get(this.rootUrl + '/api/Advocate/GetAllAdvocate', this.httpOptions);
  }

  GetAdvocateById(Adv_Id: Number) {
    return this.http.get(this.rootUrl + '/api/Advocate/GetAdvocateId/' + Adv_Id, this.httpOptions);
  }

  UpdateAdvocateById(Adv_Id: Number, udm) {
    return this.http.put(this.rootUrl + '/api/Advocate/UpdateAdvocate/' + Adv_Id, udm, this.httpOptions);
  }

  DeleteAdvocate(Adv_Id: Number) {
    return this.http.delete(this.rootUrl + '/api/Advocate/DeleteAdvocate/' + Adv_Id, this.httpOptions);
  }

  GetAllAdvocatesBysearch(udm: any) {
    return this.http.post(this.rootUrl + '/api/Advocate/GetAdvocateBysearch', udm, this.httpOptions);
  }

  GetAllAdvocatesPagination(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Advocate/GetAllAdvocate/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetAllCourts() {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetCourts', this.httpOptions);
  }

  GetAllCourtTypes() {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetCourtType', this.httpOptions);
  }

  GetAllPreviousCase() {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetPreviousCase', this.httpOptions);
  }

  GetAllDepartments() {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetDepartments', this.httpOptions);
  }

  GetAllCaseTypes() {

    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetCaseTypes', this.httpOptions);
  }
  GetAllONCaseTypes() {
    return this.http.get(this.rootUrl + '/api/ObjectionNotification/GetCaseTypes', this.httpOptions);
  }

  GetAllProjectCodes() {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetProjectCode', this.httpOptions);
  }

  GetAllGetOfficeslist() {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetOffices', this.httpOptions);
  }

  GetLitigationOfficerslist() {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetOfficersName', this.httpOptions);
  }


  CreateCaseRegistration(udm: any) {
    return this.http.post(this.rootUrl + '/api/CaseRegistration/CreateCaseReg', udm, this.httpOptions);
  }

  GetAllCaseRegistrationPagination(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetAllCaseRegistration/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  LogoutDetails() {
    return this.http.put(this.rootUrl + '/Api/Users/LogoutDetails', null, this.httpOptions);
  }
  GetByIdCseRegistration(CaseId) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetCaseRegById/' + CaseId, this.httpOptions);
  }

  DeleteCaseRegistration(CaseId) {
    return this.http.delete(this.rootUrl + '/api/CaseRegistration/DeleteCaseReg/' + CaseId, this.httpOptions);
  }

  GetAllCaseRegwithoutPag() {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetAllCaseRegistration', this.httpOptions);
  }

  UpdateCaseReg(CaseId: number, udm) {
    return this.http.post(this.rootUrl + '/api/CaseRegistration/UpdateCaseReg/' + CaseId, udm, this.httpOptions);
  }

  GetCaseRegistrationBysearch(udm) {
    return this.http.post(this.rootUrl + '/api/CaseRegistration/GetAllCaseRegistrationBySearch', udm, this.httpOptions);
  }
  getAllPropertiesPlaningList(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/PropertyPlanning/GetAllPropertiesPlaningList/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  SearchPropertiesPlaningList(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/PropertyPlanning/SearchPropertiesPlaningList/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetApplicantData(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/KHBNotification/GetApplicantData/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetApplicantDraftDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/WorkAroundSln/GetApplicantDraftDetails/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetApplicantDataforExcng(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/PropertyRegister/GetApplicantDataforExcng/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  SearchApplicantData(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/KHBNotification/SearchApplicantData/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  SearchApplicantDraftDetails(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/WorkAroundSln/SearchApplicantDraftDetails/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  SearchApplicantDataforex(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/PropertyRegister/SearchApplicantDataforex/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  SearchPropertyforEx(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/PropertyRegister/SearchPropertyforEx/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  SearchNotificationList(searchCriteria1: any, searchText1: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/KHBNotification/SearchNotificationList/' + searchCriteria1 + "/" + searchText1 + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetApplicantTransactionDetails(APP_No:any) {
    return this.http.get(this.rootUrl + '/Api/TransactionDetails/GetApplicantTransactionDetails/' + APP_No , this.httpOptions);
  }


  GetCaseDetails(caseId) {
    return this.http.get(this.rootUrl + '/api/CaseProceeding/GetCaseDetailsForProceedings/' + caseId, this.httpOptions);

  }
  GetCaseProjectDetails(caseId) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetCaseRegById/' + caseId, this.httpOptions);

  }

  PostCaseProceedingDetails(udm) {
    return this.http.post(this.rootUrl + '/api/CaseProceeding/CreateCaseProceedings', udm, this.httpOptions);

  }

  GetAllCaseProceedingDetails(CaseId) {
    return this.http.get(this.rootUrl + '/api/CaseProceeding/GetAllCaseProceedings/' + CaseId, this.httpOptions);

  }

  GetCaseProcById(CaseProId) {
    return this.http.get(this.rootUrl + '/api/CaseProceeding/GetByIdCaseProceedings/' + CaseProId, this.httpOptions);

  }

  DeleteCaseProcById(CaseProId) {
    return this.http.delete(this.rootUrl + '/api/CaseProceeding/DeleteCaseProceeding/' + CaseProId, this.httpOptions);

  }

  UpdateCaseProc(CaseProId: number, udm: any) {
    return this.http.put(this.rootUrl + '/api/CaseProceeding/UpdateCaseProceeding/' + CaseProId, udm, this.httpOptions);

  }

  GetCaseProceedingOnSearch(CaseId, NextHearingDate, value) {
    return this.http.get(this.rootUrl + '/api/CaseProceeding/GetAllCaseProceedingsOnserach/' + CaseId + '/' + NextHearingDate + '/' + value, this.httpOptions);

  }

  GetAllAdvocatesCases(itemsPerPage, pageno) {
    return this.http.get(this.rootUrl + '/api/AdvocatePayment/GetAllAdvocateCasesforbills/' + itemsPerPage + '/' + pageno, this.httpOptions);
  }

  PostAdvocatePaymentDetails(udm) {
    return this.http.post(this.rootUrl + '/api/AdvocatePayment/CreateAdvocatePayments', udm, this.httpOptions);

  }

  GetAllAdvocatesCasesDetailsOnsearch(searchBy: string, searchvalue: string) {
    return this.http.get(this.rootUrl + '/api/AdvocatePayment/GetAllAdvocateCasesforbillsOnSearch/' + searchBy + '/' + searchvalue, this.httpOptions);
  }


  GetAllAdvocatesCasesBillDetails(AdvId, CaseId) {
    return this.http.get(this.rootUrl + '/api/AdvocatePayment/GetAdvocateCasesbilllist/' + AdvId + '/' + CaseId, this.httpOptions);
  }


  GetByIdAdvocatePayment(AP_id) {
    return this.http.get(this.rootUrl + '/api/AdvocatePayment/GetAdvocateCasesbilllist/' + AP_id, this.httpOptions);
  }

  UpdateAdvocateBill(AP_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/AdvocatePayment/UpdateAdvocateBill/' + AP_id, udm, this.httpOptions);
  }
  EditApplicantDetails(Applicant) {
    return this.http.put(this.rootUrl + '/api/ApplicationQuery/EditApplicantDetails', Applicant, this.httpOptions);
  }

  DeleteAdvocateBill(AP_Id) {
    return this.http.delete(this.rootUrl + '/api/AdvocatePayment/DeleteAdvocateBill/' + AP_Id, this.httpOptions);
  }

  GetAdvocatesCasesBillDetailsOnSearch(AdvId, CaseId, searchBy, searchvalue) {
    return this.http.get(this.rootUrl + '/api/AdvocatePayment/GetAdvocateCasesbilllistOnSearch/' + AdvId + '/' + CaseId + '/' + searchBy + '/' + searchvalue, this.httpOptions);
  }

  ChangeAdvocate(CaseId, OldAdv_Id, NewAdv_Id) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/ChangeAdvocate/' + CaseId + '/' + OldAdv_Id + '/' + NewAdv_Id, this.httpOptions);
  }


  GetCaseId(CaseNo) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetCaseId/' + CaseNo, this.httpOptions);
  }


  GetAllPreviousCasesforQuery(CaseNo) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetPreviousCases/' + CaseNo, this.httpOptions);
  }

  GetAllCaselistofLegalqueryOnSearch(SearchBy, SearchText) {

    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetLegalQueries/' + SearchBy + '?SearchValue=' + SearchText, this.httpOptions);
  }
  GetApplicantDetails(Appno: any, RegNo: any, PhoneNo: any, Namee: any) {
    return this.http.get(this.rootUrl + '/api/ApplicationQuery/ApplicantDetails/' + Appno + "/" + RegNo + "/" + PhoneNo + "/" + Namee, this.httpOptions);
  }
  GetApplicantDetailsforCR(SearchValue: any, SearchName: any) {
    return this.http.get(this.rootUrl + '/api/ApplicationQuery/ApplicantDetailsforCR/' + SearchValue + "/" + SearchName + "/", this.httpOptions);
  }
  Getbidderdetails(Biddercriteria: any, Biddersearch: any) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/Getbidderdetails/' + Biddercriteria + "/" + Biddersearch + "/", this.httpOptions);
  }
  Getbidderdetailsbyid(B_id: any) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetbidderQueryDetails/' + B_id, this.httpOptions);
  }
  GetAllotedPropertyDetailById(PR_Id: any) {
    return this.http.get(this.rootUrl + '/api/AuctionNotification/GetAllotedPropertyDetailById/' + PR_Id, this.httpOptions);
  }

  GetApplicationScrutinyQueryDetails(APP_Id) {

    return this.http.get(this.rootUrl + '/api/ApplicationQuery/GetApplicationScrutinyQueryDetails/' + APP_Id, this.httpOptions);
  }

  GetApplicationScrutinyQueryDetailsForUpdate(APP_No) {

    return this.http.get(this.rootUrl + '/api/ApplicationQuery/GetApplicationScrutinyQueryDetailsForUpdate/' + APP_No, this.httpOptions);
  }
  getAppViewProjectQueryDetailsForUpdate(APP_No) {
    return this.http.get(this.rootUrl + '/api/ApplicationQuery/getAppViewProjectQueryDetailsForUpdate/' + APP_No, this.httpOptions);
  }
  getAppViewProjectQueryDetails(APP_Id) {
    return this.http.get(this.rootUrl + '/api/ApplicationQuery/getAppViewProjectQueryDetails/' + APP_Id, this.httpOptions);
  }
  GetApplicantDetailsforCRbyAppId(APP_Id) {
    return this.http.get(this.rootUrl + '/api/ApplicationQuery/GetApplicantDetailsforCRbyAppId/' + APP_Id, this.httpOptions);
  }
  GetApplicantTransactionDetailsQuery(APP_Id) {
    return this.http.get(this.rootUrl + '/Api/TransactionDetails/GetApplicantTransactionDetailsQuery/' + APP_Id, this.httpOptions);
  }

  GetPropertyDetailsQuery(PD_Id: any, PropertyNo: any, Catgry: any, itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/ProjectDetailsQuery/GetPropertyDetailsQuery/' + PD_Id + "/" + PropertyNo + "/" + Catgry + "/" + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetPropertyDetailsfordirectAllotment(PD_Id: any, PropertyNo: any, Catgry: any, itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/ProjectDetailsQuery/GetPropertyDetailsfordirectAllotment/' + PD_Id + "/" + PropertyNo + "/" + Catgry + "/" + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }

  GetPropertyDetailsById(PR_Id: any) {
    return this.http.get(this.rootUrl + '/api/ProjectDetailsQuery/GetPropertyDetailsById/' + PR_Id, this.httpOptions);
  }

  GetUnAllotedApplicantDetails(Appno: any, RegNo: any, PhoneNo: any, Namee: any) {
    return this.http.get(this.rootUrl + '/api/DirectAllocation/GetUnAllotedApplicantDetails/' + Appno + "/" + RegNo + "/" + PhoneNo + "/" + Namee, this.httpOptions);
  }

  GetProjectDetail_MF(App_No: any, Property_No: any) {
    return this.http.get(this.rootUrl + '/api/MaintenanceFee/GetProjectDetail_MF/' + App_No + "/" + Property_No, this.httpOptions);
  }

  GetUnAllotedApplicationScrutinyQueryDetails(APP_Id) {
    return this.http.get(this.rootUrl + '/api/DirectAllocation/GetUnAllotedApplicationScrutinyQueryDetails/' + APP_Id, this.httpOptions);
  }

  getAppViewUnAllotedProjectQueryDetails(APP_Id) {
    return this.http.get(this.rootUrl + '/api/DirectAllocation/getAppViewUnAllotedProjectQueryDetails/' + APP_Id, this.httpOptions);
  }

  GetUnAllotedApplicantTransactionDetailsQuery(APP_Id) {
    return this.http.get(this.rootUrl + '/Api/TransactionDetails/GetUnAllotedApplicantTransactionDetailsQuery/' + APP_Id, this.httpOptions);
  }

  getAllProjectsForApplicant(APP_Id) {
    return this.http.get(this.rootUrl + '/api/DirectAllocation/GetAllProjectsForApplicant/' + APP_Id, this.httpOptions);
  }

  getCategoryForApplicant(APP_Id) {
    return this.http.get(this.rootUrl + '/api/DirectAllocation/GetAllCategoryForApplicant/' + APP_Id, this.httpOptions);
  }

  UpdateDirectAllotmentDocuments(APP_Id: any, data: any) {
    data['APP_Id'] = APP_Id;
    return this.http.put(this.rootUrl + '/api/DirectAllocation/UpdateDirectAllotmentDocuments', data, this.httpOptions);
  }

  getKhbNotificationLetter(APP_Id, PD_Id) {

    return this.http.get(this.rootUrl + '/api/DirectAllocation/GetAllotmentLetterDetails/' + APP_Id + "/" + PD_Id, this.httpOptions);
  }

  PostFileMovement(udm) {
    return this.http.post(this.rootUrl + '/api/FileMovement/CreateFileMovement', udm, this.httpOptions);
  }

  GetAllFilemovemenentPagination(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/FileMovement/GetAllFileMovement/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetByIdFileMovement(FM_Id) {
    return this.http.get(this.rootUrl + '/api/FileMovement/GetAllFileMovementId/' + FM_Id, this.httpOptions);
  }

  DeleteFileMovement(FM_Id) {
    return this.http.delete(this.rootUrl + '/api/FileMovement/DeleteFileMovement/' + FM_Id, this.httpOptions);
  }


  UpdateFileMovement(FM_Id: number, udm) {
    return this.http.put(this.rootUrl + '/api/FileMovement/UpdateFileMovement/' + FM_Id, udm, this.httpOptions);
  }


  GetFileMovementBysearch(udm) {
    return this.http.post(this.rootUrl + '/api/FileMovement/GetAllFileMovementBySearch', udm, this.httpOptions);
  }

  GetAllChangesOfAdvocates(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetAllChangeAdvocate/' + itemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetAllChangesOfAdvocatesOnSearch(SearchBy, SearchText) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetAllChangeAdvocateOnSearch/' + SearchBy + '/' + SearchText, this.httpOptions);
  }

  GetFileMovingStatus(FileName, Status, Dep_Id) {
    return this.http.get(this.rootUrl + '/api/FileMovement/GetFileSatusOnSave/' + FileName + '/' + Status + '/' + Dep_Id, this.httpOptions);
  }

  PostProposalReport(udm) {
    return this.http.post(this.rootUrl + '/api/ProposalReport/CreateProposal', udm, this.httpOptions);
  }

  GetAllProposalReport(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/ProposalReport/GetAllProposalReport/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }

  GetByIdProposalReport(PR_Id) {
    return this.http.get(this.rootUrl + '/api/ProposalReport/GetProposalReportById/' + PR_Id, this.httpOptions);
  }

  DeleteProposalReport(PRId) {
    return this.http.delete(this.rootUrl + '/api/ProposalReport/DeleteProposalReport/' + PRId, this.httpOptions);
  }

  UpdateProposalReport(PRId: number, udm) {
    return this.http.put(this.rootUrl + '/api/ProposalReport/UpdateProposal/' + PRId, udm, this.httpOptions);
  }

  GetProposalReportBysearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/ProposalReport/GetAllProposalReportBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  getAllProposalReportdropdown() {
    return this.http.get(this.rootUrl + '/api/ProposalReport/GetAllProposalReportForDropdown', this.httpOptions);
  }

  getAllProposalReportdropdownLP_New() {
    return this.http.get(this.rootUrl + '/api/ProposalReport/GetAllProposalReportForDropdownLP_New', this.httpOptions);
  }

  getAllProposalReportdropdownJV_New() {
    return this.http.get(this.rootUrl + '/api/ProposalReport/GetAllProposalReportForDropdownJV_New', this.httpOptions);
  }


  GetAllProposalReportForLADropdown() {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAllProposalReportForLADropdown', this.httpOptions);
  }

  GetAllProposalReportForLADropdown_New() {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAllProposalReportForLADropdown_New', this.httpOptions);
  }

  GetAllProposalReportForDropdown() {
    return this.http.get(this.rootUrl + '/api/ProjectDetails/GetAllProposalReportForDropdown', this.httpOptions);
  }

  PostViabilityReport(udm) {
    return this.http.post(this.rootUrl + '/api/ViabilityReport/CreateViability', udm, this.httpOptions);
  }

  GetAllViableReport(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/ViabilityReport/GetAllViabilityReport/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }

  GetByIdViabilityReport(VR_Id) {
    return this.http.get(this.rootUrl + '/api/ViabilityReport/GetViabilityReportById/' + VR_Id, this.httpOptions);
  }

  DeleteViableReport(PRId) {
    return this.http.delete(this.rootUrl + '/api/ViabilityReport/DeleteProposalReport/' + PRId, this.httpOptions);
  }

  UpdateViabilityReport(VRId: number, udm) {
    return this.http.put(this.rootUrl + '/api/ViabilityReport/UpdateViability/' + VRId, udm, this.httpOptions);
  }

  GetViabilityReportBysearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/ViabilityReport/GetAllProposalReportBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }


  PostInspectionReport(udm) {
    return this.http.post(this.rootUrl + '/api/InspectionReport/CreateInspection', udm, this.httpOptions);
  }

  GetAllInspectionReport(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/InspectionReport/GetAllInspectionReport/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }

  GetByIdInspectionReport(IR_Id) {
    return this.http.get(this.rootUrl + '/api/InspectionReport/GetInspectionReportById/' + IR_Id, this.httpOptions);
  }

  UpdateInspectionReport(IRId: number, udm) {
    return this.http.put(this.rootUrl + '/api/InspectionReport/UpdateInspection/' + IRId, udm, this.httpOptions);
  }

  DeleteInspectionReport(PRId) {
    return this.http.delete(this.rootUrl + '/api/InspectionReport/DeleteInspectionReport/' + PRId, this.httpOptions);
  }

  GetInspectionReportBysearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/InspectionReport/GetAllInspectionReportBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  GetAlllandacuistionandpurchaseBysearch(itemsPerPage, pageNo, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAlllandacuistionandpurchaseBysearch/' + searchBy +
      '/' + searchValue + '/' + itemsPerPage + '/' + pageNo, this.httpOptions);
  }

  getAllProposalReportdropdownOnfilter(Param) {
    return this.http.get(this.rootUrl + '/api/ProposalReport/GetAllProposalReportForDropdownOnfilter/' + Param, this.httpOptions);
  }

  GetApplicationGodownlist(SearchBy, SearchValue) {
    return this.http.get(this.rootUrl + '/api/Godown/GetAllApplicationlist/' + SearchBy + '/' + SearchValue, this.httpOptions);
  }

  GetMaxGodownDetails() {
    return this.http.get(this.rootUrl + '/api/Godown/MaxBundleDetail', this.httpOptions);
  }

  PostBundle(udm) {
    return this.http.post(this.rootUrl + '/api/Godown/CreateBundle', udm, this.httpOptions);

  }

  GetApplicationGodownlistForReturnRequest(SearchBy, SearchValue) {
    return this.http.get(this.rootUrl + '/api/RefundRequest/GetAllApplicationlistforRefundRequest/' + SearchBy + '/' + SearchValue, this.httpOptions);
  }

  GetApplicationGodownlistforquery(SearchBy, SearchValue) {
    return this.http.get(this.rootUrl + '/api/GodownQuery/GetAllApplicationlistforQuery/' + SearchBy + '/' + SearchValue, this.httpOptions);
  }

  GetCaseWorkerList() {
    return this.http.get(this.rootUrl + '/api/RefundRequest/GetAllCaseWorkers', this.httpOptions);
  }

  PostRefundRequest(udm) {
    return this.http.post(this.rootUrl + '/api/RefundRequest/CreateRefundRequest', udm, this.httpOptions);

  }

  GetAllPreviousCasewithActiveandInactive() {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetAllPreviousCasewithActiveandInactive', this.httpOptions);
  }

  GetPreviousCaseOnsearch(term) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetAllCaseRegistration/' + term, this.httpOptions);
  }


  GetAllBundleList(regNo) {
    return this.http.get(this.rootUrl + '/api/GodownQuery/GetAllBundlelistforQuery/' + regNo, this.httpOptions);
  }

  GetHearingDate(CaseId) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetHearingDate/' + CaseId, this.httpOptions);
  }

  GetCaseQuery(CaseNo) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetCaseQuery?CaseNo=' + CaseNo, this.httpOptions);
  }


  GetAdvocatesOfCaseQuery(CaseNo) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetAdvocatesOfCaseQuery/' + CaseNo, this.httpOptions);
  }

  GetLastCaseProceedingforCaseQuery(CaseNo) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetLastProceedings/' + CaseNo, this.httpOptions);
  }

  GetRefundRequest(RegNo) {
    return this.http.get(this.rootUrl + '/api/RefundRequest/GetRefundRequest/' + RegNo, this.httpOptions);
  }

  UpdateRefundRequest(udm) {
    return this.http.post(this.rootUrl + '/api/RefundRequest/UpdateRefundRequest', udm, this.httpOptions);
  }

  CancellationRefundRequest(RegNo) {
    return this.http.get(this.rootUrl + '/api/RefundRequest/CancellationRefundRequest/' + RegNo, this.httpOptions);
  }


  GetApplicationGodownlistForReturnRequestequalList(SearchBy, SearchValue) {
    return this.http.get(this.rootUrl + '/api/Godown/GetAllApplicationlistEquallist/' + SearchBy + '/' + SearchValue, this.httpOptions);
  }

  GetApplicationGodownlistForReturnRequestonEqual(SearchBy, SearchValue) {
    return this.http.get(this.rootUrl + '/api/RefundRequest/GetAllApplicationlistforRefundRequestonEqual/' + SearchBy + '/' + SearchValue, this.httpOptions);
  }

  GetApplicationGodownlistforqueryOnEqual(SearchBy, SearchValue) {
    return this.http.get(this.rootUrl + '/api/GodownQuery/GetAllApplicationlistforQueryOnEqual/' + SearchBy + '/' + SearchValue, this.httpOptions);
  }

  GetAllBillList(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/AdvocatePayment/GetAllAdvocatesBillsforfinance/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetAllBundleReports(BundleNo) {
    return this.http.get(this.rootUrl + '/api/GoDownReport/GetAllBundleReport/' + BundleNo, this.httpOptions);
  }

  GetAllSubmittedReports(FromDate, ToDate) {
    return this.http.get(this.rootUrl + '/api/GoDownReport/GetSubmittedApplicationReport/' + FromDate + '/' + ToDate, this.httpOptions);
  }

  GetAllRequestedReports(FromDate, ToDate) {
    return this.http.get(this.rootUrl + '/api/GoDownReport/GetRequestedApplicationReport/' + FromDate + '/' + ToDate, this.httpOptions);
  }

  GetAllProjectListsBasedOnDistrictId(DistrictId) {
    return this.http.get(this.rootUrl + '/api/AllocationReport/GetAllProjectList/' + DistrictId, this.httpOptions);
  }

  GetAllPropertyListDetails(DistrictId, PD_Id, fromDate, Todate) {
    return this.http.get(this.rootUrl + '/api/AllocationReport/GetAllAllocatedPropertyList/' + DistrictId + '/' + PD_Id + '/' + fromDate + '/' + Todate, this.httpOptions);
  }

  GetAllCancellationReport(DistrictId, PD_Id, fromDate, Todate) {
    return this.http.get(this.rootUrl + '/api/AllocationReport/GetCancellationReport/' + DistrictId + '/' + PD_Id + '/' + fromDate + '/' + Todate, this.httpOptions);
  }

  GetProjectwiseAllocatedList(DistrictId, PD_Id, CategoryId) {
    return this.http.get(this.rootUrl + '/api/AllocationReport/GetAllAllocatedPropertyList/' + DistrictId + '/' + PD_Id + '/' + CategoryId, this.httpOptions);
  }

  GetProjectwiseVacantList(DistrictId, PD_Id, CategoryId) {
    return this.http.get(this.rootUrl + '/api/AllocationReport/GetAllVacantPropertyList/' + DistrictId + '/' + PD_Id + '/' + CategoryId, this.httpOptions);
  }


  GetAllCourtComplex_Establish(check, DistrictId) {
    return this.http.get(this.rootUrl + '/api/CaseRegistration/GetAllCourtComplexandEstablishement/' + check + '/' + DistrictId, this.httpOptions);
  }


  GetMaxBundle() {
    return this.http.get(this.rootUrl + '/api/Godown/MaximumBundleNo', this.httpOptions);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  PostRateFixation(udm) {
    return this.http.post(this.rootUrl + '/api/RateFixation/CreateRateFixation', udm, this.httpOptions);
  }

  GetAllrateFixation(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/RateFixation/GetAllRateFixation/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }

  GetByIdRateFixation(RF_Id) {
    return this.http.get(this.rootUrl + '/api/RateFixation/GetRateFixationById/' + RF_Id, this.httpOptions);
  }

  UpdateRateFixation(RF_Id: number, udm) {
    return this.http.put(this.rootUrl + '/api/RateFixation/UpdateRateFixation/' + RF_Id, udm, this.httpOptions);
  }

  DeleteRateFixation(PRId) {
    return this.http.delete(this.rootUrl + '/api/RateFixation/DeleteRateFixation/' + PRId, this.httpOptions);
  }

  GetRateFixationOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/RateFixation/GetAllRateFixationBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  PostNotificationObjection(udm) {
    return this.http.post(this.rootUrl + '/api/ObjectionNotification/CreateObjectionNotification', udm, this.httpOptions);
  }

  GetAllObjectionNotification(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/ObjectionNotification/GetAllObjectNotifications/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }

  GetByIdObjectionNotification(ON_Id) {
    return this.http.get(this.rootUrl + '/api/ObjectionNotification/GetObjectionNotificationById/' + ON_Id, this.httpOptions);
  }

  UpdateObjectionNotification(ON_Id: number, udm) {
    return this.http.put(this.rootUrl + '/api/ObjectionNotification/UpdateObjectionNotification/' + ON_Id, udm, this.httpOptions);
  }

  DeleteObjectionNotification(ON_Id) {
    return this.http.delete(this.rootUrl + '/api/ObjectionNotification/DeleteObjectionNotification/' + ON_Id, this.httpOptions);
  }

  GetObjectionNotificationOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/ObjectionNotification/GetAllObjectionNotificationOnSearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  GetONStatus(Status, itemsPerPage, pageNo) {
    return this.http.get(this.rootUrl + '/api/ObjectionNotification/GetONStatus/' + Status +
      '/' + itemsPerPage + '/' + pageNo + '/', this.httpOptions);
  }

  getAllProjectsBasedOnRole() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllProjectsBasedOnRole', this.httpOptions);
  }

  LoginDetails() {
    return this.http.get(this.rootUrl + '/Api/ProjectDetails/LoginDetails', this.httpOptions);
  }

  getAvailBlockedInterDQCornerSites() {
    return this.http.get(this.rootUrl + '/api/Reports/GetAvailBlockedInterDQCornerReport', this.httpOptions);
  }

  getVacantCommProperty() {
    return this.http.get(this.rootUrl + '/api/Reports/GetVacantCommProperty', this.httpOptions);
  }

  getAvailInterSiteHouseFlats() {
    return this.http.get(this.rootUrl + '/api/Reports/GetInterAvailSiteHouseFlats', this.httpOptions);
  }

  getInterBlockedSitesHouseFlats() {
    return this.http.get(this.rootUrl + '/api/Reports/GetInterBlockedSiteHouseFlats', this.httpOptions);
  }

  PostLandOwnerDetails(udm) {
    return this.http.post(this.rootUrl + '/api/LandOwnerDetails/CreateLandOwnerDetails', udm, this.httpOptions);
  }

  GetAllLandOwnerDetails(itemsPerPage: number, PageNo: number, PD_Id: any, Pr_id: any) {
    return this.http.get(this.rootUrl + '/api/LandOwnerDetails/GetAllLandOwnerDetails/' + itemsPerPage + '/' + PageNo + '/' + PD_Id + '/' + Pr_id, this.httpOptions);
  }

  GetAllProposalproject(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandOwnerDetails/GetAllProposalproject/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }

  GetByIdLandOwnerDetails(LOD_Id) {
    return this.http.get(this.rootUrl + '/api/LandOwnerDetails/GetLandOwnerDetailsById/' + LOD_Id, this.httpOptions);
  }

  GetLandType() {
    return this.http.get(this.rootUrl + '/api/LandOwnerDetails/GetLandType', this.httpOptions);
  }
  GetSchedule() {
    return this.http.get(this.rootUrl + '/api/LandOwnerDetails/GetSchedule', this.httpOptions);
  }
  GetSharingPattern() {
    return this.http.get(this.rootUrl + '/api/LandOwnerDetails/GetSharingPattern', this.httpOptions);
  }
  GetModeofProcurement() {
    return this.http.get(this.rootUrl + '/api/LandOwnerDetails/GetModeofProcurement', this.httpOptions);
  }

  UpdateLandOwnerDetails(LOD_Id: number, udm) {
    return this.http.put(this.rootUrl + '/api/LandOwnerDetails/UpdateLandOwnerDetails/' + LOD_Id, udm, this.httpOptions);
  }

  DeleteLandOwnerDetails(LOD_Id) {
    return this.http.delete(this.rootUrl + '/api/LandOwnerDetails/DeleteLandOwnerDetails/' + LOD_Id, this.httpOptions);
  }

  GetLandOwnerDetailsOnSearch(ItemsPerPage, pageno, searchBy, searchValue, PD_Id: any, Pr_id: any) {
    return this.http.get(this.rootUrl + '/api/LandOwnerDetails/GetAllLandOwnerDetailsBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue + '/' + PD_Id + '/' + Pr_id, this.httpOptions);
  }
  GetAllProposalprojectOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/LandOwnerDetails/GetAllProposalprojectOnSearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue + '/', this.httpOptions);
  }

  PostLandPurchaseDetails(udm) {
    return this.http.post(this.rootUrl + '/api/LandPurchase/CreateLandPurchase', udm, this.httpOptions);
  }
  PostJVDetails(udm) {
    return this.http.post(this.rootUrl + '/api/JVPurchase/CreateJV', udm, this.httpOptions);
  }

  GetAllLandPurchase(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandPurchase/GetAllLandPurchase/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  GetAgreement(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandPurchase/GetAgreement/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  GetJVAgreement(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/JVPurchase/GetJVAgreement/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  Getpurchase(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandPurchase/Getpurchase/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  GetJVpurchase(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/JVPurchase/GetJVpurchase/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  Getpossession(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandPurchase/Getpossession/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  GetJVpossession(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/JVPurchase/GetJVpossession/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  GetByIdLandPurchase(LP_Id) {
    return this.http.get(this.rootUrl + '/api/LandPurchase/GetByIdLandPurchase/' + LP_Id, this.httpOptions);
  }
  GetByIdJV(LP_Id) {
    return this.http.get(this.rootUrl + '/api/JVPurchase/GetByIdJV/' + LP_Id, this.httpOptions);
  }
  UpdateLandPurchase(udm, LP_Id, id) {
    return this.http.put(this.rootUrl + '/api/LandPurchase/UpdateLandPurchase/' + LP_Id + '/' + id, udm, this.httpOptions);
  }

  UpdateJV(udm, LP_Id, id) {
    return this.http.put(this.rootUrl + '/api/JVPurchase/UpdateJV/' + LP_Id + '/' + id, udm, this.httpOptions);
  }

  DeleteJV(LP_Id) {
    return this.http.delete(this.rootUrl + '/api/JVPurchase/DeleteJV/' + LP_Id, this.httpOptions);
  }

  DeleteLandPurchase(LP_Id) {
    return this.http.delete(this.rootUrl + '/api/LandPurchase/DeleteLandPurchase/' + LP_Id, this.httpOptions);
  }

  GetLandPurchaseBysearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/LandPurchase/GetAllLandPurchaseBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  GetAllLandOwnerPaymentList(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandOwnerPayment/GetAllLandOwnerPaymentpayList/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }

  getLandOwnerInfo(LO_Id) {
    return this.http.get(this.rootUrl + '/api/LandOwnerPayment/GetLandOwnerPaymentpayInfo/' + LO_Id, this.httpOptions);
  }

  PostLandOwnerPaymentDetails(udm) {
    return this.http.post(this.rootUrl + '/api/LandOwnerPayment/CreateLandOwnerPayment', udm, this.httpOptions);
  }

  GetAllLandOwnerPaymentListOfPerticular(LO_Id) {
    return this.http.get(this.rootUrl + '/api/LandOwnerPayment/GetAllLandOwnerPaymentpayment/' + LO_Id, this.httpOptions);
  }

  PostLandAquisitiont(udm) {
    return this.http.post(this.rootUrl + '/api/LandAcquisition/CreateLandAcquisition', udm, this.httpOptions);
  }

  GetAllLandAquisition(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetAllLandAcquisition/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }

  GetByIdLandAquisition(LA_Id) {
    return this.http.get(this.rootUrl + '/api/LandAcquisition/GetLandAcquisitionById/' + LA_Id, this.httpOptions);
  }

  UpdateLandAquisition(LA_Id: number, udm) {
    return this.http.put(this.rootUrl + '/api/LandAcquisition/UpdateLandAcquisition/' + LA_Id, udm, this.httpOptions);
  }

  DeleteLandAcquisition(LA_Id, Id) {
    return this.http.delete(this.rootUrl + '/api/LandAcquisition/DeleteLandAcquisition/' + LA_Id + "/" + Id, this.httpOptions);
  }

  getAllProposalReportdropdownNotforLandaquisition() {
    return this.http.get(this.rootUrl + '/api/ProposalReport/GetAllProposalReportForDropdownNotForLandAquisition', this.httpOptions);
  }

  PostBoardMeeting(udm) {
    return this.http.post(this.rootUrl + '/api/Boardmeeting/CreateBoardmeeting', udm, this.httpOptions);
  }

  GetAllBoardMeeting(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/Boardmeeting/GetAllBoardmeeting/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }

  GetByIdBoardMeeting(BR_Id) {
    return this.http.get(this.rootUrl + '/api/Boardmeeting/GetBoardMeetingById/' + BR_Id, this.httpOptions);
  }

  UpdateBoardMeeting(IRId: number, udm) {
    return this.http.put(this.rootUrl + '/api/Boardmeeting/UpdateBoardMeeting/' + IRId, udm, this.httpOptions);
  }

  DeleteBoardMeeting(BM_Id) {
    return this.http.delete(this.rootUrl + '/api/Boardmeeting/DeleteBoardMeeting/' + BM_Id, this.httpOptions);
  }

  GetBoardMeetingBysearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/Boardmeeting/GetAllBoardMeetingBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  GetDistrictDetails(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/DistrictDetails/GetAllDistrict/' + itemsPerPage + "/" + pageNo, this.httpOptions);

  }
  DeleteDistrict(DI_Id) {
    return this.http.delete(this.rootUrl + '/api/DistrictDetails/DeleteDistrict/' + DI_Id, this.httpOptions);
  }

  PostDistrict(udm) {
    return this.http.post(this.rootUrl + '/api/DistrictDetails/CeateDistrict', udm, this.httpOptions);
  }

  UpdateDistrict(udm, DI_Id) {
    return this.http.put(this.rootUrl + '/api/DistrictDetails/UpdateDistrict/' + DI_Id, udm, this.httpOptions);
  }

  GetByIdDistrict(DI_Id) {
    return this.http.get(this.rootUrl + '/api/DistrictDetails/GetByIdDistrict/' + DI_Id, this.httpOptions);
  }

  GetCourtDetails(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/CourtDetails/GetAllCourt/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  PostCourt(udm) {
    return this.http.post(this.rootUrl + '/api/CourtDetails/CreateCourt', udm, this.httpOptions);
  }

  GetByIdCourt(Court_Id) {
    return this.http.get(this.rootUrl + '/api/CourtDetails/GetByIdCourt/' + Court_Id, this.httpOptions);
  }

  UpdateCourt(udm, Court_Id) {
    return this.http.put(this.rootUrl + '/api/CourtDetails/UpdateCourt/' + Court_Id, udm, this.httpOptions);
  }
  DeleteCourt(Court_Id) {
    return this.http.delete(this.rootUrl + '/api/CourtDetails/DeleteCourt/' + Court_Id, this.httpOptions);
  }

  GetCourtTypeDetails(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/CourtTypeDetails/GetAllCourtType/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  DeleteCourtType(CourtT_Id) {
    return this.http.delete(this.rootUrl + '/api/CourtTypeDetails/DeleteCourtType/' + CourtT_Id, this.httpOptions);
  }

  PostCourtType(udm) {
    return this.http.post(this.rootUrl + '/api/CourtTypeDetails/CreateCourtType', udm, this.httpOptions);
  }

  SendtoFinance(App_No) {
    return this.http.post(this.rootUrl + '/api/ApplicationForm/SendtoFinance/' + App_No, this.httpOptions);
  }

  GetByIdCourtType(CourtT_Id) {
    return this.http.get(this.rootUrl + '/api/CourtTypeDetails/GetByIdCourtType/' + CourtT_Id, this.httpOptions);
  }

  UpdateCourtType(udm, CourtT_Id) {
    return this.http.put(this.rootUrl + '/api/CourtTypeDetails/UpdateCourtType/' + CourtT_Id, udm, this.httpOptions);
  }

  DeleteDepartment(Department_Id) {
    return this.http.delete(this.rootUrl + '/api/DepartmentDetails/DeleteDepartment/' + Department_Id, this.httpOptions);
  }

  GetDepartmentDetails(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/DepartmentDetails/GetAllDepartment/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  PostDepartment(udm) {
    return this.http.post(this.rootUrl + '/api/DepartmentDetails/CreateDepartment', udm, this.httpOptions);
  }

  GetByIdDepartment(Department_Id) {
    return this.http.get(this.rootUrl + '/api/DepartmentDetails/GetByIdDepartment/' + Department_Id, this.httpOptions);
  }

  UpdateDepartment(udm, Department_Id) {
    return this.http.put(this.rootUrl + '/api/DepartmentDetails/UpdateDepartment/' + Department_Id, udm, this.httpOptions);
  }
  DeleteCaseType(CaseType_Id) {
    return this.http.delete(this.rootUrl + '/api/CaseTypeDetails/DeleteCaseType/' + CaseType_Id, this.httpOptions);
  }

  GetCaseTypeDetails(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/CaseTypeDetails/GetAllCaseType/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetPaymonthfinalized(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/PayrollProcess/GetAllpayrollfinalized/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllchangepropertyquota(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/CategoryController/AllPropertyforprojectCPQ/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  getAllmonthlyist(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/GetAllmonthlyattendancemonthly/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetByIdCaseType(CaseType_Id) {
    return this.http.get(this.rootUrl + '/api/CaseTypeDetails/GetByIdCaseType/' + CaseType_Id, this.httpOptions);
  }

  UpdateCaseType(udm, CaseType_Id) {
    return this.http.put(this.rootUrl + '/api/CaseTypeDetails/UpdateCaseType/' + CaseType_Id, udm, this.httpOptions);
  }

  UpdateApplicantPayment(applicant, APP_No) {
    return this.http.put(this.rootUrl + '/api/WorkAroundSln/UpdateApplicantPayment/' + APP_No, applicant, this.httpOptions);
  }

  PostCaseType(udm) {
    return this.http.post(this.rootUrl + '/api/CaseTypeDetails/CreateCaseType', udm, this.httpOptions);
  }
  GetPhaseDetails(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/PhaseDetails/GetAllPhase/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  PostPhase(udm) {
    return this.http.post(this.rootUrl + '/api/PhaseDetails/CreatePhase', udm, this.httpOptions);
  }

  UpdatePhase(udm, Phase_Id) {
    return this.http.put(this.rootUrl + '/api/PhaseDetails/UpdatePhase/' + Phase_Id, udm, this.httpOptions);
  }

  Updatechangequota(PR_Id,RES_Id) {
    return this.http.put(this.rootUrl + '/api/CategoryController/UpdatePropertyQuota/' + PR_Id+"/"+RES_Id, this.httpOptions);
  }

  getpropertyforproject(itemsPerPage,pageNo,PD_Id,Sch_Id,Phase_Id){
    return this.http.get(this.rootUrl + '/api/CategoryController/SearchPropertyforproject/' + itemsPerPage+"/"+pageNo+"/"+PD_Id+"/"+Sch_Id+"/"+Phase_Id, this.httpOptions);

  }
     


  
  


  GetByIdPhase(Phase_Id) {
    return this.http.get(this.rootUrl + '/api/PhaseDetails/GetByIdPhase/' + Phase_Id, this.httpOptions);
  }

  DeletePhase(Phase_Id) {
    return this.http.delete(this.rootUrl + '/api/PhaseDetails/DeletePhase/' + Phase_Id, this.httpOptions);
  }
  GetSchemeDetails(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/SchemeDetails/GetAllScheme/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  PostScheme(udm) {
    return this.http.post(this.rootUrl + '/api/SchemeDetails/CreateScheme', udm, this.httpOptions);
  }

  GetByIdScheme(Sch_Id) {
    return this.http.get(this.rootUrl + '/api/SchemeDetails/GetByIdScheme/' + Sch_Id, this.httpOptions);
  }
  UpdateScheme(udm, Sch_Id) {
    return this.http.put(this.rootUrl + '/api/SchemeDetails/UpdateScheme/' + Sch_Id, udm, this.httpOptions);
  }

  DeleteScheme(Sch_Id) {
    return this.http.delete(this.rootUrl + '/api/SchemeDetails/DeleteScheme/' + Sch_Id, this.httpOptions);
  }

  SearchDistrict(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/DistrictDetails/GetAllDistrictBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  SearchCourt(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/CourtDetails/GetAllCourtBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  SearchCourtType(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/CourtTypeDetails/GetAllCourtTypeBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  SearchDepartment(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/DepartmentDetails/GetAllDepartmentBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  SearchCaseType(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/CaseTypeDetails/GetAllCaseTypeBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  SearchPhase(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/PhaseDetails/GetAllPhaseBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  SearchScheme(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/SchemeDetails/GetAllSchemeBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }

  Pay() {
    return this.http.post(this.rootUrl + '/api/PaymentGateway/Payment', null, this.httpOptions);
  }
  SearchFile(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/FileDetails/GetAllFileBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }

  DeleteFile(File_Id) {
    return this.http.delete(this.rootUrl + '/api/FileDetails/DeleteFile/' + File_Id, this.httpOptions);
  }

  UpdateFile(udm, File_Id) {
    return this.http.put(this.rootUrl + '/api/FileDetails/UpdateFile/' + File_Id, udm, this.httpOptions);
  }

  GetByIdFile(File_Id) {
    return this.http.get(this.rootUrl + '/api/FileDetails/GetByIdFile/' + File_Id, this.httpOptions);
  }

  PostFile(udm) {
    return this.http.post(this.rootUrl + '/api/FileDetails/CreateFile', udm, this.httpOptions);
  }

  GetFileDetails(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/FileDetails/GetAllFile/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  SendToFinance(Ap_Id: Number) {
    return this.http.get(this.rootUrl + '/api/AdvocatePayment/CreateLegalBill/' + Ap_Id, this.httpOptions);
  }

  getAllPagesList() {
    return this.http.get(this.rootUrl + '/api/LogReport/GetAllPagesForLog', this.httpOptions);
  }

  GetInsertLogList(tableName: any, fromDate: any, ToDate: any) {
    return this.http.get(this.rootUrl + '/api/LogReport/GetInsertLog/' + tableName + '/' + fromDate + '/' + ToDate, this.httpOptions);
  }

  GetDeleteLogList(tableName: any, fromDate: any, ToDate: any) {
    return this.http.get(this.rootUrl + '/api/LogReport/GetDeleteLog/' + tableName + '/' + fromDate + '/' + ToDate, this.httpOptions);
  }

  GetEditLogList(tableName: any, fromDate: any, ToDate: any) {
    return this.http.get(this.rootUrl + '/api/LogReport/GetEditLog/' + tableName + '/' + fromDate + '/' + ToDate, this.httpOptions);
  }

  GetEditDetailsLog(tableName: any, fromDate: any, ToDate: any, PrimaryKey: any) {
    return this.http.get(this.rootUrl + '/api/LogReport/GetEditDetailLog/' + tableName + '/' + fromDate + '/' + ToDate + '/' + PrimaryKey, this.httpOptions);
  }

  GetByIdCaseRegistrationforEditedValue(tableName: any, fromDate: any, ToDate: any, PrimaryKey: any, rowNu: any) {
    return this.http.get(this.rootUrl + '/api/LogReport/GetOldDataLogById/' + tableName + '/' + fromDate + '/' + ToDate + '/' + PrimaryKey + '/' + rowNu, this.httpOptions);
  }

  Update_Refund_Request_insertData(udm) {
    return this.http.put(this.rootUrl + '/api/RefundRequest/Update_Refund_Request_insertData', udm, this.httpOptions);

  }
  Payment() {
    return this.http.post(this.rootUrl + '/api/PaymentGateway/Payment', this.httpOptions);
  }

  GetAllCustomerDetails(itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/CustomerDetails/GetAllCustomerDetails/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetByIdCustomerModel(CUST_ID) {
    return this.http.get(this.rootUrl + '/api/CustomerDetails/GetByIdCustomerModel/' + CUST_ID, this.httpOptions);
  }
  UpdateCustomer(CUST_ID, CustomerDetails) {
    return this.http.put(this.rootUrl + '/api/CustomerDetails/UpdateCustomer/' + CUST_ID, CustomerDetails, this.httpOptions);
  }
  CreateCustomer(Customer) {
    return this.http.post(this.rootUrl + '/api/CustomerDetails/CreateCustomer', Customer, this.httpOptions);
  }
  GetStateCustomer() {
    return this.http.get(this.rootUrl + '/api/CustomerDetails/GetStateCustomer', this.httpOptions);
  }
  GetDistrictCustomer(ST_Id) {
    return this.http.get(this.rootUrl + '/api/CustomerDetails/GetDistrictCustomer/' + ST_Id, this.httpOptions);
  }
  DeleteCustomer(CUST_ID) {
    return this.http.delete(this.rootUrl + '/api/CustomerDetails/DeleteCustomer/' + CUST_ID, this.httpOptions);
  }
  GetAllCustomerBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/CustomerDetails/GetAllCustomerBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllRecoveryPropertyDetails(itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/RecoveryPropertyDetails/GetAllRecoveryPropertyDetails/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetAllProjectRecovery() {
    return this.http.get(this.rootUrl + '/api/RecoveryPropertyDetails/GetProjectDetails', this.httpOptions);
  }



  GetByIdPropertyDetails(PR_Id) {
    return this.http.get(this.rootUrl + '/api/RecoveryPropertyDetails/GetByIdPropertyDetails/' + PR_Id, this.httpOptions);
  }
  GetRecoveryPropertyType() {
    return this.http.get(this.rootUrl + '/api/RecoveryPropertyDetails/GetRecoveryPropertyType', this.httpOptions);
  }
  GetRecoveryPropertyCategory() {
    return this.http.get(this.rootUrl + '/api/RecoveryPropertyDetails/GetRecoveryPropertyCategory', this.httpOptions);
  }
  GetAllRequestPropertyDetails(itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/RequestProperty/GetAllRequestPropertyDetails/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetProjectDetails(CUST_DI_ID) {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetProjectDetails/' + CUST_DI_ID, this.httpOptions);
  }

  GetProjectDetails_New(CUST_DI_ID) {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetProjectDetails_New/' + CUST_DI_ID, this.httpOptions);
  }

  GetCategoryDetails() {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetCategoryDetails', this.httpOptions);
  }

  GetCategoryDetailsOnProjId(PROJ_ID) {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetCategoryDetailsOnProjId/' + PROJ_ID, this.httpOptions);
  }

  GetCustomerDetails() {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetCustomerDetails', this.httpOptions);
  }
  GetProperty(PD_Id, REQP_CA_ID, mode, REQP_APP_TYPE) {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetProperty/' + PD_Id + '/' + REQP_CA_ID + '/' + mode + '/' + REQP_APP_TYPE, this.httpOptions);
  }
  GetRequestFor() {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetRequestFor', this.httpOptions);
  }
  GetApplicantType() {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetApplicantType', this.httpOptions);
  }
  GetByIdCustomerDetails(CUST_ID) {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetByIdCustomerDetails/' + CUST_ID, this.httpOptions);
  }
  CreateRequestProperty(RequestProperty) {

    return this.http.post(this.rootUrl + '/api/RequestProperty/CreateRequestProperty', RequestProperty, this.httpOptions);
  }
  GetByIdRequestPropertyDetails(REQP_ID) {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetByIdRequestPropertyDetails/' + REQP_ID, this.httpOptions);
  }
  DeleteRequestPropertyDetails(REQP_ID) {
    return this.http.delete(this.rootUrl + '/api/RequestProperty/DeleteRequestPropertyDetails/' + REQP_ID, this.httpOptions);
  }
  GetAllRequestPropertyBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/RequestProperty/GetAllRequestPropertyBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllRequestPropertyApprovalDetails(itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/RequestPropertyApproval/GetAllRequestPropertyApprovalDetails/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetAllRequestPropertyApprovalBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/RequestPropertyApproval/GetAllRequestPropertyApprovalBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  RequestPropertyApproved(REQP_ID, RequestProperty) {
    return this.http.put(this.rootUrl + '/api/RequestPropertyApproval/RequestPropertyApproved/' + REQP_ID, RequestProperty, this.httpOptions);
  }
  UpdatePropertyRequest(STATUS, Remarks, PropId) {

    return this.http.post(this.rootUrl + '/api/RequestPropertyApproval/UpdatePropertyRequest/' + STATUS + '/' + Remarks + '/' + PropId, null, this.httpOptions);
  }
  GetAllAgreementDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetAllAgreementDetails/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllAgreementBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetAllAgreementBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAgreementType() {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetAgreementType', this.httpOptions);
  }
  GetOldAgreement() {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetOldAgreement', this.httpOptions);
  }
  GetAllotmentType() {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetAllotmentType', this.httpOptions);
  }
  GetPaymentType() {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetPaymentType', this.httpOptions);
  }
  GetPaymentFrequency() {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetPaymentFrequency', this.httpOptions);
  }
  GetLesserDetails() {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetLesserDetails', this.httpOptions);
  }
  GetLesseeDetails() {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetLesseeDetails', this.httpOptions);
  }
  GetProjectAgreement() {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetProjectAgreement', this.httpOptions);
  }
  GetCustomerDetailsById(CUST_ID) {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetCustomerDetailsById/' + CUST_ID, this.httpOptions);
  }
  CreateAgreementDetails(udm) {
    return this.http.post(this.rootUrl + '/api/AgreementDetails/CreateAgreementDetails', udm, this.httpOptions);
  }
  GetByIdRequestProperty(REQP_ID) {
    return this.http.get(this.rootUrl + '/api/AgreementDetails/GetByIdRequestProperty/' + REQP_ID, this.httpOptions);
  }
  GetAllAgreementApprovalDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/AgreementApprovalDetails/GetAllAgreementApprovalDetails/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllAgreementApprovalBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/AgreementApprovalDetails/GetAllAgreementApprovalBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  UpdateAgreement(Status, Remarks, AgrmntId) {

    return this.http.post(this.rootUrl + '/api/AgreementApprovalDetails/UpdateAgreement/' + Status + '/' + Remarks + '/' + AgrmntId, null, this.httpOptions);
  }
  DeleteAgreementDetails(REQP_ID) {
    return this.http.delete(this.rootUrl + '/api/AgreementDetails/DeleteAgreementDetails/' + REQP_ID, this.httpOptions);
  }
  UpdatePropertyAgreement(Agrmnt_Id, PropertyAgreement) {

    return this.http.put(this.rootUrl + '/api/AgreementDetails/UpdatePropertyAgreement/' + Agrmnt_Id, PropertyAgreement, this.httpOptions);
  }
  uploadImageRecovery(data) {
    return this.http.post(this.rootUrl + '/api/AgreementDetails/image', data);
  }
  GetAgreementCode(mode) {
    return this.http.get(this.rootUrl + '/api/AgreementPayment/GetAgreementCode/' + mode, this.httpOptions);
  }
  GetAgreementDetailsById(Agrmnt_Id) {
    return this.http.get(this.rootUrl + '/api/AgreementPayment/GetAgreementDetailsById/' + Agrmnt_Id, this.httpOptions);
  }
  CreateChallan(PaymentChallan) {

    return this.http.post(this.rootUrl + '/api/AgreementPayment/CreateChallan', PaymentChallan, this.httpOptions);
  }
  GetAllChallanDetails(itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/AgreementPayment/GetAllChallanDetails/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetByIdChallan(Payment_Id) {
    return this.http.get(this.rootUrl + '/api/AgreementPayment/GetByIdChallan/' + Payment_Id, this.httpOptions);
  }
  GetAllChallanBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/AgreementPayment/GetAllChallanBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  UpdateChallan(Payment_Id, PaymentChallan) {

    return this.http.put(this.rootUrl + '/api/AgreementPayment/UpdateChallan/' + Payment_Id, PaymentChallan, this.httpOptions);
  }
  DeleteChallan(Payment_Id) {
    return this.http.delete(this.rootUrl + '/api/AgreementPayment/DeleteChallan/' + Payment_Id, this.httpOptions);
  }
  GetAllChallanApprovalDetails(itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/AgreementPaymentApproval/GetAllChallanApprovalDetails/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllChallanApprovalBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/AgreementPaymentApproval/GetAllChallanApprovalBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  ApproveChallan(Status, Remarks, PayId) {

    return this.http.post(this.rootUrl + '/api/AgreementPaymentApproval/ApproveChallan/' + Status + '/' + Remarks + '/' + PayId, null, this.httpOptions);
  }
  GetChallanCode(mode) {

    return this.http.get(this.rootUrl + '/api/PaymentReceipt/GetChallanCode/' + mode, this.httpOptions);
  }
  GetChallanDetailsById(Payment_Id) {
    return this.http.get(this.rootUrl + '/api/PaymentReceipt/GetChallanDetailsById/' + Payment_Id, this.httpOptions);
  }
  CreateReceipt(PaymentReceipt) {

    return this.http.post(this.rootUrl + '/api/PaymentReceipt/CreateReceipt', PaymentReceipt, this.httpOptions);
  }
  GetAllReceiptDetails(itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/PaymentReceipt/GetAllReceiptDetails/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetByIdReceipt(Payment_Receipt_Id) {
    return this.http.get(this.rootUrl + '/api/PaymentReceipt/GetByIdReceipt/' + Payment_Receipt_Id, this.httpOptions);
  }
  UpdateRequestProperty(REQP_ID, RequestProperties) {
    return this.http.put(this.rootUrl + '/api/RequestProperty/UpdateRequestProperty/' + REQP_ID, RequestProperties, this.httpOptions);
  }
  UpdateReceipt(Payment_Receipt_Id, PaymentReceipt) {

    return this.http.put(this.rootUrl + '/api/PaymentReceipt/UpdateReceipt/' + Payment_Receipt_Id, PaymentReceipt, this.httpOptions);
  }
  DeleteReceipt(Payment_Receipt_Id) {
    return this.http.delete(this.rootUrl + '/api/PaymentReceipt/DeleteReceipt/' + Payment_Receipt_Id, this.httpOptions);
  }
  GetAllReceiptBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/PaymentReceipt/GetAllReceiptBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllReceiptApprovalDetails(itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/PaymentReceiptApproval/GetAllReceiptApprovalDetails/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllReceiptApprovalBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/PaymentReceiptApproval/GetAllReceiptApprovalBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  ApproveReceipt(Status, Remarks, ReceiptId) {

    return this.http.post(this.rootUrl + '/api/PaymentReceiptApproval/ApproveReceipt/' + Status + '/' + Remarks + '/' + ReceiptId, null, this.httpOptions);
  }
  GetAllAgreementRenewalsDetails(itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/AgreementRenewals/GetAllAgreementRenewalsDetails/' + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetAllRenewalBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/AgreementRenewals/GetAllRenewalBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }

  GetallReligionlist(ItemsPerPage, pageNo) {
    return this.http.get(this.rootUrl + '/api/ReligionDetails/GetAllReligion/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }


  PayScaleDetails(ItemsPerPage, pageNo) {
    return this.http.get(this.rootUrl + '/api/PayScaleDetails/GetAllPayScaleDetails/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  DeleteReligion(Rlg_Id: Number) {

    return this.http.put(this.rootUrl + '/api/ReligionDetails/DeleteReligion/' + Rlg_Id, null, this.httpOptions);
  }


  DeleteScale(scale_id: Number) {

    return this.http.put(this.rootUrl + '/api/PayScaleDetails/DeleteScale/' + scale_id, this.httpOptions);
  }


  DeleteLeave(Leave_id: Number) {

    return this.http.put(this.rootUrl + '/api/LeaveDetails/DeleteLeave/' + Leave_id, this.httpOptions);
  }


  DeletedG(Dsc_Id: Number) {

    return this.http.put(this.rootUrl + '/api/DesignationDetails/DeleteDesignation/' + Dsc_Id, null, this.httpOptions);
  }


  DeleteHospital(hsptl_id: Number) {

    return this.http.put(this.rootUrl + '/api/HospitalDetails/DeleteHospital/' + hsptl_id, this.httpOptions);
  }


  DeleteHolidayDetails(hld_id: Number) {

    return this.http.put(this.rootUrl + '/api/HolidayDetails/DeleteHoliday/' + hld_id, this.httpOptions);
  }


  GenrateHolidayCalender(CalendarYear: Number) {

    return this.http.put(this.rootUrl + '/api/HolidayDetails/GenrateCalendarYear/' + CalendarYear, this.httpOptions);
  }

  DeleteCal(calendar_id: Number) {

    return this.http.put(this.rootUrl + '/api/CalenderDetails/DeleteCalender/' + calendar_id, this.httpOptions);
  }

  GetallDesignationlist(ItemsPerPage, pageNo) {
    return this.http.get(this.rootUrl + '/api/DesignationDetails/GetAllDesignation/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetallLeavelist(ItemsPerPage, pageNo) {
    return this.http.get(this.rootUrl + '/api/LeaveDetails/GetAllLeave/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }
  GetHospitalList(ItemsPerPage, pageNo) {
    return this.http.get(this.rootUrl + '/api/HospitalDetails/GetAllHospital/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetHoliday(ItemsPerPage, pageNo, year) {
    return this.http.get(this.rootUrl + '/api/HolidayDetails/GetHolidaysDetails/' + ItemsPerPage + '/' + pageNo + '/' + year, this.httpOptions);
  }

  GetCalenderList(ItemsPerPage, pageNo) {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/GetAllCalender/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  DeleteCaste(Caste_Id: Number) {

    return this.http.put(this.rootUrl + '/api/CasteDetails/DeleteCaste/' + Caste_Id, null, this.httpOptions);
  }

  PostReligion(udm) {
    return this.http.post(this.rootUrl + '/api/ReligionDetails/CreateReligion', udm, this.httpOptions);
  }

  PostPayScale(udm) {

    return this.http.post(this.rootUrl + '/api/PayScaleDetails/CreatePayScale', udm, this.httpOptions);
  }

  PostLeave(udm) {

    return this.http.post(this.rootUrl + '/api/LeaveDetails/CreateLeave', udm, this.httpOptions);
  }

  PostDesignation(udm) {

    return this.http.post(this.rootUrl + '/api/DesignationDetails/CreateDesignation', udm, this.httpOptions);
  }
  UpdateReligionDetails(Rlg_Id, Religion) {

    return this.http.put(this.rootUrl + '/api/ReligionDetails/UpdateReligion/' + Rlg_Id, Religion, this.httpOptions);
  }

  UpdateScaleDetails(scale_id, Religion) {

    return this.http.put(this.rootUrl + '/api/PayScaleDetails/UpdateScale/' + scale_id, Religion, this.httpOptions);
  }

  UpdateLaveDetails(Leave_id, Religion) {

    return this.http.put(this.rootUrl + '/api/LeaveDetails/UpdateLeave/' + Leave_id, Religion, this.httpOptions);
  }


  UpdateDgDetails(Dsc_Id, Religion) {

    return this.http.put(this.rootUrl + '/api/DesignationDetails/UpdateDesignation/' + Dsc_Id, Religion, this.httpOptions);
  }

  UpdateCasteDetails(Caste_Id, Caste) {

    return this.http.put(this.rootUrl + '/api/CasteDetails/UpdateCaste/' + Caste_Id, Caste, this.httpOptions);
  }

  UpdateHospitalDetails(hsptl_id, Caste) {

    return this.http.put(this.rootUrl + '/api/HospitalDetails/UpdateHospital/' + hsptl_id, Caste, this.httpOptions);
  }

  UpdateCalDetails(calendar_id, Caste) {

    return this.http.put(this.rootUrl + '/api/CalenderDetails/UpdateCalender/' + calendar_id, Caste, this.httpOptions);
  }


  UpdateholidayDetails(hld_id, Caste) {

    return this.http.put(this.rootUrl + '/api/HolidayDetails/UpdateHoliday/' + hld_id, Caste, this.httpOptions);
  }

  GetReligionById(Rlg_Id) {
    return this.http.get(this.rootUrl + '/api/ReligionDetails/GetByIdReligion/' + Rlg_Id, this.httpOptions);
  }


  GetScaleById(scale_id) {
    return this.http.get(this.rootUrl + '/api/PayScaleDetails/GetByIdScale/' + scale_id, this.httpOptions);
  }



  GetHolidayById(hld_id) {
    return this.http.get(this.rootUrl + '/api/HolidayDetails/GetByIdHoliday/' + hld_id, this.httpOptions);
  }
  validate(calendar_Year) {

    return this.http.get(this.rootUrl + '/api/HolidayDetails/GetHolidayYearExsit/' + calendar_Year, this.httpOptions);
  }


  GetLeaveById(Leave_id) {
    return this.http.get(this.rootUrl + '/api/LeaveDetails/GetByIdLeave/' + Leave_id, this.httpOptions);
  }


  GetDesignationById(Dsc_Id) {
    return this.http.get(this.rootUrl + '/api/DesignationDetails/GetByIdDesignation/' + Dsc_Id, this.httpOptions);
  }

  GetHospitalById(hsptl_id) {
    return this.http.get(this.rootUrl + '/api/HospitalDetails/GetByIdHospital/' + hsptl_id, this.httpOptions);
  }


  GetCalenderById(calendar_id) {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/GetByIdCalender/' + calendar_id, this.httpOptions);
  }


  SearchReligion(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/ReligionDetails/GetAllReligionBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText, this.httpOptions);
  }

  SearchReligion_New(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/ReligionDetails/GetAllReligionBySearch_New/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText, this.httpOptions);
  }

  SearchPayScale(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/PayScaleDetails/GetAllScaleBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText, this.httpOptions);
  }


  SearchLeave(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/LeaveDetails/GetAllLeaveBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText, this.httpOptions);
  }

  SearchCal(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/CalenderDetails/GetAllCalenderBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText, this.httpOptions);
  }


  SearchDg(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/DesignationDetails/GetAllDesignationBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText, this.httpOptions);
  }


  SearchHos(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/HospitalDetails/GetAllHospitalBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText, this.httpOptions);
  }

  SearchHoliday(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/HolidayDetails/GetAllHolidayBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText, this.httpOptions);
  }


  SearchCaste(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {

    return this.http.get(this.rootUrl + '/api/CasteDetails/GetAllCasteBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText, this.httpOptions);
  }

  GetAllCastelist(ItemsPerPage, pageNo) {
    return this.http.get(this.rootUrl + '/api/CasteDetails/GetAllCaste/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetAllAttendanceLeavelist(ItemsPerPage, pageNo) {
    return this.http.get(this.rootUrl + '/api/LeaveAttendance/GetAllLeaveAttendance/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  Getreligions() {
    return this.http.get(this.rootUrl + '/api/CasteDetails/ReligionDetails', this.httpOptions);
  }

  GetDristic() {
    return this.http.get(this.rootUrl + '/api/LeaveAttendance/DistirctDetails', this.httpOptions);
  }

  GetDristic1() {
    return this.http.get(this.rootUrl + '/api/LeaveAttendance/LeaveDetails', this.httpOptions);
  }


  GetMonth() {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/MonthDetails', this.httpOptions);
  }

  GetYear() {
    return this.http.get(this.rootUrl + '/api/HolidayDetails/GetYear', this.httpOptions);
  }

  GetEndMonth() {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/GetEndMonth', this.httpOptions);
  }

  GetFristWeekOff() {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/GetFristWeekOff', this.httpOptions);
  }

  GetSecondWeekOff() {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/GetFristWeekOff2', this.httpOptions);
  }


  GetThiredWeekOff() {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/GetFristWeekOff3', this.httpOptions);
  }


  GetHafDay() {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/GetFristWeekOff4', this.httpOptions);
  }


  GetCategory() {
    return this.http.get(this.rootUrl + '/api/CasteDetails/GetCasteCategory', this.httpOptions);
  }

  getEmaployeeDeT(DI_Id: any) {
    return this.http.get(this.rootUrl + '/api/LeaveAttendance/EmployeeDet/' + DI_Id, this.httpOptions)
  }

  getEmaployeeDetails(DI_Id: any) {
    return this.http.get(this.rootUrl + '/api/LeaveAttendance/EmployeeDetails/' + DI_Id, this.httpOptions)
    }

  getEmaployeeDetailsTR(DI_Id: any, desg_Id:any) {
    return this.http.get(this.rootUrl + '/api/LeaveAttendance/EmployeeDetails/' + DI_Id + '/' + desg_Id, this.httpOptions)
  }

  GetDistic() {
    return this.http.get(this.rootUrl + '/api/HospitalDetails/DisticDetails', this.httpOptions);
  }
   





  GetState() {
    return this.http.get(this.rootUrl + '/api/HospitalDetails/StateDetails', this.httpOptions);
  }
  PostCaste(udm) {
    return this.http.post(this.rootUrl + '/api/CasteDetails/CreateCaste', udm, this.httpOptions);
  }

  PostCalender(udm) {
    return this.http.post(this.rootUrl + '/api/CalenderDetails/CreateCalender', udm, this.httpOptions);
  }


  PostHoliday(udm) {
    return this.http.post(this.rootUrl + '/api/HolidayDetails/CreateHoliday', udm, this.httpOptions);
  }


  PostHospital(udm) {
    return this.http.post(this.rootUrl + '/api/HospitalDetails/CreateHospital', udm, this.httpOptions);
  }
  GetCasteById(Caste_Id) {
    return this.http.get(this.rootUrl + '/api/CasteDetails/GetByIdCaste/' + Caste_Id, this.httpOptions);
  }
  PostEmployeeDetails(udm) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployee/CreateHRMSEmp', udm, this.httpOptions);
  }

  GetAllEmployeeBasics(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/GetAllEmployeeBasicDetails/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetAllScales() {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/GetAllScales', this.httpOptions);
  }
  GetAllhrmsfixedCodesexisting(description) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/GetAllHRMSFixedCodes/' + description, this.httpOptions);
    }
    GetAllhrmsfixedCodespromoting(description) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/GetAllHRMSFixedCodes/' + description, this.httpOptions);
    }
  GetAllDesignation() {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/GetAllDesignations', this.httpOptions);
  }

  GetEmployeeDetailsOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/GetAllEmployeeBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  DeleteEmployeeDetails(EMP_EMPLOYEE_ID) {
    return this.http.delete(this.rootUrl + '/api/HRMSEmployee/DeleteHRMSDetails/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }

  GetByIdEmployeeDetails(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/getByIdEmployeeDetails/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }

  UpdateEmployeeDetails(udm, EmployeeId) {
    return this.http.put(this.rootUrl + '/api/HRMSEmployee/updateEmployeeDetails/' + EmployeeId, udm, this.httpOptions);
  }

  GetAllEmployees(divisionId) {
    return this.http.get(this.rootUrl + '/api/EmployeeAddress/GetAllEmployees/' + divisionId, this.httpOptions);
  }

  GetAllEmployeeses() {
    return this.http.get(this.rootUrl + '/api/EmployeeAddress/GetAllEmployees', this.httpOptions);
  }

  GetEmployeeIds(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/EmployeeAddress/GetEmployeeDetails/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }

  PostEmployeeAddressDetails(udm) {
    return this.http.post(this.rootUrl + '/api/EmployeeAddress/CreateEmployeeAddress', udm, this.httpOptions);
  }

  GetAllEmployeeAddress(ItemsPerPage: number, pageNo: number, EmployeeId: number) {
    return this.http.get(this.rootUrl + '/api/EmployeeAddress/GetAllEmployeeAddressDetails/' + ItemsPerPage + '/' + pageNo + '/' + EmployeeId, this.httpOptions);
  }

  GetEmployeeAddressOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/EmployeeAddress/GetAllEmployeeAddressbySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  GetByIdEmployeeAddress(EMP_ADDR_ID) {
    return this.http.get(this.rootUrl + '/api/EmployeeAddress/GetEmployeeAddressById/' + EMP_ADDR_ID, this.httpOptions);
  }

  DeleteEmployeeAddress(EMP_ADDR_ID) {
    return this.http.delete(this.rootUrl + '/api/EmployeeAddress/DeleteAddress/' + EMP_ADDR_ID, this.httpOptions);
  }


  UpdateEmployeeAddressDetails(udm, AddressId) {
    return this.http.put(this.rootUrl + '/api/EmployeeAddress/UpdateHRMSEmp/' + AddressId, udm, this.httpOptions);
  }

  PostEmployeeQualificationDetails(udm) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployeeQuali/CreateHRMSEmployeeQualification', udm, this.httpOptions);
  }

  GetAllEmployeeQualifications(ItemsPerPage: number, pageNo: number, EmployeeId: number) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeQuali/GetAllEmployeeQualificationDetails/' + ItemsPerPage + '/' + pageNo + '/' + EmployeeId, this.httpOptions);
  }

  GetEmployeeQualificationDetailsOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeQuali/GetAllEmployeeQualificationBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }


  DeleteEmployeeQualificationsDetails(EMP_QLNF_ID) {
    return this.http.delete(this.rootUrl + '/api/HRMSEmployeeQuali/DeleteHRMSEmployeeQualification/' + EMP_QLNF_ID, this.httpOptions);
  }

  GetByIdEmployeeQualicationDetails(EMP_QLNF_ID) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeQuali/GetByIdHRMSEmployeeQualification/' + EMP_QLNF_ID, this.httpOptions);
  }

  UpdateEmployeeQualificationDetails(udm, EMP_QLNF_ID) {
    return this.http.put(this.rootUrl + '/api/HRMSEmployeeQuali/UpdateHRMSEmployeeQualification/' + EMP_QLNF_ID, udm, this.httpOptions);
  }

  GetDateDifference(FromDate, ToDate) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeExperience/getDateDiff/' + FromDate + '/' + ToDate, this.httpOptions);
  }

  PostEmployeExperienceDetails(udm) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployeeExperience/CreateHRMSEmployeeExperience', udm, this.httpOptions);
  }

  GetAllEmployeeExperience(ItemsPerPage: number, pageNo: number, EmpId: number) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeExperience/GetAllEmployeeExperienceDetails/' + ItemsPerPage + '/' + pageNo + '/' + EmpId, this.httpOptions);
  }

  GetEmployeeExperienceDetailsOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeExperience/GetAllEmployeeExperienceBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  DeleteEmployeeExperienceDetails(EMP_QLNF_ID) {
    return this.http.delete(this.rootUrl + '/api/HRMSEmployeeExperience/DeleteHRMSEmployeeExperience/' + EMP_QLNF_ID, this.httpOptions);
  }

  GetByIdEmployeeExperienceDetails(EXPR_ID) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeExperience/GetByIdHRMSEmployeeExperience/' + EXPR_ID, this.httpOptions);
  }

  UpdateEmployeeExperienceDetails(udm, EXPR_ID) {
    return this.http.put(this.rootUrl + '/api/HRMSEmployeeExperience/UpdateHRMSEmployeeExperience/' + EXPR_ID, udm, this.httpOptions);
  }

  GetLeaveTypes() {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeLeave/GetEmployeeLaevelist', this.httpOptions);
  }

  PostEmployeeLeaveDetails(udm) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployeeLeave/CreateHRMSEmployeeLeave', udm, this.httpOptions);
  }

  GetAllEmployeeLeaves(ItemsPerPage: number, pageNo: number, EmployeeId: number) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeLeave/GetAllEmployeeLeaveDetails/' + ItemsPerPage + '/' + pageNo + '/' + EmployeeId, this.httpOptions);
  }

  GetEmployeeLeavesOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeLeave/GetAllEmployeeLeavesBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  DeleteEmployeeLeavesDetails(EMP_LEAVE_ID) {
    return this.http.delete(this.rootUrl + '/api/HRMSEmployeeLeave/DeleteEmployeeLeaveDetails/' + EMP_LEAVE_ID, this.httpOptions);
  }

  GetAllhrmsfixedCodes(description) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/GetAllHRMSFixedCodes/' + description, this.httpOptions);
  }

  GetAllCasteCodes() {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/GetAllCasteCodes', this.httpOptions);
  }

  GetAllNomineeDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/NomineeDetails/GetAllNominee/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }

  SearchNominee(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetAllNomineeBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }

  GetNomineeDetails() {

    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetNominee', this.httpOptions);
  }
  GetAllDistricts() {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetDistrict', this.httpOptions);
  }
  GetEmployee(DI_Id) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetEmployee/' + DI_Id, this.httpOptions);
  }

  GetDependent(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetDependent/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }

  GetDependent2(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetDependent/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  GetDependent3(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetDependent/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  GetEmployeeForTheId(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetEmployeeS/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }

  GetRelationshipwith(DEPND_ID) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetrelationWith/' + DEPND_ID, this.httpOptions);
  }
  PostNom(udm) {
    return this.http.post(this.rootUrl + '/api/NomineeDetails/CreateNom', udm, this.httpOptions);
  }
  GetByIdNominee(NMNT_ID) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetByIdNominee/' + NMNT_ID, this.httpOptions);
  }
  UpdateNominee(udm, NMNT_ID) {
    return this.http.put(this.rootUrl + '/api/NomineeDetails/UpdateNominee/' + NMNT_ID, udm, this.httpOptions);
  }
  DeleteNominee(NMNT_ID) {
    return this.http.delete(this.rootUrl + '/api/NomineeDetails/DeleteNominee/' + NMNT_ID, this.httpOptions);
  }
  GetAllTrainingDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/TrainingDetails/GetAllTraining/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  SearchTrainee(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/TrainingDetails/GetAllTrainingBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }

  GetAllDistricts1() {
    return this.http.get(this.rootUrl + '/api/TrainingDetails/GetDistrictT', this.httpOptions);
  }

  GetEmployee1(DI_Id) {
    return this.http.get(this.rootUrl + '/api/TrainingDetails/GetEmployeeT/' + DI_Id, this.httpOptions);
  }
  GetEmployeeForTheId1(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/TrainingDetails/GetEmployeeST/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  GetAllTrainingType() {
    return this.http.get(this.rootUrl + '/api/TrainingDetails/GetTrainingType', this.httpOptions);
  }

  GetAllCategorys() {
    return this.http.get(this.rootUrl + '/api/TrainingDetails/GetTrainingCategory', this.httpOptions);
  }
  uploadImage1(data) {
    return this.http.post(this.rootUrl + '/api/TrainingDetails/image1', data);
  }

  uploadImagetrnsrel(data) {
    return this.http.post(this.rootUrl + '/api/TransferRelievingDetails/transferrelieving', data);
  }

  uploadImagetrnsrep(data) {
    return this.http.post(this.rootUrl + '/api/TransferRelievingDetails/trnsreporting', data);
  }
  uploadImagecomp(data) {
    return this.http.post(this.rootUrl + '/api/CompDetails/image1', data);
  }
  CompDetails

  PostTRN(udm) {
    return this.http.post(this.rootUrl + '/api/TrainingDetails/CreateTRN', udm, this.httpOptions);
  }
  GetByIdTRN(TRAINING_ID) {
    return this.http.get(this.rootUrl + '/api/TrainingDetails/GetByIdTraniee/' + TRAINING_ID, this.httpOptions);
  }
  DeleteTRN(TRAINING_ID) {
    return this.http.delete(this.rootUrl + '/api/TrainingDetails/DeleteTRN/' + TRAINING_ID, this.httpOptions);
  }
  UpdateTRN(udm, TRAINING_ID) {
    return this.http.put(this.rootUrl + '/api/TrainingDetails/UpdateTRN/' + TRAINING_ID, udm, this.httpOptions);
  }

  GetAllExamDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/ExamDetails/GetAllExam/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }

  DeleteExam(EXAMINATION_ID) {
    return this.http.delete(this.rootUrl + '/api/ExamDetails/DeleteExam/' + EXAMINATION_ID, this.httpOptions);
  }
  GetAllDistrictExam() {
    return this.http.get(this.rootUrl + '/api/ExamDetails/GetDistrictEXam', this.httpOptions);
  }
  GetEmployeeExam(DI_Id) {
    return this.http.get(this.rootUrl + '/api/ExamDetails/GetEmployeeE/' + DI_Id, this.httpOptions);
  }
  GetEmployeeForTheIdExam(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/ExamDetails/GetEmployeeDetails/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  GetAllExamType() {
    return this.http.get(this.rootUrl + '/api/ExamDetails/GetExamType', this.httpOptions);
  }


  GetAllCategorysE() {
    return this.http.get(this.rootUrl + '/api/ExamDetails/GetExamCategory', this.httpOptions);
  }
  PostEXM(udm) {
    return this.http.post(this.rootUrl + '/api/ExamDetails/CreateEXM', udm, this.httpOptions);
  }

  GetByIdEXM(EXAMINATION_ID) {
    return this.http.get(this.rootUrl + '/api/ExamDetails/GetByIdExm/' + EXAMINATION_ID, this.httpOptions);
  }

  UpdateEXM(udm, EXAMINATION_ID) {
    return this.http.put(this.rootUrl + '/api/ExamDetails/UpdateEXM/' + EXAMINATION_ID, udm, this.httpOptions);
  }
  GetAllDeputationDetails(itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/DeputDetails/GetAllDeputation/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }

  DeleteDepuation(DEPUTATION_ID) {
    return this.http.delete(this.rootUrl + '/api/DeputDetails/DeleteDeputation/' + DEPUTATION_ID, this.httpOptions);
  }
  GetAllDistrictDeputation() {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetDistrictDeputation', this.httpOptions);
  }


  GetEmployeeDeputation() {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetEmployeeDs', this.httpOptions);
  }
  GetEmployeeForTheIdDeputation(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetEmployeeDetailsD/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  GetAllDeputType() {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetDeputType', this.httpOptions);
  }

  GetAllReport() {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetReport', this.httpOptions);
  }
  GetAllDistrictDeputationDEp() {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetDistrictDeputation', this.httpOptions);
  }
  GetDepartment(DI_Id) {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetDepartmentD/' + DI_Id, this.httpOptions);
  }
  GetByIdDPT(DEPUTATION_ID) {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetByIdDPT/' + DEPUTATION_ID, this.httpOptions);
  }

  PostDPT(udm) {
    return this.http.post(this.rootUrl + '/api/DeputDetails/CreateDPT', udm, this.httpOptions);
  }
  UpdateDPT(udm, DEPUTATION_ID) {
    return this.http.put(this.rootUrl + '/api/DeputDetails/UpdateDeputation/' + DEPUTATION_ID, udm, this.httpOptions);
  }


  GetAllDistrictDeputationA() {
    return this.http.get(this.rootUrl + '/api/DeputAuthDetails/GetDistrictDeputationA', this.httpOptions);
  }
  GetAllDeputationDetailsA(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/DeputAuthDetails/GetAllDeputationA/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  SearchDeputationA(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/DeputAuthDetails/GetAllDeputationBySearchA/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  GetEmployeeForTheIdDetails(EMP_DIVISION_ID) {
    return this.http.get(this.rootUrl + '/api/DeputAuthDetails/GetEmployeeDetailsA/' + EMP_DIVISION_ID, this.httpOptions);
  }

  GetEmployeeForTheIdDetailsTO(EMP_ID) {
    return this.http.get(this.rootUrl + '/api/DeputAuthDetails/GetEmployeeDetailsTO/' + EMP_ID, this.httpOptions);
  }
  GetByIdDPTA(DEPUTATION_ID) {
    return this.http.get(this.rootUrl + '/api/DeputAuthDetails/GetByIdDPTA/' + DEPUTATION_ID, this.httpOptions);
  }
  GetAllTime() {
    return this.http.get(this.rootUrl + '/api/DeputAuthDetails/GetTimeA', this.httpOptions);
  }
  UpdateDPTIn(udm, DEPUTATION_ID) {
    return this.http.put(this.rootUrl + '/api/DeputAuthDetails/UpdateDeputationIn/' + DEPUTATION_ID, udm, this.httpOptions);
  }

  GetByIdLeaveDetails(LeaveId) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeLeave/GetByIdEmployeeLeave/' + LeaveId, this.httpOptions);
  }

  UpdateEmployeeLeaveDetails(udm, LeaveId) {
    return this.http.put(this.rootUrl + '/api/HRMSEmployeeLeave/UpdateHRMSEmployeeLeave/' + LeaveId, udm, this.httpOptions);
  }
  GetAllTransferRelievingDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/TransferRelievingDetails/GetAllTransferRelievingDetails/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }

  GetByIdNomineeAuthorization(NMNT_ID) {
    return this.http.get(this.rootUrl + '/api/NomineeAuthorizationDetails/GetByIdNomineeAuthorization/' + NMNT_ID, this.httpOptions);
  }
  GetEmployeeAuthorizationForTheId(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/NomineeAuthorizationDetails/GetEmployeeAuthorizationForTheId/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  GetDistrictDetailslist() {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetDistrictDetails', this.httpOptions);
  }

  GetEmployeeTransfer() {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetEmployeeTransfer', this.httpOptions);
  }
  GetDistrictDetails2() {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetDistrictDetails', this.httpOptions);
    }
  GetEmployeeDetailsById(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetEmployeeDetailsById/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  GetDistrictDetails1() {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetDistrictDetails', this.httpOptions);
  }

  PostEmployeeBankDetails(udm) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployeeBankDetails/CreateHRMSBankDetails', udm, this.httpOptions);
  }

  GetAllEmployeeBankDetails(ItemsPerPage: number, pageNo: number, EmployeeId: number) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeBankDetails/GetAllEmployeeBankDetailsDetails/' + ItemsPerPage + '/' + pageNo + '/' + EmployeeId, this.httpOptions);
  }

  GetEmployeeBankDetailsOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeBankDetails/GetAllEmployeeBankDetailsBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  DeleteEmployeeBankDetails(BNKACC_ID) {
    return this.http.delete(this.rootUrl + '/api/HRMSEmployeeBankDetails/DeleteHRMSBankDetails/' + BNKACC_ID, this.httpOptions);
  }

  GetByIdBankDetails(LeaveId) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeBankDetails/GetHRMSBankDetailsbyId/' + LeaveId, this.httpOptions);
  }

  UpdateEmployeeBankDetails(udm, LeaveId) {
    return this.http.put(this.rootUrl + '/api/HRMSEmployeeBankDetails/UpdateBankDetails/' + LeaveId, udm, this.httpOptions);
  }

  GetAllRelations() {
    return this.http.get(this.rootUrl + '/api/HRMSEmpDependent/GetReligions', this.httpOptions);
  }

  PostEmployeeDependentDetails(udm) {
    return this.http.post(this.rootUrl + '/api/HRMSEmpDependent/CreateHRMSEmployeeDependent', udm, this.httpOptions);
  }

  GetAllEmployeeDependentDetails(ItemsPerPage: number, pageNo: number, EmployeeId: number) {
    return this.http.get(this.rootUrl + '/api/HRMSEmpDependent/GetAllEmployeeDependentDetails/' + ItemsPerPage + '/' + pageNo + '/' + EmployeeId, this.httpOptions);
  }

  GetEmployeeDependentOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/HRMSEmpDependent/GetAllEmployeeDependentBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  DeleteEmployeeDependentDetails(BNKACC_ID) {
    return this.http.delete(this.rootUrl + '/api/HRMSEmpDependent/DeleteHRMSEmployeeDependent/' + BNKACC_ID, this.httpOptions);
  }


  GetByIdDependentDetails(DependedId) {
    return this.http.get(this.rootUrl + '/api/HRMSEmpDependent/GetByIdEmployeeDependent/' + DependedId, this.httpOptions);
  }

  UpdateEmployeeDependentDetails(udm, DependedId) {
    return this.http.put(this.rootUrl + '/api/HRMSEmpDependent/updatEMPUpdate/' + DependedId, udm, this.httpOptions);
  }


  PostEmployeeVerificationsDetails(udm) {
    return this.http.post(this.rootUrl + '/api/HRMSEmpVerification/CreateHRMSVerificationRepository', udm, this.httpOptions);
  }

  GetAllEmployeeVerifications(ItemsPerPage: number, pageNo: number, EmployeeId: number) {
    return this.http.get(this.rootUrl + '/api/HRMSEmpVerification/GetAllEmployeeDetails/' + ItemsPerPage + '/' + pageNo + '/' + EmployeeId, this.httpOptions);
  }

  GetEmployeeVerificationDetailsOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/HRMSEmpVerification/GetAllEmployeeVeficationDetailsBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }


  DeleteEmployeeVerificationDetails(VRF_ID) {
    return this.http.delete(this.rootUrl + '/api/HRMSEmpVerification/DeleteEmployeeVerification/' + VRF_ID, this.httpOptions);
  }

  GetByIdVerificationDetails(VRF_ID) {
    return this.http.get(this.rootUrl + '/api/HRMSEmpVerification/GetByIdEmployeeVerifications/' + VRF_ID, this.httpOptions);
  }


  UpdateEmployeeVerificationDetails(udm, VRF_ID) {
    return this.http.put(this.rootUrl + '/api/HRMSEmpVerification/UpdateHRMSVerificationRepository/' + VRF_ID, udm, this.httpOptions);
  }

  InsertAttendanceIn(udm) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployeeAttendance/CreateHRMSEmpAttendance', udm, this.httpOptions);
  }

  InsertAttendanceOut(udm) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployeeAttendance/CreateHRMSEmpAttendanceOut', udm, this.httpOptions);
  }

  GetAllAttendace(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/GetAllEmployeeAttendance/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetEmployeeAttendanceDetailsOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/GetAllEmployeeAttendanceBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  GetAllAttendaceById(ATTN_ENTRY_NO: number) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/GetEmpAttendancesbyId/' + ATTN_ENTRY_NO, this.httpOptions);
  }

  DeleteEmployeeAttendanceDetails(ATTN_ENTRY_NO) {
    return this.http.delete(this.rootUrl + '/api/HRMSEmployeeAttendance/DeleteHRMSAttendance/' + ATTN_ENTRY_NO, this.httpOptions);
  }


  getDayDiffrence(FromDate, ToDate) {
    return this.http.get(this.rootUrl + '/api/EmpLeaveApp/GetDateDifference/' + FromDate + '/' + ToDate, this.httpOptions)
  }

  PostEmpLeaveAppdetails(udm) {
    return this.http.post(this.rootUrl + '/api/EmpLeaveApp/CreateEmpLeaveApplication', udm, this.httpOptions);
  }

  GetAllEmployeeLeaveAppDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/EmpLeaveApp/GetAllEmployeeleaveAppDetails/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }


  GetLeaveAppById(LEAVE_APPL_ID: number) {
    return this.http.get(this.rootUrl + '/api/EmpLeaveApp/GetEmpLeaveById/' + LEAVE_APPL_ID, this.httpOptions);
  }

  DeleteLeaveApp(LEAVE_APPL_ID) {
    return this.http.delete(this.rootUrl + '/api/EmpLeaveApp/delete/' + LEAVE_APPL_ID, this.httpOptions);
  }

  PutEmpLeaveAppdetails(udm, LEAVE_APPL_ID) {
    return this.http.put(this.rootUrl + '/api/EmpLeaveApp/UpdateEmpLeaveApplication/' + LEAVE_APPL_ID, udm, this.httpOptions);
  }

  GetEmployeeLeaveAppOnSearch(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/EmpLeaveApp/GetAllEmployeeLeaveAppBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  UpdateAutherization(leaveAppId, remarks, state) {
    return this.http.post(this.rootUrl + '/api/EmpLeaveApp/UpdateAutherization/' + leaveAppId + '/' + remarks + '/' + state, null, this.httpOptions);
  }

  UpdateToHoliday(calendar) {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/UpdateHolidayList/' + calendar, this.httpOptions);
  }

  GetReligions() {
    return this.http.get(this.rootUrl + '/api/ReligionDetails/GetAllReligion', this.httpOptions);
  }

  GetAllScaleslist() {
    return this.http.get(this.rootUrl + '/api/PayScaleDetails/GetallScale', this.httpOptions);
  }


  GetAllCodes(Param: any) {
    return this.http.get(this.rootUrl + '/api/ReligionDetails/GetAllCodes/' + Param, this.httpOptions);
  }

  GetAllCompDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/CompDetails/GetAllComp/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }

  DeleteCMP(COMPLAINT_ID) {
    return this.http.delete(this.rootUrl + '/api/CompDetails/DeleteCMP/' + COMPLAINT_ID, this.httpOptions);
  }
  GetAllDistrictsCmp() {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetDistrictCOmp', this.httpOptions);
  }
  GetEmployeecmp(DI_Id) {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetEmployeeCmp/' + DI_Id, this.httpOptions);
  }
  GetEmployeeForTheId2(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetEmployeedetails/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  uploadImageComp(data) {
    return this.http.post(this.rootUrl + '/api/CompDetails/image1', data);
  }
  PostCMP(udm) {
    return this.http.post(this.rootUrl + '/api/CompDetails/CreateCMP', udm, this.httpOptions);
  }
  GetByIdComplaintReg(COMPLAINT_ID) {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetByIdCompReg/' + COMPLAINT_ID, this.httpOptions);
  }
  UpdateCMP(udm, COMPLAINT_ID) {
    return this.http.put(this.rootUrl + '/api/CompDetails/UpdateCMP/' + COMPLAINT_ID, udm, this.httpOptions);
  }
  GetAllDistrictsCmpAuth() {
    return this.http.get(this.rootUrl + '/api/CompAuthDetails/GetDistrictCOmpAuth', this.httpOptions);
  }
  GetcmpAuth(DI_Id) {
    return this.http.get(this.rootUrl + '/api/CompAuthDetails/GetAllCompAuth/' + DI_Id, this.httpOptions);
  }
  GetEmployeeForTheIdDetails1(EMP_DIVISION_ID) {
    return this.http.get(this.rootUrl + '/api/CompAuthDetails/GetEmployeeDetailsA/' + EMP_DIVISION_ID, this.httpOptions);
  }
  GetComplaintForTheIdDetails(COMPLAINT_ID) {
    return this.http.get(this.rootUrl + '/api/CompAuthDetails/GetComplaintDetailsA/' + COMPLAINT_ID, this.httpOptions);
  }
  GetWitnessForTheIdDetails(COMPLAINT_ID) {
    return this.http.get(this.rootUrl + '/api/CompAuthDetails/GetWitnessDetailsA/' + COMPLAINT_ID, this.httpOptions);
  }
  GetByIdCompalintAuth(COMPLAINT_ID) {
    return this.http.get(this.rootUrl + '/api/CompAuthDetails/GetByIdCompalintAuth/' + COMPLAINT_ID, this.httpOptions);
  }
  UpdateCMPAuth(udm, COMPLAINT_ID) {
    return this.http.put(this.rootUrl + '/api/CompAuthDetails/UpdateCMPAuth/' + COMPLAINT_ID, udm, this.httpOptions);
  }
  GetAllSCNDetails(itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/SCNDetails/GetAllSCN/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetAllComplaintSCN(COMPLAINT_ID) {

    return this.http.get(this.rootUrl + '/api/SCNDetails/GetAllComplaintSCN/' + COMPLAINT_ID, this.httpOptions);
  }

  PostSCN(COMPLAINT_ID, sl: any = []) {

    return this.http.post(this.rootUrl + '/api/SCNDetails/CreateSCN/' + COMPLAINT_ID, sl, this.httpOptions);
  }
  UpdateSCN(SCN_ID, sl: any = []) {
    return this.http.put(this.rootUrl + '/api/SCNDetails/UpdateSCN/' + SCN_ID, sl, this.httpOptions);
  }
  uploadImages12(data) {
    return this.http.post(this.rootUrl + '/api/SCNDetails/image1', data);
  }
  GetByIdSCN(SCN_ID) {
    return this.http.get(this.rootUrl + '/api/SCNDetails/GetByIdSCN/' + SCN_ID, this.httpOptions);
  }
  GetAllDistrictsSCNAuth() {
    return this.http.get(this.rootUrl + '/api/SCNAuthDetails/GetDistrictSCNAuth', this.httpOptions);
  }

  GetSCNAuth(DI_Id) {
    return this.http.get(this.rootUrl + '/api/SCNAuthDetails/GetAllSCNAuth/' + DI_Id, this.httpOptions);
  }
  GetByIdSCNAuth(SCN_ID) {
    return this.http.get(this.rootUrl + '/api/SCNAuthDetails/GetByIdSCNAuth/' + SCN_ID, this.httpOptions);
  }
  GetSCNForTheIdDetails1(SCN_ID) {
    return this.http.get(this.rootUrl + '/api/SCNAuthDetails/GetSCNAutA/' + SCN_ID, this.httpOptions);
  }
  UpdateSCNAuth(udm, SCN_ID) {
    return this.http.put(this.rootUrl + '/api/SCNAuthDetails/UpdateSCNAuth/' + SCN_ID, udm, this.httpOptions);
  }
  GetAllDistrictsReminder() {
    return this.http.get(this.rootUrl + '/api/ReminderDetails/GetDistrictR', this.httpOptions);
  }
  GetSCNReminder(DI_Id) {
    return this.http.get(this.rootUrl + '/api/ReminderDetails/GetAllSCnReminder/' + DI_Id, this.httpOptions);
  }
  GetSCNForTheIdDetailsReminder(SCN_ID) {
    return this.http.get(this.rootUrl + '/api/ReminderDetails/GetSCNReminder/' + SCN_ID, this.httpOptions);
  }
  GetByIdReminder(SCN_ID) {
    return this.http.get(this.rootUrl + '/api/ReminderDetails/GetByIdReminder/' + SCN_ID, this.httpOptions);
  }
  uploadImageR(data) {
    return this.http.post(this.rootUrl + '/api/ReminderDetails/image1', data);
  }
  PostReminder(SCN_ID, reminder: any) {

    return this.http.post(this.rootUrl + '/api/ReminderDetails/CreateReminder/' + SCN_ID, reminder, this.httpOptions);
  }
  UpdateReminder(SCN_REMINDER_ID, reminder: any) {
    return this.http.put(this.rootUrl + '/api/ReminderDetails/UpdateReminder/' + SCN_REMINDER_ID, reminder, this.httpOptions);
  }

  GetAllSCNAckDetails(itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/SCNAckDetails/GetAllSCNAck/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetComplaintAckDetails(COMPLAINT_ID) {
    return this.http.get(this.rootUrl + '/api/SCNAckDetails/GetComplaintDetailsAck/' + COMPLAINT_ID, this.httpOptions);
  }
  GetEmployeeForACk(EMP_DIVISION_ID) {
    return this.http.get(this.rootUrl + '/api/SCNAckDetails/GetEmployeeDetailsAck/' + EMP_DIVISION_ID, this.httpOptions);
  }
  GetSCNForAck(SCN_ID) {
    return this.http.get(this.rootUrl + '/api/SCNAckDetails/GetSCNAutAck/' + SCN_ID, this.httpOptions);
  }
  uploadImagedgo(data) {
    return this.http.post(this.rootUrl + '/api/SCNAckDetails/imagedo', data);
  }
  uploadImageom(data) {
    return this.http.post(this.rootUrl + '/api/SCNAckDetails/imageom', data);
  }
  GetByIdAck(SCN_ID) {
    return this.http.get(this.rootUrl + '/api/SCNAckDetails/GetByIdSCNAck/' + SCN_ID, this.httpOptions);
  }
  PostACK(SCN_ID, SCK: any) {

    return this.http.post(this.rootUrl + '/api/SCNAckDetails/CreateSCNAck/' + SCN_ID, SCK, this.httpOptions);
  }
  UpdateACK(SCN_REPLY_ID, SCK: any) {
    return this.http.put(this.rootUrl + '/api/SCNAckDetails/UpdateSCNAck/' + SCN_REPLY_ID, SCK, this.httpOptions);
  }
  GetAllIDEDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/IDEDetails/GetAllIDE/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  DeleteIDE(ENQUIRY_ID) {
    return this.http.delete(this.rootUrl + '/api/IDEDetails/DeleteIDE/' + ENQUIRY_ID, this.httpOptions);
  }

  GetAllSCNinIDE() {
    return this.http.get(this.rootUrl + '/api/IDEDetails/GetSCN', this.httpOptions);
  }

  GetAllProceeding() {
    return this.http.get(this.rootUrl + '/api/IDEDetails/GetSCN', this.httpOptions);
  }
  GetComplaints(SCN_REPLY_ID) {
    return this.http.get(this.rootUrl + '/api/IDEDetails/GetCmp/' + SCN_REPLY_ID, this.httpOptions);
  }

  GetSCND(SCN_REPLY_ID) {
    return this.http.get(this.rootUrl + '/api/IDEDetails/GetSCND/' + SCN_REPLY_ID, this.httpOptions);
  }

  GetSCk(SCN_REPLY_ID) {
    return this.http.get(this.rootUrl + '/api/IDEDetails/GetSCK/' + SCN_REPLY_ID, this.httpOptions);
  }
  PostIDE(udm) {
    return this.http.post(this.rootUrl + '/api/IDEDetails/CreateIDE', udm, this.httpOptions);
  }
  GetByIdIDE(ENQUIRY_ID) {
    return this.http.get(this.rootUrl + '/api/IDEDetails/GetByIdIDE/' + ENQUIRY_ID, this.httpOptions);
  }
  UpdateIDE(udm, ENQUIRY_ID) {
    return this.http.put(this.rootUrl + '/api/IDEDetails/UpdateIDE/' + ENQUIRY_ID, udm, this.httpOptions);
  } 
  GetAllDepartmentTransfer() {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetAllDepartmentTransfer', this.httpOptions);
  }
  GetAllDesignationTransfer() {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetAllDesignationTransfer', this.httpOptions);
  }
  CreateTRF(udm) {
    return this.http.post(this.rootUrl + '/api/TransferRelievingDetails/CreateTRF', udm, this.httpOptions);
  }
  GetAllProceedingDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/EnqProceedingDetails/GetAllEnqPr/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  DeleteProceeding(ENQUIRY_ID) {
    return this.http.delete(this.rootUrl + '/api/EnqProceedingDetails/DeleteProc/' + ENQUIRY_ID, this.httpOptions);
  }
  SearchProc(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/EnqProceedingDetails/GetAllIDEBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  GetComplaints1(SCN_REPLY_ID) {
    return this.http.get(this.rootUrl + '/api/EnqProceedingDetails/GetCmp1/' + SCN_REPLY_ID, this.httpOptions);
  }

  GetSCND1(SCN_REPLY_ID) {
    return this.http.get(this.rootUrl + '/api/EnqProceedingDetails/GetSCND1/' + SCN_REPLY_ID, this.httpOptions);
  }

  GetSCk1(SCN_REPLY_ID) {
    return this.http.get(this.rootUrl + '/api/EnqProceedingDetails/GetSCK1/' + SCN_REPLY_ID, this.httpOptions);
  }
  GetByIdProceeding(ENQUIRY_ID) {
    return this.http.get(this.rootUrl + '/api/EnqProceedingDetails/GetByIdIDE/' + ENQUIRY_ID, this.httpOptions);
  }
  GetEnqDetails(ENQUIRY_ID) {
    return this.http.get(this.rootUrl + '/api/EnqProceedingDetails/GetEnqDetails/' + ENQUIRY_ID, this.httpOptions);
  }
  PostProc(udm) {
    return this.http.post(this.rootUrl + '/api/EnqProceedingDetails/CreatePROC', udm, this.httpOptions);
  }
  GetAllProceeding1() {
    return this.http.get(this.rootUrl + '/api/EnqProceedingDetails/GetProceeding', this.httpOptions);
  }
  UpdateTRF(udm, transfer_id) {

    return this.http.put(this.rootUrl + '/api/TransferRelievingDetails/UpdateTRF/' + transfer_id, udm, this.httpOptions);
  }

  DeleteSCN(SCN_ID) {
    return this.http.delete(this.rootUrl + '/api/SCNDetails/DeleteSCN/' + SCN_ID, this.httpOptions);
  }

  AddMonthlyTimeRoll(divisionId, month, year, timeRoll_HDR_F) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/AddMonthlyTimeRoll/' + divisionId + '/' + month + '/' + year + '/' + timeRoll_HDR_F, this.httpOptions);
  }

  GetYimeRolList(year, month, division, yearmon) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/GetMonthlyTimeRolList/' + year + '/' + month + '/' + division + '/' + yearmon, this.httpOptions);
  }

  GetAllLeaveBalanceDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/LeaveBalance/GetAllLeaveBalance/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetAllLeaveBalanceDetailsgrid(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/LeaveBalance/GetAllLeaveBalanceforperrticularemplDetails/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }

  GetleaveBalanceList(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/LeaveBalance/GetAllLeaveBalanceforperrticularemplDetails/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }

  updateLeaveCredit(data: any) {

    return this.http.post(this.rootUrl + '/api/LeaveBalance/updateLeaveCredit', data, this.httpOptions);
  }

  GetAllEmployeeNomineeDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetAllEmployeeNomineeDetails/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  GetAllEmployeeTrainingDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/TrainingDetails/GetAllEmployeeTrainingDetails/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  UpdateNomineee(state, remarks, NomId) {
    return this.http.post(this.rootUrl + '/api/NomineeDetails/UpdateNominee/' + state + '/' + remarks + '/' + NomId, null, this.httpOptions);
  }

  UpdateTraining(state, remarks, NomId) {
    return this.http.post(this.rootUrl + '/api/TrainingDetails/UpdateTraining/' + state + '/' + remarks + '/' + NomId, null, this.httpOptions);
  }

  GetAllEmployeeTranferDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetAllEmployeeTranferDetails/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  UpdateTranfer(state, remarks, NomId) {
    return this.http.post(this.rootUrl + '/api/TransferRelievingDetails/UpdateTranfer/' + state + '/' + remarks + '/' + NomId, null, this.httpOptions);
  }

  GetAllEmployeeExamDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ExamDetails/GetAllEmployeeExamDetails/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  UpdateDepartmentExam(state, remarks, NomId) {
    return this.http.post(this.rootUrl + '/api/ExamDetails/UpdateDepartment/' + state + '/' + remarks + '/' + NomId, null, this.httpOptions);
  }

  GetAllDeputationApprovalDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetAllDeputationApprovalDeDetails/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }

  UpdateDeputationDetails(state, remarks, NomId) {
    return this.http.get(this.rootUrl + '/api/DeputDetails/UpdateDeputationApprovalDeDetails/' + state + '/' + remarks + '/' + NomId, this.httpOptions);
  }
 
  GetEnqProcDetails(ENQUIRY_ID) {
    return this.http.get(this.rootUrl + '/api/EnqProceedingDetails/GetEnqProc/' + ENQUIRY_ID, this.httpOptions);
  }

  //Closure form 
  GetAllClosureDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/ClosureDetails/GetAllEnqClosure/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetEnqDetailsInClosure(ENQUIRY_ID) {
    return this.http.get(this.rootUrl + '/api/ClosureDetails/GetEnqDetailsInClosure/' + ENQUIRY_ID, this.httpOptions);
  }
  GetEnqProcDetails1(ENQUIRY_ID) {
    return this.http.get(this.rootUrl + '/api/ClosureDetails/GetEnqProcInClosure/' + ENQUIRY_ID, this.httpOptions);
  }
  GetByIdClosure(ENQUIRY_ID) {
    return this.http.get(this.rootUrl + '/api/ClosureDetails/GetByIdClosure/' + ENQUIRY_ID, this.httpOptions);
  }

  PostClosure(Closure: any) {

    return this.http.post(this.rootUrl + '/api/ClosureDetails/CreateClosure/', Closure, this.httpOptions);
  }

  GetAllMedicalDetails(itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/MedicalDetails/GetAllMedical/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }


  DeleteMedical(MEDI_CLAIM_ID) {
    return this.http.delete(this.rootUrl + '/api/MedicalDetails/DeleteMedical/' + MEDI_CLAIM_ID, this.httpOptions);
  }

  GetAllDistrictMedical() {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetDistrictMedical', this.httpOptions);
  }
  GetEmployeeMedical(DI_Id) {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetEmployeeD/' + DI_Id, this.httpOptions);
  }
  GetEmployeeForTheIdMedical(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetEmployeeDetailsD/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }

  GetAllPatientMedical(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetPatientMedical/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  GetAllhsptllMedical() {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GethsptlMedical', this.httpOptions);
  }
  PostMedical(udm) {
    return this.http.post(this.rootUrl + '/api/MedicalDetails/CreateMedical', udm, this.httpOptions);
  }
  UpdateMedical(udm, MEDI_CLAIM_ID) {
    return this.http.put(this.rootUrl + '/api/MedicalDetails/UpdateMedical/' + MEDI_CLAIM_ID, udm, this.httpOptions);
  }
  uploadImageM(data) {
    return this.http.post(this.rootUrl + '/api/MedicalDetails/imageM', data);
  }

  uploadImageH(data) {
    return this.http.post(this.rootUrl + '/api/MedicalDetails/imageM', data);
  }
  GetByIdMRB(MEDI_CLAIM_ID) {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetByIdMRB/' + MEDI_CLAIM_ID, this.httpOptions);
  }
  UpdateMRB(udm, MEDI_CLAIM_ID) {
    return this.http.put(this.rootUrl + '/api/MedicalDetails/UpdateMedical/' + MEDI_CLAIM_ID, udm, this.httpOptions);
  }

  //approval

  UpdateMedicalApproval(MEDI_CLAIM_ID: any) {
    return this.http.put(this.rootUrl + '/api/MedicalDetails/UpdateMedicalApproval/' + MEDI_CLAIM_ID, this.httpOptions);
  }
  UpdateMedicalApproval2(Remarks: any, MEDI_CLAIM_ID: any) {
    return this.http.put(this.rootUrl + '/api/MedicalDetails/UpdateMedicalApproval2/' + Remarks + "/" + MEDI_CLAIM_ID, this.httpOptions);
  }

  GetAllIncrementingEmployeeList(divisionId, year) {
    return this.http.get(this.rootUrl + '/api/Increment/GetAllIncrementingEmployees/' + divisionId + "/" + year , this.httpOptions);
    }
    GetByIdIncrement(INCREMENT_ID) {
      return this.http.get(this.rootUrl + '/api/Increment/uspIncrementGetById/' + INCREMENT_ID, this.httpOptions);
      }  

  AddIncrement(udm, year) {
    return this.http.post(this.rootUrl + '/api/Increment/AddIncrement/' + year, udm, this.httpOptions);
  }

  GetIncrementList(divisionId) {
    return this.http.get(this.rootUrl + '/api/Increment/GetIncrementList/' + divisionId, this.httpOptions);
  }

  UpdateIncrementApprovals(state, remarks, NomId) {
    return this.http.post(this.rootUrl + '/api/Increment/UpdateIncrementApprovals/' + state + '/' + remarks + '/' + NomId, null, this.httpOptions);
  }

  PostPromotionDetails(udm) {
    return this.http.post(this.rootUrl + '/api/Promotion/CreatePromotion', udm, this.httpOptions);
  }

  GetPromotionList(itemsPerPage: number, pageNo: number, divisionId) {

    return this.http.get(this.rootUrl + '/api/Promotion/GetPromotionList/' + itemsPerPage + "/" + pageNo + "/" + divisionId, this.httpOptions);
  }

  UpdatePromotionApprovals(state, remarks, NomId) {
    return this.http.post(this.rootUrl + '/api/Promotion/UpdatePromotionApprovals/' + state + '/' + remarks + '/' + NomId, null, this.httpOptions);
  }

  PostEmployeeSeperation(udm) {
    return this.http.post(this.rootUrl + '/api/EmpSeperation/EmployeeSeration', udm, this.httpOptions);
  }

  GetEmployeeSeperationList(divisionId) {
    return this.http.get(this.rootUrl + '/api/EmpSeperation/EmployeeSeration/' + divisionId, this.httpOptions);
  }

  UpdateEmployeeSeration(state, remarks, NomId) {
    return this.http.post(this.rootUrl + '/api/EmpSeperation/UpdateEmployeeSeration/' + state + '/' + remarks + '/' + NomId, null, this.httpOptions);
  }

  GetAllRetiredEmployeeIds(divisionId, Date) {
    return this.http.get(this.rootUrl + '/api/EmpSeperation/AllEmployeeListForRetirement/' + divisionId + '/' + Date, this.httpOptions);
  }

  getRetirementDate(EmpId) {
    return this.http.get(this.rootUrl + '/api/EmpSeperation/RetirementDate/' + EmpId, this.httpOptions);
  }

  GetAllHospitals() {
    return this.http.get(this.rootUrl + '/api/HospitalDetails/GetAllHospitals', this.httpOptions);
  }

  GetBasicSalary(scaleId) {
    return this.http.get(this.rootUrl + '/api/PayScaleDetails/GetBasicSalary/' + scaleId, this.httpOptions);
  }

  GetAllHolidayList() {
    return this.http.get(this.rootUrl + '/api/HolidayDetails/GetAllHolidayDetialsForDuplication', this.httpOptions);
  }
  
  GetAllDistrictMedicalSanc() {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetDistrictMedical', this.httpOptions);
  }
  UpdateMedicalSanction(MEDI_CLAIM_ID: any) {
    return this.http.put(this.rootUrl + '/api/MedicalDetails/UpdateMedicalSanction/' + MEDI_CLAIM_ID, null, this.httpOptions);
  } LVENCASH_ID
  UpdateMedicalSanction2(Remarks: any, MEDI_CLAIM_ID: any) {
    return this.http.put(this.rootUrl + '/api/MedicalDetails/UpdateMedicalSancttion2/' + Remarks + "/" + MEDI_CLAIM_ID, this.httpOptions);
  }
  GetAllHTCDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/HTCDetails/GetAllHTC/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }

  DeleteHTC(LVCONS_ID) {
    return this.http.delete(this.rootUrl + '/api/HTCDetails/DeleteHTC/' + LVCONS_ID, this.httpOptions);
  }

  GetAllDistrictsHTC() {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetDistrictCOmp', this.httpOptions);
  }
  GetEmployeeHTC(DI_Id) {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetEmployeeCmp/' + DI_Id, this.httpOptions);
  }
  GetEmployeeForTheIdHTC(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetEmployeedetails/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  PostHTC(udm) {
    return this.http.post(this.rootUrl + '/api/HTCDetails/CreateHTC', udm, this.httpOptions);
  }
  UpdateHTC(udm, LVCONS_ID) {
    return this.http.put(this.rootUrl + '/api/HTCDetails/UpdateHTCl/' + LVCONS_ID, udm, this.httpOptions);
  }



  GetByIdHTC(LVCONS_ID) {
    return this.http.get(this.rootUrl + '/api/HTCDetails/GetByIdHTC/' + LVCONS_ID, this.httpOptions);
  }


  GetAllDistrictsHTCapproval() {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetDistrictCOmp', this.httpOptions);
  }

  UpdateHTCpproval(MEDI_CLAIM_ID: any) {
    return this.http.put(this.rootUrl + '/api/HTCDetails/UpdateHTCApproval/' + MEDI_CLAIM_ID, null, this.httpOptions);
  }
  UpdateHTCpproval1(Remarks: any, MEDI_CLAIM_ID: any) {
    return this.http.put(this.rootUrl + '/api/HTCDetails/UpdateHTCApproval1/' + Remarks + "/" + MEDI_CLAIM_ID, null, this.httpOptions);
  }
  GetAllDistrictHTCSan() {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetDistrictMedical', this.httpOptions);
  }


  UpdateHTCSanction(LVCONS_ID: any) {
    return this.http.put(this.rootUrl + '/api/HTCDetails/UpdateHTCSanction/' + LVCONS_ID, null, this.httpOptions);
  }
  UpdateHTCSancttion2(Remarks: any, LVCONS_ID: any) {
    return this.http.put(this.rootUrl + '/api/HTCDetails/UpdateHTCSancttion2/' + Remarks + "/" + LVCONS_ID, null, this.httpOptions);
  }
  //leave
  GetAllLeaveDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/LeaveEDetails/GetAllLeave/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  DeleteLeaves(LVENCASH_ID) {
    return this.http.delete(this.rootUrl + '/api/LeaveEDetails/DeleteLeaveE/' + LVENCASH_ID, this.httpOptions);
  }

  GetAllDistrictsleave() {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetDistrictCOmp', this.httpOptions);
  }

  GetEmployeeleave(DI_Id) {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetEmployeeCmp/' + DI_Id, this.httpOptions);
  }
  GetEmployeeForTheIdleave(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetEmployeedetails/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }
  GetAllLeaveList() {
    return this.http.get(this.rootUrl + '/api/LeaveEDetails/GetLeaveList', this.httpOptions);
  }
  PostLeaves(udm) {
    return this.http.post(this.rootUrl + '/api/LeaveEDetails/CreateLeave', udm, this.httpOptions);
  }
  GetByIdLeaveTC(LVENCASH_ID) {
    return this.http.get(this.rootUrl + '/api/LeaveEDetails/GetByIdLeaveTC/' + LVENCASH_ID, this.httpOptions);
  }
  UpdateLeave(udm, LVENCASH_ID) {
    return this.http.put(this.rootUrl + '/api/LeaveEDetails/UpdateLeavel/' + LVENCASH_ID, udm, this.httpOptions);
  }
  GetAllDistrictLeavsan() {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetDistrictMedical', this.httpOptions);
  }
  GetAllDistrictLeaveApp() {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetDistrictMedical', this.httpOptions);
  }

  UpdatLeaveApproval(LVENCASH_ID: any) {
    return this.http.put(this.rootUrl + '/api/LeaveEDetails/UpdateLeaveCApproval/' + LVENCASH_ID, null, this.httpOptions);
  }
  UpdateLeaveApproval1(Remarks: any, MEDI_CLAIM_ID: any) {
    return this.http.put(this.rootUrl + '/api/LeaveEDetails/UpdateLeaveApproval1/' + Remarks + "/" + MEDI_CLAIM_ID, null, this.httpOptions);
  }



  UpdatencashmentApproval(LE_Id: any) {
    return this.http.put(this.rootUrl + '/api/LeaveEDetails/UpdateLeaveCApproval/' + LE_Id, null, this.httpOptions);
  }
  UpdateEncahmentApproval1(state:any,Comments: any, LE_Id: any) {
    return this.http.post(this.rootUrl + '/api/LeaveEDetails/UpdateleaveencashSan/' + state+"/"+Comments + "/" + LE_Id, null, this.httpOptions);
  }
  
  
  UpdateLeaveSanction2(Remarks: any, LVENCASH_ID: any) {
    return this.http.put(this.rootUrl + '/api/LeaveEDetails/UpdateLeaveSancttion2/' + Remarks + "/" + LVENCASH_ID, null, this.httpOptions);
  }
  UpdateleaveSanction(LVENCASH_ID: any) {
    return this.http.put(this.rootUrl + '/api/LeaveEDetails/UpdateLeaveSanction/' + LVENCASH_ID, null, this.httpOptions);
  }

  GetByIdProc(PROCEEDING_ID) {
    return this.http.get(this.rootUrl + '/api/EnqProceedingDetails/GetByIdProceeddin/' + PROCEEDING_ID, this.httpOptions);
  }
  UpdateProc(udm, PROCEEDING_ID) {
    return this.http.put(this.rootUrl + '/api/EnqProceedingDetails/UpdateprOC/' + PROCEEDING_ID, udm, this.httpOptions);
  }
  DeleteProc(PROCEEDING_ID) {
    return this.http.delete(this.rootUrl + '/api/EnqProceedingDetails/DeleteProc/' + PROCEEDING_ID, this.httpOptions);
  }
  //reporting form

  GetAllReportingDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/TransferRelievingDetails/GetAllTransferReportingDetails/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetEmployeeForTheIdDetailTs(EMP_DIVISION_ID) {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetEmployeeDetailsA/' + EMP_DIVISION_ID, this.httpOptions);
  }
  GetEmployeeForTheIdDetailsTO1(EMP_ID) {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetEmployeeDetailsTO/' + EMP_ID, this.httpOptions);
  }
  GetByIdTRFA(transfer_id) {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetByIdTRFA/' + transfer_id, this.httpOptions);
  }
  UpdateTRFIn(udm, transfer_id) {
    return this.http.put(this.rootUrl + '/api/TransferRelievingDetails/UpdateTRFIn/' + transfer_id, udm, this.httpOptions);
  }
  GetNomineeBenifitDetails() {

    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetBenfitsnom', this.httpOptions);
  }

  GetAllEmployeesSpeedSearch(code, divisionId) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/GetAllEmployeesSpeedSearch/' + code + '/' + divisionId, this.httpOptions);
  }

  GetAllCalendarList() {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/GetAllCalenderforDuplication', this.httpOptions);
  }

  GetAllEMPLeaveDetialsforDuplication(EmployeeId) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeLeave/GetAllEMPLeaveDetialsforDuplication/' + EmployeeId, this.httpOptions);
  }

  getLeaveBalance(EmpId, LeaveTypeId) {
    return this.http.get(this.rootUrl + '/api/EmpLeaveApp/getLeaveBalance/' + EmpId + '/' + LeaveTypeId, this.httpOptions)
  }
  GetByIdTRF(transfer_id) {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetByIdTRFA/' + transfer_id, this.httpOptions);
  }

  getDivisionId(userName: any) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/getDivisionId/' + userName, this.httpOptions);
  }
  Updatecomppproval(MEDI_CLAIM_ID: any) {
    return this.http.put(this.rootUrl + '/api/CompAuthDetails/UpdateCompApproval/' + MEDI_CLAIM_ID, null, this.httpOptions);
  }
  UpdateComppproval1(Remarks: any, MEDI_CLAIM_ID: any) {
    return this.http.put(this.rootUrl + '/api/CompAuthDetails/UpdateCompApproval1/' + Remarks + "/" + MEDI_CLAIM_ID, null, this.httpOptions);
  }
  UpdateScnAppproval(SCN_ID: any) {
    return this.http.put(this.rootUrl + '/api/SCNAuthDetails/UpdateSCNpApproval/' + SCN_ID, null, this.httpOptions);
  }
  UpdateScnproval1(Remarks: any, SCN_ID: any) {
    return this.http.put(this.rootUrl + '/api/SCNAuthDetails/UpdateSCNpApproval1/' + Remarks + "/" + SCN_ID, null, this.httpOptions);
  }
  uploadImageTrf(data) {
    return this.http.post(this.rootUrl + '/api/TrainingDetails/image1', data);
  }
  GetByIdEmployeeTransfer(transfer_id) {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetByIdEmployeeTransfer/' + transfer_id, this.httpOptions);
  }
  GetAllDistrictsComplaintapproval() {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetDistrictCOmp', this.httpOptions);
  }

  GetPresentData(EmpId) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployee/GetoriginalData/' + EmpId, this.httpOptions);
  }

  GetMonthlyCalendarList() {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/GetMonthlyCalendarList', this.httpOptions);
  }

  InsertMonthly_Timeroll_HDR(divisionId, month_year) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/InsertMonthly_Timeroll_HDR/' + divisionId + '/' + month_year, this.httpOptions);
  }

  GetAllMonthlyTimerollHDR() {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/GetAllMonthlyTimerollHDR', this.httpOptions);
  }

  uspgettimerolllistFortherepeatationcheck() {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/uspgettimerolllistFortherepeatationcheck', this.httpOptions);
  }

  GetLeaveBulkList(divisionId, LeaveType) {
    return this.http.get(this.rootUrl + '/api/LeaveBalance/GetLeaveBulkList/' + divisionId + '/' + LeaveType, this.httpOptions);
  }


  AddTimeroll(udm, year, month, yearmonth, divisionId) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployeeAttendance/AddTimeroll/' + year + '/' + month + '/' + yearmonth + '/' + divisionId, udm, this.httpOptions);
  }
  Addmpnthlyattendence(udm, year, month, yearmonth, divisionId) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployeeAttendance/AddMonthlyattendance/' + year + '/' + month + '/' + yearmonth + '/' + divisionId, udm, this.httpOptions);
  }
  UpdateTimeRoll(udm, year, month, yearmonth, divisionId, TimerollId) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployeeAttendance/UpdateTimeRoll/' + year + '/' + month + '/' + yearmonth + '/' + divisionId + '/' + TimerollId, udm, this.httpOptions);
  }

  GenerateTime(year, month, yearmonth, divisionId,desg_Id) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/GenearteRolList/' + year + '/' + month + '/' + yearmonth + '/' + divisionId + '/' + desg_Id , this.httpOptions);
  }

  GetAllTimerollList() {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/uspGetlistforApprovals', this.httpOptions);
  }

  uspGetTimerolllists() {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/uspGetTimerolllists', this.httpOptions);
  }
  

  GetAllTimerollListforsanction() {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/uspGetlistforSanction', this.httpOptions);
  }


  uspUpdateStatusTimeRoll(TIMEROLL_ID, remarks, state) {
    return this.http.post(this.rootUrl + '/api/HRMSEmployeeAttendance/uspUpdateStatusTimeRoll/' + TIMEROLL_ID + '/' + remarks + '/' + state, null, this.httpOptions);
  }

  getTimeRollListbyId(TimeRollId) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/getTimeRollListbyId/' + TimeRollId, this.httpOptions);
  }
  viewencashment(LE_Id) {
    return this.http.get(this.rootUrl + '/api/LeaveEDetails/GetByIdLeaveencashment/' + LE_Id, this.httpOptions);
  }
  getmonthlyListbyId(MA_ID) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/getmonthlyattendancebyId/' + MA_ID, this.httpOptions);
  }
  viewMonthly(year_month) {
    return this.http.get(this.rootUrl + '/api/PayrollProcess/GetByIdPayMonth/' + year_month, this.httpOptions);
  }
  CreateLeavecredit(udm, leavecreditType) {
    return this.http.post(this.rootUrl + '/api/Leavecredit/CreateLeavecredit/' + leavecreditType, udm, this.httpOptions);
  }

  getAllleavecreditsingleDetails() {
    return this.http.get(this.rootUrl + '/api/Leavecredit/getAllleavecreditsingleDetails', this.httpOptions);
  }

  getAllleavecreditBulkDetails() {
    return this.http.get(this.rootUrl + '/api/Leavecredit/getAllleavecreditBulkDetails', this.httpOptions);
  }

  getleavecreditsingleDetailsbyId(leavecreditType) {
    return this.http.get(this.rootUrl + '/api/Leavecredit/getleavecreditsingleDetailsbyId/' + leavecreditType, this.httpOptions);
  }

  //TRF Recoders
  GetAllTRFRecoredsDetails(DI_Id, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/TransferRelievingDetails/GetAllTRFRecoredsDetails/' + DI_Id + "/" + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }


  //deputation

  GetAllDPTSanDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetAllSanDeputation/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }


  UpdateDPTSan(state, remarks, NomId) {
    return this.http.post(this.rootUrl + '/api/DeputDetails/UpdateDPTSan/' + state + '/' + remarks + '/' + NomId, null, this.httpOptions);
  }
  GetAllDeputationRecDetails(DI_Id, itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/DeputDetails/GetAllDeputationRec/' + DI_Id + "/" + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetAllMedicalRecDetails(DI_Id) {
    return this.http.get(this.rootUrl + '/Api/MedicalDetails/GetAllMedicalRECDetials/' + DI_Id, this.httpOptions);
  }

  GetAllHTCRecDetails(DI_Id) {
    return this.http.get(this.rootUrl + '/Api/HTCDetails/GetAllHTCRECDetials/' + DI_Id, this.httpOptions);
  }
  GetAllLeaveRECDetials(DI_Id) {
    return this.http.get(this.rootUrl + '/Api/LeaveEDetails/GetAllLeaveRECDetials/' + DI_Id, this.httpOptions);
  }
  GetAllMedicalDetailsRECS(DI_Id, itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/MedicalDetails/GetAllMedicalRECs/' + DI_Id + "/" + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetAllHTCDetailsRECS(DI_Id, itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/HTCDetails/GetAllHTCRECs/' + DI_Id + "/" + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetAllLeaveDetailsRECS(DI_Id, itemsPerPage: number, pageNo: number,) {
    return this.http.get(this.rootUrl + '/Api/LeaveEDetails/GetAllLeaveREC/' + DI_Id + "/" + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }

  GetAllNomSanDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetAllNomineeSan/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }
  UpdateNomSan(state, remarks, NMNT_ID) {
    return this.http.post(this.rootUrl + '/api/NomineeDetails/UpdateNomineeSAN/' + state + '/' + remarks + '/' + NMNT_ID, null, this.httpOptions);
  }
  GetAllNOMRFRecoredsDetails(DI_Id, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/NomineeDetails/GetAllNOMRecoredsDetails/' + DI_Id + "/" + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetAllDeptsanDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ExamDetails/GetAllExamsan/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }
  UpdateExamSan(state, remarks, EXAMINATION_ID) {
    return this.http.post(this.rootUrl + '/api/ExamDetails/UpdateExamSan/' + state + '/' + remarks + '/' + EXAMINATION_ID, null, this.httpOptions);
  }
  GetTreatmentDetails(MEDI_CLAIM_ID) {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetByIdTreatment/' + MEDI_CLAIM_ID, this.httpOptions);
  }
  GetAllTRnSanDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/TrainingDetails/GetAllTrainingsanDetails/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }
  UpdateTraoiningSan(state, remarks, TRAINING_ID) {
    return this.http.post(this.rootUrl + '/api/TrainingDetails/UpdateTraing/' + state + '/' + remarks + '/' + TRAINING_ID, null, this.httpOptions);
  }
  GetAllComapliantauthDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetAllCompApproval/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }
  UpdateApprvl(state, remarks, COMPLAINT_ID) {
    return this.http.post(this.rootUrl + '/api/CompDetails/UpdateApproval/' + state + '/' + remarks + '/' + COMPLAINT_ID, null, this.httpOptions);
  }

  GetAllSCNAuthDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/SCNDetails/GetAllSCNAuth/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }
  UpdateApprvlSCN(state, remarks, COMPLAINT_ID) {
    return this.http.post(this.rootUrl + '/api/SCNDetails/UpdateApproval/' + state + '/' + remarks + '/' + COMPLAINT_ID, null, this.httpOptions);
  }

  //external enq
  GetAllExeternalDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/enqDetails/GetAllExeternalEnq/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }



  DeleteExternalDeatil(EEN_ID) {
    return this.http.delete(this.rootUrl + '/api/enqDetails/DeleteExertnal/' + EEN_ID, this.httpOptions);
  }
  PostExternal(udm) {
    return this.http.post(this.rootUrl + '/api/enqDetails/CreateExternalDepDetials', udm, this.httpOptions);
  }
  uploadImageenq(data) {
    return this.http.post(this.rootUrl + '/api/enqDetails/imageee', data);
  }

  GetByIdExternal(EEN_ID) {
    return this.http.get(this.rootUrl + '/api/enqDetails/GetByIdExTernal/' + EEN_ID, this.httpOptions);
  }

  UpdateExternal(udm, EEN_ID) {
    return this.http.put(this.rootUrl + '/api/enqDetails/UpdateExternal/' + EEN_ID, udm, this.httpOptions);
  }
  //external enclousr
  GetAllExeternalEnqEnclosr(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/enqDetails/GetAllExeternalEnqEnclosr/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  GetEnqExtDetails(EEN_ID) {
    return this.http.get(this.rootUrl + '/api/enqDetails/GetEnqDetailsInClosure/' + EEN_ID, this.httpOptions);
  }
  GetByIdClosures(EEN_ID) {
    return this.http.get(this.rootUrl + '/api/enqDetails/GetByIdClosure/' + EEN_ID, this.httpOptions);
  }
  UpdateextClosure(udm, ENQUIRY_ID) {
    return this.http.put(this.rootUrl + '/api/enqDetails/UpdateIDE/' + ENQUIRY_ID, udm, this.httpOptions);
  }
  PostClosures(Closure: any) {

    return this.http.post(this.rootUrl + '/api/enqDetails/CreateClosure/', Closure, this.httpOptions);
  }
  DeleteTRF(transfer_id) {
    return this.http.delete(this.rootUrl + '/api/TransferRelievingDetails/DeleteTRF/' + transfer_id, this.httpOptions);
  }
  GetAllTranfersanDetails(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetAllTranfersanDetails/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }
  UpdateTranferSan(state, remarks, NomId) {
    return this.http.post(this.rootUrl + '/api/TransferRelievingDetails/UpdateTranferSan/' + state + '/' + remarks + '/' + NomId, null, this.httpOptions);
  }

  getleavecreditBulkDetailsbyId(leavecreditId) {
    return this.http.get(this.rootUrl + '/api/Leavecredit/uspGetLeavecreditBulkById/' + leavecreditId, this.httpOptions);
  }

  uspGetLeavecreditforApproveSanction(id, type) {
    return this.http.get(this.rootUrl + '/api/Leavecredit/uspGetLeavecreditforApproveSanction/' + id + '/' + type, this.httpOptions);
  }

  UpdateLeaveCreditAutherization(LEAVE_CREDIT_ID, remarks, state) {
    return this.http.get(this.rootUrl + '/api/Leavecredit/uspUpdateLeaveCreditstatus/' + LEAVE_CREDIT_ID + '/' + remarks + '/' + state, this.httpOptions);
  }

  uspGetLeavecreditBulkforApproveSanction(id, type) {
    return this.http.get(this.rootUrl + '/api/Leavecredit/uspGetLeavecreditBulkforApproveSanction/' + id + '/' + type, this.httpOptions);
  }

  GetAllEmployeeApprovalLeaveDetails(ItemsPerPage: number, pageNo: number, District: number) {
    return this.http.get(this.rootUrl + '/api/EmpLeaveApp/GetAllEmployeeApprovalLeaveDetails/' + ItemsPerPage + '/' + pageNo + '/' + District, this.httpOptions);
  }

  GetAllEmployeeSanctionLeaveDetails(ItemsPerPage: number, pageNo: number, District: number) {
    return this.http.get(this.rootUrl + '/api/EmpLeaveApp/GetAllEmployeeSanctionLeaveDetails/' + ItemsPerPage + '/' + pageNo + '/' + District, this.httpOptions);
  }


  GetAllIncrementDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/Increment/GetAllIncrementDetails/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }


  InsertpayrollEarningDeduction(udm) {
    return this.http.post(this.rootUrl + '/api/PayrollEarningDedu/InsertpayrollEarningDeduction', udm, this.httpOptions);
  }

  GetAllAllowanceDeductionCode(ItemsPerPage: number, pageNo: number, param: string) {
    return this.http.get(this.rootUrl + '/api/PayrollEarningDedu/GetAllAllowanceDeductionCode/' + ItemsPerPage + '/' + pageNo + '/' + param, this.httpOptions);
  }

  uspGetEllowanceDedductionById(code) {
    return this.http.get(this.rootUrl + '/api/PayrollEarningDedu/uspGetEllowanceDedductionById/' + code, this.httpOptions);
  }
  uspEditPayrollAllowanceDeduction(udm, code) {
    return this.http.post(this.rootUrl + '/api/PayrollEarningDedu/uspEditPayrollAllowanceDeduction/' + code, udm, this.httpOptions);
  }

  uspPayEarnDedDelete(code) {
    return this.http.delete(this.rootUrl + '/api/PayrollEarningDedu/uspPayEarnDedDelete/' + code, this.httpOptions);
  }

  GetAllAllowanceDeductionCodeonSearch(ItemsPerPage: number, pageNo: number, param: string, SearchValue: string, SearchBy: string) {
    return this.http.get(this.rootUrl + '/api/PayrollEarningDedu/GetAllAllowanceDeductionCodeonSearch/' + ItemsPerPage + '/' + pageNo + '/' + param + '/' + SearchValue + '/' + SearchBy, this.httpOptions);
  }

  uspGetMaximumCalendar() {
    return this.http.get(this.rootUrl + '/api/CalenderDetails/uspGetMaximumCalendar', this.httpOptions);
  }

  GetAllAllowanceCode() {
    return this.http.get(this.rootUrl + '/api/Formula/GetAllDedCodes', this.httpOptions);
  }
  InsertpayrollFormula(udm) {
    return this.http.post(this.rootUrl + '/api/Formula/InsertpayrollFormula', udm, this.httpOptions);
  }
  GetAllPayrollFormula(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Formula/GetAllPayrollFormula/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }
  GetByIdFormula(Id) {
    return this.http.get(this.rootUrl + '/api/Formula/GetByIdFormula/' + Id, this.httpOptions);
  }
  UpdatepayrollFormula(udm, Id) {
    return this.http.put(this.rootUrl + '/api/Formula/UpdatepayrollFormula/' + Id, udm, this.httpOptions);
  }
  GetAllPayrollFormulaOnserach(ItemsPerPage: number, pageNo: number, searchBy: string, searchvalue: string) {
    return this.http.get(this.rootUrl + '/api/Formula/GetAllPayrollFormulaOnserach/' + ItemsPerPage + '/' + pageNo + '/' + searchBy + '/' + searchvalue, this.httpOptions);
  }

  InsertIncomeTax(udm) {
    return this.http.post(this.rootUrl + '/api/IncomeTax/CreateIncomeTax', udm, this.httpOptions);
  }

  GetAllIncomeTax() {
    return this.http.get(this.rootUrl + '/api/IncomeTax/GetIncomeTax', this.httpOptions);
  }

  GetIncomeTaxById(id) {
    return this.http.get(this.rootUrl + '/api/IncomeTax/GetIncomeTaxById/' + id, this.httpOptions);
  }

  UpdateIncomeTax(udm, Id) {
    return this.http.put(this.rootUrl + '/api/IncomeTax/UpdateIncomeTax/' + Id, udm, this.httpOptions);
  }

  InsertProfessionalTax(udm) {
    return this.http.post(this.rootUrl + '/api/ProfessionalTax/CreateProfessionalTax', udm, this.httpOptions);
  }

  GetAllProfessionalTax() {
    return this.http.get(this.rootUrl + '/api/ProfessionalTax/GetAllProfessionalTax', this.httpOptions);
  }

  GetProfessionalTaxById(id) {
    return this.http.get(this.rootUrl + '/api/ProfessionalTax/GetByIdProfessionalTax/' + id, this.httpOptions);
  }

  updateProfessionalTax(udm, id) {
    return this.http.post(this.rootUrl + '/api/ProfessionalTax/updateProfessionalTax/' + id, udm, this.httpOptions);
  }

  ValidateIncrementList(year) {
    return this.http.get(this.rootUrl + '/api/Increment/ValidateIncrementList/' + year, this.httpOptions);
  }

  GetAllEmployeesofPay_emp() {
    return this.http.get(this.rootUrl + '/api/EmployeeSalaryData/GetEmployeeDetails', this.httpOptions);
  }

  GetEmployeeDetailsbyId(Id: number) {
    return this.http.get(this.rootUrl + '/api/EmployeeSalaryData/GetEmployeeDetailsbyId/' + Id, this.httpOptions);
  }

  GetAllAllowanceDeductionCodeforSalaryStructure(FV_Id: string, ED_Type: string) {
    return this.http.get(this.rootUrl + '/api/EmployeeSalaryData/GetAllAllowanceDeductionCodeforSalaryStructure/' + FV_Id + '/' + ED_Type, this.httpOptions);
  }

  uspAllowaDeductionDuplicationCheck() {
    return this.http.get(this.rootUrl + '/api/EmployeeSalaryData/uspAllowaDeductionDuplicationCheck', this.httpOptions);
  }

  insert(code: any, Emp_code: string) {
    return this.http.post(this.rootUrl + '/api/EmployeeSalaryData/insert/' + Emp_code, code, this.httpOptions);
  }

  inseinsertDataVariablert(code: any, Emp_code: string) {
    return this.http.post(this.rootUrl + '/api/EmployeeSalaryData/insertDataVariable/' + Emp_code, code, this.httpOptions);
  }

  GetCalendar() {
    return this.http.get(this.rootUrl + '/api/PayrollProcess/GetCalendar', this.httpOptions);
  }

  GetAttendanceandLeaves(monthCode) {
    return this.http.get(this.rootUrl + '/api/PayrollProcess/GetAttendanceandLeavesList/' + monthCode, this.httpOptions);
  }


  ProcessPayroll(monthCode) {
    return this.http.get(this.rootUrl + '/api/PayrollProcess/PayrollProcessData/' + monthCode, this.httpOptions);
  }

  PayrollProcessDataFinalized(monthCode) {
    return this.http.get(this.rootUrl + '/api/PayrollProcess/PayrollProcessDataFinalized/' + monthCode, this.httpOptions);
  }

  DisableAllowanceDeductionforAnEmployee(EMP_EMPLOYEE_ID) {
    return this.http.get(this.rootUrl + '/api/EmployeeSalaryData/DisableAllowanceDeductionforAnEmployee/' + EMP_EMPLOYEE_ID, this.httpOptions);
  }

  GetallowanceDeduction(yearmonth, emp_id, fv, cat) {
    return this.http.get(this.rootUrl + '/api/PayrollProcess/GetallowanceDeduction/' + yearmonth + '/' + emp_id + '/' + fv + '/' + cat, this.httpOptions);
  }

  GetMonthlyCalendarPayrollProcessed() {
    return this.http.get(this.rootUrl + '/api/PayrollProcess/GetMonthlyCalendarPayrollProcessed', this.httpOptions);
  }

  GetEmployeeDetailsforPayRollProcesss(Emp_id, yearMonth) {
    return this.http.get(this.rootUrl + '/api/PayrollProcess/getEmployeeDetails/' + Emp_id + '/' + yearMonth, this.httpOptions);
  }

  getallcodesforFormulas() {
    return this.http.get(this.rootUrl + '/api/Formula/getallcodesforFormulas', this.httpOptions);
  }

  uspVerifyFormula(udm: any) {

    return this.http.post(this.rootUrl + '/api/Formula/uspVerifyFormula', udm, this.httpOptions);
  }

  hrmsPayrollInfoForEachEmployee(emp_id, fv, cat) {
    return this.http.get(this.rootUrl + '/api/EmployeeSalaryData/hrmsPayrollInfoForEachEmployee/' + emp_id + '/' + fv + '/' + cat, this.httpOptions);
  }

  //
  SearchDeptExam(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/ExamDetails/GetAllExamBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  GetAllExamDetailsRec(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/ExamDetails/GetAllExamRec/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  SearchNomineeApp(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetAllNomineOnSearchApp/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  GetAllNomineeRecDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/NomineeDetails/GetAllNOMRecoredsDetails/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }

  GetAllPromotionDetails(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/Promotion/GetAllPromotionDetails/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  DeletePromotion(PROMOTION_LIST_ID) {
    return this.http.delete(this.rootUrl + '/api/Promotion/DeletePromotion/' + PROMOTION_LIST_ID, this.httpOptions);
  }
  GetAllPromotionBySearch(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Promotion/GetAllPromotionBySearch/' + searchCriteria + "/" + searchText + "/" + itemsPerPage + "/" + pageNo, this.httpOptions);
  }
  GetByIdPromotion(PROMOTION_LIST_ID) {
    return this.http.get(this.rootUrl + '/api/Promotion/GetByIdPromotion/' + PROMOTION_LIST_ID, this.httpOptions);
  }
  UpdatePromotion(PROMOTION_LIST_ID, udm) {
    return this.http.post(this.rootUrl + '/api/Promotion/UpdatePromotion/' + PROMOTION_LIST_ID, udm, this.httpOptions);
  }
  GetPromotionSanctionList(itemsPerPage: number, pageNo: number, divisionId) {
    return this.http.get(this.rootUrl + '/api/Promotion/GetPromotionSanctionList/' + itemsPerPage + "/" + pageNo + "/" + divisionId, this.httpOptions);
  }
  SearchtraineesearchApp(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/TrainingDetails/GetAllTrainingBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  Searchtransferdetails(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/TransferRelievingDetails/GetAllTransferRelievingBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  SearchMedical(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetAllMedicalBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  GetAllMedicalDetialsSanc(itemsPerPage: number, pageNo: number, DI_Id) {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetAllMedicalDetialsSanc/' + itemsPerPage + "/" + pageNo + "/" + DI_Id, this.httpOptions);
  }
  GetMedicalApproval(itemsPerPage: number, pageNo: number, DI_Id) {
    return this.http.get(this.rootUrl + '/api/MedicalDetails/GetAllmedicalApproval/' + itemsPerPage + "/" + pageNo + "/" + DI_Id, this.httpOptions);
  }
  SearchLeaves(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/LeaveEDetails/GetAllHTCBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  GetAllLeaveDetialsSanc(itemsPerPage: number, pageNo: number, DI_Id) {
    return this.http.get(this.rootUrl + '/api/LeaveEDetails/GetAllLeaveDetialsSanc/' + itemsPerPage + "/" + pageNo + "/" + DI_Id, this.httpOptions);
  }
  GeLeaveApproval(itemsPerPage: number, pageNo: number, DI_Id) {
    return this.http.get(this.rootUrl + '/api/LeaveEDetails/GetAllLeaveApproval/' + itemsPerPage + "/" + pageNo + "/" + DI_Id, this.httpOptions);
  }
  GetAllLeaveEncashment(itemsPerPage: number, pageNo: number, DI_Id) {
    return this.http.get(this.rootUrl + '/api/LeaveEDetails/GetAllLeaveApproval/' + itemsPerPage + "/" + pageNo + "/" + DI_Id, this.httpOptions);
  }
  GetAllLeaveEncashmentofficer(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/LeaveEDetails/GetAllLeaveencashment/' + itemsPerPage + "/" + pageNo , this.httpOptions);
  }
  
  SearchHTC(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/HTCDetails/GetAllHTCBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  GetAllHTCDetialsSanc(itemsPerPage: number, pageNo: number, DI_Id) {
    return this.http.get(this.rootUrl + '/api/HTCDetails/GetAllHTCDetialsSanc/' + itemsPerPage + "/" + pageNo + "/" + DI_Id, this.httpOptions);
  }
  GetHTCApproval(itemsPerPage: number, pageNo: number, DI_Id) {
    return this.http.get(this.rootUrl + '/api/HTCDetails/GetAllHTCApproval/' + itemsPerPage + "/" + pageNo + "/" + DI_Id, this.httpOptions);
  }
  SearchSCN(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/SCNDetails/GetAllScnBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  SearchIDE(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/IDEDetails/GetAllIDEBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  SearchExternalenq(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/enqDetails/GetAllExternalEnqBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  SearchComp(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/CompDetails/GetAllCompBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  GetAllTrainingDetailsRec(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/Api/TrainingDetails/GetAllTrainingRec/' + itemsPerPage + "/" + pageNo + "/", this.httpOptions);
  }
  SearchDeputation(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/DeputDetails/GetAllDeputationBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
  }
  GetBillListBysearch(udm) {
    return this.http.post(this.rootUrl + '/api/AdvocatePayment/GetBillListBysearch', udm, this.httpOptions);
  }

  // tender 
  PostTender(udm) {
    return this.http.post(this.rootUrl + '/api/TechnicalTender/CreateTechnicalTender', udm, this.httpOptions);
  }
  GetAllTechnicalTender(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/TechnicalTender/GetAllTechnicalTender/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  GetByIdTender(Tender_id) {
    return this.http.get(this.rootUrl + '/api/TechnicalTender/GetByIdTender/' + Tender_id, this.httpOptions);
  }

  DeleteTender(Tender_id) {
    return this.http.delete(this.rootUrl + '/api/TechnicalTender/DeleteTender/' + Tender_id, this.httpOptions);
  }

  UpdateTender(Tender_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/TechnicalTender/UpdateTender/' + Tender_id, udm, this.httpOptions);
  }

  GetAllProjecttender() {
    return this.http.get(this.rootUrl + '/api/TechnicalTender/GetAllTenderProjects/', this.httpOptions);
  }

  uploadTenderImage(data) {
    return this.http.post(this.rootUrl + '/api/TechnicalTender/Upload_Tender_Image/', data);
  }

  uploadPublicationImage(data) {
    return this.http.post(this.rootUrl + '/api/TechnicalTender/Upload_Publication_Image/', data);
  }
  uploadTenderImageforedit(data) {
    return this.http.post(this.rootUrl + '/api/TechnicalTender/Upload_Tender_Image_Edit/', data);
  }
  uploadPublicationImageforedit(data) {
    return this.http.post(this.rootUrl + '/api/TechnicalTender/Upload_Publication_Image_Edit/', data);
  }
  SearchTender(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/TechnicalTender/GetAllTenderBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  //staffmob
  PostStaffmob(udm) {
    return this.http.post(this.rootUrl + '/api/Staff_Mob_Demobilization_Controller/CreateStaffMobDemob/', udm, this.httpOptions);
  }

  GetAllProjectstaffmob() {

    return this.http.get(this.rootUrl + '/api/Staff_Mob_Demobilization_Controller/GetAllStaffMobDemoProjects/', this.httpOptions);
  }
  GetAllAreastaffmob() {
    return this.http.get(this.rootUrl + '/api/Staff_Mob_Demobilization_Controller/GetAllStaffMobDemoDistrict/', this.httpOptions);
  }
  GetByIdStaff(staff_mob_demob_id) {
    return this.http.get(this.rootUrl + '/api/Staff_Mob_Demobilization_Controller/GetByIdStaffMobDemob/' + staff_mob_demob_id, this.httpOptions);
  }

  UpdateStaff(staff_mob_demob_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/Staff_Mob_Demobilization_Controller/UpdateStaffMobDemob/' + staff_mob_demob_id, udm, this.httpOptions);
  }
  GetAllStaff(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/Staff_Mob_Demobilization_Controller/GetAllStaffMobDemobdetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchStaff(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/Staff_Mob_Demobilization_Controller/GetAllStaffBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteStaff(staff_mob_demob_id) {
    return this.http.delete(this.rootUrl + '/api/Staff_Mob_Demobilization_Controller/DeleteStaffMobDemob/' + staff_mob_demob_id, this.httpOptions);
  }
  //Equipment
  PostEquipment(udm) {
    return this.http.post(this.rootUrl + '/api/EquipmentMobController/CreateEquipmentMobDemob/', udm, this.httpOptions);
  }
  GetAllAreaEquipment() {
    return this.http.get(this.rootUrl + '/api/EquipmentMobController/GetAllEquipmentMobDemoDistrict/', this.httpOptions);
  }
  GetAllProjectEquipment() {
    return this.http.get(this.rootUrl + '/api/EquipmentMobController/GetAllEquipmentMobDemoProjects/', this.httpOptions);
  }
  GetByIdEquipment(equipmobdemob_id) {
    return this.http.get(this.rootUrl + '/api/EquipmentMobController/GetByIdEquipmentMobDemob/' + equipmobdemob_id, this.httpOptions);
  }
  UpdateEquipment(equipmobdemob_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/EquipmentMobController/UpdateEquipmentMobDemob/' + equipmobdemob_id, udm, this.httpOptions);
  }
  GetAllEquipment(itemsPerPage: number, PageNo: number) {

    return this.http.get(this.rootUrl + '/api/EquipmentMobController/GetAllEquipmentMobDemobdetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchEquipment(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/EquipmentMobController/GetAllEquipmentBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  SearchPaymonthly(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/PayrollProcess/GetAllPayrollmonthsearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }

  Searchmonthlylist(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/HRMSEmployeeAttendance/GetAllmonthlyattendanceforsearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteEquipment(equipmobdemob_id) {
    return this.http.delete(this.rootUrl + '/api/EquipmentMobController/DeleteEquipmentMobDemob/' + equipmobdemob_id, this.httpOptions);
  }
  //Baseline BOQ
  PostBaseline(udm) {
    return this.http.post(this.rootUrl + '/api/BaselineBOQ_Controller/CreateBaselineBOQ/', udm, this.httpOptions);
  }
  GetAllProjectBaseline() {
    return this.http.get(this.rootUrl + '/api/BaselineBOQ_Controller/GetAllBaselineBOQProjects/', this.httpOptions);
  }
  GetByIdBaseline(Baseline_BOQ_Id) {
    return this.http.get(this.rootUrl + '/api/BaselineBOQ_Controller/GetByIdBaselineBOQ/' + Baseline_BOQ_Id, this.httpOptions);
  }
  UpdateBaseline(Baseline_BOQ_Id: number, udm) {
    return this.http.put(this.rootUrl + '/api/BaselineBOQ_Controller/UpdateBaselineBOQ/' + Baseline_BOQ_Id, udm, this.httpOptions);
  }
  GetAllBaseline(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/BaselineBOQ_Controller/GetAllBaselineBOQdetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchBaseline(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/BaselineBOQ_Controller/GetAllBaselineBOQSearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteBaseline(Baseline_BOQ_Id) {
    return this.http.delete(this.rootUrl + '/api/BaselineBOQ_Controller/DeleteBaselineBOQ/' + Baseline_BOQ_Id, this.httpOptions);
  }
  //Project Activity
  PostProjectActivity(udm) {
    return this.http.post(this.rootUrl + '/api/ProjectActivityJobController/CreateProjectActivityJob/', udm, this.httpOptions);
  }
  GetAllDistrictActivity() {
    return this.http.get(this.rootUrl + '/api/ProjectActivityJobController/GetAllProjectActivityJobDistrict/', this.httpOptions);
  }
  GetAllProjectCodeActivity() {
    return this.http.get(this.rootUrl + '/api/ProjectActivityJobController/GetAllProjectActivityJobProjects/', this.httpOptions);
  }
  GetByIdProjectActivity(ProjectActivityJob_id) {
    return this.http.get(this.rootUrl + '/api/ProjectActivityJobController/GetByIdProjectActivityJob/' + ProjectActivityJob_id, this.httpOptions);
  }
  UpdateProjectActivity(ProjectActivityJob_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/ProjectActivityJobController/UpdateProjectActivityJob/' + ProjectActivityJob_id, udm, this.httpOptions);
  }
  GetAllProjectActivity(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/ProjectActivityJobController/GetAllProjectActivityJob/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchProjectActivity(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/ProjectActivityJobController/GetAllProjectActivityJob/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteProjectActivity(ProjectActivityJob_id) {
    return this.http.delete(this.rootUrl + '/api/ProjectActivityJobController/DeleteProjectActivityJob/' + ProjectActivityJob_id, this.httpOptions);
  }

  PostJobgroup(udm) {
    return this.http.post(this.rootUrl + '/api/Job_Group_Controller/CreateJobGroup/', udm, this.httpOptions);
  }
  GetByIdJobgroup(jobgroup_id) {
    return this.http.get(this.rootUrl + '/api/Job_Group_Controller/GetByIdJobGroup/' + jobgroup_id, this.httpOptions);
  }
  UpdateJobgroup(jobgroup_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/Job_Group_Controller/UpdateJobGroup/' + jobgroup_id, udm, this.httpOptions);
  }
  GetAllJobgroup(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/Job_Group_Controller/GetAllJobGroupdetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchJobgroup(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/Job_Group_Controller/GetAllJobGroupBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteJobgroup(jobgroup_id) {
    return this.http.delete(this.rootUrl + '/api/Job_Group_Controller/DeleteJobGroup/' + jobgroup_id, this.httpOptions);
  }
  //Structures
  PostStructures(udm) {
    return this.http.post(this.rootUrl + '/api/StructureController/CreateStructure/', udm, this.httpOptions);
  }
  GetByIdStructures(Structure_id) {
    return this.http.get(this.rootUrl + '/api/StructureController/GetByIdStructure/' + Structure_id, this.httpOptions);
  }
  UpdateStructures(Structure_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/StructureController/UpdateStructure/' + Structure_id, udm, this.httpOptions);
  }
  GetAllStructures(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/StructureController/GetAllStructuredetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchStructures(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/StructureController/GetAllStructureBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteStructures(Structure_id) {
    return this.http.delete(this.rootUrl + '/api/StructureController/DeleteStructure/' + Structure_id, this.httpOptions);
  }

  PostStructurePlanning(udm) {
    return this.http.post(this.rootUrl + '/api/StructurePlanningController/CreateStructurePlanning/', udm, this.httpOptions);
  }
  GetAllProjectStructurePlanning() {
    return this.http.get(this.rootUrl + '/api/StructurePlanningController/GetAllStructurePlanningProjects/', this.httpOptions);
  }
  GetByIdStructurePlanning(StructPlan_id) {
    return this.http.get(this.rootUrl + '/api/StructurePlanningController/GetByIdStructurePlanning/' + StructPlan_id, this.httpOptions);
  }
  UpdateStructurePlanning(StructPlan_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/StructurePlanningController/UpdateStructurePlanning/' + StructPlan_id, udm, this.httpOptions);
  }
  GetAllStructurePlanning(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/StructurePlanningController/GetAllStructurePlanningdetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchStructurePlanning(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/StructurePlanningController/GetAllStructurePlanningBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteStructurePlanning(StructPlan_id) {
    return this.http.delete(this.rootUrl + '/api/StructurePlanningController/DeleteStructurePlanning/' + StructPlan_id, this.httpOptions);
  }
  //Job
  PostJob(udm) {
    return this.http.post(this.rootUrl + '/api/Job_Controller/CreateJob/', udm, this.httpOptions);
  }
  GetAllGroupcode() {
    return this.http.get(this.rootUrl + '/api/Job_Controller/GetAllJobGroup/', this.httpOptions);
  }
  GetByIdJob(Job_id) {
    return this.http.get(this.rootUrl + '/api/Job_Controller/GetByIdJob/' + Job_id, this.httpOptions);
  }
  UpdateJob(Job_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/Job_Controller/UpdateJob/' + Job_id, udm, this.httpOptions);
  }
  GetAllJob(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/Job_Controller/GetAllJob/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchJob(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/Job_Controller/GetAllJobBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteJob(Job_id) {
    return this.http.delete(this.rootUrl + '/api/Job_Controller/DeleteJob/' + Job_id, this.httpOptions);
  }
  //BOQ Item
  PostBOQItem(udm) {
    return this.http.post(this.rootUrl + '/api/BOQItem_Controller/CreateBOQItem/', udm, this.httpOptions);
  }
  GetByIdBOQItem(boq_item_id) {
    return this.http.get(this.rootUrl + '/api/BOQItem_Controller/GetByIdBOQItem/' + boq_item_id, this.httpOptions);
  }
  UpdateBOQItem(boq_item_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/BOQItem_Controller/UpdateBOQItem/' + boq_item_id, udm, this.httpOptions);
  }
  GetAllBOQItem(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/BOQItem_Controller/GetAllBOQItem/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchBOQItem(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/BOQItem_Controller/GetAllBOQItemBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteBOQItem(boq_item_id) {
    return this.http.delete(this.rootUrl + '/api/BOQItem_Controller/DeleteBOQItem/' + boq_item_id, this.httpOptions);
  }
  PostMilestone(udm) {
    return this.http.post(this.rootUrl + '/api/PhaseMilestone_Controller/CreatePhaseMilestone/', udm, this.httpOptions);
  }
  GetByIdmilestone(phase_milestone_id) {
    return this.http.get(this.rootUrl + '/api/PhaseMilestone_Controller/GetByIdPhaseMilestone/' + phase_milestone_id, this.httpOptions);
  }
  Updatemilestone(phase_milestone_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/PhaseMilestone_Controller/UpdatePhaseMilestone/' + phase_milestone_id, udm, this.httpOptions);
  }
  GetAllMilestone(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/PhaseMilestone_Controller/GetAllPhaseMilestone/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchMilestone(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/PhaseMilestone_Controller/GetAllPhaseMilestoneBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteMilestone(phase_milestone_id) {
    return this.http.delete(this.rootUrl + '/api/PhaseMilestone_Controller/DeleteMilestone/' + phase_milestone_id, this.httpOptions);
  }
  //phase schedule
  PostSchedule(udm) {
    return this.http.post(this.rootUrl + '/api/PhaseScheduleController/CreatePhaseSchedule/', udm, this.httpOptions);
  }
  GetAllProjectSchedule() {
    return this.http.get(this.rootUrl + '/api/PhaseScheduleController/GetAllPhaseScheduleProjects/', this.httpOptions);
  }
  GetByIdSchedule(PhaseSchedule_id) {
    return this.http.get(this.rootUrl + '/api/PhaseScheduleController/GetByIdPhaseSchedule/' + PhaseSchedule_id, this.httpOptions);
  }
  UpdateSchedule(PhaseSchedule_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/PhaseScheduleController/UpdatePhaseSchedule/' + PhaseSchedule_id, udm, this.httpOptions);
  }
  GetAllSchedule(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/PhaseScheduleController/GetAllPhaseScheduledetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchSchedule(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/PhaseScheduleController/GetAllPhaseScheduleBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteSchedule(PhaseSchedule_id) {
    return this.http.delete(this.rootUrl + '/api/PhaseScheduleController/DeletePhaseSchedule/' + PhaseSchedule_id, this.httpOptions);
  }
  //COntract Document
  PostContractDocument(udm) {
    return this.http.post(this.rootUrl + '/api/ConstractorDocumentController/CreateConstractorDocument/', udm, this.httpOptions);
  }
  GetAllProjectContractdoc() {
    return this.http.get(this.rootUrl + '/api/ConstractorDocumentController/GetAllConstractorDocumentProjects/', this.httpOptions);
  }
  GetAllContractorfordoc() {
    return this.http.get(this.rootUrl + '/api/ConstractorDocumentController/GetAllContractorfordoc/', this.httpOptions);
  }
  uploadcontractordoc(data) {
    return this.http.post(this.rootUrl + '/api/ConstractorDocumentController/Upload_ContractorDoc/', data);
  }
  uploadcontractorEdit(data) {
    return this.http.post(this.rootUrl + '/api/ConstractorDocumentController/Upload_ContractorDocEdit/', data);
  }
  GetByIdContractdpcument(ContractorDoc_id) {
    return this.http.get(this.rootUrl + '/api/ConstractorDocumentController/GetByIdConstractorDocument/' + ContractorDoc_id, this.httpOptions);
  }
  UpdateContractdocument(ContractorDoc_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/ConstractorDocumentController/UpdateConstractorDocument/' + ContractorDoc_id, udm, this.httpOptions);
  }
  GetAllContractdocument(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/ConstractorDocumentController/GetAllConstractorDocumentdetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchContractdoc(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/ConstractorDocumentController/GetAllConstractorDocumentBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteContractdoc(ContractorDoc_id) {
    return this.http.delete(this.rootUrl + '/api/ConstractorDocumentController/DeleteConstractorDocument/' + ContractorDoc_id, this.httpOptions);
  }
  //COntractor
  PostContractor(udm) {
    return this.http.post(this.rootUrl + '/api/Contractor_Controller/CreateContractor/', udm, this.httpOptions);
  }
  GetByIdContractor(Contractor_id) {
    return this.http.get(this.rootUrl + '/api/Contractor_Controller/GetByIdContractor/' + Contractor_id, this.httpOptions);
  }
  UpdateContractor(Contractor_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/Contractor_Controller/UpdateContractor/' + Contractor_id, udm, this.httpOptions);
  }
  GetAllContractor(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/Contractor_Controller/GetAllContractor/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchContractor(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/Contractor_Controller/GetAllContractorBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteContractor(Contractor_id) {
    return this.http.delete(this.rootUrl + '/api/Contractor_Controller/DeleteContractor/' + Contractor_id, this.httpOptions);
  }
  //Project Encumbrance
  PostProjectEncumbrance(udm) {
    return this.http.post(this.rootUrl + '/api/ProjectEncumbranceController/CreateProjectEncumbrance/', udm, this.httpOptions);
  }
  GetAllProjectEncumbrance() {
    return this.http.get(this.rootUrl + '/api/ProjectEncumbranceController/GetAllProjectEncumbrancesProjects/', this.httpOptions);
  }
  GetAllContractorProjectEncumbrance() {
    return this.http.get(this.rootUrl + '/api/ProjectEncumbranceController/GetAllContractor/', this.httpOptions);
  }
  GetAllEncumbrancedropdown() {
    return this.http.get(this.rootUrl + '/api/ProjectEncumbranceController/GetAllEncumbrancesDropdown/', this.httpOptions);
  }
  GetByIdEncumbrance(Projencumb_id) {
    return this.http.get(this.rootUrl + '/api/ProjectEncumbranceController/GetByIdProjectEncumbrances/' + Projencumb_id, this.httpOptions);
  }
  UpdateEncumbrance(Projencumb_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/ProjectEncumbranceController/UpdateProjectEncumbrance/' + Projencumb_id, udm, this.httpOptions);
  }
  GetAllEncumbrance(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/ProjectEncumbranceController/GetAllProjectEncumbrancesdetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchEncumbrance(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/ProjectEncumbranceController/GetAllProjectEncumbrancesBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteEncumbrance(Projencumb_id) {
    return this.http.delete(this.rootUrl + '/api/ProjectEncumbranceController/DeleteProjectEncumbrances/' + Projencumb_id, this.httpOptions);
  }
  // Project Encumbrance Type
  PostProjectEncumbranceType(udm) {
    return this.http.post(this.rootUrl + '/api/Proencumbtype_Controller/CreateProencumbtype/', udm, this.httpOptions);
  }
  GetByIdEncumbranceType(encumb_id) {
    return this.http.get(this.rootUrl + '/api/Proencumbtype_Controller/GetByIdproencumbtype/' + encumb_id, this.httpOptions);
  }
  UpdateEncumbranceType(encumb_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/Proencumbtype_Controller/Updateproencumbtype/' + encumb_id, udm, this.httpOptions);
  }
  GetAllEncumbranceType(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/Proencumbtype_Controller/GetAllProencumbtype/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchEncumbranceType(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/Proencumbtype_Controller/GetAllProencumbtypeOnSearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteEncumbranceType(encumb_id) {
    return this.http.delete(this.rootUrl + '/api/Proencumbtype_Controller/DeleteProencumbtype/' + encumb_id, this.httpOptions);
  }
  //Encumbrance Quantum
  PostEncumbranceQuantum(udm) {
    return this.http.post(this.rootUrl + '/api/EncumbranceQuantumController/CreateEncumbranceQuantum/', udm, this.httpOptions);
  }
  GetAllProjectEncumbranceQuantum() {
    return this.http.get(this.rootUrl + '/api/EncumbranceQuantumController/GetAllEncumbranceQuantumProjects/', this.httpOptions);
  }
  GetAllContractorEncumbranceQuantum() {
    return this.http.get(this.rootUrl + '/api/EncumbranceQuantumController/GetAllEncumbranceQuantumContractor/', this.httpOptions);
  }
  GetByIdEncumbranceQuantum(EncumbranceQuantum_id) {
    return this.http.get(this.rootUrl + '/api/EncumbranceQuantumController/GetByIdEncumbranceQuantum/' + EncumbranceQuantum_id, this.httpOptions);
  }
  UpdateEncumbranceQuantum(EncumbranceQuantum_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/EncumbranceQuantumController/UpdateEncumbranceQuantum/' + EncumbranceQuantum_id, udm, this.httpOptions);
  }
  GetAllEncumbranceQuantum(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/EncumbranceQuantumController/GetAllEncumbranceQuantumdetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchEncumbranceQuantum(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/EncumbranceQuantumController/GetAllEncumbranceQuantumBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteEncumbranceQuantum(EncumbranceQuantum_id) {
    return this.http.delete(this.rootUrl + '/api/EncumbranceQuantumController/DeleteEncumbranceQuantum/' + EncumbranceQuantum_id, this.httpOptions);
  }
  //Design Issue Type
  PostDesignIssueType(udm) {
    return this.http.post(this.rootUrl + '/api/Desisstype_Controller/CreateDesisstype/', udm, this.httpOptions);
  }
  GetByIdDesignIssueType(desisstype_id) {
    return this.http.get(this.rootUrl + '/api/Desisstype_Controller/GetByIdDesisstype/' + desisstype_id, this.httpOptions);
  }
  UpdateDesignIssueType(desisstype_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/Desisstype_Controller/UpdateDesisstype/' + desisstype_id, udm, this.httpOptions);
  }
  GetAllDesignIssueType(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/Desisstype_Controller/GetAllDesisstype/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchDesignIssueType(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/Desisstype_Controller/GetAllDesisstypeBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteDesignIssueType(EncumbranceQuantum_id) {
    return this.http.delete(this.rootUrl + '/api/Desisstype_Controller/DeleteDesisstype/' + EncumbranceQuantum_id, this.httpOptions);
  }
  //Contractor Shedule Extension
  PostScheduleExtension(udm) {
    return this.http.post(this.rootUrl + '/api/ContractorScheduleExtensionController/CreateContractorScheduleExtension/', udm, this.httpOptions);
  }
  GetAllProjectScheduleExtension() {
    return this.http.get(this.rootUrl + '/api/ContractorScheduleExtensionController/GetAllContScheduleExtensionProjects/', this.httpOptions);
  }
  GetAllContractorScheduleExtension() {
    return this.http.get(this.rootUrl + '/api/ContractorScheduleExtensionController/GetAllContScheduleExtensionContractor/', this.httpOptions);
  }
  GetByIdScheduleExtension(ContScheduleExt_id) {
    return this.http.get(this.rootUrl + '/api/ContractorScheduleExtensionController/GetByIdContScheduleExtension/' + ContScheduleExt_id, this.httpOptions);
  }
  UpdateScheduleExtension(ContScheduleExt_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/ContractorScheduleExtensionController/UpdateContractorScheduleExtension/' + ContScheduleExt_id, udm, this.httpOptions);
  }
  GetAllScheduleExtension(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/ContractorScheduleExtensionController/GetAllContScheduleExtensiondetails/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchScheduleExtension(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/ContractorScheduleExtensionController/GetAllContScheduleExtensionBySearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteScheduleExtension(ContScheduleExt_id) {
    return this.http.delete(this.rootUrl + '/api/ContractorScheduleExtensionController/DeleteContScheduleExtension/' + ContScheduleExt_id, this.httpOptions);
  }
  //Design Issue
  PostDesignIssue(udm) {
    return this.http.post(this.rootUrl + '/api/Designissue_Controller/CreateDesignissue/', udm, this.httpOptions);
  }
  GetAllProjectDesignIssue() {
    return this.http.get(this.rootUrl + '/api/Designissue_Controller/GetAllProjectsfordesiss/', this.httpOptions);
  }
  GetAllContractorDesignIssue() {
    return this.http.get(this.rootUrl + '/api/Designissue_Controller/GetAllContractorsfordesiss/', this.httpOptions);
  }
  GetAllDesignIssueTypedropdown() {
    return this.http.get(this.rootUrl + '/api/Designissue_Controller/GetAllDesisstypefordesiss/', this.httpOptions);
  }
  GetByIdDesignIssue(desiss_id) {
    return this.http.get(this.rootUrl + '/api/Designissue_Controller/GetByIdDesignissue/' + desiss_id, this.httpOptions);
  }
  UpdateDesignIssue(desiss_id: number, udm) {
    return this.http.put(this.rootUrl + '/api/Designissue_Controller/UpdateDesignissue/' + desiss_id, udm, this.httpOptions);
  }
  GetAllDesignIssue(itemsPerPage: number, PageNo: number) {
    return this.http.get(this.rootUrl + '/api/Designissue_Controller/GetAllDesignissue/' + itemsPerPage + '/' + PageNo, this.httpOptions);
  }
  SearchDesignIssue(ItemsPerPage, pageno, searchBy, searchValue) {
    return this.http.get(this.rootUrl + '/api/Designissue_Controller/GetAllDesignissueOnSearch/' + ItemsPerPage +
      '/' + pageno + '/' + searchBy + '/' + searchValue, this.httpOptions);
  }
  DeleteDesignIssue(desiss_id) {
    return this.http.delete(this.rootUrl + '/api/Designissue_Controller/DeleteDesignissue/' + desiss_id, this.httpOptions);
  }
  //new API starts
  GetAllApplicantdetailsBySearch(searchText: any) {
    return this.http.get(this.rootUrl + '/api/CustomerDetails/GetAllCustomerBySearch/' + searchText, this.httpOptions);
  }
  GetAllNotificationListforapplicant(itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/NotificationsforApplicant/GetAllNotificationListforapplicant/' + itemsPerPage + "/" + pageNo);
  }
  getAllDistrictNameforapplicant() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllDistrict');
  }
  getCategoryforapplicant() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllCategory');
  }
  getRelationsforapplicant() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllRelations');
  }
  getRelegionsforapplicant() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllRelegions');
  }
  getReservationsforapplicant() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllReservations');
  }
  getProjectDetailsforApplicant(NO_Id, PD_Id) {
    return this.http.get(this.rootUrl + '/api/NotificationsforApplicant/GetProjectDetails/' + NO_Id + "/" + PD_Id);
  }
  GetAllBanksforApplicant(NO_Id) {
    return this.http.get(this.rootUrl + '/api/NotificationsforApplicant/GetAllBanks/' + NO_Id);
  }
  saveApplicationforApplicant(data: any) {
    return this.http.post(this.rootUrl + '/api/NotificationsforApplicant/', data);
  }
  calculateAgeforApplicant(dateOfBirth) {
    return this.http.get(this.rootUrl + '/api/NotificationsforApplicant/calculateAge/' + dateOfBirth);
  }
  PostRti(data: any) {
    return this.http.post(this.rootUrl + '/api/RTIApplicant/CreateRTIApplicant/', data);
  }
  uploadsupportdocRti(data) {
    return this.http.post(this.rootUrl + '/api/RTIApplicant/Upload_rappsupportingdoc/', data);
  }
  uploadDocRti(data) {
    return this.http.post(this.rootUrl + '/api/RTIApplicant/Upload_rapprequestdoc/', data);
  }
  GetAllRTIApplicants(ItemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/RTIApplicant/GetAllRTIApplicants/' + ItemsPerPage + '/' + pageNo, this.httpOptions);
  }
  GetByIdRTIApplicants(rtiappid) {
    return this.http.get(this.rootUrl + '/api/RTIApplicant/GetByIdRTIApplicant/' + rtiappid, this.httpOptions);
  }
  UpdateRTIApplicants(rtiappid: number, udm) {
    return this.http.put(this.rootUrl + '/api/RTIApplicant/UpdateRTIApplicant/' + rtiappid, udm, this.httpOptions);
  }
//  Reservation
PostReservation(data: any) {
  return this.http.post(this.rootUrl + '/api/Reservation/CreateReservation', data, this.httpOptions);
 }
 GetByIdReservation(RES_Id) {
  return this.http.get(this.rootUrl + '/api/Reservation/GetByIdReservation/' + RES_Id, this.httpOptions);
 }
 UpdateReservation(udm, RES_Id) {
  return this.http.put(this.rootUrl + '/api/Reservation/UpdateReservation/' + RES_Id, udm, this.httpOptions);
 } 
 GetReservationDetails(itemsPerPage: any, pageNo: any) {
  return this.http.get(this.rootUrl + '/api/Reservation/GetAllReservations/' + itemsPerPage + "/" + pageNo, this.httpOptions);
 }
 DeleteReservation(RES_Id) {
  return this.http.delete(this.rootUrl + '/api/Reservation/DeleteReservation/' + RES_Id, this.httpOptions);
 }
 SearchReservation(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
  return this.http.get(this.rootUrl + '/api/Reservation/GetAllReservationBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
 }
 //freehold
 GetAllFreeholddetailsBySearch(searchText: any) {
  return this.http.get(this.rootUrl + '/api/Revenue/GetfreeholdcalcbyAppNo/' + searchText, this.httpOptions);
}
 //refund calculation
 GetAllRefunddetailsBySearch(searchText: any) {
  return this.http.get(this.rootUrl + '/api/Revenue/GetRefundcalcbyAppNo/' + searchText, this.httpOptions);
}
//defaulters
GetAllProjectdefaulter() {
  return this.http.get(this.rootUrl + '/api/Defaulter/GetAllProjectsForDefaulter', this.httpOptions);
}
GetAllPhasedefaulter() {
  return this.http.get(this.rootUrl + '/api/Defaulter/GetAllPhaseDefaulter', this.httpOptions);
}
GETDefaultersList(Phase_Id: any, PD_Id: any,) {
  return this.http.get(this.rootUrl + '/api/Defaulter/GetDefaulterDetail/' + Phase_Id + "/" + PD_Id , this.httpOptions);
}
//ekhata
GetAllApplication() {
  return this.http.get(this.rootUrl + '/api/EKhata/GetAllApplicantionNoForEkhata', this.httpOptions);
}
GetAllPropertyekhata(APP_Id) {
  return this.http.get(this.rootUrl + '/api/EKhata/GetPropertyNo/'+ APP_Id, this.httpOptions);
}
getAllEkhataList(APP_No: any, PR_Property_No: any) {
  return this.http.get(this.rootUrl + '/api/EKhata/GetEKhataDetail/' + APP_No + "/" + PR_Property_No, this.httpOptions);
}
//maintenance fee
saveInstallPayment(data: any) {
  return this.http.post(this.rootUrl + '/api/MaintenanceFee/SaveMaintenanceFee', data, this.httpOptions);
}
GetBYIdmaintenance(APP_No) {
  return this.http.get(this.rootUrl + '/api/MaintenanceFee/GetByAPP_IdMaintainanceFee/' + APP_No, this.httpOptions);
}
// leasedeed
GetAllApplicationlease() {
  return this.http.get(this.rootUrl + '/api/LeaseDeed/GetAllApplicantionNoForLeaseDeed', this.httpOptions);
}
GetAllPropertylease(APP_Id:any) {
  return this.http.get(this.rootUrl + '/api/LeaseDeed/GetPropertyNoLeaseDeed/'+ APP_Id, this.httpOptions);
}
GeteaedeedLists(APP_No: any, PR_Property_No: any) {
  return this.http.get(this.rootUrl + '/api/LeaseDeed/GetLeaseDeedDetail/' + APP_No + '/' + PR_Property_No, this.httpOptions);
  }
//scrunity
getAllCategoryforScrunity(DSWOId_No_Id: any) {
  return this.http.get(this.rootUrl + '/Api/DistrictandTaluk/GetAllCategoryBasedOnDSWOId_No_Id/' + DSWOId_No_Id, this.httpOptions);
  }
 // Emploee Leave
 PostEmpLeaveAppdetails_self(udm) {
  return this.http.post(this.rootUrl + '/api/EmpLeaveApp/CreateEmpLeaveApplication', udm, this.httpOptions);
}
getLeaveBalance_self(EmpId, LeaveTypeId) {
  return this.http.get(this.rootUrl + '/api/EmpLeaveApp/getLeaveBalance/' + EmpId + '/' + LeaveTypeId, this.httpOptions)
}
GetEmployeeAddressDetailsLeave(userName: string) {
  return this.http.get(this.rootUrl + '/api/HRMSEmployee/getByIdEmployeeDetailsUsername?username=' + userName, this.httpOptions);
}
//Bank Details
saveEmployeeBankDetails(udm) {
  return this.http.post(this.rootUrl + '/api/HRMSEmployeeBankDetails/CreateHRMSBankDetails_Self', udm, this.httpOptions);
}
UpdateEmployeeBankDetails_self(udm, LeaveId) {
  return this.http.put(this.rootUrl + '/api/HRMSEmployeeBankDetails/UpdateBankDetails_Self/' + LeaveId, udm, this.httpOptions);
}
GetByIdBankDetailsforEmployee(LeaveId) {
  return this.http.get(this.rootUrl + '/api/HRMSEmployeeBankDetails/GetHRMSBankDetailsbyId/' + LeaveId, this.httpOptions);
}
DeleteEmployeeBankDetails_self(BNKACC_ID) {
  return this.http.delete(this.rootUrl + '/api/HRMSEmployeeBankDetails/DeleteHRMSBankDetails_Self/' + BNKACC_ID, this.httpOptions);
}
GetEmployeeAddressBankDetails(userName: string) {
  return this.http.get(this.rootUrl + '/api/HRMSEmployee/getByIdEmployeeDetailsUsername?username=' + userName, this.httpOptions);
}
GetAllBankDetailsAddressForEmployee(ItemsPerPage: number, pageno: number, EmployeeId: number) {
  return this.http.get(this.rootUrl + '/api/HRMSEmployeeBankDetails/GetAllEmployeeBankDetailsDetails_Self/' + ItemsPerPage + '/' + pageno + '/' + EmployeeId, this.httpOptions);
}
//change address
GetByIdEmployeeChangeAddressedit(EMP_ADDR_ID: string) {
  return this.http.get(this.rootUrl + '/api/EmployeeAddress/GetEmployeeAddressById_Self/' + EMP_ADDR_ID, this.httpOptions);
}
GetByIdEmployeeChangeAddressforpayslip(userName: string) {
  debugger
  return this.http.get(this.rootUrl + '/api/HRMSEmployee/getByIdEmployeeDetailsUsername?username=' + userName, this.httpOptions);
}
UpdateEmployeeAddressDetails_self(udm, AddressId) {
  return this.http.put(this.rootUrl + '/api/EmployeeAddress/UpdateHRMSEmp_Self/' + AddressId, udm, this.httpOptions);
}
GetByIdEmployeeChangeAddress(userName: string) {
  debugger
  return this.http.get(this.rootUrl + '/api/HRMSEmployee/getByIdEmployeeDetailsUsername?username=' + userName, this.httpOptions);
}
GetAllAddressForEmployee(ItemsPerPage: number, pageno: number, EmployeeId: number) {
  return this.http.get(this.rootUrl + '/api/EmployeeAddress/GetAllEmployeeAddressDetails_Self/' + ItemsPerPage + '/' + pageno + '/' + EmployeeId, this.httpOptions);
}
DeleteEmployeeAddressdetails(EMP_ADDR_ID) {
  return this.http.delete(this.rootUrl + '/api/EmployeeAddress/DeleteAddress_Self/' + EMP_ADDR_ID, this.httpOptions);
}
//nomination
GetDependent_self(EMP_EMPLOYEE_ID) {
  return this.http.get(this.rootUrl + '/api/NomineeDetails/GetDependent/' + EMP_EMPLOYEE_ID, this.httpOptions);
}
GetDependent2_self(EMP_EMPLOYEE_ID) {
  return this.http.get(this.rootUrl + '/api/NomineeDetails/GetDependent/' + EMP_EMPLOYEE_ID, this.httpOptions);
}
 
GetDependent3_self(EMP_EMPLOYEE_ID) {
  return this.http.get(this.rootUrl + '/api/NomineeDetails/GetDependent/' + EMP_EMPLOYEE_ID, this.httpOptions);
}
GetRelationshipwith_self(DEPND_ID) {
    return this.http.get(this.rootUrl + '/api/NomineeDetails/GetrelationWith/' + DEPND_ID, this.httpOptions);
}
PostNom_self(udm) {
  return this.http.post(this.rootUrl + '/api/NomineeDetails/CreateNom_Self', udm, this.httpOptions);
}
GetEmployeeNomination(userName: string) {
  return this.http.get(this.rootUrl + '/api/HRMSEmployee/getByIdEmployeeDetailsUsername?username=' + userName, this.httpOptions);
}
GetDistrictApplicant() {
  return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllDistrict');
}
GetDistrictApplicantco() {
 return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllDistrict');
}
    GetByIdApplicantChangeAddressadmin(APP_No) {
      return this.http.get(this.rootUrl + '/api/ApplicationForm/GetApplicantAddressDetailsByApp_No?APP_No=' + APP_No, this.httpOptions);
      }
      UpdateApplicantAddressDetails(APP_No: any, data: any) {
      data['APP_No'] = APP_No;
      // return this.http.put(this.rootUrl + '/api/ApplicationForm/UpdateApplicant_Address' + data, this.httpOptions);
      const url = `${this.rootUrl}/api/ApplicationForm/UpdateApplicant_Address_Officer?APP_No=`; // Construct the URL properly
      return this.http.put(url, data, this.httpOptions); // Pass data as the request body
      }  
      GetByIdApplicantTransaction(APP_No) {
        return this.http.get(this.rootUrl + '/Api/TransactionDetails/GetApplicantTransactionDetailsQuery_Officer/' + APP_No, this.httpOptions);
        }
        GetArrearempCodelist(EMP_CODE: any) {
          return this.http.get(this.rootUrl + '/api/PayrollProcess/getarreardetails/' + EMP_CODE , this.httpOptions);
          }
          GetArrearmonthlist(EMP_EMPLOYEE_ID: any,days: any,monthcode: any) {
            return this.http.get(this.rootUrl + '/api/PayrollProcess/getarrearformonth/' + EMP_EMPLOYEE_ID + '/' +  days + '/' + monthcode, this.httpOptions);
          }
          GetByIdareardetails(arr_id:any){
            return this.http.get(this.rootUrl + '/api/PayrollProcess/GetByIdarr/' + arr_id , this.httpOptions);
          }
          SaveArrarDetails(udm) {
            return this.http.post(this.rootUrl + '/api/PayrollProcess/Createsalarrears', udm, this.httpOptions);
          }  
          GetArrearDetails(ItemsPerPage: number, pageno: number) {
            return this.http.get(this.rootUrl + '/api/PayrollProcess/GetAllarrears/' + ItemsPerPage + '/' + pageno , this.httpOptions);
          }

          Arrearapproval(state, remarks, arr_id) {
            return this.http.put(this.rootUrl + '/api/PayrollProcess/Updatearrapp/' + state + '/' + remarks + '/' + arr_id, null, this.httpOptions);
          }

          saveReservationData(udm) {
          debugger;
            return this.http.post(this.rootUrl + '/api/Reservation/saveReservationData/', udm, this.httpOptions);
           }   

           GetReservationDetailsbyDate(itemsPerPage: any, pageNo: any) {
            return this.http.get(this.rootUrl + '/api/Reservation/GetAllReservationByDate/' + itemsPerPage + "/" + pageNo, this.httpOptions);
           }

           GetByIdReservationByDate(created_date) {
            return this.http.get(this.rootUrl + '/api/Reservation/GetByDateReservation/' + created_date, this.httpOptions);
           }

           DeleteReservationByDate(created_date) {
            return this.http.delete(this.rootUrl + '/api/Reservation/DeleteReservationByDate/' + created_date, this.httpOptions);
           }

           getAllReservationScrutiny() {
            return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetDropDownReservation', this.httpOptions);
          }
          GetArrearSanctionDetails(){
            return this.http.get(this.rootUrl + '/api/PayrollProcess/uspGetarrlistforSanction', this.httpOptions);
          }
          GetArrearApprovalDetails(){
            return this.http.get(this.rootUrl + '/api/PayrollProcess/uspGetarrlistforApprove', this.httpOptions);
          }
  //Master Bank Details   
  PostBankDetails(udm) {
    return this.http.post(this.rootUrl + '/api/Bankdetails_Controller/CreateBankdetail', udm, this.httpOptions);
   }
   GetBankDetailsById(bd_id) {
    return this.http.get(this.rootUrl + '/api/Bankdetails_Controller/GetByIdBankdetail/' + bd_id, this.httpOptions);
   }
   UpdateBankDetails(udm, bd_id) {
    return this.http.put(this.rootUrl + '/api/Bankdetails_Controller/UpdateBankdetail/' + bd_id, udm, this.httpOptions);
   }
   GetAllBankDetails() {
    return this.http.get(this.rootUrl + '/api/DistrictandTaluk/GetAllBanks', this.httpOptions);
   }
   GetBankDetails(itemsPerPage: any, pageNo: any) {
    return this.http.get(this.rootUrl + '/api/Bankdetails_Controller/GetAllBankdetail/' + itemsPerPage + "/" + pageNo, this.httpOptions);
   }
   DeleteBankDetails(bd_id) {
    return this.http.delete(this.rootUrl + '/api/Bankdetails_Controller/DeleteBankdetail/' + bd_id, this.httpOptions);
   }
   SearchBankdetails(searchCriteria: any, searchText: any, itemsPerPage: number, pageNo: number) {
    return this.http.get(this.rootUrl + '/api/Bankdetails_Controller/GetAllBankdetailBySearch/' + itemsPerPage + "/" + pageNo + "/" + searchCriteria + "/" + searchText + "/", this.httpOptions);
   }     


   getbranchfrombank(DSWOId_NOBD_Bank_Id_FK) {
    return this.http.get(this.rootUrl + '/api/Bankdetails_Controller/getbranchfrombank/' + DSWOId_NOBD_Bank_Id_FK, this.httpOptions);
   }

   getifsccodefrombranch(DSWOId_NOBD_Bank_Id_FK: any, DSWOId_NOBD_Branch: any) {
    return this.http.get(this.rootUrl + '/api/Bankdetails_Controller/getifsccodefrombranch/' + DSWOId_NOBD_Bank_Id_FK + "/" + DSWOId_NOBD_Branch, this.httpOptions);
  }
  PostCategory(udm) {
    return this.http.post(this.rootUrl + '/api/CategoryController/CreateCategory', udm, this.httpOptions);
  }
  UpdateCategory(udm, CA_Id) {
    return this.http.put(this.rootUrl + '/api/CategoryController/UpdateCategory/' + CA_Id, udm, this.httpOptions);
  }
  GetByIdCategory(CA_Id) {
    return this.http.get(this.rootUrl + '/api/CategoryController/GetByIdCategory/' + CA_Id, this.httpOptions);
  }
  GetMasterCategoryDetails(itemsPerPage, pageNo) {
    return this.http.get(this.rootUrl + '/api/CategoryController/GetAllCategoryMaster/' + itemsPerPage + '/' + pageNo, this.httpOptions);
  }
  DeleteCategory(CA_Id: Number) {
    debugger
    return this.http.delete(this.rootUrl + '/api/CategoryController/DeleteCategory/' + CA_Id, this.httpOptions);
  }
  PostMoileOTPforFOrgot(username:any,password:any,senderid:any,mobileNo:any,message:any,secureKey:any,templateid:any ) {
    return this.http.post(this.rootUrl + '/api/ApplicationForm/sendOTPMSGforgotpassword/'+ username + '/' + password + '/' + senderid + '/' + mobileNo + '/' + message + '/' + secureKey + '/' + templateid, this.httpOptions);
    }
    updatepassword(userDetails: any) {
      debugger
      return this.http.put(this.rootUrl + '/api/Account/UpdatePassword', userDetails, this.httpOptions);
    }   
    PostforgotVerifyMoileOTP(PhoneNumber:any,OTP:any) {
      return this.http.post(this.rootUrl + '/api/ApplicationForm/VerifyOTP/'+ PhoneNumber + '/' + OTP, this.httpOptions);
      }  
      UpdatePasswordSuperAdmin(userDetails: any) {
        debugger
        return this.http.put(this.rootUrl + '/api/Account/UpdatePasswordSuperAdmin', userDetails, this.httpOptions);
      } 
      Deletecost(PCA_Id) {
        return this.http.delete(this.rootUrl + '/api/PaymentConfiguration/DeleteCostFixation/' + PCA_Id, this.httpOptions);
      }
      GetByIdverification(appRegNo: any) {
        return this.http.get(this.rootUrl + '/api/ApplicationForm/VerifyApplicant?appRegNo=' + appRegNo);
        }
        getCategoryforapplicant_online(DSWOId_No_Id: any) {
          return this.http.get(this.rootUrl + '/Api/DistrictandTaluk/GetAllCategoryBasedOnDSWOId_No_Id/' +DSWOId_No_Id);
          }
          saveApplicationforApplicant_online(data: any) {
            return this.http.post(this.rootUrl + '/api/Account/ApplicantRegister_Online_New/', data);
        }
        GetByIdApplicantNotifications(userName: string) {
          return this.http.get(this.rootUrl + '/api/Account/CheckApplicant?username=' + userName, this.httpOptions);
        }

         //saheb
         SaveUserAuditLog(auditData:any) {
          return this.http.post(this.rootUrl + '/api/ApplicationForm/SaveUserAuditLog', auditData, this.httpOptions);
        }

        LogoutUserDetails_New(auditData:any) {
          return this.http.post(this.rootUrl + '/api/ApplicationForm/LogoutUserDetails_New', auditData, this.httpOptions);
        }
        SearchProjectforchangquota(PD_Id:any,Sch_Id:any,Phase_Id:any){
          return this.http.get(this.rootUrl + '/api/CategoryController/GetProjectbyIdCPQ/' + PD_Id +"/"+Sch_Id+"/"+Phase_Id, this.httpOptions);
        }
        // GetByIdencashmentofficer(LE_Id:any) {
        //   return this.http.get(this.rootUrl + '/api/LeaveEDetails/GetByIdLeaveencashment/'+LE_Id, this.httpOptions);
        // }
}