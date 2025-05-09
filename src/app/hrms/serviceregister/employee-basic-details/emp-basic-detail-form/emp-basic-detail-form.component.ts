import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-emp-basic-detail-form',
  templateUrl: './emp-basic-detail-form.component.html',
  styleUrls: ['./emp-basic-detail-form.component.css']
})
export class EmpBasicDetailFormComponent implements OnInit {

  title = "Add Employee Details";
  data: any = {};
  genderlist: any = [];
  maritalStatuslist: any = [];
  bloodgrouplist: any = [];
  castelist: any = [];
  employementsourcelist: any = [];
  employementquotalist: any = [];
  employemnetreslist: any = [];
  departmentlist: any = [];
  e: any = {};
  RelName: string = '';
  CasteCategory: string = '';
  formInvalid: boolean = false;
  fileToUpload: File = null;
  languagelist: any = []
  ScaleList: any = [];
  DesignationList: any = [];
  mode: any;
  EmployeeId: any;
  hide: boolean;
  DistrictsList: any = [];

  employeetype: any = [];
  employeegroup: any = [];
  employeeCategory: any = [];
  yes: boolean = false;
  lang1: any;
  lang2: any;
  lang3: any;
  BasicSalary : number =0;
  AllEmployeeList: any =[];
  slabeDet : any ;

  PresentData : any =[];
  EmplAge : number;
  savedisable : boolean = false;
  EMP_EMPLOYEE_CODE: any;
  EMP_EMPLOYEE_ID: any;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe:TitleCasePipe) { }

  ngOnInit() {
    this.getDegaultData()

    this.route.params.subscribe(params => {
      this.EmployeeId = params['id'];
      this.mode = params['mode'];
      this.GetByIdEmployeeDetails(this.EmployeeId);

      if (this.mode == 'view' || this.mode == 'addressview' || this.mode == 'dependentview' || 
      this.mode == 'qualificationview' || this.mode == 'experienceview' || this.mode =='leaveview'
      || this.mode == 'bankview' || this.mode == 'verview') {
        this.hide = true;
      }
    });

    if(this.mode == 'view')
    this.title = 'View Employee Details';

    if(this.mode == 'edit')
    this.title = 'Update Employee Details'
  }

  getDegaultData() {

     this.data = this.userService.GetAllEmployeeses();
    this.data.subscribe(
      (response: any) => {
        this.AllEmployeeList = response;
      })

    //Get All departments
    this.data = this.userService.GetAllhrmsfixedCodes('GENDER');
    this.data.subscribe(
      (response: any) => {
        this.genderlist = response;
      })

    this.data = this.userService.GetAllhrmsfixedCodes('MARTIAL STATUS');
    this.data.subscribe(
      (response: any) => {
        this.maritalStatuslist = response;
      })


    this.data = this.userService.GetAllhrmsfixedCodes('BLOOD GROUP IDENTITY');
    this.data.subscribe(
      (response: any) => {
        this.bloodgrouplist = response;
      })


    this.data = this.userService.GetAllCasteCodes();
    this.data.subscribe(
      (response: any) => {
        this.castelist = response;
      })

    this.data = this.userService.GetAllhrmsfixedCodes('EMPLOYEMENT_SOURCE');
    this.data.subscribe(
      (response: any) => {
        this.employementsourcelist = response;
      })


    this.data = this.userService.GetAllhrmsfixedCodes('EMPLOYEMENT_SOURCE');
    this.data.subscribe(
      (response: any) => {
        this.employementsourcelist = response;
      })


    this.data = this.userService.GetAllhrmsfixedCodes('Employment Quota');
    this.data.subscribe(
      (response: any) => {
        this.employementquotalist = response;
      })

    this.data = this.userService.GetAllhrmsfixedCodes('Employement Reservation');
    this.data.subscribe(
      (response: any) => {
        this.employemnetreslist = response;
      })

    this.data = this.userService.GetAllDepartments();
    this.data.subscribe(
      (response: any) => {
        this.departmentlist = response.Result;
      })

    this.data = this.userService.GetAllhrmsfixedCodes('Language');
    this.data.subscribe(
      (response: any) => {
        this.languagelist = response;
      })

    this.data = this.userService.GetAllhrmsfixedCodes('EMP TYPE');
    this.data.subscribe(
      (response: any) => {
        this.employeetype = response;
      })

    this.data = this.userService.GetAllhrmsfixedCodes('EMP GROUP');
    this.data.subscribe(
      (response: any) => {
        this.employeegroup = response;
      })

    this.data = this.userService.GetAllhrmsfixedCodes('EMP CATEGORY');
    this.data.subscribe(
      (response: any) => {
        this.employeeCategory = response;
      })



    this.data = this.userService.GetAllScales();
    this.data.subscribe(
      (response: any) => {
        this.ScaleList = response;
      })

    this.data = this.userService.GetAllDesignation();
    this.data.subscribe(
      (response: any) => {
        this.DesignationList = response;
      })

    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

  }


  onchangeCate(CasteId) {
    debugger;
    if(CasteId != null){    
    for (let i = 0; i <= this.castelist.length; i++) {
      if (this.castelist[i].caste_id == CasteId) {
        this.RelName = this.castelist[i].relg_name;
        this.CasteCategory = this.castelist[i].code_value;
        return;
      }
    }
  }
  }


  // this.data = this.userService.calculateAge(this.a.Adv_DOB);
  // this.data.subscribe(
  //   (response: any) => {
  //     response;        
  //     this.userAge = response;        
  //     if(this.userAge > 18){
  //       this.SaveAdvocate(Advocate)
  //     }
  //     else{
  //       document.getElementById('loader-spinner').style.display = "none";    
  //       swal('Warning!', "Age cannot be less than 18 years", 'warning');
  //     }
  //   })


  dateChange(Date){  
    this.data = this.userService.calculateAge(Date);
    this.data.subscribe(
    (response: any) => {
      response;        
      this.EmplAge = response;        
      if(this.EmplAge > 18){       
      }
      else{
        this.e.EMP_DATE_OF_BIRTH = null;
        document.getElementById('loader-spinner').style.display = "none";    
        swal('Warning!', "Age cannot be less than 18 years", 'warning');
      }
    })

  }


  SaveEmplDetails(EMPLDetails: NgForm) {
    debugger;
    this.savedisable = true;

    var list = this.AllEmployeeList.filter(a =>a.EMP_EMPLOYEE_CODE == EMPLDetails.value.EMP_EMPLOYEE_CODE)
    if(list.length >0){
      swal('Warning!', 'EmployeeCode already exist.', 'warning');
      this.savedisable = false;
      return;
    }    

    EMPLDetails.value.EMP_FIRST_NAME = this.titlecasePipe.transform(EMPLDetails.value.EMP_FIRST_NAME);
    EMPLDetails.value.EMP_MIDDLE_NAME = this.titlecasePipe.transform(EMPLDetails.value.EMP_MIDDLE_NAME);
    EMPLDetails.value.EMP_LAST_NAME = this.titlecasePipe.transform(EMPLDetails.value.EMP_LAST_NAME);

    EMPLDetails.value.PhotoUploadPath1 = this.getFeasibilityPDFUrl();
    EMPLDetails.value.DocumentUploadPath1 = this.getFeasibilityPDFUrl1();
    EMPLDetails.value.SignaturePath = this.getFeasibilityPDFUrl3();
    EMPLDetails.value.EMP_APPNT_BASIC_PAY = this.BasicSalary;        

    if (EMPLDetails.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      this.savedisable = false;
      return;
    }
    if(EMPLDetails.value.Langauge1_MotherTo == undefined &&  EMPLDetails.value.Langauge1_Read == undefined &&
      EMPLDetails.value.Langauge1_Write == undefined  && EMPLDetails.value.Langauge1_Speak == undefined )
      {
        swal('Warning!', 'Atleast select any one option of Langauage1', 'warning');
        this.savedisable = false;
      return;
      }

      if(EMPLDetails.value.Langauge2 != undefined){
        if( EMPLDetails.value.Langauge2_Read == undefined &&
          EMPLDetails.value.Langauge2_Write == undefined  && EMPLDetails.value.Langauge2_Speak == undefined )
          {
            swal('Warning!', 'Atleast select any one option of Langauage2', 'warning');
            this.savedisable = false;
          return;
          }
      }

      if(EMPLDetails.value.Langauge3 != undefined){
        if( EMPLDetails.value.Langauge3_Read == undefined &&
          EMPLDetails.value.Langauge3_Write == undefined  && EMPLDetails.value.Langauge3_Speak == undefined )
          {
            swal('Warning!', 'Atleast select any one option of Langauage3', 'warning');
            this.savedisable = false;
          return;
          }
      }

      this.data = this.userService.PostEmployeeDetails(EMPLDetails.value);
      this.data.subscribe(
        (response) => {
          console.log(response.EMPLDetails);
          this.EMP_EMPLOYEE_ID = response.EMP_EMPLOYEE_CODE;
          EMPLDetails.reset();
          EMPLDetails.resetForm();
          EMPLDetails.form.markAsPristine();
          EMPLDetails.form.markAsUntouched();
          this.savedisable = false;
          swal('Success!', 'Employee ID.' + response.Result+ ' details has been saved successfully.', 'success');
          this.router.navigate(['/home/serviceregister']);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401) {
            this.savedisable = false;
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            this.savedisable = false;
            swal('Warning!', error.error.Message, 'warning');
          }
        });

  }


  UpdateEmplDetails(EMPLDetails: NgForm) {
    EMPLDetails.value.EMP_APPNT_BASIC_PAY = this.BasicSalary;
    
    // if(EMPLDetails.value.Langauge1_MotherTo != null ||  EMPLDetails.value.Langauge1_Read !=null ||
    //   EMPLDetails.value.Langauge1_Write !=null || EMPLDetails.value.Langauge1_Speak)
    //   {
    //     swal('Warning!', 'Atleast select any one option', 'warning');
    //   return;
    //   }

    if (EMPLDetails.invalid) {
          this.formInvalid = true;
          swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
          this.savedisable = false;
          return;
        }

    swal({
      title: 'Are you sure?', text: "You want to Update!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, Update it!'
    }).then((result) => {
      if (result.value) {
        EMPLDetails.value.PhotoUploadPath1 = this.getFeasibilityPDFUrl();
        EMPLDetails.value.DocumentUploadPath1 = this.getFeasibilityPDFUrl1();
        EMPLDetails.value.SignaturePath = this.getFeasibilityPDFUrl3();        
        EMPLDetails.value.EMP_APPNT_BASIC_PAY = this.BasicSalary; 

        if (EMPLDetails.invalid) {
          this.formInvalid = true;
          swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
          return;
        }
        else {         
          this.data = this.userService.UpdateEmployeeDetails(EMPLDetails.value, this.EmployeeId);
          this.data.subscribe(
            (response) => {
              EMPLDetails.reset();
              EMPLDetails.resetForm();
              EMPLDetails.form.markAsPristine();
              EMPLDetails.form.markAsUntouched();
              swal('Success!', 'Employee Updated  Successfully .', 'success');
              this.router.navigate(['/home/serviceregister']);
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



  imageUpload(file: FileList) {
    debugger;
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF|.JPEG|.PNG|.JPG|.jpeg|.png|.jpg)$/;

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
          // console.log(response);
          // this.app.APP_PA_PhotoErrorMessage="";
          this.e.PhotoUploadPath1 = this.userService.rootUrl + '/Documents/Temp/' + this.getFeasibilityPDFUrl();

        }, (error) => {
          let i: any = document.getElementById('PhotoUploadPath1');
          i.value = "";
          if (error.status == 400) {
            //this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('PhotoUploadPath1');
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
      imagename = document.getElementById('PhotoUploadPath1');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
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
          // console.log(response);
          // this.app.APP_PA_PhotoErrorMessage="";                  

        }, (error) => {
          let i: any = document.getElementById('DocumentUploadPath1');
          i.value = "";
          if (error.status == 400) {
            //this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('DocumentUploadPath1');
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
      imagename = document.getElementById('DocumentUploadPath1');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  imageUpload2(file: FileList) {
    debugger;
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF|.JPEG|.PNG|.JPG|.jpeg|.png|.jpg)$/;
    
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
          // console.log(response);
          // this.app.APP_PA_PhotoErrorMessage="";                  

        }, (error) => {
          let i: any = document.getElementById('SignaturePath');
          i.value = "";
          if (error.status == 400) {
            //this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('SignaturePath');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getFeasibilityPDFUrl3() {
    let imagename = null;
    try {
      imagename = document.getElementById('SignaturePath');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  GetByIdEmployeeDetails(EmployeeId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdEmployeeDetails(EmployeeId);
    this.data.subscribe(
      (response: any) => {
        this.e = response;
        document.getElementById('loader-spinner').style.display = "none";
        this.ChangeOfScale(response.EMP_Scale_FK)
        this.BasicSalary = response.EMP_BASIC_PAY; 
        this.onchangeCate(response.EMP_CASTE_ID)      

        if (this.e.EMP_DATE_OF_BIRTH != null)
          this.e.EMP_DATE_OF_BIRTH = ((this.e.EMP_DATE_OF_BIRTH).split('T'))[0];

        if (this.e.EMP_D_O_J != null)
          this.e.EMP_D_O_J = ((this.e.EMP_D_O_J).split('T'))[0];

        if (this.e.EMP_CONF_ORD_DATE != null)
          this.e.EMP_CONF_ORD_DATE = ((this.e.EMP_CONF_ORD_DATE).split('T'))[0];

       
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });



      this.data = this.userService.GetPresentData(EmployeeId);
      this.data.subscribe(
        (response: any) => {          
         this.PresentData = response;        
        })
  }


  ChangeHandi(EMP_HANDICAPPED_IND) {
    if (EMP_HANDICAPPED_IND == 'Y')
      this.yes = true;
    if (EMP_HANDICAPPED_IND == 'N')
      this.yes = false;
  }


  ChangeofLangu1(lang1) {
    this.lang1 = lang1;
  }


  ChangeofLangu2(lang2) {
    this.lang2 = lang2
    if (this.lang2 == this.lang1) {
      this.e.Langauge2 = 'undefined';
      swal('Warning!', "Language has been already selected", 'warning');
    }

  }

  ChangeofLangu3(lang3) {
    debugger;
    this.lang3 = lang3
    if ((this.lang3 == this.lang2) || (this.lang3 == this.lang1)) {
      this.e.Langauge3 = 'undefined';
      swal('Warning!', "Language has been already selected", 'warning');
    }
  }


  Cancel(){   
    this.router.navigate(['/home/serviceregister']);
  }

  Back(){
    // if(this.mode == 'addressview')
    // this.router.navigate(['/home/serviceregister/address-details']);
    // else if(this.mode == 'dependentview')
    // this.router.navigate(['/home/serviceregister/dependentdetails']);
    // else if(this.mode == 'qualificationview')
    // this.router.navigate(['/home/serviceregister/qualification']);
    // else if(this.mode == 'experienceview')
    // this.router.navigate(['/home/serviceregister/experiencedetails']);
    // else if(this.mode == 'leaveview')
    // this.router.navigate(['/home/serviceregister/leavedetails']); 
    // else if(this.mode == 'bankview')
    // this.router.navigate(['/home/serviceregister/bankdetails']);  
    // else if(this.mode == 'verview')
    // this.router.navigate(['/home/serviceregister/policeverification']);      
    // else
    this.router.navigate(['/home/serviceregister']);   
    
  }

  ChangeOfScale(ScaleId){    
    this.data = this.userService.GetBasicSalary(ScaleId);
    this.data.subscribe(
      (response: any) => {
       
        this.BasicSalary = response[0].min_value;
        this.slabeDet = response[0].Pay_Scale_Slab;
      })
  }
}
