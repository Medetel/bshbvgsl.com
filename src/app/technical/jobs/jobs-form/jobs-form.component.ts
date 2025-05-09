import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-jobs-form',
  templateUrl: './jobs-form.component.html',
  styleUrls: ['./jobs-form.component.css']
})
export class JobsFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  Groupcode: any = [];
  // Areacode: any=[];
  Job_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  title = "Add Job";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllGroupcode();

    this.route.params.subscribe(params => {   
        
      this.Job_id = params['Job_id'];
      this.mode = params['mode'];  
    
      if(this.Job_id > 0){
        this.GetByIdJob(this.Job_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Job";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Job";
      }
    });

    
    if(this.Job_id > 0){
      this.GetByIdJob(this.Job_id);
     }
  }
  SaveJob(JobForm : NgForm){   
   
     if(JobForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     }   
 
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostJob(JobForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         JobForm.reset();
         JobForm.resetForm();
         JobForm.form.markAsPristine();
         JobForm.form.markAsUntouched();        
         swal('Success!', 'Jobs Added Successfully .', 'success');
         this.router.navigate(['/home/Jobs']) ;   
                    
       },
       (error) => {
         document.getElementById('loader-spinner').style.display = "none";
         if (error.status == 401) {
           this.errorHandler.handleError(error);
         }
         else if (error.status == 400) {
           swal('Warning!', error.error.Message, 'warning');
         }
       }
       );
     }
   }
   GetAllGroupcode() {
    this.data = this.userService.GetAllGroupcode();
    this.data.subscribe(
      (response: any) => {
        this.Groupcode = response;        
      }, (error) => {

      });
  } 
  GetByIdJob(Job_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdJob(Job_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;   
      
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    UpdateJob(JobForm : NgForm){     
      if(JobForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (JobForm.value.Staff_Name != null && !JobForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateJob(this.Job_id,JobForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          JobForm.reset();
          JobForm.resetForm();
          JobForm.form.markAsPristine();
          JobForm.form.markAsUntouched();        
          swal('Success!', 'Jobs Updated Successfully .', 'success');
          this.router.navigate(['/home/Jobs']) ;   
                   
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
