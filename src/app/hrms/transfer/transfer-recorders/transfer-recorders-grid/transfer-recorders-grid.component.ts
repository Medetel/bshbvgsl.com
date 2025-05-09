import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-transfer-recorders-grid',
  templateUrl: './transfer-recorders-grid.component.html',
  styleUrls: ['./transfer-recorders-grid.component.css']
})
export class TransferRecordersGridComponent implements OnInit {
  isSearch: boolean;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  TransferRelievinglist: any = {};
  s: Search;
  data: any = {};
  type: any;
  TR: any ={};
  DI_Id:number;
  
  title="Transfer Records";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) {this.s = new Search();
      this.isSearch = false;
  
    }

  ngOnInit() {
   
    this.TR.DI_Id = +localStorage.getItem('DI_Id');
    this.GetAllTRFRecoredsDetails(this.TR.DI_Id,this.itemsPerPage, 1);
  
  };

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllTRFRecoredsDetails(this.DI_Id,this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo); 
    else
      this.GetAllTRFRecoredsDetails(this.DI_Id,this.itemsPerPage, pageNo);
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
              this.TransferRelievinglist = data.TransferRelievingModels;
             
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
 
  //Get Transfer Relieving Details
  GetAllTRFRecoredsDetails(DI_Id,itemsPerPage: any, pageNo: any) {  
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllTRFRecoredsDetails(DI_Id,itemsPerPage, pageNo);
    this.data.subscribe(
      (response: any) => {
        this.TransferRelievinglist = response.TransferRelievingModels;
     
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401 || error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });
   }; 


   View(ID){     
    //this.router.navigate(["/home/transfer/transferout-form',TR.transfer_id,'View'"]);  

    this.router.navigate(['/home/transfer/transferout-form',ID,'View']);
   }
}