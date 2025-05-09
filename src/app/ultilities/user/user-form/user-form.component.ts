import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Password } from '../../../shared/user.model';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../shared/ErrorHandler';
declare var $: any;
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  Id: any;
  mode: any;
  title = "Add User"
  data: any;
  roleId: string;
  officeList;
  roleList;
  formSubmitted: boolean;
  user: any;
  password: Password;
  Inst: any = {};
  officeLevel: any;
  selectprojectlist: any;
  selectprojectlistdraft: any;
  search: any = {};
  projdata: any = {};
  Duplicates: any;
  passwordpattern: any = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&]).{8,}$";

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.user = new User();
    this.formSubmitted = false;
    this.Id = null;
    this.mode = null;
    this.user = {};

  }

  ngOnInit() {
    this.GetAllRoleNames();
    this.GetRolesforSelectedOffice();
    this.route.params.subscribe(params => {
      this.mode = params['mode'];
      this.Id = params['Id'];
    });
  }

  GetUserForTheId(Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.getUserForTheId(Id)
      .subscribe(
        (data) => {
          this.user = data;
          this.roleId = this.user.RoleId;
          this.GetRolesforSelectedOffice();
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetAllRoleNames() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllRoleNames();
    this.data.subscribe(
      (response) => {
        this.officeList = response;
        document.getElementById('loader-spinner').style.display = "none";
        if (this.Id != null && this.mode != null)
          this.GetUserForTheId(this.Id);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetRolesforSelectedOffice() {

    if (this.user != null) {
      this.user.RoleId = undefined;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getRolesforSelectedOffice();
      this.data.subscribe(
        (response) => {
          this.roleList = response;
          if (this.mode != null)
            this.user.RoleId = this.roleId;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
    }
  }

  onSubmit(form: NgForm) {

    if (!form.invalid) {
      for (let i = 0; i < this.selectprojectlist.length; i++) {
        if (this.selectprojectlist[i].PU_Inactive == true) {
          this.selectprojectlist[i].PU_Inactive = "N";
        }
        else { this.selectprojectlist[i].PU_Inactive = "Y"; }
      }
      form.value.ProjectDetailsforHoModel = this.selectprojectlist;
      document.getElementById('loader-spinner').style.display = "block";     
      this.data = this.userService.registerUser(form.value);
      this.data.subscribe(
        (response: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', 'Saved Successfully!', 'success');
          this.router.navigate(['/home/user']);
        }, (error: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', error.error.Message, 'warning');
        });
    } else
      this.formSubmitted = true;
  }

  update(form: NgForm) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.changePasswordForTheId(form.value)
      .subscribe(
        (data) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', 'updated Successfully!', 'success');
          this.router.navigate(['/home/user']);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });

  }

  GetOfficeLevel(off_Id: any) {

    for (let i = 0; i < this.officeList.length; i++) {
      if (this.officeList[i].OfficeId == off_Id) {
        this.officeLevel = this.officeList[i].Off_Level;
        this.GetAllProjectsforUser();
      }
    }
  }
  AddProjectsforuser() {
    $('#addProperty').modal('show');
  }

  GetAllProjectsforUser() {
    this.search = {};
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllProjectsforUser();
    this.data.subscribe(
      (response) => {
        this.selectprojectlist = response;
        for (let i = 0; i < this.selectprojectlist.length; i++) {
          if (this.selectprojectlist[i].PU_Inactive == 'N') {
            this.selectprojectlist[i].PU_Inactive = true;
          }
          else { this.selectprojectlist[i].PU_Inactive = false; }
        }
        if (this.selectprojectlistdraft == null || this.selectprojectlistdraft == undefined) {
          this.selectprojectlistdraft = this.selectprojectlist;
        }
        for (let i = 0; i < this.selectprojectlist.length; i++) {
          for (let j = 0; j < this.selectprojectlistdraft.length; j++) {
            if (this.selectprojectlist[i].PD_Id == this.selectprojectlistdraft[j].PD_Id)
              this.selectprojectlist[i].PU_Inactive = this.selectprojectlistdraft[j].PU_Inactive;
          }
        }

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  changeCheckbox(PD_Id: any, Id: any) {
    if (Id == 1) {
      for (let i = 0; i < this.selectprojectlist.length; i++) {
        if (this.selectprojectlist[i].DI_District == PD_Id && this.selectprojectlist[i].Added != 1) {
          this.selectprojectlist[i].Added = 1;
          this.selectprojectlist[i].PU_Inactive = true;
        }
        else if (this.selectprojectlist[i].DI_District == PD_Id && this.selectprojectlist[i].Added == 1) {
          this.selectprojectlist[i].Added = 0;
          this.selectprojectlist[i].PU_Inactive = false;
        }
        for (let j = 0; j < this.selectprojectlistdraft.length; j++) {
          if (this.selectprojectlistdraft[j].PD_Id == this.selectprojectlist[i].PD_Id)
            this.selectprojectlistdraft[j].PU_Inactive = this.selectprojectlist[i].PU_Inactive;
        }
      }
    }
    else {
      for (let i = 0; i < this.selectprojectlist.length; i++) {
        if (this.selectprojectlist[i].PD_Id == PD_Id) {
          if (this.selectprojectlist[i].PU_Inactive == false) {
            this.selectprojectlist[i].PU_Inactive = true;
            for (let j = 0; j < this.selectprojectlistdraft.length; j++) {
              if (this.selectprojectlistdraft[j].PD_Id == this.selectprojectlist[i].PD_Id)
                this.selectprojectlistdraft[j].PU_Inactive = this.selectprojectlist[i].PU_Inactive;
            }
            break;
          }
          else { this.selectprojectlist[i].PU_Inactive = false; }
          for (let j = 0; j < this.selectprojectlistdraft.length; j++) {
            if (this.selectprojectlistdraft[j].PD_Id == this.selectprojectlist[i].PD_Id)
              this.selectprojectlistdraft[j].PU_Inactive = this.selectprojectlist[i].PU_Inactive;
          }
          break;
        }
      }
    }
  }

  SearchUserProperties(SearchCriteria, SearchText) {

    if (SearchText == "" || SearchText == null || SearchCriteria == "" || SearchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchUserProperties(SearchCriteria, SearchText)
        .subscribe(
          (data: any) => {
            this.projdata = data;
            for (let i = 0; i < this.projdata.length; i++) {
              for (let j = 0; j < this.selectprojectlistdraft.length; j++) {
                if (this.projdata[i].PD_Id == this.selectprojectlistdraft[j].PD_Id)
                  this.projdata[i].PU_Inactive = this.selectprojectlistdraft[j].PU_Inactive;
              }
            }
            this.selectprojectlist = this.projdata;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }
}