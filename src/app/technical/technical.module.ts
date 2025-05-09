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

//start technical anita
import { TechnicalMenuComponent } from '../../app/technical/technical-menu/technical-menu.component';
import { TechnicalComponent } from '../../app/technical/technical.component';
import { TenderGridComponent } from '../../app/technical/tender/tender-grid/tender-grid.component';
import { TenderFormComponent } from '../../app/technical/tender/tender-form/tender-form.component';
import { StaffGridComponent } from '../../app/technical/staff/staff-grid/staff-grid.component';
import { StaffFormComponent } from '../../app/technical/staff/staff-form/staff-form.component';
import { EquipmentGridComponent } from '../../app/technical/equipment/equipment-grid/equipment-grid.component';
import { EquipmentFormComponent } from '../../app/technical/equipment/equipment-form/equipment-form.component';
import { BoqGridComponent } from '../../app/technical/basline-boq/boq-grid/boq-grid.component';
import { BoqFormComponent } from '../../app/technical/basline-boq/boq-form/boq-form.component';
import { ActivityGridComponent } from '../../app/technical/project-activity/activity-grid/activity-grid.component';
import { ActivityFormComponent } from '../../app/technical/project-activity/activity-form/activity-form.component';
import { JobgroupViewComponent } from '../../app/technical/jobgroup/jobgroup-view/jobgroup-view.component';
import { JobgroupFormComponent } from '../../app/technical/jobgroup/jobgroup-form/jobgroup-form.component';
import { JobsViewComponent } from '../../app/technical/jobs/jobs-view/jobs-view.component';
import { JobsFormComponent } from '../../app/technical/jobs/jobs-form/jobs-form.component';
import { StructuresViewComponent } from '../../app/technical/structures/structures-view/structures-view.component';
import { StructuresFormComponent } from '../../app/technical/structures/structures-form/structures-form.component';
import { StructuresplanningGridComponent } from '../../app/technical/structures-planning/structuresplanning-grid/structuresplanning-grid.component';
import { StructuresplanningFormComponent } from '../../app/technical/structures-planning/structuresplanning-form/structuresplanning-form.component';
import { BoqitemGridComponent } from '../../app/technical/boq-item/boqitem-grid/boqitem-grid.component';
import { BoqitemFormComponent } from '../../app/technical/boq-item/boqitem-form/boqitem-form.component';
import { MilestoneGridComponent } from '../../app/technical/milestones/milestone-grid/milestone-grid.component';
import { MilestoneFormComponent } from '../../app/technical/milestones/milestone-form/milestone-form.component';
import { PhasescheduleGridComponent } from '../../app/technical/schedule/phaseschedule-grid/phaseschedule-grid.component';
import { PhasescheduleFormComponent } from '../../app/technical/schedule/phaseschedule-form/phaseschedule-form.component';
import { ContractorGridComponent } from '../../app/technical/contractor/contractor-grid/contractor-grid.component';
import { ContractorFormComponent } from '../../app/technical/contractor/contractor-form/contractor-form.component';
import { ContractordocGridComponent } from '../../app/technical/contractor-documents/contractordoc-grid/contractordoc-grid.component';
import { ContractordocFormComponent } from '../../app/technical/contractor-documents/contractordoc-form/contractordoc-form.component';
import { DocTypeGridComponent } from '../../app/technical/contractor-doc-type/doc-type-grid/doc-type-grid.component';
import { DocTypeFormComponent } from '../../app/technical/contractor-doc-type/doc-type-form/doc-type-form.component';
import { EncumbrancesTypeGridComponent } from '../../app/technical/project-encumbrances-type/encumbrances-type-grid/encumbrances-type-grid.component';
import { EncumbrancesTypeFormComponent } from '../../app/technical/project-encumbrances-type/encumbrances-type-form/encumbrances-type-form.component';
import { EncumbrancesGridComponent } from '../../app/technical/project-encumbrances/encumbrances-grid/encumbrances-grid.component';
import { EncumbrancesFormComponent } from '../../app/technical/project-encumbrances/encumbrances-form/encumbrances-form.component';
import { QuantumGridComponent } from '../../app/technical/encumbrances-quantum/quantum-grid/quantum-grid.component';
import { QuantumFormComponent } from '../../app/technical/encumbrances-quantum/quantum-form/quantum-form.component';
import { DesignIssueTypeGridComponent } from '../../app/technical/project-design-issue-type/design-issue-type-grid/design-issue-type-grid.component';
import { DesignIssueTypeFormComponent } from '../../app/technical/project-design-issue-type/design-issue-type-form/design-issue-type-form.component';
import { DesignIssueGridComponent } from '../../app/technical/project-design-issue/design-issue-grid/design-issue-grid.component';
import { DesignIssueFormComponent } from '../../app/technical/project-design-issue/design-issue-form/design-issue-form.component';
import { ScheduleExtensionGridComponent } from '../../app/technical/schedule-extension/schedule-extension-grid/schedule-extension-grid.component';
import { ScheduleExtensionFormComponent } from '../../app/technical/schedule-extension/schedule-extension-form/schedule-extension-form.component';
import { PescTypeGridComponent } from '../../app/technical/pe-sc-type/pesc-type-grid/pesc-type-grid.component';
import { PescTypeFormComponent } from '../../app/technical/pe-sc-type/pesc-type-form/pesc-type-form.component';
import { PescGridComponent } from '../../app/technical/pe-sc/pesc-grid/pesc-grid.component';
import { PescFormComponent } from '../../app/technical/pe-sc/pesc-form/pesc-form.component';
import { ProjectProgressGridComponent } from '../../app/technical/project-progress/project-progress-grid/project-progress-grid.component';
import { ProjectProgressFormComponent } from '../../app/technical/project-progress/project-progress-form/project-progress-form.component';
import { QcGridComponent } from '../../app/technical/qc/qc-grid/qc-grid.component';
import { QcFormComponent } from '../../app/technical/qc/qc-form/qc-form.component';
import { QcTypeGridComponent } from '../../app/technical/qc-type/qc-type-grid/qc-type-grid.component';
import { QcTypeFormComponent } from '../../app/technical/qc-type/qc-type-form/qc-type-form.component';

//end technical anita

const routes: Routes = [
  {

    path: 'tender', component: TechnicalComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: TenderGridComponent },
    { path: 'tender-form', component: TenderFormComponent },
    { path: 'tender-form/:Tender_id/:mode', component: TenderFormComponent }

    ]


  }, //ALDA  

  /*
  {
    path: 'project-phase', component: PlanningComponent,
    children: [{ path: '', component: ProjectPhaseGridComponent },
    { path: 'project-phase-form', component: ProjectPhaseFormComponent },
    { path: 'project-phase-form/:PD_Id/:PP_Id/:mode', component: ProjectPhaseFormComponent }
    ]
  },
*/

  {
    path: 'staffmob', component: TechnicalComponent,
    children: [{ path: '', component: StaffGridComponent },
    { path: 'staff-form', component: StaffFormComponent },
    { path: 'staff-form/:staff_mob_demob_id/:mode', component: StaffFormComponent }
    ]
  },
  {
    path: 'equipmob', component: TechnicalComponent,
    children: [{ path: '', component: EquipmentGridComponent },
    { path: 'equipment-form', component: EquipmentFormComponent },
    { path: 'equipment-form/:equipmobdemob_id/:mode', component: EquipmentFormComponent }
    ]
  },
  {
    path: 'baseline', component: TechnicalComponent,
    children: [{ path: '', component: BoqGridComponent },
    { path: 'baselineboq-form', component: BoqFormComponent },
    { path: 'baselineboq-form/:Baseline_BOQ_Id/:mode', component: BoqFormComponent }
    ]
  },
  {
    path: 'projactivity', component: TechnicalComponent,
    children: [{ path: '', component: ActivityGridComponent },
    { path: 'activity-form', component: ActivityFormComponent },
    { path: 'activity-form/:ProjectActivityJob_id/:mode', component: ActivityFormComponent }
    ]
  },
  {
    path: 'jobgroup', component: TechnicalComponent,
    children: [{ path: '', component: JobgroupViewComponent },
    { path: 'jobgroup-form', component: JobgroupFormComponent },
    { path: 'jobgroup-form/:jobgroup_id/:mode', component: JobgroupFormComponent }
    ]
  },
  {
    path: 'Jobs', component: TechnicalComponent,
    children: [{ path: '', component: JobsViewComponent },
    { path: 'jobs-form', component: JobsFormComponent },
    { path: 'jobs-form/:Job_id/:mode', component: JobsFormComponent }
    ]
  },
  {
    path: 'structures', component: TechnicalComponent,
    children: [{ path: '', component: StructuresViewComponent },
    { path: 'structures-form', component: StructuresFormComponent },
    { path: 'structures-form/:Structure_id/:mode', component: StructuresFormComponent }
    ]
  },
  {
    path: 'structuresplanning', component: TechnicalComponent,
    children: [{ path: '', component: StructuresplanningGridComponent },
    { path: 'structuresplanning-form', component: StructuresplanningFormComponent },
    { path: 'structuresplanning-form/:StructPlan_id/:mode', component: StructuresplanningFormComponent }
    ]
  },
  {
    path: 'boqitem', component: TechnicalComponent,
    children: [{ path: '', component: BoqitemGridComponent },
    { path: 'boqitem-form', component: BoqitemFormComponent },
    { path: 'boqitem-form/:boq_item_id/:mode', component: BoqitemFormComponent }
    ]
  },
  {
    path: 'milestone', component: TechnicalComponent,
    children: [{ path: '', component: MilestoneGridComponent },
    { path: 'milestone-form', component: MilestoneFormComponent },
    { path: 'milestone-form/:phase_milestone_id/:mode', component: MilestoneFormComponent }
    ]
  },
  {
    path: 'schedule', component: TechnicalComponent,
    children: [{ path: '', component: PhasescheduleGridComponent },
    { path: 'schedule-form', component: PhasescheduleFormComponent },
    { path: 'schedule-form/:PhaseSchedule_id/:mode', component: PhasescheduleFormComponent }
    ]
  },
  {
    path: 'contractor', component: TechnicalComponent,
    children: [{ path: '', component: ContractorGridComponent },
    { path: 'contractor-form', component: ContractorFormComponent },
    { path: 'contractor-form/:Contractor_id/:mode', component: ContractorFormComponent }
    ]
  }
  ,
  {
    path: 'contractordoc', component: TechnicalComponent,
    children: [{ path: '', component: ContractordocGridComponent },
    { path: 'contractordoc-form', component: ContractordocFormComponent },
    { path: 'contractordoc-form/:ContractorDoc_id/:mode', component: ContractordocFormComponent }
    ]
  },
  {
    path: 'contractordoctype', component: TechnicalComponent,
    children: [{ path: '', component: DocTypeGridComponent },
    { path: 'contractordoctype-form', component: DocTypeFormComponent }
    ]
  },
  {
    path: 'projectencumbrancetype', component: TechnicalComponent,
    children: [{ path: '', component: EncumbrancesTypeGridComponent },
    { path: 'projectencumbrancetype-form', component: EncumbrancesTypeFormComponent },
    { path: 'projectencumbrancetype-form/:encumb_id/:mode', component: EncumbrancesTypeFormComponent }
    ]
  },
  {
    path: 'projectencumbrance', component: TechnicalComponent,
    children: [{ path: '', component: EncumbrancesGridComponent },
    { path: 'projectencumbrance-form', component: EncumbrancesFormComponent },
    { path: 'projectencumbrance-form/:Projencumb_id/:mode', component: EncumbrancesFormComponent }
    ]
  },
  {
    path: 'encumbrancequantum', component: TechnicalComponent,
    children: [{ path: '', component: QuantumGridComponent },
    { path: 'encumbrancequantum-form', component: QuantumFormComponent },
    { path: 'encumbrancequantum-form/:EncumbranceQuantum_id/:mode', component: QuantumFormComponent }
    ]
  },
  {
    path: 'designissuetype', component: TechnicalComponent,
    children: [{ path: '', component: DesignIssueTypeGridComponent },
    { path: 'designissuetype-form', component: DesignIssueTypeFormComponent },
    { path: 'designissuetype-form/:desisstype_id/:mode', component: DesignIssueTypeFormComponent }
    ]
  },
  {
    path: 'designissue', component: TechnicalComponent,
    children: [{ path: '', component: DesignIssueGridComponent },
    { path: 'designissue-form', component: DesignIssueFormComponent },
    { path: 'designissue-form/:desiss_id/:mode', component: DesignIssueFormComponent }
    ]
  },
  {
    path: 'scheduleextension', component: TechnicalComponent,
    children: [{ path: '', component: ScheduleExtensionGridComponent },
    { path: 'scheduleextension-form', component: ScheduleExtensionFormComponent },
    { path: 'scheduleextension-form/:ContScheduleExt_id/:mode', component: ScheduleExtensionFormComponent }
    ]
  },
  {
    path: 'pesc-type', component: TechnicalComponent,
    children: [{ path: '', component: PescTypeGridComponent },
    { path: 'pesc-type-form', component: PescTypeFormComponent }
    ]
  },
  {
    path: 'pesc', component: TechnicalComponent,
    children: [{ path: '', component: PescGridComponent },
    { path: 'pesc-form', component: PescFormComponent }
    ]
  },
  {
    path: 'progressphoto', component: TechnicalComponent,
    children: [{ path: '', component: ProjectProgressGridComponent },
    { path: 'progressphoto-form', component: ProjectProgressFormComponent }
    ]
  },
  {
    path: 'qc-type', component: TechnicalComponent,
    children: [{ path: '', component: QcTypeGridComponent },
    { path: 'qc-type-form', component: QcTypeFormComponent }
    ]
  },
  {
    path: 'qc', component: TechnicalComponent,
    children: [{ path: '', component: QcGridComponent },
    { path: 'qc-form', component: QcFormComponent }
    ]
  },


];

@NgModule({
  declarations: [
    TechnicalMenuComponent, TechnicalComponent, TenderGridComponent, TenderFormComponent,
    StaffGridComponent, StaffFormComponent, EquipmentGridComponent, EquipmentFormComponent, BoqGridComponent, BoqFormComponent, ActivityGridComponent, ActivityFormComponent,
    JobgroupViewComponent, JobgroupFormComponent, JobsViewComponent, JobsFormComponent, StructuresViewComponent, StructuresFormComponent, StructuresplanningGridComponent,
    StructuresplanningFormComponent, BoqitemGridComponent, BoqitemFormComponent, MilestoneGridComponent, MilestoneFormComponent, PhasescheduleGridComponent,
    PhasescheduleFormComponent, ContractorGridComponent, ContractorFormComponent, ContractordocGridComponent, ContractordocFormComponent, DocTypeGridComponent,
    DocTypeFormComponent, EncumbrancesTypeGridComponent, EncumbrancesTypeFormComponent, EncumbrancesGridComponent, EncumbrancesFormComponent, QuantumGridComponent,
    QuantumFormComponent, DesignIssueTypeGridComponent, DesignIssueTypeFormComponent, DesignIssueGridComponent, DesignIssueFormComponent, ScheduleExtensionGridComponent,
    ScheduleExtensionFormComponent, PescTypeGridComponent, PescTypeFormComponent, PescGridComponent, PescFormComponent, ProjectProgressGridComponent,
    ProjectProgressFormComponent, QcGridComponent, QcFormComponent, QcTypeGridComponent, QcTypeFormComponent

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
export class TechnicalModule { }