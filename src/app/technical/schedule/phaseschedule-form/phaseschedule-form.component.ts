import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-phaseschedule-form',
  templateUrl: './phaseschedule-form.component.html',
  styleUrls: ['./phaseschedule-form.component.css']
})
export class PhasescheduleFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  projectcode: any = [];
  PhaseSchedule_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  title = "Add Schedule";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllProjectSchedule();
    this.route.params.subscribe(params => {   
        
      this.PhaseSchedule_id = params['PhaseSchedule_id'];
      this.mode = params['mode'];  
    
      if(this.PhaseSchedule_id > 0){
        this.GetByIdSchedule(this.PhaseSchedule_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Schedule";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Schedule";
      }
    });

    
    if(this.PhaseSchedule_id > 0){
      this.GetByIdSchedule(this.PhaseSchedule_id);
     }
  }
  SaveSchedule(ScheduleForm : NgForm){   
   
     if(ScheduleForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     }     
    
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostSchedule(ScheduleForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         ScheduleForm.reset();
         ScheduleForm.resetForm();
         ScheduleForm.form.markAsPristine();
         ScheduleForm.form.markAsUntouched();        
         swal('Success!', 'Schedule Added Successfully .', 'success');
         this.router.navigate(['/home/schedule']) ;   
                    
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
   GetAllProjectSchedule() {
    this.data = this.userService.GetAllProjectSchedule();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;        
      }, (error) => {

      });
  } 
  GetByIdSchedule(PhaseSchedule_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdSchedule(PhaseSchedule_id);
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
    UpdateSchedule(ScheduleForm : NgForm){     
      if(ScheduleForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (ScheduleForm.value.Staff_Name != null && !ScheduleForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateSchedule(this.PhaseSchedule_id,ScheduleForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          ScheduleForm.reset();
          ScheduleForm.resetForm();
          ScheduleForm.form.markAsPristine();
          ScheduleForm.form.markAsUntouched();        
          swal('Success!', 'Schedule Updated Successfully .', 'success');
          this.router.navigate(['/home/schedule']) ;   
                   
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
