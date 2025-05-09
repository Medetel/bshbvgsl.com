import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../../shared/user.service';
import { ErrorHandler } from '../../../../../shared/ErrorHandler';
import { Search } from '../../../../../shared/user.model';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-income-tax-grid',
  templateUrl: './income-tax-grid.component.html',
  styleUrls: ['./income-tax-grid.component.css']
})
export class IncomeTaxGridComponent implements OnInit {
  a: any =[]
  public show1:boolean = false; 
  formInvalid: boolean;
  data: any=[];
  incomtaxlist: any =[];
  Id : number;
  mode : string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe:TitleCasePipe) { }
 
  ngOnInit() {     
    this.route.params.subscribe(params => {
      this.Id = params['id'];
      this.mode = params['mode'];  
      if(this.Id != null)  {
        this.show1= true;
        this.GetByIdIncomeTax(this.Id);      
      } 
       
    });
    this.GetAllIncomeTax()
    }
 
  toggle1() {
    this.show1 = !this.show1;     
  }

  SaveIncomTax(Details){
    console.log('form');
    console.log(Details);
    if(Details.value.IT_Description == null){
      return;
    }

    if (Details.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

  else if(Details.value.To_amount< Details.value.From_amount){
    this.formInvalid = true;
        swal('Warning!', 'Invalid Taxable range', 'warning');
        return;
   }

    else {    
      //Details.value.ED_TYPE = 'E' ;
      this.data = this.userService.InsertIncomeTax(Details.value);
      this.data.subscribe(
        (response) => {
          Details.reset();
          Details.resetForm();
          Details.form.markAsPristine();
          Details.form.markAsUntouched();
          swal('Success!', 'Income Tax Details Added Successfully .', 'success');
          this.GetAllIncomeTax()
          //this.router.navigate(['/home/payroll']);       
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


  UpdateIncomTax(Details){
    console.log('form');
    console.log(Details);


    if (Details.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

  else if(Details.value.To_amount< Details.value.From_amount){
      this.formInvalid = true;
          swal('Warning!', 'Invalid Taxable range', 'warning');
          return;
    }

    else {    
      //Details.value.ED_TYPE = 'E' ;
      this.data = this.userService.UpdateIncomeTax(Details.value, this.Id);
      this.data.subscribe(
        (response) => {
          Details.reset();
          Details.resetForm();
          Details.form.markAsPristine();
          Details.form.markAsUntouched();
          swal('Success!', 'Income Tax Details Upadted Successfully .', 'success');
           this.GetAllIncomeTax()
          //this.router.navigate(['/home/payroll']);       
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

  GetAllIncomeTax(){
    //this.isSearch = false;   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllIncomeTax();
    this.data.subscribe(
         (response: any) => {
          this.incomtaxlist= response; 
          // if(this.allowedlist.length>0)   
          // this.totalItems= response[0].totalItems;
          // this.itemsPerPage = itemsPerPage;
          // this.currentPage = pageNo;   
                   
          document.getElementById('loader-spinner').style.display = "none";
         },    
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          }
      );      
  }

  GetByIdIncomeTax(code) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetIncomeTaxById(code);
    this.data.subscribe(
      (response: any) => {
        this.a = response;
        //this.d.DEPND_DOB = ((this.d.DEPND_DOB).split('T'))[0];         
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  Cancel(){
    if(this.mode=='edit')
    this.router.navigate(['/home/payroll/payroll-compliance']);   
    else
      this.a=[];          
     
  }
}
