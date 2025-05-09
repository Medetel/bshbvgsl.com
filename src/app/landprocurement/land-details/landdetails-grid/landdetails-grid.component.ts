import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
@Component({
  selector: 'app-landdetails-grid',
  templateUrl: './landdetails-grid.component.html',
  styleUrls: ['./landdetails-grid.component.css']
})
export class LanddetailsGridComponent implements OnInit {

  projvillagelist: any=[];
  title = "Land Owner Details";
  itemsPerPage: number = 5;
  currentPage: number = 1;
  landOwnerDetailslist: any = {};
  data: any = {};
  totalItems: number;
  s: Search;
  isSearch: boolean;
  PR_Id_PK: number;
  mode: string;
  PR_IdPK: any;
  PD_Id: any;
  o: any = {};
  f: any = {};
  Sharinglist: any = [];
  Schedulelist: any = [];
  LandTypellist: any = [];
  projectlist: any = [];
  proposallist: any = [];
  ProposalFor: string;
  Survey: any = {};
  SurveyList: any = [];
  fileToUpload: File = null;
  formInvalid: boolean = false;
  LOD_Id: any;
  LO_Id: any
  ProjName: any;
  Moplist: any=[];
  pro:any={};
  show:any='Y';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.PD_Id = params['PD_Id'];
      this.PR_IdPK = params['PR_Id_PK'];

    });
    this.GetAllLandOwnerDetails(this.itemsPerPage, this.currentPage, this.PD_Id, this.PR_IdPK)
    this.getDefaultData()
    this.GetAllProjectforLR()
    this.GetProjectVillage(this.PR_IdPK)
  }



  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, itemsPerPage, pageNo, this.PD_Id, this.PR_IdPK);
    else
      this.GetAllLandOwnerDetails(itemsPerPage, pageNo, this.PD_Id, this.PR_IdPK);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber, this.PD_Id, this.PR_IdPK);
    else
      this.GetAllLandOwnerDetails(this.itemsPerPage, pageNumber, this.PD_Id, this.PR_IdPK);
  }

  GetAllProjectforLR() {
    
    this.data = this.userService.GetAllProjectforLR();
    this.data.subscribe(
      (response: any) => {      
        this.projectlist = response;
        this.pro.LOD_PD_Id_FK = this.PD_Id
        this.GetProjectName(this.PD_Id);
      }, (error) => {

      });
  }

  GetProjectName(Pid) {
    
    //document.getElementById('loader-spinner').style.display = "block";
    for (let i = 0; i < this.projectlist.length; i++) {
      if (this.projectlist[i].PD_Id == Pid) {
        this.ProjName = this.projectlist[i].PD_Project_Name;
        document.getElementById('loader-spinner').style.display = "none";
      }
    }
  }


  getDefaultData() {
    // if(this.LOD_Id > 0){
    this.data = this.userService.getAllProposalReportdropdown();
    this.data.subscribe(
      (response: any) => {
        this.proposallist = response;
        this.pro.LOD_PR_Id_FK = this.PR_IdPK;
      });   

    this.data = this.userService.GetLandType();
    this.data.subscribe(
      (response: any) => {
        this.LandTypellist = response;
      })
    this.data = this.userService.GetSchedule();
    this.data.subscribe(
      (response: any) => {
        this.Schedulelist = response;

      })
    this.data = this.userService.GetSharingPattern();
    this.data.subscribe(
      (response: any) => {
        this.Sharinglist = response;
      })

    this.data = this.userService.GetModeofProcurement();
    this.data.subscribe(
      (response: any) => {
        this.Moplist = response;
      })
  }

  GetOtherrelatedinfo(Id) {
    this.GetProjectVillage(Id)
    //document.getElementById('loader-spinner').style.display = "block";
    for (let i = 0; i < this.proposallist.length; i++) {
      if (this.proposallist[i].PR_Id_PK == Id) {
        this.ProposalFor = this.proposallist[i].PR_For;
        document.getElementById('loader-spinner').style.display = "none";
      }
    }
  }

  GetProjectVillage(PR_Id){
    this.data = this.userService.GetProjectVillage(PR_Id);
    this.data.subscribe(
      (response:any) =>{       
        this.projvillagelist = response;
      },(error)=>{
        
      });
  }
      ClearLanddetails(){
        this.show='Y'
          this.o={};
          this.o=null;
          this.o="";
          this.SurveyList = [];
          this.mode="save";
          this.pro.LOD_PR_Id_FK = this.PR_IdPK;
          this.pro.LOD_PD_Id_FK = this.PD_Id
          // this.o.LOD_PD_Id_FK = this.PD_Id;
          // this.o.LOD_PR_Id_FK = this.PR_IdPK;
          
    }
  GetByIdLandOwnerDetails(LOD_Id, Mod: any) {
    this.mode = Mod;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdLandOwnerDetails(LOD_Id);
    this.data.subscribe(
      (response: any) => {
        this.o = response;
        this.SurveyList = this.o.LandOwnerSurveyDetailsModel;
        this.LO_Id = this.o.LOD_Id_PK;
        // this.GetAllProjectforLR()
        this.pro.LOD_PR_Id_FK = this.PR_IdPK;
        this.pro.LOD_PD_Id_FK = this.PD_Id
        this.GetOtherrelatedinfo(this.o.LOD_PR_Id_FK);
        setTimeout(() => {
          this.GetOtherrelatedinfo(this.o.LOD_PR_Id_FK);
        }, 500)

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllLandOwnerDetails(itemsPerPage: number, pageNo: number, PD_Id: any, Pr_id: any) {
    this.isSearch = false;
    PD_Id = this.PD_Id
    Pr_id = this.PR_IdPK
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllLandOwnerDetails(itemsPerPage, pageNo, PD_Id, Pr_id);
    this.data.subscribe(
      (response: any) => {
        this.landOwnerDetailslist = response.LandOwnerDetailsModels;
        this.totalItems = response.TotalItemsCount;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = pageNo;


        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  delete(LOD_Id) {
    swal({
      title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.data = this.userService.DeleteLandOwnerDetails(LOD_Id);
        this.data.subscribe(
          (response: any) => {
            this.GetAllLandOwnerDetails(this.itemsPerPage, this.currentPage, this.PD_Id, this.PR_IdPK);
          },
        );
      }
    })
  }


  onSearch(s, itemsPerPage: number, pageNo: number, PD_Id: any, Pr_id: any) {
    this.isSearch = true;
    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    PD_Id = this.PD_Id
    Pr_id = this.PR_IdPK
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {

      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetLandOwnerDetailsOnSearch(itemsPerPage, pageNo, searchCriteria, searchText, PD_Id, Pr_id)
        .subscribe(
          (data: any) => {
            this.landOwnerDetailslist = data.LandOwnerDetailsModels;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            {
              document.getElementById('loader-spinner').style.display = "none";
              //this.message=true;
            }
          }, (error: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  FileDetails(s) {
    
    let bool = 0;
    if (s.LD_SurveyNo == "" || s.LD_Extents == "" || s.LD_Akar == "" || s.LD_LT_Id_Fk == "" || s.LD_SP_Id_Fk == "" || 
    s.LT_PV_Id_FK=="" || s.LD_Mop_Id_Fk=="") { bool = 1 }
    if ((s.LD_SurveyNo != null || s.LD_SurveyNo != undefined) && (s.LD_Extents != null || s.LD_Extents != undefined)
      && (s.LD_Akar != null || s.LD_Akar != undefined) && (s.LD_LT_Id_Fk != null || s.LD_LT_Id_Fk != undefined) &&
      (s.LT_PV_Id_FK != null || s.LT_PV_Id_FK != undefined) && (s.LD_Mop_Id_Fk != null || s.LD_Mop_Id_Fk != undefined) && bool == 0) {
      //(s.LD_SP_Id_Fk != null || s.LD_SP_Id_Fk != undefined) &&
      let temp = {
        LD_Id: s.LD_Id,
        LD_Mop_Id_Fk:s.LD_Mop_Id_Fk,
        MOP_Name:this.getmop(s.LD_Mop_Id_Fk),
        LT_PV_Id_FK:s.LT_PV_Id_FK,
        PV_VillageName:this.getVillage(s.LT_PV_Id_FK),
        LD_SurveyNo: s.LD_SurveyNo,
        LD_Extents: s.LD_Extents,
        LD_Latitude: s.LD_Latitude,
        LD_Longitude: s.LD_Longitude,
        LD_Akar: s.LD_Akar,
        LD_LT_Id_Fk: s.LD_LT_Id_Fk,
        LD_North: s.LD_North,
        LD_East: s.LD_East,
        LD_South: s.LD_South,
        LD_West: s.LD_West,
        LD_SP_Id_Fk: s.LD_SP_Id_Fk,
        LD_Cad: this.getimageUpload1(),
        LD_Sketch: this.getSketchimageUpload1()
      }
      this.SurveyList.push(temp);
      this.Survey = {};
    }
    else {
      swal('warning', 'Please enter mandatory fields!', 'warning');
    }
  }

  getVillage(PV_Id){
    for(let i=0;i<this.projvillagelist.length;i++)
    {
      if(this.projvillagelist[i].PV_Id==PV_Id){
        return this.projvillagelist[i].PV_VillageName;
      }
    }
  }
  getmop(mop_Id){
    for(let i=0;i<this.Moplist.length;i++)
    {
      if(this.Moplist[i].MOP_Id==mop_Id){
        return this.Moplist[i].MOP_Name;
      }
    }
  }

  removeFile(i) {
    this.SurveyList.splice(i, 1);
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
          let i: any = document.getElementById('LD_Cad');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LD_Cad');
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
      imagename = document.getElementById('LD_Cad');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  SketchimageUpload(file: FileList) {
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
          let i: any = document.getElementById('LD_Sketch');
          i.value = "";
          if (error.status == 400) {
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LD_Sketch');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload PDF file with extension pdef or pdf", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getSketchimageUpload1() {
    let imagename = null;
    try {
      imagename = document.getElementById('LD_Sketch');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  SaveLandOwnerDetails(landownerform: NgForm) {
    //landownerform.value.LOFU_FileName = this.getimageUpload1(); 
    
    if (landownerform.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      landownerform.value.LOD_PD_Id_FK = this.PD_Id;
      landownerform.value.LOD_PR_Id_FK = this.PR_IdPK;
      landownerform.value.LandOwnerSurveyDetailsModel = this.SurveyList;
      this.show='N'
      this.data = this.userService.PostLandOwnerDetails(landownerform.value);
      this.data.subscribe(
        (response) => {
          landownerform.reset();
          landownerform.resetForm();
          landownerform.form.markAsPristine();
          landownerform.form.markAsUntouched();
          this.SurveyList = [];
          swal('Success!', 'Land Owner Detail Added Successfully .', 'success');
          this.GetAllLandOwnerDetails(this.itemsPerPage, this.currentPage, this.PD_Id, this.PR_IdPK)

          // this.router.navigate(['/home/landdetails/landdetails-grid/', this.PD_Id, this.PR_IdPK]);
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

  close(){
    document.getElementById('loader-spinner').style.display = "none";
  }

  UpdateLandOwnerDetails(landownerform: NgForm) {
    if (landownerform.invalid) {
      this.formInvalid = true;
      swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
      return;
    }

    else {
      landownerform.value.LOD_PD_Id_FK = this.PD_Id;
      landownerform.value.LOD_PR_Id_FK = this.PR_IdPK;
      landownerform.value.LandOwnerSurveyDetailsModel = this.SurveyList;

      this.data = this.userService.UpdateLandOwnerDetails(this.LO_Id, landownerform.value);
      this.data.subscribe(
        (response) => {

          landownerform.reset();
          landownerform.resetForm();
          landownerform.form.markAsPristine();
          landownerform.form.markAsUntouched();
          this.SurveyList = [];
          swal('Success!', 'Land Owner Details Updated Successfully .', 'success');
          this.GetAllLandOwnerDetails(this.itemsPerPage, this.currentPage, this.PD_Id, this.PR_IdPK)
          // this.router.navigate(['/home/landdetails/landdetails-grid/', this.PD_Id, this.PR_IdPK]);
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
}
