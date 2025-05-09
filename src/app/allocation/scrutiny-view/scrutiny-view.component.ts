import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-scrutiny-view',
  templateUrl: './scrutiny-view.component.html',
  styleUrls: ['./scrutiny-view.component.css']
})
export class ScrutinyViewComponent implements OnInit {
  title = "Scrutiny View"
  Property_Type: any;
  RES_Id: any;
  CA_Id: any;
  s: any;
  PND: any;
  PD_Id: any;
  DSWOID_NO_Id: any;
  PD: any;
  AFD: any = {};
  data: any;
  NO_Id: any;
  APP_Id: any;
  ScrutinyObj: any = {};

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //  this.mode = params['mode'];
      this.APP_Id = params['APP_Id'];
      this.DSWOID_NO_Id = params['S_NotificationID'];
      this.PD_Id = params['S_ProjectID'];
      this.CA_Id = params['S_CA_Id_FK'];
      this.RES_Id = params['S_Reservation_Id_FK'];
      this.Property_Type = params['S_Property_Type'];
    });

    if (this.APP_Id != null)
      this.GetApplicationScrutinyFormDetails(this.APP_Id);
    // this.GetApplicationFormDetails(this.APP_Id);
    this.GETProjectNotificationDetails(this.DSWOID_NO_Id, this.PD_Id);
  }

  GetApplicationScrutinyFormDetails(APP_Id) {
    
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

  GETProjectNotificationDetails(DSWOID_NO_Id, PD_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getProjectNotificationDetails(DSWOID_NO_Id, PD_Id);
    this.data.subscribe(
      (response: any) => {
        this.PND = response;
        if (this.PND.DSWOId_NO_Date != null)
          this.PND.DSWOId_NO_Date = ((this.PND.DSWOId_NO_Date).split('T'))[0];
        if (this.PND.DSWOId_NO_LastDate != null)
          this.PND.DSWOId_NO_LastDate = ((this.PND.DSWOId_NO_LastDate).split('T'))[0];
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  Eligible(APP_Id, IsEligible: any, Note, APP_No,isAdharVer, isPanVer,isCasteVer,isDisVer,isAppAffVer,isLandAcqVer,isExSerVer,isPODVer,isIncomeVer,isResiVer,isAffiVer,isSecAffVer,isManiSigVer,isSecManiSigVer,isbapassVer,isVoterCardVer) {
    document.getElementById('loader-spinner').style.display = "block";
    IsEligible = 'Y';
    Note = "NULL";
    this.ScrutinyObj.IsEligible = IsEligible;
    this.ScrutinyObj.APP_Id = APP_Id;
    this.ScrutinyObj.isAdharVer = isAdharVer;
    this.ScrutinyObj.isPanVer = isPanVer;
    this.ScrutinyObj.isCasteVer = isCasteVer;
    this.ScrutinyObj.isDisVer = isDisVer;
    this.ScrutinyObj.isAppAffVer = isAppAffVer;
    this.ScrutinyObj.isLandAcqVer = isLandAcqVer;
    this.ScrutinyObj.isExSerVer = isExSerVer;
    this.ScrutinyObj.isPODVer = isPODVer;
    this.ScrutinyObj.isIncomeVer = isIncomeVer;
    this.ScrutinyObj.isResiVer = isResiVer;
    this.ScrutinyObj.isAffiVer = isAffiVer;
    this.ScrutinyObj.isSecAffVer = isSecAffVer;
    this.ScrutinyObj.isManiSigVer = isManiSigVer;
    this.ScrutinyObj.isSecManiSigVer = isSecManiSigVer;
    this.ScrutinyObj.isbapassVer = isbapassVer;
    this.ScrutinyObj.isVoterCardVer = isVoterCardVer;
    this.data = this.userService.updateApplicationScrutiny(this.ScrutinyObj);
    this.data.subscribe(
      (response) => {
        // this.APP_Id=response;
        // console.log(Application);
        //  Application.reset();
        //Application.resetForm();
        // this.formInvalid = false;
        swal('Success!', 'Application No.: ' + APP_No + ' is made eligible for allotment.', 'success');
        this.router.navigate(['home/scrutiny/scrutinized/', this.DSWOID_NO_Id, this.PD_Id, this.CA_Id, this.RES_Id, this.Property_Type]);
        // swal1('Success!', 'Application APP-No' +response +'details has been saved successfully.', 'success','route');
        document.getElementById('loader-spinner').style.display = "none";
        
        //this.router.navigate(['home/applicant/applicantview/',this.APP_Id]);
        // window.location.href(='home/applicantview/';
      }, (error) => {
        console.log(error);
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  NotEligible(APP_Id, IsEligible: any, Note, APP_No,isAdharVer, isPanVer,isCasteVer,isDisVer,isAppAffVer,isLandAcqVer,isExSerVer,isPODVer,isIncomeVer,isResiVer,isAffiVer,isSecAffVer,isManiSigVer,isSecManiSigVer,isbapassVer,isVoterCardVer) {
    
    document.getElementById('loader-spinner').style.display = "block";
    IsEligible = 'N';
    this.ScrutinyObj.IsEligible = IsEligible;
    this.ScrutinyObj.APP_Id = APP_Id;
    this.ScrutinyObj.isAdharVer = isAdharVer;
    this.ScrutinyObj.isPanVer = isPanVer;
    this.ScrutinyObj.isCasteVer = isCasteVer;
    this.ScrutinyObj.isDisVer = isDisVer;
    this.ScrutinyObj.isAppAffVer = isAppAffVer;
    this.ScrutinyObj.isLandAcqVer = isLandAcqVer;
    this.ScrutinyObj.isExSerVer = isExSerVer;
    this.ScrutinyObj.isPODVer = isPODVer;
    this.ScrutinyObj.isIncomeVer = isIncomeVer;
    this.ScrutinyObj.isResiVer = isResiVer;
    this.ScrutinyObj.isAffiVer = isAffiVer;
    this.ScrutinyObj.isSecAffVer = isSecAffVer;
    this.ScrutinyObj.isManiSigVer = isManiSigVer;
    this.ScrutinyObj.isSecManiSigVer = isSecManiSigVer;
    this.ScrutinyObj.isbapassVer = isbapassVer;
    this.ScrutinyObj.isVoterCardVer = isVoterCardVer;
    this.data = this.userService.updateApplicationScrutiny(this.ScrutinyObj);
    this.data.subscribe(
      (response) => {
        //this.APP_Id=response;
        // console.log(Application);
        // Application.reset();
        //Application.resetForm();
        // this.formInvalid = false;
        swal('Success!', 'Application No. ' + APP_No + ' is not eligible for allotment.', 'success');
        this.router.navigate(['home/scrutiny/scrutinized/', this.DSWOID_NO_Id, this.PD_Id, this.CA_Id, this.RES_Id, this.Property_Type]);
        document.getElementById('loader-spinner').style.display = "none";
        //this.router.navigate(['home/applicant/applicantview/',this.APP_Id]);
        // window.location.href(='home/applicantview/';
      }, (error) => {
        console.log(error);
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
 
  isButtonDisabled(): boolean {
    const statuses = [
      this.AFD.isAdharVe,
      this.AFD.isPan,
      this.AFD.isCasteVe,
      this.AFD.isDis,
      this.AFD.isAppAffVer,
      this.AFD.isLandAcqVer ,
      this.AFD.isExSerVe,
      this.AFD.isPOD,
      this.AFD.isIncomeVer,
      this.AFD.isResiV,
      this.AFD.isAffiV,
      this.AFD.isSecAffVer,
      this.AFD.isManiSigVer ,
      this.AFD.isSecManiSigVer,
      this.AFD.isbapassVer,
      this.AFD.isVoterCardVer
    ];

    return statuses.includes('No');
  }


  isNAUrl(url: string | null): boolean {
    debugger;
    // Check if the URL exists and ends with "NA.pdf"
    return url ? url.includes('NA.pdf') : false;
}


}
