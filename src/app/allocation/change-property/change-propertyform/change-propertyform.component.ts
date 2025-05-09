import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/user.service';
import swal from 'sweetalert2';
import { Search } from '../../../shared/user.model';

@Component({
  selector: 'app-change-propertyform',
  templateUrl: './change-propertyform.component.html',
  styleUrls: ['./change-propertyform.component.css']
})
export class ChangePropertyformComponent implements OnInit {
  title="Change Property Quota"
  data: any = [];
  District: any = {};
  Projects: any = {};
  Phaselist: any = {};
  Schemelist: any = {};
  propertylist: any = {};
  changequotaList: any = {};
  c: any = [];
  s: any = [];
  isSearch: boolean;
  isSearchProject: boolean;

  projectcode: any;
  PD_Id: any;
  pageNo: number =1;
  itemsPerPage: number = 5;
  Sch_Id: any;
  Phase_Id: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
     this.s = new Search();
        this.isSearch = false;
        this.isSearchProject = false;
  }

  ngOnInit() {
    // this.GetAllDistrict();
    this.GetProjects();
    this.GetAllPhase();
    this.GetAllSchemes();
  }
  // GetAllDistrict() {
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetDistrictApplicant();
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.District = response;
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }
  GetProjects() {   
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getAllProjectsforchangequota();
    this.data.subscribe(
      (response: any) => {
        this.Projects = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  GetAllPhase() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllPhase();
    this.data.subscribe(
      (response: any) => {
        this.Phaselist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
      });

  }
  GetAllSchemes() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllSchemes();
    this.data.subscribe(
      (response: any) => {
        this.Schemelist = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
      });
  }
  getpropertyforproject(itemsPerPage,pageNo,PD_Id,Sch_Id,Phase_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getpropertyforproject(itemsPerPage,pageNo,PD_Id,Sch_Id,Phase_Id);
    this.data.subscribe(
      (response: any) => {
        this.changequotaList = response.propertyModels;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
      });
  }
 SearchProjects(PD_Id,Sch_Id,Phase_Id) {
  debugger
// this.c.PD_Id=this.PD_Id;
    this.isSearchProject = true;
    if (PD_Id == "" || PD_Id == null)
      swal("Warning!", "Please Select the Project.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchProjectforchangquota(PD_Id,Sch_Id,Phase_Id)
        .subscribe(
          (data: any) => {
            this.propertylist = data.ProjectDetailsModels;
            this.getpropertyforproject(this.itemsPerPage,this.pageNo,PD_Id,Sch_Id,Phase_Id);
            // this.totalItems = data.TotalItemsCount;
            // this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  Updatechangequota(PR_Id,RES_Id) {
    debugger
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.Updatechangequota(PR_Id,RES_Id)
    this.data.subscribe(
      (response: any) => {
        document.getElementById('loader-spinner').style.display = "none";
        // this.GetAllotmentList(DSWOID_NO_Id, PD_Id, CaTName)
        swal('', 'Property Quota Updated Successfully!', 'success');
       this.router.navigate(['/home/change-property']);
        
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        // this.errorHandler.HandlerError(error);
      })
  }

  


}
