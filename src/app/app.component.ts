import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent implements OnInit {
  title = 'app';
  logidin = true;
  showLoader: boolean;

  constructor(private router: Router) { }

  loginChange(data) {
   
    if (!data)
      this.logidin = false;
    else
      this.logidin = true;
  }

  ngOnInit() {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken != null && accessToken != "" && typeof accessToken != 'undefined'){
      this.logidin = false;
    }
    else{
      this.router.navigate(['/auth']);
    }
  }
}
