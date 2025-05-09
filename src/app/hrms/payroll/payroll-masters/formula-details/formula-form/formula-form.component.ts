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
  selector: 'app-formula-form',
  templateUrl: './formula-form.component.html',
  styleUrls: ['./formula-form.component.css']
})
export class FormulaFormComponent implements OnInit {
  title="Formula Details";
  f: any ={};
  data: any =[];
  allowedlist: any=[];
  operatorlist :any =[];
  ComparisionList : any =[];
  FunctinList : any =[];
  value : string;
  FormulaId : number;
  mode : string;
  disable : boolean = false;
  backRouting : string = null;
  IdName : string ="";
  filterdList : any =[];
  Dtl : any =[];
  variablelist : any =[];
  verify : boolean=false;

  formInvalid: boolean;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private titlecasePipe:TitleCasePipe) { }

  ngOnInit() {
    this.f.Formula= ''
   this.GetAllAllowanceDeductionCode()
   this.getdefultData()

   this.route.params.subscribe(params => {
    this.FormulaId = params['id'];
    this.mode = params['mode'];  
    if(this.FormulaId != null)   
     this.GetByIdFormula(this.FormulaId);      
  });

  if(this.mode == 'view'){
    this.disable = true;
    this.backRouting = localStorage.getItem('BackUrl')
    localStorage.removeItem('BackUrl')
  }  
  
  }

  getdefultData(){
    this.data = this.userService.GetAllhrmsfixedCodes('Operator');
    this.data.subscribe(
      (response: any) => {
        this.operatorlist = response;
      })

      this.data = this.userService.GetAllhrmsfixedCodes('Comparison');
      this.data.subscribe(
      (response: any) => {
        this.ComparisionList = response;
      })

      this.data = this.userService.GetAllhrmsfixedCodes('Function');
      this.data.subscribe(
      (response: any) => {
        this.FunctinList = response;
      })

      

  }

  //getallcodesforFormulas

   getallcodesforFormulass(){ 
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getallcodesforFormulas();
    this.data.subscribe(
         (response: any) => {           
           if((this.mode == 'view')   || (this.mode == 'edit')){
              this.variablelist = this.allowedlist;
           }
           else{
               this.variablelist= response;  
           }                           
          document.getElementById('loader-spinner').style.display = "none";
         },    
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          }
      );      
  }

  GetAllAllowanceDeductionCode(){ 
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllAllowanceCode();
    this.data.subscribe(
         (response: any) => {
          this.allowedlist= response; 
          this.getallcodesforFormulass()      
         
          this.filterdList = this.allowedlist;    
          console.log('All-')   ;
          console.log(this.filterdList) 
          //this.variablelist = this.allowedlist.filter(a=>a.ED_Category == 'F') 
          document.getElementById('loader-spinner').style.display = "none";
         },    
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          }
      );      
  }

  feild1Change2(value){
    if(value!= ''){
      this.IdName=this.IdName +','+value
      this.f.Formula=  this.f.Formula+value;
    }
}

  feild1Change(value){
    if(value!= ''){
      this.IdName=this.IdName +','+value
      this.f.Formula=  this.f.Formula+'{'+value+'}'  
    }

  let temp ={
    Expression : value,
    isVariable : null,
    isOperator : null,
    isComparison : null,
    isFunction : null,
    IsEdcode : 1,
    IsFixed : null
  }

    this.Dtl.push(temp);
    console.log('Temp');
    console.log(this.Dtl);
  }

varifyFormula(Formula){

let udm ={
  Formula : Formula
}

  this.data = this.userService.uspVerifyFormula(udm);
      this.data.subscribe(
      (response: any) => {     
        this.verify = true;
         swal('Success!', 'Formula verified Successfully .', 'success');
      }      
      , (error) => {         
            swal('Warning!', 'Please verify the formula', 'warning');          
        });
}

  SaveFORMULA(details:NgForm){

    if(this.verify == false){
      alert("Please verify the formula")
      return;
    }

    if (details.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {         
      this.data = this.userService.InsertpayrollFormula(details.value);
      this.data.subscribe(
        (response) => {
          details.reset();
          details.resetForm();
          details.form.markAsPristine();
          details.form.markAsUntouched();
          swal('Success!', 'Formula Added Successfully .', 'success');
          this.router.navigate(['/home/payroll/formula']);       
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

  UpdateFormula(details:NgForm){

      if(this.verify == false){
      alert("Please verify the formula")
      return;
    }
    if (details.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    else {         
      this.data = this.userService.UpdatepayrollFormula(details.value,this.FormulaId);
      this.data.subscribe(
        (response) => {
          details.reset();
          details.resetForm();
          details.form.markAsPristine();
          details.form.markAsUntouched();
          swal('Success!', 'Formula Updated Successfully .', 'success');
          this.router.navigate(['/home/payroll/formula']);       
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

  GetByIdFormula(code) {   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdFormula(code);
    this.data.subscribe(
      (response: any) => {
        this.f = response;
        //this.d.DEPND_DOB = ((this.d.DEPND_DOB).split('T'))[0];         
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  
  
  clear(){
    this.f = [];
    //this.f.Formula= '=';
    this.IdName= '';
  }

  back(){
    if(this.backRouting == null)
    this.router.navigate(['/home/payroll/formula']);
    else
    this.router.navigate([this.backRouting]);
  }

  //[routerLink]="['/home/payroll/formula']"
  Cancel(){
    this.router.navigate(['/home/payroll/formula']);
  }
}
