import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-avail-blocked-inter-dq-corner',
  templateUrl: './avail-blocked-inter-dq-corner.component.html',
  styleUrls: ['./avail-blocked-inter-dq-corner.component.css']
})
export class AvailBlockedInterDqCornerComponent implements OnInit {
  data: any;
  datalist: any;

  constructor(private userService: UserService) { }

  ngOnInit() {  
    this.getAvailBlockedInterDQCornerSites();
  }
  getAvailBlockedInterDQCornerSites(){   
    this.data = this.userService.getAvailBlockedInterDQCornerSites();
    this.data.subscribe((response:any) => {        
        this.datalist = response;
    },(error:any) => {
        
    });
  }

}