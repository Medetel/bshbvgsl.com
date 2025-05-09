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

//start town planning poonam
import { PlanningComponent } from '../../app/planning/planning.component';
import { ProjectReceivedLpGridComponent } from '../../app/planning/project-received-land-pro-details/project-received-lp-grid/project-received-lp-grid.component';
import { ProjectPhaseGridComponent } from '../../app/planning/project-phase-details/project-phase-grid/project-phase-grid.component';
import { ProjectPhaseFormComponent } from '../../app/planning/project-phase-details/project-phase-form/project-phase-form.component';
import { ConsultantListComponent } from '../../app/planning/consultant/consultant-list/consultant-list.component';
import { ConsultantFromComponent } from '../../app/planning/consultant/consultant-from/consultant-from.component';
import { LandrecordlistComponent } from '../../app/planning/land-record/landrecordlist/landrecordlist.component';
import { LandrecordformComponent } from '../../app/planning/land-record/landrecordform/landrecordform.component';
import { StatutoryClearancesGridComponent } from '../../app/planning/statutory-clearances/statutory-clearances-grid/statutory-clearances-grid.component';
import { StatutoryClearancesFormComponent } from '../../app/planning/statutory-clearances/statutory-clearances-form/statutory-clearances-form.component';
import { KhbDrawingGridComponent } from '../../app/planning/khb-drawing/khb-drawing-grid/khb-drawing-grid.component';
import { KhbDrawingFormComponent } from '../../app/planning/khb-drawing/khb-drawing-form/khb-drawing-form.component';
import { ApprovedDrawingGridComponent } from '../../app/planning/approved-drawing/approved-drawing-grid/approved-drawing-grid.component';
import { ApprovedDrawingFormComponent } from '../../app/planning/approved-drawing/approved-drawing-form/approved-drawing-form.component';
import { PropertiesregisterListComponent } from '../../app/planning/propertiesregister/propertiesregister-list/propertiesregister-list.component';
import { PropertiesregisterFormComponent } from '../../app/planning/propertiesregister/propertiesregister-form/propertiesregister-form.component';
import { RevisedDrawingGridComponent } from '../../app/planning/revised-drawing/revised-drawing-grid/revised-drawing-grid.component';
import { RevisedDrawingFormComponent } from '../../app/planning/revised-drawing/revised-drawing-form/revised-drawing-form.component';
import { RevisedpropertyregisterGridComponent } from '../../app/planning/revisedpropertyregister/revisedpropertyregister-grid/revisedpropertyregister-grid.component';
import { RevisedpropertyregisterFormComponent } from '../../app/planning/revisedpropertyregister/revisedpropertyregister-form/revisedpropertyregister-form.component';
import { PrAllotmentGridComponent } from '../../app/planning/pr-allotment/pr-allotment-grid/pr-allotment-grid.component';
import { PrAllotmentFormComponent } from '../../app/planning/pr-allotment/pr-allotment-form/pr-allotment-form.component';
import { PrAllotmentNotsentComponent } from '../../app/planning/pr-allotment/pr-allotment-notsent/pr-allotment-notsent.component';
import { PropertyPlanAlllistComponent } from '../../app/planning/pr-allotment/property-plan-alllist/property-plan-alllist.component';
import { PlanningMenuComponent } from '../../app/planning/planning-menu/planning-menu.component';
//end town planning poonam

const routes: Routes = [
  {

    path: 'project-received-lp', component: PlanningComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: ProjectReceivedLpGridComponent
      },


    ]


  }, //ALDA  

  {
    path: 'project-phase', component: PlanningComponent,
    children: [{ path: '', component: ProjectPhaseGridComponent },
    { path: 'project-phase-form', component: ProjectPhaseFormComponent },
    { path: 'project-phase-form/:PD_Id/:PP_Id/:mode', component: ProjectPhaseFormComponent }
    ]
  },

  {
    path: 'consultant', component: PlanningComponent,
    children: [{ path: '', component: ConsultantListComponent },
    { path: 'consultant-form', component: ConsultantFromComponent },
    { path: 'consultant-form/:CD_Id/:mode', component: ConsultantFromComponent }
    ]
  },

  {
    path: 'landrecord', component: PlanningComponent,
    children: [{ path: '', component: LandrecordlistComponent },
    { path: 'land-form', component: LandrecordformComponent }
    ]
  },
  {
    path: 'statutory', component: PlanningComponent,
    children: [{ path: '', component: StatutoryClearancesGridComponent },
    { path: 'statutory-form', component: StatutoryClearancesFormComponent },
    { path: 'statutory-form/:PD_Id/:mode', component: StatutoryClearancesFormComponent }
    ]
  },

  {
    path: 'drawingbybshb', component: PlanningComponent,
    children: [{ path: '', component: KhbDrawingGridComponent },
    { path: 'drawingbybshb-form', component: KhbDrawingFormComponent },
    { path: 'drawingbybshb-form/:PD_Id/:mode', component: KhbDrawingFormComponent }
    ]
  },

  {
    path: 'approveddrawing', component: PlanningComponent,
    children: [{ path: '', component: ApprovedDrawingGridComponent },
    { path: 'approveddrawing-form', component: ApprovedDrawingFormComponent },
    { path: 'approveddrawing-form/:PD_Id/:mode', component: ApprovedDrawingFormComponent }
    ]
  },

  {
    path: 'property-register', component: PlanningComponent,
    children: [{ path: '', component: PropertiesregisterListComponent },
    { path: 'propertiesregister-form', component: PropertiesregisterFormComponent }
    ]
  },

  {
    path: 'reviseddrawing', component: PlanningComponent,
    children: [{ path: '', component: RevisedDrawingGridComponent },
    { path: 'reviseddrawing-form', component: RevisedDrawingFormComponent },
    { path: 'reviseddrawing-form/:PD_Id/:mode', component: RevisedDrawingFormComponent }
    ]
  },
  {
    path: 'revised-property', component: PlanningComponent,
    children: [{ path: '', component: RevisedpropertyregisterGridComponent },
    { path: 'revised-property-form/:PR_Id/:mode', component: RevisedpropertyregisterFormComponent },
    { path: 'pre-allotment-prop/:mode', component: PrAllotmentGridComponent },
    { path: 'pre-allotmentform-prop/:PD_Id/:mode', component: PrAllotmentFormComponent },
    { path: 'pre-allotmentformnotsent-prop/:PD_Id/:mode', component: PrAllotmentNotsentComponent },
    { path: 'pre-allotmentall-prop/:PD_Id/:mode', component: PropertyPlanAlllistComponent }
    ]
  },


];

@NgModule({
  declarations: [
    PlanningMenuComponent, PlanningComponent, ProjectReceivedLpGridComponent,
    ProjectPhaseGridComponent, ProjectPhaseFormComponent,
    ConsultantListComponent, ConsultantFromComponent, LandrecordlistComponent, LandrecordformComponent,
    StatutoryClearancesGridComponent, StatutoryClearancesFormComponent, KhbDrawingGridComponent, KhbDrawingFormComponent, ApprovedDrawingGridComponent,
    ApprovedDrawingFormComponent, PropertiesregisterListComponent, PropertiesregisterFormComponent, RevisedDrawingGridComponent,
    RevisedDrawingFormComponent, RevisedpropertyregisterGridComponent, RevisedpropertyregisterFormComponent,
    PrAllotmentGridComponent, PrAllotmentFormComponent, PrAllotmentNotsentComponent, PropertyPlanAlllistComponent
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
export class PlanningModule { }