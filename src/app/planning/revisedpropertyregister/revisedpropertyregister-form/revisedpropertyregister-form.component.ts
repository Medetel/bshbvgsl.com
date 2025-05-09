import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/user.service';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-revisedpropertyregister-form',
  templateUrl: './revisedpropertyregister-form.component.html',
  styleUrls: ['./revisedpropertyregister-form.component.css']
})
export class RevisedpropertyregisterFormComponent implements OnInit {
  PR_Id:any;
  mode:any;
  PRD:any={};
  // PR:any={};
  data:any;
  categorylist;
  propertytype;
  interCor;
  oddRegular;
  formSubmitted: boolean;
  PD_Id:any;
  Projectdetails:any={};
  title="Edit Revised Property register"
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
   }

  ngOnInit() {
    this.GetAllCategory();
    this.GetAllProperty();
    this.GetAllIntermediateCorner();
    this.GetAllOddRegular();
    this.route.params.subscribe(params =>
      this.PR_Id = params['PR_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if (this.PR_Id != null && this.mode!=null) 
      this.GetPropertyDetailsForTheId(this.PR_Id);
  }
  GetPropertyDetailsForTheId(PR_Id){
    
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetPropertyforId(PR_Id)
      .subscribe(
        (data:any) => {
          this.PRD = data;
          this.getProjectbyCode(this.PRD.PD_Project_Code);
           this.PD_Id=this.PRD.PR_PD_ID_FK;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  getProjectbyCode(PD_Project_Code) {
    
     document.getElementById('loader-spinner').style.display = "block";
     this.userService.GetProjectbyCode(PD_Project_Code)
       .subscribe(
         (data:any) => {
           this.Projectdetails = data;
           //this.isUpdate=true;
           document.getElementById('loader-spinner').style.display = "none";
         }, (error) => {
           document.getElementById('loader-spinner').style.display = "none";
           this.errorHandler.handleError(error);
         });
   }

   GetAllCategory() {
   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllCategory();
    this.data.subscribe(
      (response:any) => {
        this.categorylist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllProperty() {
   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllProperty();
    this.data.subscribe(
      (response:any) => {
        this.propertytype = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllIntermediateCorner() {
   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllIntermediateCorner();
    this.data.subscribe(
      (response:any) => {
        this.interCor = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetAllOddRegular() {
   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllOddRegular();
    this.data.subscribe(
      (response:any) => {
        this.oddRegular = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  update(form: NgForm) {
    
    if (!form.invalid) {
    form.value.PR_PD_ID_FK=this.PD_Id;
    
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.UpdatePropertyRegister(form.value,this.PR_Id)
      .subscribe(
        (data) => {
          document.getElementById('loader-spinner').style.display = "none";
          
          swal('','Updated Successfully!','success');
          this.router.navigate(['/home/revised-property']);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
      }else
      document.getElementById('loader-spinner').style.display = "none";
      this.formSubmitted = true;
  }
}
