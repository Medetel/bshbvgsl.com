import { Component, ErrorHandler, OnInit } from '@angular/core';
// import { Search } from '../../../../shared/user.model';
// import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../../../shared/user.service';
// import { ErrorHandler } from '../../../../shared/ErrorHandler';
declare var $: any; // Declare jQuery globally
@Component({
  selector: 'app-arrear-sanction-grid',
  templateUrl: './arrear-sanction-grid.component.html',
  styleUrls: ['./arrear-sanction-grid.component.css']
})
export class ArrearSanctionGridComponent implements OnInit {
  a: any =[];
  data: any =[];
  arrearsanctionList : any =[];
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
   this.GetArrearSanctionDetails();
  }

  // itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
  //   this.GetArrearSanctionDetails(itemsPerPage, pageNo);
  // }
  // pageChanged(pageNumber: number) {
  //   this.GetArrearSanctionDetails(this.ItemsPerPage, pageNumber);
  // }
 
  GetArrearSanctionDetails(){
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetArrearSanctionDetails();
    this.data.subscribe(
      (response: any) => {
        this.arrearsanctionList = response;          
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }



  handleChange1(arr_id) {
   
   
    this.arr_id = arr_id;
    this.saveDisable = false;   
    this.state = 1;
   
  }

  handleChange2(arr_id) {
  debugger
    this.arr_id = arr_id;
    this.saveDisable = false;   
    this.state = 3;
    // this.save(null)   
  }


  save(remarks){    
    this.data = this.userService.Arrearapproval(this.state,remarks,this.arr_id);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Autherization is done', 'success');
        $('#myModal').modal('hide');
        this.saveDisable = true;    
        this.GetArrearSanctionDetails();
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
}
