import { Component, OnInit, EventEmitter, Output, ErrorHandler } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import * as JQuery from "jquery";
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
const $ = JQuery.default;

@Component({
  selector: 'app-transfer-out-grid',
  templateUrl: './transfer-out-grid.component.html',
  styleUrls: ['./transfer-out-grid.component.css']
})
export class TransferOutGridComponent implements OnInit {
  isSearch: boolean;
  itemsPerPage: number = 5;
  totalItems: number;
  currentPage: number = 1;
  TransferRelievinglist: any = {};
  s: Search;
  data: any = {};
  type: any;
  TR: any ={};
  
  title="Employee Transfer Relieving";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) {this.s = new Search();
      this.isSearch = false;
  
    }

  ngOnInit() {
    this.GetAllTransferRelievingDetails(this.itemsPerPage, 1);
  };

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
   // if (this.isSearch)
      //.onSearch(this.s, itemsPerPage, pageNo);
    //else
      this.GetAllTransferRelievingDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {   
    // if (this.isSearch)
    //   this.onSearch(this.s, this.itemsPerPage, pageNumber);
    // else
      this.GetAllTransferRelievingDetails(this.itemsPerPage, pageNumber);
  }


  //delete
delete(transfer_id){
  swal({
       title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
      this.data = this.userService.DeleteTRF(transfer_id);
      this.data.subscribe(
       (response: any) => {
           this.GetAllTransferRelievingDetails(this.itemsPerPage,this.currentPage);          
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
  //Get Transfer Relieving Details
  GetAllTransferRelievingDetails(itemsPerPage: any, pageNo: any) {  
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllTransferRelievingDetails(itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.TransferRelievinglist = response.TransferRelievingModels;
        if(this.TransferRelievinglist.length>0)
        this.totalItems = response.TransferRelievingModels[0].TotalItems;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401 || error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });
   }; 






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
        this.userService.Searchtransferdetails(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.TransferRelievinglist = data.TransferRelievingModels;
            
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