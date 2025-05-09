import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.css']
})
export class PropertyGridComponent implements OnInit {
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  RecoveryPropertyList: any = [];
  R: any = {};
  isSearch: boolean;
  itemsPerPageChanged: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllRecoveryPropertyDetails(this.itemsPerPage, 1);
  }
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllRecoveryPropertyDetails(this.itemsPerPage, pageNumber);
  }
  onSearch(s: Search, itemsPerPage: number, pageNumber: number) {
    throw new Error("Method not implemented.");
  }

  GetAllRecoveryPropertyDetails(itemsPerPage: number, pageNo: number) {

    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllRecoveryPropertyDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {

          document.getElementById('loader-spinner').style.display = "none";
          this.RecoveryPropertyList = data.RecoveryPropertyModel;       
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

}