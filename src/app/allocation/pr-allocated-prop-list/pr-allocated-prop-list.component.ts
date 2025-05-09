import { Component, OnInit } from '@angular/core';
import { Application } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { Search } from '../../shared/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pr-allocated-prop-list',
  templateUrl: './pr-allocated-prop-list.component.html',
  styleUrls: ['./pr-allocated-prop-list.component.css']
})
export class PrAllocatedPropListComponent implements OnInit {

  r :  any  = {};
  RecordList : any = {};
  data : any = {};
  Districts : any = {};
  ProjectList : any = {};
  CategoryList : any = {};

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,private errorHandler: ErrorHandler,
    private formBuilder:ReactiveFormsModule, private fb : FormBuilder ) { }

    ngOnInit() {    
      this.GetAllDistrict();
      this.GetAllCategories();
    }
  

    GetAllDistrict() {  
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getAllDistrictName();
      this.data.subscribe(
        (response: any) => {
          this.Districts = response; 
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }

    GetProjectNames(DistrictId){  
      this.data = this.userService.GetAllProjectListsBasedOnDistrictId(DistrictId);
      this.data.subscribe(
        (response: any) => {
          this.ProjectList = response.Result;            
        });
    }


    GetList(SearchForm){    
           //GetAllPropertyListDetails
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetProjectwiseAllocatedList(SearchForm.value.District_Id_FK,SearchForm.value.ProjectId,SearchForm.value.CategoryId);
      this.data.subscribe(
        (response: any) => {
          this.RecordList = response.Result; 
          console.log('Records');
          console.log(this.RecordList);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }


  GetAllCategories() {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getCategory();   
    this.data.subscribe(
      (response: any) => {
        this.CategoryList = response;
        console.log('CategoryList')
        console.log(this.CategoryList);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }
}
