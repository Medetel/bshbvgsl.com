import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-websitenews-form',
  templateUrl: './websitenews-form.component.html',
  styleUrls: ['./websitenews-form.component.css']
})
export class WebsitenewsFormComponent implements OnInit {
  title="News on Website";
  constructor() { }

  ngOnInit() {
  }

}
