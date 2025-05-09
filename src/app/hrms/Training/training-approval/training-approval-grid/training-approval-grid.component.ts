import { Component, OnInit } from '@angular/core';
import { Application } from '../../../../shared/user.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-training-approval-grid',
  templateUrl: './training-approval-grid.component.html',
  styleUrls: ['./training-approval-grid.component.css']
})
export class TrainingApprovalGridComponent implements OnInit {

  itemsPerPage: number = 5;
  currentPage: number = 1;
  data: any = [];
  totalItems: number;
  s: Search;
  isSearch: boolean;  
  c: any = []
  districtlist: any = [];
  filter: boolean = true;
  state: number;  
  a : any =[];
  TariningDetails: any=[];
  NomiId: number;
  mode:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetEmployeeTrainingDetails(this.itemsPerPage, this.currentPage)
    this.data = this.userService.GetDristic();
    this.data.subscribe(
      (response) => {
        this.districtlist = response.DivisionModel;
      })
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, itemsPerPage, pageNo);
    else
      this.GetEmployeeTrainingDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetEmployeeTrainingDetails(this.itemsPerPage, pageNumber);
  }


  GetEmployeeTrainingDetails(itemsPerPage: number, pageNo: number) {
    this.filter = true;
    setTimeout(() => {

      this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllEmployeeTrainingDetails(itemsPerPage, pageNo);
      this.data.subscribe(
        (response: any) => {         
          this.TariningDetails = response.TrainingModel;   
          if(this.TariningDetails.length>0)            
          this.totalItems = response.TrainingModel[0].COUNTes;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );
    }, 500)

  } 


  // onSearch(s, itemsPerPage: number, pageNo: number) {
  //   this.isSearch = true;
  //   var searchText = this.s.SearchText;
  //   var searchCriteria = this.s.SearchCriteria;
  //   if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
  //     swal("Warning!", "Please enter the search criteria and search text.", "warning");
  //   else {

  //     document.getElementById('loader-spinner').style.display = "block";
  //     this.userService.GetEmployeeLeaveAppOnSearch(itemsPerPage, pageNo, searchCriteria, searchText)
  //       .subscribe(
  //         (data: any) => {
  //           this.TariningDetails = data.EmployeeLeaveApllicationModels;
  //           this.totalItems = data.TotalItemsCount;
  //           this.itemsPerPage = itemsPerPage;
  //           this.currentPage = pageNo;
  //           document.getElementById('loader-spinner').style.display = "none";

  //         }, (error: any) => {
  //           document.getElementById('loader-spinner').style.display = "none";
  //           this.errorHandler.HandlerError(error);
  //         });
  //   }
  // }
  onSearch(s, itemsPerPage: number, pageNo: number) {
  
    debugger;
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
      if(searchCriteria=='TainingNo'){
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
        this.userService.SearchtraineesearchApp(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.TariningDetails = data.TrainingModel;
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

  

  handleChange1(NomiId) {
   
   
    this.NomiId = NomiId;
    this.state = 2;
   
  }

  handleChange2(NomiId) {
  
    this.NomiId = NomiId;
    this.state = 1;
    this.save(null)   
  }


  save(Remarks){    
    this.data = this.userService.UpdateTraining(this.state,Remarks,this.NomiId);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Autherization is done', 'success');
        this.GetEmployeeTrainingDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  
  View(ID){
    localStorage.setItem('switchurl','/home/training/training-approval')
    this.router.navigate(['/home/training/training-form',ID,'View']);
  }
 



}
