import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-design-issue-type-form',
  templateUrl: './design-issue-type-form.component.html',
  styleUrls: ['./design-issue-type-form.component.css']
})
export class DesignIssueTypeFormComponent implements OnInit {

  formInvalid: boolean;
  data: any;
  desisstype_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  title = "Add Design Issue Type";

  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {   
        
      this.desisstype_id = params['desisstype_id'];
      this.mode = params['mode'];  
    
      if(this.desisstype_id > 0){
        this.GetByIdDesignIssueType(this.desisstype_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View DesignIssue Type";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Design Issue Type";
      }
    });
    if(this.desisstype_id > 0){
      this.GetByIdDesignIssueType(this.desisstype_id);
     }
  }
  SaveDesignIssueType(DesignIssueTypeForm : NgForm){ 
  
     if(DesignIssueTypeForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     } 
   
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostDesignIssueType(DesignIssueTypeForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         DesignIssueTypeForm.reset();
         DesignIssueTypeForm.resetForm();
         DesignIssueTypeForm.form.markAsPristine();
         DesignIssueTypeForm.form.markAsUntouched();        
         swal('Success!', ' Design Issue Type Added Successfully .', 'success');
         this.router.navigate(['/home/designissuetype']) ;   
                    
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
   GetByIdDesignIssueType(desisstype_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdDesignIssueType(desisstype_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;      
    
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    UpdateDesignIssueType(DesignIssueTypeForm : NgForm){     
      if(DesignIssueTypeForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (DesignIssueTypeForm.value.Staff_Name != null && !DesignIssueTypeForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateDesignIssueType(this.desisstype_id,DesignIssueTypeForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          DesignIssueTypeForm.reset();
          DesignIssueTypeForm.resetForm();
          DesignIssueTypeForm.form.markAsPristine();
          DesignIssueTypeForm.form.markAsUntouched();        
          swal('Success!', 'Design Issue Type Updated Successfully .', 'success');
          this.router.navigate(['/home/designissuetype']) ;   
                   
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
