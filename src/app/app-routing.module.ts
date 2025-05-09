import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomepageComponent } from '../app/homepage/homepage.component';
import { ReportsComponent } from '../app/reports/reports.component';
import { AuthGuard } from '../app/auth/auth.guard';


const routes: Routes = [
  {
    path: '', redirectTo: 'auth/login', pathMatch: 'full'
  },

  {
    path: 'auth',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: '',
    loadChildren: () => import('./pdf-forms/pdf-forms.module').then(m => m.PdfFormsModule)
  },

  {
    canActivate: [AuthGuard],
    path: 'home',
    component: HomepageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
      },

      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./applicant/applicant.module').then(m => m.ApplicantModule)
      },
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./master/masterland.module').then(m => m.MasterlandModule)
      },

      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./landprocurement/landprocurement.module').then(m => m.LandprocurementModule)
      },

      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./planning/planning.module').then(m => m.PlanningModule)
      },
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./technical/technical.module').then(m => m.TechnicalModule)
      },
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./allocation/allocation.module').then(m => m.AllocationModule)
      },
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule)
      },
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./recovery/recovery.module').then(m => m.RecoveryModule)
      },
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./hrms/hrms.module').then(m => m.HrmsModule)
      },

      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./ultilities/ultilities.module').then(m => m.UltilitiesModule)
      },

      {
        canActivate: [AuthGuard],
        path: 'reports',
        component: ReportsComponent
      },

      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('./rtionline/rtionline.module').then(m => m.RtionlineModule)
      },

      // {
      //   canActivate: [AuthGuard],
      //   path: '',
      //   loadChildren: () => import('./pdf-forms/pdf-forms.module').then(m => m.PdfFormsModule)
      // },
    ]
  }


];



@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }