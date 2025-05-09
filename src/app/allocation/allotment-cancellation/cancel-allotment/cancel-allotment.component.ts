import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
//import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-cancel-allotment',
  templateUrl: './cancel-allotment.component.html',
  styleUrls: ['./cancel-allotment.component.css']
})
export class CancelAllotmentComponent implements OnInit {
  title = "Cancellation";
  APP_No: any;
  Installments;
  CancelAppData: any = {};
  formSubmitted: boolean;
  PR_Id: any;
  PD_Id: any;
  Phase_Name: any;
  PD_Project_Name: any;
  Sch_Id: any;
  fileToUpload: File = null;
  type: any;
  Can_Type: any;
  PAC_Id: any;
mode:any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
    this.CancelAppData.PAC_SubmittoFinance = 'N';
    this.CancelAppData.PAC_Can_Type='NPC';
   
  }

  ngOnInit() {
    debugger
    this.route.params.subscribe(params => {
      this.APP_No = params['APP_No'],
        this.PR_Id = params['PR_Id'],
        this.PD_Id = params['PD_Id'],
        this.PD_Project_Name = params['PD_Project_Name'],
        this.Phase_Name = params['Phase_Name'],
        this.Sch_Id = params['Sch_Id'],
        this.type = params['type']
      this.Can_Type = params['Can_Type']
      this.PAC_Id = params['PAC_Id']


    });
    if (this.Can_Type != null) {
      this.CancelAppData.PAC_Can_Type = this.Can_Type
      this.getcanceltype(this.Can_Type)
    }
    if (this.APP_No != null)
      this.GetApplicantforallotmentCancel(this.APP_No);
  }

  GetApplicantforallotmentCancel(APP_No) {
    debugger
    // let params = new HttpParams();
    // params = params.append('APP_No', this.APP_No);
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetApplicantforallotmentCancel(APP_No)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.CancelAppData = data;
          if (this.CancelAppData.Alloted_date != null) {
            this.CancelAppData.Alloted_date = ((this.CancelAppData.Alloted_date).split('T'))[0];
          }
          this.CancelAppData.PAC_Penalty_Amt = this.CancelAppData.ID * 0.25;
          this.CancelAppData.PAC_Refund_Amt = this.CancelAppData.ID - this.CancelAppData.PAC_Penalty_Amt;
          this.Installments = data.PostAllotmentInstallmentModel;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  onSubmit(form: NgForm) {
    debugger;
    if (!form.invalid) {
      if (this.Can_Type != null) {
        form.value.direct="Yes";
        form.value.PAC_Id=this.PAC_Id;

      }
      form.value.APP_Id = this.CancelAppData.APP_Id
      form.value.PAC_Doc = this.getPAC_Doc();
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.CreatePostCancelRequest(form.value, this.PR_Id)
        .subscribe(
          (data: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            // if (data == "Success") {
            //   swal('', 'Saved Successfully!', 'success');
            //   this.router.navigate(['/home/allotmentcancellation/allotted-vacant',this.PD_Id,this.PD_Project_Name,this.Phase_Name,this.Sch_Id]);
            // }
            swal('', 'Saved Successfully!', 'success');
            this.router.navigate(['/home/allotmentcancellation/allotted-vacant', this.PD_Id, this.PD_Project_Name, this.Phase_Name, this.Sch_Id]);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            if (error.status == 401) {
              this.errorHandler.handleError(error);
            }
            else if (error.status == 400) {
              swal('Warning!', error.error.Message, 'warning');
            }
          });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }
  getcanceltype(can_typ) {
    this.CancelAppData.PAC_Can_Ty = can_typ;
  }

  PAC_Docment(file: FileList) {
    debugger;
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        //  this.UO_UploadimageUrl1 = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
          console.log(response);
          // this.u.UO_UploadimageUrl2ErrorMessage="";
        }, (error) => {
          let i: any = document.getElementById('PAC_Doc');
          i.value = "";
          if (error.status == 400) {
            //   this.UO_UploadimageUrl1 = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('PAC_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload file less than 2mb", 'warning');
    }
  }


  getPAC_Doc() {
    let imagename = null;
    try {
      imagename = document.getElementById('PAC_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
}
