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
import { DashboardComponent } from '../../app/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '', component: DashboardComponent
      },

      /*
      {
        path: 'profile', component: ApplicantComponent,
        children: [{ path: '', component: ProfileComponent }]
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
      {
        path: 'allotted-notallotted', component: ApplicantComponent,
        children: [{ path: '', component: AllotNotallotComponent }]
      },

      {
        path: 'apply', component: ApplicantComponent,
        children: [
          { path: '', component: ActivelistComponent },
          //{ path: 'application-form/:NO_Id/:PD_Id', component: ApplicationformComponent }
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
        path: 'revise-base-price', component: ApplicantComponent,
        children: [{ path: '', component: ReviseBasePriceComponent },
        { path: 'revise-base-grid', component: ReviseBaseGridComponent },
        { path: 'revise-base-grid/:RBP_Id/:mode', component: ReviseBaseGridComponent },
        ]
      },

      {
        path: 'updation-applicant', component: ApplicantComponent,
        children: [
          { path: '', component: ApplicantDetailsUpdateComponent },
        ]
      },
      {
        path: 'payment-id', component: ApplicantComponent,
        children: [{ path: '', component: ApplicantPaymentComponent }]
      },
      {
        path: 'applicantviews', component: ApplicantComponent,
        children: [{ path: '', component: ApplicationViewComponent }]
      },
      {
        path: 'change-address', component: ApplicantComponent,
        children: [{ path: '', component: ChangeAddressComponent }]
      },
      {
        path: 'bidder-view', component: ApplicantComponent,
        children: [{ path: '', component: BidderViewComponent }]
      },


      {
        path: 'refund-request', component: ApplicantComponent,
        children: [{ path: '', component: RefundRequestComponent }]
      },

      {
        path: 'payment/:AppNo/:Mode', component: ApplicantComponent,
        children: [{ path: '', component: PaymentComponent }]
      },
      {
        path: 'appstatus', component: ApplicantComponent,
        children: [{ path: '', component: StatusviewComponent },
        { path: 'status', component: AppstatusComponent },
        { path: 'instapay/:APP_Id/:APP_No/:APP_Status', component: ApplicationinstallmentpayComponent },
        { path: 'cancellation/:APP_Id/:APP_Status', component: ApplicationcancellationComponent },
        { path: 'requestrefund/:App_Id/:APP_Status', component: ApplicationrefundComponent },        
        { path: 'applicantview/:APP_Id/:NO_Id/:mode', component: ApplicationViewComponent }
        ]
      },
      {
        path: 'transactiondetails', component: ApplicantComponent,
        children: [{ path: '', component: TransactionDetailsComponent }]
      },
      {
        path: 'applicationquery', component: ApplicantComponent,
        children: [
          { path: '', component: ApplicantQueryComponent }
          //{ path: '', component: ApplicationstatusComponent }
        ]
      },

      {
        path: 'directallotment', component: ApplicantComponent,
        children: [
          { path: '', component: DirectAllocationComponent }
          //{ path: '', component: ApplicationstatusComponent }
        ]
      },
      */
    ]
  }
];

@NgModule({
  declarations: [   
    DashboardComponent,    
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
export class HomepageModule { }