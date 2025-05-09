import { Component, OnInit } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../../shared/ErrorHandler';

@Component({
  selector: 'app-installment-details',
  templateUrl: './installment-details.component.html',
  styleUrls: ['./installment-details.component.css']
})
export class InstallmentDetailsComponent implements OnInit {

  title="Update Address Details";
  

 
  
  constructor() {
   }

  ngOnInit() {
   
  }

  

}
