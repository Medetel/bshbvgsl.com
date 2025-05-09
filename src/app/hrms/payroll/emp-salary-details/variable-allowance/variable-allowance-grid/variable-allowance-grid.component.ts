import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../../../shared/ErrorHandler';
import { Search } from '../../../../../shared/user.model';

@Component({
  selector: 'app-variable-allowance-grid',
  templateUrl: './variable-allowance-grid.component.html',
  styleUrls: ['./variable-allowance-grid.component.css']
})
export class VariableAllowanceGridComponent implements OnInit {

  s: Search;
  isSearch:boolean;
  data: any =[];
  EarnedList : any =[]
  DeductionList : any =[]
  codes: any =[];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
   }

  ngOnInit() {
    this.GetAllVariableEarnings()
  }

  GetAllVariableEarnings(){
    this.isSearch = false;   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllAllowanceDeductionCodeforSalaryStructure('V','E');
    this.data.subscribe(
         (response: any) => {
          this.EarnedList= response; 
          this.Assign(this.EarnedList);
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

  GotoFormula(Formula_id){
    localStorage.setItem('BackUrl','/home/payroll/emp-salary-details/variable-allowances')
    this.router.navigate(['/home/payroll/formula/formula-form',Formula_id,'view']);  
  }
  
  
  checkValue(e,ED_CODE){  

    if(e == 'U'){
      for(var i=0;i<=this.codes.length;i++){
        if(this.codes[i]== ED_CODE)
        this.codes.splice(i, 1)
      }
    }

    if(e == 'C'){
      this.codes[this.codes.length+1]=ED_CODE;
    }
    console.log(this.codes)
  }


  Assign(list){
    for(var i=0;i<list.length;i++){
      this.codes[this.codes.length+i]=list[i].ED_CODE
    }
  }

  Update(){
    //insert    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.inseinsertDataVariablert(this.codes,localStorage.getItem('EmpCode'));
    this.data.subscribe(
         (response: any) => {
          swal('Success!', 'Updated successfully.', 'success'); 
          document.getElementById('loader-spinner').style.display = "none";
         },    
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          }
      );   
  }




}
