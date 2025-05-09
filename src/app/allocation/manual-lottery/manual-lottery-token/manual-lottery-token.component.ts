import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';
@Component({
  selector: 'app-manual-lottery-token',
  templateUrl: './manual-lottery-token.component.html',
  styleUrls: ['./manual-lottery-token.component.css']
})
export class ManualLotteryTokenComponent implements OnInit {

  title = "Token List";
  LO_NO_Id_FK:any;
  LO_PD_Id_FK:any;
  LO_CA_Id_FK:any;
  LO_RES_Id_FK:any;
  LO_PT_Id_FK:any;
  data:any;
  NotificationDetails:any={};
  ApplicantTokenslist;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    
    this.route.params.subscribe(params =>{
      this.LO_NO_Id_FK = params['LO_NO_Id_FK'],
      this.LO_PD_Id_FK = params['LO_PD_Id_FK'],
      this.LO_CA_Id_FK = params['LO_CA_Id_FK'],
      this.LO_RES_Id_FK = params['LO_RES_Id_FK'],
      this.LO_PT_Id_FK = params['LO_PT_Id_FK']
      this.GetApplicantToken(this.LO_NO_Id_FK, this.LO_PD_Id_FK, this.LO_CA_Id_FK, this.LO_RES_Id_FK, this.LO_PT_Id_FK)
  });
}
myFunction() {
  window.print();
}
GetApplicantToken(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId) {
  
  document.getElementById('loader-spinner').style.display = "block";
  this.data = this.userService.GetApplicantToken(DSWOID_NO_Id, PD_Id, CA_Id, RES_Id, propertyTypeId);
  this.data.subscribe(
    (response: any) => {
      this.NotificationDetails=response;
      this.ApplicantTokenslist=response.ApplicantTokenViewModel;
      document.getElementById('loader-spinner').style.display = "none";
    }, (error) => {
        swal('Warning!', "Please enter all the fields.", 'warning');
      document.getElementById('loader-spinner').style.display = "none";
    });
}
}
