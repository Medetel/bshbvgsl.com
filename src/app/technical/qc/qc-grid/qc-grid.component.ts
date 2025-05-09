import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qc-grid',
  templateUrl: './qc-grid.component.html',
  styleUrls: ['./qc-grid.component.css']
})
export class QcGridComponent implements OnInit {

  title = "Quality Control Tests"
  constructor() { }

  ngOnInit() {
  }

}
