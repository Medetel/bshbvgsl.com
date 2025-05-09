import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { ErrorHandler } from '../../shared/ErrorHandler';


@Component({
  selector: 'app-Loginloc',
  templateUrl: './Loginloc.component.html',
  styleUrls: ['./Loginloc.component.css']
})
export class LoginlocComponent implements OnInit {
  @ViewChild("temp") form: ElementRef;
  login:any = {};
  title: string;
  roleId: string;
  officeList: any;
  data: any;
  isUpdate:any;
  mode:string;
  formSubmitted: boolean;
  MenuList:any=[];
  log:any={};

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,private errorHandler:ErrorHandler) {
    this.roleId=null;
    this.mode=null;
    this.title = "Login";
    this.isUpdate=false;
    this.formSubmitted = false;
    }

  ngOnInit() {
      // this.GetLastLoginDate(1);
      this.GetAllMenuNames();
  }

  GetLastLoginDate(Id) {
     
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetLastLoginDate(Id)
      .subscribe(
        (data) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.login = data;
          this.isUpdate=true;
          if(this.login==null){ 
            this.login={};
          }else{
          this.log.KM_Id=this.login.Log_Menu;}
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  onSubmit(form: NgForm) {
   
    if (!form.invalid) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.createLoginLoc(form.value)
      .subscribe(
        (data) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('','Saved Successfully!','success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none"; 
          alert(error.error.Message);
        });
      }else
      this.formSubmitted = true;
  }

  GetAllMenuNames() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllMenuNames();
    this.data.subscribe(
      (response) => {
        this.MenuList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
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

}
