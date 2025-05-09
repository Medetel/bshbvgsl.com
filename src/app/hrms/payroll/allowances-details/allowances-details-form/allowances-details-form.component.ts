import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-allowances-details-form',
  templateUrl: './allowances-details-form.component.html',
  styleUrls: ['./allowances-details-form.component.css']
})
export class AllowancesDetailsFormComponent implements OnInit {

  title="Adds Allowance details";
  a: any ={};
mode:any;
formInvalid:boolean;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe:TitleCasePipe) { }

  ngOnInit() {
    alert('save');
  }

  SaveAllowanceDedu(details:NgForm){
    alert('save');
  }
  UpdateAllowanceDedu(details){

  }
}
