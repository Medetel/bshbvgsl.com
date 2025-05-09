import { Component, OnInit,NgZone } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { ActivatedRoute,Router } from "@angular/router";
import { WindowRef } from '../../shared/windowRef.service';

//import Razorpay from 'razorpay';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { RazorpayOption } from '../../shared/models';
declare var $: any;

@Component({
  selector: 'checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
  providers: [WindowRef]  
  
})
export class CheckoutFormComponent implements OnInit {
  private sub: any;  
  PropertyDet:any={};
  data: any;
  userRole: any;
  R: any = {};
  rzp1:any;
  options: RazorpayOption;
  orderData: any = {};
  transaction_id:any;
  result:any;



  constructor(private activatedRoute: ActivatedRoute, public router:Router, private userService: UserService, private winRef: WindowRef,private errorHandler: ErrorHandler) { }

  ngOnInit() {
    //this.userRole = localStorage.getItem('userRole');
    
     this.sub = this.activatedRoute.params.subscribe(params => {    
      console.log("Transaction Id:" +params['TransactionId']);  
      this.transaction_id=params['TransactionId'];  
     
     });
     
     this.getOrderDetails(this.transaction_id)

     //this.payWithRazor(this.transaction_id);

    // this.razorpayService
    // .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
     //.subscribe();

  } 

  getOrderDetails(Transaction_Id:any) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetCustomerOrderDetailById(Transaction_Id)
      .subscribe(
        (data: any) => {          
          document.getElementById('loader-spinner').style.display = "none";         
          this.orderData = data; 
          //here call that payment request function    payWithRazor() 
          this.payWithRazor(this.orderData);  
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        }
        );
  }

/*
  options = {
    "key": "rzp_test_6nc0ueIpVMNzjm", // Enter the Key ID generated from the Dashboard
    "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "VGSL",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "order_JtCbI74zVggqBc", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": (response: any)=>{
      
      this.handle_response(response);
      
    },
    "prefill": {
        "name": "raj X",
        "email": "raj.x@gmail.com",
        "contact": "7829930855"
    },
    "notes": {
        "address": "VGSL Corporate Office - JP Nagar"
    },
    "theme": {
        "color": "#0c238a"
    }
};
  
  */

/*
handle_response(_response: any){
  console.log('handle response data :' +_response);
  
  this.paymenetService.verifyPayment(_response,this.order.receipt)
  .subscribe((success)=>{
    console.log(success);
  
    this.paymentResponse=JSON.parse(JSON.stringify(success))
    console.log(this.paymentResponse.signatureIsValid);
    
    if(this.paymentResponse.signatureIsValid){
      alert("payment is success")
      this.router.navigate(['/login/studentlogin'])
    }else{
      alert("payment is failed please retry")
      this.router.navigate(['enroll'])
    }
    
  })
  
}
*/

/*
  options1 = {
    key: 'rzp_test_6nc0ueIpVMNzjm',
    amount: 100, // amount should be in paise format to display Rs 1255 without decimal point
    currency: 'INR',
    name: 'AL DM', // company name or product name
    description: 'product desc test',  // product description
    image: './assets/logo.png', // company logo or product image
    order_id: 'order_JtCbI74zVggqBc', // order_id created by you in backend
    modal: {
      // We should prevent closing of the form when esc key is pressed.
      escape: false,
    },
    notes: {
      // include notes if any
    },
    theme: {
      color: '#0c238a'
    }
  };
  */

  payWithRazor(orderData:any){     
    let options:any = {
        "key": orderData.RazorpayKey, //"rzp_test_6nc0ueIpVMNzjm",
        "amount": orderData.Amount, //1
        "currency": orderData.Currency, //'INR',
        "name": "BSHB",
        "description":orderData.Description, // "test transaction data",
        "image": "../assets/images/logo.jpg",
        "order_id":orderData.OrderId, //'order_JtDqcX8aHdUwbo', //order_id created by you in backend        
        "modal": {
           //We should prevent closing of the form when esc key is pressed.
          "escape": false
        }, 
        "prefill": {
          "name": orderData.Name, //"Alex DM",
          "contact":orderData.PhoneNumber, //"7829930855",
          "email":orderData.Email// "alex.dm@gmail.com"
         
        },
        "notes": {
          "address":orderData.Address, // "B Block, Line No - 2, No 456, JSR-831003, JH"
          "merchant_order_id": orderData.TransactionId
        },
        "theme": {
          "color": "#6fbc29"
        }
      };

      options.handler = ((response, error) => {
        options.response = response;      

         this.userService.CompleteOrderProcess(options.response)
        .subscribe(
        (data) => {    
          console.log('verify success data :' +JSON.stringify(data)); 
          this.result=data;   
          document.getElementById('loader-spinner').style.display = "none";               
         
          if(this.result=='Success')
          {
            //console.log('redirect to success page :' +JSON.stringify(this.result)); 
            swal('Success!', ' Payment done successfully.', 'success').then((result) => {
              if (result.value) {           
                this.router.navigate(['/home/paymentform']);
              }
            })
          }
          
          
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";        
          this.errorHandler.handleError(error);
        });

        

      });
      options.modal.ondismiss = (() => {
        //handle the case when user closes the form while transaction is in progress
        console.log('Transaction cancelled.');
      });

      let rzp = new this.winRef.nativeWindow.Razorpay(options);
      rzp.open();
  } 
 
  

}
