import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depart-enquiry-menu',
  templateUrl: './depart-enquiry-menu.component.html',
  styleUrls: ['./depart-enquiry-menu.component.css']
})
export class DepartEnquiryMenuComponent implements OnInit {
  menusList: any;
  pagesList: any;
  subpageslist: any;
  localurl : any;

  constructor() { }

  ngOnInit(){

    this.localurl = '/home/dept-enquiry'
    this.menusList = localStorage.getItem('menuList');
    this.menusList = JSON.parse(this.menusList);
    for (let i = 0; i < this.menusList.length; i++) {
      if (this.menusList[i].KHB_MenuName == 'Administration')
        this.pagesList = this.menusList[i].BSHB_PagesList;
    }

    for (let j = 0; j < this.pagesList.length; j++) {
      if (this.pagesList[j].KHB_Page == 'Departmental Enquiry')
        this.subpageslist = this.pagesList[j].KHB_SubPagesModels;
    }

   
  }

  geturl(url){    
    localStorage.setItem('url',url)    
    this.localurl= localStorage.getItem('url')
    
  }
  }