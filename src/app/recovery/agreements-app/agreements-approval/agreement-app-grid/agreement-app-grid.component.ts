import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-agreement-app-grid',
  templateUrl: './agreement-app-grid.component.html',
  styleUrls: ['./agreement-app-grid.component.css']
})
export class AgreementAppGridComponent implements OnInit {

  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  s: any;
  PropertyAgreementList: any;
  message: boolean;
  AgrId: any;
  Status: string;
  data: any;
  PA: any = {};
  AgrmntId: any;
  mode: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllAgreementApprovalDetails(this.itemsPerPage, 1);
  }
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllAgreementApprovalDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllAgreementApprovalDetails(this.itemsPerPage, pageNo);
  }

  GetAllAgreementApprovalDetails(itemsPerPage: number, pageNo: number) {
 
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllAgreementApprovalDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.PropertyAgreementList = data.PropertyAgreementApprovalModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {

    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetAllAgreementApprovalBySearch(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.message = false;
            this.PropertyAgreementList = data.PropertyAgreementApprovalModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  handleChange1(AgrmntId) {
    this.AgrmntId = AgrmntId;
    this.Status = 'R';
  }

  handleChange2(AgrmntId) {
    this.AgrmntId = AgrmntId;
    this.Status = 'A';
    this.save('')
  }

  save(Remarks) {
    if (this.Status == 'A') {
      Remarks = 'A'
    }
    this.data = this.userService.UpdateAgreement(this.Status, Remarks, this.AgrmntId);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'Autherization is done', 'success');
        this.GetAllAgreementApprovalDetails(this.itemsPerPage, 1);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
}
