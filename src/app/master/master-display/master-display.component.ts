import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-master-display',
  templateUrl: './master-display.component.html',
  styleUrls: ['./master-display.component.css']
})
export class MasterDisplayComponent implements OnInit {
  menusList: any;
  pagesList: any;
  subpageslist: any;
  localurl : any;
 

  constructor(private router: Router, private route: ActivatedRoute) {
   
   }

  ngOnInit() {
    
      //initially
      this.localurl = '/home/masters'

    this.menusList = localStorage.getItem('menuList');
    this.menusList = JSON.parse(this.menusList);
    for (let i = 0; i < this.menusList.length; i++) {
      if (this.menusList[i].KHB_MenuName == 'Administration')
        this.pagesList = this.menusList[i].BSHB_PagesList;
    }

    for (let j = 0; j < this.pagesList.length; j++) {
      if (this.pagesList[j].KHB_Page == 'Masters')
        this.subpageslist = this.pagesList[j].KHB_SubPagesModels;
    }


  }

  geturl(url){    
    localStorage.setItem('url',url)    
    this.localurl= localStorage.getItem('url')
    
  }

}
