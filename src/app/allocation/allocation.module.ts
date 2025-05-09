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

//start allocation sandhya
import { ApplicationMenuComponent } from '../../app/allocation/application-menu/application-menu.component';
import { AllocationComponent } from '../../app/allocation/allocation.component';
import { PrAllotmentGridComponent } from '../../app/allocation/pr-allotment/pr-allotment-grid/pr-allotment-grid.component';
import { PrAllotmentFormComponent } from '../../app/allocation/pr-allotment/pr-allotment-form/pr-allotment-form.component';
import { PrAllotmentNotsentComponent } from '../../app/allocation/pr-allotment/pr-allotment-notsent/pr-allotment-notsent.component';
import { PropertyPlanAlllistComponent } from '../../app/allocation/pr-allotment/property-plan-alllist/property-plan-alllist.component';
import { GridComponent } from '../../app/allocation/khbnotification/grid/grid.component';
import { FormComponent } from '../../app/allocation/khbnotification/form/form.component';
import { ScrutinyComponent } from '../../app/allocation/scrutiny/scrutiny.component';
import { ScrutinyViewComponent } from '../../app/allocation/scrutiny-view/scrutiny-view.component';
import { ProvisionAllotmentComponent } from '../../app/allocation/provision-allotment/provision-allotment.component';
import { LotteryComponent } from '../../app/allocation/lottery/lottery.component';
import { ELotteryComponent } from '../../app/allocation/e-lottery/e-lottery.component';
import { ManualGridComponent } from '../../app/allocation/manual-lottery/manual-grid/manual-grid.component';
import { ManualFormComponent } from '../../app/allocation/manual-lottery/manual-form/manual-form.component';

import { PaymentConfigViewComponent } from '../../app/allocation/payment-config-view/payment-config-view.component';
import { PaymentConfigComponent } from '../../app/allocation/payment-config/payment-config.component';

import { AllottmentListComponent } from '../../app/allocation/allottment-list/allottment-list.component';
import { NotAllotedRefundComponent } from '../../app/allocation/not-alloted-refund/not-alloted-refund.component';
import { NotAllotedRefundFormComponent } from '../../app/allocation/not-alloted-refund-form/not-alloted-refund-form.component';
import { AllotmentProjectListComponent } from '../../app/allocation/allotment-cancellation/allotment-project-list/allotment-project-list.component';
import { ProjectNamesComponent } from '../../app/allocation/allotment-cancellation/project-names/project-names.component';
import { AllotmentAllottedPropertyComponent } from '../../app/allocation/allotment-cancellation/allotment-allotted-property/allotment-allotted-property.component';
import { PaymentDetailsComponent } from '../../app/allocation/allotment-cancellation/payment-details/payment-details.component';
import { SaledeedDetailsComponent } from '../../app/allocation/allotment-cancellation/saledeed-details/saledeed-details.component';
import { CancelAllotmentComponent } from '../../app/allocation/allotment-cancellation/cancel-allotment/cancel-allotment.component';
import { ReAllotmentComponent } from '../../app/allocation/re-allotment/re-allotment.component';
import { ChangePropertygridComponent } from '../../app/allocation/change-property/change-propertygrid/change-propertygrid.component';
import { ChangePropertyformComponent } from '../../app/allocation/change-property/change-propertyform/change-propertyform.component';
import { MaintainanceFeeComponent } from '../../app/allocation/maintainance-fee/maintainance-fee.component';
import { DefaultersComponent } from '../../app/allocation/defaulters/defaulters.component';
import { SaledeedComponent } from '../../app/allocation/saledeed/saledeed.component';
import { EKhataComponent } from '../../app/allocation/e-khata/e-khata.component';
import { ProvisionlistComponent } from '../../app/allocation/provisionlist/provisionlist.component';
import { FinalListComponent } from '../../app/allocation/final-list/final-list.component';
import { ApplicationlistComponent } from '../../app/allocation/applicationlist/applicationlist.component';
import { NoticeCancellationComponent } from '../../app/allocation/notice-cancellation/notice-cancellation.component';
import { AuctionedPropertiesCancelComponent } from '../../app/allocation/auctioned-properties-cancel/auctioned-properties-cancel.component';
import { ViewAuctionedPpropertiesComponent } from '../../app/allocation/view-auctioned-properties/view-auctioned-properties.component';
import { PaymentFormComponent } from '../../app/allocation/payment-form/payment-form.component';
import { CheckoutFormComponent } from '../../app/allocation/checkout-form/checkout-form.component';
import { ManualLotteryTokenComponent } from '../../app/allocation/manual-lottery/manual-lottery-token/manual-lottery-token.component';
import { AllotNotallotListComponent } from '../../app/allocation/allot-notallot-list/allot-notallot-list.component';

//end allocation sandhya

const routes: Routes = [
  {

    path: 'pre-allotment', component: AllocationComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: PrAllotmentGridComponent },
    { path: 'pre-allotmentform/:PD_Id', component: PrAllotmentFormComponent },
    { path: 'pre-allotmentformnotsent/:PD_Id', component: PrAllotmentNotsentComponent },
    { path: 'pre-allotmentall/:PD_Id', component: PropertyPlanAlllistComponent }

    ]


  }, //ALDA  

  {
    path: 'bshbnotification', component: AllocationComponent,
    children: [{ path: '', component: GridComponent },
    { path: 'bshbnotificationform', component: FormComponent },
    { path: 'bshbnotificationform/:DSWOId_NO_Id/:mode', component: FormComponent }
    ]
  },

  {
    path: 'scrutiny', component: AllocationComponent,
    children: [{ path: '', component: ScrutinyComponent },
    { path: 'scrutinized/:S_NotificationID/:S_ProjectID/:S_CA_Id_FK/:S_Reservation_Id_FK/:S_Property_Type', component: ScrutinyComponent },
    { path: 'scrutiny-view/:APP_Id/:S_NotificationID/:S_ProjectID/:S_CA_Id_FK/:S_Reservation_Id_FK/:S_Property_Type', component: ScrutinyViewComponent },
    ]
  },

  {
    path: 'provision-allotment', component: AllocationComponent,
    children: [{ path: '', component: ProvisionAllotmentComponent }]
  },

  {
    path: 'allot', component: AllocationComponent,
    children: [
      {
        path: '', component: LotteryComponent,
        children: [
          { path: '', component: ELotteryComponent },
          { path: 'manual-grid', component: ManualGridComponent },
          { path: 'manual-form', component: ManualFormComponent },
          { path: 'manual-form/:LO_Id/:mode', component: ManualFormComponent }
        ]
      }
    ]
  },
  {
    path: 'paymentconfig', component: AllocationComponent,
    children: [
      { path: '', component: PaymentConfigViewComponent },
      { path: 'payment-config-form', component: PaymentConfigComponent },
      { path: 'payment-config-form/:PC_Id/:mode', component: PaymentConfigComponent }
    ]
  },
  {
    path: 'allotmentlist', component: AllocationComponent,
    children: [{ path: '', component: AllottmentListComponent }]
  },

  {
    path: 'notallotedrefund', component: AllocationComponent,
    children: [{ path: '', component: NotAllotedRefundComponent },
    { path: 'refund-form', component: NotAllotedRefundFormComponent },
    { path: 'refund-form/:NAR_Id/:mode', component: NotAllotedRefundFormComponent }
    ]
  },

  {
    path: 'allotmentcancellation', component: AllocationComponent,
    children: [{ path: '', component: AllotmentProjectListComponent },
    { path: 'project-names/:Sch_Id', component: ProjectNamesComponent },
    { path: 'allotted-vacant/:PD_Id/:PD_Project_Name/:Phase_Name/:Sch_Id', component: AllotmentAllottedPropertyComponent },
    { path: 'payment-details', component: PaymentDetailsComponent },
    { path: 'saledeed-details', component: SaledeedDetailsComponent },
    { path: 'cancel-allotment/:APP_No/:PR_Id/:PD_Id/:PD_Project_Name/:Phase_Name/:Sch_Id', component: CancelAllotmentComponent },
    { path: 'cancel-allotment/:type/:APP_No/:PR_Id/:Can_Type/:PAC_Id', component: CancelAllotmentComponent }

    ]
  },
  {
    path: 're-allotment', component: AllocationComponent,
    children: [{ path: '', component: ReAllotmentComponent }]
  },


  {
    path: 'change-property', component: AllocationComponent,
    children: [{ path: '', component: ChangePropertygridComponent },
    { path: 'change-propertyform', component: ChangePropertyformComponent }
    ]
  },

  {
    path: 'maintainance-fee', component: AllocationComponent,
    children: [{ path: '', component: MaintainanceFeeComponent }]
  },
  {
    path: 'defaulter', component: AllocationComponent,
    children: [{ path: '', component: DefaultersComponent }]
  },
  {
    path: 'leasedeed', component: AllocationComponent,
    children: [{ path: '', component: SaledeedComponent }
    ]
  },
  {
    path: 'e-khata', component: AllocationComponent,
    children: [{ path: '', component: EKhataComponent }]
  },
  {
    path: 'provisionlist', component: ProvisionlistComponent
  },

  {
    path: 'provisionlist/:S_NotificationID/:S_ProjectID', component: ProvisionlistComponent
  },

  {
    path: 'finalList', component: FinalListComponent
  },

  {
    path: 'applicationList', component: AllocationComponent,
    children: [{ path: '', component: ApplicationlistComponent }
    ]
  },
  {
    path: 'noticecancellation', component: AllocationComponent,
    children: [{ path: '', component: NoticeCancellationComponent }]
  },

  {
    path: 'auctionedpropertiescancel', component: AllocationComponent,
    children: [{ path: '', component: AuctionedPropertiesCancelComponent }]
  },

  {
    path: 'viewauctionedproperties/:PR_Id', component: AllocationComponent,
    children: [{ path: '', component: ViewAuctionedPpropertiesComponent }]
  },

  {
    path: 'paymentform', component: AllocationComponent,
    children: [{ path: '', component: PaymentFormComponent }]
  },
  {
    path: 'checkoutform/:TransactionId', component: AllocationComponent,
    children: [{ path: '', component: CheckoutFormComponent }]
  },
 
  {
    path: 'allotted-notallotted', component: AllocationComponent,
    children: [{ path: '', component: AllotNotallotListComponent }]
  },

];

@NgModule({
  declarations: [
    ApplicationMenuComponent, AllocationComponent, PrAllotmentGridComponent, PrAllotmentFormComponent, PrAllotmentNotsentComponent, PropertyPlanAlllistComponent
    , GridComponent, FormComponent, ScrutinyComponent, ScrutinyViewComponent, ProvisionAllotmentComponent, LotteryComponent, ELotteryComponent, ManualGridComponent, ManualFormComponent, PaymentConfigViewComponent, PaymentConfigComponent
    , AllottmentListComponent, NotAllotedRefundComponent, NotAllotedRefundFormComponent, AllotmentProjectListComponent, ProjectNamesComponent, AllotmentAllottedPropertyComponent
    , PaymentDetailsComponent, SaledeedDetailsComponent, CancelAllotmentComponent, ReAllotmentComponent, ChangePropertygridComponent, ChangePropertyformComponent, MaintainanceFeeComponent
    , DefaultersComponent, SaledeedComponent, EKhataComponent, ProvisionlistComponent, FinalListComponent, ApplicationlistComponent, NoticeCancellationComponent
    , AuctionedPropertiesCancelComponent, ViewAuctionedPpropertiesComponent, PaymentFormComponent, CheckoutFormComponent,AllotNotallotListComponent,

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
export class AllocationModule { }