import { Component, OnInit } from '@angular/core';
import { Search } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { ErrorHandler } from '../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
declare var $: any;

@Component({
  selector: 'app-auctioned-properties-cancel',
  templateUrl: './auctioned-properties-cancel.component.html',
  styleUrls: ['./auctioned-properties-cancel.component.css']
})
export class AuctionedPropertiesCancelComponent implements OnInit {

  numericpattern = "[0-9.]*";
  phoneno = "[0-9]*";
  auctionForm = false;
  ViewBiddersForm = false;   
  selectProperty = false; 

  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  formSubmitted: boolean;
  Bidderdetails:any=[]; 
  userRole: any; 
  AN_Id: number;
  Status: string;
  searchtext: string;
  Bidder:any={};
  s: Search;
  isSearch: boolean;
  hide: any;

  constructor(private userService: UserService, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');   
    
    this.GetAllAllocatedProperties(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber: number) {
    if (this.s.SearchText != "" && this.s.SearchText != null && this.s.SearchCriteria != "" && this.s.SearchCriteria != null) {
      this.isSearch = true;
    }
    else {
      this.isSearch = false;
    }
    if (this.isSearch)
      this.SearchAllocatedProperties(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllAllocatedProperties(this.itemsPerPage, pageNumber);
  }

  SearchAllocatedProperties(biddder:any ,itemsPerPage: number, pageNo: number) {
    this.hide = "no";
    // alert(biddder.Biddercriteria);
    // alert(biddder.Biddersearch);
    // this.searchtext=biddder.Biddersearch.trim();
    if(biddder.Biddercriteria=="" || biddder.Biddercriteria==null || biddder.Biddercriteria=='undefined')
    {      
       swal('warning!', 'Please select search criteria.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
        return;
    } 
    
    if(biddder.Biddercriteria=="BidderId")
    {         
        if(biddder.Biddersearch=="" || biddder.Biddersearch==null || biddder.Biddersearch=='undefined') 
        { 
          swal('warning!', 'Please enter bidder id.', 'warning');
          document.getElementById('loader-spinner').style.display = "none";
          return;
        }
    } 
    if(biddder.Biddercriteria=="BidderName")
    {     
      if(biddder.Biddersearch=="" || biddder.Biddersearch==null || biddder.Biddersearch=='undefined') 
      {     
       swal('warning!', 'Please enter bidder name.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
        return;
      }
    } 
    if(biddder.Biddercriteria=="ProjectName")
    {      
      if(biddder.Biddersearch=="" || biddder.Biddersearch==null || biddder.Biddersearch=='undefined') 
      {      
       swal('warning!', 'Please enter project name.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
        return;
      }
    } 

    this.searchtext=biddder.Biddersearch.trim();

    document.getElementById('loader-spinner').style.display = "block";
    this.userService.SearchAllocatedProperties(biddder.Biddercriteria,this.searchtext, itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {          
          document.getElementById('loader-spinner').style.display = "none";
          this.Bidderdetails = data.AllotedPropertiesModel;          
            this.totalItems = data.TotalItemsCount;
            this.itemsPerPage = itemsPerPage;
            this.currentPage = pageNo;               
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  
  GetAllAllocatedProperties(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    this.hide = "yes";
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllAllocatedProperties(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          //console.log("data :" +JSON.stringify(data));
          this.Bidderdetails = data.AllotedPropertiesModel;         
          this.totalItems = data.TotalItemsCount; 
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }


  clear(){
    this.Bidderdetails=[];   
    this.GetAllAllocatedProperties(this.itemsPerPage, 1);
  }

  
}
