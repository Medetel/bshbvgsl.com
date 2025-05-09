import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qc-form',
  templateUrl: './qc-form.component.html',
  styleUrls: ['./qc-form.component.css']
})
export class QcFormComponent implements OnInit {

  title = "Add Quality Control Test";
  constructor() { }

  ngOnInit() {
  }

}
