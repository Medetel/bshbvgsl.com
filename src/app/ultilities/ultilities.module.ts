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
import { UltilitiesMenuComponent } from '../ultilities/ultilities-menu/ultilities-menu.component';
import { UltilitiesComponent } from '../ultilities/ultilities.component';
import { RolesGridComponent } from '../ultilities/roles/roles-grid/roles-grid.component';
import { RolesFormComponent } from '../ultilities/roles/roles-form/roles-form.component';
import { UserGridComponent } from '../ultilities/user/user-grid/user-grid.component';
import { UserFormComponent } from '../ultilities/user/user-form/user-form.component';
import { ClaimGridComponent } from '../ultilities/claims/claims/claim-grid/claim-grid.component';
import { ClaimFormComponent } from '../ultilities/claims/claims/claim-form/claim-form.component';
import { ChangePasswordComponent } from '../ultilities/change-password/change-password.component';
import { LoginlocComponent } from '../ultilities/loginloc/loginloc.component';
import { LogGridComponent } from '../ultilities/auditTrail-log/loggrid.component';
import { WorkflowAlertComponent } from '../ultilities/workflow-alert/workflow-alert/workflow-alert.component';
import { WorkflowAlertGridComponent } from '../ultilities/workflow-alert/workflow-alert-grid/workflow-alert-grid.component';

//end recovery karishma

const routes: Routes = [
  {

    path: 'rolesgrid', component: UltilitiesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: RolesGridComponent
      },
      { path: 'rolesform', component: RolesFormComponent },
      { path: 'rolesform/:roleId/:mode', component: RolesFormComponent }

    ]


  }, //ALDA  

  {
    path: 'user', component: UltilitiesComponent,
    children: [{ path: '', component: UserGridComponent },
    { path: 'userform', component: UserFormComponent },
    { path: 'userform/:Id/:mode', component: UserFormComponent }
    ]
  },

  {
    path: 'claims', component: UltilitiesComponent,
    children: [{ path: '', component: ClaimGridComponent },
    { path: 'claimform/:roleId/:roleName', component: ClaimFormComponent }
    ]
  },

  {
    path: 'password', component: UltilitiesComponent,
    children: [{ path: '', component: ChangePasswordComponent }]
  },
  {
    path: 'login-loc', component: UltilitiesComponent,
    children: [{ path: '', component: LoginlocComponent }]
  },


  {
    path: 'log-view', component: UltilitiesComponent,
    children: [{ path: '', component: LogGridComponent },
    { path: 'reroute/:mode', component: LogGridComponent }]
  },

  {
    path: 'password/:userId', component: UltilitiesComponent,
    children: [{ path: '', component: ChangePasswordComponent }]
  },

  {
    path: 'workflow', component: UltilitiesComponent,
    children: [
      { path: 'workflow-form', component: WorkflowAlertComponent },
      { path: '', component: WorkflowAlertGridComponent },
    ]
  },



];

@NgModule({
  declarations: [
    UltilitiesMenuComponent, UltilitiesComponent, RolesGridComponent, RolesFormComponent
    , UserGridComponent, UserFormComponent, ClaimGridComponent, ClaimFormComponent, ChangePasswordComponent, LoginlocComponent
    , LogGridComponent, WorkflowAlertComponent, WorkflowAlertGridComponent

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
export class UltilitiesModule { }