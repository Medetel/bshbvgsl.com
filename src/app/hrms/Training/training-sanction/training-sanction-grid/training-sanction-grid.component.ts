import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-training-sanction-grid',
  templateUrl: './training-sanction-grid.component.html',
  styleUrls: ['./training-sanction-grid.component.css']
})
export class TrainingSanctionGridComponent implements OnInit {
  title="View Training Sanction";
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
  TRAINING_ID: number;
  mode:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllTRnSanDetails(this.itemsPerPage, this.currentPage)
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
      this.GetAllTRnSanDetails(itemsPerPage, pageNo);
  }

  GetAllTrainingDetails(itemsPerPage, id){

  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllTRnSanDetails(this.itemsPerPage, pageNumber);
  }


  GetAllTRnSanDetails(itemsPerPage: number, pageNo: number) {
    this.filter = true;
    setTimeout(() => {

      this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllTRnSanDetails(itemsPerPage, pageNo);
      this.data.subscribe(
        (response: any) => {         
          this.TanferDeatils = response.TrainingModel;  
          if(this.TanferDeatils.length>0)             
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
              this.TanferDeatils = data.TrainingModel;
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

  

  handleChange1(TRAINING_ID) {
   
    debugger;
    this.TRAINING_ID = TRAINING_ID;
    this.state = 2;    
  }

  handleChange2(TRAINING_ID) {   
    debugger;
    this.TRAINING_ID = TRAINING_ID;
    this.state = 1;
    //this.save(null)   
  }


  save(Remarks){    
//debugger;
    this.data = this.userService.UpdateTraoiningSan(this.state,Remarks,this.TRAINING_ID);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Updated', 'success');
        this.GetAllTRnSanDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  View(ID){
    localStorage.setItem('switchurl','/home/training/training-sanction')
    this.router.navigate(['/home/training/training-form',ID,'View']);
  }
 

}


