import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  title = "Change Password"
  user:User;
  formSubmitted: boolean;
  uName:string;


  constructor(private userService:UserService, private errorHandler:ErrorHandler,private route: ActivatedRoute) { 
    this.formSubmitted=false;
    this.user=new User;
    this.user.UserName=localStorage.getItem('userName');
  }

  ngOnInit() {
    
  }

  onSubmit(form:NgForm){
    if(form.valid){
      document.getElementById('loader-spinner').style.display="block";
      let response=this.userService.changePassword(form.value);
      response.subscribe(
        (data)=>{
          form.reset();
          this.onCancelled();
          document.getElementById('loader-spinner').style.display="none";
          swal('Success','Your password was changed successfully.','success');
        },(error)=>{
          document.getElementById('loader-spinner').style.display="none";
          // this.errorHandler.handleError(error);
          swal('', error.error.Message, 'warning');
        }
      );
    }else
      this.formSubmitted = true;
  }

  onCancelled(){
    this.formSubmitted = false;
  }

}
