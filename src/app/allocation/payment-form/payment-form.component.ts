import { Component, OnInit } from '@angular/core';
import { Search } from '../../shared/user.model';
import { UserService } from '../../shared/user.service';
import { ErrorHandler } from '../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { ActivatedRoute,Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
result:any;
  

  constructor(private activatedRoute: ActivatedRoute, public router:Router,private userService: UserService, private errorHandler: ErrorHandler) {
    
   }

  ngOnInit() {
    
  }

  SubmitPayment(PF: NgForm){  
      //alert(JSON.stringify( PF.value));
      if(PF.value.Customer_Name=="" || PF.value.Customer_Name==null)
      {       
        swal('warning!', 'Please enter customer name.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
        return;
      }  
      if(PF.value.Email=="" || PF.value.Email==null)
      {       
        swal('warning!', 'Please enter email address.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
        return;
      }  
      if(PF.value.Phone_Number=="" || PF.value.Phone_Number==null)
      {       
        swal('warning!', 'Please enter phone number.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
        return;
      }  
      if(PF.value.Pay_Amount=="" || PF.value.Pay_Amount==null)
      {       
        swal('warning!', 'Please enter amount.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
        return;
      }  

      var reqData={
        Name:PF.value.Customer_Name,
        Email:PF.value.Email,
        PhoneNumber:PF.value.Phone_Number,
        Address:PF.value.Customer_Address,
        Amount:PF.value.Pay_Amount,
        Description:PF.value.Remarks       
      }      
      
      
      this.userService.ProcessRequestOrder(reqData)
      .subscribe(
        (data) => {    
          //console.log(JSON.stringify(data)); 
          this.result=data;   
          document.getElementById('loader-spinner').style.display = "none";               
          this.router.navigate(['/home/checkoutform', this.result.TransactionId]); 
          //this.router.navigate(['/home/checkoutform', this.result.OrderId]);                  
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";        
          this.errorHandler.handleError(error);
        });
        
    
  }

  
}
