import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-emp-leave-encashment-auth',
  templateUrl: './emp-leave-encashment.component.html',
  styleUrls: ['./emp-leave-encashment.component.css']
})
export class EmpLeaveEncashmentComponent implements OnInit {

  title="Leave Encashment Approval";
  data:any;
  isSearch: boolean;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  leaveencashmentofficerList:any={};
  pageNo: number =1;
  Remarks: any;
  state: number;
  LE_Id: any;
  a:any={};
  Comments: any;
  saveDisable : boolean = false;
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
  
  }

  ngOnInit() {
    this.GetAllLeaveEncashmentofficer(this.itemsPerPage,this.pageNo);
  }
  GetAllLeaveEncashmentofficer(itemsPerPage: number, pageNo: number) {
 debugger
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllLeaveEncashmentofficer(itemsPerPage,pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.leaveencashmentofficerList = data.Leaveencashmentmodel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo; 
               
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
  view(LE_Id){
    //alert(TIMEROLL_ID)
    this.router.navigate(['/home/leaveencashment/leave-encashment-form',LE_Id,'view']);
  }
handleChange1(LE_Id) {
    debugger;
    this.LE_Id = LE_Id;
      this.saveDisable = false;    
    this.state = 1;
    
  }

  handleChange2(LE_Id) {
    debugger;
    this.LE_Id = LE_Id;
      this.saveDisable = false;    
    this.state = 2;
    this.save(null)
  }

  save(Comments){
    this.data = this.userService.UpdateEncahmentApproval1(this.state,Comments,this.LE_Id);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'Leave Encashment status updated', 'success');
        this.router.navigate(['/home/leaveencashment']);
        //location.reload()
          this.saveDisable = true;    
        this.GetAllLeaveEncashmentofficer(this.itemsPerPage,this.pageNo);     
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
   
    
   
  // save(state,Comments,LE_Id)
  // {
  
  //   this.Comments=this.Comments
  //   this.data = this.userService.UpdateEncahmentApproval1(state,Comments,LE_Id);
  //   this.data.subscribe(
  //     (response: any) => {
  //       swal('Success!', 'Rejected', 'success');
  //       this.router.navigate(['/home/emp-claims/leave-encash-authorization']);
  //       document.getElementById('loader-spinner').style.display = "none";
  //     },
  //     (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }
  //   ); 
  // }
  
  
 
  
 }
