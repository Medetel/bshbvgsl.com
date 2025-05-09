import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  title="Project List"
  projectlist; 
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata:any;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllProjects(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllProjects(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo); 
    else
      this.GetAllProjects(this.itemsPerPage, pageNo);
  }

  GetAllProjects(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllProjects(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.projectlist = data.projectsModels;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  onSearch(s, itemsPerPage: number, pageNo: number) {
    
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchProjects(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.projectlist = data.projectsModels;
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

  ActivateInactivateProjects(id: string, inActive: string) {
    if (inActive == 'N') {
      swal({
        title: 'Are you sure?', text: "You want to inactivate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, inactivate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateProject(id, inActive);
        }
      })
    }
    else {
      swal({
        title: 'Are you sure?', text: "You want to activate!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, activate it!'
      }).then((result) => {
        if (result.value) {
          this.ActivateInactivateProject(id, inActive);
        }
      })
    }
  }

  ActivateInactivateProject(id: string, inActive:string) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.ActivateInactivateProject(id)
      .subscribe(
        (data) => {
          this.GetAllProjects(this.itemsPerPage, 1);
          document.getElementById('loader-spinner').style.display = "none";
          if(inActive=='N')
          swal('Inactivated!', 'Project has been inactivated.', 'success');
          else
          swal('Activated!', 'Project has been activated.', 'success');
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          // swal({ text: 'Please delete all pro belonging to this office.' });
          //this.errorHandler.handleError(error);
        });
  }


}
