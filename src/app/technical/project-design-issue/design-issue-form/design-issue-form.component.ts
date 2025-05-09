import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-design-issue-form',
  templateUrl: './design-issue-form.component.html',
  styleUrls: ['./design-issue-form.component.css']
})
export class DesignIssueFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  desiss_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  projectcode: any = [];
  contractorcode: any = [];
  designissuecode: any = [];
  title = "Add Design Issue";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllContractor();
    this.GetAllDesignIssueType();
    this.GetAllProject();

    this.route.params.subscribe(params => {   
        
      this.desiss_id = params['desiss_id'];
      this.mode = params['mode'];  
    
      if(this.desiss_id > 0){
        this.GetByIdDesignIssue(this.desiss_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Design Issue ";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Design Issue ";
      }
    });
    if(this.desiss_id > 0){
      this.GetByIdDesignIssue(this.desiss_id);
     }
  }
  SaveDesignIssue(DesignIssueForm : NgForm){  
    
     if(DesignIssueForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     } 
   
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostDesignIssue(DesignIssueForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         DesignIssueForm.reset();
         DesignIssueForm.resetForm();
         DesignIssueForm.form.markAsPristine();
         DesignIssueForm.form.markAsUntouched();        
         swal('Success!', 'Design Issue Added Successfully .', 'success');
         this.router.navigate(['/home/designissue']) ;   
                    
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
    this.data = this.userService.GetAllProjectDesignIssue();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;        
      }, (error) => {

      });
  }  
  
  
  GetAllContractor() {
    this.data = this.userService.GetAllContractorDesignIssue();
    this.data.subscribe(
      (response: any) => {
        this.contractorcode = response;        
      }, (error) => {

      });
  } 
  GetAllDesignIssueType() {
    this.data = this.userService.GetAllDesignIssueTypedropdown();
    this.data.subscribe(
      (response: any) => {
        this.designissuecode = response;        
      }, (error) => {

      });
  } 
  GetByIdDesignIssue(desiss_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdDesignIssue(desiss_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;       
         
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    UpdateDesignIssue(DesignIssueForm : NgForm){     
      if(DesignIssueForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (DesignIssueForm.value.Staff_Name != null && !DesignIssueForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateDesignIssue(this.desiss_id,DesignIssueForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          DesignIssueForm.reset();
          DesignIssueForm.resetForm();
          DesignIssueForm.form.markAsPristine();
          DesignIssueForm.form.markAsUntouched();        
          swal('Success!', 'Design Issue Updated Successfully .', 'success');
          this.router.navigate(['/home/designissue']) ;   
                   
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
