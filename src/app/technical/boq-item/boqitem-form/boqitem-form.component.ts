import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-boqitem-form',
  templateUrl: './boqitem-form.component.html',
  styleUrls: ['./boqitem-form.component.css']
})
export class BoqitemFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  boq_item_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  title = "Add BOQ Item";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {   
        
      this.boq_item_id = params['boq_item_id'];
      this.mode = params['mode'];  
    
      if(this.boq_item_id > 0){
        this.GetByIdBOQItem(this.boq_item_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View BOQItem";
      }
      else if(this.mode=='edit'){
        this.title = "Edit BOQItem";
      }
    });
    if(this.boq_item_id > 0){
      this.GetByIdBOQItem(this.boq_item_id);
     }
  }
  SaveBOQItem(BOQItemForm : NgForm){  
    
     if(BOQItemForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     } 
   
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostBOQItem(BOQItemForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         BOQItemForm.reset();
         BOQItemForm.resetForm();
         BOQItemForm.form.markAsPristine();
         BOQItemForm.form.markAsUntouched();        
         swal('Success!', ' BOQItem Added Successfully .', 'success');
         this.router.navigate(['/home/boqitem']) ;   
                    
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
   GetByIdBOQItem(boq_item_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdBOQItem(boq_item_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;      
       
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    UpdateBOQItem(BOQItemForm : NgForm){     
      if(BOQItemForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (BOQItemForm.value.Staff_Name != null && !BOQItemForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateBOQItem(this.boq_item_id,BOQItemForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          BOQItemForm.reset();
          BOQItemForm.resetForm();
          BOQItemForm.form.markAsPristine();
          BOQItemForm.form.markAsUntouched();        
          swal('Success!', 'BOQItem Updated Successfully .', 'success');
          this.router.navigate(['/home/boqitem']) ;   
                   
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
