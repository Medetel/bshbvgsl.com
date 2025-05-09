import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Login } from '../../shared/user.model';
import swal from 'sweetalert2';



@Component({
  selector: 'app-emp-nomination',
  templateUrl: './emp-nomination.component.html',
  styleUrls: ['./emp-nomination.component.css']
})
export class EmpNominationComponent implements OnInit {
  title = "Add NomineeDetails";
  data: any = {};
  formInvalid: boolean = false;
  E: any = {};
  d: any = {};
  NMNT_ID: any;
  EMP_EMPLOYEE_ID: any;
  // NMNT_ID : number;
  mode: string;
  NomineeDetails: any = {};
  EmployeeDetails: any = {};
  Relations: any = {};
  Districtlist: any = {};
  Emplist: any = {};
  DI_Id: number;
  N: any = {};
  n: any = {};
  dd: any = {};
  dd2: any = {};
  dd3: any = {};
  Depdentlist: any = {};
  Depdentlist2: any = {};
  Depdentlist3: any = {};
  NomDetails: any = [];
  W: any = {};
  Beniflist: any = {};
  //routing : string = '/home/nominationapp/nomination-approval';
  routing : string = null;
  EPS : number =0;
  Gratiuty: number =0;
  Insurance : number =0;
  userName: any;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.GetByIdEmployeeNomination(this.userName);
    this.GetAllData();
    this.route.params.subscribe(params => {
      this.NMNT_ID = params['NMNT_ID'];
      this.mode = params['mode'];

      if (this.NMNT_ID > 0) {
        this.GetByIdNominee(this.NMNT_ID)
      }
    });

    if (this.mode == 'View') {
      this.title = "View Complaint Type ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Complaint Type ";
    }

    this.N.DivisionId = localStorage.getItem('divisonId');
    
    this.GetEmployee(this.N.DivisionId);

    this.routing = localStorage.getItem('switchurl');
    localStorage.removeItem('switchurl');
  }
  GetAllData() {
    debugger;
    this.data = this.userService.GetAllDistricts();
    this.data.subscribe(
      (response: any) => {
        this.Districtlist = response.Result;
      })
  }

  GetCode() {
    debugger;
    this.data = this.userService.GetNomineeDetails();
    this.data.subscribe(
      (response: any) => {
        this.E.Nom_No = response.Nom_No
      })
  }

  GetBenifits() {
    debugger;
    this.data = this.userService.GetNomineeBenifitDetails();
    this.data.subscribe(
      (response: any) => {
        this.Beniflist = response;
      })
  }

  GetEmployee(DI_Id) {
    debugger;
    this.data = this.userService.GetEmployee(DI_Id);
    this.data.subscribe(
      (response: any) => {
        this.Emplist = response;
      })
  }

  //dependent 1
  GetDependent(EMP_EMPLOYEE_ID) {
    debugger;
    this.data = this.userService.GetDependent_self(EMP_EMPLOYEE_ID);
    this.data.subscribe(
      (response: any) => {
        this.Depdentlist = response;
      })
  }

  //dependent 2
  GetDependent2(EMP_EMPLOYEE_ID) {
    debugger;
    this.data = this.userService.GetDependent2_self(EMP_EMPLOYEE_ID);
    this.data.subscribe(
      (response: any) => {
        this.Depdentlist2 = response;
      })

  }

  //dependent 3
  GetDependent3(EMP_EMPLOYEE_ID) {
    debugger;
    this.data = this.userService.GetDependent3_self(EMP_EMPLOYEE_ID);
    this.data.subscribe(
      (response: any) => {
        this.Depdentlist3 = response;
      })




  }

  //get for all emp details
  GetEmployeeForTheId(EMP_EMPLOYEE_ID) {
    debugger;
    this.data = this.userService.GetEmployeeForTheId(EMP_EMPLOYEE_ID);
    this.data.subscribe(
      (response: any) => {
        this.EmployeeDetails = response;
      })




  }
  GetRelationshipwith(DEPND_ID) {
    debugger;
    this.data = this.userService.GetRelationshipwith_self(DEPND_ID);
    this.data.subscribe(
      (response: any) => {
        this.Relations = response;
      })

  }



  SaveNominee(Nom: NgForm) {
    debugger;
    
    if (Nom.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      Nom.value.EmpID = this.n.EMP_EMPLOYEE_ID;
      Nom.value.EbenifitModel = this.NomDetails;     
      this.data = this.userService.PostNom_self(Nom.value);
      this.data.subscribe(
        (response) => {
          Nom.reset();
          Nom.resetForm();
          Nom.form.markAsPristine();
          Nom.form.markAsUntouched();
          swal('Success!', 'NomineeDetails Added Successfully .', 'success');
          console.log("Nominee:", this.n.EMP_EMPLOYEE_ID)
          // this.router.navigate(['/home/nominationapp/']);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401 || error.status == 500) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });


    }
  }

  AddNomDetails(W) {
    debugger;  

    if ((W.DepndId1 != null || W.DepndId1 != undefined) && (W.EPS != null || W.EPS != undefined)
      && (W.GRU != null || W.GRU != undefined) && (W.LIC != null || W.LIC != undefined)) {
      let temp = {
        DepndId1: W.DepndId1,
        DEPND_NAME: this.getName(W.DepndId1),
        NMNT_EPS_PERC: W.EPS,
        NMNT_GRTY_PERC: W.GRU,
        NMNT_LIC_PERC: W.LIC,
      }

      this.EPS =  +this.EPS+(+W.EPS);
      this.Gratiuty = +this.Gratiuty+(+W.GRU);
      this.Insurance =  +this.Insurance+(+W.LIC);

      if(this.EPS>100){
        this.EPS =  +this.EPS-(+W.EPS);
        this.Gratiuty =  +this.Gratiuty-(+W.GRU);
         this.Insurance =  +this.Insurance-(+W.LIC);       
         swal('warning', 'EPS should not be greater than 100%', 'warning');
        return;
      }

      if(this.Gratiuty>100){        
        this.Gratiuty =  +this.Gratiuty-(+W.GRU);
         this.Insurance =  +this.Insurance-(+W.LIC);
      
         swal('warning', 'Gratiuty should not be greater than 100%', 'warning');
        return;
      }

      if(this.Insurance>100){
        this.Insurance =  +this.Insurance-(+W.LIC);
        
         swal('warning', 'Insurance should not be greater than 100%', 'warning');
        return;
      }

     //var list = this.NomDetails.filter(a=>a.DepndId1 == W.DepndId1)

      // if(list.length > 0){
      //    swal('warning', 'Please enter mandatory fields!', 'warning');
      //   return;
      // }   

      var list = this.NomDetails.filter(a=>a.DEPND_ID == W.DepndId1)
      if(list.length > 0){
         swal('warning', 'Please enter mandatory fields!', 'warning');
        return;
      }     
      //DEPND_ID;
      this.NomDetails.push(temp);
      this.W = {};
    }

    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
    }
  }

  getName(DepndId1) {
    debugger
    console.log(this.Depdentlist);
    for (let i=0; i < this.Depdentlist.length;i++)
    {
      if (this.Depdentlist[i].DEPND_ID == DepndId1) {
        return this.Depdentlist[i].DEPND_NAME;
      }
    }
  }

  //add
  ClearNomDetails() {
    this.W = {};
  }



  NomDetailsremove(i) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
    this.NomDetails.splice(i, 1);
    },)
  }



  //update
  UpdateNominee(Nom: NgForm) {
    Nom.value.DEPND_NAME = this.Depdentlist.DEPND_NAME
    Nom.value.EbenifitModel = this.NomDetails;
    this.data = this.userService.UpdateNominee(Nom.value, this.NMNT_ID);
    this.data.subscribe(
      (response) => {
        Nom.reset();
        Nom.resetForm();
        Nom.form.markAsPristine();
        Nom.form.markAsUntouched();

        swal('Success!', ' Nominee updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/nominationapp/']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401 || error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }




  GetByIdNominee(NMNT_ID) {
    debugger;

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdNominee(NMNT_ID);
    this.data.subscribe(
      (response: any) => {
        console.log("getbyid");
        console.log(response);
        // this.GetRelationshipwith(response.DepndId1)
        this.GetDependent(response.EmpID)
        this.GetEmployeeForTheId(response.EmpID)
        this.GetEmployee(response.DivisionId)
        this.N = response;
        this.NomDetails = this.N.EbenifitModel;

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401 || error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }

  Back(){   
    if(this.routing != null)
    this.router.navigate([this.routing]);
    else
    this.router.navigate(['/home/nominationapp']);    
  }

  GetByIdEmployeeNomination(userName) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEmployeeNomination(userName);
    this.data.subscribe(
      (response: any) => {
        this.n = response;
        this.GetRelationshipwith(this.n.EMP_EMPLOYEE_ID);
        this.GetDependent(this.n.EMP_EMPLOYEE_ID);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
}

