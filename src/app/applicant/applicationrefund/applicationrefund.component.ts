import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
  selector: 'app-applicationrefund',
  templateUrl: './applicationrefund.component.html',
  styleUrls: ['./applicationrefund.component.css']
})
export class ApplicationrefundComponent implements OnInit {
  title="Refund Request";
  APP_Id:any;
  APP_Status:any;
  AppRefundData:any={};
  formSubmitted: boolean;
  Total:any;
  TotalAmount:string;
  UserName:any;
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute,private errorHandler:ErrorHandler) {
    this.formSubmitted = false;
   }

  ngOnInit() { 
    this.route.params.subscribe(params =>{
      this.APP_Id = params['App_Id']
      this.APP_Status = params['APP_Status']
    }
    );
    
    if (this.APP_Id != null) 
      this.GetApplicantDetailsforRefund(this.APP_Id);
  }

  GetApplicantDetailsforRefund(APP_Id:any) {
     document.getElementById('loader-spinner').style.display = "block";
     this.userService.GetApplicantDetailsforRefund(APP_Id)
       .subscribe(
         (data:any) => {
            this.AppRefundData = data;
            this.Total=0;
            for(let i=0;this.AppRefundData.ApplicantTransDetailsModel.length;i++)
            {
              this.Total=this.AppRefundData.ApplicantTransDetailsModel[i].Amount;
              document.getElementById('loader-spinner').style.display = "none";
            }
           document.getElementById('loader-spinner').style.display = "none";
         }, (error) => {
           document.getElementById('loader-spinner').style.display = "none";
           this.errorHandler.handleError(error);
         });
   } 

   SaveRefundDetails(AppData:any,Amount:any) {
         //if (!form.invalid) {
         this.TotalAmount=Amount.split('.')[0];
         this.UserName = localStorage.getItem('userName');
         document.getElementById('loader-spinner').style.display = "block";
         //form.value.CR_Doc_File = this.getCancelPDFUrl();
         this.userService.CreateRefundRequest(AppData,this.TotalAmount)
           .subscribe(
             (data) => {
               document.getElementById('loader-spinner').style.display = "none";
               swal('','Saved Successfully!','success');
               this.router.navigate(['/home/appstatus']);
             }, (error) => {
               document.getElementById('loader-spinner').style.display = "none";
               this.errorHandler.handleError(error);
             });
          //  }else
          //  document.getElementById('loader-spinner').style.display = "none";
           //this.formSubmitted = true;
       }
}
