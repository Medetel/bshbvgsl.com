import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-dividend-form',
  templateUrl: './dividend-form.component.html',
  styleUrls: ['./dividend-form.component.css']
})
export class DividendFormComponent implements OnInit {

  title = "Employee Bank Details";


  constructor() { }

  ngOnInit() {




  }




}
