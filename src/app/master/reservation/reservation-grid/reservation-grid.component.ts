import { Component, OnInit } from '@angular/core';
import { Application } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-reservation-grid',
  templateUrl: './reservation-grid.component.html',
  styleUrls: ['./reservation-grid.component.css']
})
export class ReservationGridComponent implements OnInit {

  itemsPerPage: number=5;
  currentPage: number=1;
  ReservationDetailsList : any = {};
  data : any = {};
  totalItems : number;
  s: Search;
  isSearch:boolean;
  RES_Id : number;
  title="Reservation";
  created_date: Date;
  
 
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() { 
   // this.GetReservationDetails(this.itemsPerPage, 1)
    this.GetReservationDetailsbyDate(this.itemsPerPage, 1)
  }

 

  //List of Case Proceedings
  GetReservationDetails(itemsPerPage:any,pageNo:any){  
  this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetReservationDetails(itemsPerPage,pageNo);
    this.data.subscribe(
      (response: any) => {
        this.ReservationDetailsList = response.ReservationMasterModels;
          this.totalItems = response.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;    
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  delete(RES_Id){
    swal({
       title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
     }).then((result) => {
        if (result.value) {
        this.data = this.userService.DeleteReservation(RES_Id);
        this.data.subscribe(
         (response: any) => {
          this.GetReservationDetails(this.itemsPerPage, 1);
          swal('Success!', 'Reservation Deleted Successfully.', 'success');                  
         }      
      ); 
    } 
    })
    }

    pageChanged(pageNumber: number) {
      if (this.isSearch)
        this.onSearch(this.s, this.itemsPerPage, pageNumber);
      else
        this.GetReservationDetailsbyDate(this.itemsPerPage, pageNumber);
    }
  
    itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
      if (this.isSearch)
        this.onSearch(this.s, this.itemsPerPage, pageNo);
      else
        this.GetReservationDetailsbyDate(this.itemsPerPage, pageNo);
    }


  //Search item


  onSearch(s, itemsPerPage: number, pageNo: number) {   
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchReservation(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            if(data.ReservationMasterModels.length!=0){              
            this.ReservationDetailsList = data.ReservationMasterModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }
          else
          {
          document.getElementById('loader-spinner').style.display = "none";         
          }
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }

  GetReservationDetailsbyDate(itemsPerPage:any,pageNo:any){  
    this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetReservationDetailsbyDate(itemsPerPage,pageNo);
      this.data.subscribe(
        (response: any) => {
          this.ReservationDetailsList = response.ReservationMasterModels;
            this.totalItems = response.TotalItemsCount;
            this.itemsPerPage = itemsPerPage;
            this.currentPage = pageNo;    
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }

    deleteReservationByDate(created_date){
      this.created_date = created_date.toString().split('T')[0];
      swal({
         title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
       }).then((result) => {
          if (result.value) {
          this.data = this.userService.DeleteReservationByDate(this.created_date);
          this.data.subscribe(
           (response: any) => {
            this.GetReservationDetailsbyDate(this.itemsPerPage, 1);
            swal('Success!', 'Reservation Deleted Successfully.', 'success');                  
           }      
        ); 
      } 
      })
      }
  


}
