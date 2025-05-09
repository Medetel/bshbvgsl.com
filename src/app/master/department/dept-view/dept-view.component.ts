import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-dept-view',
  templateUrl: './dept-view.component.html',
  styleUrls: ['./dept-view.component.css']
})
export class DeptViewComponent implements OnInit {

  title="Department";
  itemsPerPage: number=5;
  currentPage: number=1;
  //DepartmentDetailsList : any = {};
  DepartmentDetailsList : any[] = []; //changed by saheb
  data : any = {};
  totalItems : number;
  s: Search;
  isSearch:boolean = false;
  DI_Id : number;
 
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() { 
    this.GetDepartmentDetails(this.itemsPerPage, 1)
  }

 

  //List of Case Proceedings
  GetDepartmentDetails(itemsPerPage:any,pageNo:any){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetDepartmentDetails(itemsPerPage,pageNo);
    this.data.subscribe(
      (response: any) => {
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;    
        this.DepartmentDetailsList = response.DepartmentModel;        
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  delete(Department_Id){
    swal({
         title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
        this.data = this.userService.DeleteDepartment(Department_Id);
        this.data.subscribe(
         (response: any) => {
             this. GetDepartmentDetails(this.itemsPerPage, 1)          
         },       
      ); 
    } 
    })
    }
    pageChanged(pageNumber: number) {
      if (this.isSearch)
        this.onSearch(this.s, this.itemsPerPage, pageNumber);
      else
        this.GetDepartmentDetails(this.itemsPerPage, pageNumber);
    }
  
    itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
      if (this.isSearch)
        this.onSearch(this.s, this.itemsPerPage, pageNo);
      else
        this.GetDepartmentDetails(this.itemsPerPage, pageNo);
    }

    onSearch(s, itemsPerPage: number, pageNo: number) {   
      this.isSearch = true;
      let searchText = this.s.SearchText;
      let searchCriteria = this.s.SearchCriteria;
      if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
        swal("Warning!", "Please enter the search criteria and search text.", "warning");
      else {
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.SearchDepartment(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              if(data.DepartmentModel.length!=0){              
              this.DepartmentDetailsList = data.DepartmentModel;
              this.totalItems = data.TotalItemsCount;
              this.currentPage = pageNo;
              document.getElementById('loader-spinner').style.display = "none";
            }
            else
            {
            document.getElementById('loader-spinner').style.display = "none";         
            }
            }, (error) => {
              document.getElementById('loader-spinner').style.display = "none";
              //swal('Search Failed.');
              this.errorHandler.handleError(error);
            });
      }
    }
  
  
  
  }
  

  