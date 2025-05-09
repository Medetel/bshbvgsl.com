import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  data: any=[];
  DistrictsList: any=[];
  detailsEmployee: any=[];
  a : any ={};
  AllEmployeeList: any=[];
  DesignationList: any=[];
  ScaleList: any=[];
  formInvalid: boolean;
  fileToUpload: File;
  BasicSalary: any;
  mode: string;
  PROMOTION_LIST_ID: number;
  title: string;
  BackId: any;
  hide:any;
  routing : string = null;
  existingpost: any;
  promotingpost: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.getAllrequiredData()

     this.route.params.subscribe(params => {
      this.PROMOTION_LIST_ID = params['PROMOTION_LIST_ID'];
      this.BackId = params['BackId'];
      this.mode = params['mode'];

      if (this.PROMOTION_LIST_ID > 0) {

        this.GetByIdPromotion(this.PROMOTION_LIST_ID)
      }
    });
    if (this.mode == 'View') {
      this.title = "View Caste ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Caste ";
    }
    this.routing = localStorage.getItem('switchurl');
 localStorage.removeItem('switchurl');
  }

  getAllrequiredData() {
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })


    this.data = this.userService.GetAllDesignation();
    this.data.subscribe(
      (response: any) => {
        this.DesignationList = response;
      })

    this.data = this.userService.GetAllScales();
    this.data.subscribe(
      (response: any) => { 
        this.ScaleList = response;
      })
      this.data = this.userService.GetAllhrmsfixedCodesexisting('EMP TYPE');
 this.data.subscribe(
 (response: any) => {
 this.existingpost = response;
 })
 this.data = this.userService.GetAllhrmsfixedCodespromoting('EMP TYPE');
 this.data.subscribe(
 (response: any) => {
 this.promotingpost = response;
 })

      this.a.EMP_DIVISION_ID = +localStorage.getItem('divisonId');
      this.ChangeOfDivision(this.a.EMP_DIVISION_ID)
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

  ChangeOfDivision(DivisionId){    
    this.data = this.userService.GetAllEmployees(DivisionId);
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;
      })
  }

  SavePromotion(PromoDetails:NgForm){  
    PromoDetails.value.PRSNT_DESIGNATION_ID= this.detailsEmployee.EMP_DESIGNATION_ID
    PromoDetails.value.PRSNT_PAY_SCALE_ID= this.detailsEmployee.EMP_Scale_FK
    PromoDetails.value.PRSNT_BASIC_PAY = this.detailsEmployee.EMP_BASIC_PAY
    PromoDetails.value.DIVISION_ID = this.a.EMP_DIVISION_ID
    PromoDetails.value.LAST_PROMOTION_DATE = this.detailsEmployee.EMP_Last_Promotiont_Date
    PromoDetails.value.DOC_UPLOAD_PATH = this.getFeasibilityPDFUrl();
   
    if (PromoDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {
      this.data = this.userService.PostPromotionDetails(PromoDetails.value);
      this.data.subscribe(
        (response) => {
          PromoDetails.reset();
          PromoDetails.resetForm();
          PromoDetails.form.markAsPristine();
          PromoDetails.form.markAsUntouched();
          swal('Success!', 'Promotion Details Added Successfully .', 'success');
          this.router.navigate(['/home/promotion']);
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

  GetByIdPromotion(PROMOTION_LIST_ID) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdPromotion(PROMOTION_LIST_ID);
    this.data.subscribe(
      (response: any) => {
        this.a = response;
        this.ChangeOfDivision(this.a.EMP_DIVISION_ID);
        this.ChangeOfEmployee(this.a.PROMOTION_EMP_ID);
        if (this.a.PROMOTION_WEF != null)
        this.a.PROMOTION_WEF = ((this.a.PROMOTION_WEF).split('T'))[0];
        if (this.a.PROMOTION_DUE_DATE != null)
        this.a.PROMOTION_DUE_DATE = ((this.a.PROMOTION_DUE_DATE).split('T'))[0];
          document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
           document.getElementById('loader-spinner').style.display = "none";
      });
  }

  UpdatePromotion(PromoDetails: NgForm) {
    debugger;
    PromoDetails.value.DOC_UPLOAD_PATH = this.getFeasibilityPDFUrlEdit();
    this.data = this.userService.UpdatePromotion(this.PROMOTION_LIST_ID,PromoDetails.value);
    this.data.subscribe(
      (response) => {
        swal('Success!', ' Promotion Details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/promotion']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }
      });
  }

  imageUpload(file: FileList) {
    debugger;
        let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    
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
          data.append("PromotionUpload", file.item(0));
          let x = this.userService.uploadpromotion(data);
          x.subscribe(
            (response) => {
              // console.log(response);
              // this.app.APP_PA_PhotoErrorMessage="";
    
            }, (error) => {
              let i: any = document.getElementById('DOC_UPLOAD_PATH');
              i.value = "";
              if (error.status == 400) {
                //this.FeasibilityPDFUrl = "assets/images/image-default.png";
                swal('Warning!', error.error.Message, 'warning');
              }
            });
        }
        else {
          let i: any = document.getElementById('DOC_UPLOAD_PATH');
          i.value = "";
          if (!uploadedFilename.match(regex))
            swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
          else if (size > 2048)
            swal('Warning!', "Please upload image file less than 2mb", 'warning');
        }
      }
    
    
    
      getFeasibilityPDFUrl() {
        let imagename = null;
        try {
          imagename = document.getElementById('DOC_UPLOAD_PATH');
          return imagename.files[0].name;
        }
        catch (e) {
          return null;
        }
      }

      getFeasibilityPDFUrlEdit() {
        let imagename = null;
        try {
          imagename = document.getElementById('DOC_UPLOAD_PATH');
          return imagename.files[0].name;
        }
        catch (e) {
          return null;
        }
      }



      ChangeOfScale(ScaleId){    
        this.data = this.userService.GetBasicSalary(ScaleId);
        this.data.subscribe(
          (response: any) => {
            console.log('response');
            console.log(response);
            this.BasicSalary = response[0].min_value;             
            this.a.PROMOTION_BASIC_PAY = this.BasicSalary;
                      
          })
      }
      Back(){ 
        if(this.routing != null)
        this.router.navigate([this.routing]);
        else
        this.router.navigate(['/home/promotion']); 
        }
}
