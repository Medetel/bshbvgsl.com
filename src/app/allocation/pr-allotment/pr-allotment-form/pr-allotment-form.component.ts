import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pr-allotment-form',
  templateUrl: './pr-allotment-form.component.html',
  styleUrls: ['./pr-allotment-form.component.css']
})
export class PrAllotmentFormComponent implements OnInit {

  
  title="Property Register Allotment - Available";
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
      this.GetAvailablePropertylistForTheId(this.PD_Id);
  }

  GetAvailablePropertylistForTheId(PD_ID){
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAvailablePropertylistForTheIdCheck(PD_ID,'A');
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

