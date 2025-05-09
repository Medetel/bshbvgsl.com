import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant-menu',
  templateUrl: './applicant-menu.component.html',
  styleUrls: ['./applicant-menu.component.css']
})
export class ApplicantMenuComponent implements OnInit {
  menuList:any;
  pageList:any;
  @ViewChild('panel', { read: ElementRef }) public panel;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menuList=localStorage.getItem('menuList');
    this.menuList=JSON.parse(this.menuList);
    for(let i=0; i<this.menuList.length; i++){
      if(this.menuList[i].KHB_MenuName=='Applicant')
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
