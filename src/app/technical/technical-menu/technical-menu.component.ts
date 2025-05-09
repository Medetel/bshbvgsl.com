import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-technical-menu',
  templateUrl: './technical-menu.component.html',
  styleUrls: ['./technical-menu.component.css']
})
export class TechnicalMenuComponent implements OnInit {

  menuList:any;
  pageList:any;
  @ViewChild('panel', { read: ElementRef }) public panel;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menuList=localStorage.getItem('menuList');
    this.menuList=JSON.parse(this.menuList);
    for(let i=0; i<this.menuList.length; i++){
      if(this.menuList[i].KHB_MenuName=='Technical')
        this.pageList=this.menuList[i].BSHB_PagesList;
    }
  }

  
public scrollDivLeft():void{    
  this.panel.nativeElement.scrollLeft -= 100;
}

public scrollDivRight():void {
  this.panel.nativeElement.scrollLeft += 100;
}
NavigateUrl(URL: any) {
  
  if (URL) {
    this.router.navigate([URL]);
  }
  // return false
}

}
