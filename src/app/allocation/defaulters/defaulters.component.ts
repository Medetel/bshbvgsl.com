import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-defaulters',
  templateUrl: './defaulters.component.html',
  styleUrls: ['./defaulters.component.css']
})
export class DefaultersComponent implements OnInit {
title="Generate Installment due list";
defaultphase: any = [];
defaultprojectcode: any = [];
data: any;
i : any = {};
defaulter : any ={};
c : any = {};
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllDefaultProject();
    this.GetAllDefaultPhase();
  }
  GetAllDefaultProject() {
    this.data = this.userService.GetAllProjectdefaulter();
    this.data.subscribe(
      (response: any) => {
        this.defaultprojectcode = response;
        console.log("projectcode :" +JSON.stringify(this.defaultprojectcode))
      }, (error) => {

      });
  }  
  
  GetAllDefaultPhase() {
    this.data = this.userService.GetAllPhasedefaulter();
    this.data.subscribe(
      (response: any) => {
        this.defaultphase = response;
        console.log("phasecode :" +JSON.stringify(this.defaultphase))
      }, (error) => {

      });
  }  

  GETAllDefaultersList(PD_Id, Phase_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GETDefaultersList(PD_Id, Phase_Id);
    this.data.subscribe(
      (response: any) => {
        this.defaulter = response;
        console.log('response defaulter:'+ JSON.stringify(response));
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
}
