import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-experiencedetails-form',
  templateUrl: './experiencedetails-form.component.html',
  styleUrls: ['./experiencedetails-form.component.css']
})
export class ExperiencedetailsFormComponent implements OnInit {

  title = " Employee Details";
  title2 ="Add Employee Exp Details"
  ExperienceId: number;
  mode: string;
  hide: boolean;
  e: any = [];
  AllEmployeeList: any = [];
  data: any = [];
  detailsEmployee: any = [];
  formInvalid: boolean;
  Qualificationlist: any = [];
  fileToUpload: File;
  DateDiff: number;
  DistrictsList: any;
  EmployeeId: number;
  totalItems:any;
  itemsPerPage: number=5;
  currentPage: number=1;
  EmployeeExperienceDetails :any =[];
  empId: number;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {

    this.getAllDefaultData()

    this.route.params.subscribe(params => {
      this.ExperienceId = params['id'];
      this.mode = params['mode'];
      this.empId = params['empId'];
      this.GetByIdEmployeeExperienceDetails(this.ExperienceId);
      if (this.mode == 'view') {
        this.hide = true;
      }


      if(+localStorage.getItem('EmployeeId')>0){     
        this.EmployeeId = +localStorage.getItem('EmployeeId')
        localStorage.removeItem('EmployeeId');
      } 
      
      if((this.empId)>0){       
        this.EmployeeId = this.empId;
      }        
      
      if(this.EmployeeId > 0){
        this.ChangeOfEmployee(this.EmployeeId)
        this.GetEmployeeExperienceDetails(0,0);
      }

      if (this.mode == 'view') {    
        this.title2 = 'View Employee Exp details'
      }
  
      if (this.mode == 'edit') {       
        this.title2 = 'Update Employee Exp details'
      }
  

    });
  }

  getAllDefaultData() {

    // this.data = this.userService.GetAllEmployees();
    // this.data.subscribe(
    //   (response: any) => {
    //     this.AllEmployeeList = response;
    //   })

    this.data = this.userService.GetAllhrmsfixedCodes('Qualification Name');
    this.data.subscribe(
      (response: any) => {
        this.Qualificationlist = response;
      })

      this.data = this.userService.getAllDistrictName();
      this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

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
  }



  SaveEmplExperience(EmplExperience: NgForm) {
    EmplExperience.value.EXPR_DOC_UPLOAD_PATH = this.getFeasibilityPDFUrl1();
    EmplExperience.value.EXPR_TOTAL_YEARS = this.DateDiff;
    EmplExperience.value.EXPR_EMP_ID_FK = this.EmployeeId ;

    if(EmplExperience.value.EXPR_FROM > EmplExperience.value.EXPR_TO){
      swal('Warning!', 'From date should be less than To Date.', 'warning');
      return;
    }


    if (EmplExperience.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      
      this.data = this.userService.PostEmployeExperienceDetails(EmplExperience.value);
      this.data.subscribe(
        (response) => {
          EmplExperience.reset();
          EmplExperience.resetForm();
          EmplExperience.form.markAsPristine();
          EmplExperience.form.markAsUntouched();
          swal('Success!', 'Employee Experience Added Successfully .', 'success');
          //this.router.navigate(['/home/serviceregister/experiencedetails']);
          this.GetEmployeeExperienceDetails(this.itemsPerPage, this.currentPage);
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


  UpdateEmplExperience(EmplExperience: NgForm) {
    swal({
      title: 'Are you sure?', text: "You want to Update!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.value) {

        EmplExperience.value.EXPR_DOC_UPLOAD_PATH = this.getFeasibilityPDFUrl1();
        EmplExperience.value.EXPR_TOTAL_YEARS = this.DateDiff;
        EmplExperience.value.EXPR_EMP_ID_FK = this.EmployeeId ;

        if (EmplExperience.invalid) {
          this.formInvalid = true;
          swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
          return;
        }
        else {
          console.log(JSON.stringify(EmplExperience.value));
          this.data = this.userService.UpdateEmployeeExperienceDetails(EmplExperience.value, this.ExperienceId);
          this.data.subscribe(
            (response) => {
              EmplExperience.reset();
              EmplExperience.resetForm();
              EmplExperience.form.markAsPristine();
              EmplExperience.form.markAsUntouched();
              swal('Success!', 'Employee Experience Updated Successfully .', 'success');
              //this.router.navigate(['/home/serviceregister/experiencedetails']);
              this.GetEmployeeExperienceDetails(this.itemsPerPage, this.currentPage);
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


  imageUpload1(file: FileList) {
    debugger;
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF|.JPEG|.jpeg)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //  this.IS_UploadPath = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('EXPR_DOC_UPLOAD_PATH');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('EXPR_DOC_UPLOAD_PATH');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getFeasibilityPDFUrl1() {
    let imagename = null;
    try {
      imagename = document.getElementById('EXPR_DOC_UPLOAD_PATH');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  GetByIdEmployeeExperienceDetails(EXPR_ID) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdEmployeeExperienceDetails(EXPR_ID);
    this.data.subscribe(
      (response: any) => {
        this.e = response;
        if (this.e.EXPR_FROM != null)
          this.e.EXPR_FROM = ((this.e.EXPR_FROM).split('T'))[0];
        if (this.e.EXPR_TO != null)
          this.e.EXPR_TO = ((this.e.EXPR_TO).split('T'))[0];
          this.ChangeOfDivision(response.EMP_DIVISION_ID)
        this.ChangeOfEmployee(response.EXPR_EMP_ID_FK);
        this.changeofdate()
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  changeofdate() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetDateDifference(this.e.EXPR_FROM, this.e.EXPR_TO);
    this.data.subscribe(
      (response: any) => {
        this.DateDiff = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });

  }

  ChangeOfDivision(DivisionId){    
    this.data = this.userService.GetAllEmployees(DivisionId);
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;
      })
  }

  Cancel(){   
    this.router.navigate(['/home/serviceregister/experiencedetails']);
  }


  GetEmployeeExperienceDetails(itemsPerPage: number, pageNo: number) {
    //this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeeExperience(itemsPerPage, pageNo,this.EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.EmployeeExperienceDetails = response.EMP_Experience;
        //this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;

        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
  resetFormFields() {
    this.e = {};
  }

  delete(EXPR_ID) {
    debugger;
    swal({
      title: 'Are you sure?', text: "You want to delete! with Id : "+EXPR_ID, type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteEmployeeExperienceDetails(EXPR_ID);
        this.data.subscribe(
          (response: any) => {
            this.GetEmployeeExperienceDetails(this.itemsPerPage, this.currentPage);
            this.resetFormFields();
          },
        );
      }
    })
  }


  gotoAdd(EmployeeId){      
    localStorage.setItem('EmployeeId',EmployeeId);  
    this.router.navigate(['/home/serviceregister/experiencedetails-form']);
  }


}
