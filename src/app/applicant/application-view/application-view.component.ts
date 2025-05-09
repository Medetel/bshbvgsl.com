import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.css']
})
export class ApplicationViewComponent implements OnInit {
  PD: any;
  APP_Id: any;
  NO_Id: any;
  AFD;
  title = "Application - View";
  app: any = {};
  data: any;
  fileToUpload: File = null;
  formInvalid: boolean = false;
  PAPhotoimageUrl: string = "assets/images/image-default.png";
  mode: string = "save";
  // PayMode: any;
  LO_Id:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.mode = params['mode'];
      this.APP_Id = params['APP_Id'];
      this.NO_Id = params['NO_Id'];
       this.LO_Id = params['LO_Id']
    });

    if (this.APP_Id != null && this.mode != 'Appview' && this.mode != 'lottery') {
      this.GetApplicationFormDetails(this.APP_Id);
      this.getAppdraftViewProjectDetails(this.NO_Id,this.APP_Id);
    }
    if (this.APP_Id != null && this.mode == 'lottery') {
      this.GetApplicationScrutinyFormDetails(this.APP_Id);
      this.getAppViewProjectDetails(this.NO_Id,this.APP_Id);
    }
    
    if (this.APP_Id != null && this.mode == 'Appview') {
      this.GetApplicationScrutinyFormDetails(this.APP_Id);
      this.getAppViewProjectDetails(this.NO_Id,this.APP_Id);
    }

  }


  getAppViewProjectDetails(NO_Id,APP_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAppViewProjectDetails(NO_Id,APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.PD = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  getAppdraftViewProjectDetails(NO_Id,APP_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAppdraftViewProjectDetails(NO_Id,APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.PD = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetApplicationFormDetailsForAllot(APP_Id) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getApplicationFormDetails(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.mode = "Allot";
        this.AFD = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  GetApplicationFormDetails(APP_Id) {
    debugger
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getApplicationFormDetails(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.AFD = response;
        if (this.AFD.APP_IsJoint == 'N')
          this.AFD.APP_IsJoint = 'No';
        else
          this.AFD.APP_IsJoint = 'Yes';
        

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetApplicationScrutinyFormDetails(APP_Id) {
    debugger
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetApplicationScrutinyFormDetails(APP_Id);
    this.data.subscribe(
      (response: any) => {
        this.AFD = response;
        if (this.AFD.APP_IsJoint == 'N')
          this.AFD.APP_IsJoint = 'No';
        else
          this.AFD.APP_IsJoint = 'Yes';
       
        
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  Edit(APP_Id,PD_Id) {
    this.router.navigate(['home/allotment/applicationedit/', APP_Id, this.NO_Id,PD_Id]);
  }

  // GetKhbchallan(AppNo){
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.userService.GetKhbchallan(AppNo)
  //     .subscribe(
  //       (response:any) => {
  //       this.ChallanCopies=response;
  //       this.UpdatePaymentDetails();
  //       this.Total = parseFloat(this.ChallanCopies.PC_AppFee) + parseFloat(this.ChallanCopies.PC_RegFee || 0)+parseFloat(this.ChallanCopies.PC_InitialDeposit || 0);
  //       this.today = new Date();
  //       this.Amtwords=this.convertNumberToWords(this.Total);
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //       this.errorHandler.HandlerError(error);
  //     });
  // }
  // myFunction(){
  //   window.print();
  // }

  // UpdatePaymentDetails() {
  //   this.payment.APP_No=this.ChallanCopies.APP_No;
  //   this.payment.APP_OTP=this.ChallanCopies.APP_OTP;
  //   this.payment.APP_PA_MobileNo=this.ChallanCopies.APP_PA_MobileNo;
  //   this.payment.APP_UTR_No=this.ChallanCopies.APP_UTR_No;
  //   this.payment.Total_Amount=this.ChallanCopies.PC_InitialDeposit+this.ChallanCopies.PC_AppFee+this.ChallanCopies.PC_RegFee;
  //   this.payment.APP_Payment_Trans_Date=new Date();
  //     // if (!form.invalid) {
  //     // payment.APP_Challan_Doc = this.getAPPChallanDoc();
  //     document.getElementById('loader-spinner').style.display = "block";
  //     // form.value.PD_Feasibility_Report = this.getFeasibilityPDFUrl();
  //     this.userService.UpdateApplicantDetails(this.payment)
  //       .subscribe(
  //         (data:any) => {
  //           document.getElementById('loader-spinner').style.display = "none";
  //           if(data=="Success")
  //           swal('','Your application is submitted to KHB.<br>Payment Confirmation and receipt along with User id and Password will be sent to you on your registered <br> mobile number and email id. <br> Thank You!','success');
  //           else
  //           swal('Warning!',data , 'warning');
           
  //         }, (error) => {
  //           document.getElementById('loader-spinner').style.display = "none";
  //           // if(error.error.Message="Payment Details Already Entered")
  //           // swal('Warning!', error.error.Message, 'warning');
  //           if(error.status == 401){
  //            this.errorHandler.HandlerError(error);}
  //         });
  //       // }else
  //       // document.getElementById('loader-spinner').style.display = "none";
  //       // this.formSubmitted = true;
  //   }
}
