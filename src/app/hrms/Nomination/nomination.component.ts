import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationComponent implements OnInit {
  menusList: any;
  pagesList: any;
  subpageslist: any;
  localurl : any;

  constructor() { }

  ngOnInit() {
    this.localurl = '/home/nominationapp'

    this.menusList = localStorage.getItem('menuList');
    this.menusList = JSON.parse(this.menusList);
    for (let i = 0; i < this.menusList.length; i++) {
      if (this.menusList[i].KHB_MenuName == 'Administration')
        this.pagesList = this.menusList[i].BSHB_PagesList;
    }

    for (let j = 0; j < this.pagesList.length; j++) {
      if (this.pagesList[j].KHB_Page == 'NominationApplication')
        this.subpageslist = this.pagesList[j].KHB_SubPagesModels;
    }

   
  }

  geturl(url){    
    localStorage.setItem('url',url)    
    this.localurl= localStorage.getItem('url')
    
  }
  }