import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculation-revenue',
  templateUrl: './calculation-revenue.component.html',
  styleUrls: ['./calculation-revenue.component.css']
})
export class CalculationRevenueComponent implements OnInit {
  menusList: any;
  pagesList: any;
  subpageslist: any;
  localurl : any;

  constructor() { }

  ngOnInit() {
    debugger;
    this.localurl = '/home/calculation-revenue'


    this.menusList = localStorage.getItem('menuList');
    this.menusList = JSON.parse(this.menusList);
    for (let i = 0; i < this.menusList.length; i++) {
      if (this.menusList[i].KHB_MenuName == 'Administration')
        this.pagesList = this.menusList[i].BSHB_PagesList;
    }

    for (let j = 0; j < this.pagesList.length; j++) {
      if (this.pagesList[j].KHB_Page == 'Service Register')
        this.subpageslist = this.pagesList[j].KHB_SubPagesModels;
    }

    console.log('subpagesList');
    console.log(this.subpageslist);
    //Service Register


  }

  geturl(url){      
    localStorage.setItem('url',url)    
    this.localurl= localStorage.getItem('url')
    
  }

}
