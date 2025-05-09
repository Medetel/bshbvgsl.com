import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-emp-leave-encashment-form',
  templateUrl: './emp-leave-encashment-form.component.html',
  styleUrls: ['./emp-leave-encashment-form.component.css']
})
export class EmpLeaveEncashmentFormComponent implements OnInit {
  data: any;
c:any={};
  LE_Id: any;
  mode: any;
  hide : boolean = false;
  title: string;
  t: any={};

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    debugger
    this.route.params.subscribe(params => {
      this.LE_Id = params['Id']; 
      this.mode = params['mode']; 
      if(this.LE_Id >0){
        this.viewencashment(this.LE_Id)
      }    
    });
    if(this.mode == 'view'){
      this.hide = true; 
      }
     
      if(this.mode=='view'){
      this.title = " View Leave Encashment Authorization";
      }
    // this.GetByIdencashmentofficer(this.LE_Id);
  }
  // GetByIdencashmentofficer(LE_Id) {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetByIdencashmentofficer(LE_Id);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.c = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //         this.errorHandler.handleError(error);
  //     });

  // }
  viewencashment(LE_Id){
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.viewencashment(LE_Id);
    this.data.subscribe(
      (response: any) => {

        console.log('response');
        console.log(response);
        this.t = response;
        // this.c.code_value1 = response[0].yearmonth;
        // this.c.EMP_DIVISION_ID = response[0].DIVISION_ID;
        // this.c.desg_id = response[0].EMP_DESIGNATION_ID;
        // this.DivisionId = response[0].DIVISION_ID;
        // this.ChangeOfmonthyear(response[0].yearmonth);
      
        
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  
}
