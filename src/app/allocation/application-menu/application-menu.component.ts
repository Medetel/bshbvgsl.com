import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-application-menu',
  templateUrl: './application-menu.component.html',
  styleUrls: ['./application-menu.component.css']
})
export class ApplicationMenuComponent {

  menuList: any;
  pageList: any;
  KHbpageList:any;
  @ViewChild('panel', { read: ElementRef }) public panel;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.menuList = localStorage.getItem('menuList');
    this.menuList = JSON.parse(this.menuList);
    for (let i = 0; i < this.menuList.length; i++) {
      if (this.menuList[i].KHB_MenuName == 'Allotment')
        this.pageList = this.menuList[i].BSHB_PagesList;
    }
  }

  public scrollDivLeft(): void {
    this.panel.nativeElement.scrollLeft -= 100;
  }

  public scrollDivRight(): void {
    this.panel.nativeElement.scrollLeft += 100;
  }

  NavigateUrl(URL: any) {
  
    if (URL) {
      this.router.navigate([URL]);
    }
    // return false
  }
  // openNav() {
  //   this.sidenav.width = "250px";
  // }

  // closeNav() {
  //   this.sidenav.width = "0";
  // }

}
