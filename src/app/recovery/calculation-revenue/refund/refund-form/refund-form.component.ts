import { Component, OnInit, ErrorHandler } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-refund-form',
  templateUrl: './refund-form.component.html',
  styleUrls: ['./refund-form.component.css']
})
export class RefundFormComponent implements OnInit {

  title = "Refund Calculation";
  data: any = {};
  RefundList: any = [];
  searchText: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,) { }

  ngOnInit() {
  }


  GetAllRefunddetailsBySearch(searchText) {
    debugger;
    console.log(searchText)
    if (searchText == "" || searchText == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllRefunddetailsBySearch(searchText);
      this.data.subscribe(
        (response: any) => {
          this.RefundList = response;
          console.log("applicant:", response);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
    }
  }
}


