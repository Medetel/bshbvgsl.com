import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
@Component({
  selector: 'app-quantum-form',
  templateUrl: './quantum-form.component.html',
  styleUrls: ['./quantum-form.component.css']
})
export class QuantumFormComponent implements OnInit {
  data: any;
  formInvalid: boolean;
  EncumbranceQuantum_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  projectcode: any = [];
  contractorcode: any = [];
  title = "Add Encumbrane Quantum";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllContractorEncumbranceQuantum();
    this.GetAllProjectEncumbranceQuantum();

    this.route.params.subscribe(params => {   
        
      this.EncumbranceQuantum_id = params['EncumbranceQuantum_id'];
      this.mode = params['mode'];  
     
      if(this.EncumbranceQuantum_id > 0){
        this. GetByIdEncumbranceQuantum(this.EncumbranceQuantum_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Encumbrance Quantum";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Encumbrance Quantum";
      }
    });

    
    if(this.EncumbranceQuantum_id > 0){
      this.GetByIdEncumbranceQuantum(this.EncumbranceQuantum_id);
     }
  }
  SaveEncumbranceQunatum(EncumbranceQunatumForm : NgForm){  
   
     if(EncumbranceQunatumForm.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     } 
   
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostEncumbranceQuantum(EncumbranceQunatumForm.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         EncumbranceQunatumForm.reset();
         EncumbranceQunatumForm.resetForm();
         EncumbranceQunatumForm.form.markAsPristine();
         EncumbranceQunatumForm.form.markAsUntouched();        
         swal('Success!', ' Encumbrance Quantum Added Successfully .', 'success');
         this.router.navigate(['/home/encumbrancequantum']) ;   
                    
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

   
  GetAllProjectEncumbranceQuantum() {
    this.data = this.userService.GetAllProjectEncumbranceQuantum();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;        
      }, (error) => {

      });
  }  

  GetAllContractorEncumbranceQuantum() {
    this.data = this.userService.GetAllContractorEncumbranceQuantum();
    this.data.subscribe(
      (response: any) => {
        this.contractorcode = response;        
      }, (error) => {

      });
  }  

  GetByIdEncumbranceQuantum(EncumbranceQuantum_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdEncumbranceQuantum(EncumbranceQuantum_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;    
       
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    UpdateEncumbranceQuantum(EncumbranceQunatumForm : NgForm){     
      if(EncumbranceQunatumForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (EncumbranceQunatumForm.value.Staff_Name != null && !EncumbranceQunatumForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateEncumbranceQuantum(this.EncumbranceQuantum_id,EncumbranceQunatumForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          EncumbranceQunatumForm.reset();
          EncumbranceQunatumForm.resetForm();
          EncumbranceQunatumForm.form.markAsPristine();
          EncumbranceQunatumForm.form.markAsUntouched();        
          swal('Success!', 'Encumbrance Quantum Updated Successfully .', 'success');
          this.router.navigate(['/home/encumbrancequantum']) ;   
                   
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

updateTotalQuantumRem() {
  const totalQuantum = parseInt(this.i.Total_Quantum, 10);
  const totalQuantumRel = parseInt(this.i.Total_Quantum_Rel, 10);

  if (!isNaN(totalQuantum) && !isNaN(totalQuantumRel) && totalQuantum >= totalQuantumRel) {
    this.i.Total_Quantum_Rem = (totalQuantum - totalQuantumRel).toString();
  } else {
    this.i.Total_Quantum_Rem = ''; // Set to a default value or handle the error accordingly
    // Optionally log an error or display a message
    console.error('Invalid numeric input for Total_Quantum or Total_Quantum_Rel, or Total is less than Released');
  }
}

isValidTotalQuantumRem(): boolean {
  const totalQuantum = parseInt(this.i.Total_Quantum, 10);
  const totalQuantumRel = parseInt(this.i.Total_Quantum_Rel, 10);
  return !isNaN(totalQuantum) && !isNaN(totalQuantumRel) && totalQuantum >= totalQuantumRel;
}

}