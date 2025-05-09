import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { LoginComponent } from './login/login.component';
import { ApplicantLoginComponent } from './applicant-login/applicant-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { ApplicantRegisterComponent } from './applicant-register/applicant-register.component';
import { ApplicantRegisterFormComponent } from './applicant-register-form/applicant-register-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmPawordComponent } from './confirm-password/confirm-password.component';
import { ForgotPasswordOtpComponent } from './forgot-password-otp/forgot-password-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
    },
    {
    path: 'forgot-password-otp',
    component: ForgotPasswordOtpComponent
    },
    {
    path: 'confirm-password',
    component: ConfirmPawordComponent
    },
  {
    path: 'applicant-login', component: ApplicantLoginComponent,
    //children: [{ path: '', component: ApplicantLoginComponent }]
  },

  
  {
    path: 'employee-login', component: EmployeeLoginComponent,
    //children: [{ path: '', component: EmployeeLoginComponent }]
  },

  
  {
     path: 'applicant-register', component: ApplicantRegisterComponent, 
     //children: [{ path: 'applicant-register-form/:NO_Id/:PD_Id/:appmode', component: ApplicantRegisterFormComponent }]

  },

  
  { 
    path: 'applicant-register-form/:NO_Id/:PD_Id/:appmode', component: ApplicantRegisterFormComponent 
  },

  

];

@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    ApplicantLoginComponent,
    EmployeeLoginComponent,
    ApplicantRegisterComponent,
    ApplicantRegisterFormComponent,ForgotPasswordComponent,ForgotPasswordOtpComponent,ConfirmPawordComponent

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
export class RegistrationModule { }