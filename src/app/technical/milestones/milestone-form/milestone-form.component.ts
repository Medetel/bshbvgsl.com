import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-milestone-form',
  templateUrl: './milestone-form.component.html',
  styleUrls: ['./milestone-form.component.css']
})
export class MilestoneFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  phase_milestone_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  title = "Add Phase Milestone";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {   
        
      this.phase_milestone_id = params['phase_milestone_id'];
      this.mode = params['mode'];  
    
      if(this.phase_milestone_id > 0){
        this.GetByIdmilestone(this.phase_milestone_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Milestone";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Milestone";
      }
    });
    if(this.phase_milestone_id > 0){
      this.GetByIdmilestone(this.phase_milestone_id);
     }
  }
  SaveMilestone(MilestoneForm : NgForm){ 
    
     if(MilestoneForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     } 
   
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostMilestone(MilestoneForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         MilestoneForm.reset();
         MilestoneForm.resetForm();
         MilestoneForm.form.markAsPristine();
         MilestoneForm.form.markAsUntouched();        
         swal('Success!', ' Milestone Added Successfully .', 'success');
         this.router.navigate(['/home/milestone']) ;   
                    
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

   GetByIdmilestone(phase_milestone_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdmilestone(phase_milestone_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;     
         
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    Updatemilestone(MilestoneForm : NgForm){     
      if(MilestoneForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (MilestoneForm.value.Staff_Name != null && !MilestoneForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.Updatemilestone(this.phase_milestone_id,MilestoneForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          MilestoneForm.reset();
          MilestoneForm.resetForm();
          MilestoneForm.form.markAsPristine();
          MilestoneForm.form.markAsUntouched();        
          swal('Success!', 'Milestone Updated Successfully .', 'success');
          this.router.navigate(['/home/milestone']) ;   
                   
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
