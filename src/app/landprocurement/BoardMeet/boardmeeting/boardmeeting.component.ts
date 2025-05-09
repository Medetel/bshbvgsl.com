import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-boardmeeting',
  templateUrl: './boardmeeting.component.html',
  styleUrls: ['./boardmeeting.component.css']
})
export class BoardmeetingComponent implements OnInit {

  proposallst: any=[];
  title = "Add Board Meeting";
  proposallist: any=[];
  b: any = {};
  data: any;
  district: string;
  Taluk: string;
  Village: string;
  ProposalFor: string;
  fileToUpload: File = null;
  formInvalid: boolean = false;
  mode: string
  BM_Id: number
  hide: boolean = false;
  projectlist;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    
    

    this.route.params.subscribe(params => {
      this.BM_Id = params['BM_Id'];
      this.mode = params['mode'];

      

      if (this.mode == 'view') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "View Board Meeting";
      }
      else if (this.mode == 'edit') {
        this.title = "Edit Board Meeting";
      }
    });
    if (this.BM_Id > 0) {
      this.GetByIdBoardMeeting(this.BM_Id);
    }
    this.getDefaultData();
    
    // this.GetAllProjectforLR();
  }

  GetAllProjectforLR() {
    this.data = this.userService.GetAllProjectforLR();
    this.data.subscribe(
      (response: any) => {       
        this.projectlist = response;
      }, (error) => {

      });
  }

  getDefaultData() {
    
    if (this.BM_Id > 0) {
      this.data = this.userService.getAllProposalReportdropdown();
      this.data.subscribe(
        (response: any) => {
          this.proposallist = response;
        });
      
    }

    else {
      this.data = this.userService.getAllProposalReportdropdownOnfilter('Boardmeeting');
      this.data.subscribe(
        (response: any) => {
          this.proposallist = response.Result;
        });
    }

  }

  GetProposalId(Id) {
    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == Id)
        this.b.BM_PR_Id_FK = this.projectlist[i].PD_PR_Id_FK
    }
  }

  GetOtherrelatedinfo(Id) {
    this.data = this.userService.getAllProposalReportdropdown();
      this.data.subscribe(
        (response: any) => {
          this.proposallst = response;
          for (let i = 0; i < this.proposallst.length; i++) {
            if (this.proposallst[i].PR_Id_PK == Id) {
              this.district = this.proposallst[i].DI_District;
              this.Taluk = this.proposallst[i].TA_Taluk;
              this.Village = this.proposallst[i].PR_Village;
              this.ProposalFor = this.proposallst[i].PR_For;
             
            }
          }
        });
    
    
  }


  SaveBoardMeeting(boardmeetingForm: NgForm) {
    
    boardmeetingForm.value.BM_FilePath = this.getimageUpload1();
    boardmeetingForm.value.BM_AgendaFile = this.getAgendaimageUpload1();
    if (boardmeetingForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    if(boardmeetingForm.value.BM_FilePath == null){
      this.formInvalid = true;      
      swal('Warning!', 'Please upload file.', 'warning');
      return;
    }  
    if(boardmeetingForm.value.BM_AgendaFile == null){
      this.formInvalid = true;      
      swal('Warning!', 'Please upload file.', 'warning');
      return;
    }  

    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.PostBoardMeeting(boardmeetingForm.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          boardmeetingForm.reset();
          boardmeetingForm.resetForm();
          boardmeetingForm.form.markAsPristine();
          boardmeetingForm.form.markAsUntouched();
          swal('Success!', 'Board Meeting Added Successfully .', 'success');
          this.router.navigate(['/home/boardmeeting']);
          
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


  UpdateBoardMeeting(boardmeetingForm: NgForm) {
    boardmeetingForm.value.BM_FilePath = this.getimageUpload1();
    //boardmeetingForm.value.BM_FilePath = this.b.BM_FilePath;    
    boardmeetingForm.value.BM_AgendaFile = this.getAgendaimageUpload1();
    if (boardmeetingForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.UpdateBoardMeeting(this.BM_Id, boardmeetingForm.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          boardmeetingForm.reset();
          boardmeetingForm.resetForm();
          boardmeetingForm.form.markAsPristine();
          boardmeetingForm.form.markAsUntouched();
          swal('Success!', 'Board Meeting Updated Successfully .', 'success');
          this.router.navigate(['/home/boardmeeting']);
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

  imageUpload(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('BM_FilePath');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('BM_FilePath');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getimageUpload1() {
    let imagename = null;
    try {
      imagename = document.getElementById('BM_FilePath');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  AgendaimageUpload(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('BM_AgendaFile');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('BM_AgendaFile');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getAgendaimageUpload1() {
    let imagename = null;
    try {
      imagename = document.getElementById('BM_AgendaFile');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }


  GetByIdBoardMeeting(BM_Id) {
    
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdBoardMeeting(BM_Id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.b = response;
        this.b.BM_ResolutionDate = ((this.b.BM_ResolutionDate).split('T'))[0];
        this.b.BM_BoardMeeting_Date = ((this.b.BM_BoardMeeting_Date).split('T'))[0];
        this.GetOtherrelatedinfo(this.b.BM_PR_Id_FK);       

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }


}
