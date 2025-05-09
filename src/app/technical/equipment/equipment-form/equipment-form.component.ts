import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {
  formInvalid: boolean;
  data: any;
  projectcode: any = [];
  Areacode: any=[];
  equipmobdemob_id : number
  hide : boolean = false;
  mode : string = "";
  i : any = {};
  title = "Add Equipment";
  // numericpattern = "^[0-9]*$";
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllProjectEquipment();
    this.GetAllAreaEquipment();
    this.route.params.subscribe(params => {   
        
      this.equipmobdemob_id = params['equipmobdemob_id'];
      this.mode = params['mode'];  
    
      if(this.equipmobdemob_id > 0){
        this.GetByIdEquipment(this.equipmobdemob_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Equipment";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Equipment";
      }
    });

    
    if(this.equipmobdemob_id > 0){
      this.GetByIdEquipment(this.equipmobdemob_id);
     }
  }
  SaveEquipment(Equipmentform : NgForm){  
   
     if(Equipmentform.invalid)
     {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     }    
 
   
     else{  
       document.getElementById('loader-spinner').style.display = "block";
         this.data = this.userService. PostEquipment(Equipmentform.value);    
         this.data.subscribe(
       (response) => {       
         document.getElementById('loader-spinner').style.display = "none";
         Equipmentform.reset();
         Equipmentform.resetForm();
         Equipmentform.form.markAsPristine();
         Equipmentform.form.markAsUntouched();        
         swal('Success!', 'Equipment Added Successfully .', 'success');
         this.router.navigate(['/home/equipmob']) ;   
                    
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

   GetAllProjectEquipment() {
    this.data = this.userService.GetAllProjectEquipment();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;        
      }, (error) => {

      });
  } 
  
  GetAllAreaEquipment() {
    this.data = this.userService.GetAllAreaEquipment();
    this.data.subscribe(
      (response: any) => {
        this.Areacode = response;       
      }, (error) => {

      });
  }
  
  GetByIdEquipment(equipmobdemob_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdEquipment(equipmobdemob_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;       
      
      if (this.i.Working_Start_Date != null)
      this.i.Working_Start_Date = ((this.i.Working_Start_Date).split('T'))[0];   
      if (this.i.Working_End_Date != null)
      this.i.Working_End_Date = ((this.i.Working_End_Date).split('T'))[0];     
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    UpdateEquipment(Equipmentform : NgForm){     
      if(Equipmentform.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (Equipmentform.value.Equipment_Number != null && !Equipmentform.value.Equipment_Number.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateEquipment(this.equipmobdemob_id,Equipmentform.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          Equipmentform.reset();
          Equipmentform.resetForm();
          Equipmentform.form.markAsPristine();
          Equipmentform.form.markAsUntouched();        
          swal('Success!', 'Equipment Updated Successfully .', 'success');
          this.router.navigate(['/home/equipmob']) ;   
                   
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
