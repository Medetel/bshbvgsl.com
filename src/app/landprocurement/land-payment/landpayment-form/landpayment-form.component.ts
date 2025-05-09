import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-landpayment-form',
  templateUrl: './landpayment-form.component.html',
  styleUrls: ['./landpayment-form.component.css']
})
export class LandpaymentFormComponent implements OnInit {
  mode: any;
  title = "Add Land payment";
  LandOwnerDetail: any = [];
  p: any = {};
  data: any = {};
  ProposalFor: string;
  formInvalid: boolean = false;
  PD_Id: number
  hide: boolean = false;
  FileList: any = [];
  f: any = [];
  LandOwnerPaymentDetailsList: any = {};
  LandRecordDetailswithLTP: any = [];
  LODetails: any = {};
  Payment: any = {};
  Pay_File_Show: any;
  fileToUpload: File = null;
  LandOwner: any = [];
  landOId: any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.PD_Id = params['PD_Id'];
    })
    this.GetProjectDetailsforPayment(this.PD_Id)
    // this.GetLandOwnerInfo(this.LOD_Id)
    // this.GetAllLandOwnerPaymentList()
  }

  GetLandOwnerInfo(LO_Id) {
    this.data = this.userService.getLandOwnerInfo(LO_Id);
    this.data.subscribe(
      (response: any) => {
        this.LandOwnerDetail = response;
      });
  }

  // SaveLandOwnerPayment(LandOwnerPayment : NgForm){
  //   //landownerform.value.LOFU_FileName = this.getimageUpload1(); 

  //     if(LandOwnerPayment.invalid)
  //   {
  //     this.formInvalid = true;
  //     swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
  //     return;
  //   }   

  //   else{    
  //     LandOwnerPayment.value.LOP_LOD_Id_FK =  this.LOD_Id ;

  //       this.data = this.userService.PostLandOwnerPaymentDetails(LandOwnerPayment.value);    
  //       this.data.subscribe(
  //     (response) => {   

  //       LandOwnerPayment.reset();
  //       LandOwnerPayment.resetForm();
  //       LandOwnerPayment.form.markAsPristine();
  //       LandOwnerPayment.form.markAsUntouched();        
  //       swal('Success!', 'Land Owner Payment Added Successfully .', 'success');
  //       //this.router.navigate(['/home/landdetails']) ; 
  //       this.GetAllLandOwnerPaymentList();  
  //       document.getElementById('loader-spinner').style.display = "none";           
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //       if (error.status == 401) {
  //         this.errorHandler.handleError(error);
  //       }
  //       else if (error.status == 400) {
  //         swal('Warning!', error.error.Message, 'warning');
  //       }
  //     });
  //   }
  // }

  // GetAllLandOwnerPaymentList(){
  //   //this.isSearch = false;
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetAllLandOwnerPaymentListOfPerticular(this.LOD_Id);
  //   this.data.subscribe(
  //        (response: any) => {           
  //         this.LandOwnerPaymentDetailsList= response.Result;         
  //         // this.totalItems= response.TotalItemsCount;
  //         // this.itemsPerPage = itemsPerPage;
  //         // this.currentPage = pageNo;   
  //         //GetAllLandOwnerPaymentListOfPerticular 

  //         document.getElementById('loader-spinner').style.display = "none";
  //        },    
  //         (error) => {
  //           document.getElementById('loader-spinner').style.display = "none";
  //         }
  //     );    
  // }

  GetProjectDetailsforPayment(PD_Id) {
    
    this.LandRecordDetailswithLTP = [];
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetProjectDetailsforPayment(PD_Id, 0)
      .subscribe(
        (data: any) => {

          document.getElementById('loader-spinner').style.display = "none";
          this.LandRecordDetailswithLTP = data;
          for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
            this.LandRecordDetailswithLTP[i].Select = false;
          }
          //   if (data.LandtoTownPlanModel != null) {
          //     this.LTP = data.LandtoTownPlanModel;
          //     if (this.LTP.LTP_Date != null)
          //       this.LTP.LTP_Date = ((this.LTP.LTP_Date).split('T'))[0];
          //     if (this.LTP.LTP_File != null)
          //       this.LTP_File_Show = "show";
          //  }
          //   for (let i = 0; i < this.LandRecordDetailswithoutLTP.length; i++) {
          //     if (this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk != null) {
          //       this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk = true;
          //     }
          //     else { this.LandRecordDetailswithoutLTP[i].LR_LTP_Id_Fk = false; }
          //   }
          //this.isUpdate=true;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetLandOwnerDetailsforPayment(LR_Id: any, LOD_Id: any) {
    
    if (LOD_Id == this.landOId) {
      this.landOId = LOD_Id
      return true;
    }
    this.LODetails = {};
    this.LODetails = null;
    this.landOId = LOD_Id
    this.Pay_File_Show = "hide";
    this.LODetails = {};
    this.p = {};
    this.LandOwner = [];
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetLandOwnerDetailsforPayment(LR_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.LODetails = data;
          document.getElementById('loader-spinner').style.display = "none";
          this.LandOwner = data.LandOwnDetailslist

          if (data.LandOwnDetailsModel != null) {
            this.p = data.LandOwnDetailsModel;
            if (this.p.LOP_File != null)
              this.Pay_File_Show = "show";
          }
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }


  changeCheckbox(LR_Id, Select, LOD_Id) {
    
    this.GetLandOwnerDetailsforPayment(LR_Id, LOD_Id);
    // for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
    //   if (this.LandRecordDetailswithLTP[i].LR_Id == LR_Id) {
    //     this.LandRecordDetailswithLTP[i].Select = false;
    //   }
    //   else
    //   this.LandRecordDetailswithLTP[i].Select = true;
    // }
    // if (LOD_Id != this.landOId) {
    for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
      if (this.LandRecordDetailswithLTP[i].LR_LOD_Id_Fk != LOD_Id) {
        this.LandRecordDetailswithLTP[i].Select = false;
      }
    }
    // }
    for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
      if (this.LandRecordDetailswithLTP[i].LR_Id == LR_Id) {
        if (this.LandRecordDetailswithLTP[i].Select == false) {
          this.LandRecordDetailswithLTP[i].Select = true;
          break;
        }
        else { this.LandRecordDetailswithLTP[i].Select = false; }
        break;
      }
    }

    // for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
    //   if (this.LandRecordDetailswithLTP[i].LR_Id != LR_Id) {
    //     this.LandRecordDetailswithLTP[i].Select = false;
    //   }
    // }
  }

  SaveLopPayment(payment) {
    
    payment.LOP_Id_PK = this.LODetails.LOP_Id_PK;
    payment.LOP_LOD_Id_FK = this.LODetails.LOD_Id_PK;
    payment.LOP_File = this.getLTPPDFUrl();
    for (let i = 0; i < this.LandRecordDetailswithLTP.length; i++) {
      if (this.LandRecordDetailswithLTP[i].Select == false) {
        this.LandRecordDetailswithLTP[i].Select = 0;
      }
      else { this.LandRecordDetailswithLTP[i].Select = 1; }
    }
    payment.LandRecordDetailsModel = this.LandRecordDetailswithLTP;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.SaveLopPayment(payment)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', 'Saved Successfully!', 'success');
          this.router.navigate(['/home/landpayment']);
          //this.GetProjectDetailsforLandtoTown(Pd_Id);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  LOPFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    // let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.LayoutPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {        
          // this.app.APP_PA_PhotoErrorMessage="";

        }, (error) => {
          let i: any = document.getElementById('LOP_File');
          i.value = "";
          if (error.status == 400) {
            // this.LayoutPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LOP_File');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }


  getLTPPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LOP_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
}
