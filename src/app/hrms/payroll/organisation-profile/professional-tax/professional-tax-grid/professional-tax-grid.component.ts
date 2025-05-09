import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../../shared/user.service';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../../../shared/ErrorHandler';
import swal1 from 'sweetalert2';
@Component({
  selector: 'app-professional-tax-grid',
  templateUrl: './professional-tax-grid.component.html',
  styleUrls: ['./professional-tax-grid.component.css']
})
export class ProfessionalTaxGridComponent implements OnInit {

  public show1:boolean = false; 
  a: any =[];
  data: any=[];
  formInvalid: boolean;
  Id: number;
  mode: any;
  professionalTax: any =[];
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe:TitleCasePipe) { }
 
  ngOnInit() { 
    this.route.params.subscribe(params => {
      this.Id = params['id'];
      this.mode = params['mode'];       
      if(this.Id != null)  {       
        this.GetByIdprofessionalTax(this.Id);      
      } })
    
  this.GetAllProfessionalTax()
    }
 
    toggle1() {
      this.show1 = !this.show1;     
    }
    SaveProfessionalTax(Details){  
      
      if(Details.value.Pt_desc == null){
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
        this.data = this.userService.InsertProfessionalTax(Details.value);
        this.data.subscribe(
          (response) => {
            Details.reset();
            Details.resetForm();
            Details.form.markAsPristine();
            Details.form.markAsUntouched();
            swal('Success!', 'Professional Tax Added Successfully .', 'success');
            this.GetAllProfessionalTax()
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
  
  
    UpdateProfessionalTax(Details){
      
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
        this.data = this.userService.updateProfessionalTax(Details.value, this.Id);
        this.data.subscribe(
          (response) => {
            Details.reset();
            Details.resetForm();
            Details.form.markAsPristine();
            Details.form.markAsUntouched();
            swal('Success!', 'Professional Tax Details Upadted Successfully .', 'success');
            this.GetAllProfessionalTax();
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
  
  
    GetAllProfessionalTax(){
      //this.isSearch = false;   
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllProfessionalTax();
      this.data.subscribe(
           (response: any) => {
            this.professionalTax= response; 
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
  
  
    GetByIdprofessionalTax(code) {   
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetProfessionalTaxById(code);
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
      this.router.navigate(['/home/payroll/payroll-compliance/professional-tax']);   
      else
        this.a=[];          
       
}
}
  
