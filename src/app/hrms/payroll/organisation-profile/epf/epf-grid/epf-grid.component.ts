import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-epf-grid',
  templateUrl: './epf-grid.component.html',
  styleUrls: ['./epf-grid.component.css']
})
export class EpfGridComponent implements OnInit { 

  public show1:boolean = false; 

  constructor() { }
 
  ngOnInit() {   }
 
  toggle1() {
    this.show1 = !this.show1;     
  }

}
