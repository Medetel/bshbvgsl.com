import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
@Component({
  selector: 'app-hospital-grid',
  templateUrl: './hospital-grid.component.html',
  styleUrls: ['./hospital-grid.component.css']
})
export class HospitalGridComponent implements OnInit {

  title = "View Hospitals";
  HospitalList: any = [];
  data: any = {};
  s: Search;
  l: any = {};
  hsptl_id: number;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
  }
  ngOnInit() {
    this.GetHospitalDetails(this.itemsPerPage, 1)
  }
  GetHospitalDetails(itemsPerPage: any, pageNo: any) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetHospitalList(this.itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.HospitalList = response.HospitalModel;
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
    this.GetHospitalDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetHospitalDetails(this.itemsPerPage, pageNo);
  }

  DeleteHospitalDetails(hsptl_id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteHospital(hsptl_id,);
        this.data.subscribe(
          (response: any) => {
            this.GetHospitalDetails(this.itemsPerPage, 1);
          },
        );
      }
    })
  }
  onSearch(s, itemsPerPage: number, pageNo: number) {
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchHos(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.HospitalList = data.HospitalModel;
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
    this.HospitalList = [];
    this.GetHospitalDetails(itemsPerPage, 1);
  }
}
