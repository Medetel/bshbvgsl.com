import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-khb-drawing-form',
  templateUrl: './khb-drawing-form.component.html',
  styleUrls: ['./khb-drawing-form.component.css']
})
export class KhbDrawingFormComponent implements OnInit {
  formSubmitted: boolean;
  mode: any;
  PD_Id: any;
  title = "Add Drawing";
  data: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.formSubmitted = false;
   }
   Total:any;
   totalextent:any;
  Layout: any = {};
  TotalArea: any = {};
  Residential: any = {};
  Commercial: any = {};
  Civic: any = {};
  Park: any = {};
  Road: any = {};
  EWS: any = {};
  LIG: any = {};
  MIG: any = {};
  HIG: any = {};
  HIGG: any = {};

  projectlist;
  projectDetails: any = {};
  LayoutPDFUrl: string = "assets/images/default.jpg";
  AutocadLayoutPDFUrl: string = "assets/images/default.jpg";
  fileToUpload: File = null;

  

  ngOnInit() {
    this.GetAllProject();
    this.route.params.subscribe(params =>{
      this.PD_Id = params['PD_Id'];
      this.mode = params['mode'];
    });
    // this.route.params.subscribe(params =>
     
    // );
    if (this.PD_Id != null && this.mode!=null) 
      this.GetAllforApprovedrawing(this.PD_Id);
  }

  

  GetAllforApprovedrawing(PD_Id){
    
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllforApprovedrawing(PD_Id)
      .subscribe(
        (response:any) => {
          this.projectDetails = response;
          this.Layout=response.ApprovedDrawingModel;
          
          this.Residential=response.ApprovedDrawingModel.ResidentialModels;
          this.Commercial=response.ApprovedDrawingModel.CommercialModels;
          this.Civic=response.ApprovedDrawingModel.CivicModels;
          this.Park=response.ApprovedDrawingModel.ParkModels;
          this.Road=response.ApprovedDrawingModel.RoadModels;
          this.EWS=response.ApprovedDrawingModel.EWSModels;
          this.LIG=response.ApprovedDrawingModel.LIGModels;
          this.MIG=response.ApprovedDrawingModel.MIGModels;
          this.HIG=response.ApprovedDrawingModel.HIGModels;
          this.HIGG=response.ApprovedDrawingModel.HIGGModels;
          
          if (this.Layout.LP_Drawing_Date != null)
          this.Layout.LP_Drawing_Date = ((this.Layout.LP_Drawing_Date).split('T'))[0];
          this.getAreaTotal()
          this.getPercentageTotal()
          this.getEWSTotal()
          this.getLIGTotal()
          this.getMIGTotal()
          this.getHIGTotal()
          this.getHIGGTotal()
          this.gettotalpercent()
          this.getNetTotal()
          this.Layout.LP_PD_ID_FK=PD_Id;
          if(this.Layout.LP_LayoutPlan_Doc!=null)
         this.LayoutPDFUrl=response.ApprovedDrawingModel.LP_LayoutPlan_Doc;
         this.Layout.LP_LayoutPlan_Doc=response.ApprovedDrawingModel.LP_LayoutPlan_Doc;
         this.AutocadLayoutPDFUrl=response.ApprovedDrawingModel.LP_AutoCAD_Doc;
        this.Layout.LP_AutoCAD_Doc=response.ApprovedDrawingModel.LP_AutoCAD_Doc;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
  
    
  
  GetAllProject() {
    this.data = this.userService.GetAllProject();
    this.data.subscribe(
      (response: any) => {
        this.projectlist = response;
      }, (error) => {

      });
  }

  GetProjectDetailsforKhbdrawing(PD_Id) {
    this.projectDetails = {};
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetProjectforKHBbyCode(PD_Id)
      .subscribe(
        (data) => {
          this.projectDetails = data;
          this.Layout.LP_Total_Extent_in_Acres=this.projectDetails.LP_Total_Extent_in_Acres;
          this.Layout.LP_Total_Extent_in_Hectors=this.projectDetails.LP_Total_Extent_in_Hectors;
          //this.isUpdate=true;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
  AutocadLayoutFileInput(file: FileList) {
 
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    // let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;
   
    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
    this.AutocadLayoutPDFUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    const data = new FormData();
    data.append("UploadedImage", file.item(0));
    let x = this.userService.uploadImage(data);
    x.subscribe(
    (response) => {
    // console.log(response);
    // this.app.APP_PA_PhotoErrorMessage="";
   
    }, (error) => {
    let i: any = document.getElementById('LP_AutoCAD_Doc');
    i.value = "";
    if (error.status == 400) {
    this.AutocadLayoutPDFUrl = "assets/images/image-default.png";
    swal('Warning!', error.error.Message, 'warning');
    }
    });
    }
    else {
    let i: any = document.getElementById('LP_AutoCAD_Doc');
    i.value = "";
    if (!uploadedFilename.match(regex))
    swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
    else if (size > 2048)
    swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
    }
   
   
   
    getAutocadLayoutPDFUrl() {
    let imagename = null;
    try {
    imagename = document.getElementById('LP_AutoCAD_Doc');
    return imagename.files[0].name;
    }
    catch (e) {
    return null;
    }
    }
  LayoutFileInput(file: FileList) {
  
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    // let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.LayoutPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {
         

        }, (error) => {
          let i: any = document.getElementById('LP_LayoutPlan_Doc');
          i.value = "";
          if (error.status == 400) {
            this.LayoutPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('LP_LayoutPlan_Doc');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }



  getLayoutPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('LP_LayoutPlan_Doc');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  onSubmit(form: NgForm) {
    
    if (!form.invalid) {
    
    form.value.LP_LayoutPlan_Doc = this.getLayoutPDFUrl();
    form.value.LP_AutoCAD_Doc = this.getAutocadLayoutPDFUrl();
    form.value.ReservationModels = this.Residential;
    form.value.CommercialModels = this.Commercial;
    form.value.CivicModels = this.Civic;
    form.value.ParkModels = this.Park;
    form.value.RoadModels = this.Road;
    form.value.EWSModels = this.EWS;
    form.value.LIGModels = this.LIG;
    form.value.MIGModels = this.MIG;
    form.value.HIGModels = this.HIG;
    form.value.HIGGModels = this.HIGG;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.CreateKhbDrawing(form.value);
    this.data.subscribe(
      (response) => {

        swal('Success!', 'saved successfully.', 'success');
        this.router.navigate(['/home/drawingbybshb']);
        document.getElementById('loader-spinner').style.display = "none";
        

      }, (error) => {       
        document.getElementById('loader-spinner').style.display = "none";
      });
    }else
    swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
    document.getElementById('loader-spinner').style.display = "none";
    this.formSubmitted = true;

  }

  update(form: NgForm) {
    
    if (!form.invalid) {
      
     
     form.value.LP_LayoutPlan_Doc = this.getLayoutPDFUrl();
     form.value.LP_AutoCAD_Doc = this.getAutocadLayoutPDFUrl();
     form.value.ReservationModels = this.Residential;
    form.value.CommercialModels = this.Commercial;
    form.value.CivicModels = this.Civic;
    form.value.ParkModels = this.Park;
    form.value.RoadModels = this.Road;
    form.value.EWSModels = this.EWS;
    form.value.LIGModels = this.LIG;
    form.value.MIGModels = this.MIG;
    form.value.HIGModels = this.HIG;
    form.value.HIGGModels = this.HIGG;
    // let LUA_Id=this.Residential.LUA_Id;
    let LP_Id=this.Layout.LP_Id;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.updateKhbDrawingDetails(form.value,LP_Id)
        .subscribe(
          (data) => {
            document.getElementById('loader-spinner').style.display = "none";
            swal('','Updated Successfully!','success');
            this.router.navigate(['/home/drawingbybshb']);
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
        }else
        swal('Warning!', 'Please fill all the mandatory fields.', 'warning');
        document.getElementById('loader-spinner').style.display = "none";
        this.formSubmitted = true;
    }
 

getNetTotal() {
        this.TotalArea.NetTotal = "0";
        this.totalextent="0";
        this.totalextent=parseFloat(this.Layout.LP_Total_Extent_in_Acres)+parseFloat(this.Layout.LP_Total_Extent_in_Hectors)
        this.TotalArea.NetTotal = parseFloat(this.TotalArea.NetTotal) + parseFloat(this.Layout.LP_DeductFuture_Dev_Acres || 0)+
                  parseFloat(this.Layout.LP_DeductFuture_Dev_Hectors || 0)+ parseFloat(this.Layout.LP_DeductBkharab_in_Acres || 0)+ 
                  parseFloat(this.Layout.LP_DeductBkharab_in_Hectors || 0)+ parseFloat(this.Layout.LP_deduct_litigation_Land_Acres || 0)
                  + parseFloat(this.Layout.LP_deduct_litigation_Land_Hectors || 0)+parseFloat(this.Layout.LP_deduct_other_Land_Acres || 0)
                  +parseFloat(this.Layout.LP_deduct_other_Land_Hectors || 0);
         this.Total= parseFloat(this.totalextent)-parseFloat(this.TotalArea.NetTotal);       
}

getAreaTotal() {
    this.TotalArea.TotalAreaCalculation = "0";
    this.TotalArea.TotalAreaCalculation = parseFloat(this.TotalArea.TotalAreaCalculation) + parseFloat(this.Residential.LUA_Area_in_Sqmt || 0)+ parseFloat(this.Commercial.LUA_Area_in_Sqmt || 0)+ parseFloat(this.Civic.LUA_Area_in_Sqmt || 0)+ parseFloat(this.Park.LUA_Area_in_Sqmt || 0)+ parseFloat(this.Road.LUA_Area_in_Sqmt || 0);
}

getPercentageTotal() {
  this.TotalArea.PercentageTotal = "0";
  this.TotalArea.PercentageTotal = parseFloat(this.TotalArea.PercentageTotal) + parseFloat(this.Residential.LUA_Percentage_achieved || 0)+ parseFloat(this.Commercial.LUA_Percentage_achieved || 0)+ parseFloat(this.Civic.LUA_Percentage_achieved || 0)+ parseFloat(this.Park.LUA_Percentage_achieved || 0)+ parseFloat(this.Road.LUA_Percentage_achieved || 0);
}

getEWSTotal() {
 
  this.EWS.LUD_Total = "0";
  this.EWS.LUD_Total = parseFloat(this.EWS.LUD_Total) + parseFloat(this.EWS.LUD_Inter_Regular || 0)+ parseFloat(this.EWS.LUD_Inter_Odd || 0)+ parseFloat(this.EWS.LUD_Corner || 0);
  this.getTotalshare();
}

getLIGTotal() {
this.LIG.LUD_Total = "0";
this.LIG.LUD_Total = parseFloat(this.LIG.LUD_Total) + parseFloat(this.LIG.LUD_Inter_Regular || 0)+ parseFloat(this.LIG.LUD_Inter_Odd || 0)+ parseFloat(this.LIG.LUD_Corner || 0);
this.getTotalshare();
}

getMIGTotal() {
this.MIG.LUD_Total = "0";
this.MIG.LUD_Total = parseFloat(this.MIG.LUD_Total) + parseFloat(this.MIG.LUD_Inter_Regular || 0)+ parseFloat(this.MIG.LUD_Inter_Odd || 0)+ parseFloat(this.MIG.LUD_Corner || 0);
this.getTotalshare();
}

getHIGTotal() {
this.HIG.LUD_Total = "0";
this.HIG.LUD_Total = parseFloat(this.HIG.LUD_Total) + parseFloat(this.HIG.LUD_Inter_Regular || 0)+ parseFloat(this.HIG.LUD_Inter_Odd || 0)+ parseFloat(this.HIG.LUD_Corner || 0);
this.getTotalshare();
}

getHIGGTotal() {
this.HIGG.LUD_Total = "0";
this.HIGG.LUD_Total = parseFloat(this.HIGG.LUD_Total) + parseFloat(this.HIGG.LUD_Inter_Regular || 0)+ parseFloat(this.HIGG.LUD_Inter_Odd || 0)+ parseFloat(this.HIGG.LUD_Corner || 0);
this.getTotalshare();
}

getTotalshare() {
  
  this.TotalArea.totalshare = "0";
  this.TotalArea.totalshare = parseFloat(this.TotalArea.totalshare) + parseFloat(this.HIGG.LUD_Total || 0)+ parseFloat(this.HIG.LUD_Total || 0)+ parseFloat(this.LIG.LUD_Total || 0)+ parseFloat(this.MIG.LUD_Total || 0)+ parseFloat(this.EWS.LUD_Total || 0);
  }

  gettotalpercent(){
    this.TotalArea.totalpercent = "0";
    this.TotalArea.totalpercent = parseFloat(this.TotalArea.totalpercent) + parseFloat(this.HIGG.LUD_Percentage || 0)+ parseFloat(this.HIG.LUD_Percentage || 0)+ parseFloat(this.LIG.LUD_Percentage || 0)+ parseFloat(this.MIG.LUD_Percentage || 0)+ parseFloat(this.EWS.LUD_Percentage || 0);
  }

}
