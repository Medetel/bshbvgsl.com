import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  menusList: any;
  pagesList: any;
  subpageslist: any;
  localurl : any;
  constructor() { }

  ngOnInit() {

    this.localurl = '/home/transfer'

    this.menusList = localStorage.getItem('menuList');
    this.menusList = JSON.parse(this.menusList);
    for (let i = 0; i < this.menusList.length; i++) {
      if (this.menusList[i].KHB_MenuName == 'Administration')
        this.pagesList = this.menusList[i].BSHB_PagesList;
    }

    for (let j = 0; j < this.pagesList.length; j++) {
      if (this.pagesList[j].KHB_Page == 'Transfer')
        this.subpageslist = this.pagesList[j].KHB_SubPagesModels;
    }

   
  }
  geturl(url){    
    localStorage.setItem('url',url)    
    this.localurl= localStorage.getItem('url')
    
  }
  }