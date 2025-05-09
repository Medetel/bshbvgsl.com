import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-incr-list-auth-grid',
  templateUrl: './incr-list-auth-grid.component.html',
  styleUrls: ['./incr-list-auth-grid.component.css']
})
export class IncrListAuthGridComponent implements OnInit {

  title="Increment List Approval";

  data: any={};
  DistrictsList: any=[];
  a : any ={};
  EmployeeList: any=[];
  IncrementId: number;
  state: number;
  divisionId : number ;
  itemsPerPage:any;
  itemsPerPageChanged:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }
  totalItems:any;
  
  ngOnInit() {
    this.getDefaultData()
  }

  getDefaultData(){
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

      this.a.EMP_DIVISION_ID = +localStorage.getItem('divisonId');
      this.ChangeDevision(this.a.EMP_DIVISION_ID);
  }

  ChangeDevision(devision){
    this.divisionId = devision;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetIncrementList(devision);
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

  onSearch(searchForm,itemsPerPage,id){

  }

  handleChange1(IncrementId) {   
    debugger;
    this.IncrementId = IncrementId;
    this.state = 2;   
  }

  handleChange2(IncrementId) {
    debugger;
    this.IncrementId = IncrementId;
    this.state = 1;
    this.save(null)   
  }


  save(Remarks){     
    this.data = this.userService.UpdateIncrementApprovals(this.state,Remarks, this.IncrementId);
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

  IncrementView(INCREMENT_ID) {
    debugger
    localStorage.setItem('switchurl', '/home/increment/incr-list-auth')
    this.router.navigate(['/home/increment/gen-incr-list-form', INCREMENT_ID, 'View']);
    } 

}
