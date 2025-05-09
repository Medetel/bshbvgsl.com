import { Component, ErrorHandler, OnInit } from '@angular/core';
// import { Search } from '../../../../shared/user.model';
// import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../../../shared/user.service';
// import { ErrorHandler } from '../../../../shared/ErrorHandler';

@Component({
  selector: 'app-arrear-approval-grid',
  templateUrl: './arrear-approval-grid.component.html',
  styleUrls: ['./arrear-approval-grid.component.css']
})
export class ArrearApprovalGridComponent implements OnInit {
  a: any =[];
  data: any =[];
  arrearApprovalList : any =[];
  ItemsPerPage: number = 5;
  currentPage: number = 1;
  pageNo: number = 1;
  totalItems : number;
  arr_id: any;
  state: number;
  saveDisable : boolean = false;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
   
   }

  ngOnInit() {
   this.GetArrearApprovalDetails();
  }

  // itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
  //   this.GetArrearDetails(itemsPerPage, pageNo);
  // }
  // pageChanged(pageNumber: number) {
  //   this.GetArrearDetails(this.ItemsPerPage, pageNumber);
  // }
  GetArrearApprovalDetails(){
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetArrearApprovalDetails();
    this.data.subscribe(
      (response: any) => {
        this.arrearApprovalList = response;          
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
  // GetArrearDetails(itemsPerPage: number, pageNo: number){
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetArrearApprovalDetails(itemsPerPage,pageNo);
  //   this.data.subscribe(
  //        (response: any) => {          
  //         this.arrearList= response.arreardetail;    
  //         // this.totalItems= response.TotalItemsCount;
  //         this.ItemsPerPage = itemsPerPage;
  //         this.currentPage = pageNo;       
                  
  //         document.getElementById('loader-spinner').style.display = "none";
  //        },    
  //         (error) => {
  //           document.getElementById('loader-spinner').style.display = "none";
  //         }
  //     );    
  // }
  handleChange1(arr_id) {
   
   
    this.arr_id = arr_id;
    this.saveDisable = false;    
    this.state = 1;
   
  }

  handleChange2(arr_id) {
  
    this.arr_id = arr_id;
    this.saveDisable = false;    
    this.state = 2;
    // this.save(null)   
  }


  save(remarks){    
    this.data = this.userService.Arrearapproval(this.state,remarks,this.arr_id);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Autherization is done', 'success');
        this.GetArrearApprovalDetails();
        this.saveDisable = true;  
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
}
