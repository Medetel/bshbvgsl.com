import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-htc-ltc-grid',
  templateUrl: './htc-ltc-grid.component.html',
  styleUrls: ['./htc-ltc-grid.component.css']
})
export class HtcLtcGridComponent implements OnInit {

  title="View Employees HTC / LTC Details";
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata:any;
  HTClist:any=[];
  h: any={};
  LVCONS_ID:number;
  data: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllHTCDetails(this.itemsPerPage, 1);
  }
  
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllHTCDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo); 
    else
      this.GetAllHTCDetails(this.itemsPerPage, pageNo);
  }

  GetAllHTCDetails(itemsPerPage: number, pageNo: number) {
    
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllHTCDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.HTClist = data.HTCModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
 
//delete
delete(LVCONS_ID){
  swal({
       title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
      this.data = this.userService.DeleteHTC(LVCONS_ID);
      this.data.subscribe(
       (response: any) => {
           this.GetAllHTCDetails(this.itemsPerPage,this.currentPage);          
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

  
  // onSearch(s, itemsPerPage: number, pageNo: number) {
   
 
  //   this.isSearch = true;
  //   let searchText = this.s.SearchText;
  //   let searchCriteria = this.s.SearchCriteria;
  //   if(searchCriteria=='DOC_CODE'){
  //     const [name, street, unit] = searchText.split('/');
  //     let searchtxt=name;
  //     let searchtxt1=street;
  //     let searchtxt2=unit;
  //     searchText=searchtxt+searchtxt1+searchtxt2;
  //   }
  //   if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
  //     swal("Warning!", "Please enter the search criteria and search text.", "warning");
  //   else {
  //     document.getElementById('loader-spinner').style.display = "block";
  //     this.userService.SearchHTC(searchCriteria, searchText, itemsPerPage, pageNo)
  //       .subscribe(
  //         (data: any) => {
  //           this.HTClist = data.HTCModel;
  //           this.totalItems = data.TotalItemsCount;
  //           this.currentPage = pageNo;
  //           document.getElementById('loader-spinner').style.display = "none";
  //         }, (error) => {
  //           document.getElementById('loader-spinner').style.display = "none";
  //           //swal('Search Failed.');
  //           this.errorHandler.handleError(error);
  //         });
  //   }
  // }
  onSearch(s, itemsPerPage: number, pageNo: number) {
  
    debugger;
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
      if(searchCriteria=='DOC_CODE'){
        const [name, street, unit] = searchText.split('/');
        let searchtxt=name;
        let searchtxt1=street;
        let searchtxt2=unit;
        searchText=searchtxt+searchtxt1+searchtxt2;
      }    
     
      if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
        swal("Warning!", "Please enter the search criteria and search text.", "warning");
      else {
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.SearchHTC(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.HTClist = data.HTCModel;
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