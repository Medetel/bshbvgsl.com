import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-jobgroup-form',
  templateUrl: './jobgroup-form.component.html',
  styleUrls: ['./jobgroup-form.component.css']
})
export class JobgroupFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  jobgroup_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  title = "Add Jobgroup";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {   
        
      this.jobgroup_id = params['jobgroup_id'];
      this.mode = params['mode'];  
    
      if(this.jobgroup_id > 0){
        this.GetByIdJobgroup(this.jobgroup_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Jobgroup";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Jobgroup";
      }
    });

    
    if(this.jobgroup_id > 0){
      this.GetByIdJobgroup(this.jobgroup_id);
     }
  }
  SaveJobgroup(JobgroupForm : NgForm){   
    if(JobgroupForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     }   
 
   
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostJobgroup(JobgroupForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         JobgroupForm.reset();
         JobgroupForm.resetForm();
         JobgroupForm.form.markAsPristine();
         JobgroupForm.form.markAsUntouched();        
         swal('Success!', 'Job Group Added Successfully .', 'success');
         this.router.navigate(['/home/jobgroup']) ;   
                    
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
   GetByIdJobgroup(jobgroup_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdJobgroup(jobgroup_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;    
        
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    UpdateProjectActivity(JobgroupForm : NgForm){     
      if(JobgroupForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (JobgroupForm.value.Staff_Name != null && !JobgroupForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateJobgroup(this.jobgroup_id,JobgroupForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          JobgroupForm.reset();
          JobgroupForm.resetForm();
          JobgroupForm.form.markAsPristine();
          JobgroupForm.form.markAsUntouched();        
          swal('Success!', 'Job Group Updated Successfully .', 'success');
          this.router.navigate(['/home/jobgroup']) ;   
                   
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
