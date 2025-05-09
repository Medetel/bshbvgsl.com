import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css']
})
export class CategoryGridComponent implements OnInit {
  title = "Category"
  itemsPerPage: number = 5;
  currentPage: number = 1;
  //CaseTypeDetailsList: any = {};
  CategoryDetailsList: any = {};
  data: any = {};
  totalItems: number;
  isSearch: boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    
  }

  ngOnInit() {
    this.GetMasterCategoryDetails(this.itemsPerPage, 1)
  }
  //List of Case Proceedings
  GetMasterCategoryDetails(itemsPerPage: any, pageNo: any) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetMasterCategoryDetails(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        this.CategoryDetailsList = response.CategoryModel;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  delete(CA_Id) {
    debugger
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteCategory(CA_Id);
        this.data.subscribe(
          (response: any) => {
            this.GetMasterCategoryDetails(this.itemsPerPage, 1)
          },
        );
      }
    })
  }
  pageChanged(pageNumber: number) {
    // if (this.isSearch)
    //   this.onSearch(this.s, this.itemsPerPage, pageNumber);
    // else
      this.GetMasterCategoryDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    // if (this.isSearch)
    //   this.onSearch(this.s, this.itemsPerPage, pageNo);
    // else
      this.GetMasterCategoryDetails(this.itemsPerPage, pageNo);
  }
 

  

}