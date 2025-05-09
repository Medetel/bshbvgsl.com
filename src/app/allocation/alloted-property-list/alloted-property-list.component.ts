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
  selector: 'app-alloted-property-list',
  templateUrl: './alloted-property-list.component.html',
  styleUrls: ['./alloted-property-list.component.css']
})
export class AllotedPropertyListComponent implements OnInit {

  r :  any  = {};
  RecordList : any = {};
  data : any = {};
  Districts : any = {};
  ProjectList : any = {};

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,private errorHandler: ErrorHandler,
    private formBuilder:ReactiveFormsModule, private fb : FormBuilder ) { }

  ngOnInit() {    
    this.GetAllDistrict()
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
    console.log('SearchFrom');
    console.log(SearchForm)
    //GetAllPropertyListDetails
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllPropertyListDetails(SearchForm.value.District_Id_FK,SearchForm.value.ProjectId,SearchForm.value.fromDate,SearchForm.value.toDate);
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

}
