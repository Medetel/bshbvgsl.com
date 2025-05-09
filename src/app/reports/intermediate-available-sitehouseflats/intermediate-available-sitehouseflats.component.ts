import { UserService } from '../../shared/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intermediate-available-sitehouseflats',
  templateUrl: './intermediate-available-sitehouseflats.component.html',
  styleUrls: ['./intermediate-available-sitehouseflats.component.css']
})
export class IntermediateAvailableSitehouseflatsComponent implements OnInit {
  data: any;
  datalist: any;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.getAvailInterSiteHouseFlats();
  }
  getAvailInterSiteHouseFlats(){
    this.data = this.userService.getAvailInterSiteHouseFlats();
    this.data.subscribe((response:any) => {       
        this.datalist = response;
    },(error:any) => {
        
    });
  }

}
