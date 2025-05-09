import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-complaint-reg-auth',
  templateUrl: './complaint-reg-auth.component.html',
  styleUrls: ['./complaint-reg-auth.component.css']
})
export class ComplaintRegAuthComponent implements OnInit {
title="Complaint Approval";
 

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
  COMPLAINT_ID: number;
  back1 : string = '';
  mode: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllComapliantSanDetails(this.itemsPerPage, this.currentPage)
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
      this.GetAllComapliantSanDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllComapliantSanDetails(this.itemsPerPage, pageNumber);
  }


  //bck buttons
  
Back(ComplId){
 
  localStorage.setItem('Back','cauth')
  //this.ENQUIRY_ID
  localStorage.setItem('Id',ComplId.toString())
  this.router.navigate(['/home/dept-enquiry/complaints-reg-form',ComplId,'View']);
  //[routerLink]="['/home/dept-enquiry/complaint-reg-auth/complaint-reg-auth-form',c.COMPLAINT_ID,'View']"
}

// Back1(ComplId,Scnid){


//   localStorage.setItem('Back1','2nd')
 
//   localStorage.setItem('Id',this.ENQUIRY_ID.toString())
//   this.router.navigate(['/home/dept-enquiry/show-cause-form',ComplId,Scnid,'View']);
 
// }


// Back2(ComplId,Scnid){

//     localStorage.setItem('Back2','3rd') 
//     localStorage.setItem('Id',this.ENQUIRY_ID.toString())
//     this.router.navigate(['/home/dept-enquiry/show-cause-ack-form',ComplId,Scnid,'View']);
   
//   }

  GetAllComapliantSanDetails(itemsPerPage: number, pageNo: number) {
    this.filter = true;
    setTimeout(() => {

      this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllComapliantauthDetails(itemsPerPage, pageNo);
      this.data.subscribe(
        (response: any) => {         
          this.TanferDeatils = response.ComplaintRegisterModel;               
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
        this.userService.SearchComp(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.TanferDeatils = data.ComplaintRegisterModel;
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

  

  handleChange1(COMPLAINT_ID) {   
    this.COMPLAINT_ID = COMPLAINT_ID;
    this.state = 2;    
  }

  handleChange2(COMPLAINT_ID) {   
    this.COMPLAINT_ID = COMPLAINT_ID;
    this.state = 1;   
  }


  save(Remarks){    
    this.data = this.userService.UpdateApprvl(this.state,Remarks,this.COMPLAINT_ID);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Approve is done', 'success');
        this.GetAllComapliantSanDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

}
