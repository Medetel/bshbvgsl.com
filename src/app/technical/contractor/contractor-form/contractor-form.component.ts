import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-contractor-form',
  templateUrl: './contractor-form.component.html',
  styleUrls: ['./contractor-form.component.css']
})
export class ContractorFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  Contractor_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  title = "Add Contractor";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {   
        
      this.Contractor_id = params['Contractor_id'];
      this.mode = params['mode'];  
    
      if(this.Contractor_id > 0){
        this.GetByIdContractor(this.Contractor_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Contractor";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Contractor";
      }
    });

    
    if(this.Contractor_id > 0){
      this.GetByIdContractor(this.Contractor_id);
     }
  }
  SaveContract(Contractorform : NgForm){ 
   
     if(Contractorform.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     }     
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostContractor(Contractorform.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         Contractorform.reset();
         Contractorform.resetForm();
         Contractorform.form.markAsPristine();
         Contractorform.form.markAsUntouched();        
         swal('Success!', 'Contractor Added Successfully .', 'success');
         this.router.navigate(['/home/contractor']) ;   
                    
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
   GetByIdContractor(Contractor_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdContractor(Contractor_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;       
           
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    UpdateContractor(Contractorform : NgForm){     
      if(Contractorform.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (Contractorform.value.Staff_Name != null && !Contractorform.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateContractor(this.Contractor_id,Contractorform.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          Contractorform.reset();
          Contractorform.resetForm();
          Contractorform.form.markAsPristine();
          Contractorform.form.markAsUntouched();        
          swal('Success!', 'Contractor Updated Successfully .', 'success');
          this.router.navigate(['/home/contractor']) ;   
                   
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
