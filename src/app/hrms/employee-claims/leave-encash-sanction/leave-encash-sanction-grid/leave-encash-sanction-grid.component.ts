import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-leave-encash-sanction-grid',
  templateUrl: './leave-encash-sanction-grid.component.html',
  styleUrls: ['./leave-encash-sanction-grid.component.css']
})
export class LeaveEncashSanctionGridComponent implements OnInit {
  title="Leave Encashment Sanction";
 
 
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata:any;
  Districtlist:any={};
  DI_Id:any={};
d: any={};
Remarks: any={};
LVENCASH_ID: any={};
Medicallist:any=[];
m:any={};
MEDI_CLAIM_ID1:number;
  data: any;
  state: number;
  mode: any;
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetallData();
    this.m.DivisionId = +localStorage.getItem('divisonId');
    this.GetAllMedicalDetialsSanc(this.itemsPerPage,1,this.m.DivisionId);
  }
  GetallData(){
    
   this.data = this.userService.GetAllDistrictLeavsan();
   this.data.subscribe(
     (response: any) => {
       this.Districtlist = response.Result;
     })  
  }
  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllMedicalDetialsSanc(this.itemsPerPage,1,this.m.DivisionId);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNo); 
    else
      this.GetAllMedicalDetialsSanc(this.itemsPerPage,1,this.m.DivisionId);
  }
  //get for approval 
  GetAllMedicalDetialsSanc(itemsPerPage: number, pageNo: number,DI_Id) {
   
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllLeaveDetialsSanc(itemsPerPage,pageNo,DI_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.Medicallist = data.LeaveEModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo; 
          console.log("result");
          console.log( this.data); 
          console.log(data.ComplaintRegisterAuthModel) ;      
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
 
  GotoView(LVENCASH_ID){
   
    localStorage.removeItem('gotoAuth')
    localStorage.setItem('gotoAuth','1')
    this.router.navigate(['/home/emp-claims/leave-encashment/leave-encashment-form',LVENCASH_ID,'view']);
  }


  handleChange1(LVENCASH_ID) {
 
    this.state = 21;
    this.LVENCASH_ID = LVENCASH_ID;
    this.data = this.userService.UpdateleaveSanction(this.LVENCASH_ID);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'sanction is done', 'success');
        this.router.navigate(['/home/emp-claims/medical-reim-sanction']);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );

  }
 
save(Remarks,LVENCASH_ID)
{
 
  this.Remarks=this.Remarks
  this.data = this.userService.UpdateLeaveSanction2(Remarks,LVENCASH_ID);
  this.data.subscribe(
    (response: any) => {
      swal('Success!', 'Rejected', 'success');
      this.router.navigate(['/home/emp-claims/medical-reim-sanction']);
      document.getElementById('loader-spinner').style.display = "none";
    },
    (error) => {
      document.getElementById('loader-spinner').style.display = "none";
    }
  ); 
}


handleChange2(Remarks,LVENCASH_ID) {
  
  
    this.Remarks=Remarks
    this.m.LVENCASH_ID= LVENCASH_ID;
    this.state = 2;
   
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
        this.userService.SearchLeaves(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.Medicallist = data.LeaveEModel;
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
