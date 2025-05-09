import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qc-type-form',
  templateUrl: './qc-type-form.component.html',
  styleUrls: ['./qc-type-form.component.css']
})
export class QcTypeFormComponent implements OnInit {

  title = "Add QC test type"
  constructor() { }

  ngOnInit() {
  }

}
