import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-scales-grid',
  templateUrl: './scales-grid.component.html',
  styleUrls: ['./scales-grid.component.css']
})
export class ScalesGridComponent implements OnInit {
  title = "View Scales/Grades";
  PayScaleList: any = [];
  r: any = {};
  data: any = {};
  s: Search;
  scale_id: number;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
  }

  ngOnInit() {
    this.GetPayScalelist(this.itemsPerPage, 1)
  }
  GetPayScalelist(itemsPerPage: any, pageNo: any) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.PayScaleDetails(this.itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.PayScaleList = response.PayScaleModel;
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
  pageChanged(pageNumber: number) {
    this.GetPayScalelist(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetPayScalelist(this.itemsPerPage, pageNo);
  }


  onSearch(s, itemsPerPage: number, pageNo: number) {  
   
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchPayScale(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {            
            this.PayScaleList = data.PayScaleModel;;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";        
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";        
            this.errorHandler.handleError(error);
          });
    }
  }

  DeleteScaleDetails(scale_id) {  
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteScale(scale_id,);
        this.data.subscribe(
          (response: any) => {
            this.GetPayScalelist(this.itemsPerPage, 1);
          },
        );
      }
    })
  }
  GetAllOffices(itemsPerPage: any) {   
    this.PayScaleList = [];
    this.GetPayScalelist(itemsPerPage, 1)
  }
}
