import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-promotion-auth-grid',
  templateUrl: './promotion-auth-grid.component.html',
  styleUrls: ['./promotion-auth-grid.component.css']
})
export class PromotionAuthGridComponent implements OnInit {

  title="Promotion Approval";

  data: any={};
  DistrictsList: any=[];
  a : any ={};
  EmployeeList: any=[];
  IncrementId: number;
  state: number;
  // divisionId : number ;
  message: boolean;
  totalItems: any;
  currentPage: number;
  s: any;
  isSearch: boolean;
  itemsPerPage: number = 5;
  DI_Id: any={};
  mode: any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.getDefaultData()
    this.a.EMP_DIVISION_ID = +localStorage.getItem('divisonId');
    this.ChangeDevision(this.itemsPerPage, 1, this.a.EMP_DIVISION_ID);
  }

  getDefaultData(){
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })
  }

  ChangeDevision(itemsPerPage, pageNo,DI_Id){
    debugger; 
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetPromotionList(this.itemsPerPage, pageNo,DI_Id);
    this.data.subscribe(
      (response: any) => { 
        this.EmployeeList = response.PromotionModel;  
        //this.EmployeeList =  this.EmployeeList.filter(a=>a.STATUS != 'S');
        this.totalItems = response.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;    
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
  }

  handleChange2(IncrementId) {
    debugger;
    this.IncrementId = IncrementId;
    this.state = 1;
    this.save(null)   
  }


  save(Remarks){ 
    this.data = this.userService.UpdatePromotionApprovals(this.state,Remarks, this.IncrementId);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Autherization is done', 'success');
        this.ChangeDevision(this.itemsPerPage, 1, this.a.EMP_DIVISION_ID);
        //this.GetEmployeeNomineeDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    debugger;
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetAllPromotionBySearch(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
              this.message = false;
              this.EmployeeList = data.PromotionModel;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;
              document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
    this.ChangeDevision(this.itemsPerPage, 1, this.DI_Id);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
    this.ChangeDevision(this.itemsPerPage, 1, this.DI_Id);
  }
}
