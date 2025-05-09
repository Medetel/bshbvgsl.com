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

//start applicant //saheb
import { ApplicantComponent } from '../../app/applicant/applicant.component';
import { StatusviewComponent } from '../../app/applicant/status/statusview/statusview.component';
import { AppstatusComponent } from '../../app/applicant/appstatus/appstatus.component';
import { ApplicationinstallmentpayComponent } from '../../app/applicant/applicationinstallmentpay/applicationinstallmentpay.component';
import { ApplicationcancellationComponent } from '../../app/applicant/applicationcancellation/applicationcancellation.component';
import { ApplicationrefundComponent } from '../../app/applicant/applicationrefund/applicationrefund.component';
import { ApplicationViewComponent } from '../../app/applicant/application-view/application-view.component';
import { ProfileComponent } from '../../app/applicant/profile/profile.component';
import { OfflineApplicationGridComponent } from '../../app/applicant/offline-application/offline-application-grid/offline-application-grid.component';
import { offlineapplicationComponent } from '../../app/applicant/offline-application/offline-application.component';
import { ChangeRequestComponent } from '../../app/applicant/change-request/change-request.component';
import { AllotNotallotComponent } from '../../app/applicant/allot-notallot/allot-notallot.component';
import { ActivelistComponent } from '../../app/applicant/apply/activelist/activelist.component';
import { ApplicationstatusComponent } from '../../app/applicant/applicationstatus/applicationstatus.component';
import { ReviseBasePriceComponent } from '../../app/applicant/revise-base-price/revise-base-price.component';
import { ReviseBaseGridComponent } from '../../app/applicant/revise-base-price/revise-base-grid/revise-base-grid.component';
import { ApplicantDetailsUpdateComponent } from '../../app/applicant/applicant-details-update/applicant-details-update.component';
import { ApplicantPaymentComponent } from '../../app/applicant/applicant-payment/applicant-payment.component';
import { ChangeAddressComponent } from '../../app/applicant/change-address/change-address.component';
import { BidderViewComponent } from '../../app/applicant/bidder-view/bidder-view.component';
import { RefundRequestComponent } from '../../app/applicant/refund-request/refund-request.component';
import { PaymentComponent } from '../../app/applicant/payment/payment.component';
import { TransactionDetailsComponent } from '../../app/applicant/transaction-details/transaction-details.component';
import { ApplicantQueryComponent } from '../../app/applicant/applicant-query/applicant-query.component';
import { DirectAllocationComponent } from '../../app/applicant/direct-allocation/direct-allocation.component';
import { ApplicantMenuComponent } from '../applicant/applicant-menu/applicant-menu.component'; //important

//start allocation
//import { ApplicationformComponent } from '../../app/allocation/forms/applicationform/applicationform.component';
//end allocation

//end applicant 

const routes: Routes = [
  {

    path: 'appstatus', component: ApplicantComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: StatusviewComponent
      },
      { path: 'status', component: AppstatusComponent },
      { path: 'instapay/:APP_Id/:APP_No/:APP_Status', component: ApplicationinstallmentpayComponent },
      { path: 'cancellation/:APP_Id/:APP_Status', component: ApplicationcancellationComponent },
      { path: 'requestrefund/:App_Id/:APP_Status', component: ApplicationrefundComponent },
      { path: 'applicantview/:APP_Id/:NO_Id/:mode', component: ApplicationViewComponent }

      /*
      {
        path: 'profile', component: ApplicantComponent,
        children: [{ path: '', component: ProfileComponent }]
      },


      {
        path: 'apply', component: ApplicantComponent,
        children: [
          { path: '', component: ActivelistComponent },
          
        ]
      },

      {
        path: 'applicationstatus', component: ApplicantComponent,
        children: [{ path: '', component: ApplicationstatusComponent }]
      },

      {
        path: 'applicant', component: ApplicantComponent,
        children: [{ path: 'applicantview/:APP_Id/:NO_Id/:mode', component: ApplicationViewComponent },
        { path: 'applicantviewLottery/:APP_Id/:NO_Id/:mode', component: ApplicationViewComponent },

        ]
      },


      {
        path: 'applicantviews', component: ApplicantComponent,
        children: [{ path: '', component: ApplicationViewComponent }]
      },


      {
        path: 'refund-request', component: ApplicantComponent,
        children: [{ path: '', component: RefundRequestComponent }]
      },

      {
        path: 'payment/:AppNo/:Mode', component: ApplicantComponent,
        children: [{ path: '', component: PaymentComponent }]
      },
      */



    ]

  }, //ALDA
  {
    path: 'change-address', component: ApplicantComponent,
    children: [{ path: '', component: ChangeAddressComponent }]
  },
  {
    path: 'transactiondetails', component: ApplicantComponent,
    children: [{ path: '', component: TransactionDetailsComponent }]
  },
  {
    path: 'applicationquery', component: ApplicantComponent,
    children: [
      { path: '', component: ApplicantQueryComponent }
    ]
  },

  {
    path: 'directallotment', component: ApplicantComponent,
    children: [
      { path: '', component: DirectAllocationComponent }
    ]
  },


  {
    path: 'bidder-view', component: ApplicantComponent,
    children: [{ path: '', component: BidderViewComponent }]
  },


  {
    path: 'offline-application-grid', component: ApplicantComponent,
    children: [
      { path: '', component: OfflineApplicationGridComponent },
      { path: 'offline-application', component: offlineapplicationComponent },
      { path: 'offline-application/:APP_No/:mode', component: offlineapplicationComponent },
    ]
  },


  {
    path: 'change-request', component: ApplicantComponent,
    children: [{ path: '', component: ChangeRequestComponent }]
  },
  // {
  //   path: 'allotted-notallotted', component: ApplicantComponent,
  //   children: [{ path: '', component: AllotNotallotComponent }]
  // },
  {
    path: 'revise-base-price', component: ApplicantComponent,
    children: [{ path: '', component: ReviseBasePriceComponent },
    { path: 'revise-base-grid', component: ReviseBaseGridComponent },
    { path: 'revise-base-grid/:RBP_Id/:mode', component: ReviseBaseGridComponent },
    ]
  },

  {
    path: 'payment-id', component: ApplicantComponent,
    children: [{ path: '', component: ApplicantPaymentComponent }]
  },
  {
    path: 'updation-applicant', component: ApplicantComponent,
    children: [
      { path: '', component: ApplicantDetailsUpdateComponent },
    ]
  },


];

@NgModule({
  declarations: [
    ApplicantMenuComponent,
    ApplicantComponent, StatusviewComponent, AppstatusComponent, ApplicationinstallmentpayComponent, ApplicationcancellationComponent, ApplicationrefundComponent, ApplicationViewComponent, ProfileComponent, OfflineApplicationGridComponent, offlineapplicationComponent, ChangeRequestComponent, AllotNotallotComponent, ActivelistComponent, ApplicationstatusComponent,
    ReviseBasePriceComponent, ReviseBaseGridComponent, ApplicantDetailsUpdateComponent, ApplicantPaymentComponent, ChangeAddressComponent, BidderViewComponent, RefundRequestComponent, PaymentComponent, TransactionDetailsComponent, ApplicantQueryComponent, DirectAllocationComponent

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
export class ApplicantModule { }