import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-emp-separation',
  templateUrl: './emp-separation.component.html',
  styleUrls: ['./emp-separation.component.css']
})
export class EmpSeparationComponent implements OnInit {
  data: any = [];
  DistrictsList: any = [];
  detailsEmployee: any = [];
  AllEmployeeList: any = [];
  a: any = {};
  RetiredDate: any;
  SeperationReasons: any = [];
  Deactiv: string = '';
  Vacan: string = '';
  EmployeeId: number;
  ret: boolean = false;
  retirementDate : any;
  mode:any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.getDefaultdata()

    this.route.params.subscribe(params => {
      this.EmployeeId = params['id'];
      if (this.EmployeeId > 0) {
        this.ret = true;
        //getRetirementDate
        this.data = this.userService.getRetirementDate(this.EmployeeId);
        this.data.subscribe(
          (response: any) => {
            this.retirementDate = response;            
          })

      this.a.EMP_ID = this.EmployeeId;
      this.a.REASON_SEPARATION = 'Retirement';
      //this.a.REL_DATE = this.retirementDate
      //this.a.REL_DATE = ((this.a.REL_DATE).split('T'))[0];
        }      
    });
   
    this.ChangeOfEmployee(this.EmployeeId)
  }

  getDefaultdata() {
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

    this.data = this.userService.GetAllhrmsfixedCodes('SeperationType');
    this.data.subscribe(
      (response: any) => {
        this.SeperationReasons = response;
      })

  }

  UpdateSepeartions(EmplDetails){

  }

  ChangeOfEmployee(EmployeeId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetEmployeeIds(EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.detailsEmployee = response;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );

    this.data = this.userService.GetEmployeeIds(EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.RetiredDate = response;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );



  }

  ChangeOfDivision(DivisionId) {
    this.data = this.userService.GetAllEmployees(DivisionId);
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;
      })
  }

  Deactivate() {
    this.Deactiv = 'Y'
  }

  Vacant() {
    this.Vacan = 'Y'
  }


  SaveSepeartions(Seper: NgForm) {
    Seper.value.DEACTIVE_IND = 'Y';
    Seper.value.POST_VACANT_IND = 'Y'
    if (this.EmployeeId > 0){
      Seper.value.EMP_ID = this.EmployeeId;
      Seper.value.REL_DATE = this.retirementDate;
      Seper.value.REASON_SEPARATION = 'Retirement';
    }
   
    console.log('Form');
    console.log(Seper.value)

    // if(Seper.value.REASON_SEPARATION == null){
     
    // }


    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.PostEmployeeSeperation(Seper.value);
    this.data.subscribe(
      (response: any) => {
        //this.detailsEmployee = response;
        Seper.reset();
        Seper.resetForm();
        Seper.form.markAsPristine();
        Seper.form.markAsUntouched();
        swal('Success!', 'Seperation successfully done.', 'success');
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  
}
