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

//start hrms ankita
import { HrmsMenuComponent } from '../hrms/hrms-menu/hrms-menu.component';
import { HrmsComponent } from '../hrms/hrms.component';
import { ServiceregisterComponent } from '../hrms/serviceregister/serviceregister.component';
import { EmpBasicDetailGridComponent } from '../hrms/serviceregister/employee-basic-details/emp-basic-detail-grid/emp-basic-detail-grid.component';
import { EmpBasicDetailFormComponent } from '../hrms/serviceregister/employee-basic-details/emp-basic-detail-form/emp-basic-detail-form.component';
import { DependentGridComponent } from '../hrms/serviceregister/dependent-details/dependent-grid/dependent-grid.component';
import { DependentFormComponent } from '../hrms/serviceregister/dependent-details/dependent-form/dependent-form.component';
import { ServiceRegViewFormComponent } from '../hrms/serviceregister/service-register-views/service-reg-view-form/service-reg-view-form.component';
import { QualificationInputGridComponent } from '../hrms/serviceregister/qualification-input/qualification-input-grid/qualification-input-grid.component';
import { QualificationInputFormComponent } from '../hrms/serviceregister/qualification-input/qualification-input-form/qualification-input-form.component';
import { LeaveDetailsGridComponent } from '../hrms/serviceregister/leave-details/leave-details-grid/leave-details-grid.component';
import { LeaveDetailsFormComponent } from '../hrms/serviceregister/leave-details/leave-details-form/leave-details-form.component';
import { BankDetailsGridComponent } from '../hrms/serviceregister/bank-details/bank-details-grid/bank-details-grid.component';
import { BankDetailsFormComponent } from '../hrms/serviceregister/bank-details/bank-details-form/bank-details-form.component';
import { AddressDetailsComponent } from '../hrms/serviceregister/address-details/address-details/address-details.component';
import { AddressDetailsFormComponent } from '../hrms/serviceregister/address-details/address-details-form/address-details-form.component';
import { ExperiencedetailsGridComponent } from '../hrms/serviceregister/experiencedetails/experiencedetails-grid/experiencedetails-grid.component';
import { ExperiencedetailsFormComponent } from '../hrms/serviceregister/experiencedetails/experiencedetails-form/experiencedetails-form.component';
import { PoliceVerificationGridComponent } from '../hrms/serviceregister/Police Verification/police-verification-grid/police-verification-grid.component';
import { PoliceVerificationComponent } from '../hrms/serviceregister/Police Verification/police-verification/police-verification.component';
import { LeaveBalDetGridComponent } from '../hrms/serviceregister/leave-balance-details/leave-bal-det-grid/leave-bal-det-grid.component';
import { LeaveBalDetFormComponent } from '../hrms/serviceregister/leave-balance-details/leave-bal-det-form/leave-bal-det-form.component';
import { MasterDisplayComponent } from '../master/master-display/master-display.component';
import { ReligionGridComponent } from '../master/religion/religion-grid/religion-grid.component';
import { ReligionFormComponent } from '../master/religion/religion-form/religion-form.component';
import { CasteGridComponent } from '../master/caste/caste-grid/caste-grid.component';
import { CasteFormComponent } from '../master/caste/caste-form/caste-form.component';
import { DesignationGridComponent } from '../master/designations/designation-grid/designation-grid.component';
import { DesignationFormComponent } from '../master/designations/designation-form/designation-form.component';
import { ScalesGridComponent } from '../master/scales/scales-grid/scales-grid.component';
import { ScalesFormComponent } from '../master/scales/scales-form/scales-form.component';
import { LeavesGridComponent } from '../master/leaves/leaves-grid/leaves-grid.component';
import { LeavesFormComponent } from '../master/leaves/leaves-form/leaves-form.component';
import { SalaryGridComponent } from '../master/salary/salary-grid/salary-grid.component';
import { SalaryFormComponent } from '../master/salary/salary-form/salary-form.component';
import { HolidaycalendarGridComponent } from '../master/holidaycalendar/holidaycalendar-grid/holidaycalendar-grid.component';
import { HolidaycalendarFormComponent } from '../master/holidaycalendar/holidaycalendar-form/holidaycalendar-form.component';
import { HospitalGridComponent } from '../master/hospitals/hospital-grid/hospital-grid.component';
import { HospitalFormComponent } from '../master/hospitals/hospital-form/hospital-form.component';
import { MasterCalendarGridComponent } from '../master/master-calendar/master-calendar-grid/master-calendar-grid.component';
import { MasterCalendarFormComponent } from '../master/master-calendar/master-calendar-form/master-calendar-form.component';
import { PayrollComponent } from '../hrms/payroll/payroll.component';
import { PayrollMastersComponent } from '../hrms/payroll/payroll-masters/payroll-masters.component';
import { AllowanceCodeGridComponent } from '../hrms/payroll/payroll-masters/allowance-codes/allowance-code-grid/allowance-code-grid.component';
import { AllowanceCodeComponent } from '../hrms/payroll/payroll-masters/allowance-codes/allowance-code/allowance-code.component';
import { DeductionCodeGridComponent } from '../hrms/payroll/payroll-masters/deduction-codes/deduction-code-grid/deduction-code-grid.component';
import { DeductionCodeComponent } from '../hrms/payroll/payroll-masters/deduction-codes/deduction-code/deduction-code.component';
import { FormulaGridComponent } from '../hrms/payroll/payroll-masters/formula-details/formula-grid/formula-grid.component';
import { FormulaFormComponent } from '../hrms/payroll/payroll-masters/formula-details/formula-form/formula-form.component';
import { OrganisationProfileComponent } from '../hrms/payroll/organisation-profile/organisation-profile.component';
import { IncomeTaxGridComponent } from '../hrms/payroll/organisation-profile/income-tax/income-tax-grid/income-tax-grid.component';
import { ProfessionalTaxGridComponent } from '../hrms/payroll/organisation-profile/professional-tax/professional-tax-grid/professional-tax-grid.component';
import { ProfessionalTaxFormComponent } from '../hrms/payroll/organisation-profile/professional-tax/professional-tax-form/professional-tax-form.component';
import { IncomeTaxFormComponent } from '../hrms/payroll/organisation-profile/income-tax/income-tax-form/income-tax-form.component';
import { ControlDataComponent } from '../hrms/payroll/organisation-profile/control-data/control-data.component';
import { PayMonthlyGridComponent } from '../hrms/payroll/organisation-profile/pay-mothly-details/pay-monthly-grid/pay-monthly-grid.component';
import { PayMonthlyFormComponent } from '../hrms/payroll/organisation-profile/pay-mothly-details/pay-monthly-form/pay-monthly-form.component';
import { EmpSalaryDetailsComponent } from '../hrms/payroll/emp-salary-details/emp-salary-details.component';
import { EmpBasicDetailsGridComponent } from '../hrms/payroll/emp-salary-details/emp-basic-details/emp-basic-details-grid/emp-basic-details-grid.component';
import { FixedAllowanceGridComponent } from '../hrms/payroll/emp-salary-details/fixed-allowance/fixed-allowance-grid/fixed-allowance-grid.component';
import { FixedAllowanceFormComponent } from '../hrms/payroll/emp-salary-details/fixed-allowance/fixed-allowance-form/fixed-allowance-form.component';
import { VariableAllowanceGridComponent } from '../hrms/payroll/emp-salary-details/variable-allowance/variable-allowance-grid/variable-allowance-grid.component';
import { VariableAllowanceFormComponent } from '../hrms/payroll/emp-salary-details/variable-allowance/variable-allowance-form/variable-allowance-form.component';
import { FixedDeductionGridComponent } from '../hrms/payroll/emp-salary-details/fixed-deductions/fixed-deduction-grid/fixed-deduction-grid.component';
import { VariableDeductionGridComponent } from '../hrms/payroll/emp-salary-details/variable-deductions/variable-deduction-grid/variable-deduction-grid.component';
import { VariableDeductionFormComponent } from '../hrms/payroll/emp-salary-details/variable-deductions/variable-deduction-form/variable-deduction-form.component';
import { LoanDetFormComponent } from '../hrms/payroll/emp-salary-details/loan-details/loan-det-form/loan-det-form.component';
import { EmpBasicDetailsFormComponent } from '../hrms/payroll/emp-salary-details/emp-basic-details/emp-basic-details-form/emp-basic-details-form.component';
import { PayrollProcessDetailsMenuComponent } from '../hrms/payroll/payroll-process-details/payroll-process-details-menu/payroll-process-details-menu.component';
import { PayrollPaymonthComponent } from '../hrms/payroll/payroll-process-details/payroll-paymonth/payroll-paymonth.component';
import { PayrollAttendaceLeaveComponent } from '../hrms/payroll/payroll-process-details/payroll-attendace-leave/payroll-attendace-leave.component';
import { PayrollProcessPayrollComponent } from '../hrms/payroll/payroll-process-details/payroll-process-payroll/payroll-process-payroll.component';
import { PayrollFinalizePayrollComponent } from '../hrms/payroll/payroll-process-details/payroll-finalize-payroll/payroll-finalize-payroll.component';
import { PayrollReportsMenuComponent } from '../hrms/payroll/payroll-reports/payroll-reports-menu/payroll-reports-menu.component';
import { MasterReportsComponent } from '../hrms/payroll/payroll-reports/master-reports/master-reports.component';
import { SummaryReportsComponent } from '../hrms/payroll/payroll-reports/summary-reports/summary-reports.component';
import { MiscellaneousReportsComponent } from '../hrms/payroll/payroll-reports/miscellaneous-reports/miscellaneous-reports.component';
import { VariableAllowdeductionComponent } from '../hrms/payroll/variable-allowance-deduction-details/variable-allowdeduction/variable-allowdeduction.component';
import { IncometaxParameterComponent } from '../hrms/payroll/incometax-parameter/incometax-parameter.component';
import { PayrollProcessComponent } from '../hrms/payroll/payroll-process/payroll-process.component';
import { PayrollFinalizeComponent } from '../hrms/payroll/payroll-finalize/payroll-finalize.component';
import { PayrollAuthorizeGridComponent } from '../hrms/payroll/payroll-authorize/payroll-authorize-grid/payroll-authorize-grid.component';
import { PayrollAuthorizeFormComponent } from '../hrms/payroll/payroll-authorize/payroll-authorize-form/payroll-authorize-form.component';
import { PayrollSanctionGridComponent } from '../hrms/payroll/payroll-sanction/payroll-sanction-grid/payroll-sanction-grid.component';
import { PayrollSanctionFormComponent } from '../hrms/payroll/payroll-sanction/payroll-sanction-form/payroll-sanction-form.component';
import { MonthlyAttDetComponent } from '../hrms/payroll/monthly-attendance-details/monthly-att-det/monthly-att-det.component';
import { InsuranceDetailsGridComponent } from '../hrms/payroll/insurance-details/insurance-details-grid/insurance-details-grid.component';
import { InsuranceDetailsFormComponent } from '../hrms/payroll/insurance-details/insurance-details-form/insurance-details-form.component';
import { AttendanceDetailsFormComponent } from '../hrms/payroll/attendance-details/attendance-details-form/attendance-details-form.component';
import { AttendanceDetailsGridComponent } from '../hrms/payroll/attendance-details/attendance-details-grid/attendance-details-grid.component';
import { DeductionDetailsGridComponent } from '../hrms/payroll/deduction-details/deduction-details-grid/deduction-details-grid.component';
import { DeductionDetailsFormComponent } from '../hrms/payroll/deduction-details/deduction-details-form/deduction-details-form.component';
import { AllowancesDetailsFormComponent } from '../hrms/payroll/allowances-details/allowances-details-form/allowances-details-form.component';
import { AllowancesDetailsGridComponent } from '../hrms/payroll/allowances-details/allowances-details-grid/allowances-details-grid.component';
import { TransferComponent } from '../hrms/transfer/transfer.component';
import { TransferInGridComponent } from '../hrms/transfer/transfer-in/transfer-in-grid/transfer-in-grid.component';
import { TransferInFormComponent } from '../hrms/transfer/transfer-in/transfer-in-form/transfer-in-form.component';
import { TransferOutGridComponent } from '../hrms/transfer/transfer-out/transfer-out-grid/transfer-out-grid.component';
import { TransferOutFormComponent } from '../hrms/transfer/transfer-out/transfer-out-form/transfer-out-form.component';
import { TransferAuthorizationGridComponent } from '../hrms/transfer/transfer-authorization/transfer-authorization-grid/transfer-authorization-grid.component';
import { TransferAuthorizationFormComponent } from '../hrms/transfer/transfer-authorization/transfer-authorization-form/transfer-authorization-form.component';
import { TransferSanctionGridComponent } from '../hrms/transfer/transfer-sanction/transfer-sanction-grid/transfer-sanction-grid.component';
import { TransferSanctionFormComponent } from '../hrms/transfer/transfer-sanction/transfer-sanction-form/transfer-sanction-form.component';
import { TransferRecordersGridComponent } from '../hrms/transfer/transfer-recorders/transfer-recorders-grid/transfer-recorders-grid.component';
import { TransferRecordersFormComponent } from '../hrms/transfer/transfer-recorders/transfer-recorders-form/transfer-recorders-form.component';

//nomination start
import { NominationComponent } from '../hrms/Nomination/nomination.component';
import { NominationApplicationGridComponent } from '../hrms/Nomination/Nomination-App/nomination-application-grid/nomination-application-grid.component';
import { NominationApplicationComponent } from '../hrms/Nomination/Nomination-App/nomination-application/nomination-application.component';
import { NominationApprovalGridComponent } from '../hrms/Nomination/nomination-approval/nomination-approval-grid/nomination-approval-grid.component';
import { NominationApprovalFormComponent } from '../hrms/Nomination/nomination-approval/nomination-approval-form/nomination-approval-form.component';
import { NominationSanGridComponent } from '../hrms/Nomination/nomination-san/nomination-san-grid/nomination-san-grid.component';
import { NominationRecGridComponent } from '../hrms/Nomination/nomination-rec/nomination-rec-grid/nomination-rec-grid.component';
//nomination end

//leave start
import { AttendanceLeavesComponent } from '../hrms/Attendance-Leaves/attendance-leaves.component';
import { DailyAttendanceGridComponent } from '../hrms/Attendance-Leaves/daily-attendance/daily-attendance-grid/daily-attendance-grid.component';
import { DailyAttendanceFormComponent } from '../hrms/Attendance-Leaves/daily-attendance/daily-attendance-form/daily-attendance-form.component';
import { DailyAttendanceOutGridComponent } from '../hrms/Attendance-Leaves/daily-attendance-out/daily-attendance-out-grid/daily-attendance-out-grid.component';
import { DailyAttendanceOutFormComponent } from '../hrms/Attendance-Leaves/daily-attendance-out/daily-attendance-out-form/daily-attendance-out-form.component';
import { LeaveTypeGridComponent } from '../hrms/Attendance-Leaves/Leaves/leave-type-grid/leave-type-grid.component';
import { LeaveTypeComponent } from '../hrms/Attendance-Leaves/Leaves/leave-type/leave-type.component';
import { LeaveAuthGridComponent } from '../hrms/Attendance-Leaves/leave-authorization/leave-auth-grid/leave-auth-grid.component';
import { LeaveAuthFormComponent } from '../hrms/Attendance-Leaves/leave-authorization/leave-auth-form/leave-auth-form.component';
import { LeaveSanctionGridComponent } from '../hrms/Attendance-Leaves/leave-sanction/leave-sanction-grid/leave-sanction-grid.component';
import { MonthlyLeaveAttenGridComponent } from '../hrms/Attendance-Leaves/monthly-leave-atten/monthly-leave-atten-grid/monthly-leave-atten-grid.component';
import { LeaveSanctionFormComponent } from '../hrms/Attendance-Leaves/leave-sanction/leave-sanction-form/leave-sanction-form.component';
import { TimeRollGenGridComponent } from '../hrms/Attendance-Leaves/time-roll-generation/time-roll-gen-grid/time-roll-gen-grid.component';
import { TimeRollGenFormComponent } from '../hrms/Attendance-Leaves/time-roll-generation/time-roll-gen-form/time-roll-gen-form.component';
import { TimeRollApprveGridComponent } from '../hrms/Attendance-Leaves/time-roll-approval/time-roll-apprve-grid/time-roll-apprve-grid.component';
import { TimeRollApprveFormComponent } from '../hrms/Attendance-Leaves/time-roll-approval/time-roll-apprve-form/time-roll-apprve-form.component';
import { TimeRollSanGridComponent } from '../hrms/Attendance-Leaves/time-roll-sanctions/time-roll-san-grid/time-roll-san-grid.component';
import { TimeRollSanFormComponent } from '../hrms/Attendance-Leaves/time-roll-sanctions/time-roll-san-form/time-roll-san-form.component';
import { TimeRollFinGridComponent } from '../hrms/Attendance-Leaves/time-roll-finalization/time-roll-fin-grid/time-roll-fin-grid.component';
import { TimeRollFinFormComponent } from '../hrms/Attendance-Leaves/time-roll-finalization/time-roll-fin-form/time-roll-fin-form.component';
import { TimeRollUnintiGridComponent } from '../hrms/Attendance-Leaves/time-roll-unintigrated/time-roll-uninti-grid/time-roll-uninti-grid.component';
import { TimeRollUnintiFormComponent } from '../hrms/Attendance-Leaves/time-roll-unintigrated/time-roll-uninti-form/time-roll-uninti-form.component';
//leave end

//training start
import { TrainingApprovalFormComponent } from '../hrms/Training/training-approval/training-approval-form/training-approval-form.component';
import { TrainingApprovalGridComponent } from '../hrms/Training/training-approval/training-approval-grid/training-approval-grid.component';
import { TrainingDetailsFormComponent } from '../hrms/Training/training-details/training-details-form/training-details-form.component';
import { TrainingDetailsGridComponent } from '../hrms/Training/training-details/training-details-grid/training-details-grid.component';
import { TrainingRecordGridComponent } from '../hrms/Training/training-record/training-record-grid/training-record-grid.component';
import { TrainingSanctionFormComponent } from '../hrms/Training/training-sanction/training-sanction-form/training-sanction-form.component';
import { TrainingSanctionGridComponent } from '../hrms/Training/training-sanction/training-sanction-grid/training-sanction-grid.component';
import { TrainingComponent } from '../hrms/Training/training.component';
//training end

//dept exam start
import { DepartmentalExamDetailsFormComponent } from '../hrms/Departmental-Exam/departmental-exam-details/departmental-exam-details-form/departmental-exam-details-form.component';
import { DepartmentalExamDetailsGridComponent } from '../hrms/Departmental-Exam/departmental-exam-details/departmental-exam-details-grid/departmental-exam-details-grid.component';
import { DepartmentalExamComponent } from '../hrms/Departmental-Exam/departmental-exam.component';
import { DeptExamAuthFormComponent } from '../hrms/Departmental-Exam/dept-exam-authorization/dept-exam-auth-form/dept-exam-auth-form.component';
import { DeptExamAuthComponent } from '../hrms/Departmental-Exam/dept-exam-authorization/dept-exam-auth/dept-exam-auth.component';
import { DeptExamRecordFromComponent } from '../hrms/Departmental-Exam/dept-exam-record/dept-exam-record-from/dept-exam-record-from.component';
import { DeptExamRecordGridComponent } from '../hrms/Departmental-Exam/dept-exam-record/dept-exam-record-grid/dept-exam-record-grid.component';
import { DeptExamSanctionFormComponent } from '../hrms/Departmental-Exam/dept-exam-sanction/dept-exam-sanction-form/dept-exam-sanction-form.component';
import { DeptExamSanctionGridComponent } from '../hrms/Departmental-Exam/dept-exam-sanction/dept-exam-sanction-grid/dept-exam-sanction-grid.component';
//dept exam end

//deputation starts
import { DeputationRecFormComponent } from '../hrms/deputaion/deputaion-rec/deputation-rec-form/deputation-rec-form.component';
import { DeputationRecGridComponent } from '../hrms/deputaion/deputaion-rec/deputation-rec-grid/deputation-rec-grid.component';
import { DeputaionSanctionFormComponent } from '../hrms/deputaion/deputaion-sanction/deputaion-sanction-form/deputaion-sanction-form.component';
import { DeputaionSanctionGridComponent } from '../hrms/deputaion/deputaion-sanction/deputaion-sanction-grid/deputaion-sanction-grid.component';
import { DeputaionComponent } from '../hrms/deputaion/deputaion.component';
import { DeputationAuthorizationFormComponent } from '../hrms/deputaion/deputation-authorization/deputation-authorization-form/deputation-authorization-form.component';
import { DeputationAuthorizationComponent } from '../hrms/deputaion/deputation-authorization/deputation-authorization/deputation-authorization.component';
import { DeputationInFormComponent } from '../hrms/deputaion/deputation-in/deputation-in-form/deputation-in-form.component';
import { DeputationInGridComponent } from '../hrms/deputaion/deputation-in/deputation-in-grid/deputation-in-grid.component';
import { DeputationOutFormComponent } from '../hrms/deputaion/deputation-out/deputation-out-form/deputation-out-form.component';
import { DeputationOutGridComponent } from '../hrms/deputaion/deputation-out/deputation-out-grid/deputation-out-grid.component';
//deputation ends

//dept-enquiry starts
import { ComplaintRegAuthFormComponent } from '../hrms/depart-enquiry/complaint-reg-authorization/complaint-reg-auth-form/complaint-reg-auth-form.component';
import { ComplaintRegAuthComponent } from '../hrms/depart-enquiry/complaint-reg-authorization/complaint-reg-auth/complaint-reg-auth.component';
import { ComplaintsRegFormComponent } from '../hrms/depart-enquiry/complaints-registration/complaints-reg-form/complaints-reg-form.component';
import { ComplaintsRegGridComponent } from '../hrms/depart-enquiry/complaints-registration/complaints-reg-grid/complaints-reg-grid.component';
import { DepartEnquiryMenuComponent } from '../hrms/depart-enquiry/depart-enquiry-menu/depart-enquiry-menu.component';
import { EnquiryCloserFormComponent } from '../hrms/depart-enquiry/enquiry-closure/enquiry-closer-form/enquiry-closer-form.component';
import { EnquiryCloserGridComponent } from '../hrms/depart-enquiry/enquiry-closure/enquiry-closer-grid/enquiry-closer-grid.component';
import { EnquiryProceedingFormComponent } from '../hrms/depart-enquiry/enquiry-proceedings/enquiry-proceeding-form/enquiry-proceeding-form.component';
import { EnquiryProceedingGridComponent } from '../hrms/depart-enquiry/enquiry-proceedings/enquiry-proceeding-grid/enquiry-proceeding-grid.component';
import { ExternalEnquiryClosureFormComponent } from '../hrms/depart-enquiry/external-enquiry-closure/external-enquiry-closure-form/external-enquiry-closure-form.component';
import { ExternalEnquiryClosureGridComponent } from '../hrms/depart-enquiry/external-enquiry-closure/external-enquiry-closure-grid/external-enquiry-closure-grid.component';
import { ExternalEnquiryFormComponent } from '../hrms/depart-enquiry/external-enquiry/external-enquiry-form/external-enquiry-form.component';
import { ExternalEnquiryGridComponent } from '../hrms/depart-enquiry/external-enquiry/external-enquiry-grid/external-enquiry-grid.component';
import { InitiateDepartEnquiryFormComponent } from '../hrms/depart-enquiry/initiate-depart-enquiry/initiate-depart-enquiry-form/initiate-depart-enquiry-form.component';
import { InitiateDepartEnquiryGridComponent } from '../hrms/depart-enquiry/initiate-depart-enquiry/initiate-depart-enquiry-grid/initiate-depart-enquiry-grid.component';
import { ScnAuthorizationFormComponent } from '../hrms/depart-enquiry/scn-authorization/scn-authorization-form/scn-authorization-form.component';
import { ScnAuthorizationComponent } from '../hrms/depart-enquiry/scn-authorization/scn-authorization/scn-authorization.component';
import { ScnRemainderFormComponent } from '../hrms/depart-enquiry/scn-authorization/scn-remainder-form/scn-remainder-form.component';
import { ScnRemainderComponent } from '../hrms/depart-enquiry/scn-authorization/scn-remainder/scn-remainder.component';
import { ShowCaseFormComponent } from '../hrms/depart-enquiry/show-case-noties/show-case-form/show-case-form.component';
import { ShowCaseGridComponent } from '../hrms/depart-enquiry/show-case-noties/show-case-grid/show-case-grid.component';
import { ShowCauseAckFormComponent } from '../hrms/depart-enquiry/showcause-notice-acknowledgement-dgos-reply/show-cause-ack-form/show-cause-ack-form.component';
import { ShowCauseAckGridComponent } from '../hrms/depart-enquiry/showcause-notice-acknowledgement-dgos-reply/show-cause-ack-grid/show-cause-ack-grid.component';
//dept-enquiry ends

//increments starts
import { GenIncrListGridComponent } from '../hrms/Increments/generate-increment-list/gen-incr-list-grid/gen-incr-list-grid.component';
import { GenIncrListComponent } from '../hrms/Increments/generate-increment-list/gen-incr-list/gen-incr-list.component';
import { IncrListAuthGridComponent } from '../hrms/Increments/increment-list-authorization/incr-list-auth-grid/incr-list-auth-grid.component';
import { IncrListAuthComponent } from '../hrms/Increments/increment-list-authorization/incr-list-auth/incr-list-auth.component';
import { IncrementPostingFormComponent } from '../hrms/Increments/increment-posting/increment-posting-form/increment-posting-form.component';
import { IncrementPostingGridComponent } from '../hrms/Increments/increment-posting/increment-posting-grid/increment-posting-grid.component';
import { IncrementsSanctionFormComponent } from '../hrms/Increments/increments-sanction/increments-sanction-form/increments-sanction-form.component';
import { IncrementsSanctionGridComponent } from '../hrms/Increments/increments-sanction/increments-sanction-grid/increments-sanction-grid.component';
import { IncrementsComponent } from '../hrms/Increments/increments.component';
//increment ends

//promotion starts
import { PromotionAuthFormComponent } from '../hrms/Promotions/promotion-authorization/promotion-auth-form/promotion-auth-form.component';
import { PromotionAuthGridComponent } from '../hrms/Promotions/promotion-authorization/promotion-auth-grid/promotion-auth-grid.component';
import { PromotionsSanctionFormComponent } from '../hrms/Promotions/promotions-sanction/promotions-sanction-form/promotions-sanction-form.component';
import { PromotionsSanctionGridComponent } from '../hrms/Promotions/promotions-sanction/promotions-sanction-grid/promotions-sanction-grid.component';
import { PromotionsComponent } from '../hrms/Promotions/promotions.component';
import { PromotionGridComponent } from '../hrms/Promotions/Promotions/promotion-grid/promotion-grid.component';
import { PromotionComponent } from '../hrms/Promotions/Promotions/promotion/promotion.component';
//promotion ends

//employee claims starts
import { EmployeeClaimsComponent } from '../hrms/employee-claims/employee-claims.component';
import { HtcLtcAuthComponent } from '../hrms/employee-claims/htc-ltc-authorization/htc-ltc-auth/htc-ltc-auth.component';
import { HtcLtcRecFormComponent } from '../hrms/employee-claims/htc-ltc-rec/htc-ltc-rec--form/htc-ltc-rec--form.component';
import { HtcLtcRecGridComponent } from '../hrms/employee-claims/htc-ltc-rec/htc-ltc-rec--grid/htc-ltc-rec--grid.component';
import { HtcLtcSanctionFormComponent } from '../hrms/employee-claims/htc-ltc-sanction/htc-ltc-sanction-form/htc-ltc-sanction-form.component';
import { HtcLtcSanctionGridComponent } from '../hrms/employee-claims/htc-ltc-sanction/htc-ltc-sanction-grid/htc-ltc-sanction-grid.component';
import { HtcLtcFormComponent } from '../hrms/employee-claims/htc-ltc/htc-ltc-form/htc-ltc-form.component';
import { HtcLtcGridComponent } from '../hrms/employee-claims/htc-ltc/htc-ltc-grid/htc-ltc-grid.component';
import { LeaveencashmentGridComponent } from '../hrms/employee-claims/Leave Encashment/leaveencashment-grid/leaveencashment-grid.component';
import { LeaveencashmentComponent } from '../hrms/employee-claims/Leave Encashment/leaveencashment/leaveencashment.component';
import { LeaveEncashAuthComponent } from '../hrms/employee-claims/leave-encash-authorization/leave-encash-auth/leave-encash-auth.component';
import { LeaveEncashSanctionFormComponent } from '../hrms/employee-claims/leave-encash-sanction/leave-encash-sanction-form/leave-encash-sanction-form.component';
import { LeaveEncashSanctionGridComponent } from '../hrms/employee-claims/leave-encash-sanction/leave-encash-sanction-grid/leave-encash-sanction-grid.component';
import { LeaveEncashmentRecFormComponent } from '../hrms/employee-claims/leave-encashment-rec/leave-encashment-rec-form/leave-encashment-rec-form.component';
import { LeaveEncashmentRecGridComponent } from '../hrms/employee-claims/leave-encashment-rec/leave-encashment-rec-grid/leave-encashment-rec-grid.component';
import { MedReimAuthorizationComponent } from '../hrms/employee-claims/med-reim-authorization/med-reim-authorization/med-reim-authorization.component';
import { MedReimSanctionFormComponent } from '../hrms/employee-claims/med-reim-sanction/med-reim-sanction-form/med-reim-sanction-form.component';
import { MedReimSanctionGridComponent } from '../hrms/employee-claims/med-reim-sanction/med-reim-sanction-grid/med-reim-sanction-grid.component';
import { MedicalReimbursmentRecordsFormComponent } from '../hrms/employee-claims/medical-reimbursment-records/medical-reimbursment-records-form/medical-reimbursment-records-form.component';
import { MedicalReimbursmentRecordsGridComponent } from '../hrms/employee-claims/medical-reimbursment-records/medical-reimbursment-records-grid/medical-reimbursment-records-grid.component';
import { MedicalReimburesmentGridComponent } from '../hrms/employee-claims/Medical-Reimbursment/medical-reimburesment-grid/medical-reimburesment-grid.component';
import { MedicalReimburesmentComponent } from '../hrms/employee-claims/Medical-Reimbursment/medical-reimburesment/medical-reimburesment.component';
//employee claims ends

//employee separation starts
import { EmpRetirementListComponent } from '../hrms/Employee-Separation/emp-retirement-lists/emp-retirement-list/emp-retirement-list.component';
import { EmpSepAuthFormComponent } from '../hrms/Employee-Separation/emp-sep-authorization/emp-sep-auth-form/emp-sep-auth-form.component';
import { EmpSepAuthComponent } from '../hrms/Employee-Separation/emp-sep-authorization/emp-sep-auth/emp-sep-auth.component';
import { EmpSeparationGridComponent } from '../hrms/Employee-Separation/emp-separation/emp-separation-grid/emp-separation-grid.component';
import { EmpSeparationComponent } from '../hrms/Employee-Separation/emp-separation/emp-separation/emp-separation.component';
import { EmployeeSeparationComponent } from '../hrms/Employee-Separation/employee-separation.component';
//employee separation ends

//monthly attendence starts
import { MonthlyAttendanceGridComponent } from '../hrms/serviceregister/Monthly Attendance/monthly-attendance-grid/monthly-attendance-grid.component';
import { MonthlyAttendanceComponent } from '../hrms/serviceregister/Monthly Attendance/monthly-attendance/monthly-attendance.component';
//monthly attendance ends

//leave credit starts
import { BulkLeaveCreditApprovalComponent } from '../hrms/Leave-Credit/bulk-leave-credit-approval/bulk-leave-credit-approval.component';
import { BulkLeaveCreditSanctionComponent } from '../hrms/Leave-Credit/bulk-leave-credit-sanction/bulk-leave-credit-sanction.component';
import { LeaveCreditAuthFormComponent } from '../hrms/Leave-Credit/leave-credit-authorization/leave-credit-auth-form/leave-credit-auth-form.component';
import { LeaveCreditAuthComponent } from '../hrms/Leave-Credit/leave-credit-authorization/leave-credit-auth/leave-credit-auth.component';
import { LeaveCreditBulkFormComponent } from '../hrms/Leave-Credit/leave-credit-bulk/leave-credit-bulk-form/leave-credit-bulk-form.component';
import { LeaveCreditBulkComponent } from '../hrms/Leave-Credit/leave-credit-bulk/leave-credit-bulk/leave-credit-bulk.component';
import { LeaveCreditSanctionFormComponent } from '../hrms/Leave-Credit/leave-credit-sanction/leave-credit-sanction-form/leave-credit-sanction-form.component';
import { LeaveCreditSanctionGridComponent } from '../hrms/Leave-Credit/leave-credit-sanction/leave-credit-sanction-grid/leave-credit-sanction-grid.component';
import { LeaveCreditComponent } from '../hrms/Leave-Credit/leave-credit.component';
import { LeavecreditGridComponent } from '../hrms/Leave-Credit/leave-credits/leavecredit-grid/leavecredit-grid.component';
import { LeavecreditComponent } from '../hrms/Leave-Credit/leave-credits/leavecredit/leavecredit.component';
import { ArrearGridComponent } from '../hrms/Attendance-Leaves/arrear-details/arrear-grid/arrear-grid.component';
import { ArrearFormComponent } from '../hrms/Attendance-Leaves/arrear-details/arrear-form/arrear-form.component';
import { ArrearApprovalGridComponent } from '../hrms/Attendance-Leaves/arrear-approval-grid/arrear-approval-grid.component';
import { ArrearSanctionGridComponent } from '../hrms/Attendance-Leaves/arrear-sanction-grid/arrear-sanction-grid.component';
import { EmpLeaveEncashmentFormComponent } from '../hrms/emp-leave-encashment/emp-leave-encashment-form/emp-leave-encashment-form.component';
import { EmpLeaveEncashmentComponent } from '../hrms/emp-leave-encashment/emp-leave-encashment/emp-leave-encashment.component';
//leave credit ends
//end hrms ankita

const routes: Routes = [
  {

    path: 'serviceregister', component: HrmsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: ServiceregisterComponent,
        children: [
          { path: '', component: EmpBasicDetailGridComponent },
          { path: 'empbasicdetails-form', component: EmpBasicDetailFormComponent },

          { path: 'empbasicdetails-form/:id/:mode', component: EmpBasicDetailFormComponent },
          { path: 'dependentdetails', component: DependentGridComponent },
          { path: 'dependentdetails-form', component: DependentFormComponent },


          { path: 'service-reg-view', component: ServiceRegViewFormComponent },

          //Meghana
          { path: 'dependentdetails-form/:id/:mode/:empId', component: DependentFormComponent },
          { path: 'qualification', component: QualificationInputGridComponent },
          { path: 'qualification-form', component: QualificationInputFormComponent },

          { path: 'qualification-form/:id/:mode/:empId', component: QualificationInputFormComponent },
          { path: 'leavedetails', component: LeaveDetailsGridComponent },
          { path: 'leavedetails-form', component: LeaveDetailsFormComponent },
          { path: 'leavedetails-form/:id/:mode/:empId', component: LeaveDetailsFormComponent },
          { path: 'bankdetails', component: BankDetailsGridComponent },
          { path: 'bankdetails-form', component: BankDetailsFormComponent },
          //Meghana
          { path: 'bankdetails-form/:id/:mode/:empId', component: BankDetailsFormComponent },
          { path: 'address-details', component: AddressDetailsComponent },
          { path: 'address-details-form', component: AddressDetailsFormComponent },

          { path: 'address-details-form/:id/:mode/:empId', component: AddressDetailsFormComponent },
          { path: 'experiencedetails', component: ExperiencedetailsGridComponent },
          { path: 'experiencedetails-form', component: ExperiencedetailsFormComponent },
          { path: 'experiencedetails-form/:id/:mode/:empId', component: ExperiencedetailsFormComponent },
          { path: 'policeverification', component: PoliceVerificationGridComponent },
          { path: 'policeverification-form', component: PoliceVerificationComponent },
          //Meghana
          { path: 'policeverification-form/:id/:mode', component: PoliceVerificationComponent },
          { path: 'policeverification-form/:id/:mode/:empId', component: PoliceVerificationComponent },

          { path: 'leave-bal-details', component: LeaveBalDetGridComponent },
          { path: 'leave-bal-details-form', component: LeaveBalDetFormComponent },
          { path: 'leave-bal-details-form/:empId', component: LeaveBalDetFormComponent },




        ]
      }


    ]


  }, //ALDA  

  {
    path: 'masters', component: HrmsComponent,
    children: [
      {
        path: '', component: MasterDisplayComponent,
        children: [
          { path: '', component: ReligionGridComponent },
          { path: 'religion-form', component: ReligionFormComponent },
          { path: 'religion-form/:Rlg_Id/:mode', component: ReligionFormComponent },
          { path: 'caste', component: CasteGridComponent },
          { path: 'caste/caste-form/:Caste_Id/:mode', component: CasteFormComponent },
          { path: 'caste/caste-form', component: CasteFormComponent },
          { path: 'designation', component: DesignationGridComponent },
          { path: 'designation/designation-form', component: DesignationFormComponent },
          { path: 'designation/designation-form/:Dsc_Id/:mode', component: DesignationFormComponent },
          { path: 'scales', component: ScalesGridComponent },
          { path: 'scales/scales-form', component: ScalesFormComponent },
          { path: 'scales/scales-form/:scale_id/:mode', component: ScalesFormComponent },
          { path: 'leaves', component: LeavesGridComponent },
          { path: 'leaves/leaves-form', component: LeavesFormComponent },
          { path: 'leaves/leaves-form/:Leave_id/:mode', component: LeavesFormComponent },
          { path: 'salary', component: SalaryGridComponent },
          { path: 'salary/salary-form', component: SalaryFormComponent },
          { path: 'holidaycalendar', component: HolidaycalendarGridComponent },
          { path: 'holidaycalendar/holidaycalendar-form', component: HolidaycalendarFormComponent },
          { path: 'holidaycalendar/holidaycalendar-form/:hld_id/:mode', component: HolidaycalendarFormComponent },
          { path: 'hospital', component: HospitalGridComponent },
          { path: 'hospital/hospital-form', component: HospitalFormComponent },
          { path: 'hospital/hospital-form/:hsptl_id/:mode', component: HospitalFormComponent },
          { path: 'master-calendar', component: MasterCalendarGridComponent },
          { path: 'master-calendar/master-calendar-form', component: MasterCalendarFormComponent },
          { path: 'master-calendar/master-calendar-form/:calendar_id/:mode', component: MasterCalendarFormComponent },
        ]
      }
    ]
  },

  {
    path: 'payroll', component: HrmsComponent,
    children: [
      {
        path: '', component: PayrollComponent,
        children: [
          {
            path: '', component: PayrollMastersComponent,
            children: [
              { path: 'allowance-code-grid', component: AllowanceCodeGridComponent },
              { path: 'allowance-code-grid/allowance-code', component: AllowanceCodeComponent },
              { path: 'allowance-code/:id/:mode', component: AllowanceCodeComponent },
              { path: 'deduction-code-grid', component: DeductionCodeGridComponent },
              { path: 'deduction-code-grid/deduction-code', component: DeductionCodeComponent },
              { path: 'deduction-code-grid/deduction-code/:id/:mode', component: DeductionCodeComponent },
              { path: 'formula', component: FormulaGridComponent },
              { path: 'formula/formula-form', component: FormulaFormComponent },
              { path: 'formula/formula-form/:id/:mode', component: FormulaFormComponent }
            ]
          },
          {
            path: 'payroll-compliance', component: OrganisationProfileComponent,
            children: [
              { path: '', component: IncomeTaxGridComponent },
              { path: ':id/:mode', component: IncomeTaxGridComponent },
              { path: 'professional-tax', component: ProfessionalTaxGridComponent },
              { path: 'professional-tax/professional-tax-form', component: ProfessionalTaxFormComponent },
              { path: 'income-tax/income-tax-form', component: IncomeTaxFormComponent },
              { path: 'control-data', component: ControlDataComponent },
              { path: 'pay-monthly', component: PayMonthlyGridComponent },
              { path: 'pay-monthly/pay-view', component: PayMonthlyFormComponent },
              { path: 'pay-monthly/pay-view/:Id/:mode', component: PayMonthlyFormComponent },

            ]
          },

          {
            path: 'professional-tax/professional-tax-form', component: ProfessionalTaxFormComponent,
            // children: [
            // {path : ':id/:mode', component: ProfessionalTaxFormComponent}
            // ]
          },

          {
            path: 'professional-tax/professional-tax-form/:id/:mode', component: ProfessionalTaxFormComponent,

          },

          {
            path: 'emp-salary-details', component: EmpSalaryDetailsComponent,
            children: [
              {

                path: '', component: EmpBasicDetailsGridComponent,
                children:
                  [
                    { path: ':id/fixed-allowances', component: FixedAllowanceGridComponent },
                    { path: 'fixed-allowances', component: FixedAllowanceGridComponent },
                    { path: 'fixed-allowances/fixed-allowances-form', component: FixedAllowanceFormComponent },
                    { path: 'variable-allowances', component: VariableAllowanceGridComponent },
                    { path: 'variable-allowances/variable-allowances-form', component: VariableAllowanceFormComponent },
                    { path: 'fixed-deductions', component: FixedDeductionGridComponent },
                    { path: 'variable-deductions', component: VariableDeductionGridComponent },
                    { path: 'variable-deductions/variable-deductions-form', component: VariableDeductionFormComponent },
                    { path: 'loan-details', component: LoanDetFormComponent },
                  ]
              },

            ]
          },


          { path: 'emp-salary-details/:id', component: EmpBasicDetailsGridComponent },

          { path: 'emp-basic-details-form', component: EmpBasicDetailsFormComponent },
          { path: 'emp-basic-details-form/:empId', component: EmpBasicDetailsFormComponent },

          {
            path: 'payroll-process-details', component: PayrollProcessDetailsMenuComponent,
            children: [
              { path: '', component: PayrollPaymonthComponent },
              { path: 'payroll-attendace-leave', component: PayrollAttendaceLeaveComponent },
              { path: 'payroll-attendace-leave/:monthcode', component: PayrollAttendaceLeaveComponent },
              { path: 'payroll-process-payroll', component: PayrollProcessPayrollComponent },
              { path: 'payroll-process-payroll/:monthcode', component: PayrollProcessPayrollComponent },
              { path: 'payroll-finalize-payroll', component: PayrollFinalizePayrollComponent },
              { path: 'payroll-finalize-payroll/:monthcode', component: PayrollFinalizePayrollComponent },
            ]
          },
          {
            path: 'payroll-reports', component: PayrollReportsMenuComponent,
            children: [
              { path: '', component: MasterReportsComponent },
              { path: 'summary-payroll-report', component: SummaryReportsComponent },
              { path: 'miscellaneous-payroll-reports', component: MiscellaneousReportsComponent },
            ]
          },

          { path: 'variable-allowance-deduction', component: VariableAllowdeductionComponent },
          { path: 'incometax', component: IncometaxParameterComponent },
          { path: 'payrollprocess', component: PayrollProcessComponent },
          { path: 'payrollfinalize', component: PayrollFinalizeComponent },
          { path: 'payroll-authorize', component: PayrollAuthorizeGridComponent },
          { path: 'payroll-authorize/payroll-authorize-form', component: PayrollAuthorizeFormComponent },
          { path: 'payroll-sanction', component: PayrollSanctionGridComponent },
          { path: 'payroll-sanction/payroll-sanction-form', component: PayrollSanctionFormComponent },
          { path: 'allowances', component: AllowancesDetailsGridComponent },
          { path: 'allowance-form', component: AllowancesDetailsFormComponent },
          { path: 'monthly-attendance', component: MonthlyAttDetComponent },
          { path: 'attendance', component: AttendanceDetailsGridComponent },
          { path: 'attendance/attendance-form', component: AttendanceDetailsFormComponent },
          { path: 'deduction', component: DeductionDetailsGridComponent },
          { path: 'deduction-form', component: DeductionDetailsFormComponent },
          { path: 'insurance', component: InsuranceDetailsGridComponent },
          { path: 'insurance-form', component: InsuranceDetailsFormComponent },

        ]
      }
    ]
  },
  {
    path: 'transfer', component: HrmsComponent,
    children: [
      {
        path: '', component: TransferComponent,
        children: [
          { path: 'transferin', component: TransferInGridComponent },
          { path: 'transferin-form', component: TransferInFormComponent },
          { path: 'transferin-form/:transfer_id/:mode', component: TransferInFormComponent },
          { path: '', component: TransferOutGridComponent },
          { path: 'transferout-form', component: TransferOutFormComponent },
          { path: 'transferout-form/:transfer_id/:mode', component: TransferOutFormComponent },
          { path: 'transfer-authorization', component: TransferAuthorizationGridComponent },
          { path: 'transfer-authorization/transfer-authorization-form', component: TransferAuthorizationFormComponent },
          { path: 'transfer-sanction', component: TransferSanctionGridComponent },
          { path: 'transfer-sanction/transfer-sanction-form', component: TransferSanctionFormComponent },
          { path: 'transfer-rec', component: TransferRecordersGridComponent },
          { path: 'transfer-rec-form', component: TransferRecordersFormComponent },
        ]
      }
    ]
  },
  {
    path: 'nominationapp', component: HrmsComponent,
    children: [
      {
        path: '', component: NominationComponent,
        children: [
          { path: '', component: NominationApplicationGridComponent },
          { path: 'nominationapp-form', component: NominationApplicationComponent },
          { path: 'nominationapp-form/:NMNT_ID/:mode', component: NominationApplicationComponent },

          { path: 'nomination-approval', component: NominationApprovalGridComponent },
          { path: 'nomination-approval/nomination-approval-form', component: NominationApprovalFormComponent },


          { path: 'nomination-san', component: NominationSanGridComponent },
          { path: 'nomination-rec', component: NominationRecGridComponent },


        ]
      },

    ]
  },

  {
    path: 'leaveapp', component: HrmsComponent,
    children: [
      {
        path: '', component: AttendanceLeavesComponent,
        children: [
          { path: '', component: DailyAttendanceGridComponent },
          { path: 'daily-attendance', component: DailyAttendanceFormComponent },
          { path: 'daily-attendance/:id/:mode', component: DailyAttendanceFormComponent },
          { path: 'daily-attendance-out', component: DailyAttendanceOutGridComponent },
          { path: 'daily-attendance-out-form/:id/:mode', component: DailyAttendanceOutFormComponent },
          { path: 'daily-attendance-out-form', component: DailyAttendanceOutFormComponent },
          { path: 'leave-application', component: LeaveTypeGridComponent },
          { path: 'leaveapp-form', component: LeaveTypeComponent },
          { path: 'leaveapp-form/:id/:mode', component: LeaveTypeComponent },
          { path: 'leave-authorization', component: LeaveAuthGridComponent },
          { path: 'leave-authorization/leave-authorization-form', component: LeaveAuthFormComponent },
          { path: 'leave-authorization/leave-authorization-form/:id/:mode', component: LeaveAuthFormComponent },
          { path: 'leave-sanction', component: LeaveSanctionGridComponent },
          { path: 'monthly-leave-atten', component: MonthlyLeaveAttenGridComponent },
          { path: 'leave-sanction/leave-sanction-form', component: LeaveSanctionFormComponent },
          { path: 'time-roll-gen', component: TimeRollGenGridComponent },
          //{ path: 'time-roll-gen/:Id', component: TimeRollGenGridComponent },                            
          { path: 'time-roll-gen-form', component: TimeRollGenFormComponent },
          { path: 'time-roll-gen-form/:Id/:mode', component: TimeRollGenFormComponent },

          { path: 'time-roll-approval', component: TimeRollApprveGridComponent },
          { path: 'time-roll-approval-form', component: TimeRollApprveFormComponent },
          { path: 'time-roll-sanction', component: TimeRollSanGridComponent },
          { path: 'time-roll-sanction-form', component: TimeRollSanFormComponent },

          { path: 'time-roll-fin', component: TimeRollFinGridComponent },
          { path: 'time-roll-fin-form', component: TimeRollFinFormComponent },
          { path: 'time-roll-uninti', component: TimeRollUnintiGridComponent },
          { path: 'time-roll-uninti-form', component: TimeRollUnintiFormComponent },
          { path: 'arrear-grid', component: ArrearGridComponent },
          { path: 'arrear-form', component: ArrearFormComponent },
          { path: 'arrear-form/:Id/:mode', component: ArrearFormComponent },
          { path: 'arrear-approval-grid', component: ArrearApprovalGridComponent },
          { path: 'arrear-sanction-grid', component: ArrearSanctionGridComponent },

        ]
      },
    ]
  },
  {
    path: 'training', component: HrmsComponent,
    children: [
        {
            path: '', component: TrainingComponent,
            children: [
                { path: '', component: TrainingDetailsGridComponent },
                { path: 'training-form', component: TrainingDetailsFormComponent },
                { path: 'training-approval', component: TrainingApprovalGridComponent },
                { path: 'training-approval/training-approval-form', component: TrainingApprovalFormComponent },
                { path: 'training-sanction', component: TrainingSanctionGridComponent },
                { path: 'training-sanction/training-sanction-form', component: TrainingSanctionFormComponent },

                { path: 'training-form/:TRAINING_ID/:mode', component: TrainingDetailsFormComponent },
                { path: 'training-approval-form', component: TrainingApprovalFormComponent },
                { path: 'training-record', component: TrainingRecordGridComponent },

            ]
        },

    ]
  },
  {
    path: 'deptexam', component: HrmsComponent,
    children: [
        {
            path: '', component: DepartmentalExamComponent,
            children: [
                { path: '', component: DepartmentalExamDetailsGridComponent },
                { path: 'deptexam-form', component: DepartmentalExamDetailsFormComponent },
                { path: 'deptexam-form/:EXAMINATION_ID/:mode', component: DepartmentalExamDetailsFormComponent },
                { path: 'dept-exam-authorization', component: DeptExamAuthComponent },
                { path: 'dept-exam-authorization/dept-exam-authorization-form', component: DeptExamAuthFormComponent },
                { path: 'dept-exam-sanction', component: DeptExamSanctionGridComponent },
                { path: 'dept-exam-sanction/dept-exam-sanction-form', component: DeptExamSanctionFormComponent },

                { path: 'dept-exam-record', component: DeptExamRecordGridComponent },
                { path: 'dept-exam-record/dept-exam-record-form', component: DeptExamRecordFromComponent },
            ]
        },

      ]
  },
  {
    path: 'deputation', component: HrmsComponent,
    children: [
        {
            path: '', component: DeputaionComponent,
            children: [
                { path: '', component: DeputationOutGridComponent },
                { path: 'deputationout-form', component: DeputationOutFormComponent },
                { path: 'deputationin', component: DeputationInGridComponent },
                { path: 'deputationin-form', component: DeputationInFormComponent },
                { path: 'deputation-authorization', component: DeputationAuthorizationComponent },
                { path: 'deputation-authorization/deputation-authorization-form', component: DeputationAuthorizationFormComponent },


                { path: 'deputation-sanction', component: DeputaionSanctionGridComponent },
                { path: 'deputation-sanction/deputation-sanction-form', component: DeputaionSanctionFormComponent },

                { path: 'deputation-rec', component: DeputationRecGridComponent },
                { path: 'deputation-rec/deputation-rec-form', component: DeputationRecFormComponent },

                { path: 'deputationout-form/:DEPUTATION_ID/:mode', component: DeputationOutFormComponent },

                { path: 'deputationin-form/:DEPUTATION_ID/:mode', component: DeputationInFormComponent },


            ]
        },
    ]
  },

  {
    path: 'dept-enquiry', component: HrmsComponent,
    children: [
        {
            path: '', component: DepartEnquiryMenuComponent,
            children: [
                { path: '', component: ComplaintsRegGridComponent },
                { path: 'complaints-reg-form/:back', component: ComplaintsRegFormComponent },
                { path: 'complaints-reg-form/:COMPLAINT_ID/:back/:mode', component: ComplaintsRegFormComponent },

                { path: 'show-cause', component: ShowCaseGridComponent },
                { path: 'show-cause-form', component: ShowCaseFormComponent },
                { path: 'show-cause-form/:COMPLAINT_ID/:SCN_ID/:back/:mode', component: ShowCaseFormComponent },


                { path: 'show-cause-ack', component: ShowCauseAckGridComponent },
                { path: 'show-cause-ack-form', component: ShowCauseAckFormComponent },
                { path: 'show-cause-ack-form/:COMPLAINT_ID/:SCN_ID/:back/:mode', component: ShowCauseAckFormComponent },

                { path: 'enquiry-proceeding', component: EnquiryProceedingGridComponent },
                { path: 'enquiry-proceeding-form', component: EnquiryProceedingFormComponent },
                { path: 'enquiry-proceeding-form/:ENQUIRY_ID/:PROCEEDING_ID/:mode', component: EnquiryProceedingFormComponent },

                { path: 'initiative-depart', component: InitiateDepartEnquiryGridComponent },
                { path: 'initiative-depart-form/:back', component: InitiateDepartEnquiryFormComponent },
                { path: 'initiative-depart-form/:ENQUIRY_ID/:back/:mode', component: InitiateDepartEnquiryFormComponent },


                { path: 'complaint-reg-auth', component: ComplaintRegAuthComponent },
                { path: 'complaint-reg-auth/complaint-reg-auth-form', component: ComplaintRegAuthFormComponent },
                { path: 'complaint-reg-auth/complaint-reg-auth-form/:COMPLAINT_ID/:mode', component: ComplaintRegAuthFormComponent },


                { path: 'scn-auth', component: ScnAuthorizationComponent },
                { path: 'scn-auth/scn-auth-form', component: ScnAuthorizationFormComponent },
                // { path: 'scn-auth/scn-auth-form', component: ScnAuthorizationFormComponent }, 
                { path: 'scn-auth/scn-auth-form/:SCN_ID/:mode', component: ScnAuthorizationFormComponent },



                { path: 'scn-remainer', component: ScnRemainderComponent },
                { path: 'scn-remainer/scn-remainer-form', component: ScnRemainderFormComponent },
                { path: 'scn-remainer/scn-remainer-form/:SCN_ID/:mode', component: ScnRemainderFormComponent },

                { path: 'enquiry-closure', component: EnquiryCloserGridComponent },
                { path: 'enquiry-closure-form', component: EnquiryCloserFormComponent },
                { path: 'enquiry-closure-form/:ENQUIRY_ID/:mode', component: EnquiryCloserFormComponent },

                { path: 'external-enquiry-form', component: ExternalEnquiryFormComponent },
                { path: 'external-enquiry-form/:EEN_ID/:mode', component: ExternalEnquiryFormComponent },
                { path: 'external-enquiry-grid', component: ExternalEnquiryGridComponent },
                { path: 'ex-enquiry-closure-grid', component: ExternalEnquiryClosureGridComponent },
                { path: 'ex-enquiry-closure-form', component: ExternalEnquiryClosureFormComponent },

                { path: 'ex-enquiry-closure-form/:EEN_ID/:mode', component: ExternalEnquiryClosureFormComponent }


            ]
        },


    ]
  },
  {
    path: 'increment', component: HrmsComponent,
    children: [
        {
            path: '', component: IncrementsComponent,
            children: [
                // { path: '', component: IncrementGridComponent },
                // { path: 'increment-form', component: IncrementComponent},
                { path: '', component: GenIncrListGridComponent },
                { path: 'gen-incr-list-form', component: GenIncrListComponent },
                // { path: 'gen-incr-list-form/:id/:mode', component: GenIncrListComponent },
                { path: 'incr-list-auth', component: IncrListAuthGridComponent },
                { path: 'incr-list-auth-form', component: IncrListAuthComponent },
                { path: 'incr-sanction', component: IncrementsSanctionGridComponent },
                { path: 'incr-sanction/incr-sanction-form', component: IncrementsSanctionFormComponent },
                { path: 'increment-post', component: IncrementPostingGridComponent },
                { path: 'increment-post-form', component: IncrementPostingFormComponent },
                { path: 'gen-incr-list-form/:INCREMENT_ID/:mode', component: GenIncrListComponent },
            ]
        }]
  },
  {
    path: 'promotion', component: HrmsComponent,
    children: [
        {
            path: '', component: PromotionsComponent,
            children: [
                { path: '', component: PromotionGridComponent },
                { path: 'promotion-form', component: PromotionComponent },
                { path: 'pro-auth-grid', component: PromotionAuthGridComponent },
                { path: 'pro-auth-grid/pro-auth-form', component: PromotionAuthFormComponent },
                { path: 'pro-sanction', component: PromotionsSanctionGridComponent },
                { path: 'pro-sanction/pro-sanction-form', component: PromotionsSanctionFormComponent },
                { path: 'promotion-form/:PROMOTION_LIST_ID/:mode', component: PromotionComponent },
                { path: 'promotion-form/:PROMOTION_LIST_ID/:BackId/:mode', component: PromotionComponent },
                // { path: 'gen-pro-list', component: GenProListGridComponent },
                // { path: 'gen-pro-list-form', component: GenProListComponent },
                // { path: 'pro-list-auth', component: ProListAuthGridComponent }, 
                // { path: 'pro-list-auth-form', component: ProListAuthComponent }, 
                // { path: 'promotion-post', component: PromotionPostGridComponent }, 
                // { path: 'promotion-post-form', component: PromotionPostFormComponent }, 
            ]
        },

    ]
  },
  {
    path: 'emp-claims', component: HrmsComponent,
    children: [
        {
            path: '', component: EmployeeClaimsComponent,
            children: [
                { path: '', component: MedicalReimburesmentGridComponent },
                { path: 'medical-reimburesment-form', component: MedicalReimburesmentComponent },
                { path: 'medical-reimburesment-form/:MEDI_CLAIM_ID/:mode', component: MedicalReimburesmentComponent },

                { path: 'medical-reim-sanction', component: MedReimSanctionGridComponent },
                { path: 'medical-reim-sanction/medical-reim-sanction-form', component: MedReimSanctionFormComponent },

                { path: 'htc-ltc', component: HtcLtcGridComponent },
                { path: 'htc-ltc/htc-ltc-form', component: HtcLtcFormComponent },
                { path: 'htc-ltc/htc-ltc-form/:LVCONS_ID/:mode', component: HtcLtcFormComponent },
                { path: 'htc-ltc-sanction', component: HtcLtcSanctionGridComponent },
                { path: 'htc-ltc-sanction/htc-ltc-sanction-form', component: HtcLtcSanctionFormComponent },

                { path: 'htc-ltc-rec', component: HtcLtcRecGridComponent },
                { path: 'htc-ltc-rec/htc-ltc-rec-form', component: HtcLtcRecFormComponent },


                { path: 'leave-encashment', component: LeaveencashmentGridComponent },
                { path: 'leave-encashment/leave-encashment-form', component: LeaveencashmentComponent },
                { path: 'leave-encashment/leave-encashment-form/:LVENCASH_ID/:mode', component: LeaveencashmentComponent },

                { path: 'medical-reimbursment-records', component: MedicalReimbursmentRecordsGridComponent },
                { path: 'medical-reimbursment-records/medical-reimbursment-records-form', component: MedicalReimbursmentRecordsFormComponent },
                { path: 'medical-reimbursment-records/medical-reimbursment-records-form/:MEDI_CLAIM_ID/:mode', component: MedicalReimbursmentRecordsFormComponent },

                { path: 'medical-reim-authorization', component: MedReimAuthorizationComponent },
                { path: 'htc-ltc-authorization', component: HtcLtcAuthComponent },
                { path: 'leave-encash-authorization', component: LeaveEncashAuthComponent },
                { path: 'leave-encash-sanction', component: LeaveEncashSanctionGridComponent },
                { path: 'leave-encash-sanction-form', component: LeaveEncashSanctionFormComponent },

                { path: 'leave-encashment-rec', component: LeaveEncashmentRecGridComponent },
                { path: 'leave-encashment-rec/leave-encashment-rec-form', component: LeaveEncashmentRecFormComponent },

            ]
        },
    ]
  },
  {
    path: 'empseparation', component: HrmsComponent,
    children: [
        {
            path: '', component: EmployeeSeparationComponent,
            children: [
                { path: '', component: EmpRetirementListComponent },
                { path: 'emp-separations', component: EmpSeparationGridComponent },
                { path: 'emp-separation-form', component: EmpSeparationComponent },
                { path: 'emp-separation-form/:id', component: EmpSeparationComponent },
                { path: 'emp-sep-authorization', component: EmpSepAuthComponent },
                { path: 'emp-sep-authorization/emp-sep-authorization-form', component: EmpSepAuthFormComponent },
            ]
        },
    ]
  },
  {
    path: 'monthlyattendance', component: HrmsComponent,
    children: [
        { path: 'monthlyattendance-form', component: MonthlyAttendanceComponent },
        { path: '', component: MonthlyAttendanceGridComponent },
        { path: 'monthlyattendance-form/:Id/:mode', component: MonthlyAttendanceComponent },
    ]
  },
  {
    path: 'leavecredit', component: HrmsComponent,
    children: [
        {
            path: '', component: LeaveCreditComponent,
            children: [
                { path: 'leavecredit-form', component: LeavecreditComponent },
                { path: 'leavecredit-form/:Id/:mode', component: LeavecreditComponent },
                { path: '', component: LeavecreditGridComponent },
                { path: 'leave-credit-auth', component: LeaveCreditAuthComponent },
                { path: 'leave-credit-auth/:id', component: LeaveCreditAuthComponent },
                { path: 'leave-credit-auth/leave-credit-auth-form', component: LeaveCreditAuthFormComponent },
                { path: 'leave-credit-sanction', component: LeaveCreditSanctionGridComponent },
                { path: 'leave-credit-sanction/leave-credit-sanction-form', component: LeaveCreditSanctionFormComponent },
                { path: 'leave-credit-bulk', component: LeaveCreditBulkComponent },
                { path: 'leave-credit-bulk-form', component: LeaveCreditBulkFormComponent },
                { path: 'leave-credit-bulk-form/:Id/:mode', component: LeaveCreditBulkFormComponent },
                { path: 'bulk-leave-credit-approval', component: BulkLeaveCreditApprovalComponent },
                { path: 'bulk-leave-credit-sanction', component: BulkLeaveCreditSanctionComponent },
            ]
        },

    ]
  },
  {
    path: 'leaveencashment', component: HrmsComponent,
    children: [
    { path: 'leave-encashment-form', component: EmpLeaveEncashmentFormComponent },
    { path: '', component: EmpLeaveEncashmentComponent },
    { path: 'leave-encashment-form/:Id/:mode', component: EmpLeaveEncashmentFormComponent },
    ]
    },
];

@NgModule({
  declarations: [
    HrmsMenuComponent, HrmsComponent, ServiceregisterComponent,
    EmpBasicDetailGridComponent, EmpBasicDetailFormComponent, DependentGridComponent, DependentFormComponent, ServiceRegViewFormComponent, QualificationInputGridComponent, QualificationInputFormComponent, LeaveDetailsGridComponent, LeaveDetailsFormComponent, BankDetailsGridComponent, BankDetailsFormComponent, AddressDetailsComponent
    , AddressDetailsFormComponent, ExperiencedetailsGridComponent, ExperiencedetailsFormComponent, PoliceVerificationGridComponent, PoliceVerificationComponent, LeaveBalDetGridComponent, LeaveBalDetFormComponent
    , MasterDisplayComponent, ReligionGridComponent, ReligionFormComponent, CasteGridComponent, CasteFormComponent, DesignationGridComponent, DesignationFormComponent, ScalesGridComponent, ScalesFormComponent, LeavesGridComponent, LeavesFormComponent, SalaryGridComponent, SalaryFormComponent, HolidaycalendarGridComponent
    , HolidaycalendarFormComponent, HospitalGridComponent, HospitalFormComponent, MasterCalendarGridComponent, MasterCalendarFormComponent, PayrollComponent, PayrollMastersComponent, AllowanceCodeGridComponent, AllowanceCodeComponent, DeductionCodeGridComponent, DeductionCodeComponent, FormulaGridComponent, FormulaFormComponent,
    OrganisationProfileComponent, IncomeTaxGridComponent, ProfessionalTaxGridComponent, ProfessionalTaxFormComponent, IncomeTaxFormComponent, ControlDataComponent, PayMonthlyGridComponent, PayMonthlyFormComponent, EmpSalaryDetailsComponent, EmpBasicDetailsGridComponent, FixedAllowanceGridComponent, FixedAllowanceFormComponent, VariableAllowanceGridComponent
    , VariableAllowanceFormComponent, FixedDeductionGridComponent, VariableDeductionGridComponent, VariableDeductionFormComponent, LoanDetFormComponent, EmpBasicDetailsFormComponent, PayrollProcessDetailsMenuComponent, PayrollPaymonthComponent, PayrollAttendaceLeaveComponent, PayrollProcessPayrollComponent, PayrollFinalizePayrollComponent, PayrollReportsMenuComponent
    , MasterReportsComponent, SummaryReportsComponent, MiscellaneousReportsComponent, VariableAllowdeductionComponent, IncometaxParameterComponent, PayrollProcessComponent, PayrollFinalizeComponent, PayrollAuthorizeGridComponent, PayrollAuthorizeFormComponent, PayrollSanctionGridComponent,
    PayrollSanctionFormComponent, MonthlyAttDetComponent, InsuranceDetailsGridComponent, InsuranceDetailsFormComponent, AttendanceDetailsFormComponent, AttendanceDetailsGridComponent, DeductionDetailsGridComponent, DeductionDetailsFormComponent, AllowancesDetailsFormComponent, AllowancesDetailsGridComponent,
    TransferComponent, TransferInGridComponent, TransferInFormComponent, TransferOutGridComponent, TransferOutFormComponent, TransferAuthorizationGridComponent,
    TransferAuthorizationFormComponent, TransferSanctionGridComponent, TransferSanctionFormComponent, TransferRecordersGridComponent, TransferRecordersFormComponent,
    NominationComponent, NominationApplicationGridComponent, NominationApplicationComponent, NominationApprovalGridComponent, NominationApprovalFormComponent, NominationSanGridComponent, NominationRecGridComponent,
    AttendanceLeavesComponent, DailyAttendanceGridComponent, DailyAttendanceFormComponent, DailyAttendanceOutGridComponent, DailyAttendanceOutFormComponent, LeaveTypeGridComponent, LeaveTypeComponent, LeaveAuthGridComponent, LeaveAuthFormComponent, LeaveSanctionGridComponent, MonthlyLeaveAttenGridComponent, LeaveSanctionFormComponent, TimeRollGenGridComponent, TimeRollGenFormComponent, TimeRollApprveGridComponent, TimeRollApprveFormComponent, TimeRollSanGridComponent, TimeRollSanFormComponent, TimeRollFinGridComponent, TimeRollFinFormComponent, TimeRollUnintiGridComponent, TimeRollUnintiFormComponent,
    TrainingComponent,TrainingDetailsGridComponent, TrainingDetailsFormComponent, TrainingApprovalGridComponent, TrainingApprovalFormComponent,  TrainingSanctionGridComponent, TrainingSanctionFormComponent, TrainingRecordGridComponent,
    DepartmentalExamComponent, DepartmentalExamDetailsGridComponent, DepartmentalExamDetailsFormComponent, DeptExamAuthComponent, DeptExamAuthFormComponent, DeptExamSanctionGridComponent, DeptExamSanctionFormComponent, DeptExamRecordGridComponent, DeptExamRecordFromComponent,
    DeputaionComponent, DeputationOutGridComponent, DeputationOutFormComponent, DeputationInGridComponent, DeputationInFormComponent, DeputationAuthorizationComponent, DeputationAuthorizationFormComponent, DeputaionSanctionGridComponent, DeputaionSanctionFormComponent, DeputationRecGridComponent, DeputationRecFormComponent, 
    DepartEnquiryMenuComponent, ComplaintsRegGridComponent, ComplaintsRegFormComponent, ShowCaseGridComponent, ShowCaseFormComponent, ShowCauseAckGridComponent, ShowCauseAckFormComponent, EnquiryProceedingGridComponent, EnquiryProceedingFormComponent, InitiateDepartEnquiryGridComponent, InitiateDepartEnquiryFormComponent, ComplaintRegAuthComponent, ComplaintRegAuthFormComponent, ScnAuthorizationComponent, ScnRemainderFormComponent, EnquiryCloserGridComponent, EnquiryCloserFormComponent, ExternalEnquiryFormComponent, ExternalEnquiryGridComponent, ExternalEnquiryClosureGridComponent, ExternalEnquiryClosureFormComponent,ScnAuthorizationFormComponent, ScnRemainderComponent, 
    IncrementsComponent, GenIncrListGridComponent, GenIncrListComponent, IncrListAuthGridComponent, IncrListAuthComponent, IncrementsSanctionGridComponent, IncrementsSanctionFormComponent, IncrementPostingGridComponent, IncrementPostingFormComponent, GenIncrListComponent,
    PromotionsComponent, PromotionGridComponent, PromotionComponent, PromotionAuthGridComponent, PromotionAuthFormComponent, PromotionsSanctionGridComponent, PromotionsSanctionFormComponent, 
    EmployeeClaimsComponent, MedicalReimburesmentGridComponent, MedicalReimburesmentComponent, MedReimSanctionGridComponent, MedReimSanctionFormComponent, HtcLtcGridComponent, HtcLtcFormComponent, HtcLtcSanctionGridComponent, HtcLtcSanctionFormComponent, HtcLtcRecGridComponent, HtcLtcRecFormComponent, LeaveencashmentGridComponent, LeaveencashmentComponent, MedicalReimbursmentRecordsGridComponent, MedicalReimbursmentRecordsFormComponent, MedReimAuthorizationComponent, HtcLtcAuthComponent, LeaveEncashAuthComponent, LeaveEncashAuthComponent, LeaveEncashSanctionFormComponent, LeaveEncashmentRecGridComponent, LeaveEncashmentRecFormComponent, LeaveEncashSanctionGridComponent,
    EmployeeSeparationComponent, EmpRetirementListComponent, EmpSeparationGridComponent, EmpSeparationComponent, EmpSepAuthComponent, EmpSepAuthFormComponent,
    MonthlyAttendanceComponent, MonthlyAttendanceGridComponent,ArrearGridComponent,ArrearFormComponent,ArrearApprovalGridComponent,ArrearSanctionGridComponent,
    LeavecreditComponent , LeaveCreditComponent, LeavecreditGridComponent, LeaveCreditAuthComponent, LeaveCreditAuthFormComponent, LeaveCreditSanctionGridComponent, LeaveCreditSanctionFormComponent, LeaveCreditBulkComponent, LeaveCreditBulkFormComponent, BulkLeaveCreditApprovalComponent, BulkLeaveCreditSanctionComponent,EmpLeaveEncashmentFormComponent,EmpLeaveEncashmentComponent
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
export class HrmsModule { }