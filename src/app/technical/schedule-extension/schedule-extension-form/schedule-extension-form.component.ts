import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-schedule-extension-form',
  templateUrl: './schedule-extension-form.component.html',
  styleUrls: ['./schedule-extension-form.component.css']
})
export class ScheduleExtensionFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  ContScheduleExt_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  projectcode: any = [];
  contractorcode: any = [];
  title = "Add Contractor Schedule Extension";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllContractor();
    this.GetAllProject();

    this.route.params.subscribe(params => {   
        
      this.ContScheduleExt_id = params['ContScheduleExt_id'];
      this.mode = params['mode'];  
    
      if(this.ContScheduleExt_id > 0){
        this.GetByIdScheduleExtension(this.ContScheduleExt_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Contractor Schedule Extension";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Contractor Schedule Extension";
      }
    });

    
    if(this.ContScheduleExt_id > 0){
      this.GetByIdScheduleExtension(this.ContScheduleExt_id);
     }
  }
  SaveScheduleExtension(ScheduleExtensionForm : NgForm){  
   
     if(ScheduleExtensionForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     } 
   
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostScheduleExtension(ScheduleExtensionForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         ScheduleExtensionForm.reset();
         ScheduleExtensionForm.resetForm();
         ScheduleExtensionForm.form.markAsPristine();
         ScheduleExtensionForm.form.markAsUntouched();        
         swal('Success!', 'Contractor Schedule Extension Added Successfully .', 'success');
         this.router.navigate(['/home/scheduleextension']) ;   
                    
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

   GetAllProject() {
    this.data = this.userService.GetAllProjectScheduleExtension();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;       
      }, (error) => {

      });
  }  
  
  
  GetAllContractor() {
    this.data = this.userService.GetAllContractorScheduleExtension();
    this.data.subscribe(
      (response: any) => {
        this.contractorcode = response;        
      }, (error) => {

      });
  }    

  GetByIdScheduleExtension(ContScheduleExt_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdScheduleExtension(ContScheduleExt_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;     
        
      if (this.i.Extension_Start_Date != null)
      this.i.Extension_Start_Date = ((this.i.Extension_Start_Date).split('T'))[0];  
      if (this.i.Extension_End_Date != null)
      this.i.Extension_End_Date = ((this.i.Extension_End_Date).split('T'))[0];  
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }

UpdateScheduleExtension(ScheduleExtensionForm : NgForm){     
      if(ScheduleExtensionForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (ScheduleExtensionForm.value.Staff_Name != null && !ScheduleExtensionForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateScheduleExtension(this.ContScheduleExt_id,ScheduleExtensionForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          ScheduleExtensionForm.reset();
          ScheduleExtensionForm.resetForm();
          ScheduleExtensionForm.form.markAsPristine();
          ScheduleExtensionForm.form.markAsUntouched();        
          swal('Success!', 'Contractor Schedule Extension Updated Successfully .', 'success');
          this.router.navigate(['/home/scheduleextension']) ;   
                   
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
