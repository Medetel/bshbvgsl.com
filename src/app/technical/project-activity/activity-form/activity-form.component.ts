import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  projectcode: any = [];
  Areacode: any=[];
  ProjectActivityJob_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  title = "Add Activity";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllDistrictActivity();
    this.GetAllProjectActivity();

    this.route.params.subscribe(params => {   
        
      this.ProjectActivityJob_id = params['ProjectActivityJob_id'];
      this.mode = params['mode'];  
    
      if(this.ProjectActivityJob_id > 0){
        this.GetByIdProjectActivity(this.ProjectActivityJob_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View ACtivity";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Activity";
      }
    });

    
    if(this.ProjectActivityJob_id > 0){
      this.GetByIdProjectActivity(this.ProjectActivityJob_id);
     }
  }
  SaveActivity(ActivityForm : NgForm){   
   
     if(ActivityForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     }    
 
   
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostProjectActivity(ActivityForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         ActivityForm.reset();
         ActivityForm.resetForm();
         ActivityForm.form.markAsPristine();
         ActivityForm.form.markAsUntouched();        
         swal('Success!', 'Project Activity Added Successfully .', 'success');
         this.router.navigate(['/home/projactivity']) ;   
                    
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
   GetAllProjectActivity() {
    this.data = this.userService.GetAllProjectCodeActivity();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;        
      }, (error) => {

      });
  }  

  GetAllDistrictActivity() {
    this.data = this.userService.GetAllDistrictActivity();
    this.data.subscribe(
      (response: any) => {
        this.Areacode = response;        
      }, (error) => {

      });
  } 

  GetByIdProjectActivity(ProjectActivityJob_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdProjectActivity(ProjectActivityJob_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;       
       
      if (this.i.Baseline_Start_Date != null)
      this.i.Baseline_Start_Date = ((this.i.Baseline_Start_Date).split('T'))[0];   
      if (this.i.Baseline_End_Date != null)
      this.i.Baseline_End_Date = ((this.i.Baseline_End_Date).split('T'))[0];  
      if (this.i.Actual_Start_Date != null)
      this.i.Actual_Start_Date = ((this.i.Actual_Start_Date).split('T'))[0]; 
      if (this.i.Actual_End_Date != null)
      this.i.Actual_End_Date = ((this.i.Actual_End_Date).split('T'))[0];    
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    UpdateProjectActivity(ActivityForm : NgForm){     
      if(ActivityForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (ActivityForm.value.Staff_Name != null && !ActivityForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateProjectActivity(this.ProjectActivityJob_id,ActivityForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          ActivityForm.reset();
          ActivityForm.resetForm();
          ActivityForm.form.markAsPristine();
          ActivityForm.form.markAsUntouched();        
          swal('Success!', 'Project Activity Updated Successfully .', 'success');
          this.router.navigate(['/home/projactivity']) ;   
                   
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
