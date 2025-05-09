import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-statutory-clearances-form',
  templateUrl: './statutory-clearances-form.component.html',
  styleUrls: ['./statutory-clearances-form.component.css']
})
export class StatutoryClearancesFormComponent implements OnInit {
  formSubmitted: boolean;
  mode: any;
  SC_Id: any;
  formInvalid: boolean = false;
  SelectedStatutoryAuthority: any;
  title = "Statutory Clearances"
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
  }
  PD_Id: any;
  data: any;
  projectlist;
  saList;
  AAlist;
  SA: any = {};
  S: any = {};
  SADetails: any = [];
  projectDetails: any = {};
  StatutoryClerances: any = {};
  fileToUpload: File = null;
  SCApprovedDocUrl: string = "assets/images/default.jpg";

  ngOnInit() {

    this.GetAllProjectsforSA();
    this.GetAllStatutoryAuthorityList();
    this.route.params.subscribe(params =>
      this.PD_Id = params['PD_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if (this.PD_Id != null && this.mode != null)
      this.GetStatutoryForTheId(this.PD_Id);
  }

  GetStatutoryForTheId(PD_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetStatutoryForTheId(PD_Id)
      .subscribe(
        (data: any) => {
          // this.getProjectbyCode(data.CD_PD_ID_FK)
          this.SA = data;
          this.S = data;
          this.GetProjectDetailsforSA(this.SA.PD_Id);

          this.SADetails = data.StatutoryDetails;

          for (let i = 0; i < this.SADetails.length; i++) {
            if (this.SADetails[i].SC_SA_ID_FK != null)
              this.getAuthority(data.StatutoryDetails.SC_SA_ID_FK);
          }

          for (let i = 0; i < this.SADetails.length; i++) {
            if (this.SADetails[i].SC_Date != null)
              this.SADetails[i].SC_Date = ((this.SADetails[i].SC_Date).split('T'))[0];
          }         
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetAllProjectsforSA() {
    this.data = this.userService.GetAllProjectforSA();
    this.data.subscribe(
      (response: any) => {
        this.projectlist = response;
      }, (error) => {        
      });
  }

  getAuthority(SC_SA_ID_FK: any) {
    this.data = this.userService.getApproveAuthority(SC_SA_ID_FK);
    this.data.subscribe(
      (response: any) => {
        this.AAlist = response;
        this.GetSelectedSA(SC_SA_ID_FK);
      }, (error) => {
      });
  }

  GetProjectDetailsforSA(projectCode) {
    this.projectDetails = {};
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetProjectDetailsforSA(projectCode);
    this.data.subscribe(
      (response: any) => {       
        this.projectDetails = response;
        this.StatutoryClerances = response.StatutoryClearancesList;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        
      }
    );
  }


  GetAllStatutoryAuthorityList() {
    this.data = this.userService.GetAllStatutoryAuthorityList();
    this.data.subscribe(
      (response: any) => {      
        this.saList = response;
      }, (error) => {
       
      });
  }

  GetSelectedSA(sa: number) {
    for (let i = 0; i <= this.saList.length; i++) {
      if (sa == this.saList[i].SA_Id) {
        this.S.SA_Name = this.saList[i].SA_Name;
      }
    }
  }

  GetSelectedAA(aa: number) {
    for (let i = 0; i <= this.AAlist.length; i++) {
      if (aa == this.AAlist[i].AA_Id) {
        this.S.AA_Name = this.AAlist[i].AA_Name;
      }
    }

  }

  AddSADetails(S) {
    let SATemp = {
      SC_Id: S.SA_Id,
      SC_SA_ID_FK: S.SC_SA_ID_FK,
      SC_AA_ID_FK: S.SC_AA_ID_FK,
      SA_Name: S.SA_Name,
      SC_OrderNumber: S.SC_OrderNumber,
      SC_PD_ID_FK: this.SA.PD_Id,
      SC_Approved: S.approved,
      SC_Date: S.approveddate,
      SC_ApprovedDoc: this.getApprovedDocUrl()
    }   
    this.SADetails.push(SATemp);
    this.S = {};
  }

  SaveStatutoryDetails(Statutory: NgForm) {

    if (!Statutory.invalid) {
      this.AddSADetails(this.S);
      // this.formInvalid = false;
      Statutory.value.pd_id = this.SA.PD_Id;
      document.getElementById('loader-spinner').style.display = "block";  

      this.data = this.userService.saveStatutoryDetails(Statutory.value.pd_id, this.SADetails);
      this.data.subscribe((response) => {
        this.S = {};
        swal('Success!', 'saved successfully.', 'success');       
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {       
        document.getElementById('loader-spinner').style.display = "none";
      });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }

  update(Statutory: NgForm) {
    if (!Statutory.invalid) {
      this.AddSADetails(this.S);
      Statutory.value.pd_id = this.SA.PD_Id;
      document.getElementById('loader-spinner').style.display = "block";

      for (let i = 0; i < this.SADetails.length; i++) {
        if (this.SADetails[i].SC_ApprovedDoc != null)
          this.SADetails[i].SC_ApprovedDoc = this.getApprovedDocUrl();
      }
      this.userService.updateStatutoryDetails(Statutory.value.pd_id, this.SADetails)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.S = {};
            swal('', 'Updated Successfully!', 'success');          
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }

  //File Upload
  DocFileUploadInput(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 2048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.SCApprovedDocUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
        
        }, (error) => {
          let i: any = document.getElementById('SC_ApprovedDoc');
          i.value = "";
          if (error.status == 400) {
            this.SCApprovedDocUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('SC_ApprovedDoc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getApprovedDocUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('SC_ApprovedDoc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
}