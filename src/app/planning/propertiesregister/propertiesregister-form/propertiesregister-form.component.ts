import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-propertiesregister-form',
  templateUrl: './propertiesregister-form.component.html',
  styleUrls: ['./propertiesregister-form.component.css']
})
export class PropertiesregisterFormComponent implements OnInit {

  mode:any;
  formSubmitted: boolean;
  title="Property Register"

  PRD:any={};
  // PR:any={};
  data:any;
  categorylist;
  propertytype;
  interCor;
  oddRegular;

  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute,private errorHandler:ErrorHandler) { }

  ngOnInit() {
    
    this.GetAllCategory();
    this.GetAllProperty();
    this.GetAllIntermediateCorner();
    this.GetAllOddRegular();

    
  }

  
  // getProject(PRD.PD_Project_Code)

  getProjectbyCode(PD_Project_Code) {
   
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetProjectbyCode(PD_Project_Code)
      .subscribe(
        (data) => {
          this.PRD = data;
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

}
