import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-structuresplanning-form',
  templateUrl: './structuresplanning-form.component.html',
  styleUrls: ['./structuresplanning-form.component.css']
})
export class StructuresplanningFormComponent implements OnInit {
  data: any;
  formInvalid: boolean;
  StructPlan_id : number
  hide : boolean = false;
  mode : string = "";
  title = "Add Structure Planning";
  i : any = {};
  projectcode: any = [];
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllProjectStructure();

    this.route.params.subscribe(params => {   
        
      this.StructPlan_id = params['StructPlan_id'];
      this.mode = params['mode'];  
    
      if(this.StructPlan_id > 0){
        this.GetByIdStructurePlanning(this.StructPlan_id);
      }
      
      if(this.mode == 'view'){
        this.hide = true;       
      }

      if(this.mode=='view'){
        this.title = "View Structure Planning";
      }
      else if(this.mode=='edit'){
        this.title = "Edit Structure Planning";
      }
    });

    
    if(this.StructPlan_id > 0){
      this.GetByIdStructurePlanning(this.StructPlan_id);
     }
  }
  GetAllProjectStructure() {
    this.data = this.userService.GetAllProjectStructurePlanning();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;        
      }, (error) => {

      });
  }  
  

  SaveStructurePlanning(StructurePlanningForm : NgForm){ 
   
    if(StructurePlanningForm.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }       
    else{  
      document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService. PostStructurePlanning(StructurePlanningForm.value);    
        this.data.subscribe(
      (response) => {       
        document.getElementById('loader-spinner').style.display = "none";
        StructurePlanningForm.reset();
        StructurePlanningForm.resetForm();
        StructurePlanningForm.form.markAsPristine();
        StructurePlanningForm.form.markAsUntouched();        
        swal('Success!', 'Structure Planning Added Successfully .', 'success');
        this.router.navigate(['/home/structuresplanning']) ;   
                   
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
  GetByIdStructurePlanning(StructPlan_id){   
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdStructurePlanning(StructPlan_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
         this.i = response;     
     
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
    }
    UpdateStructurePlanning(StructurePlanningForm : NgForm){     
      if(StructurePlanningForm.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      }     
    
      else{        
        if (StructurePlanningForm.value.Staff_Name != null && !StructurePlanningForm.value.Staff_Name.match("http"))     
        document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.UpdateStructurePlanning(this.StructPlan_id,StructurePlanningForm.value);    
          this.data.subscribe(
        (response) => {       
          document.getElementById('loader-spinner').style.display = "none";  
          StructurePlanningForm.reset();
          StructurePlanningForm.resetForm();
          StructurePlanningForm.form.markAsPristine();
          StructurePlanningForm.form.markAsUntouched();        
          swal('Success!', 'Structure Planning Updated Successfully .', 'success');
          this.router.navigate(['/home/structuresplanning']) ;   
                   
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
