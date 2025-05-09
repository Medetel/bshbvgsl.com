import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-websitenews-grid',
  templateUrl: './websitenews-grid.component.html',
  styleUrls: ['./websitenews-grid.component.css']
})
export class WebsitenewsGridComponent implements OnInit {
  title="News on Website";
  constructor() { }

  ngOnInit() {
  }

}
