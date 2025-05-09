import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-intermediate-blocked-sitehouseflats',
  templateUrl: './intermediate-blocked-sitehouseflats.component.html',
  styleUrls: ['./intermediate-blocked-sitehouseflats.component.css']
})
export class IntermediateBlockedSitehouseflatsComponent implements OnInit {
  data: any;
  datalist: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getInterBlockedSitesHouseFlats();
  }


  getInterBlockedSitesHouseFlats(){   

    this.data = this.userService.getInterBlockedSitesHouseFlats();
    this.data.subscribe((response:any) => {        
        this.datalist = response;
        document.getElementById('loader').style.display = "none";
    },(error:any) => {       
        document.getElementById('loader').style.display = "none";
    });
  }

}
