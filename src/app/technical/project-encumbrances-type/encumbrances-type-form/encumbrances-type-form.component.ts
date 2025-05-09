import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-encumbrances-type-form',
  templateUrl: './encumbrances-type-form.component.html',
  styleUrls: ['./encumbrances-type-form.component.css']
})
export class EncumbrancesTypeFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  encumb_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  title = "Add Encumbrance Type";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {   
        
      this.encumb_id = params['encumb_id'];
      this.mode = params['mode'];  
    
      if(this.encumb_id > 0){
        this.GetByIdProjectEncumbranceType(this.encumb_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Project Encumbrance Type";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Project Encumbrance Type";
      }
    });
    
    if(this.encumb_id > 0){
      this.GetByIdProjectEncumbranceType(this.encumb_id);
     }
  }
  SaveEncumbranceType(EncumbranceTypeForm : NgForm){  
    
     if(EncumbranceTypeForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     }    
 
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostProjectEncumbranceType(EncumbranceTypeForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         EncumbranceTypeForm.reset();
         EncumbranceTypeForm.resetForm();
         EncumbranceTypeForm.form.markAsPristine();
         EncumbranceTypeForm.form.markAsUntouched();        
         swal('Success!', 'Project Encumbrance Type Added Successfully .', 'success');
         this.router.navigate(['/home/projectencumbrancetype']) ;                 
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
   GetByIdProjectEncumbranceType(encumb_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdEncumbranceType(encumb_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response; 
       
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }

  UpdateProjectEncumbranceType(EncumbranceTypeForm : NgForm){     
      if(EncumbranceTypeForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (EncumbranceTypeForm.value.Staff_Name != null && !EncumbranceTypeForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateEncumbranceType(this.encumb_id,EncumbranceTypeForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          EncumbranceTypeForm.reset();
          EncumbranceTypeForm.resetForm();
          EncumbranceTypeForm.form.markAsPristine();
          EncumbranceTypeForm.form.markAsUntouched();        
          swal('Success!', 'Project Encumbrance Type Updated Successfully .', 'success');
          this.router.navigate(['/home/projectencumbrancetype']) ;   
                   
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
