import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-external-enquiry-grid',
  templateUrl: './external-enquiry-grid.component.html',
  styleUrls: ['./external-enquiry-grid.component.css']
})
export class ExternalEnquiryGridComponent implements OnInit {
  title = "View External Enquiry";
 
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata:any;
  Examlist:any={};
E: any={};
EXAMINATION_ID:number;
  data: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllExeternalDetails(this.itemsPerPage, 1);
  }
  
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllExeternalDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo); 
    else
      this.GetAllExeternalDetails(this.itemsPerPage, pageNo);
  }

  GetAllExeternalDetails(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllExeternalDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.Examlist = data.ExternalEnqModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
 
//delete
delete(EEN_ID){
  swal({
       title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
      this.data = this.userService.DeleteExternalDeatil(EEN_ID);
      this.data.subscribe(
       (response: any) => {
           this.GetAllExeternalDetails(this.itemsPerPage,this.currentPage);          
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
  //   let searchText = this.s.SearchText.replace(/\s/g, "");
  //   let searchCriteria = this.s.SearchCriteria.replace(/\s/g, "");
  //   if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
  //     swal("Warning!", "Please enter the search criteria and search text.", "warning");
  //   else {
  //     document.getElementById('loader-spinner').style.display = "block";
  //     this.userService.SearchExternalenq(searchCriteria, searchText, itemsPerPage, pageNo)
  //       .subscribe(
  //         (data: any) => {
  //           this.Examlist = data.ExternalEnqModel;
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
      // if(searchCriteria=='DOC_CODE1'){
      //   const [name, street, unit] = searchText.split('/');
      //   let searchtxt=name;
      //   let searchtxt1=street;
      //   let searchtxt2=unit;
      //   searchText=searchtxt+searchtxt1+searchtxt2;
      // }


      // if(searchCriteria=='DOC_CODE2'){
      //   const [name, street, unit] = searchText.split('/');
      //   let searchtxt=name;
      //   let searchtxt1=street;
      //   let searchtxt2=unit;
      //   searchText=searchtxt+searchtxt1+searchtxt2;
      // }
      if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
        swal("Warning!", "Please enter the search criteria and search text.", "warning");
      else {
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.SearchExternalenq(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.Examlist = data.ExternalEnqModel;
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