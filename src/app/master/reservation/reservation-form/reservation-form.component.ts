import { Component, OnInit } from '@angular/core';
import { Application } from '../../../shared/user.model';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import swal1 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  title="Add Reservation";
  data : any = {};
  formInvalid : boolean = false;
  r : any = {
    Disabled_Percentage: 0,
    SC_Percentage: 0,
    ST_Percentage: 0,
    General_Percentage: 0,
    EBC_Percentage: 0,
    BC_Percentage: 0,
    Disabled_No: 0,
    SC_No: 0,
    ST_No: 0,
    General_No: 0,
    EBC_No: 0,
    BC_No: 0,
    R_Created_Date : Date
  };
  RES_Id : number;
  mode : string;
  created_date : Date;
  

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
    private datePipe:DatePipe) 
  { }

  ngOnInit() {
    debugger;
    this.route.params.subscribe(params => {      
      // this.RES_Id = params['RES_Id'];  
      this.created_date = params['created_date'];
      this.mode  =   params['mode'];   
      
        
        // if(this.RES_Id > 0){
        //   this.GetReservationById(this.RES_Id)
        // }    
         
        if (this.created_date !== null && this.created_date !== undefined) {
          const formattedDate = this.created_date.toString().split('T')[0]; // Extracts date as YYYY-MM-DD
          this.GetReservationByDate(formattedDate); // Pass the formatted date
        }
    });

    if(this.mode=='view'){
      this.title = "View Reservation";
    }
    else if(this.mode=='edit'){
      this.title = "Edit Reservation";
    }  
  }

  SaveReservation(Reservation: NgForm){    
    if(Reservation.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }     

    else{                                     
            this.data = this.userService.PostReservation(Reservation.value);    
            this.data.subscribe(
            (response) => {
              Reservation.reset();
              Reservation.resetForm();
              Reservation.form.markAsPristine();
              Reservation.form.markAsUntouched();        
              swal('Success!', 'Reservation Added Successfully .', 'success');
              this.router.navigate(['/home/reservation-master']) ;   
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

  GetReservationById(RES_Id){
    document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.GetByIdReservation(RES_Id);
        this.data.subscribe(
          (response: any) => {
            this.r = response;      
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          });
  }

  UpdateReservation(Reservation : NgForm){     
    if(Reservation.invalid)
    {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }     
  
    else{        
      if (Reservation.value.RES_Percentage != null && !Reservation.value.RES_Percentage.match("http"))     
      document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.UpdateReservation(Reservation.value,this.RES_Id);    
        this.data.subscribe(
      (response) => {       
        document.getElementById('loader-spinner').style.display = "none";  
        Reservation.reset();
        Reservation.resetForm();
        Reservation.form.markAsPristine();
        Reservation.form.markAsUntouched();        
        swal('Success!', 'Reservation updated Successfully.', 'success');
        this.router.navigate(['/home/reservation-master']) ;   
                 
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

  
  totalPercentage: number = 0;

  // Method to calculate the total of all percentages
  calculateTotalPercentage() {
    this.totalPercentage = 
      (this.r.Disabled_Percentage || 0) + 
      (this.r.SC_Percentage || 0) + 
      (this.r.ST_Percentage || 0) + 
      (this.r.General_Percentage || 0) + 
      (this.r.EBC_Percentage || 0) + 
      (this.r.BC_Percentage || 0);
  }

  saveData(Reservation: NgForm) {
    if(Reservation.invalid)
      {
        this.formInvalid = true;
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        return;
      } 
      else {
    const reservationData = [
      {
        Reservations: [
          { RES_Name: 'Handicapped (Person with Disability)',
            RES_Percentage: this.r.Disabled_Percentage, 
            created_date: this.r.R_Created_Date,
          },
          { RES_Name: 'SC (Scheduled Caste)', 
            RES_Percentage: this.r.SC_Percentage,
            created_date: this.r.R_Created_Date,
          },
          { RES_Name: 'ST (Scheduled Tribe)', 
            RES_Percentage: this.r.ST_Percentage, 
            created_date: this.r.R_Created_Date, 
          },
          { RES_Name: 'General', 
            RES_Percentage: this.r.General_Percentage, 
            created_date: this.r.R_Created_Date,
          },
          { RES_Name: 'Extremely Backward Class', 
            RES_Percentage: this.r.EBC_Percentage, 
            created_date: this.r.R_Created_Date,
          },
          { RES_Name: 'Backward Class', 
            RES_Percentage: this.r.BC_Percentage, 
            created_date: this.r.R_Created_Date,
          }
        ]
      }
    
    ];

    this.userService.saveReservationData(reservationData).subscribe( 
      response => {
        console.log('Reservation data saved successfully'),
        swal('Success!', 'Reservation added successfully for the Date: ' + this.r.R_Created_Date  , 'success');
      }
      , (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
        else if (error.status == 500) {
          swal('Warning!', error.error.Message , 'warning');
        }
      });
  }
  }
  GetReservationByDate(created_date){
    document.getElementById('loader-spinner').style.display = "block";
        this.data = this.userService.GetByIdReservationByDate(created_date);
        this.data.subscribe(
          (response: any) => {
            this.r = response;   
            this.r.R_Created_Date = this.r[0].R_Created_Date.toString().split('T')[0];
            this.r.Disabled_Percentage =this.r[0].RES_Percentage;
            this.r.SC_Percentage = this.r[1].RES_Percentage;
            this.r.ST_Percentage = this.r[2].RES_Percentage;
            this.r.General_Percentage = this.r[3].RES_Percentage;
            this.r.EBC_Percentage = this.r[4].RES_Percentage;
            this.r.BC_Percentage = this.r[5].RES_Percentage;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          });
  }


}
