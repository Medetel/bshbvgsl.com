import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-nomination-san-grid',
  templateUrl: './nomination-san-grid.component.html',
  styleUrls: ['./nomination-san-grid.component.css']
})
export class NominationSanGridComponent implements OnInit {
  title="View Nomination Sanction"; 
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
  Nomeatils: any=[];
  NMNT_ID: number;
  DEPUTATION_ID: number;
  mode: any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllNomSanDetails(this.itemsPerPage, this.currentPage)
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
      this.GetAllNomSanDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllNomSanDetails(this.itemsPerPage, pageNumber);
  }


  GetAllNomSanDetails(itemsPerPage: number, pageNo: number) {
    this.filter = true;
    setTimeout(() => {

      this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllNomSanDetails(itemsPerPage, pageNo);
      this.data.subscribe(
        (response: any) => {         
          this.Nomeatils = response.NomineeModel;               
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


  onSearch(s, itemsPerPage: number, pageNo: number) {
  
    debugger;
    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
      if(searchCriteria=='Nom_No'){
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
        this.userService.SearchNomineeApp(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.Nomeatils = data.NomineeModel;
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

  
  

  handleChange1(NMNT_ID) {   
    //debugger;
    this.NMNT_ID = NMNT_ID;
    this.state = 2;    
  }

  handleChange2(NMNT_ID) {   
    debugger;
    this.NMNT_ID = NMNT_ID;
    this.state = 1;
    //this.save(null)   
  }


  save(Remarks){    
    this.data = this.userService.UpdateNomSan(this.state,Remarks,this.NMNT_ID);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Updated', 'success');
        $('#myModal').modal('hide');
        this.GetAllNomSanDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  NominationView(NMNT_ID){
    localStorage.setItem('switchurl','/home/nominationapp/nomination-san')
    this.router.navigate(['/home/nominationapp/nominationapp-form',NMNT_ID,'View']);
  }

}


 