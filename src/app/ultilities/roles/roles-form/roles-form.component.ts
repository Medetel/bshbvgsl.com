import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User, Office } from '../../../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../shared/ErrorHandler';


@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit {
  @ViewChild("temp") form: ElementRef;
  user:any ;
  title: string;
  roleId: string;
  officeList: any;
  data: any;
  isUpdate:any;
  mode:string;
  formSubmitted: boolean;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,private errorHandler:ErrorHandler) {
    this.roleId=null;
    this.mode=null;
    this.title = "Add Role";
    this.user = new User();
    this.isUpdate=false;
    this.formSubmitted = false;
    }

  ngOnInit() {
    // this.GetAllRoleNames();

    this.route.params.subscribe(params => {
      this.mode = params['mode'];
      this.roleId = params['roleId'];
    });
    
    if (this.roleId != null && this.mode!=null) 
      this.GetRoleForTheId(this.roleId);
  }

  GetRoleForTheId(roleId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.getRoleForTheId(roleId)
      .subscribe(
        (data) => {
          this.user = data;
          this.isUpdate=true;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  onSubmit(form: NgForm) {
    if (!form.invalid) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.createRole(form.value)
      .subscribe(
        (data) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('','Saved Successfully!','success');
          this.router.navigate(['/home/rolesgrid']);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          alert(error.error.Message);
        });
      }else
      this.formSubmitted = true;
  }

  update(form: NgForm) {
    if (!form.invalid) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.updateRole(form.value,this.roleId)
      .subscribe(
        (data) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('','Updated Successfully!','success');
          this.router.navigate(['/home/rolesgrid']);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          alert(error.error.Message);
        });
      }else
      this.formSubmitted = true;
  }


  GetAllRoleNames() {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllRoleNames()
      .subscribe(
        (data) => {
          this.officeList = data;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
  }
}
