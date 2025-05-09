import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Search } from '../../../shared/user.model';
import { NgForm } from '@angular/forms';
import { ErrorHandler } from '../../../shared/ErrorHandler';


@Component({
  selector: 'app-roles-grid',
  templateUrl: './roles-grid.component.html',
  styleUrls: ['./roles-grid.component.css']
})
export class RolesGridComponent implements OnInit {
  @Output() change = new EventEmitter();
  title = "View Roles"
  s: Search;
  itemsPerPage: number=5;
  currentPage: number=1;
  totalItems: number;
  isSearch:boolean;
  message:boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private errorHandler:ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllRoles(this.itemsPerPage, 1);
  }

  
  roleList;
  officeList;

  pageChanged(pageNumber:number){
    if (this.isSearch)
    this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
    this.GetAllRoles(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo);
    else
      this.GetAllRoles(this.itemsPerPage, pageNo);
  }

  GetAllRoles(itemsPerPage: number, pageNo: number) {
    this.message=false;
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.getAllRoles(itemsPerPage,pageNo)
      .subscribe(
        (data:any) => {
          this.roleList = data.RolesModels;
          this.totalItems=data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
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
      this.userService.searchRoles(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data:any) => {
            if(data.RolesModels.length!=0){
              this.message=false;
            this.roleList = data.RolesModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
            }
            else
            {
            document.getElementById('loader-spinner').style.display = "none";
            this.message=true;
            }
          }, (error:any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }


  
  ActivateInactivateRole(id: string, inActive: string) {
    
    if (inActive == 'N' || inActive==null) {
      swal({
        title: 'Are you sure?', text: "You want to inactivate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, inactivate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateRoles(id, inActive);
        }
      })
    }
    else {
      swal({
        title: 'Are you sure?', text: "You want to activate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, activate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateRoles(id, inActive);
        }
      })
    }
  }


  ActivateInactivateRoles(id: string,inActive:string) {
   
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.activateInactivateRoles(id)
          .subscribe(
            (data) => {
              this.GetAllRoles(this.itemsPerPage, 1);
              document.getElementById('loader-spinner').style.display = "none";
              if(inActive=='N' || inActive==null)
          swal('Inactivated!', 'Role has been inactivated.', 'success');
          else
          swal('Activated!', 'Role has been activated.', 'success');
            }, (error:any) => {
              document.getElementById('loader-spinner').style.display = "none";
              swal({ text: 'Please delete all users belonging to this Role.' });
              this.errorHandler.handleError(error);
            });
  }

}
