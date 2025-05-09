import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-enquiry-proceeding-grid',
  templateUrl: './enquiry-proceeding-grid.component.html',
  styleUrls: ['./enquiry-proceeding-grid.component.css']
})
export class EnquiryProceedingGridComponent implements OnInit {
  title="Enquiry Proceedings";
 
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata:any;
  Proceedinglist:any={};
  cr: any={};
  COMPLAINT_ID:number;
  data: any;
  //router: any;

  constructor(private userService: UserService,private router: Router ,private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllProceedingDetails(this.itemsPerPage, 1);
  }
  
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllProceedingDetails(this.itemsPerPage, pageNumber);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo); 
    else
      this.GetAllProceedingDetails(this.itemsPerPage, pageNo);
  }

  GetAllProceedingDetails(itemsPerPage: number, pageNo: number) {
   
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllProceedingDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.Proceedinglist = data.ENQProceedingForENqDetails;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          console.log("Proceedinglist")
          console.log(this.Proceedinglist)
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
 
//delete
delete(ENQUIRY_ID){
  swal({
       title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
      this.data = this.userService.DeleteIDE(ENQUIRY_ID);
      this.data.subscribe(
       (response: any) => {
           this.GetAllProceedingDetails(this.itemsPerPage,this.currentPage);          
       },(error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401|| error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      }       
    ); 
  } 
  })
  }

  
  // onSearch(s, itemsPerPage: number, pageNo: number) {
   
  //   this.isSearch = true;
  //   let searchText = this.s.SearchText.replace(/\s/g, "");
  //   let searchCriteria = this.s.SearchCriteria.replace(/\s/g, "");
  //   if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
  //     swal("Warning!", "Please enter the search criteria and search text.", "warning");
  //   else {
  //     document.getElementById('loader-spinner').style.display = "block";
  //     this.userService.SearchProc(searchCriteria, searchText, itemsPerPage, pageNo)
  //       .subscribe(
  //         (data: any) => {
  //           this.Proceedinglist = data.ENQProceedingForENqDetails;
  //           this.totalItems = data.TotalItemsCount;
  //           this.currentPage = pageNo;
          
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


      if(searchCriteria=='DOC_CODE2'){
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
        this.userService.SearchIDE(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.Proceedinglist = data.InitiateDEModel;
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
  
  //passing id
  gotoAdd(ENQUIRY_ID:any,SCN_REPLY_ID:any,Mode:any){ 
    
    localStorage.setItem('ENQUIRY_ID',ENQUIRY_ID);  
    localStorage.setItem('SCN_REPLY_ID',SCN_REPLY_ID);
 
    // localStorage.setItem('PROCEEDING_ID',PROCEEDING_ID);
    localStorage.setItem('mode',Mode);    
    //this.router.navigate(['/home/dept-enquiry/enquiry-proceeding/']);
    this.router.navigate(['/home/dept-enquiry/enquiry-proceeding-form']);
    
  }

  // gotoAdd1(ENQUIRY_ID){      
  //   localStorage.setItem('ENQUIRY_ID',ENQUIRY_ID);  
  //   this.router.navigate(['/home/dept-enquiry/enquiry-proceeding-form']);
  // }
}

