import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-not-alloted-refund',
  templateUrl: './not-alloted-refund.component.html',
  styleUrls: ['./not-alloted-refund.component.css']
})
export class NotAllotedRefundComponent implements OnInit {

  title = "Not Alloted Refund List";
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  refundlist;

  constructor(private userService: UserService, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllRefunds(this.itemsPerPage, 1);
  }

  pageChanged(pageNumber: number) {
      this.GetAllRefunds(this.itemsPerPage, pageNumber);
  }

  GetAllRefunds(itemsPerPage: number, pageNo: number) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllRefunds(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          // swal('Success!', 'Refund updated successfully.', 'success');
          this.refundlist = data.NotAllottedrefundListModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
}
