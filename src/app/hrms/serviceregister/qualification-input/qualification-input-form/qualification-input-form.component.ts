import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-qualification-input-form',
  templateUrl: './qualification-input-form.component.html',
  styleUrls: ['./qualification-input-form.component.css']
})
export class QualificationInputFormComponent implements OnInit {

  title="Employee Details";
  title2 = "Add Qualification Details"
  QualificationId: number;
  mode: string;
  hide: boolean;
  q : any =[];
  AllEmployeeList: any =[];
  data: any =[];
  detailsEmployee: any =[];
  formInvalid: boolean;
  Qualificationlist: any =[];
  fileToUpload: File;
  DistrictsList: any =[];
  EmployeeQualificationDetails: any =[];
   itemsPerPage: number = 5;
   currentPage: number = 1;
  EmployeeId: number;
  empId: number ;
  leavetypelist: any =[];
  totalItems:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {

    this.getAllDefaultData()

    this.route.params.subscribe(params => {     
      this.QualificationId = params['id'];
      this.mode = params['mode'];
      this.empId = params['empId'];
      this.GetByIdEmployeeQualificationDetails(this.QualificationId);  
      if(this.mode == 'view'){
        this.hide = true;  
        this.title2 =  'View Qualification Details' 
      }

      if(this.mode == 'edit'){
        this.title2 =  'Update Qualification Details' 
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
        this.GetEmployeeQualificationDetails(0,0);
      }

    });    
  }

  getAllDefaultData(){  
   
    this.data = this.userService.getAllDistrictName();
      this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

      this.data = this.userService.GetAllhrmsfixedCodes('Qualification Name');
    this.data.subscribe(
    (response: any) => {   
       this.Qualificationlist= response;        
    })

    this.data = this.userService.GetLeaveTypes();
      this.data.subscribe(
        (response: any) => {
          this.leavetypelist = response;          
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



  SaveEmplQualification(EmplDetails:NgForm){ 
    EmplDetails.value.EMP_DOC_UPLOAD_PATH = this.getFeasibilityPDFUrl1();

    if (EmplDetails.invalid) {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     }
     else { 
      EmplDetails.value.EMP_ID_FK = this.EmployeeId ;   
       this.data = this.userService.PostEmployeeQualificationDetails(EmplDetails.value);
       this.data.subscribe(
         (response) => {
          EmplDetails.reset();
          EmplDetails.resetForm();
          EmplDetails.form.markAsPristine();
          EmplDetails.form.markAsUntouched();
           swal('Success!', 'Employee Qualification Added Successfully .', 'success');
           //this.router.navigate(['/home/serviceregister/qualification']);
           this.GetEmployeeQualificationDetails(this.itemsPerPage, this.currentPage);
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


   UpdateEmplQualification(EmplDetails:NgForm){ 

    swal({
      title: 'Are you sure?', text: "You want to Update!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.value) {

    EmplDetails.value.EMP_DOC_UPLOAD_PATH = this.getFeasibilityPDFUrl1();

    if (EmplDetails.invalid) {
       this.formInvalid = true;
       swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
       return;
     }
     else {    
      EmplDetails.value.EMP_ID_FK = this.EmployeeId ;
       this.data = this.userService.UpdateEmployeeQualificationDetails(EmplDetails.value,this.QualificationId);
       this.data.subscribe(
         (response) => {
          EmplDetails.reset();
          EmplDetails.resetForm();
          EmplDetails.form.markAsPristine();
          EmplDetails.form.markAsUntouched();
           swal('Success!', 'Employee Qualification Updated Successfully .', 'success');
           //this.router.navigate(['/home/serviceregister/qualification']);
           this.GetEmployeeQualificationDetails(this.itemsPerPage, this.currentPage);
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
              let i: any = document.getElementById('EMP_DOC_UPLOAD_PATH');
              i.value = "";
              if (error.status == 400) {              
                swal('Warning!', error.error.Message, 'warning');
              }
            });
        }
        else {
          let i: any = document.getElementById('EMP_DOC_UPLOAD_PATH');
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
          imagename = document.getElementById('EMP_DOC_UPLOAD_PATH');
          return imagename.files[0].name;
        }
        catch (e) {
          return null;
        }
      }


      GetByIdEmployeeQualificationDetails(EMP_QLNF_ID) {       
        document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.GetByIdEmployeeQualicationDetails(EMP_QLNF_ID);
        this.data.subscribe(
          (response: any) => {
            this.q = response;           
            this.ChangeOfDivision(response.EMP_DIVISION_ID)
            this.ChangeOfEmployee(response.EMP_ID_FK);           
            if (this.q.EMP_QLNF_YEAR_PASSING != null)
              this.q.EMP_QLNF_YEAR_PASSING = ((this.q.EMP_QLNF_YEAR_PASSING).split('T'))[0];
              
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
        this.router.navigate(['/home/serviceregister/qualification']);
      }
    

      GetEmployeeQualificationDetails(itemsPerPage: number, pageNo: number) {
    //this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllEmployeeQualifications(itemsPerPage, pageNo,this.EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.EmployeeQualificationDetails = response.EmplQualification;
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
    this.q = {};
  }

  delete(EmployeeId) {
    debugger;
    swal({
      title: 'Are you sure?', text: "You want to delete! with Id : "+EmployeeId, type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteEmployeeQualificationsDetails(EmployeeId);
        this.data.subscribe(
          (response: any) => {
            this.GetEmployeeQualificationDetails(this.itemsPerPage, this.currentPage);
            this.resetFormFields();
          },
        );
      }
    })
  }


  gotoAdd(EmployeeId){      
    localStorage.setItem('EmployeeId',EmployeeId);  
    this.router.navigate(['/home/serviceregister/qualification-form']);
  }


}
