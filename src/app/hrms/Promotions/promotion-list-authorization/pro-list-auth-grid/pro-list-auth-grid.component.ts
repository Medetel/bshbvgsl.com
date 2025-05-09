import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-pro-list-auth-grid',
  templateUrl: './pro-list-auth-grid.component.html',
  styleUrls: ['./pro-list-auth-grid.component.css']
})
export class ProListAuthGridComponent implements OnInit {

  title="Promotion List Authorization";

  constructor() { }

  ngOnInit() {
  }

}
