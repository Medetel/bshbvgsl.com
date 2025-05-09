import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-emp-sep-auth',
  templateUrl: './emp-sep-auth.component.html',
  styleUrls: ['./emp-sep-auth.component.css']
})
export class EmpSepAuthComponent implements OnInit {

  data: any={};
  DistrictsList: any=[];
  a : any ={};
  EmployeeList: any=[];
  IncrementId: number;
  state: number;
  divisionId : number ;
  totalItems:any;
  itemsPerPageChanged:any;
  itemsPerPage:any;
  pageChanged:any;
  mode:any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.getDefaultData()
  }

  getDefaultData(){
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })
  }

  ChangeDevision(devision){
    this.divisionId = devision;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEmployeeSeperationList(devision);
    this.data.subscribe(
      (response: any) => {
        this.EmployeeList = response;  
        this.EmployeeList =  this.EmployeeList.filter(a=>a.STATUS != 'S');     
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }



  handleChange1(IncrementId) {   
    debugger;
    this.IncrementId = IncrementId;
    this.state = 2;
    //alert(this.state)
  }

  handleChange2(IncrementId) {
    debugger;
    this.IncrementId = IncrementId;
    this.state = 1;
    this.save(null)   
  }


  save(Remarks){ 
    //alert(this.state)
    this.data = this.userService.UpdateEmployeeSeration(this.state,Remarks, this.IncrementId);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Autherization is done', 'success');
        this.ChangeDevision(this.divisionId);
        //this.GetEmployeeNomineeDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

}
