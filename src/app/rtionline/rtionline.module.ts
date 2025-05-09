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

//start rti online sheetal
import { RtiOnlineComponent } from '../rtionline/rtionline.component';
import { SubmitRequestFormComponent } from '../rtionline/submitrequest/submitrequest-form/submitrequest-form.component';
import { SubmitRequestGridComponent } from '../rtionline/submitrequest/submitrequest-grid/submitrequest-grid.component';
//end rti online sheetal

const routes: Routes = [
  {

    path: 'submitrequest', component: RtiOnlineComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: SubmitRequestGridComponent
      },
      { path: 'submitrequest-form', component: SubmitRequestFormComponent },
      { path: 'submitrequest-form/:rtiappid/:mode', component: SubmitRequestFormComponent }

    ]


  }, //ALDA  


];

@NgModule({
  declarations: [
    RtiOnlineComponent, SubmitRequestGridComponent, SubmitRequestFormComponent,

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
export class RtionlineModule { }