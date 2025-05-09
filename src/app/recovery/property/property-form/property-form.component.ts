import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {
  data: any;
  ProjectList: any=[];
  N: any = {};
  P: any = {};
  T: any = {};
  C: any = {};
  PR_Id:number;
  mode:string;
  propertyTypeList: any = [];
  propertyCategoryList: any = [];
  PropertyList: any = [];
  Customer:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe:TitleCasePipe) {

  }

  ngOnInit() {
    this.GetAllProjectRecovery();
    this.GetRecoveryPropertyType();
    this.GetRecoveryPropertyCategory();
    
    this.route.params.subscribe(params => {      
      this.PR_Id = params['PR_Id'];  
      this.mode =  params['mode'];   
        
        if(this.PR_Id!=null || this.PR_Id!=undefined){
          this.GetByIdPropertyDetails(this.PR_Id)
        }    
    });

  }
  
  UpdateCustomer(Customer){

  }

  CreateCustomer(Customer){

  }

  GetAllProjectRecovery() {
        
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllProjectRecovery();
    this.data.subscribe(
      (response: any) => {
        this.ProjectList = response.Result;
          document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
           document.getElementById('loader-spinner').style.display = "none";
      });
  } 

  GetByIdPropertyDetails(PR_Id) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdPropertyDetails(PR_Id);
    this.data.subscribe(
      (response: any) => {
        // this.P = response;
        this.PropertyList = response.Result;
         this.GetAllProjectRecovery();
          document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
           document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetRecoveryPropertyType() {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetRecoveryPropertyType();
    this.data.subscribe(
      (response: any) => {
        this.propertyTypeList = response.Result;
          document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
           document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetRecoveryPropertyCategory() {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetRecoveryPropertyCategory();
    this.data.subscribe(
      (response: any) => {
        this.propertyCategoryList = response.Result;
          document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
           document.getElementById('loader-spinner').style.display = "none";
      });
  }
}
