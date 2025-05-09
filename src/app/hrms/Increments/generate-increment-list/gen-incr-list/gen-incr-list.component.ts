import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { ErrorHandler } from '../../../../shared/ErrorHandler';
import { Search } from '../../../../shared/user.model';

@Component({
  selector: 'app-gen-incr-list',
  templateUrl: './gen-incr-list.component.html',
  styleUrls: ['./gen-incr-list.component.css']
})
export class GenIncrListComponent implements OnInit {
  data: any=[];
  DistrictsList: any=[];
  a: any ={};
  EmployeeList : any =[];
  maxcal: any;
  incrementValid : number;
  mode:any;
  BackId: any;
  INCREMENT_ID: any;
  routing: string;
  title: string;
  e:any={};
  hide: boolean;
  IncrementOrderNo: any;
  years: (number | string)[] = [];
  selectedYear: number;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
   this.getDefaultData();
   this.route.params.subscribe(params => {   
        
    this.INCREMENT_ID = params['INCREMENT_ID'];
    this.mode = params['mode'];  
  
    if(this.INCREMENT_ID > 0){
      this.GetByIdIncrement(this.INCREMENT_ID);
    }
    
    if(this.mode == 'View'){
      this.hide = true;       
    }

    if(this.mode=='View'){
      this.title = "View ";
    }
    else if(this.mode=='edit'){
      this.title = "Edit ";
    }
  });
  if(this.INCREMENT_ID > 0){
    this.GetByIdIncrement(this.INCREMENT_ID);
   }
  this.routing = localStorage.getItem('switchurl');
  localStorage.removeItem('switchurl');
  this.populateYears(2019, 3050);
  }  

  populateYears(startYear: number, endYear: number): void {
    this.years.push("--Select--"); // Add the placeholder
    for (let y = startYear; y <= endYear; y++) {
      this.years.push(y);
    }
    console.log('Years populated:', this.years);
  }

  getDefaultData(){
    this.data = this.userService.getAllDistrictName();
    this.data.subscribe(
      (response: any) => {
        this.DistrictsList = response;
      })

      this.a.EMP_DIVISION_ID = +localStorage.getItem('divisonId');
      this.generatelist(this.a.EMP_DIVISION_ID, this.selectedYear)

      this.data = this.userService.uspGetMaximumCalendar();
        this.data.subscribe(
        (response) => {
        this.maxcal = response;
        this.a.year =  this.maxcal-1; 
        this.validateIncrement(this.maxcal-1)       

      })
      
      
      //ValidateIncrementList
  }

  validateIncrement(year){
    this.data = this.userService.ValidateIncrementList(year);
    this.data.subscribe(
    (response) => {
    this.incrementValid = response;
    //this.a.year =  this.maxcal;        
  })
  }

  // ngAfterViewInit() {
  //   var first = "--Select--"
  //   var year = 2019;
  //   var till = 3050;
  //   var options = "";
  //   for (var y = year; y <= till; y++) {
  //     // options = "<option>"+ first +"</option>";
  //     options += "<option>" + y + "</option>";
  //   }
  //   document.getElementById("year").innerHTML = "Select" + options;
  // }

  generatelist(divisionId, selectedYear){ 
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllIncrementingEmployeeList(divisionId, selectedYear);
    this.data.subscribe(
    (response: any) => {
    this.EmployeeList = response; 
    document.getElementById('loader-spinner').style.display = "none";
    },
    (error) => {
    document.getElementById('loader-spinner').style.display = "none";
    }
    );
    }

  Save(year,list){    

    if(this.incrementValid == 1){
      swal('Warning!', 'Increment cannot applied for this year.', 'warning'); 
      return;
    }
    console.log('List');
    console.log(list);
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.AddIncrement(this.EmployeeList,year);
    this.data.subscribe(
      (response: any) => {
        //this.EmployeeList = response; 
        swal('Success!', ' Increment added Successfully .', 'success');
        this.router.navigate(['/home/increment']);     
        ///home/increment
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }
  GetByIdIncrement(INCREMENT_ID) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdIncrement(INCREMENT_ID);
    this.data.subscribe(
      (response: any) => {
        this.EmployeeList = response;
        // this.IncrementOrderNo = this.EmployeeList.IncrementOrderNo;
        console.log(('data:'),JSON.stringify(response));
        // this.ChangeOfDivision(this.a.EMP_DIVISION_ID);
        // this.ChangeOfEmployee(this.a.IncrementId);
        // if (this.a.PROMOTION_WEF != null)
        // this.a.PROMOTION_WEF = ((this.a.PROMOTION_WEF).split('T'))[0];
        // if (this.a.PROMOTION_DUE_DATE != null)
        // this.a.PROMOTION_DUE_DATE = ((this.a.PROMOTION_DUE_DATE).split('T'))[0];
          document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
           document.getElementById('loader-spinner').style.display = "none";
      });
  }
  Back(){   
    if(this.routing != null)
    this.router.navigate([this.routing]);
    else
    this.router.navigate(['/home/increment']);    
  }
}
