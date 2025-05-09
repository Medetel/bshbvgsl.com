import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-scn-remainder',
  templateUrl: './scn-remainder.component.html',
  styleUrls: ['./scn-remainder.component.css']
})
export class ScnRemainderComponent implements OnInit {

  title="Show Cause Noties Remainder";  
 
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata:any;
  SCNReminderlistA:any={};
  r: any={};
  SCN_ID: any={};
  data: any;
  Districtlist: any ={};
  SA: any ={};
  d: any ={};
  DI_Id: any ={};
  SCN_REMINDER_ID: any={};
  
  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllData();
    
     this.r.DivisionId = +localStorage.getItem('divisonId');
     this.GetAllSCNReminderDetails(this.r.DivisionId);
    //  this.GetAllSCNReminderDetails(this.r.DivisionId);
  }
  



  GetAllData()
  {
    debugger;
    this.data = this.userService.GetAllDistrictsSCNAuth();
    this.data.subscribe(
      (response: any) => {
        this.Districtlist = response.Result;
        
      })

  }
  GetAllSCNReminderDetails(DI_Id) {
    debugger;
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetSCNReminder(DI_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.SCNReminderlistA = data.Result; 
          console.log("result");
          console.log( this.data);               
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
 

  

  
  // onSearch(s, itemsPerPage: number, pageNo: number) {
  //   debugger;
  //   this.isSearch = true;
  //   let searchText = this.s.SearchText.replace(/\s/g, "");
  //   let searchCriteria = this.s.SearchCriteria.replace(/\s/g, "");
  //   if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
  //     swal("Warning!", "Please enter the search criteria and search text.", "warning");
  //   else {
  //     document.getElementById('loader-spinner').style.display = "block";
  //     this.userService.SearchSCN(searchCriteria, searchText, itemsPerPage, pageNo)
  //       .subscribe(
  //         (data: any) => {
  //           this.SCNReminderlistA = data.SCNAuthModel;           
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
      if(searchCriteria=='DOC_CODE1'){
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
        this.userService.SearchSCN(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.SCNReminderlistA = data.ShowCauseNoticeModel;
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