import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-emp-retirement-list',
  templateUrl: './emp-retirement-list.component.html',
  styleUrls: ['./emp-retirement-list.component.css']
})
export class EmpRetirementListComponent implements OnInit {
  title="Employee Retirements List";
  data: any=[];
  DistrictsList: any=[];
  a:any ={};
  detailsEmployee: any=[];
  itemsPerPage:any;
  itemsPerPageChanged:any;
  mode:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.getDefaultdata()
  }

  getDefaultdata(){
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })
    }
    onSearch(searchForm,itemsPerPage,id){

    }

    Change(DivisionId,Date){     
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllRetiredEmployeeIds(DivisionId,Date);
    this.data.subscribe(
      (response: any) => {
        this.detailsEmployee = response;
        console.log('response');
        console.log(this.detailsEmployee);
        console.log(response);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
    }

}
