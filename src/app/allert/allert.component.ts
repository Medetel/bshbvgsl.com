import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../shared/ErrorHandler';

@Component({
  selector: 'app-allert',
  templateUrl: './allert.component.html',
  styleUrls: ['./allert.component.css']
})
export class AllertComponent implements OnInit {
  title="Alerts";
  Alert:any=[];
  data: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAlert()
  }
  GetAlert(){
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAlert();
      this.data.subscribe(
        (response: any) => {
          this.Alert = response;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
    
  }
}
