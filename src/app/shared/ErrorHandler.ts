import { Output, EventEmitter, Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

/*
@Injectable()
export class ErrorHandler {
  constructor(private router: Router) { }

  handleError(error: any) {
    if (error.status == 401) {
      localStorage.clear();
      this.router.navigate(['auth/login']);
      swal({ title: 'Sorry', text: 'Your current session has expired! Please login again.', type: 'info' });
    } else {
      swal({ title: 'Error', text: 'An error has occurred, please try again later.', type: 'error' });
    }
  }
}
*/


@Injectable()
export class ErrorHandler{
      @Output() change = new EventEmitter();
    constructor(private router: Router) { }

    handleError(error:any){
        if (error.status == 401) {
            localStorage.clear();
            this.change.emit(true);
            this.router.navigate(['auth/login']);
            swal({ title: 'Sorry', text: 'Your current session got expired! Please login again.', type: 'info'});
          }
          else
          swal({ title: 'Error', text: 'An error has occurred, please try later.', type: 'error'});
    }

}
