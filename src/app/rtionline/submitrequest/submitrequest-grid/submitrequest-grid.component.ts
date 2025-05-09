import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-submitrequest-grid',
  templateUrl: './submitrequest-grid.component.html',
  styleUrls: ['./submitrequest-grid.component.css']
})
export class SubmitRequestGridComponent implements OnInit {
  title = "Online RTI Request Form"
  data: any = {};
  RtiApplicantlist: any = [];
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  message: boolean;
  isSearch: boolean;
  rtiappid: number;
  // mode: string;
  // Advocatelist: any = [];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllRTIApplicants(this.itemsPerPage, this.currentPage);
  }

  pageChanged(pageNumber: number) {
   
      this.GetAllRTIApplicants(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
   
      this.GetAllRTIApplicants(this.itemsPerPage, pageNo);
  }

  GetAllRTIApplicants(itemsPerPage: number, pageNo: number) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllRTIApplicants(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.RtiApplicantlist = response.RTIApplicantforgridModels;
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
  
  // GetAllRTIApplicants(itemsPerPage: number, pageNo: number) {
  //   this.isSearch = false;
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetAllRTIApplicants(itemsPerPage, pageNo);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.RtiApplicantlist = response.RTIApplicantforgridModels;
  //       this.totalItems = response.TotalItemsCount;
  //       this.itemsPerPage = itemsPerPage;
  //       this.currentPage = pageNo;

  //       document.getElementById('loader-spinner').style.display = "none";
  //     },
  //     (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }
  //   );
  // }

  

}

