import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-approved-drawing-form',
  templateUrl: './approved-drawing-form.component.html',
  styleUrls: ['./approved-drawing-form.component.css']
})
export class ApprovedDrawingFormComponent implements OnInit {
  mode: any;
  PD_Id: any;
  title = "Approved layout plan by statutory authority";
  formSubmitted: boolean;
  data: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }
  Total: any;
  totalextent: any;
  Layout: any = {};
  Residential: any = {};
  Commercial: any = {};
  Civic: any = {};
  Park: any = {};
  Road: any = {};
  EWS: any = {};
  LIG: any = {};
  MIG: any = {};
  HIG: any = {};
  HIGG: any = {};
  projects: any = {};
  projectlist;
  projectDetails: any = {};
  LayoutPDFUrl: string = "assets/images/default.jpg";
  // fileToUpload: File = null;
  TotalArea: any = {};
  approve: any = {};
  lpalist;
  AAlist;
  ngOnInit() {
    this.GetAllProject();
    this.GetAllLayoutAuthority();
    this.route.params.subscribe(params => {
      this.PD_Id = params['PD_Id'];
      this.mode = params['mode'];
    });
    // this.route.params.subscribe(params =>

    // );
    if (this.PD_Id != null && this.mode != null)
      this.GetAllforApprovedrawing(this.PD_Id);
  }

  GetAllProject() {
    this.data = this.userService.GetAllProject();
    this.data.subscribe(
      (response: any) => {
        this.projectlist = response;
      }, (error) => {

      });
  }

  GetAllLayoutAuthority() {
    debugger;
    this.data = this.userService.GetAllLayoutAuthority();
    this.data.subscribe(
      (response: any) => {
        this.lpalist = response;
      }, (error) => {

      });
  }

  getAuthority(lua_Id: any) {
    
    this.data = this.userService.getApproveAuthority(lua_Id);
    this.data.subscribe(
      (response: any) => {
        this.AAlist = response;
      }, (error) => {
      });
  }

  SaveAuthority(LP_PD_ID_FK: any, approve: any) {
    // if (!form.invalid) {
    
    if (LP_PD_ID_FK == null || LP_PD_ID_FK == undefined || typeof (LP_PD_ID_FK) == undefined) {
      swal('', 'Please select Project!');
    }
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SaveAuthority(LP_PD_ID_FK, approve)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Saved Successfully!', 'success');
            this.router.navigate(['/home/approveddrawing']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
    // }else
    // document.getElementById('loader-spinner').style.display = "none";
    // this.formSubmitted = true;
  }

  UpdateAuthority(LP_PD_ID_FK: any, approve: any) {
    // if (!form.invalid) {
    
    if (LP_PD_ID_FK == null || LP_PD_ID_FK == undefined || typeof (LP_PD_ID_FK) == undefined) {
      swal('', 'Please select Project!');
    }
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.UpdateAuthority(LP_PD_ID_FK, approve)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Updated Successfully!', 'success');
            this.router.navigate(['/home/approveddrawing']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
    // }else
    // document.getElementById('loader-spinner').style.display = "none";
    // this.formSubmitted = true;
  }


  GetAllforApprovedrawing(PD_Id) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllforApprovedrawing(PD_Id)
      .subscribe(
        (response: any) => {
          this.projectDetails = response;
          //this.Layout = response.ApprovedDrawingModel;
          if (response.ApprovedDrawingModel != null) {
            this.Layout = response.ApprovedDrawingModel;
            this.Residential = response.ApprovedDrawingModel.ResidentialModels;
            this.Commercial = response.ApprovedDrawingModel.CommercialModels;
            this.Civic = response.ApprovedDrawingModel.CivicModels;
            this.Park = response.ApprovedDrawingModel.ParkModels;
            this.Road = response.ApprovedDrawingModel.RoadModels;
            this.EWS = response.ApprovedDrawingModel.EWSModels;
            this.LIG = response.ApprovedDrawingModel.LIGModels;
            this.MIG = response.ApprovedDrawingModel.MIGModels;
            this.HIG = response.ApprovedDrawingModel.HIGModels;
            this.HIGG = response.ApprovedDrawingModel.HIGGModels;
            if (response.ApprovedDrawingModel.AuthorityModels != null){
            this.approve = response.ApprovedDrawingModel.AuthorityModels;
            this.getAuthority(this.approve.A_LPA_ID_FK)
            }

            if (this.Layout.LP_Drawing_Date != null)
              this.Layout.LP_Drawing_Date = ((this.Layout.LP_Drawing_Date).split('T'))[0];
            this.getAreaTotal()
            this.getPercentageTotal()
            this.getEWSTotal()
            this.getLIGTotal()
            this.getMIGTotal()
            this.getHIGTotal()
            this.getHIGGTotal()
            this.gettotalpercent()
            this.getNetTotal()

            if (this.Layout.LP_LayoutPlan_Doc != null)
              this.LayoutPDFUrl = response.ApprovedDrawingModel.LP_LayoutPlan_Doc;
            this.Layout.LP_LayoutPlan_Doc = response.ApprovedDrawingModel.LP_LayoutPlan_Doc;
          }
          this.projects.LP_PD_ID_FK = PD_Id;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  getNetTotal() {
    
    this.TotalArea.NetTotal = "0";
    this.totalextent = "0";
    this.totalextent = parseFloat(this.Layout.LP_Total_Extent_in_Acres) + parseFloat(this.Layout.LP_Total_Extent_in_Hectors)
    this.TotalArea.NetTotal = parseFloat(this.TotalArea.NetTotal) + parseFloat(this.Layout.LP_DeductFuture_Dev_Acres || 0) +
      parseFloat(this.Layout.LP_DeductFuture_Dev_Hectors || 0) + parseFloat(this.Layout.LP_DeductBkharab_in_Acres || 0) +
      parseFloat(this.Layout.LP_DeductBkharab_in_Hectors || 0) + parseFloat(this.Layout.LP_deduct_litigation_Land_Acres || 0)
      + parseFloat(this.Layout.LP_deduct_litigation_Land_Hectors || 0);
    this.Total = parseFloat(this.totalextent) - parseFloat(this.TotalArea.NetTotal);
    console.log(this.Total);
  }

  getAreaTotal() {

    this.TotalArea.TotalAreaCalculation = "0";
    this.TotalArea.TotalAreaCalculation = parseFloat(this.TotalArea.TotalAreaCalculation) + parseFloat(this.Residential.LUA_Area_in_Sqmt || 0) + parseFloat(this.Commercial.LUA_Area_in_Sqmt || 0) + parseFloat(this.Civic.LUA_Area_in_Sqmt || 0) + parseFloat(this.Park.LUA_Area_in_Sqmt || 0) + parseFloat(this.Road.LUA_Area_in_Sqmt || 0);
  }

  getPercentageTotal() {
    this.TotalArea.PercentageTotal = "0";
    this.TotalArea.PercentageTotal = parseFloat(this.TotalArea.PercentageTotal) + parseFloat(this.Residential.LUA_Percentage_achieved || 0) + parseFloat(this.Commercial.LUA_Percentage_achieved || 0) + parseFloat(this.Civic.LUA_Percentage_achieved || 0) + parseFloat(this.Park.LUA_Percentage_achieved || 0) + parseFloat(this.Road.LUA_Percentage_achieved || 0);
  }

  getEWSTotal() {

    this.EWS.LUD_Total = 0;
    this.EWS.LUD_Total = parseFloat(this.EWS.LUD_Total) + parseFloat(this.EWS.LUD_Inter_Regular || 0) + parseFloat(this.EWS.LUD_Inter_Odd || 0) + parseFloat(this.EWS.LUD_Corner || 0);
    this.getTotalshare();
  }

  getLIGTotal() {

    this.LIG.LUD_Total = "0";
    this.LIG.LUD_Total = parseFloat(this.LIG.LUD_Total) + parseFloat(this.LIG.LUD_Inter_Regular || 0) + parseFloat(this.LIG.LUD_Inter_Odd || 0) + parseFloat(this.LIG.LUD_Corner || 0);
    this.getTotalshare();
  }

  getMIGTotal() {

    this.MIG.LUD_Total = "0";
    this.MIG.LUD_Total = parseFloat(this.MIG.LUD_Total) + parseFloat(this.MIG.LUD_Inter_Regular || 0) + parseFloat(this.MIG.LUD_Inter_Odd || 0) + parseFloat(this.MIG.LUD_Corner || 0);
    this.getTotalshare();
  }

  getHIGTotal() {

    this.HIG.LUD_Total = "0";
    this.HIG.LUD_Total = parseFloat(this.HIG.LUD_Total) + parseFloat(this.HIG.LUD_Inter_Regular || 0) + parseFloat(this.HIG.LUD_Inter_Odd || 0) + parseFloat(this.HIG.LUD_Corner || 0);
    this.getTotalshare();
  }

  getHIGGTotal() {

    this.HIGG.LUD_Total = "0";
    this.HIGG.LUD_Total = parseFloat(this.HIGG.LUD_Total) + parseFloat(this.HIGG.LUD_Inter_Regular || 0) + parseFloat(this.HIGG.LUD_Inter_Odd || 0) + parseFloat(this.HIGG.LUD_Corner || 0);
    this.getTotalshare();
  }

  getTotalshare() {
    
    this.TotalArea.totalshare = "0";
    this.TotalArea.totalshare = parseFloat(this.TotalArea.totalshare) + parseFloat(this.HIGG.LUD_Total || 0) + parseFloat(this.HIG.LUD_Total || 0) + parseFloat(this.LIG.LUD_Total || 0) + parseFloat(this.MIG.LUD_Total || 0) + parseFloat(this.EWS.LUD_Total || 0);
  }

  gettotalpercent() {
    
    this.TotalArea.totalpercent = "0";
    this.TotalArea.totalpercent = parseFloat(this.TotalArea.totalpercent) + parseFloat(this.HIGG.LUD_Percentage || 0) + parseFloat(this.HIG.LUD_Percentage || 0) + parseFloat(this.LIG.LUD_Percentage || 0) + parseFloat(this.MIG.LUD_Percentage || 0) + parseFloat(this.EWS.LUD_Percentage || 0);
  }

}
