import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-esi-grid',
  templateUrl: './esi-grid.component.html',
  styleUrls: ['./esi-grid.component.css']
})
export class EsiGridComponent implements OnInit {

  public show1:boolean = false; 

  constructor() { }
 
  ngOnInit() {   }
 
  toggle1() {
    this.show1 = !this.show1;     
  }

}
