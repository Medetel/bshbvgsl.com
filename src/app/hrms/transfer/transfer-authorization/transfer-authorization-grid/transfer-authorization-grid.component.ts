import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-transfer-authorization-grid',
  templateUrl: './transfer-authorization-grid.component.html',
  styleUrls: ['./transfer-authorization-grid.component.css']
})
export class TransferAuthorizationGridComponent implements OnInit {
  @ViewChild('myModal') myModalElement; 
  title="Transfer Approval";
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
  TanferDeatils: any=[];
  NomiId: number;
  mode:any;
  modalCloseBtn: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllEmployeeTransferDetails(this.itemsPerPage, this.currentPage)
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
      this.GetAllEmployeeTransferDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllEmployeeTransferDetails(this.itemsPerPage, pageNumber);
  }


  GetAllEmployeeTransferDetails(itemsPerPage: number, pageNo: number) {
    this.filter = true;
    setTimeout(() => {

      this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllEmployeeTranferDetails(itemsPerPage, pageNo);
      this.data.subscribe(
        (response: any) => {                   
          this.TanferDeatils = response.TransferRelievingModels;   
          console.log('Transer Details');
          console.log(this.TanferDeatils);        
          this.totalItems =response.TransferRelievingModels[0].TotalItems 
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
              this.TanferDeatils = data.TransferRelievingModels;
            
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
  //           this.TanferDeatils = data.EmployeeLeaveApllicationModels;
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


  

  handleChange1(NomiId) {
   
    debugger;
    this.NomiId = NomiId;
    this.state = 2;    
  }

  handleChange2(NomiId) {   
   
    this.NomiId = NomiId;
    this.state = 1;
    //this.save(null)   
  }


  save(Remarks) { 
    // Show loader spinner
    document.getElementById('loader-spinner').style.display = "block";

    // Call UpdateTransfer method from the userService
    this.data = this.userService.UpdateTranfer(this.state, Remarks, this.NomiId);

    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'Approve is done', 'success');  // Show success message
        $('#myModal').modal('hide');
        this.GetAllEmployeeTransferDetails(this.itemsPerPage, this.currentPage);  // Refresh the data

        // Trigger the close button click programmatically
        this.modalCloseBtn.nativeElement.click();
      },
      (error) => {
        console.error("An error occurred:", error);  // Handle errors
      }
    ).add(() => {
      // Hide loader spinner
      document.getElementById('loader-spinner').style.display = "none";
    });
  }

  // save2(Remarks){  
  //   this.data = this.userService.UpdateTranfer(this.state,Remarks,this.NomiId);
  //   this.data.subscribe(
  //     (response: any) => {  
  //       swal('Success!', 'Autherization is done', 'success');
  //       this.GetAllEmployeeTransferDetails(this.itemsPerPage, this.currentPage);
  //       document.getElementById('loader-spinner').style.display = "none";
  //     },
  //     (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }
  //   );
  // }

  
  View(ID){
    localStorage.setItem('switchurl','/home/transfer/transfer-authorization')
    this.router.navigate(['/home/transfer/transferout-form',ID,'View']);
  }

}
