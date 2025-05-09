import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-landrec-form',
  templateUrl: './landrec-form.component.html',
  styleUrls: ['./landrec-form.component.css']
})
export class LandrecFormComponent implements OnInit {
  title = "Add Land Details";

  ExtentinAcres: any;
  ExtentinGuntas: any;
  TotalAcres: any;
  TotalGuntas: any;
  total: any;
  mode: any;
  LandR_Id: any;
  PD_Id: any
  formSubmitted: boolean;
  Landlist: any;
  Surveylist: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  //variables declarations
  data: any;
  //projectlist;
  projectlist: any[] = []; // changed by saheb
  LRremarks;
  LRProcremarks;
  LR: any = {};
  LRN = {};
  Land: any = {};
  LR_ID;
  LR_Name;
  Survey_No;
  showIt = false;
  showMod = false;
  //projectDetails: any = {};
  projectDetails: any[] = []; // changed by saheb
  LandRecord: any[] = [];
  fileToUpload: File = null;
  Bank: any = {};
  Owner: any = {}
  Landownerdetail: any[] = [];
  projId: any;
  LR_LOD_Id_Fk: any;
  show: any = "Y";

  //on page load events goes into ngOnInit ()
  ngOnInit() {

    this.GetAllProjectforLR();    
  }

  GetLandRecordbyId(LR_Id, PD_Id) {
    this.Land = {};
    this.mode = 'edit';
    this.showMod = true;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetLandRecordbyId(LR_Id)
      .subscribe(
        (data: any) => {
          this.show = "Y";
          this.Land = data;          
          if (this.Land.LR_Tippani_Date != null)
            this.Land.LR_Tippani_Date = ((this.Land.LR_Tippani_Date).split('T'))[0];

          if (this.Land.LR_Atlas != null)
            this.Land.LR_Atlas = data.LR_Atlas;

          if (this.Land.LR_Khatha != null)
            this.Land.LR_Khatha = data.LR_Khatha;

          if (this.Land.LR_EC != null)
            this.Land.LR_EC = data.LR_EC;

          if (this.Land.LR_RTC != null)
            this.Land.LR_EC = data.LR_RTC;

          if (this.Land.LR_Revenue_Sketch != null)
            this.Land.LR_Revenue_Sketch = data.LR_Revenue_Sketch;

          if (this.Land.LR_PTSheet != null)
            this.Land.LR_PTSheet = data.LR_PTSheet;

          if (this.Land.LR_Akar_Bandh != null)
            this.Land.LR_Akar_Bandh = data.LR_Akar_Bandh;

          if (this.Land.LR_JMC != null)
            this.Land.LR_JMC = data.LR_JMC;
          this.showModal();
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  AddProject(PD_Id) {
    this.projId = PD_Id;
    this.GetLandOwner();
    this.GetSurveyNo();
  }

  //call and stores service and its results
  GetAllProjectforLR() {
    this.data = this.userService.GetAllProjectforLR();
    this.data.subscribe(
      (response: any) => {        
        this.projectlist = response;
      }, (error) => {

      });
  }

  GetLandOwnerName(LR_LD_Id_Fk) {
    //let land;
    for (let i = 0; i < this.Surveylist.length; i++) {
      if (this.Surveylist[i].LD_Id == LR_LD_Id_Fk) {
        this.Land.LR_LOD_Id_Fk = this.Surveylist[i].LD_LOD_Id_Fk;
        this.LR_LOD_Id_Fk = this.Surveylist[i].LD_LOD_Id_Fk;
      }
    }
    
  }

  GetLandOwner() {
    this.data = this.userService.GetLandOwner(this.projId);
    this.data.subscribe(
      (response: any) => {       
        this.Landlist = response;
      }, (error) => {

      });
  }

  GetSurveyNo() {
    this.data = this.userService.GetSurveyNo(this.projId);
    this.data.subscribe(
      (response: any) => {        
        this.Surveylist = response;
      }, (error) => {

      });
  }

  GetProjectDetailsforLR(projectCode) {

    this.total = 0;
    //this.projectDetails = {};
    this.projectDetails = [];  //changed by saheb
    this.data = this.userService.GetProjectDetailsforLR(projectCode, 1);
    this.data.subscribe(
      (response: any) => {
        this.projectDetails = response;
        this.LandRecord = response.LandRecordDetails;
        for (let i = 0; i < this.LandRecord.length; i++) {
          if (this.LandRecord[i].LR_Tippani_Date != null)
            this.LandRecord[i].LR_Tippani_Date = ((this.LandRecord[i].LR_Tippani_Date).split('T'))[0];
        }

        this.TotalAcres = "0";
        this.TotalGuntas = "0";
        let tot_Gunt: any = 0;
        this.total = 0;
        for (let k = 0; k < this.LandRecord.length; k++) {
          if (this.LandRecord[k].LR_ExtentinAcres != null || this.LandRecord[k].LR_ExtentinGuntas != null) {
            this.ExtentinAcres = this.LandRecord[k].LR_ExtentinAcres;
            this.ExtentinGuntas = this.LandRecord[k].LR_ExtentinGuntas;
            this.TotalAcres = parseFloat(this.TotalAcres) + parseFloat(this.ExtentinAcres || 0);
            this.TotalGuntas = parseFloat(this.TotalGuntas) + parseFloat(this.ExtentinGuntas || 0);
            if (parseFloat(this.TotalGuntas) < 40) {
              tot_Gunt = '.' + parseFloat(this.TotalGuntas)
            }
            else {
              tot_Gunt = parseFloat(this.TotalGuntas) / 40;
            }
            this.total = (parseFloat(this.TotalAcres) + parseFloat(tot_Gunt));
            
          }
        }

        // this.LR_ID = this.LandRecord.LR_Id;
      }, (error) => {
      }
    );
  }


  SendLrId(LR_Id: any, LR_Owner, Survey_no: any) {
    this.LR_ID = LR_Id;
    this.LR_Name = LR_Owner;
    this.Survey_No = Survey_no;
    this.getRemarks(LR_Id);
    this.getProcRemarks(LR_Id);
    this.showIt = true;

  }

  getRemarks(LR_Id) {
    this.data = this.userService.GetRemarks(LR_Id);
    this.data.subscribe(
      (response: any) => {
        this.LRremarks = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  getProcRemarks(LR_Id) {
    this.data = this.userService.GetProcRemarks(LR_Id);
    this.data.subscribe(
      (response: any) => {
        this.LRProcremarks = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  openModal() {
    this.Land = {};
    this.mode = 'save';
    this.showMod = true;
  }
  closeModal() {
    this.showIt = false;
  }

  closeModals() {
    this.showMod = false;
  }
  showModal() {

    this.showMod = true;
  }

  onSubmit(LRN: any, LR_ID) {
    LRN.LR_LOD_Id_Fk = this.LR_LOD_Id_Fk
    this.data = this.userService.AddLRNotes(LR_ID, LRN);
    this.data.subscribe(
      (response) => {
        swal('Success!', 'saved successfully.', 'success');
        this.getRemarks(this.LR_ID);
        // this.GetProjectDetailsforLR(this.PD_Id);
        this.LRN = {};
        // this.closeModal(); 
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  SaveLandDetails(landdetails: NgForm) {
    if (!landdetails.invalid) {
      document.getElementById('loader-spinner').style.display = "block";
      landdetails.value.LR_PD_ID_FK = this.LR.PD_Id;
      landdetails.value.LR_Atlas = this.getAtlasPDFUrl();
      landdetails.value.LR_Khatha = this.getKhathaPDFUrl();
      landdetails.value.LR_EC = this.getECPDFUrl();
      landdetails.value.LR_RTC = this.getRTCPDFUrl();
      landdetails.value.LR_Revenue_Sketch = this.getSketchPDFUrl();
      landdetails.value.LR_PTSheet = this.getPTSheetPDFUrl();
      landdetails.value.LR_Akar_Bandh = this.getBandhPDFUrl();
      landdetails.value.LR_JMC = this.getJMCPDFUrl();
      landdetails.value.LR_VillageMap = this.getViilageMapPDFUrl();
      landdetails.value.LR_Tippani_File = this.getTippaniFile()
      this.show = "N";
      this.userService.CreateLandDetails(landdetails.value)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('', 'Saved Successfully!', 'success');           
            this.GetProjectDetailsforLR(this.LR.PD_Id);
            this.LR.PD_Id = this.LR.PD_Id;
            this.Land = {};
            this.GetLandOwner();
            this.GetSurveyNo();            
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    } else
      document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;
  }

  update(landdetails: NgForm) {
    document.getElementById('loader-spinner').style.display = "block";   
    if (this.Land.LR_Atlas != null && !this.Land.LR_Atlas.match("http"))
      this.Land.LR_Atlas = this.getAtlasPDFUrl();
    if (this.Land.LR_Khatha != null && !this.Land.LR_Khatha.match("http"))
      this.Land.LR_Khatha = this.getKhathaPDFUrl();
    if (this.Land.LR_EC != null && !this.Land.LR_EC.match("http"))
      this.Land.LR_EC = this.getECPDFUrl();
    if (this.Land.LR_RTC != null && !this.Land.LR_RTC.match("http"))
      this.Land.LR_RTC = this.getRTCPDFUrl();
    if (this.Land.LR_Revenue_Sketch != null && !this.Land.LR_Revenue_Sketch.match("http"))
      this.Land.LR_Revenue_Sketch = this.getSketchPDFUrl();
    if (this.Land.LR_PTSheet != null && !this.Land.LR_PTSheet.match("http"))
      this.Land.LR_PTSheet = this.getPTSheetPDFUrl();
    if (this.Land.LR_Akar_Bandh != null && !this.Land.LR_Akar_Bandh.match("http"))
      this.Land.LR_Akar_Bandh = this.getBandhPDFUrl();
    if (this.Land.LR_JMC != null && !this.Land.LR_JMC.match("http"))
      this.Land.LR_JMC = this.getJMCPDFUrl();
    if (this.Land.LR_VillageMap != null && !this.Land.LR_VillageMap.match("http"))
      this.Land.LR_VillageMap = this.getViilageMapPDFUrl();
    if (this.Land.LR_Tippani_File != null && !this.Land.LR_Tippani_File.match("http"))
      this.Land.LR_Tippani_File = this.getTippaniFile()
    this.show = "N";
    this.userService.updateLandDetails(this.Land)
      .subscribe(
        (data) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', 'Updated Successfully!', 'success');         
          this.GetProjectDetailsforLR(this.LR.PD_Id);
          this.LR.PD_Id = this.LR.PD_Id;
          this.Land = {};
          this.GetLandOwner();
          this.GetSurveyNo();        

        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }  
  UploadAtlas(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();    
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {         

        }, (error) => {
          let i: any = document.getElementById('LR_Atlas');
          i.value = "";
          if (error.status == 400) {           
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LR_Atlas');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getAtlasPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LR_Atlas');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  UploadKhatha(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();     
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {       
        }, (error) => {
          let i: any = document.getElementById('LR_Khatha');
          i.value = "";
          if (error.status == 400) {           
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LR_Khatha');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getKhathaPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LR_Khatha');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  UploadEC(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();   
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
        
        }, (error) => {
          let i: any = document.getElementById('LR_EC');
          i.value = "";
          if (error.status == 400) {           
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LR_EC');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getECPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LR_EC');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  UploadRTC(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();    
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {       
        }, (error) => {
          let i: any = document.getElementById('LR_RTC');
          i.value = "";
          if (error.status == 400) {          
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LR_RTC');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getRTCPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LR_RTC');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  UploadSketch(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();     
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
        
        }, (error) => {
          let i: any = document.getElementById('LR_Revenue_Sketch');
          i.value = "";
          if (error.status == 400) {          
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LR_Revenue_Sketch');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getSketchPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LR_Revenue_Sketch');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  UploadPTSheet(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();    
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
        
        }, (error) => {
          let i: any = document.getElementById('LR_PTSheet');
          i.value = "";
          if (error.status == 400) {         
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LR_PTSheet');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getPTSheetPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LR_PTSheet');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  UploadBandh(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();    
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
        
        }, (error) => {
          let i: any = document.getElementById('LR_Akar_Bandh');
          i.value = "";
          if (error.status == 400) {           
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LR_Akar_Bandh');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getBandhPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LR_Akar_Bandh');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
  UploadJMC(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();    
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {        
        }, (error) => {
          let i: any = document.getElementById('LR_JMC');
          i.value = "";
          if (error.status == 400) {           
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LR_JMC');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getJMCPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LR_JMC');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  UploadViilageMap(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();    
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
         
        }, (error) => {
          let i: any = document.getElementById('LR_VillageMap');
          i.value = "";
          if (error.status == 400) {           
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LR_VillageMap');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }
  getViilageMapPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LR_VillageMap');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  UploadTippani(file: FileList) {
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 5048)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();    
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {        

        }, (error) => {
          let i: any = document.getElementById('LR_Tippani_File');
          i.value = "";
          if (error.status == 400) {           
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LR_Tippani_File');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getTippaniFile() {
    let imagename = null;
    try {
      imagename = document.getElementById('LR_Tippani_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }
}