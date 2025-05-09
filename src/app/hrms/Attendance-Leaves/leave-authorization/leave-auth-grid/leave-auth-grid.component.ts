import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../shared/user.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
declare var $: any; // Declare jQuery globally
@Component({
  selector: 'app-leave-auth-grid',
  templateUrl: './leave-auth-grid.component.html',
  styleUrls: ['./leave-auth-grid.component.css']
})
export class LeaveAuthGridComponent implements OnInit {
  title = "Leave Approval";
  itemsPerPage: number = 5;
  currentPage: number = 1;
  data: any = [];
  totalItems: number;
  s: Search;
  isSearch: boolean;
  EmployeeLeaveDetails: any = [];
  FilteredEmployeeLeaveDetails: any = [];
  c: any = []
  districtlist: any = [];
  filter: boolean = true;
  state: number;
  LeaveAppId : number;
  a : any =[];
  mode: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    //this.GetEmployeeLeaveDetails(this.itemsPerPage, this.currentPage)
    this.data = this.userService.GetDristic();
    this.data.subscribe(
      (response) => {
        this.districtlist = response.DivisionModel;
      })

      //Making division selected default based on login userId
    this.c.DI_Id = +localStorage.getItem('divisonId');   
    this.GetEmployeeLeaveDetails(this.itemsPerPage, this.currentPage);
    
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, itemsPerPage, pageNo);
    else
      this.GetEmployeeLeaveDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetEmployeeLeaveDetails(this.itemsPerPage, pageNumber);
  }


  GetEmployeeLeaveDetails(itemsPerPage: number, pageNo: number) {
    this.filter = true;

      this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllEmployeeApprovalLeaveDetails(itemsPerPage, pageNo,this.c.DI_Id);
      this.data.subscribe(
        (response: any) => {
          this.EmployeeLeaveDetails = response;
          if(this.EmployeeLeaveDetails.length>0)
          //this.EmployeeLeaveDetails = this.EmployeeLeaveDetails.filter(a=>a.LEAVE_APP_STATUS != 4064)         
          this.totalItems = response[0].TotalItems;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo; 
          //this.ChangeDivision(this.c.DI_Id)        
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );   
  }


  delete(LEAVE_APPL_ID) {
    debugger;
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteLeaveApp(LEAVE_APPL_ID);
        this.data.subscribe(
          (response: any) => {
            this.GetEmployeeLeaveDetails(this.itemsPerPage, this.currentPage);
          },
        );

      }
    })
  }


  onSearch(s, itemsPerPage: number, pageNo: number) {
    this.isSearch = true;
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {

      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetEmployeeLeaveAppOnSearch(itemsPerPage, pageNo, searchCriteria, searchText)
        .subscribe(
          (data: any) => {
            this.EmployeeLeaveDetails = data.EmployeeLeaveApllicationModels;
            this.EmployeeLeaveDetails = this.EmployeeLeaveDetails.filter(a=>a.LEAVE_APP_STATUS != 4064)
            console.log('Leave Details');
            console.log(this.EmployeeLeaveDetails);
            if(this.EmployeeLeaveDetails.length>0)
            this.totalItems = data.TotalItemsCount;
            this.itemsPerPage = itemsPerPage;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";

          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }


  ChangeDivision(DI_Id) {
    //this.filter = false;
    //this.GetEmployeeLeaveDetails(this.itemsPerPage,this.currentPage)

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeeApprovalLeaveDetails(this.itemsPerPage, this.currentPage,DI_Id);
    this.data.subscribe(
      (response: any) => {
        this.EmployeeLeaveDetails = response;
        //this.EmployeeLeaveDetails = this.EmployeeLeaveDetails.filter(a=>a.LEAVE_APP_STATUS != 4064)         
        this.totalItems = response.TotalItemsCount;
        //this.itemsPerPage = itemsPerPage;
        //this.currentPage = pageNo; 
        // this.ChangeDivision(this.c.DI_Id)        
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }



    // = this.EmployeeLeaveDetails.filter(a => a.EMP_DIVISION_ID == DI_Id && a.LEAVE_APP_STATUS != 4064)

  


  handleChange1(LEAVE_APPL_ID) {
    debugger;
    this.LeaveAppId = LEAVE_APPL_ID;
    this.state = 1;
  }

  handleChange2(LEAVE_APPL_ID) {
    debugger;
    this.LeaveAppId = LEAVE_APPL_ID;
    this.state = 2;
    this.save(null)
  }


  save(Remarks){ 
    this.data = this.userService.UpdateAutherization(this.LeaveAppId,Remarks,this.state);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'Authorization is done', 'success');
        $('#myModal').modal('hide');
        this.GetEmployeeLeaveDetails(this.itemsPerPage,this.currentPage)
        this.router.navigate(['/home/leaveapp/leave-authorization']);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  GotoView(LeaveAppId){
   
    localStorage.removeItem('gotoAuth')
    localStorage.setItem('gotoAuth','1')
    this.router.navigate(['/home/leaveapp/leaveapp-form',LeaveAppId,'view']);
  }
  


}
