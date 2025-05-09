import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-caste-grid',
  templateUrl: './caste-grid.component.html',
  styleUrls: ['./caste-grid.component.css']
})
export class CasteGridComponent implements OnInit {

  title = "View Caste";
  Castelist: any = [];
  c: any = {};
  data: any = {};
  s: Search;
  Caste_Id: number;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
  }

  ngOnInit() {
    this.GetCastelist(this.itemsPerPage, 1)
  }
  GetCastelist(itemsPerPage: any, pageNo: any) {  
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllCastelist(this.itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.Castelist = response.CasteModel;
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

  DeleteCasteDetails(Caste_Id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteCaste(Caste_Id,);
        this.data.subscribe(
          (response: any) => {
            this.GetCastelist(this.itemsPerPage, 1);
          },
        );
      }
    })
  }
  pageChanged(pageNumber: number) {
    this.GetCastelist(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetCastelist(this.itemsPerPage, pageNo);
  }
  onSearch(s, itemsPerPage: number, pageNo: number) {  
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchCaste(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {                        
            this.Castelist = data.CasteModel;;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";

          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";

            this.errorHandler.handleError(error);
          });
    }
  }
  GetAllTest(itemsPerPage: any) {   
    this.Castelist = [];
    this.GetCastelist(itemsPerPage, 1);
  }
}
