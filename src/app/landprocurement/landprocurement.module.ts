import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../app/auth/auth.guard';

//start Land procurement Saheb
import { LandprocurementComponent } from '../../app/landprocurement/landprocurement.component';
import { ProposalGridComponent } from '../../app/landprocurement/proposal-report/proposal-grid/proposal-grid.component';
import { ProposalFormComponent } from '../../app/landprocurement/proposal-report/proposal-form/proposal-form.component';
import { InspectionGridComponent } from '../../app/landprocurement/inspection-report/inspection-grid/inspection-grid.component';
import { InspectionFormComponent } from '../../app/landprocurement/inspection-report/inspection-form/inspection-form.component';
import { ViabilityGridComponent } from '../../app/landprocurement/viability-report/viability-grid/viability-grid.component';
import { ViabilityFormComponent } from '../../app/landprocurement/viability-report/viability-form/viability-form.component';
import { BoardmeetinggridComponent } from '../../app/landprocurement/BoardMeet/boardmeetinggrid/boardmeetinggrid.component';
import { BoardmeetingComponent } from '../../app/landprocurement/BoardMeet/boardmeeting/boardmeeting.component';
import { LandProjectGridComponent } from '../../app/landprocurement/land-project/land-project-grid/land-project-grid.component';
import { LandProjectFormComponent } from '../../app/landprocurement/land-project/land-project-form/land-project-form.component';
import { LandProjectDetailsComponent } from '../../app/landprocurement/land-details/land-project-details/land-project-details.component';
import { LanddetailsGridComponent } from '../../app/landprocurement/land-details/landdetails-grid/landdetails-grid.component';
import { LanddetailsFormComponent } from '../../app/landprocurement/land-details/landdetails-form/landdetails-form.component';
import { LandrecFormComponent } from '../../app/landprocurement/land-rec-details/landrec-form/landrec-form.component';
import { RateGridComponent } from '../../app/landprocurement/rate-fixation/rate-grid/rate-grid.component';
import { RateFormComponent } from '../../app/landprocurement/rate-fixation/rate-form/rate-form.component';
import { OnGridComponent } from '../../app/landprocurement/objectionnotification/on-grid/on-grid.component';
import { OnFormComponent } from '../../app/landprocurement/objectionnotification/on-form/on-form.component';
import { LandacquisitionGridComponent } from '../../app/landprocurement/land-acquisition/landacquisition-grid/landacquisition-grid.component';
import { LandacquisitionFormComponent } from '../../app/landprocurement/land-acquisition/landacquisition-form/landacquisition-form.component';
import { LandpurchaseGridComponent } from '../../app/landprocurement/land-purchase/landpurchase-grid/landpurchase-grid.component';
import { LandpurchaseFormComponent } from '../../app/landprocurement/land-purchase/landpurchase-form/landpurchase-form.component';
import { LpAgreementGridComponent } from '../../app/landprocurement/land-purchase/land-pur-agreements/lp-agreement-grid/lp-agreement-grid.component';
import { LpAgreementFormComponent } from '../../app/landprocurement/land-purchase/land-pur-agreements/lp-agreement-form/lp-agreement-form.component';
import { LpPurchaseGridComponent } from '../../app/landprocurement/land-purchase/land-pur-purchase/lp-purchase-grid/lp-purchase-grid.component';
import { LpPurchaseFormComponent } from '../../app/landprocurement/land-purchase/land-pur-purchase/lp-purchase-form/lp-purchase-form.component';
import { LpPaymentGridComponent } from '../../app/landprocurement/land-purchase/land-pur-payment/lp-payment-grid/lp-payment-grid.component';
import { LpPaymentFormComponent } from '../../app/landprocurement/land-purchase/land-pur-payment/lp-payment-form/lp-payment-form.component';
import { LpProfessionGridComponent } from '../../app/landprocurement/land-purchase/land-pur-profession/lp-profession-grid/lp-profession-grid.component';
import { LpProfessionFormComponent } from '../../app/landprocurement/land-purchase/land-pur-profession/lp-profession-form/lp-profession-form.component';
import { JointVentureComponent } from '../../app/landprocurement/joint-venture/joint-venture.component';
import { JvAgreementGridComponent } from '../../app/landprocurement/joint-venture/jv-agreements/jv-agreement-grid/jv-agreement-grid.component';
import { JvAgreementFormComponent } from '../../app/landprocurement/joint-venture/jv-agreements/jv-agreement-form/jv-agreement-form.component';
import { JvExceptenceGridComponent } from '../../app/landprocurement/joint-venture/jv-exceptence/jv-exceptence-grid/jv-exceptence-grid.component';
import { JvExceptenceFormComponent } from '../../app/landprocurement/joint-venture/jv-exceptence/jv-exceptence-form/jv-exceptence-form.component';
import { JvPossessionGridComponent } from '../../app/landprocurement/joint-venture/jv-possession/jv-possession-grid/jv-possession-grid.component';
import { JvPossessionFormComponent } from '../../app/landprocurement/joint-venture/jv-possession/jv-possession-form/jv-possession-form.component';
import { LandTownPlanningGridComponent } from '../../app/landprocurement/land-to-town-planning/land-town-planning-grid/land-town-planning-grid.component';
import { LandTownPlanningFormComponent } from '../../app/landprocurement/land-to-town-planning/land-town-planning-form/land-town-planning-form.component';

import { LandprocurementMenuComponent } from '../../app/landprocurement/landprocurement-menu/landprocurement-menu.component';
//end Land procurement Saheb

const routes: Routes = [
  {

    path: 'landprocurement', component: LandprocurementComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: ProposalGridComponent
      },
      { path: 'proposal-form', component: ProposalFormComponent },
      { path: 'proposal-form/:PR_Id/:mode', component: ProposalFormComponent }

    ]


  }, //ALDA

  {
    path: 'inspectionreport', component: LandprocurementComponent,
    children: [{ path: '', component: InspectionGridComponent },
    { path: 'inspection-form', component: InspectionFormComponent },
    { path: 'inspection-form/:IR_Id/:mode', component: InspectionFormComponent }
    ]
  },
  {
    path: 'viabilityreport', component: LandprocurementComponent,
    children: [{ path: '', component: ViabilityGridComponent },
    { path: 'viabilityform', component: ViabilityFormComponent },
    { path: 'viabilityform/:VR_Id/:mode', component: ViabilityFormComponent }
    ]
  },
  {
    path: 'boardmeeting', component: LandprocurementComponent,
    children: [{ path: '', component: BoardmeetinggridComponent },
    { path: 'boardmeeting-form', component: BoardmeetingComponent },
    { path: 'boardmeeting-form/:BM_Id/:mode', component: BoardmeetingComponent }
    ]
  },
  {
    path: 'Land-planning', component: LandprocurementComponent,
    children: [{ path: '', component: LandProjectGridComponent },
    { path: 'planning-form', component: LandProjectFormComponent },
    { path: 'planning-form/:PD_Id/:mode', component: LandProjectFormComponent }
    ]
  },
  {
    path: 'landdetails', component: LandprocurementComponent,
    children: [
      { path: '', component: LandProjectDetailsComponent },
      { path: 'landdetails-grid/:PD_Id/:PR_Id_PK', component: LanddetailsGridComponent },
      { path: 'landdetails-form', component: LanddetailsFormComponent },
      { path: 'landdetails-form/:LOD_Id_PK/:mode', component: LanddetailsFormComponent }
    ]
  },
  {
    path: 'landrecdetails', component: LandprocurementComponent,
    children: [{ path: '', component: LandrecFormComponent },
    ]
  },
  {
    path: 'ratefixation', component: LandprocurementComponent,
    children: [{ path: '', component: RateGridComponent },
    { path: 'rate-form', component: RateFormComponent },
    { path: 'rate-form/:RF_Id_PK/:mode', component: RateFormComponent }
    ]
  },
  {
    path: 'objectionnotification', component: LandprocurementComponent,
    children: [{ path: '', component: OnGridComponent },
    { path: 'ON-form', component: OnFormComponent },
    { path: 'ON-form/:ON_Id/:mode', component: OnFormComponent }
    ]
  },
  {
    path: 'landacquisition', component: LandprocurementComponent,
    children: [{ path: '', component: LandacquisitionGridComponent },
    { path: 'landacquisition-form', component: LandacquisitionFormComponent },
    { path: 'landacquisition-form/:LA_Id/:mode', component: LandacquisitionFormComponent }
    ]
  },
  {
    path: 'landpurchase', component: LandprocurementComponent,
    children: [{ path: '', component: LandpurchaseGridComponent },
    {
      path: 'land-pur-agreement', component: LandpurchaseFormComponent,
      children: [
        { path: '', component: LpAgreementGridComponent },
        { path: 'land-pur-agreement-form', component: LpAgreementFormComponent },
        { path: 'land-pur-agreement-form/:LP_Id/:mode', component: LpAgreementFormComponent },
        { path: 'land-pur-purchase', component: LpPurchaseGridComponent },
        { path: 'land-pur-purchase/land-pur-purchase-form', component: LpPurchaseFormComponent },
        { path: 'land-pur-purchase/land-pur-purchase-form/:LP_Id/:mode', component: LpPurchaseFormComponent },
        { path: 'land-pur-payment', component: LpPaymentGridComponent },
        { path: 'land-pur-payment/land-pur-payment-form', component: LpPaymentFormComponent },
        { path: 'land-pur-profession', component: LpProfessionGridComponent },
        { path: 'land-pur-profession/land-pur-profession-form', component: LpProfessionFormComponent },
        { path: 'land-pur-profession/land-pur-profession-form/:LP_Id/:mode', component: LpProfessionFormComponent },
      ]
    },

    ]
  },

  {
    path: 'joint-venture', component: LandprocurementComponent,
    children: [
      {
        path: '', component: JointVentureComponent,
        children: [
          { path: '', component: JvAgreementGridComponent },
          { path: 'jv-agreement-form', component: JvAgreementFormComponent },
          { path: 'jv-agreement-form/:LP_Id/:mode', component: JvAgreementFormComponent },
          { path: 'jv-exceptence', component: JvExceptenceGridComponent },
          { path: 'jv-exceptence-form', component: JvExceptenceFormComponent },
          { path: 'jv-exceptence-form/:LP_Id/:mode', component: JvExceptenceFormComponent },
          { path: 'jv-possession', component: JvPossessionGridComponent },
          { path: 'jv-possession-form', component: JvPossessionFormComponent },
          { path: 'jv-possession-form/:LP_Id/:mode', component: JvPossessionFormComponent },

        ]
      }
    ]
  },

  {
    path: 'land-town-planning', component: LandprocurementComponent,
    children: [
      { path: '', component: LandTownPlanningGridComponent },
      { path: 'land-town-planning-form', component: LandTownPlanningFormComponent },
      { path: 'land-town-planning-form/:PD_Id/:LTP_Id/:mode', component: LandTownPlanningFormComponent }
    ]
  },

];

@NgModule({
  declarations: [
    LandprocurementMenuComponent, LandprocurementComponent, ProposalGridComponent, ProposalFormComponent, InspectionGridComponent, InspectionFormComponent, ViabilityGridComponent, ViabilityFormComponent,
    BoardmeetinggridComponent, BoardmeetingComponent, LandProjectGridComponent, LandProjectFormComponent, LandProjectDetailsComponent, LanddetailsGridComponent, LanddetailsFormComponent, LandrecFormComponent,
    RateGridComponent, RateFormComponent, OnGridComponent, OnFormComponent, LandacquisitionGridComponent, LandacquisitionFormComponent, LandpurchaseGridComponent, LandpurchaseFormComponent, LpAgreementGridComponent,
    LpAgreementFormComponent, LpPurchaseGridComponent, LpPurchaseFormComponent, LpPaymentGridComponent, LpPaymentFormComponent, LpProfessionGridComponent, LpProfessionFormComponent, JointVentureComponent,
    JvAgreementGridComponent, JvAgreementFormComponent, JvExceptenceGridComponent, JvExceptenceFormComponent, JvPossessionGridComponent, JvPossessionFormComponent, LandTownPlanningGridComponent, LandTownPlanningFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class LandprocurementModule { }