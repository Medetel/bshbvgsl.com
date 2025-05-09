import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
@Component({
  selector: 'app-contractordoc-form',
  templateUrl: './contractordoc-form.component.html',
  styleUrls: ['./contractordoc-form.component.css']
})
export class ContractordocFormComponent implements OnInit {
  data: any;
  formInvalid: boolean;
  ContractorDoc_id: number
  hide: boolean = false;
  mode: string = "";
  i: any = {};
  uploadPath: string;
  fileToUpload_Contractdoc: File = null;
  projectcode: any = [];
  contractorcode: any = [];
  title = "Add Contractor Document";
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllProjectContractdocument();
    this.GetAllContractor();
    this.route.params.subscribe(params => {

      this.ContractorDoc_id = params['ContractorDoc_id'];
      this.mode = params['mode'];

      if (this.ContractorDoc_id > 0) {
        this.GetByIdContractdocument(this.ContractorDoc_id);
      }

      if (this.mode == 'view') {
        this.hide = true;
      }

      if (this.mode == 'view') {
        this.title = "View Contractdoc";
      }
      else if (this.mode == 'edit') {
        this.title = "Edit Contractdoc";
      }
    });


    if (this.ContractorDoc_id > 0) {
      this.GetByIdContractdocument(this.ContractorDoc_id);
    }
  }
  SaveContractDocument(ContractDocumentForm: NgForm) {

    ContractDocumentForm.value.ContractorDoc = this.getimageUpload1();
    if (ContractDocumentForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }
    if (ContractDocumentForm.value.ContractorDoc == null) {
      this.formInvalid = true;
      swal('Warning!', 'Please upload file.', 'warning');
      return;
    }
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.PostContractDocument(ContractDocumentForm.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          ContractDocumentForm.reset();
          ContractDocumentForm.resetForm();
          ContractDocumentForm.form.markAsPristine();
          ContractDocumentForm.form.markAsUntouched();
          swal('Success!', 'Contractor document Added Successfully .', 'success');
          this.router.navigate(['/home/contractordoc']);
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

  GetAllProjectContractdocument() {
    this.data = this.userService.GetAllProjectContractdoc();
    this.data.subscribe(
      (response: any) => {
        this.projectcode = response;
      }, (error) => {

      });
  }

  GetAllContractor() {
    this.data = this.userService.GetAllContractorfordoc();
    this.data.subscribe(
      (response: any) => {
        this.contractorcode = response;
      }, (error) => {

      });
  }

  ContractorDoc(file: FileList) {   
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload_Contractdoc = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
      }
      reader.readAsDataURL(this.fileToUpload_Contractdoc);
      const data = new FormData();
      data.append("UploadedImage_Contractdoc", file.item(0));
      let x = this.userService.uploadcontractordoc(data);
      x.subscribe(
        (response) => {

        }, (error) => {
          let i: any = document.getElementById('ContractorDoc');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('ContractorDoc');
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
      imagename = document.getElementById('ContractorDoc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  UpdateContractdoc(ContractDocumentForm: NgForm) {
    if (ContractDocumentForm.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      if (ContractDocumentForm.value.ContractorDoc != null && !ContractDocumentForm.value.ContractorDoc.match("http"))
        ContractDocumentForm.value.ContractorDoc = this.getcontractordocUploadedit1();
      ContractDocumentForm.value.ContractorDoc = this.getcontractordocUploadedit1();
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.UpdateContractdocument(this.ContractorDoc_id, ContractDocumentForm.value);
      this.data.subscribe(
        (response) => {
          document.getElementById('loader-spinner').style.display = "none";
          ContractDocumentForm.reset();
          ContractDocumentForm.resetForm();
          ContractDocumentForm.form.markAsPristine();
          ContractDocumentForm.form.markAsUntouched();
          swal('Success!', 'Contract Document Updated Successfully .', 'success');
          this.router.navigate(['/home/contractordoc']);

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

  getcontractordocUploadedit1() {
    let imagename = null;
    try {
      imagename = document.getElementById('ContractorDoc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  GetByIdContractdocument(ContractorDoc_id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdContractdpcument(ContractorDoc_id);
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.i = response;
        this.uploadPath = this.i.ContractorDoc;

      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
}