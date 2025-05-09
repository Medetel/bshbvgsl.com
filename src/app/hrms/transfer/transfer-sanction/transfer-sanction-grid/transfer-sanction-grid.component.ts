import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';
declare var $: any; // Declare jQuery globally
@Component({
  selector: 'app-transfer-sanction-grid',
  templateUrl: './transfer-sanction-grid.component.html',
  styleUrls: ['./transfer-sanction-grid.component.css']
})
export class TransferSanctionGridComponent implements OnInit {
  title="Transfer Sanction";
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

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllTransferSanDetails(this.itemsPerPage, this.currentPage)
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
      this.GetAllTransferSanDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllTransferSanDetails(this.itemsPerPage, pageNumber);
  }


  GetAllTransferSanDetails(itemsPerPage: number, pageNo: number) {
    this.filter = true;
    setTimeout(() => {

      this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllTranfersanDetails(itemsPerPage, pageNo);
      this.data.subscribe(
        (response: any) => {         
          this.TanferDeatils = response.TransferRelievingModels;               
          this.totalItems = response.TotalItemsCount;
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
  //           this.TanferDeatils = data.EmployeeLeaveApllicationModels;
  //           this.totalItems = data.TotalItemsCount;
  //           this.itemsPerPage = itemsPerPage;
  //           this.currentPage = pageNo;
  //           document.getElementById('loader-spinner').style.display = "none";

  //         }, (error: any) => {
  //           document.getElementById('loader-spinner').style.display = "none";
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
      if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
        swal("Warning!", "Please enter the search criteria and search text.", "warning");
      else {
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.Searchtransferdetails(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.TanferDeatils = data.TransferRelievingModels;             
              this.totalItems = data.TotalItemsCount;
              this.itemsPerPage = itemsPerPage;
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
    //debugger;
    this.NomiId = NomiId;
    this.state = 2;   
  }

  handleChange2(NomiId) {  
    debugger;
    this.NomiId = NomiId;
    this.state = 1;     
  }


  save(Remarks){    
    this.data = this.userService.UpdateTranferSan(this.state,Remarks,this.NomiId);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Updated', 'success');
        $('#myModal').modal('hide');
        this.GetAllTransferSanDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  View(ID){
    localStorage.setItem('switchurl','/home/transfer/transfer-sanction')
    this.router.navigate(['/home/transfer/transferout-form',ID,'View']);
  }

}

