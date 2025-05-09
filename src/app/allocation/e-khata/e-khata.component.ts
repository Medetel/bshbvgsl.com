import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-e-khata',
  templateUrl: './e-khata.component.html',
  styleUrls: ['./e-khata.component.css']
})
export class EKhataComponent implements OnInit {
title="E-Khata"
title1="Installment"
title2="Maintainance Fee";
k:any= {};
applicant:any={};
data:any;
c:any={};
property:any={};
APP_Id: any;
p:any={};
j:any={};
e:any={};
Installment:any={};
MaintenanceFee:any={};
f:any={};
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllApplication();
  }
  GetAllApplication() {
    this.data = this.userService.GetAllApplication();
    this.data.subscribe(
      (response: any) => {
        this.applicant = response;
        console.log("Appcode :" +JSON.stringify(this.applicant))
      }, (error) => {

      });
  }  

  GetAllPropertyekhata(APP_Id) {
    this.data = this.userService.GetAllPropertyekhata(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.property = response;
        console.log("Propcode :" +JSON.stringify(this.property))
      }, (error) => {

      });
  }  
  GetEkhataLists(APP_No: string, PR_Property_No: string) {
    // Show the loading spinner
    document.getElementById('loader-spinner').style.display = "block";
  
    // Fetch data from userService
    this.userService.getAllEkhataList(APP_No, PR_Property_No).subscribe(
      (response: any) => {
        // Assuming response contains Installment data
        this.data = response;
  
        // Map installment numbers (4 -> 1, 5 -> 2, 6 -> 3, 7 -> 4)
        this.data.Installment.forEach((e) => {
          if (e.Installments_No >= 4 && e.Installments_No <= 7) {
            e.Installments_No -= 3; // Convert 4,5,6,7 to 1,2,3,4
          }
        });
  
        // Hide the loading spinner
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        // Hide the loading spinner in case of error
        document.getElementById('loader-spinner').style.display = "none";
        console.error("Error fetching data", error);
      }
    );
  }

  
}
