import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../shared/user.service';
import { Office } from '../../../shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.css']
})
export class OfficeFormComponent implements OnInit {
  
  formInvalid : boolean = false;
  office:any ={};
  formSubmitted: boolean;
  OfficeId:string;
  mode:string;
  data:any;
  DistrictList;
officelevellist;
title="Add Office";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute,private errorHandler:ErrorHandler) {
    this.OfficeId=null;
    this.mode=null;
    this.office=new Office();
    this.formSubmitted = false;
   }

  ngOnInit() {
  this.GetAllDistrictNames();
  this.GetAllOfficelevels();
  
    this.route.params.subscribe(params =>
      this.OfficeId = params['OfficeId']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if (this.OfficeId != null && this.mode!=null) 
      this.GetOfficeForTheId(this.OfficeId);
      if(this.mode=='view'){
        this.title = "View Office";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Office";
      }  
  }


  GetAllDistrictNames() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllDistrictNames();
    this.data.subscribe(
      (response) => {
        this.DistrictList = response;
        document.getElementById('loader-spinner').style.display = "none";
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetAllOfficelevels() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllOfficelevels();
    this.data.subscribe(
      (response) => {
        this.officelevellist = response;
        document.getElementById('loader-spinner').style.display = "none";
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }


  GetOfficeForTheId(OfficeId) {
   
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.getOfficeForTheId(OfficeId)
      .subscribe(
        (data) => {
          this.office = data;
          //this.isUpdate=true;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  update(form: NgForm){    
    
    if(form.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }  
    else{                      
            this.data = this.userService.updateOffice(form.value,this.OfficeId);    
            this.data.subscribe(
            (response) => {
              form.reset();
              form.resetForm();
              form.form.markAsPristine();
              form.form.markAsUntouched();       
              if (response.Result === "Office with similar details already exists")
                {
                swal('Warning!', response.Result, 'warning')
                } 
                else {
                swal('Success!',  response.Result , 'success');
                this.router.navigate(['/home/office']);
                }       
         
              // swal('Success!', 'Office Updated Successfully .', 'success');
              // this.router.navigate(['/home/office']) ;   
              document.getElementById('loader-spinner').style.display = "none";           
            }, (error) => {
              document.getElementById('loader-spinner').style.display = "none";
              if (error.status == 401) {
                this.errorHandler.handleError(error);
              }
              else if (error.status == 400) {
                swal('Warning!', error.error.Message, 'warning');
              }
            });  
    } 
  }

  onSubmit(form: NgForm){    
    
    if(form.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }  
    else{                      
            this.data = this.userService.CreateOffice(form.value);    
            this.data.subscribe(
            (response) => {
              form.reset();
              form.resetForm();
              form.form.markAsPristine();
              form.form.markAsUntouched(); 
              if (response.Result === "Office with similar details already exists")
                {
                swal('Warning!', response.Result, 'warning')
                } 
                else {
                swal('Success!',  response.Result , 'success');
                this.router.navigate(['/home/office']);
                }       
        
              document.getElementById('loader-spinner').style.display = "none";           
            }, (error) => {
              document.getElementById('loader-spinner').style.display = "none";
              if (error.status == 401) {
                this.errorHandler.handleError(error);
              }
              else if (error.status == 400) {
                swal('Warning!', error.error.Message, 'warning');
              }
            });  
    } 
  }

    
}        
