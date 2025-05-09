import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-emp-change-address',
  templateUrl: './emp-change-address.component.html',
  styleUrls: ['./emp-change-address.component.css']
})
export class EmpChangeAddressComponent implements OnInit {
 
  title = "Employee Details";
  title2 = "Change Address Details";
  data: any = [];
  AllEmployeeList: any = [];
  a: any = [];
  b: any = [];
  detailsEmployee: any = [];
  stateList: any = [];
  DistrictsList: any = [];
  formInvalid: boolean;
  addressId: number;
  mode: string;
  hide: boolean;
  EmployeeId: number;
  AddressEmployeeDetails: any = [];
  ItemsPerPage: number = 5;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  pageno: number = 1;
  empId: number
  totalItems: any;
  userName: any;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
   
  }

  ngOnInit() {
    this.getAllrequiredData()
    this.userName = localStorage.getItem('userName'); 
    this.GetByIdEmployeeAddress(this.userName);
    this.GetEmployeeAddressDetails(this.ItemsPerPage, this.pageno, this.b.EMP_EMPLOYEE_ID);
    this.route.params.subscribe(params => {
      this.addressId = params['id'];
      this.mode = params['mode'];
      this.empId = params['empId'];
   
    
      if (this.addressId > 0) {
        this.GetByIdEmployeeAddressedit(this.addressId);
      }

    if (this.mode == 'view') {
      this.hide = true;
      this.title2 = 'View Address Details'
    }

    if (this.mode == 'edit') {
      this.hide = true;
      this.title2 = 'Edit Address Details'
    }



    if ((this.empId) > 0) {
      this.EmployeeId = this.empId;
    }
    });


    // });
   
 
  }

  getAllrequiredData() {


    this.data = this.userService.GetAllhrmsfixedCodes('STATE');
    this.data.subscribe(
      (response: any) => {
        this.stateList = response;
      })

    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })
  }

  GetByIdEmployeeAddressedit(EmployeeId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdEmployeeChangeAddressedit(EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.a = response;
        // this.ChangeOfDivision(response.EMP_DIVISION_ID)
        // this.ChangeOfEmployee(response.EMP_ID_FK);
        this.getAllrequiredData()

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.GetEmployeeAddressDetails(itemsPerPage, pageNo, this.b.EMP_EMPLOYEE_ID);
  }
  pageChanged(pageNumber: number) {
    this.GetEmployeeAddressDetails(this.ItemsPerPage, pageNumber, this.b.EMP_EMPLOYEE_ID);
  }


  GetByIdEmployeeAddress(userName) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdEmployeeChangeAddress(userName);
    this.data.subscribe(
      (response: any) => {
        this.b = response;
        console.log(' a data :' + JSON.stringify(this.a));
        //this.getAllrequiredData()

        this.GetEmployeeAddressDetails(this.ItemsPerPage, this.pageno, this.b.EMP_EMPLOYEE_ID);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  UpdateEmplAddress(AddForm: NgForm) {
    swal({
      title: 'Are you sure?', text: "You want to Update!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.value) {

        if (AddForm.invalid) {
          this.formInvalid = true;
          swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
          return;
        }
        else {
          AddForm.value.EMP_ID_FK = this.EmployeeId;
          this.data = this.userService.UpdateEmployeeAddressDetails_self(AddForm.value, this.addressId);
          this.data.subscribe(
            (response) => {
              AddForm.reset();
              AddForm.resetForm();
              AddForm.form.markAsPristine();
              AddForm.form.markAsUntouched();
              this.resetFormFields();
              swal('Success!', 'Employee Address Details Updated Successfully .', 'success');
              this.router.navigate(['/home/emp-change-address']);
              this.GetEmployeeAddressDetails(this.ItemsPerPage, this.pageno, this.b.EMP_EMPLOYEE_ID);
              document.getElementById('loader-spinner').style.display = "none";
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
    })
  }
 
  Cancel() {
    this.router.navigate(['/home/emp-change-address']);
  }


  GetEmployeeAddressDetails(itemsPerPage: number, pageNo: number, empId:number) {
    console.log('emp id :' + this.b.EMP_EMPLOYEE_ID);
    document.getElementById('loader-spinner').style.display = "block"; 
    this.data = this.userService.GetAllAddressForEmployee(itemsPerPage, pageNo, empId);
    this.data.subscribe(
      (response: any) => {
        console.log('address data :' + JSON.stringify(response))
        this.AddressEmployeeDetails = response.EMP_AddressModels;
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  resetFormFields() {
    this.a = {};
  }

  delete(EMP_ADDR_ID, PId) {
    debugger;
    swal({
      title: 'Are you sure?', text: "You want to delete! with Id : " + PId, type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteEmployeeAddressdetails(EMP_ADDR_ID);
        this.data.subscribe(
          (response: any) => {
            this.GetEmployeeAddressDetails(this.itemsPerPage, this.currentPage, this.b.EMP_EMPLOYEE_ID);
            this.resetFormFields();
            document.getElementById('loader-spinner').style.display = "none";
          },
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";

          },
        );
      }
    })
  }

}

