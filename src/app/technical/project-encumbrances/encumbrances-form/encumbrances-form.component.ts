import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
@Component({
  selector: 'app-encumbrances-form',
  templateUrl: './encumbrances-form.component.html',
  styleUrls: ['./encumbrances-form.component.css']
})
export class EncumbrancesFormComponent implements OnInit {
  data: any;
  formInvalid: boolean;
  Projencumb_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  projectcode: any = [];
  contractorcode: any = [];
  encumbrancecode: any = [];
  title = "Add Project Encumbrance";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllContractor();
    this.GetAllEncumbrance();
    this.GetAllProject();
    this.route.params.subscribe(params => {   
        
      this.Projencumb_id = params['Projencumb_id'];
      this.mode = params['mode'];  
    
      if(this.Projencumb_id > 0){
        this.GetByIdEncumbrance(this.Projencumb_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Project Encumbrance";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Project Encumbrance";
      }
    });

    
    if(this.Projencumb_id > 0){
      this.GetByIdEncumbrance(this.Projencumb_id);
     }
  }
  SaveEncumbrance(EncumbranceForm : NgForm){   
   
     if(EncumbranceForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     }    
    
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostProjectEncumbrance(EncumbranceForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         EncumbranceForm.reset();
         EncumbranceForm.resetForm();
         EncumbranceForm.form.markAsPristine();
         EncumbranceForm.form.markAsUntouched();        
         swal('Success!', 'Project Encumbrance Added Successfully .', 'success');
         this.router.navigate(['/home/projectencumbrance']) ;                   
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
    this.data = this.userService.GetAllProjectEncumbrance();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;        
      }, (error) => {

      });
  }  
  
  
  GetAllContractor() {
    this.data = this.userService.GetAllContractorProjectEncumbrance();
    this.data.subscribe(
      (response: any) => {
        this.contractorcode = response;        
      }, (error) => {

      });
  }  
  
  
  GetAllEncumbrance() {
    this.data = this.userService.GetAllEncumbrancedropdown();
    this.data.subscribe(
      (response: any) => {
        this.encumbrancecode = response;        
      }, (error) => {

      });
  }  
GetByIdEncumbrance(Projencumb_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdEncumbrance(Projencumb_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;       
        
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }

UpdateEncumbrance(EncumbranceForm : NgForm){     
      if(EncumbranceForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (EncumbranceForm.value.Staff_Name != null && !EncumbranceForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateEncumbrance(this.Projencumb_id,EncumbranceForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          EncumbranceForm.reset();
          EncumbranceForm.resetForm();
          EncumbranceForm.form.markAsPristine();
          EncumbranceForm.form.markAsUntouched();        
          swal('Success!', 'Project Encumbrance Updated Successfully .', 'success');
          this.router.navigate(['/home/projectencumbrance']) ;   
                   
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
