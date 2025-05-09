import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-gen-incr-list-grid',
  templateUrl: './gen-incr-list-grid.component.html',
  styleUrls: ['./gen-incr-list-grid.component.css']
})
export class GenIncrListGridComponent implements OnInit {

  title="Generate Increment List";
  //title ="View Nomination Application"
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata:any;
  incrementlist:any={};
  E: any={};
  NMNT_ID:number;
  data: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllIncrementList(this.itemsPerPage, 1);
  }
  
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllIncrementList(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo); 
    else
      this.GetAllIncrementList(this.itemsPerPage, pageNo);
  }

  GetAllIncrementList(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllIncrementDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.incrementlist = data;
          this.totalItems = data[0].TotalItems;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
 
//delete
delete(NMNT_ID){
  swal({
       title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
      this.data = this.userService.DeleteNominee(NMNT_ID);
      this.data.subscribe(
       (response: any) => {
           this.GetAllIncrementList(this.itemsPerPage,this.currentPage);          
       },(error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401|| error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      }       
    ); 
  } 
  })
  }
  onSearch(s, itemsPerPage: number, pageNo: number) { 
  
    this.isSearch = true;
    let searchText = this.s.SearchText.replace(/\s/g, "");
    let searchCriteria = this.s.SearchCriteria.replace(/\s/g, "");
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchNominee(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.incrementlist = data.NomineeModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }

}
