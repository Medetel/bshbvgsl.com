import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-renewal-approval-grid',
  templateUrl: './renewal-approval-grid.component.html',
  styleUrls: ['./renewal-approval-grid.component.css']
})
export class RenewalApprovalGridComponent implements OnInit {
  totalItems:any;
  pageChanged:any;
  constructor() { }

  ngOnInit() {
  }

}
