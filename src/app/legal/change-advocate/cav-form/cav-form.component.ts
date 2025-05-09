import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-cav-form',
  templateUrl: './cav-form.component.html',
  styleUrls: ['./cav-form.component.css']
})
export class CavFormComponent implements OnInit {

  title = "Add Advocate Change";
  petDetails: any = [];
  advDetails: any = [];
  arbDetails: any = [];
  casereglist: any = [];
  data: any = {};
  allAdvocatelist: any = [];
  caselist: any = [];
  courtlist: any = [];
  officeslist: any = [];
  courtName: string;
  officeName: string;
  ca: any = {};
  mode: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.getAlllistBydefault();
  }
  GetByIdCseRegistration(CaseId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCseRegistration(CaseId);
    this.data.subscribe(
      (response: any) => {
        this.casereglist = response;
        this.courtName = this.GetCourtName(this.casereglist.Case_Court_Id_FK);
        this.officeName = this.GetOfficeName(this.casereglist.Case_OfficeLocation_FK);
        this.petDetails = response.CasePetitionerModels;
        this.advDetails = response.AdvocatesOfCasesModels;
        this.arbDetails = response.ArbitrationModels;

        setTimeout(() => {
          for (let i = 0; i < this.advDetails.length; i++) {
            this.advDetails[i].Adv_AdvocateName = this.GetAdvocateName(this.advDetails[i].AC_Adv_Id_FK)
          }
        }, 500)

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  //Get advocate Name
  GetAdvocateName(id) {
    for (let i = 0; i < this.allAdvocatelist.length; i++) {
      if (this.allAdvocatelist[i].Adv_Id == id) {
        return this.allAdvocatelist[i].Adv_Name;
      }
    }
  }

  GetCourtName(id) {
    for (let i = 0; i < this.courtlist.length; i++) {
      if (this.courtlist[i].Court_Id == id) {
        return this.courtlist[i].Court_Name;
      }
    }
  }

  GetOfficeName(id) {
    for (let i = 0; i < this.officeslist.length; i++) {
      if (this.officeslist[i].Id == id) {
        return this.officeslist[i].OfficeName;
      }
    }
  }

  getAlllistBydefault() {
    this.data = this.userService.GetAllAdvocates();
    this.data.subscribe(
      (response: any) => {
        this.allAdvocatelist = response.Result;
      }
    )

    //GetAll PreviousCases
    this.data = this.userService.GetAllPreviousCase();
    this.data.subscribe(
      (response: any) => {
        this.caselist = response.Result;
      })

    this.data = this.userService.GetAllCourts();
    this.data.subscribe(
      (response: any) => {
        this.courtlist = response.Result;
      })

    //Get offices list
    this.data = this.userService.GetAllGetOfficeslist();
    this.data.subscribe(
      (response: any) => {
        this.officeslist = response.Result;

      })
  }

  //On select of select
  onselectCase(caseId) {
    this.GetByIdCseRegistration(caseId)
  }
  SaveChangeAdvocate(ChangeAdv: NgForm) {
    if (ChangeAdv.invalid) {
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      this.data = this.userService.ChangeAdvocate(ChangeAdv.value.CaseId, ChangeAdv.value.oldAdvocateId, ChangeAdv.value.NewAdv_Id,);
      this.data.subscribe(
        (response) => {
          ChangeAdv.reset();
          ChangeAdv.resetForm();
          ChangeAdv.form.markAsPristine();
          ChangeAdv.form.markAsUntouched();
          swal('Success!', 'Advocate  Changed Successfully .', 'success');
          this.router.navigate(['/home/adv-change']);
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

}