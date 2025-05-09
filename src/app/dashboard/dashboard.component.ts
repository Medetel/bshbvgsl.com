import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { UserService } from '../shared/user.service';
import { ErrorHandler } from '../shared/ErrorHandler';
declare var Plotly: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title: string;
  AllProjectDetails: any;
  Project: any;
  Id: any;
  district: any;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  TotalPropertiesCount: number=0;
  AvailableCount: number;
  BlockedCount: number;
  data: any;
  userRole: any;
  DistrictDisplay: string
  projectdetails: any = {};
  propertyall: any;
  AllottedCount: any;
  Alert: any = [];
  AlertReceived: any = [];
  AlertEscalated: any = [];
  AlertResolved: any = [];
  OtherAvailableCount: any = [];
  propertylist: any = [];
  acc: any;
  isProjectfound:boolean = true;
  isLoading: boolean;

  constructor(private userService: UserService, private errorHandler: ErrorHandler, private router: Router) {
  }

  ngOnInit() {
    this.Id = 0;
    this.AllProjectDetailss(this.itemsPerPage, 1, this.Id);
    this.title = "Vacant Properties Status";
    this.userRole = localStorage.getItem('userRole');
    this.LoginDetails();
    //this.GetAlertSent()
    // this.GetAlertReceived()
    //this.GetAlertEscalated()
    
  }

  pageChanged(pageNumber: number) {
    this.AllProjectDetailss(this.itemsPerPage, pageNumber, this.Id);
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    this.AllProjectDetailss(this.itemsPerPage, pageNo, this.Id);
  }
       
  getid(id, district) {

    this.Id = id;
    this.district = district;
    // this.title="Vacant Properties Status for " + this.district;
    this.resetgrandtotal();
    this.AllProjectDetailss(this.itemsPerPage, 1, id)
    const areas = document.querySelectorAll('area');
  for (let i = 0; i < areas.length; i++) {
    areas[i].classList.add('dim');
  }

  // Highlight the clicked area
  const clickedArea = document.getElementById(id.toString()) as HTMLAreaElement;
  if (clickedArea) {
    clickedArea.classList.remove('dim');
    clickedArea.classList.add('highlight');
  }
    
  }

  selectedDistrict: string = ''; // Property to hold the district name

 

  AllProjectDetailss(itemsPerPage: number, pageNo: number, id: number) {
    this.isLoading = true; // Show loader spinner
    this.userService.AllProjectDetails(itemsPerPage, pageNo, id).subscribe(
    (data: any) => {
    this.AllProjectDetails = data.projectsModels;
    this.totalItems = data.TotalItemsCount;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = pageNo;
    
    // Extract DI_District
    if (data.projectsModels && data.projectsModels.length > 0) {
    this.selectedDistrict = data.projectsModels[0].DI_District; // Adjust index or logic as needed
    } 
    // else {
    // this.selectedDistrict = 'No District Available';
    // }
    
    this.calculateCounts(id);
    this.renderPieChart(id);
    this.isLoading = false; // Hide loader spinner
    },
    (error: any) => {
    this.isLoading = false; // Hide loader spinner on error
    this.errorHandler.handleError(error);
    }
    );
    }
  calculateCounts(id:number) {
    debugger
    const project = this.AllProjectDetails[0]; // Assuming 1 project is fetched
     if( id != 0 && project == undefined){
       swal('warning!', "No projects found for this district", 'warning');
       this.isProjectfound= false;
       this.resetgrandtotal();

    } else {
      this.isProjectfound = true; 
    this.TotalPropertiesCount = project.TotalPropertiesCount || 0;
    this.AvailableCount = project.AvailableCount || 0;
    this.BlockedCount = project.BlockedCount || 0;
    this.AllottedCount = project.AllottedCount || 0;
    this.OtherAvailableCount = project.OtherAvailableCount || 0;
    }
   
  }

  renderPieChart(id: number) {
    const districtName = this.district || 'All Districts'; // Replace 'Unknown District' with a fallback if needed
  
    // Define counts and labels
    const values = [this.AvailableCount, this.BlockedCount, this.AllottedCount, this.OtherAvailableCount];
    const labels = ["Vacant", "Blocked", "Allotted", "Others"];
    const colors = ["#4caf50", "#ff5722", "#2196f3", "#ffc107"];
  
    // Combine labels and counts for display
    const textLabels = labels.map((label, index) => `${label} (${values[index]})`);
  
    const data = [{
      type: "pie",
      values: values,
      labels: textLabels, // Use the combined labels with counts
      textinfo: "label+percent",
      insidetextorientation: "radial",
      marker: {
        colors: colors
      }
    }];
  
    const layout = {
      title: `Project Properties Distribution for ${districtName}`, // Dynamically set the title
      height: 500,
      width: 500
    };
  
    Plotly.newPlot('pieChartDiv', data, layout);
  }
  
  GetTotalPropertiesCount() {
    for (let i = 0; i < this.AllProjectDetails.length; i++) {
      this.TotalPropertiesCount = this.AllProjectDetails[i].TotalPropertiesCount;
      break;
    }
  }

  //LoginDetails
  LoginDetails() {
    this.userService.LoginDetails()
      .subscribe(
        (data: any) => {
          if (data == '' || data == null || data == 'MDNA') {
            this.DistrictDisplay = 'Karnataka';
          }
          else {
            this.DistrictDisplay = data;
          }

          document.getElementById('loader-spinner').style.display = "none";
        }, (error: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GetVacantPropCount() {
    for (let i = 0; i < this.AllProjectDetails.length; i++) {
      this.AvailableCount = this.AllProjectDetails[i].AvailableCount;
      break;
    }
  }

  GetBlockedPropCount() {
    for (let i = 0; i < this.AllProjectDetails.length; i++) {
      this.BlockedCount = this.AllProjectDetails[i].BlockedCount;
      break;
    }
  }

  GetAllottedPropCount() {
    for (let i = 0; i < this.AllProjectDetails.length; i++) {
      this.AllottedCount = this.AllProjectDetails[i].AllottedCount;
      break;
    }
  }

  GetOtherAvailablePropCount() {
    for (let i = 0; i < this.AllProjectDetails.length; i++) {
      this.OtherAvailableCount = this.AllProjectDetails[i].OtherAvailableCount;
      break;
    }
  }

  GetPropertiesforDashboard(PD_ID, Type, index) {
    this.acc = index;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAvailablePropertylistForTheId(PD_ID, Type);
    this.data.subscribe(
      (response: any) => {
        //this.projectdetails = response;
        this.propertyall = response.PropertyRegister;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetProjectDetailforDashboard(PD_ID, Type) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetProjectDetailforDashboard(PD_ID, Type);
    this.data.subscribe(
      (response: any) => {
        this.projectdetails = response;
        this.propertylist = response.PropertyRegister;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  Paym() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.Pay();
    this.data.subscribe(
      (response: any) => {
        swal('success!', "Please upload file less than 2mb", 'success');
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }
  Pay() {
    window.open("http://localhost:14080/Esign/Payment.aspx");
    // document.getElementById('loader-spinner').style.display = "block";
    // this.data = this.userService.Payment();
    // this.data.subscribe(
    //   (response: any) => {
    //     // this.Alert = response;
    //     document.getElementById('loader-spinner').style.display = "none";
    //   }, (error) => {
    //     document.getElementById('loader-spinner').style.display = "none";
    //     this.errorHandler.HandleError(error);
    //   });
  }

  GetAlertSent() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAlert();
    this.data.subscribe(
      (response: any) => {
        this.Alert = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetAlertReceived() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAlertReceived();
    this.data.subscribe(
      (response: any) => {
        this.AlertReceived = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetAlertEscalated() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAlertEscalated();
    this.data.subscribe(
      (response: any) => {
        this.AlertEscalated = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }

  GetAlertResolved() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAlertResolved();
    this.data.subscribe(
      (response: any) => {
        this.AlertResolved = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }
  resetgrandtotal(){
    this.TotalPropertiesCount=0;
    this.AvailableCount=0;
    this.BlockedCount=0;
    this.AllottedCount=0;
    this.OtherAvailableCount=0;
  }
}