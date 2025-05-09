import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-vacant-commercial-property',
  templateUrl: './vacant-commercial-property.component.html',
  styleUrls: ['./vacant-commercial-property.component.css']
})
export class VacantCommercialPropertyComponent implements OnInit {
  datalist: any;
  data: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getVacantCommProperty();
  }

  getVacantCommProperty() {
    this.data = this.userService.getVacantCommProperty();
    this.data.subscribe((response: any) => {     
      this.datalist = response;
    }, (error: any) => {
      
    });
  }

}
