import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lwf-grid',
  templateUrl: './lwf-grid.component.html',
  styleUrls: ['./lwf-grid.component.css']
})
export class LwfGridComponent implements OnInit {

  public show1:boolean = false; 

  constructor() { }
 
  ngOnInit() {   }
 
  toggle1() {
    this.show1 = !this.show1;     
  }

}
