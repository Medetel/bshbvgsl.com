import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Search } from '../../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-deputaion-sanction-grid',
  templateUrl: './deputaion-sanction-grid.component.html',
  styleUrls: ['./deputaion-sanction-grid.component.css']
})
export class DeputaionSanctionGridComponent implements OnInit {
  title="View Deputation Sanction"; 
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
  DEPUTATION_ID: number;
  mode:any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllDPTSanDetails(this.itemsPerPage, this.currentPage)
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
      this.GetAllDPTSanDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllDPTSanDetails(this.itemsPerPage, pageNumber);
  }


  GetAllDPTSanDetails(itemsPerPage: number, pageNo: number) {
    this.filter = true;
    setTimeout(() => {

      this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllDPTSanDetails(itemsPerPage, pageNo);
      this.data.subscribe(
        (response: any) => {         
          this.TanferDeatils = response.DeputationModel;  
          if(this.TanferDeatils.length>0)         
          this.totalItems = this.TanferDeatils[0].TotalItems;
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
        this.userService.SearchDeputation(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.TanferDeatils = data.DeputationModel;
            
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
  }

  save(Remarks){    
    this.data = this.userService.UpdateDPTSan(this.state,Remarks,this.NomiId);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Updated', 'success');
        this.GetAllDPTSanDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

 

}


