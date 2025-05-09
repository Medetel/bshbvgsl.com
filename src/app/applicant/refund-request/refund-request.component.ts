import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-refund-request',
  templateUrl: './refund-request.component.html',
  styleUrls: ['./refund-request.component.css']
})
export class RefundRequestComponent implements OnInit {

  title = "Request Refund";
  constructor() { }

  ngOnInit() {
  }
  payment(){
    swal({
      //title: '<i>HTML</i> <u>example</u>',
      //type: 'info',
      html:
        '<label>Refund Request No:- 001</label>',
        // '<input placeholder="Bank Name" type="text" class="form-control" value="001"><br>' +
        
        // '<label>DD Copy</label><input style="width:70%;display:inline-block;margin-left:20px;"  type="file" class="form-control">' ,
        
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Confirm',    
      cancelButtonText:
      'Cancel',
    })
  }

  
}
