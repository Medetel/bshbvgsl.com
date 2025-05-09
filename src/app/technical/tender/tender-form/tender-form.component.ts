import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-tender-form',
  templateUrl: './tender-form.component.html',
  styleUrls: ['./tender-form.component.css']
})
export class TenderFormComponent implements OnInit {
  data: any;
  formInvalid: boolean;
  Tender_id: number
  hide: boolean = false;
  mode: string = "";
  title = "Add Tender";
  i: any = {};
  //fileToUpload: File = null;
  uploadPath: string;
  uploadPath2: string;
  fileToUpload_Tender: File = null;
  fileToUpload_Publication: File = null;
  numericpattern = "^[0-9]*$";
  // alphanumpattern = "^[a-zA-Z0-9 ]*$";
  projectcode: any = [];
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllProject();

    this.route.params.subscribe(params => {

      this.Tender_id = params['Tender_id'];
      this.mode = params['mode'];

      if (this.Tender_id > 0) {
        this.GetByIdTender(this.Tender_id);
      }

      if (this.mode == 'view') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "View Tender";
      }
      else if (this.mode == 'edit') {
        this.title = "Edit Tender";
      }
    });


    if (this.Tender_id > 0) {
      this.GetByIdTender(this.Tender_id);
    }

  }
  GetAllProject() {
    this.data = this.userService.GetAllProjecttender();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;       
      }, (error) => {

      });
  }

  SaveTender(TenderForm: NgForm) {   
    TenderForm.value.Tender_Document = this.getimageUpload1();
    TenderForm.value.Publication_Document = this.getimageUpload2();
    if (TenderForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    if (TenderForm.value.Tender_Document == null) {
      this.formInvalid = true;
      swal('Warning!', 'Please upload file.', 'warning');
      return;
    }

    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.PostTender(TenderForm.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          TenderForm.reset();
          TenderForm.resetForm();
          TenderForm.form.markAsPristine();
          TenderForm.form.markAsUntouched();
          swal('Success!', 'Tender Added Successfully .', 'success');
          this.router.navigate(['/home/tender']);

        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          if (error.status == 401) {
            this.errorHandler.handleError(error);
          }
          else if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        }
      );
    }

  }

  Tender_Document_Upload(file: FileList) {   
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload_Tender = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(this.fileToUpload_Tender);
      const data = new FormData();
      data.append("UploadedImage_Tender", file.item(0));
      let x = this.userService.uploadTenderImage(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('Tender_Document');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('Tender_Document');
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
      imagename = document.getElementById('Tender_Document');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  Publication_Document_Upload(file: FileList) { 

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload_Publication = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(this.fileToUpload_Publication);
      const data = new FormData();
      data.append("UploadedImage_Publication", file.item(0));
      let x = this.userService.uploadPublicationImage(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('Publication_Document');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('Publication_Document');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  Tender_Document_Upload_Edit(file: FileList) {   
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload_Tender = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(this.fileToUpload_Tender);
      const data = new FormData();
      data.append("UploadedImage_Tender_Edit", file.item(0));
      let x = this.userService.uploadTenderImageforedit(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('Tender_Document');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('Tender_Document');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  Publication_Document_Upload_Edit(file: FileList) {   
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload_Publication = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(this.fileToUpload_Publication);
      const data = new FormData();
      data.append("UploadedImage_Publication_Edit", file.item(0));
      let x = this.userService.uploadPublicationImageforedit(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('Publication_Document');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('Publication_Document');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getimageUpload22() {
    let imagename = null;
    try {
      imagename = document.getElementById('Publication_Document');
      const fakePath = imagename.value;
      // Extracting the file name from the fake path
      const fileName = fakePath.split('\\').pop();      
      return fileName;
    } catch (e) {
      return null;
    }
  }

  getimageUpload2() {
    let imagename = null;
    try {
      imagename = document.getElementById('Publication_Document');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  UpdateTender(TenderForm: NgForm) {
    if (TenderForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      if (TenderForm.value.Tender_Document != null && !TenderForm.value.Tender_Document.match("http"))
        TenderForm.value.Tender_Document = this.getimageUploadedit1();
      TenderForm.value.Tender_Document = this.getimageUploadedit1();
      TenderForm.value.Publication_Document = this.getimageUploadedit2();
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.UpdateTender(this.Tender_id, TenderForm.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          TenderForm.reset();
          TenderForm.resetForm();
          TenderForm.form.markAsPristine();
          TenderForm.form.markAsUntouched();
          swal('Success!', 'Tender Updated Successfully .', 'success');
          this.router.navigate(['/home/tender']);

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


  GetByIdTender(Tender_id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdTender(Tender_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.i = response;
        this.uploadPath = this.i.Tender_Document;
        this.uploadPath2 = this.i.Publication_Document;          
        if (this.i.Notification_Date != null)
          this.i.Notification_Date = ((this.i.Notification_Date).split('T'))[0];
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  getimageUploadedit1() {
    let imagename = null;
    try {
      imagename = document.getElementById('Tender_Document');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  getimageUploadedit2() {
    let imagename = null;
    try {
      imagename = document.getElementById('Publication_Document');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

}