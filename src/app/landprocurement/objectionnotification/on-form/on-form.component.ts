import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-on-form',
  templateUrl: './on-form.component.html',
  styleUrls: ['./on-form.component.css']
})
export class OnFormComponent implements OnInit {

  proposal: any = [];
  title = "Add Objection Notification";
  proposallist: any = [];
  o: any = {};
  data: any;
  district: string;
  Taluk: string;
  Village: string;
  ProposalFor: string;
  formInvalid: boolean = false;
  mode: string
  ON_Id: number
  hide: boolean = false;
  caseTypelist: any = [];
  projectlist: any = [];
  projId: any;
  Landlist: any;
  Surveylist: any;
  ON_LOD_Id_Fk: any;
  expanded: boolean = false;
  Pr_id_No: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.ON_Id = params['ON_Id'];
      this.mode = params['mode'];

      if (this.mode == 'view') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "View Objection Notification";
      }
      else if (this.mode == 'edit') {
        this.title = "Edit Objection Notification";
      }
    });

    if (this.ON_Id > 0) {
      this.GetByIdObjectionNotification(this.ON_Id);
    }
    this.GetAllProjectforLR()

    this.getDefaultData();
  }

  GetAllProjectforLR() {
    this.data = this.userService.GetAllProjectforLR();
    this.data.subscribe(
      (response: any) => {
        this.projectlist = response;
      }, (error) => {

      });
  }

  AddProject(PD_Id) {
    this.projId = PD_Id;
    this.GetONLandOwner();
    this.GetProposalId(PD_Id);
  }
  AddProjectforget(PD_Id) {
    this.projId = PD_Id;
    this.GetONLandOwner();

  }

  GetProposalId(ON_PD_Id_FK) {

    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == ON_PD_Id_FK) {
        this.o.ON_PR_Id_FK = this.projectlist[i].PD_PR_Id_FK;
        this.Pr_id_No = this.projectlist[i].PD_PR_Id_FK;
        this.GetOtherrelatedinfo(this.o.ON_PR_Id_FK)
      }
    }
  }


  GetONLandOwner() {
    this.data = this.userService.GetONLandOwner(this.projId);
    this.data.subscribe(
      (response: any) => {
        this.Landlist = response;
      }, (error) => {

      });
  }

  GetONSurveyNo(LOD_Id, ON_Id) {
    if (this.mode == null) {
      this.mode = "add";
    }
    this.data = this.userService.GetONSurveyNo(LOD_Id, this.mode, ON_Id);
    this.data.subscribe(
      (response: any) => {
        this.Surveylist = response;
        this.ON_LOD_Id_Fk = LOD_Id

        for (let i = 0; i < this.Surveylist.length; i++) {
          if (this.Surveylist[i].LR_ON_Id_Fk != null) {
            this.Surveylist[i].IsSelected = true;
          }
          else
            this.Surveylist[i].IsSelected = false;
        }
      }, (error) => {

      });
  }

  AddSurveyList(LD_Id) {

    for (let i = 0; i < this.Surveylist.length; i++) {
      if (this.Surveylist[i].LD_Id == LD_Id) {
        if (this.Surveylist[i].IsSelected == false) {
          this.Surveylist[i].IsSelected = true;
          break;
        }
        else { this.Surveylist[i].IsSelected = false; }
        break;
      }

    }
  }

  showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
  }

  GetLandOwnerName(LR_LD_Id_Fk) {
    for (let i = 0; i < this.Surveylist.length; i++) {
      if (this.Surveylist[i].LD_Id == LR_LD_Id_Fk) {
        this.o.ON_LOD_Id_Fk = this.Surveylist[i].LD_LOD_Id_Fk;
        this.ON_LOD_Id_Fk = this.Surveylist[i].LD_LOD_Id_Fk;
      }
    }
  }


  SaveObjectionNotification(ObjectionForm: NgForm) {
    for (let i = 0; i < this.Surveylist.length; i++) {
      if (this.Surveylist[i].IsSelected == false) {
        this.Surveylist[i].IsSelected = 0;
      }
      else { this.Surveylist[i].IsSelected = 1; }
    }
    ObjectionForm.value.ON_LOD_Id_Fk = this.ON_LOD_Id_Fk
    ObjectionForm.value.ON_PR_Id_FK = this.Pr_id_No
    if (ObjectionForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      ObjectionForm.value.SurveyNolistmodel = this.Surveylist;
      this.data = this.userService.PostNotificationObjection(ObjectionForm.value);
      this.data.subscribe(
        (response) => {

          ObjectionForm.reset();
          ObjectionForm.resetForm();
          ObjectionForm.form.markAsPristine();
          ObjectionForm.form.markAsUntouched();
          swal('Success!', 'Objection Notification Added Successfully .', 'success');
          this.router.navigate(['/home/objectionnotification']);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
  }

  UpdateObjectionNotification(ObjectionForm: NgForm) {

    for (let i = 0; i < this.Surveylist.length; i++) {
      if (this.Surveylist[i].IsSelected == false) {
        this.Surveylist[i].IsSelected = 0;
      }
      else { this.Surveylist[i].IsSelected = 1; }
    }
    ObjectionForm.value.ON_LOD_Id_Fk = this.ON_LOD_Id_Fk
    if (ObjectionForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      ObjectionForm.value.ON_PR_Id_FK = this.Pr_id_No
      ObjectionForm.value.SurveyNolistmodel = this.Surveylist;
      this.data = this.userService.UpdateObjectionNotification(this.ON_Id, ObjectionForm.value);
      this.data.subscribe(
        (response) => {

          ObjectionForm.reset();
          ObjectionForm.resetForm();
          ObjectionForm.form.markAsPristine();
          ObjectionForm.form.markAsUntouched();
          swal('Success!', 'Objection Notification is  Updated Successfully .', 'success');
          this.router.navigate(['/home/objectionnotification']);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
  }


  getDefaultData() {
    this.data = this.userService.getAllProposalReportdropdown();
    this.data.subscribe(
      (response: any) => {
        this.proposallist = response;
      });

    this.data = this.userService.GetAllONCaseTypes();
    this.data.subscribe(
      (response: any) => {
        this.caseTypelist = response;

      })
  }

  GetOtherrelatedinfo(Id) {

    this.data = this.userService.getAllProposalReportdropdown();
    this.data.subscribe(
      (response: any) => {
        this.proposal = response;
        for (let i = 0; i < this.proposal.length; i++) {
          if (this.proposal[i].PR_Id_PK == Id) {
            this.district = this.proposal[i].DI_District;
            this.Taluk = this.proposal[i].TA_Taluk;
            this.Village = this.proposal[i].PR_Village;
            this.ProposalFor = this.proposal[i].PR_For;
          }
        }
      });

  }

  GetByIdObjectionNotification(ON_Id) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdObjectionNotification(ON_Id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.o = response;
        this.ON_LOD_Id_Fk = this.o.ON_LOD_Id_Fk;
        if (this.o.ON_PD_Id_FK != null)
          this.AddProjectforget(this.o.ON_PD_Id_FK)
        this.GetOtherrelatedinfo(this.o.ON_PR_Id_FK)

        this.GetProposalId(this.o.ON_PD_Id_FK)
        this.GetONSurveyNo(this.o.ON_LOD_Id_Fk, this.o.ON_Id_PK)



      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

}