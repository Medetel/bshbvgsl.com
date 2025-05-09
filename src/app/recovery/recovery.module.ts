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

//start recovery karishma

import { RecoveryMenuComponent } from '../../app/recovery/recovery-menu/recovery-menu.component';
import { RecoveryComponent } from '../../app/recovery/recovery.component';
import { CustomerGridComponent } from '../../app/recovery/customer/customer-grid/customer-grid.component';
import { CustomerFormComponent } from '../../app/recovery/customer/customer-form/customer-form.component';
import { RequestPropertiesComponent } from '../../app/recovery/request-properties/request-properties.component';
import { RequestPropertyGridComponent } from '../../app/recovery/request-property/request-property-grid/request-property-grid.component';
import { RequestPropertyFormComponent } from '../../app/recovery/request-property/request-property-form/request-property-form.component';
import { RequestPropertyAppGridComponent } from '../../app/recovery/request-properties/request-property-approval/request-property-app-grid/request-property-app-grid.component';
import { RequestPropertyAppFormComponent } from '../../app/recovery/request-properties/request-property-approval/request-property-app-form/request-property-app-form.component';
import { AgreementsAppComponent } from '../../app/recovery/agreements-app/agreements-app.component';
import { AgreementsGridComponent } from '../../app/recovery/Agreements/agreements-grid/agreements-grid.component';
import { AgreementsFormComponent } from '../../app/recovery/Agreements/agreements-form/agreements-form.component';
import { AgreementAppGridComponent } from '../../app/recovery/agreements-app/agreements-approval/agreement-app-grid/agreement-app-grid.component';
import { AgreementAppFormComponent } from '../../app/recovery/agreements-app/agreements-approval/agreement-app-form/agreement-app-form.component';
import { PaymentChallApprovalComponent } from '../../app/recovery/payment-chall-approval/payment-chall-approval.component';
import { PaymentChallanGridComponent } from '../../app/recovery/payment-challan/payment-challan-grid/payment-challan-grid.component';
import { PaymentChallanFormComponent } from '../../app/recovery/payment-challan/payment-challan-form/payment-challan-form.component';
import { PaymentChallAppGridComponent } from '../../app/recovery/payment-chall-approval/payment-chall-app-grid/payment-chall-app-grid.component';
import { PaymentChallAppFormComponent } from '../../app/recovery/payment-chall-approval/payment-chall-app-form/payment-chall-app-form.component';
import { PaymentReceiptApprovalComponent } from '../../app/recovery/payment-receipt-approval/payment-receipt-approval.component';
import { PaymentReceiptsGridComponent } from '../../app/recovery/Payment-Receipts/payment-receipts-grid/payment-receipts-grid.component';
import { PaymentReceiptsFormComponent } from '../../app/recovery/Payment-Receipts/payment-receipts-form/payment-receipts-form.component';
import { PaymentReceiptAppGirdComponent } from '../../app/recovery/payment-receipt-approval/payment-receipt-app-gird/payment-receipt-app-gird.component';
import { PaymentReceiptAppFormComponent } from '../../app/recovery/payment-receipt-approval/payment-receipt-app-form/payment-receipt-app-form.component';
import { RenewalsGridComponent } from '../../app/recovery/Renewals/renewals-grid/renewals-grid.component';
import { RenewalsFormComponent } from '../../app/recovery/Renewals/renewals-form/renewals-form.component';
import { RecoveryReportGridComponent } from '../../app/recovery/recovery-reports/recovery-report-grid/recovery-report-grid.component';
import { BlockGridComponent } from '../../app/recovery/block/block-grid/block-grid.component';
import { BlockFormComponent } from '../../app/recovery/block/block-form/block-form.component';
import { PropertyGridComponent } from '../../app/recovery/property/property-grid/property-grid.component';
import { PropertyFormComponent } from '../../app/recovery/property/property-form/property-form.component';
import { BuildingGridComponent } from '../../app/recovery/buildingdetails/building-grid/building-grid.component';
import { BuildingFormComponent } from '../../app/recovery/buildingdetails/building-form/building-form.component';
import { RateFixationGridComponent } from '../../app/recovery/rate-fixation/rate-fixation-grid/rate-fixation-grid.component';
import { RateFixationFormComponent } from '../../app/recovery/rate-fixation/rate-fixation-form/rate-fixation-form.component';
import { CalculationRevenueComponent } from '../../app/recovery/calculation-revenue/calculation-revenue.component';
import { InstallmentFormComponent } from '../../app/recovery/calculation-revenue/installment/installment-form/installment-form.component';
import { GroundRentFormComponent } from '../../app/recovery/calculation-revenue/ground-rent/ground-rent-form/ground-rent-form.component';
import { AdministrativeGridComponent } from '../../app/recovery/calculation-revenue/administrative/administrative-grid/administrative-grid.component';
import { AdministrativeFormComponent } from '../../app/recovery/calculation-revenue/administrative/administrative-form/administrative-form.component';
import { DividendFormComponent } from '../../app/recovery/calculation-revenue/dividend/dividend-form/dividend-form.component';
import { FreeholdGridComponent } from '../../app/recovery/calculation-revenue/freehold/freehold-grid/freehold-grid.component';
import { FreeholdFormComponent } from '../../app/recovery/calculation-revenue/freehold/freehold-form/freehold-form.component';
import { PenaltyGridComponent } from '../../app/recovery/calculation-revenue/penalty/penalty-grid/penalty-grid.component';
import { PenaltyFormComponent } from '../../app/recovery/calculation-revenue/penalty/penalty-form/penalty-form.component';
import { RefundGridComponent } from '../../app/recovery/calculation-revenue/refund/refund-grid/refund-grid.component';
import { RefundFormComponent } from '../../app/recovery/calculation-revenue/refund/refund-form/refund-form.component';
import { SettlementGridComponent } from '../../app/recovery/calculation-revenue/settlement/settlement-grid/settlement-grid.component';
import { SettlementFormComponent } from '../../app/recovery/calculation-revenue/settlement/settlement-form/settlement-form.component';


//end recovery karishma

const routes: Routes = [
  {

    path: 'customer-master', component: RecoveryComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: CustomerGridComponent
      },
      { path: 'customer-master-form', component: CustomerFormComponent },
      { path: 'customer-master-form/:CUST_ID/:mode', component: CustomerFormComponent }

    ]


  }, //ALDA  

  {
    path: 'request-property', component: RecoveryComponent,
    children: [
      {
        path: '', component: RequestPropertiesComponent,
        children: [
          { path: '', component: RequestPropertyGridComponent },
          { path: 'request-property-form', component: RequestPropertyFormComponent },
          { path: 'request-property-approval', component: RequestPropertyAppGridComponent },
          { path: 'request-property-approval-form', component: RequestPropertyAppFormComponent },
          { path: 'request-property-form/:REQP_ID/:mode', component: RequestPropertyFormComponent },
          { path: 'request-property-form/:REQP_ID/:BId/:mode/:CUST_ID', component: RequestPropertyFormComponent },
          { path: 'request-property-form/:REQP_ID/:REQP_APP_TYPE/:mode', component: RequestPropertyFormComponent }

        ]
      },

    ]
  },

  {
    path: 'agreements', component: RecoveryComponent,
    children: [
      {
        path: '', component: AgreementsAppComponent,
        children: [
          { path: '', component: AgreementsGridComponent },
          { path: 'agreements-form', component: AgreementsFormComponent },
          { path: 'agreements-approval', component: AgreementAppGridComponent },
          { path: 'agreements-app-form', component: AgreementAppFormComponent },
          { path: 'agreements-form/:REQP_ID/:mode', component: AgreementsFormComponent },
          { path: 'agreements-form/:REQP_ID/:BackId/:mode', component: AgreementsFormComponent },
        ]
      },

    ]
  },

  {
    path: 'paymentchallan', component: RecoveryComponent,
    children: [
      {
        path: '', component: PaymentChallApprovalComponent,
        children: [
          { path: '', component: PaymentChallanGridComponent },
          { path: 'payment-challan-form', component: PaymentChallanFormComponent },
          { path: 'payment-chall-app-grid', component: PaymentChallAppGridComponent },
          { path: 'payment-chall-app-form', component: PaymentChallAppFormComponent },
          { path: 'payment-challan-form/:Payment_Id/:mode', component: PaymentChallanFormComponent },
          { path: 'payment-challan-form/:Payment_Id/:BackId/:mode', component: PaymentChallanFormComponent }
        ]
      },
    ]
  },

  {
    path: 'paymentreceipt', component: RecoveryComponent,
    children: [
      {
        path: '', component: PaymentReceiptApprovalComponent,
        children: [
          { path: '', component: PaymentReceiptsGridComponent },
          { path: 'payment-receipts-form', component: PaymentReceiptsFormComponent },
          { path: 'payment-receipt-approval', component: PaymentReceiptAppGirdComponent },
          { path: 'payment-receipt-app-form', component: PaymentReceiptAppFormComponent },
          { path: 'payment-receipts-form/:Payment_Receipt_Id/:mode', component: PaymentReceiptsFormComponent },
          { path: 'payment-receipts-form/:Payment_Receipt_Id/:BackId/:mode', component: PaymentReceiptsFormComponent }
        ]
      },

    ]
  },

  {
    path: 'Renewals', component: RecoveryComponent,
    children: [{ path: '', component: RenewalsGridComponent },
    { path: 'Renewals-form', component: RenewalsFormComponent },
    { path: 'Renewals/:BackId/:mode', component: AgreementsFormComponent }
    ]
  },
  {
    path: 'recovery-reports', component: RecoveryComponent,
    children: [{ path: '', component: RecoveryReportGridComponent },

    ]
  },

  {
    path: 'block', component: RecoveryComponent,
    children: [{ path: '', component: BlockGridComponent },
    { path: 'block-form', component: BlockFormComponent }
    ]
  },
  {
    path: 'property-recovery', component: RecoveryComponent,
    children: [
      { path: '', component: PropertyGridComponent },
      { path: 'property-recovery-form', component: PropertyFormComponent }
    ]
  },

  {
    path: 'buildingdetails', component: RecoveryComponent,
    children: [{ path: '', component: BuildingGridComponent },
    { path: 'buildingdetails-form', component: BuildingFormComponent }
    ]
  },
  {
    path: 'rec_ratefixation', component: RecoveryComponent,
    children: [{ path: '', component: RateFixationGridComponent },
    { path: 'rec_ratefixation-form', component: RateFixationFormComponent }
    ]
  },
  {
    path: 'calculation-revenue', component: RecoveryComponent,
    children: [
      {
        path: '', component: CalculationRevenueComponent,
        children: [
          { path: '', component: InstallmentFormComponent },
          { path: 'ground-rent-form', component: GroundRentFormComponent },
          { path: 'administrative', component: AdministrativeGridComponent },
          { path: 'administrative-form', component: AdministrativeFormComponent },
          { path: 'dividend-form', component: DividendFormComponent },
          { path: 'freehold', component: FreeholdGridComponent },
          { path: 'freehold-form', component: FreeholdFormComponent },
          { path: 'penalty', component: PenaltyGridComponent },
          { path: 'penalty-form', component: PenaltyFormComponent },
          { path: 'refund', component: RefundGridComponent },
          { path: 'refund-form', component: RefundFormComponent },
          { path: 'settlement', component: SettlementGridComponent },
          { path: 'settlement-form', component: SettlementFormComponent },


        ]
      }
    ]
  },



];

@NgModule({
  declarations: [
    RecoveryMenuComponent, RecoveryComponent, CustomerGridComponent, CustomerFormComponent
    , RequestPropertiesComponent, RequestPropertyGridComponent, RequestPropertyFormComponent, RequestPropertyAppGridComponent, RequestPropertyAppFormComponent, AgreementsAppComponent, AgreementsGridComponent, AgreementsFormComponent, AgreementAppGridComponent
    , AgreementAppFormComponent, PaymentChallApprovalComponent, PaymentChallanGridComponent, PaymentChallanFormComponent, PaymentChallAppGridComponent, PaymentChallAppFormComponent
    , PaymentReceiptApprovalComponent, PaymentReceiptsGridComponent, PaymentReceiptsFormComponent, PaymentReceiptAppGirdComponent, PaymentReceiptAppFormComponent, RenewalsGridComponent
    , RenewalsFormComponent, RecoveryReportGridComponent, BlockGridComponent, BlockFormComponent, PropertyGridComponent, PropertyFormComponent, BuildingGridComponent, BuildingFormComponent
    , RateFixationGridComponent, RateFixationFormComponent,
    CalculationRevenueComponent, InstallmentFormComponent, GroundRentFormComponent, AdministrativeGridComponent, AdministrativeFormComponent
    , DividendFormComponent, FreeholdGridComponent, FreeholdFormComponent, PenaltyGridComponent, PenaltyFormComponent, RefundGridComponent, RefundFormComponent, SettlementGridComponent, SettlementFormComponent

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
export class RecoveryModule { }