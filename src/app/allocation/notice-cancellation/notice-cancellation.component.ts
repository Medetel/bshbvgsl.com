import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-notice-cancellation',
  templateUrl: './notice-cancellation.component.html',
  styleUrls: ['./notice-cancellation.component.css']
})
export class NoticeCancellationComponent implements OnInit {

  AllotmentList: any;
  PND: any = {};
  allotmentdata: any = [];
  Projects: any;
  Notifications: any;
  Not: any = {};
  data: any;
  cost: any = {};
  title = "Non Payment Cancellation Notice"
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
  Not_Type: any;
  App_No: any;
  App_Name: any;
  N_Id: any;
  notice: any = {};
  fileToUpload: File = null;
  OrdDocObj: any = {};

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
  }



  ngOnInit() {
    //swal("warning!","district initialisation","warning");
    //  window.open("http://localhost:14090/WebForm1.aspx", "_blank");
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
      document.getElementById('loader-spinner').style.display = "block";
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

  GetNoticeList(DSWOID_NO_Id, PD_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetNoticeList(DSWOID_NO_Id, PD_Id);
    this.data.subscribe(
      (response: any) => {
        this.AllotmentList = response;
        for (let i = 0; i < this.AllotmentList.length; i++) {
          if (this.AllotmentList[i].N_Ist_Notice == 1) {
            this.AllotmentList[i].N_Ist_Notice = true;
          }
          else { this.AllotmentList[i].N_Ist_Notice = false; }
          if (this.AllotmentList[i].N_IIst_Notice == 1) {
            this.AllotmentList[i].N_IIst_Notice = true;
          } else { this.AllotmentList[i].N_IIst_Notice = false; }
          if (this.AllotmentList[i].N_IIIst_Notice == 1) {
            this.AllotmentList[i].N_IIIst_Notice = true;
          } else { this.AllotmentList[i].N_IIIst_Notice = false; }
          if (this.AllotmentList[i].N_Order == 1) {
            this.AllotmentList[i].N_Order = true;
          } else { this.AllotmentList[i].N_Order = false; }
        }
        // this.showprint = true;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  createInstallment(APP_No, DSWOID_NO_Id, PD_Id, CaTName) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.createInstallment(APP_No)
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        swal('', 'Installments Added Successfully!', 'success');
        //this.GetAllotmentList(DSWOID_NO_Id, PD_Id, CaTName)
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
        //this.GetAllotmentList(DSWOID_NO_Id, PD_Id, CaTName)
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

  changeCheckboxnI(APP_No: any) {
    for (let i = 0; i < this.AllotmentList.length; i++) {
      if (this.AllotmentList[i].APP_No == APP_No) {
        if (this.AllotmentList[i].N_Ist_Notice == false) {
          this.AllotmentList[i].N_Ist_Notice = true;
          this.AllotmentList[i].Enable=true;
        }
        else{
          this.AllotmentList[i].N_Ist_Notice = false;
        }
      }
    }
    for (let i = 0; i < this.AllotmentList.length; i++) {
      if (this.AllotmentList[i].APP_No != APP_No && this.AllotmentList[i].N_Ist_Notice_Date == null) {
        this.AllotmentList[i].N_Ist_Notice = false;
        this.AllotmentList[i].Enable=false;
      }
      if (this.AllotmentList[i].N_Order_Date == null) {
        this.AllotmentList[i].N_Order = false;
      }
      if (this.AllotmentList[i].N_IIIst_Notice_Date == null) {
        this.AllotmentList[i].N_IIIst_Notice_Date = false;
      }
      if (this.AllotmentList[i].N_IIst_Notice_Date == null) {
        this.AllotmentList[i].N_IIst_Notice = false;
      }
    }
  }
  changeCheckboxnII(APP_No: any) {
    
    for (let i = 0; i < this.AllotmentList.length; i++) {
      if (this.AllotmentList[i].APP_No == APP_No) {
        if (this.AllotmentList[i].N_IIst_Notice == false) {
          this.AllotmentList[i].N_IIst_Notice = true;
          this.AllotmentList[i].Enable=true;
        }
        else{
          this.AllotmentList[i].N_IIst_Notice = false;
        }
      }
    }
    for (let i = 0; i < this.AllotmentList.length; i++) {
      if (this.AllotmentList[i].APP_No != APP_No && this.AllotmentList[i].N_IIst_Notice_Date == null) {
        this.AllotmentList[i].N_IIst_Notice = false;
        this.AllotmentList[i].Enable=false;
      }
      if (this.AllotmentList[i].N_Order_Date == null) {
        this.AllotmentList[i].N_Order = false;
      }
      if (this.AllotmentList[i].N_IIIst_Notice_Date == null) {
        this.AllotmentList[i].N_IIIst_Notice = false;
      }
      if (this.AllotmentList[i].N_Ist_Notice_Date == null) {
        this.AllotmentList[i].N_Ist_Notice = false;
      }
    }
  }
  changeCheckboxnIII(APP_No: any) {
    for (let i = 0; i < this.AllotmentList.length; i++) {
      if (this.AllotmentList[i].APP_No == APP_No) {
        if (this.AllotmentList[i].N_IIIst_Notice == false) {
          this.AllotmentList[i].N_IIIst_Notice = true;
          this.AllotmentList[i].Enable=true;
        }
        else{
          this.AllotmentList[i].N_IIIst_Notice = false;
        }
      }
    }
    for (let i = 0; i < this.AllotmentList.length; i++) {
      if (this.AllotmentList[i].APP_No != APP_No && this.AllotmentList[i].N_IIIst_Notice_Date == null) {
        this.AllotmentList[i].N_IIIst_Notice = false;
        this.AllotmentList[i].Enable=false;
      }
      if (this.AllotmentList[i].N_Order_Date == null) {
        this.AllotmentList[i].N_Order = false;
      }
      if (this.AllotmentList[i].N_IIst_Notice_Date == null) {
        this.AllotmentList[i].N_IIst_Notice = false;
      }
      if (this.AllotmentList[i].N_Ist_Notice_Date == null) {
        this.AllotmentList[i].N_Ist_Notice = false;
      }
    }
  }
  changeCheckboxor(APP_No: any) {
    for (let i = 0; i < this.AllotmentList.length; i++) {
      if (this.AllotmentList[i].APP_No == APP_No) {
        if (this.AllotmentList[i].N_Order == false) {
          this.AllotmentList[i].N_Order = true;
          this.AllotmentList[i].Enable=true;
          //break;
        }
        else{
          this.AllotmentList[i].N_Order = false;
        }
      }
    }
    for (let i = 0; i < this.AllotmentList.length; i++) {
      if (this.AllotmentList[i].APP_No != APP_No && this.AllotmentList[i].N_Order_Date == null) {
        this.AllotmentList[i].N_Order = false;
        this.AllotmentList[i].Enable=false;
      }
      if (this.AllotmentList[i].N_IIIst_Notice_Date == null) {
        this.AllotmentList[i].N_IIIst_Notice = false;
        this.AllotmentList[i].Enable=false;
      }
      if (this.AllotmentList[i].N_IIst_Notice_Date == null) {
        this.AllotmentList[i].N_IIst_Notice = false;
        this.AllotmentList[i].Enable=false;
      }
      if (this.AllotmentList[i].N_Ist_Notice_Date == null) {
        this.AllotmentList[i].N_Ist_Notice = false;
        this.AllotmentList[i].Enable=false;
      }
    }
  }


  SaveandPrintNoticeLetter(AppId: any, Notice, type: any) {
    
    let temp = null;
    if (Notice.Notice_Date != undefined && Notice.NoType != undefined ) {

      if(type == 'not' && Notice.NoticeNo == undefined){
        swal('', 'Please Select Mandatory fields!', 'warning');
        return false;}
      document.getElementById('loader-spinner').style.display = "block";
      if (type == 'ord') {
        this.Not_Type = 4;
        for (let i = 0; i < this.AllotmentList.length; i++) {
          if (this.AllotmentList[i].N_Order == true && this.AllotmentList[i].N_Order_Date == null) {
            this.AllotmentList[i].N_Order = 1;
            if (this.AllotmentList[i].N_Id == null) {
              this.AllotmentList[i].N_Id = 0;
            }
            temp = {
              N_App_Id_Fk: this.AllotmentList[i].APP_Id,
              N_Id: this.AllotmentList[i].N_Id,
              N_Order: this.AllotmentList[i].N_Order
            }
            this.allotmentdata.push(temp);
          }
          else { this.AllotmentList[i].N_Order = 0; }
        }
      }
      if (type == 'not') {
        this.Not_Type = Notice.NoticeNo;
        for (let i = 0; i < this.AllotmentList.length; i++) {
          if (this.Not_Type == 1) {
            if (this.AllotmentList[i].N_Ist_Notice == true && this.AllotmentList[i].N_Ist_Notice_Date == null) {
              this.AllotmentList[i].N_Ist_Notice = 1;
              if (this.AllotmentList[i].N_Id == null) {
                this.AllotmentList[i].N_Id = 0;
              }
              temp = {
                N_App_Id_Fk: this.AllotmentList[i].APP_Id,
                N_Id: this.AllotmentList[i].N_Id,
                N_Ist_Notice: this.AllotmentList[i].N_Ist_Notice
              }
              this.allotmentdata.push(temp);
            }
            else { this.AllotmentList[i].N_Ist_Notice = 0; }
          }
          else if (this.Not_Type == 2) {
            if (this.AllotmentList[i].N_IIst_Notice == true && this.AllotmentList[i].N_IIst_Notice_Date == null) {
              this.AllotmentList[i].N_IIst_Notice = 1;
              if (this.AllotmentList[i].N_Id == null) {
                this.AllotmentList[i].N_Id = 0;
              }
              temp = {
                N_App_Id_Fk: this.AllotmentList[i].APP_Id,
                N_Id: this.AllotmentList[i].N_Id,
                N_IIst_Notice: this.AllotmentList[i].N_IIst_Notice
              }
              this.allotmentdata.push(temp);
            }
            else { this.AllotmentList[i].N_IIst_Notice = 0; }
          }
          else if (this.Not_Type == 3) {
            if (this.AllotmentList[i].N_IIIst_Notice == true && this.AllotmentList[i].N_IIIst_Notice_Date == null) {
              this.AllotmentList[i].N_IIIst_Notice = 1;
              if (this.AllotmentList[i].N_Id == null) {
                this.AllotmentList[i].N_Id = 0;
              }
              temp = {
                N_App_Id_Fk: this.AllotmentList[i].APP_Id,
                N_Id: this.AllotmentList[i].N_Id,
                N_IIIst_Notice: this.AllotmentList[i].N_IIIst_Notice
              }
              this.allotmentdata.push(temp);
            }
            else { this.AllotmentList[i].N_IIIst_Notice = 0; }
          }
        }

      }
      this.data = this.userService.SaveandPrintNoticeLetter(this.allotmentdata, this.Not_Type, Notice.Notice_Date)
      this.data.subscribe(
        (response: any) => {
          // this.GetNoticeList(Notice.S_NotificationID, Notice.S_ProjectID)
          document.getElementById('loader-spinner').style.display = "none";
          // this.router.navigate(['/home/planning']);
          if (response == true) {
            if (this.Not_Type == 4) {
              this.router.navigate(['/khborderletter/', AppId, Notice.S_NotificationID, Notice.S_ProjectID, this.Not_Type]);
            }
            else {
              this.router.navigate(['/khbnoticeletter/', AppId, Notice.S_NotificationID, Notice.S_ProjectID, this.Not_Type]);
            }
          }
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          // this.errorHandler.HandlerError(error);
        })
    } else {
      swal('', 'Please Select Mandatory fields!', 'warning');
    }

  }
  Uploaddoc(AppNo: any, AppName: any, NId: any) {
    this.notice.N_OrdDoc = ""
    this.App_No = AppNo;
    this.App_Name = AppName;
    this.N_Id = NId;
  }

  UploadOrderDoc(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.FeasibilityPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          // console.log(response);
          // this.app.APP_PA_PhotoErrorMessage="";

        }, (error) => {
          let i: any = document.getElementById('N_OrdDoc');
          i.value = "";
          if (error.status == 400) {
            // this.FeasibilityPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('N_OrdDoc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getOrderPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('N_OrdDoc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  SavenoticeDoc() {
    
    if (this.notice.N_OrdDoc != null) {
      document.getElementById('loader-spinner').style.display = "block";
      this.notice.N_OrdDoc = this.getOrderPDFUrl();
      this.OrdDocObj.N_Id = this.N_Id;
      this.OrdDocObj.N_OrdDoc = this.notice.N_OrdDoc;
      this.userService.SaveOrderDoc(this.OrdDocObj)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Document Saved Successfully!', 'success');
            // this.router.navigate(['/home/planning']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    } else {
      document.getElementById('loader-spinner').style.display = "none";
      swal('', 'Please upload document.', 'success');
    }
  }
}
