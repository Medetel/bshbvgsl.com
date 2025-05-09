import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-saledeed',
  templateUrl: './saledeed.component.html',
  styleUrls: ['./saledeed.component.css']
})
export class SaledeedComponent implements OnInit {
  title="Lease Deed"
  title1="Installment"
  title2="Schedule of Property";
  data:any;
applicantlease:any={};
APP_Id: any;
l:any={};
d:any={};
propertylease:any={};
q:any={};
m:any={};
Installment:any={};
SOPLeaseDeed:any={};
s:any={};

  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllApplicationlease();
  }
  GetAllApplicationlease() {
    this.data = this.userService.GetAllApplicationlease();
    this.data.subscribe(
      (response: any) => {
        this.applicantlease = response;
        // this.GetAllPropertylease(this.APP_No);
        console.log("Appcode :" +JSON.stringify(this.applicantlease))
      }, (error) => {

      });
  }  
  GetAllPropertylease(APP_Id) {
    debugger
    this.data = this.userService.GetAllPropertylease(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.propertylease = response;
        console.log("Propcode :" +JSON.stringify(this.propertylease))
      }, (error) => {

      });
  } 
  GeteaedeedLists(APP_No,PR_Property_No) {   
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GeteaedeedLists(APP_No,PR_Property_No);
    this.data.subscribe(
      (response: any) => {
        this.data= response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
}
