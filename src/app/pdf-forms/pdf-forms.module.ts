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
import { KhbnotificationComponent } from './khbnotification/khbnotification.component';
import { auctionintimationComponent } from './auctionintimation/auctionintimation.component';
import { auctionnotificationComponent } from './auctionnotification/auctionnotification.component';
import { khbChallanComponent } from './khb-challan/khb-challan.component';
import { KhbInstachallanComponent } from './khb-instachallan/khb-instachallan.component';
import { NotieLetterComponent } from './notie-letter/notie-letter.component';
import { OrderLetterComponent } from './order-letter/order-letter.component';
import { ManualLotteryTokenComponent } from '../allocation/manual-lottery/manual-lottery-token/manual-lottery-token.component';

//start pdf-forms sheetal

//end pdf-forms sheetal

const routes: Routes = [

  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'khbnotification/:NotificationID/:ProjectID/:CaTName', component: KhbnotificationComponent
},
{
  path: 'auction-intimation/:AuctionId', component: auctionintimationComponent
},
{
  path: 'auction-notification/:AuctionId', component: auctionnotificationComponent
},
{
  path: 'khb-challan/:AppNo/:Mode', component: khbChallanComponent
},
{
  path: 'khb-challan-insta/:AppNo/:AmtType', component: KhbInstachallanComponent
},
{
  path: 'khbnoticeletter/:AppId/:NotificationID/:ProjectID/:Type', component: NotieLetterComponent
},
{
  path: 'khborderletter/:AppId/:NotificationID/:ProjectID/:Type', component: OrderLetterComponent
},
{
  path: 'Token-view/:LO_NO_Id_FK/:LO_PD_Id_FK/:LO_CA_Id_FK/:LO_RES_Id_FK/:LO_PT_Id_FK', component: ManualLotteryTokenComponent
},
  // {

  //   path: 'submitrequest', component: PdfFormsComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: '', component: SubmitRequestGridComponent
  //     },
  //     { path: 'submitrequest-form', component: SubmitRequestFormComponent },
  //     { path: 'submitrequest-form/:rtiappid/:mode', component: SubmitRequestFormComponent }

  //   ]


  // }, //ALDA  


];

@NgModule({
  declarations: [
    
    KhbnotificationComponent, auctionintimationComponent, auctionnotificationComponent, khbChallanComponent, KhbInstachallanComponent, NotieLetterComponent, OrderLetterComponent,ManualLotteryTokenComponent
    // PdfFormsComponent, SubmitRequestGridComponent, SubmitRequestFormComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ]
})
export class PdfFormsModule { }