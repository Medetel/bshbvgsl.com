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

//start master land 
import { MasterMenuComponent } from '../../app/master/master-menu/master-menu.component';
import { MasterComponent } from '../../app/master/master.component';
import { DistrictViewComponent } from '../../app/master/district/district-view/district-view.component';
import { DistrictFormComponent } from '../../app/master/district/district-form/district-form.component';
import { CourtViewComponent } from '../../app/master/court/court-view/court-view.component';
import { CourtFormComponent } from '../../app/master/court/court-form/court-form.component';
import { CourttypeViewComponent } from '../../app/master/court-type/courttype-view/courttype-view.component';
import { CourttypeFormComponent } from '../../app/master/court-type/courttype-form/courttype-form.component';
import { DeptViewComponent } from '../../app/master/department/dept-view/dept-view.component';
import { DeptFormComponent } from '../../app/master/department/dept-form/dept-form.component';
import { OfficeGridComponent } from '../../app/master/office/office-grid/office-grid.component';
import { OfficeFormComponent } from '../../app/master/office/office-form/office-form.component';
import { ProjectmasterGridComponent } from '../../app/master/project-master/projectmaster-grid/projectmaster-grid.component';
import { ProjectmasterFormComponent } from '../../app/master/project-master/projectmaster-form/projectmaster-form.component';
import { CasetypeGridComponent } from '../../app/master/casetype/casetype-grid/casetype-grid.component';
import { CasetypeFormComponent } from '../../app/master/casetype/casetype-form/casetype-form.component';
import { FilemasterFormComponent } from '../../app/master/file-master/filemaster-form/filemaster-form.component';
import { FilemasterGridComponent } from '../../app/master/file-master/filemaster-grid/filemaster-grid.component';
import { ReservationFormComponent } from '../../app/master/reservation/reservation-form/reservation-form.component';
import { ReservationGridComponent } from '../../app/master/reservation/reservation-grid/reservation-grid.component';
import { BankDetailsFormComponent } from '../../app/master/bank-details/bank-details-form/bank-details-form.component';
import { BankDetailsGridComponent } from '../../app/master/bank-details/bank-details-grid/bank-details-grid.component';
import { CategoryFormComponent } from '../../app/master/category/category-form/category-form.component';
import { CategoryGridComponent } from '../../app/master/category/category-grid/category-grid.component';
//end master land 

const routes: Routes = [
  {

    path: 'district', component: MasterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: DistrictViewComponent
      },
      { path: 'district-form', component: DistrictFormComponent },
      { path: 'district-form/:DI_Id/:mode', component: DistrictFormComponent },



    ]

  }, //ALDA
  {
    path: 'court', component: MasterComponent,
    children: [{ path: '', component: CourtViewComponent },
    { path: 'court-form', component: CourtFormComponent },
    { path: 'court-form/:Court_Id/:mode', component: CourtFormComponent }
    ]
  },

  {
    path: 'courttype', component: MasterComponent,
    children: [{ path: '', component: CourttypeViewComponent },
    { path: 'courttype-form', component: CourttypeFormComponent },
    { path: 'courttype-form/:CourtT_Id/:mode', component: CourttypeFormComponent }
    ]
  },
  {
    path: 'dept', component: MasterComponent,
    children: [{ path: '', component: DeptViewComponent },
    { path: 'dept-form', component: DeptFormComponent },
    { path: 'dept-form/:Department_Id/:mode', component: DeptFormComponent }
    ]
  },
  {
    path: 'office', component: MasterComponent,
    children: [{ path: '', component: OfficeGridComponent },
    { path: 'officeform', component: OfficeFormComponent },
    { path: 'officeform/:OfficeId/:mode', component: OfficeFormComponent }
    ]
  },
  {
    path: 'project-master', component: MasterComponent,
    children: [{ path: '', component: ProjectmasterGridComponent },
    { path: 'project-master-form', component: ProjectmasterFormComponent }
    ]
  },
  {
    path: 'casetype', component: MasterComponent,
    children: [{ path: '', component: CasetypeGridComponent },
    { path: 'casetype-form', component: CasetypeFormComponent },
    { path: 'casetype-form/:CaseType_Id/:mode', component: CasetypeFormComponent }
    ]
  },
  {
    path: 'filemaster', component: MasterComponent,
    children: [{ path: '', component: FilemasterGridComponent },
    { path: 'filemaster-form', component: FilemasterFormComponent },
    { path: 'filemaster-form/:File_Id/:mode', component: FilemasterFormComponent }
    ]
  },
  {
    path: 'reservation-master', component: MasterComponent,
    children: [{ path: '', component: ReservationGridComponent },
    { path: 'reservation-master-form', component: ReservationFormComponent },
    //{ path: 'reservation-master-form/:RES_Id/:mode', component: ReservationFormComponent },
    { path: 'reservation-master-form/:created_date/:mode', component: ReservationFormComponent }
    ]
},
{
  path: 'bank-details', component: MasterComponent,
  children: [{ path: '', component: BankDetailsGridComponent },
  { path: 'bank-details-form', component: BankDetailsFormComponent },
  { path: 'bank-details-form/:bd_id/:mode', component: BankDetailsFormComponent }
  ]
 },
 {
  path: 'category', component: MasterComponent,
  children: [{ path: '', component: CategoryGridComponent },
  { path: 'category-form', component: CategoryFormComponent },
  { path: 'category-form/:CA_Id/:mode', component: CategoryFormComponent }
  ]
},

];

@NgModule({
  declarations: [
    MasterMenuComponent, MasterComponent,
    DistrictViewComponent, DistrictFormComponent, CourtViewComponent, CourtFormComponent,
    CourttypeViewComponent, CourttypeFormComponent, DeptViewComponent, DeptFormComponent, OfficeGridComponent, OfficeFormComponent, ProjectmasterGridComponent,
    ProjectmasterFormComponent, CasetypeGridComponent, CasetypeFormComponent, FilemasterFormComponent, FilemasterGridComponent,
    ReservationGridComponent,ReservationFormComponent,BankDetailsFormComponent,BankDetailsGridComponent,CategoryGridComponent,CategoryFormComponent,
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
export class MasterlandModule { }