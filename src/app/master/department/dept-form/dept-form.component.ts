import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dept-form',
  templateUrl: './dept-form.component.html',
  styleUrls: ['./dept-form.component.css']
})
export class DeptFormComponent implements OnInit {

  title = "Add Department";
  data : any = {};
  formInvalid : boolean = false;
  d : any = {};
  Department_Id : number;
  mode : string;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datePipe:DatePipe) 
  { }

  ngOnInit() {
    this.route.params.subscribe(params => {      
      this.Department_Id = params['Department_Id'];  
      this.mode  =   params['mode'];
      
      if(this.Department_Id > 0){
        this.GetDepartmentById(this.Department_Id)
      }    
  });
  
  if(this.mode=='view'){
    this.title = "View Department";
  }
  else if(this.mode=='edit'){
    this.title = "Edit Department";
  }  
  }
  

  SaveDepartment(Department: NgForm){    
   
    if(Department.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }  
   

    else{   
                        
            this.data = this.userService.PostDepartment(Department.value);    
            this.data.subscribe(
            (response) => {
              Department.reset();
              Department.resetForm();
              Department.form.markAsPristine();
              Department.form.markAsUntouched();    
              if (response.Result === "Department with similar Department code or Department name already exists")
                {
                swal('Warning!', response.Result, 'warning')
                } 
                else {
                swal('Success!',  response.Result , 'success');
                this.router.navigate(['/home/dept']);
                }    
              // swal('Success!', 'Department Added Successfully .', 'success');
              // this.router.navigate(['/home/dept']) ;   
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
  GetDepartmentById(Department_Id){
    document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.GetByIdDepartment(Department_Id);
        this.data.subscribe(
          (response: any) => {
            this.d = response;        
            
            // if (this.ap.AP_Date != null)
            //   this.ap.AP_Date = ((this.ap.AP_Date).split('T'))[0];
            // if (this.ap.AP_Date != null)
            //  this.ap.AP_Date = ((this.ap.AP_Date).split('T'))[0];    
                    
    
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          });
  }
  UpdateDepartment(Department: NgForm){    
    if(Department.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }  
    else{       
            this.data = this.userService.UpdateDepartment(Department.value,this.Department_Id);    
            this.data.subscribe(
            (response) => {
              Department.reset();
              Department.resetForm();
              Department.form.markAsPristine();
              Department.form.markAsUntouched();  
              if (response.Result === "Department with similar Department code or Department name already exists")
                {
                swal('Warning!', response.Result, 'warning')
                } 
                else {
                swal('Success!',  response.Result , 'success');
                this.router.navigate(['/home/dept']);
                }          
              // swal('Success!', 'Department updated Successfully .', 'success');
              // this.router.navigate(['/home/dept']) ;   
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

Cancel(){
  //this.router.navigate(['/home/district']) ; 
  this.d.Department_Name='';
  this.d.Department_Code='';
}



  

}


