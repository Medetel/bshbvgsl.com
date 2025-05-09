import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-credit',
  templateUrl: './leave-credit.component.html',
  styleUrls: ['./leave-credit.component.css']
})
export class LeaveCreditComponent implements OnInit {

  menusList: any;
  pagesList: any;
  subpageslist: any;
  localurl : any;

  constructor() { }

  ngOnInit() {

    this.localurl = '/home/leavecredit'

    this.menusList = localStorage.getItem('menuList');
    this.menusList = JSON.parse(this.menusList);
    for (let i = 0; i < this.menusList.length; i++) {
      if (this.menusList[i].KHB_MenuName == 'Administration')
        this.pagesList = this.menusList[i].BSHB_PagesList;
    }

    for (let j = 0; j < this.pagesList.length; j++) {
      if (this.pagesList[j].KHB_Page == 'Leave Credit')
        this.subpageslist = this.pagesList[j].KHB_SubPagesModels;
    }

   
  }

  geturl(url){    
    localStorage.setItem('url',url)    
    this.localurl= localStorage.getItem('url')
    
  }
  }

  

