import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { NUMBER_TYPE } from '@angular/compiler/src/output/output_ast';
declare var $: any;

@Component({
  selector: 'app-payment-config',
  templateUrl: './payment-config.component.html',
  styleUrls: ['./payment-config.component.css']
})

export class PaymentConfigComponent implements OnInit {
  PC_Id: any;
  PaymentConfig: any;
  Projects: any;
  Installments: any = [];
  Notifications: any;
  TypesofNotifications;
  data: any;
  showInstallmentDiv: boolean = false;
  title = "Payment Configuration";
  pcpa: any = {};
  pca: any = {};
  pc: any = {};
  x: any = {};
  n: any = {};
  p: any = {};
  Reservations;
  Categories;
  formSubmitted: boolean = false;
  installmentpay: any = {};
  proprtytype;
  mode: any;
  hide : boolean = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
  }

  ngOnInit() {

    this.GetNotifications();
    this.GetCategory();
    this.GetReservations();
    this.GetAllTypeofNotifications();
    this.GetAllTPropertyType();
    
    this.route.params.subscribe(params => {
      this.PC_Id = params['PC_Id'],
        this.mode = params['mode']

        if(this.mode == 'view'){
          this.hide = true;       
        }

        if(this.mode=='view'){
          this.title = "View Payment Configuration";
        }
        else if(this.mode=='edit'){
          this.title = "Edit Payment Configuration";
        }
    });
    if (this.PC_Id != null && this.mode != null)
      this.GetPaymentconfigForTheId(this.PC_Id);
  }

  showInstallment() {

    // this.showInstallmentDiv = true;
    $("#installment").modal('show');
  }

  hideInstallment() {
    this.showInstallmentDiv = false;
  }

  GetPaymentconfigForTheId(PC_Id) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetPaymentconfigForTheId(PC_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.pc = data;
          console.log(this.pc);
          if (this.pc.PC_PT_Id_Fk == null) {
            this.pc.PC_PT_Id_Fk = undefined;
          }
          this.Installments = data.Installments;
          this.GetProjects(this.pc.PC_NO_Id_FK)
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetCategory() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getCategory();
    this.data.subscribe(
      (response: any) => {
        this.Categories = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }



  GetReservations() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getReservations();
    this.data.subscribe(
      (response: any) => {
        this.Reservations = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetNotifications() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getNotifications();
    this.data.subscribe(
      (response: any) => {
        this.Notifications = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  GetProjects(DSWOID_NO_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getProjectDetailsForScrutiny(DSWOID_NO_Id);
    this.data.subscribe(
      (response: any) => {
        this.Projects = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllTypeofNotifications() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllTypeofNotifications();
    this.data.subscribe(
      (response: any) => {
        this.TypesofNotifications = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllTPropertyType() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllTPropertyType();
    this.data.subscribe(
      (response: any) => {
        this.proprtytype = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  AddInstallments(pca) {

    debugger;

    

    let invalid = false;
    for (let i = 0; i < this.Installments.length; i++) {
        
            if (this.Installments[i].PCA_PT_Id_Fk == pca.PCA_PT_Id_Fk) {
                invalid = true;
                break; 
            }
            if (invalid) break; 
        }
         
    
    
    if (invalid) {
       swal('Warning!', 'Installments already created for this property type.Please delete previous  payment configuration for the property type', 'warning');
    }


    else{
 
               
  //   // Check if an installment for the selected property type already exists
  //   const existingInstallment = this.pc.Installments.find(
  //       (installment) => installment.PCA_PT_Id_Fk === pca.PCA_PT_Id_Fk
  //   );

  // //   const existingInstallment1 = this.pc.Installments.find(
  // //     (installment1) => installment1.PCA_PT_Id_Fk === pca.PCA_PT_Id_Fk
  // // );

  //   if (existingInstallment) {
  //       swal('Warning!', 'An installment for the selected property type already exists.', 'warning');
  //       return; // Prevent adding a duplicate record
  //   }

    // Proceed to add the new installment if no duplicate exists
    let temp = {
        PCA_PT_Id_Fk: pca.PCA_PT_Id_Fk,
        PT_Property_Type: this.GetPropertyname(pca.PCA_PT_Id_Fk),
        PCA_Penalty: pca.PCA_Penalty,
        PCA_Perc_deduct: pca.PCA_Perc_deduct,
        PCA_Tot_Amt: pca.PCA_Tot_Amt,
        isNew: true // Mark this as a new installment
    };

    this.Installments.push(temp);
    this.installmentpay = {}; // Clear the form
    swal('Success!', 'Installment Cost Fixation (EMI) details have been saved successfully.', 'success');
  }
}


  // AddInstallments(pca) {
  //   let temp = {
  //     PCA_PT_Id_Fk: pca.PCA_PT_Id_Fk,
  //     PT_Property_Type:this.GetPropertyname(pca.PCA_PT_Id_Fk),
  //     PCA_Penalty: pca.PCA_Penalty,
  //     PCA_Perc_deduct: pca.PCA_Perc_deduct,
  //     PCA_Tot_Amt: pca.PCA_Tot_Amt,
  //     isNew: true // Add this flag to track new installments
  //   }
  //   this.Installments.push(temp);
  //   this.installmentpay = {};
  //   swal('Success!', 'Installment Cost Fixation(EMI) details has been saved successfully.', 'success');
  //   // this.hideInstallment();
  // }

  GetPropertyname(Pt_Id) {
    for (let i = 0; i <= this.proprtytype.length; i++) {
      if (this.proprtytype[i].PT_Id == Pt_Id) {
        return this.proprtytype[i].PT_Property_Type;
      }
    }
  }

  RemoveInstallments = function (position) {
    this.Installments.splice(position, 1);
}

  GetTotal(PCA_Cost_per_Sqft) {
    this.installmentpay.PCA_Tot_Amt = 10.764 * PCA_Cost_per_Sqft;
  }
  clear(){
    this.installmentpay.PCA_Sqmt = 1;
    this.installmentpay.PCA_Sqft = 10.764;
    this.installmentpay.PCA_Tot_Amt="";
  }

  Save(PaymentConfig: NgForm) {
    debugger;
    if (PaymentConfig.valid) {
        this.formSubmitted = false;
        PaymentConfig.value.PC_Id = this.PC_Id;
     
        let invalid = false;
        for (let i = 0; i < this.Installments.length; i++) {
            for (let j = i + 1; j < this.Installments.length; j++) {
                if (this.Installments[i].PCA_PT_Id_Fk == this.Installments[j].PCA_PT_Id_Fk) {
                    invalid = true;
                    break; 
                }
            }
            if (invalid) break; 
        }
        
        if (invalid) {
           swal('Warning!', 'Installments already created for this property type.Please delete previous  payment configuration for the property type', 'warning');
        }
       else{
        const newInstallments = this.Installments.filter(inst => inst.isNew);

        PaymentConfig.value.Installments = newInstallments;

        document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.savePaymentConfig(PaymentConfig.value);
        this.data.subscribe(
            (response) => {
                swal('Success!', 'Payment Configuration details have been saved successfully.', 'success');

                // Clear the `isNew` flag after saving
                newInstallments.forEach(inst => inst.isNew = false);

                this.router.navigate(['home/paymentconfig']);
                document.getElementById('loader-spinner').style.display = "none";
            },
            (error) => {
                swal('Warning!', 'Already Updated', 'warning');
                document.getElementById('loader-spinner').style.display = "none";
            }
        );
      }
    } else {
        swal('Warning!', 'Please fill all mandatory fields.', 'warning');
        this.formSubmitted = true;
    }
}

delete(PCA_Id){    
  debugger
      swal({
           title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
          this.data = this.userService.Deletecost(PCA_Id);
          this.data.subscribe(
           (response: any) => {
            this.GetPaymentconfigForTheId(this.PC_Id)        
           },       
        ); 
      } 
      })
      }

}

