import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-leaveencashment',
  templateUrl: './leaveencashment.component.html',
  styleUrls: ['./leaveencashment.component.css']
})
export class LeaveencashmentComponent implements OnInit {
  title="Add LeaveEnhancment";
  data : any = {};
  formInvalid : boolean = false;
  h : any = [];
  d: any = {};
  W: any = {};
  LVENCASH_ID: any;
  EMP_EMPLOYEE_ID: any;
  WitenssDetails: any = [];
  EmployeeDetails: any = {};
  Districtlist: any = [];
  Emplist: any = {};
  DI_Id:number;
  l: any = {};
  Trainingtypelist: any = {};
  Leaveslist: any = {};
  tt: any = {};
  tc: any = {};
  fileToUpload: File;

  mode: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {
   this.GetAllData();
    this.route.params.subscribe(params => {      
      this.LVENCASH_ID = params['LVENCASH_ID'];  
      this.mode =  params['mode'];   
        
        if(this.LVENCASH_ID > 0){
             this.GetByIdLeaveTC(this.LVENCASH_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View Leave Encashment ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit Leave Encashment ";
    }  

    this.h.DivisionId = +localStorage.getItem('divisonId');
    this.GetEmployee(this.h.DivisionId);
  }

  GetAllData() {

   this.data = this.userService.GetAllDistrictsleave();
   this.data.subscribe(
     (response: any) => {
       this.Districtlist = response.Result;
       
     })    


     this.data = this.userService.GetAllLeaveList();
     this.data.subscribe(
       (response: any) => {
         this.Leaveslist = response.Result;
         
       }) 
          }

    

    GetEmployee(DI_Id) {
  
      this.data = this.userService.GetEmployeeleave(DI_Id);
      this.data.subscribe(
        (response: any) => {        
          this.Emplist = response;
        })
         }

     


      GetEmployeeForTheId(EMP_EMPLOYEE_ID) {
      
        this.data = this.userService.GetEmployeeForTheIdleave(EMP_EMPLOYEE_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })   
  
  
        }      
        
      
        SaveLeave(Leave: NgForm) {          
           
          console.log('Leave Forms');
          console.log(Leave.value);
      
          if (Leave.invalid) {
            this.formInvalid = true;
            swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
            return;
          }
      
          else {      
           
                   
            console.log('Data');
            console.log(Leave.value);

            this.data = this.userService.PostLeaves(Leave.value);
            this.data.subscribe(
              (response) => {
                Leave.reset();
                Leave.resetForm();
                Leave.form.markAsPristine();
                Leave.form.markAsUntouched();
                swal('Success!', 'Leave Encashment Added Successfully .', 'success');
                this.router.navigate(['/home/emp-claims/leave-encashment/']);
                document.getElementById('loader-spinner').style.display = "none";
              }, (error) => {
                document.getElementById('loader-spinner').style.display = "none";
                if (error.status == 401|| error.status == 500) {
                  this.errorHandler.handleError(error);
                }
                else if (error.status == 400) {
                  swal('Warning!', error.error.Message, 'warning');
                }
              });
      
      
          }
        }
         
        
        UpdateLeave(Leave: NgForm) {    
            
          this.data = this.userService.UpdateLeave(Leave.value,this.LVENCASH_ID);
              this.data.subscribe(
                (response) => {
                  Leave.reset();
                  Leave.resetForm();
                  Leave.form.markAsPristine();
                  Leave.form.markAsUntouched();            
                  
                  swal('Success!', ' Leave Encashment  updated Successfully .', 'success');
                  document.getElementById('loader-spinner').style.display = "none";   
                  this.router.navigate(['/home/emp-claims/leave-encashment/']) ;         
                }, (error) => {
                  document.getElementById('loader-spinner').style.display = "none";
                  if (error.status == 401|| error.status == 500) {
                    this.errorHandler.handleError(error);
                  }
                  else if (error.status == 400) {
                    swal('Warning!', error.error.Message, 'warning');
                  }
                });    
        }
       
        GetByIdLeaveTC(LVENCASH_ID){
        
        
          document.getElementById('loader-spinner').style.display = "block";
          this.data = this.userService.GetByIdLeaveTC(LVENCASH_ID);
          this.data.subscribe(
            (response: any) => {
              this.h = response;      
        
              if (this.h.LEAVE_TRANS_DATE != null)
              this.h.LEAVE_TRANS_DATE = ((this.h.LEAVE_TRANS_DATE).split('T'))[0];             
                             
              this.GetEmployeeForTheId(response.EmpID)

              this.GetEmployee(response.DivisionId)
            

             
              document.getElementById('loader-spinner').style.display = "none";
            }, (error) => {
              document.getElementById('loader-spinner').style.display = "none";
              if (error.status == 401|| error.status == 500) {
                this.errorHandler.handleError(error);
              }
              else if (error.status == 400) {
                swal('Warning!', error.error.Message, 'warning');
              }
            });
        }

        Cancel(){
          
        }
}



