import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-medical-reimbursment-records-form',
  templateUrl: './medical-reimbursment-records-form.component.html',
  styleUrls: ['./medical-reimbursment-records-form.component.css']
})
export class MedicalReimbursmentRecordsFormComponent implements OnInit {
  title="Add Medical Reimburshment ";  
  data : any = {};
  formInvalid : boolean = false;
  m : any = {};
  h: any = {};
  d: any = {};
  H: any = {};
  P: any = {};
  p: any = {};
  MEDI_CLAIM_ID: number;
  EMP_EMPLOYEE_ID: number;
  patientlist : any = [];
  mode : string;
  HOSPITAL_ID: any = {};
  TrainingCategorylist: any = {};
  EmployeeDetails: any = {};
  Districtlist: any = {};
  Treatmentlist: any = {};
  DI_Id:number;
  N: any = {};
  dd: any = {};
  r: any = {};
  HosptalDetails: any = [];
  PharmcyDetails: any = [];
  Depdentlist: any = {};
  Departmentlist: any = {};
  hsptltlist: any = {};
  fileToUpload: File;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    ) 
  { 

  }

  ngOnInit() {  
    this.route.params.subscribe(params => {      
      this.MEDI_CLAIM_ID = params['MEDI_CLAIM_ID'];  
      this.mode =  params['mode'];   
        
        if(this.MEDI_CLAIM_ID > 0){
            this.GetTreatmentDeatils(this.MEDI_CLAIM_ID)
        }    
    });

    if(this.mode=='View'){
      this.title = "View Medical Reimburshment ";
    }
    else if(this.mode=='Edit'){
      this.title = "Edit Medical Reimburshment ";
    }  
   
  }

 

     GetTreatmentDeatils(MEDI_CLAIM_ID) {     
    debugger;
      this.data = this.userService.GetTreatmentDetails(MEDI_CLAIM_ID);
      this.data.subscribe(
        (response: any) => {        
          this.Treatmentlist = response.Result;
         //this.GetEmployeeForTheId(this.EMP_EMPLOYEE_ID)
         this.HosptalDetails = this.H.HospitalModel;
          this.PharmcyDetails = this.p.PharmcyModel;
        })
         }     

        
      GetEmployeeForTheId(EMP_EMPLOYEE_ID) {        
        this.data = this.userService.GetEmployeeForTheIdMedical(EMP_EMPLOYEE_ID);
        this.data.subscribe(
          (response: any) => {       
            this.EmployeeDetails = response;
          })
    
    
        }         

  }

  


      
