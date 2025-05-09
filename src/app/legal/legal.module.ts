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

//start legal action sangita

import { LegalMenuComponent } from '../../app/legal/legal-menu/legal-menu.component';
import { LegalComponent } from '../../app/legal/legal.component';
import { AdvocatesGridComponent } from '../../app/legal/advocates/advocates-grid/advocates-grid.component';
import { AdvocatesFormComponent } from '../../app/legal/advocates/advocates-form/advocates-form.component';
import { CrViewComponent } from '../../app/legal/case-registration/cr-view/cr-view.component';
import { CrFormComponent } from '../../app/legal/case-registration/cr-form/cr-form.component';
import { CpViewComponent } from '../../app/legal/case-proceeding/cp-view/cp-view.component';
import { CpFormComponent } from '../../app/legal/case-proceeding/cp-form/cp-form.component';
import { CpCrViewComponent } from '../../app/legal/case-proceeding/cp-cr-grid/cp-cr-grid.component';
import { AdvPayGridComponent } from '../../app/legal/advocate-payment/adv-pay-grid/adv-pay-grid.component';
import { AdvPayFormComponent } from '../../app/legal/advocate-payment/adv-pay-form/adv-pay-form.component';
import { CavGridComponent } from '../../app/legal/change-advocate/cav-grid/cav-grid.component';
import { CavFormComponent } from '../../app/legal/change-advocate/cav-form/cav-form.component';
import { FmGridComponent } from '../../app/legal/file-movement/fm-grid/fm-grid.component';
import { FmFormComponent } from '../../app/legal/file-movement/fm-form/fm-form.component';
import { QueryComponent } from '../../app/legal/query/query.component';
import { BillsToFinanceComponent } from '../../app/legal/bills-to-finance/bills-to-finance.component';


//end legal action sangita

const routes: Routes = [
  {

    path: 'employedadvocates', component: LegalComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: AdvocatesGridComponent
      },
      { path: 'employedadvocates-form', component: AdvocatesFormComponent }

    ]


  }, //ALDA  

  {
    path: 'caseregistration', component: LegalComponent,
    children: [{ path: '', component: CrViewComponent },
    { path: 'case-reg-form', component: CrFormComponent },
    { path: 'case-reg-form/:CaseId/:mode', component: CrFormComponent }
    ]
  },

  {
    path: 'caseproceeding', component: LegalComponent,
    children: [{ path: '', component: CpCrViewComponent },
    { path: 'case-pro-form/:Id/:mode/:CaseProcId', component: CpFormComponent },
    { path: 'case-pro-form', component: CpFormComponent },
    { path: 'cp-view/:CaseId', component: CpViewComponent }
    ]
  },
  {

    path: 'advocate-pay', component: LegalComponent,
    children: [{ path: '', component: AdvPayGridComponent },
    { path: ':AdvId/:CaseId', component: AdvPayGridComponent },
    { path: 'advocate-pay-form/:AdvId/:CaseId/:AP_Id/:mode', component: AdvPayFormComponent },
    { path: 'advocate-pay-form', component: AdvPayFormComponent }
      // { path: 'advocate-pay-form/:AdvId/:CaseId/:AP_Id/:mode', component: AdvPayFormComponent }
    ]
  },

  {
    path: 'adv-change', component: LegalComponent,
    children: [{ path: '', component: CavGridComponent },
    { path: 'adv-change-form', component: CavFormComponent }
    ]
  },
  {
    path: 'filemovement', component: LegalComponent,
    children: [{ path: '', component: FmGridComponent },
    { path: 'filemovement-form', component: FmFormComponent },
    { path: 'filemovement-form/:FM_Id/:mode', component: FmFormComponent }

    ]
  },
  {
    path: 'Query', component: LegalComponent,
    children: [{ path: '', component: QueryComponent },
    { path: 'case/:CaseId', component: QueryComponent }
    ]
  },

  {
    path: 'BillsToFinance', component: LegalComponent,
    children: [{ path: '', component: BillsToFinanceComponent }
    ]
  },


];

@NgModule({
  declarations: [
    LegalMenuComponent, LegalComponent, AdvocatesGridComponent, AdvocatesFormComponent,
     CrViewComponent, CrFormComponent, CpViewComponent, CpFormComponent, CpCrViewComponent, AdvPayGridComponent, AdvPayFormComponent
    , CavGridComponent, CavFormComponent, FmGridComponent, FmFormComponent, QueryComponent, BillsToFinanceComponent

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
export class LegalModule { }