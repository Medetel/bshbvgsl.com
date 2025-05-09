import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Search } from '../../../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  title = "View Users";
  userList;
  s:Search;
  itemsPerPage: number=5;
  currentPage: number=1;
  totalItems: number;
  isSearch:boolean;
  message:boolean;

  constructor(private userService: UserService,private route: ActivatedRoute,private router: Router, private errorHandler:ErrorHandler) { 
    this.s=new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    
    this.GetAllUsers(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber:number){
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
    this.GetAllUsers(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllUsers(this.itemsPerPage, pageNo);
  }

  GetAllUsers(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    this.message=false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.getAllUsers(itemsPerPage,pageNo)
      .subscribe(
        (data:any) => {
          this.userList = data.usersModels;
          this.totalItems=data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  ActivateInactivateUsers(id: string, inActive: string) {
    
    if (inActive == 'N') {
      swal({
        title: 'Are you sure?', text: "You want to inactivate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, inactivate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateUser(id, inActive);
        }
      })
    }
    else {
      swal({
        title: 'Are you sure?', text: "You want to activate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, activate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateUser(id, inActive);
        }
      })
    }
  }

  ActivateInactivateUser(id: string,inActive:string) {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.activateInactivateUser(id)
        .subscribe(
          (data) => {
            this.GetAllUsers(this.itemsPerPage,1);
            document.getElementById('loader-spinner').style.display = "block";
            if(inActive=='N')
          swal('Inactivated!', 'User has been inactivated.', 'success');
          else
          swal('Activated!', 'User has been activated.', 'success');
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
            //swal({ text: 'Please delete all users belonging to this Role.' });
          });
        
  }

  onSearch(s,itemsPerPage: number, pageNo: number) {
   
    this.isSearch = true;
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.searchUsers(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data:any) => {
           
            if(data.usersModels.length!=0){
            this.message=false;
            this.userList = data.usersModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
            }
            else
            {
            document.getElementById('loader-spinner').style.display = "none";
            this.message=true;
            }
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }


}
