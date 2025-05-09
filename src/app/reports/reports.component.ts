import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
URL:any="http://216.48.183.81";
  constructor() { }

  ngOnInit() {
  }

  Report(Id:any)
  {
    
    window.open(this.URL+"?id=" + Id, "_blank")
  }
}
