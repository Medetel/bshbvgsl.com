import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-promotions-sanction-grid',
  templateUrl: './promotions-sanction-grid.component.html',
  styleUrls: ['./promotions-sanction-grid.component.css']
})
export class PromotionsSanctionGridComponent implements OnInit {

  title="Promotion Sanction";
  data: any={};
  DistrictsList: any=[];
  a : any ={};
  EmployeeList: any=[];
  IncrementId: number;
  state: number;
  divisionId : number ;
  message: boolean;
  totalItems: any;
  currentPage: number;
  isSearch: boolean;
  s: Search;
  itemsPerPage: number = 5;
  DI_Id: any={};
  mode:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.getDefaultData();
    this.a.EMP_DIVISION_ID = +localStorage.getItem('divisonId');
      this.ChangeDevision(this.itemsPerPage, 1, this.a.EMP_DIVISION_ID)
  }



  getDefaultData(){
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })
      
  }

  ChangeDevision(itemsPerPage, pageNo, DI_Id){
    this.divisionId = DI_Id;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetPromotionSanctionList(this.itemsPerPage, pageNo, DI_Id);
    this.data.subscribe(
      (response: any) => {
        this.EmployeeList = response.PromotionModel;
        //this.EmployeeList =  this.EmployeeList.filter(a=>a.STATUS == 'A' ||a.STATUS == 'S');         
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
    this.state = 3;
    this.save(null)   
  }


  save(Remarks){   
    this.data = this.userService.UpdatePromotionApprovals(this.state,Remarks, this.IncrementId);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Sanction is done', 'success');
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
  PromotionView(PROMOTION_LIST_ID) {
    localStorage.setItem('switchurl', '/home/promotion/pro-sanction')
    this.router.navigate(['/home/promotion/promotion-form', PROMOTION_LIST_ID, 'View']);
    }
}
