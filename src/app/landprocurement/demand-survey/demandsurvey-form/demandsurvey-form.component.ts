import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demandsurvey-form',
  templateUrl: './demandsurvey-form.component.html',
  styleUrls: ['./demandsurvey-form.component.css']
})
export class DemandsurveyFormComponent implements OnInit {
  Categories:any=[]
  title="Demand Survey";
  constructor() { }

  ngOnInit() {
  }

}
