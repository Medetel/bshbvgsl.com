import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-advocates-form',
  templateUrl: './advocates-form.component.html',
  styleUrls: ['./advocates-form.component.css']
})
export class AdvocatesFormComponent implements OnInit {

  title = "Add Advocate";
  a: any = {};
  data: any = {};
  Districts: any = [];
  Taluks: any = [];
  Villages: any = [];
  AdvocategetId: any = {};
  mode: any;
  edit: any;
  FormMode: any = 'Create';
  allAdvocatelist: any = [];
  numericpattern = "^[0-9]*$";
  alphabetpattern = "^[a-zA-Z ]*$";
  alphanumpattern = "^[a-zA-Z0-9 ]*$";
  emailpattern = "^[a-zA-Z0-9._%-+]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  formInvalid: boolean = false;
  APP_PA_Age: any;
  app: any;
  userAge: number;
  vendorCode: string;

  primaryKey: any = 0;
  row_no: any = 0;
  details: any;
  fromUtility: boolean = false;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datePipe: DatePipe) { }

  ngOnInit() {

    localStorage.getItem('Mode');
    localStorage.getItem('Edit');
    this.mode = localStorage.getItem('Mode');
    this.edit = +localStorage.getItem('Edit');

    //Remove localstorage
    localStorage.removeItem('Mode');
    localStorage.removeItem('Edit');

    if (this.mode == 'Edit') {
      this.FormMode = 'Edit';
    }

    this.GetAllDistrict();

    if (this.edit > 0) {
      this.GetAdvocateById();
    }
    this.allGetAdvocates()

    if (this.mode == 'View')
      this.title = "View Advocate";
    else if (this.mode == 'Edit')
      this.title = "Update Advocate";

    //Route form utilities
    this.row_no = localStorage.getItem('row_no');
    this.primaryKey = localStorage.getItem('PrimaryKey');
    if (this.row_no > 0) {
      this.mode = 'View';
      this.getEditData()
    }
  }

  allGetAdvocates() {
    this.data = this.userService.GetAllAdvocates();
    this.data.subscribe(
      (response: any) => {
        this.allAdvocatelist = response.Result;
      }
    )
  }

  //Date diff  

  SaveAdvocate(Advocate: NgForm) {
    if (Advocate.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    //For duplicate check of advocate No

    if (this.FormMode == 'Create') {

      //Duplicate check
      var data = this.allAdvocatelist.filter(a => a.Adv_Id_Number == this.a.Adv_Id_Number);
      if (data.length > 0) {
        alert('Advocate No already exist.');
        return;
      }     

      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.createAdvocate(Advocate.value);
      this.data.subscribe(
        (response: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('Success!', ' Advocate details has been saved successfully.', 'success');
          Advocate.reset();
          this.router.navigate(['/home/employedadvocates']);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('Warning!', 'Unable to generate Vendor Id, program stopped', 'warning');
        });
    }
    else {
      //UpdateAdvocateById     

      //Duplicate check
      var data = this.allAdvocatelist.filter(a => a.Adv_Id_Number == this.a.Adv_Id_Number &&
        a.Adv_Id != this.edit);
      if (data.length > 0) {
        alert('Advocate No already exist.');
        return;
      }
      Advocate.value.Adv_VendorCode = this.vendorCode;

      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.UpdateAdvocateById(this.edit, Advocate.value);
      this.data.subscribe(
        (response: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('Success!', ' Advocate details has been updated successfully.', 'success');
          this.router.navigate(['/home/employedadvocates']);
          Advocate.reset();
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('Warning!', 'Something went wrong.', 'warning');
        });
    }
  }

  update(Advocate: NgForm) {

  }
  GetAllDistrict() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.Districts = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetTaluks(DistrictId) {
    if (DistrictId > 0) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getAllTalukName(DistrictId);
      this.data.subscribe(
        (response: any) => {
          this.Taluks = response;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
  }

  GetVillages(TalukId) {
    if (TalukId > 0) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetVillagesBasedOnTaluk(TalukId);
      this.data.subscribe(
        (response: any) => {
          this.Villages = response;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
  }

  GetAdvocateById() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAdvocateById(this.edit);
    this.data.subscribe(
      (response: any) => {
        this.AdvocategetId = response;
        this.a = response;
        if (response.Adv_DOB != null)
          this.a.Adv_DOB = ((this.a.Adv_DOB).split('T'))[0];
        if (response.Adv_AppointmentDate != null)
          this.a.Adv_AppointmentDate = ((this.a.Adv_AppointmentDate).split('T'))[0];
        this.vendorCode = response.Adv_VendorCode;

        //iN VIEW getting Taluk and village
        this.data = this.userService.getAllTalukName(this.a.Adv_District_Id_FK);
        this.data.subscribe(
          (response: any) => {
            this.Taluks = response;
          });

        this.data = this.userService.GetVillagesBasedOnTaluk(this.a.Adv_District_Id_FK);
        this.data.subscribe(
          (response: any) => {
            this.Villages = response;
          });

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  cancel() {
    this.router.navigate(['/home/employedadvocates'])
  }

  CalculateAge(Advocate: NgForm) {
    if (Advocate.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      document.getElementById('loader-spinner').style.display = "block";
      if (this.a.Adv_DOB != null) {
        this.data = this.userService.calculateAge(this.a.Adv_DOB);
        this.data.subscribe(
          (response: any) => {
            response;
            this.userAge = response;
            if (this.userAge > 18) {
              this.SaveAdvocate(Advocate)
            }
            else {
              document.getElementById('loader-spinner').style.display = "none";
              swal('Warning!', "Age cannot be less than 18 years", 'warning');
            }
          })
      }
      else {
        this.SaveAdvocate(Advocate)
      }
    }
  }
  getEditData() {

    if (this.row_no > 0) {
      this.fromUtility = true;
    }

    var details = localStorage.getItem('FormDetails');
    this.details = JSON.parse(details);   
    localStorage.removeItem('row_no');
    localStorage.removeItem('PrimaryKey');   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCaseRegistrationforEditedValue(this.details.tableName, this.details.fromDate, this.details.Todate, this.primaryKey, this.row_no);
    this.data.subscribe(
      (response: any) => {
        this.a = response[0];       
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });

  }

}