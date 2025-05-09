import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-level1menu',
  templateUrl: './level1menu.component.html',
  styleUrls: ['./level1menu.component.css']
})
export class Level1menuComponent implements OnInit {

  @Output() change = new EventEmitter();
  menuList: any;
  selectedItem: any;
  userRole: any;
  UserName: any;
  data: any;

  SessionId: any;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    this.UserName = localStorage.getItem('userName');
    this.SessionId = localStorage.getItem('sessionId');
    this.menuList = localStorage.getItem('menuList');
    this.menuList = JSON.parse(this.menuList);
    let selectedMenuId = localStorage.getItem('selectedMenu');
    if (selectedMenuId != null && selectedMenuId != '' && typeof (selectedMenuId) != undefined)
      this.selectedItem = selectedMenuId;
    else {
      if (this.menuList.length != 0)
        this.selectedItem = this.menuList[0].KM_MenuId;
    }
  }

  listClick(event, newValue, KM_Id) {
    localStorage.setItem('selectedMenu', newValue);
    this.selectedItem = newValue;
  }
  Logout() {
    this.LogoutDetails()
    localStorage.clear();
    this.change.emit(true);
    this.router.navigate(['auth/login']);
  }

  LogoutDetails() {
    //saheb
    var reqData = {
      UserName: this.UserName,
      SessionId: this.SessionId

    }
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.LogoutUserDetails_New(reqData);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


}