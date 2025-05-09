import { Component, OnInit } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../../shared/ErrorHandler';


@Component({
  selector: 'app-leavecredit-grid',
  templateUrl: './leavecredit-grid.component.html',
  styleUrls: ['./leavecredit-grid.component.css']
})
export class LeavecreditGridComponent implements OnInit {
  title ="View Leave Credit"
  itemsPerPage: number=5;
  currentPage: number=1;  
  data : any = [];
  totalItems : number;
  s: Search;
  isSearch:boolean;
  Leavecreditdetails : any = [];
  itemsPerPageChanged:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() {
    this.GetEmployeeBasicDetails()
  }

  GetEmployeeBasicDetails(){
    this.isSearch = false;   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllleavecreditsingleDetails();
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
onSearch(searchForm,itemsPerPage,id){

}
}
