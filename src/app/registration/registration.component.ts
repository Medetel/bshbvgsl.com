import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ErrorHandler } from '../shared/ErrorHandler';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  

  constructor() {
    
   }

  ngOnInit() {
  }

  

}
