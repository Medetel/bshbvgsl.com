import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nomination-san-form',
  templateUrl: './nomination-san-form.component.html',
  styleUrls: ['./nomination-san-form.component.css']
})
export class NominationSanFormComponent implements OnInit {
  totalItems:any;
  mode:any;
  a:any;
  pageChanged:any;
  currentPage:any;
  itemsPerPage:any;
  TanferDeatils:any;
  title=""
  constructor() { }

  ngOnInit() {
  }
  save(remarks){

  }
}
