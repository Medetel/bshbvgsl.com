import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'agreements-form',
  templateUrl: './agreements-form.component.html',
  styleUrls: ['./agreements-form.component.css']
})
export class AgreementsFormComponent implements OnInit {

  data: any;
  AG: any = {};
  aa: any = {};
  AgreementType: any = [];
  AT: any = [];
  AllotmentType: any = [];
  ALT: any = {};
  PaymentType: any = [];
  PT: any = {};
  LesserDetails: any = [];
  LD: any = {};
  LesseeDetails: any = [];
  L: any = {};
  Projectlist: any = [];
  PD: any = {};
  Propertylist: any = [];
  PL: any = {};
  mode: any;
  title: string;
  PD_Id: any;
  CustomerList: any = {};
  CUST_ID: any;
  listOfless: any = [];
  li: any = {};
  PropertyTemp: any = [];
  PropertyAgreementList: any = [];
  PG: any = {};
  AgreementList: any = [];
  OA: any = {};
  REQP_ID: any;
  isSearch: boolean;
  ApprovalList: any = [];
  totalItems: any;
  itemsPerPage: number;
  currentPage: number;
  RequestProperty: any = [];
  BackId: any;
  Agrmnt_Id: any;
  fileToUpload: File;
  Total: any;
  PaymentFrequency: any;
  Applant_Type: any;
  formSubmitted: boolean;
  hide: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,
  ) {
  }

  ngOnInit() {
    this.GetAgreementType();
    this.GetAllotmentType();
    this.GetPaymentType();
    this.GetPaymentFrequency();
    this.GetLesserDetails();
    this.GetLesseeDetails();
    this.GetProjectAgreement();
    this.GetOldAgreement();

    this.route.params.subscribe(params => {

      this.PD_Id = params['PD_Id'];
      this.CUST_ID = params['CUST_ID'];
      this.REQP_ID = params['REQP_ID'];
      this.BackId = params['BackId'];
      this.Agrmnt_Id = params['Agrmnt_Id'];
      this.mode = params['mode'];
      this.Applant_Type = params['Applant_Type'];

      if (this.REQP_ID > 0) {
        this.GetByIdRequestProperty(this.REQP_ID)
      }
    })
    if (this.mode == 'View') {
      this.title = "View Agreements ";
    }
    else if (this.mode == 'Edit') {
      this.title = "Edit Agreements ";
    }
    this.Agrmnt_Id = localStorage.getItem('Agrmnt_Id')

  }

  GetOldAgreement() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetOldAgreement();
    this.data.subscribe(
      (response: any) => {
        this.AgreementList = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAgreementType() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAgreementType();
    this.data.subscribe(
      (response: any) => {
        if (this.Applant_Type == 'Renewal')
          this.AG.Agrmnt_Type = 6;
        this.AgreementType = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllotmentType() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllotmentType();
    this.data.subscribe(
      (response: any) => {
        this.AllotmentType = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetPaymentType() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetPaymentType();
    this.data.subscribe(
      (response: any) => {
        this.PaymentType = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetPaymentFrequency() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetPaymentFrequency();
    this.data.subscribe(
      (response: any) => {
        this.PaymentFrequency = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetLesserDetails() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetLesserDetails();
    this.data.subscribe(
      (response: any) => {
        this.LesserDetails = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetLesseeDetails() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetLesseeDetails();
    this.data.subscribe(
      (response: any) => {
        this.listOfless = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetCustomerDetailsById(CUST_ID) {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetCustomerDetailsById(CUST_ID);
    this.data.subscribe(
      (response: any) => {
        this.CustomerList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetProjectAgreement() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetProjectAgreement();
    this.data.subscribe(
      (response: any) => {
        this.Projectlist = response.Result;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  Delete(i) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.PropertyTemp.splice(i, 1)
      }
    })
  }

  CancelAll() {
    this.AG = {};
    this.PG = {};
    this.CustomerList = {};
  }

  Cancel() {
    this.PG = {};
  }

  CreateAgreementDetails(PropertyAgreement) {
    PropertyAgreement.PropertyAgreement = this.PropertyTemp;
    PropertyAgreement.Lessee_Adress = this.PG.CUST_ADRSS1;
    PropertyAgreement.Lessee_Contact = this.PG.CUST_CNT_NO;
    PropertyAgreement.Lessee_Details = this.PG.CUST_ID;
    PropertyAgreement.Agr_REQP_Id = this.PG.REQP_ID;
    PropertyAgreement.PropertyAgreement = this.Propertylist;
    this.data = this.userService.CreateAgreementDetails(PropertyAgreement);

    PropertyAgreement.DOC_UPLOAD_PATH = this.getAgreementPDFUrl();
    this.data.subscribe(
      (response) => {
        swal('Success!', 'Property Agreement Details Added Successfully .', 'success');
        this.router.navigate(['/home/agreements']);
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401 || error.status == 500) {
          this.errorHandler.handleError(error);
        }
        else if (error.status == 400) {
          swal('Warning!', error.error.Message, 'warning');
        }
      });
  }

  GetByIdRequestProperty(REQP_ID) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdRequestProperty(REQP_ID);
    this.data.subscribe(
      (response: any) => {
        this.PG = response;
        this.Propertylist = response.RequestProperty;

        if (response.AgreementGetById != null)
          this.AG = response.AgreementGetById;
        if (this.AG.DOC_DATE != null)
          this.AG.DOC_DATE = ((this.AG.DOC_DATE).split('T'))[0];
        if (this.AG.Start_Date != null)
          this.AG.Start_Date = ((this.AG.Start_Date).split('T'))[0];
        if (this.AG.End_Date != null)
          this.AG.End_Date = ((this.AG.End_Date).split('T'))[0];
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  UpdatePropertyAgreement(PropertyAgreement) {
    PropertyAgreement.DOC_UPLOAD_PATH = this.getAgreementPDFUrl();
    PropertyAgreement.Agrmnt_Id = this.AG.Agrmnt_Id;
    PropertyAgreement.PropertyAgreement = this.Propertylist;
    this.data = this.userService.UpdatePropertyAgreement(PropertyAgreement.Agrmnt_Id, PropertyAgreement);
    this.data.subscribe(
      (response) => {
        swal('Success!', ' Property Agreement details updated Successfully .', 'success');
        document.getElementById('loader-spinner').style.display = "none";
        this.router.navigate(['/home/agreements']);
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401) {
          this.errorHandler.handleError(error);
        }
      });
  }

  GetAllRequestPropertyApprovalDetails(itemsPerPage: number, pageNo: number) {
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllRequestPropertyApprovalDetails(itemsPerPage, pageNo)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.ApprovalList = data.RequestPropertyApprovalModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
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
      let x = this.userService.uploadImageRecovery(data);
      x.subscribe(
        (response) => {
        }, (error) => {
          let i: any = document.getElementById('DOC_UPLOAD_PATH');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('DOC_UPLOAD_PATH');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getAgreementPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('DOC_UPLOAD_PATH');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  GetTotal(Rate, Maintenance_Cost, GST_Rate, TDS_Rate) {
    let total = (parseFloat(Rate || 0) + parseFloat(Maintenance_Cost || 0) + (GST_Rate / 100) - (TDS_Rate / 100));
    this.PL.TotalAmount = total;
  }

}