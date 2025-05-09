import { Component, OnInit } from '@angular/core';
import { Search } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-bulk-leave-credit-sanction',
  templateUrl: './bulk-leave-credit-sanction.component.html',
  styleUrls: ['./bulk-leave-credit-sanction.component.css']
})
export class BulkLeaveCreditSanctionComponent implements OnInit {
  title=""
  itemsPerPage: number=5;
  currentPage: number=1;  
  data : any = [];
  totalItems : number;
  s: Search;
  isSearch:boolean;
  Leavecreditdetails : any = [];
  DistrictsList: any =[];
  c: any =[];
  LEAVE_CREDIT_ID: number;
  state: number;
  a : any =[]
  itemsPerPageChanged:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() {
    //this.GetEmployeeBasicDetails()
    this.getDefaultData()
  }

 getDefaultData(){
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })
  }

  onSearch(searchForm,itemsPerPage,id){

  }

  ChangeOfDivision(Id){
    this.isSearch = false;   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.uspGetLeavecreditBulkforApproveSanction(Id,'A');
    this.data.subscribe(
         (response: any) => {
          this.Leavecreditdetails= response;    
          // this.totalItems= response.TotalItemsCount;
          // this.itemsPerPage = itemsPerPage;
          // this.currentPage = pageNo;      
                   
          document.getElementById('loader-spinner').style.display = "none";
         },    
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          }
      );      
  }


  handleChange1(LEAVE_CREDIT_ID) {
    debugger;
    this.LEAVE_CREDIT_ID = LEAVE_CREDIT_ID;
    this.state = 1;
  }

  handleChange2(LEAVE_CREDIT_ID) {
    debugger;
    this.LEAVE_CREDIT_ID = LEAVE_CREDIT_ID;
    this.state = 3;
    //this.save(null)
  }


  save(Remarks){ 
    this.data = this.userService.UpdateLeaveCreditAutherization(this.LEAVE_CREDIT_ID,Remarks,this.state);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'Sanctined', 'success');
        //this.router.navigate(['/home/leaveapp/leave-authorization']);
        this.ChangeOfDivision(this.c.DIVISION_CODE);
        //window.location.reload();
        //this.router.navigate(['/home/leavecredit/leave-credit-auth',this.c.DIVISION_CODE])
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

}
