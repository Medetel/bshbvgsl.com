import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pr-allotment-notsent',
  templateUrl: './pr-allotment-notsent.component.html',
  styleUrls: ['./pr-allotment-notsent.component.css']
})
export class PrAllotmentNotsentComponent implements OnInit {
  title="Property Register Allotment - Not Available(Blocked)";
  PD_Id: any;
  data: any;
  propertyall;
  projectdetails:any={};
  mode:any;
  constructor(private userService: UserService,private router :Router,private route:ActivatedRoute) {
     }
 

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.PD_Id = params['PD_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if (this.PD_Id != null) 
      this.GetBlockedPropertylistForTheId(this.PD_Id);
  }


  GetBlockedPropertylistForTheId(PD_ID){
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetBlockedPropertylistForTheId(PD_ID);
    this.data.subscribe(
      (response:any) => {
        this.projectdetails= response;
        this.propertyall= response.PropertyRegister;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

}

