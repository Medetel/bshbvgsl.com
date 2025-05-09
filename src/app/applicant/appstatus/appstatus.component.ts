import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appstatus',
  templateUrl: './appstatus.component.html',
  styleUrls: ['./appstatus.component.css']
})
export class AppstatusComponent implements OnInit {
  AFD:any={}
  PD:any={}
  title = "Application - Status";
  constructor() { }

  ngOnInit() { 
    // localStorage.setItem('userRole', data.userRole);
  }

}
