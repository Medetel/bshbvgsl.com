import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-allottment-list',
  templateUrl: './allottment-list.component.html',
  styleUrls: ['./allottment-list.component.css']
})
export class AllottmentListComponent implements OnInit {
  AllotmentList: any;
  PND: any = {};
  allotmentdata: any = [];
  Projects: any;
  Notifications: any;
  a: any = {};
  data: any;
  cost: any = {};
  title = "Allotment List"
  title1 = "Allotted List";
  title2 = "Waiting List";
  title3 = "Unsuccessful List";
  Categories;
  showprint = false;
  Reservations;
  Inst: any = {};
  proj_id: any;
  Not_Id: any;
  notify: any;
  PrintAllotmentList: any;
  exceltemp: any = {};
  Exceldata: any = [];
  Allot: any;
mode:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
  }



  ngOnInit() {
    this.GetNotifications();
    this.getAllProjectDetailsForScrutiny()
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

  getAllProjectDetailsForScrutiny() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllProjectDetailsForScrutiny();
    this.data.subscribe(
      (response: any) => {
        this.Projects = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


  GetNotificationProjects(Notification_Id, S_ProjectID) {
    if (S_ProjectID != null) {
      this.proj_id = S_ProjectID;
      if (this.notify == null)
        this.notify = 2;
    }
    if (Notification_Id != null) {
      this.Not_Id = Notification_Id;
      if (this.notify == null)
        this.notify = 1;
    }

    if (this.proj_id != null) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getAllCategory(S_ProjectID);
      this.data.subscribe(
        (response: any) => {
          this.Categories = response;
          if (this.proj_id != null && this.Not_Id) {
            this.GETProjectNotificationDetails(this.Not_Id, this.proj_id)
          }
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
    if (Notification_Id == null && this.notify == 2) {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.getNotificationDetailsForScrutiny(S_ProjectID);
      this.data.subscribe(
        (response: any) => {
          this.Notifications = response;
          
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
    else if (S_ProjectID == null && this.notify == 1) {
      this.data = this.userService.getProjectDetailsForScrutiny(Notification_Id);
      this.data.subscribe(
        (response: any) => {
          this.Projects = response;
          
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        });
    }
    
  }

  // GetCategory() {
  //   
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getCategory();
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.Categories = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // GetReservations() {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getReservations();
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.Reservations = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // GetNotifications() {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getNotifications();
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.Notifications = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  // GetProjects(DSWOID_NO_Id) {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getProjectDetailsForScrutiny(DSWOID_NO_Id);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.Projects = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  GETProjectNotificationDetails(DSWOID_NO_Id, PD_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getProjectNotificationDetails(DSWOID_NO_Id, PD_Id);
    this.data.subscribe(
      (response: any) => {
        this.PND = response;
        if (this.PND.DSWOId_NO_Date != null) {
          const dateObj = new Date(this.PND.DSWOId_NO_Date);
          this.PND.DSWOId_NO_Date = `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
        }
        
        if (this.PND.DSWOId_NO_LastDate != null) {
          const lastDateObj = new Date(this.PND.DSWOId_NO_LastDate);
          this.PND.DSWOId_NO_LastDate = `${('0' + lastDateObj.getDate()).slice(-2)}/${('0' + (lastDateObj.getMonth() + 1)).slice(-2)}/${lastDateObj.getFullYear()}`;
        }
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetInstallmentPaySchedule(NO_Id, PD_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetInstallmentPaySchedule(NO_Id, PD_Id);
    this.data.subscribe(
      (response: any) => {
        swal('', 'Saved Successfully!', 'success');
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllotmentList(DSWOID_NO_Id, PD_Id, CaTName) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllotmentList(DSWOID_NO_Id, PD_Id, CaTName);
    this.data.subscribe(
      (response: any) => {
        this.AllotmentList = response;
        for (let i = 0; i < this.AllotmentList.length; i++) {
          if (this.AllotmentList[i].App_PrintLetter == 1) {
            this.AllotmentList[i].App_PrintLetter = true;
          }
          else { this.AllotmentList[i].App_PrintLetter = false; }
        }
        this.showprint = true;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  createInstallmentnew(APP_No, DSWOID_NO_Id, PD_Id, CaTName,installmentNo,Days) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.createInstallmentnew(APP_No,installmentNo,Days)
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        swal('', 'Installments Added Successfully!', 'success');
        this.GetAllotmentList(DSWOID_NO_Id, PD_Id, CaTName)
        // this.router.navigate(['/home/planning']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        // this.errorHandler.HandlerError(error);
      })
  }
  
  createInstallment(APP_No, DSWOID_NO_Id, PD_Id, CaTName) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.createInstallment(APP_No)
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        swal('', 'Installments Added Successfully!', 'success');
        this.GetAllotmentList(DSWOID_NO_Id, PD_Id, CaTName)
        // this.router.navigate(['/home/planning']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        // this.errorHandler.HandlerError(error);
      })
  }


  // GetAllotmentList(DSWOID_NO_Id,PD_Id){
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.getAllotmentList(DSWOID_NO_Id,PD_Id);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.AllotmentList= response;
  //       this.showprint=true;
  //     //  if (this.PND.DSWOId_NO_Date != null)
  //      // this.PND.DSWOId_NO_Date = ((this.PND.DSWOId_NO_Date).split('T'))[0];
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  SaveCost(cost: any, S_NotificationID: any, S_ProjectID: any) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.CreateFinalCost(S_NotificationID, S_ProjectID, cost)
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        swal('', 'Saved Successfully!', 'success');
        // this.router.navigate(['/home/planning']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        // this.errorHandler.HandlerError(error);
      })
  }

  GetInstallment(INS_Id, i) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetInstallment(INS_Id);
    this.data.subscribe(
      (response: any) => {
        this.Inst = response;
        this.Inst.INS_No = i;
        if (this.Inst.INS_Due_Date != null)
          this.Inst.INS_Due_Date = ((this.Inst.INS_Due_Date).split('T'))[0];
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  UpdateInstallment(Ins, DSWOID_NO_Id, PD_Id, CaTName) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.UpdateInstallment(Ins)
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.GetAllotmentList(DSWOID_NO_Id, PD_Id, CaTName)
        // swal('', 'Successfully!', 'success');
        // this.router.navigate(['/home/planning']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        // this.errorHandler.HandlerError(error);
      })
  }

  getFinalTotal() {
    this.cost.PFC_Final_Cost = "0";
    this.cost.PFC_Final_Cost = parseFloat(this.cost.PFC_Final_Cost) + parseFloat(this.cost.PFC_Cost_per_Sqmt || 0) * parseFloat(this.cost.PFC_Sqmt || 0);
  }

  changeCheckbox(APP_No: any) {
    for (let i = 0; i < this.AllotmentList.length; i++) {
      if (this.AllotmentList[i].APP_No == APP_No) {
        if (this.AllotmentList[i].App_PrintLetter == false) {
          this.AllotmentList[i].App_PrintLetter = true;
          break;
        }
        else { this.AllotmentList[i].App_PrintLetter = false; }
        break;
      }
    }
  }


 SaveandPrintAllotmentLetter(S_NotificationID, S_ProjectID, CaTName) {
    debugger;
    console.log("Function Start: SaveandPrintAllotmentLetter");

    document.getElementById('loader-spinner').style.display = "block";
    this.allotmentdata = []; // Clear array each time function is called

    for (let i = 0; i < this.AllotmentList.length; i++) {
        console.log(`Processing item ${i}`, this.AllotmentList[i]);
        
        if (this.AllotmentList[i].App_PrintLetter) {
            this.AllotmentList[i].App_PrintLetter = 1;

            let temp = {
                App_No: this.AllotmentList[i].APP_No,
                App_PrintLetter: this.AllotmentList[i].App_PrintLetter
            };

            this.allotmentdata.push(temp);
        } else {
            this.AllotmentList[i].App_PrintLetter = 0;
        }
    }

    console.log("Allotment Data Prepared:", this.allotmentdata);

    this.data = this.userService.SaveandPrintAllotmentLetter(this.allotmentdata);
    this.data.subscribe(
        (response: any) => {
            console.log("API Response:", response);
            document.getElementById('loader-spinner').style.display = "none";
            if (response) {
                console.log("Navigation Triggered");
                this.router.navigate(['/khbnotification/', S_NotificationID, S_ProjectID, CaTName]);
            } else {
                console.warn("Unexpected response value:", response);
            }
        },
        (error) => {
            console.error("API Error:", error);
            document.getElementById('loader-spinner').style.display = "none";
        }
    );
}



  GetKhbNotification(NotificationID, ProjectID, CaTName) {
    
    this.Exceldata = [];
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.getKhbNotification(NotificationID, ProjectID, CaTName)
      .subscribe(
        (response: any) => {
          this.PrintAllotmentList = response;
          for (let i = 0; i < this.PrintAllotmentList.length; i++) {
            for (let m = 0; m < this.PrintAllotmentList[i].AllotmentLetterModel.length; m++) {
              let temp = {
                // APP_Id: this.PrintAllotmentList[i].AllotmentLetterModel[m].APP_Id,
                Allotted_Date: this.PrintAllotmentList[i].AllotmentLetterModel[m].PR_App_AllotDate,
                APP_No: this.PrintAllotmentList[i].AllotmentLetterModel[m].APP_No,
                Reservation_Name: this.PrintAllotmentList[i].AllotmentLetterModel[m].RES_Name,
                DI_District: this.PrintAllotmentList[i].AllotmentLetterModel[m].DI_District,
                Property_Type: this.PrintAllotmentList[i].AllotmentLetterModel[m].PT_Property_Type,
                CategoryName: this.PrintAllotmentList[i].AllotmentLetterModel[m].CA_CategoryName,
                //RES_Name: this.PrintAllotmentList[i].AllotmentLetterModel[m].RES_Name,
                Applicant_Name: this.PrintAllotmentList[i].AllotmentLetterModel[m].APP_PA_Name,
                APP_Address1: this.PrintAllotmentList[i].AllotmentLetterModel[m].APP_Address1,
                APP_Address2: this.PrintAllotmentList[i].AllotmentLetterModel[m].APP_Address2,

                TA_Taluk: this.PrintAllotmentList[i].AllotmentLetterModel[m].TA_Taluk,
                Applicant_Pincode: this.PrintAllotmentList[i].AllotmentLetterModel[m].APP_Pincode,

                Dimension: this.PrintAllotmentList[i].AllotmentLetterModel[m].CA_Dimension,
                Notification_Date: this.PrintAllotmentList[i].AllotmentLetterModel[m].DSWOId_NO_Date,
                Property_No: this.PrintAllotmentList[i].AllotmentLetterModel[m].LOD_Property_No,
                InitialDeposit: this.PrintAllotmentList[i].AllotmentLetterModel[m].PC_InitialDeposit,

                Registration_Fee: this.PrintAllotmentList[i].AllotmentLetterModel[m].PC_RegFee,
                Project_Name: this.PrintAllotmentList[i].AllotmentLetterModel[m].PD_Project_Name,
                Property_Final_Cost: this.PrintAllotmentList[i].AllotmentLetterModel[m].PFC_Final_Cost,
                Area: this.PrintAllotmentList[i].AllotmentLetterModel[m].PFC_Sqmt,


              }
              this.Exceldata.push(temp);
            }
          }
          let j, k, o, r;
          for (j = 0; j < this.Exceldata.length; j++) {
            for (k = 0; k < this.PrintAllotmentList.length; k++) {
              if (this.Exceldata[j].APP_Id == this.PrintAllotmentList[k].APP_Id) {
                for (o = 0; o < this.PrintAllotmentList[k].AllotmentLetterModel.length; o++) {

                  this.Exceldata[j].InstallmentI = this.PrintAllotmentList[k].AllotmentLetterModel[o].Installments.Inst_I;
                  this.Exceldata[j].InstallmentIDate = this.PrintAllotmentList[k].AllotmentLetterModel[o].Installments.Inst_I_Duedate;
                  this.Exceldata[j].InstallmentII = this.PrintAllotmentList[k].AllotmentLetterModel[o].Installments.Inst_II;
                  this.Exceldata[j].InstallmentIIDate = this.PrintAllotmentList[k].AllotmentLetterModel[o].Installments.Inst_II_Duedate;
                  this.Exceldata[j].InstallmentIII = this.PrintAllotmentList[k].AllotmentLetterModel[o].Installments.Inst_III;
                  this.Exceldata[j].InstallmentIIIDate = this.PrintAllotmentList[k].AllotmentLetterModel[o].Installments.Inst_III_Duedate;
                  this.Exceldata[j].InstallmentIV = this.PrintAllotmentList[k].AllotmentLetterModel[o].Installments.Inst_IV;
                  this.Exceldata[j].InstallmentIVDate = this.PrintAllotmentList[k].AllotmentLetterModel[o].Installments.Inst_IV_Duedate;

                }
              }
            }
          }
          this.exportAsXLSX();
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }



  exportAsXLSX(): void {
    
    this.userService.exportAsExcelFile(this.Exceldata, 'AllotmentLetter');
  }

  // captureScreen()  
  // {  
  //   
  //   var data = document.getElementById('contentToConvert');  
  //   html2canvas(data).then(canvas => {  
  //     // Few necessary setting options  
  //     var imgWidth = 208;   
  //     var pageHeight = 295;    
  //     var imgHeight = canvas.height * imgWidth / canvas.width;  
  //     var heightLeft = imgHeight;  

  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //     var position = 0;  
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  //     pdf.save('MYPdf.pdf'); // Generated PDF   
  //   });  
  // }  
}
