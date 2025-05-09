import { Component, OnInit } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
declare var $: any; // Declare jQuery globally
@Component({
  selector: 'app-arrear-grid',
  templateUrl: './arrear-grid.component.html',
  styleUrls: ['./arrear-grid.component.css']
})
export class ArrearGridComponent implements OnInit {
  a: any =[];
  data: any =[];
  arrearList : any =[];
  ItemsPerPage: number = 5;
  currentPage: number = 1;
  pageNo: number = 1;
  totalItems : number;
  arr_id: any;
  state: number;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
   
   }

  ngOnInit() {
   this.GetArrearDetails(this.ItemsPerPage,this.pageNo);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetArrearDetails(itemsPerPage, pageNo);
  }
  pageChanged(pageNumber: number) {
    this.GetArrearDetails(this.ItemsPerPage, pageNumber);
  }
 
  GetArrearDetails(itemsPerPage: number, pageNo: number){
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetArrearDetails(itemsPerPage,pageNo);
    this.data.subscribe(
         (response: any) => {          
          this.arrearList= response.arreardetail;    
          // this.totalItems= response.TotalItemsCount;
          this.ItemsPerPage = itemsPerPage;
          this.currentPage = pageNo;       
                  
          document.getElementById('loader-spinner').style.display = "none";
         },    
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          }
      );    
  }
  handleChange1(arr_id) {
   
   
    this.arr_id = arr_id;
    this.state = 2;
   
  }

  handleChange2(arr_id) {
  
    this.arr_id = arr_id;
    this.state = 1;
    // this.save(null)   
  }


  save(remarks){    
    this.data = this.userService.Arrearapproval(this.state,remarks,this.arr_id);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Autherization is done', 'success');
        $('#myModal').modal('hide');
        this.GetArrearDetails(this.ItemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

 
  view(arr_id){
    debugger
    //alert(TIMEROLL_ID)
    this.router.navigate(['/home/leaveapp/arrear-form',arr_id,'view']);
  }
}
