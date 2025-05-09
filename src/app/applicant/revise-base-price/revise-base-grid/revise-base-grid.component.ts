import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';
import { Search } from '../../../shared/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-revise-base-grid',
  templateUrl: './revise-base-grid.component.html',
  styleUrls: ['./revise-base-grid.component.css']
})
export class ReviseBaseGridComponent implements OnInit {

  revise: any = {};
  data: any;
  Categories: any = [];
  Properties: any = [];
  Projects: any = [];
  Reviseproperties: any = [];
  s: any = {};
  isSearch: boolean;
  Revisedproperties: any = [];
  ProjName: any;
  CatName: any;
  PropType: any;
  fileToUpload: File = null;
  RBP_Id: any;
  mode: any;
  RBP_File_Show: any = 'hide';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetProjectsforWAS();
    this.GetCategory();
    this.GetPropertyType()
    this.route.params.subscribe(params =>
      this.RBP_Id = params['RBP_Id']
    );
    this.route.params.subscribe(params =>
      this.mode = params['mode']
    );
    if (this.RBP_Id != null && this.mode != null) {
      this.GetRevisedBasePriceDetails(this.RBP_Id);
    }
  }

  GetProjectsforWAS() {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetProjectsforWAS();
    this.data.subscribe(
      (response: any) => {
        this.Projects = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetCategory() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.getCategory();
    this.data.subscribe(
      (response: any) => {
        this.Categories = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetPropertyType() {

    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetPropertyType();
    this.data.subscribe(
      (response: any) => {
        this.Properties = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetRevisedBasePriceDetails(RBP_Id) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetRevisedBasePriceDetails(RBP_Id)
      .subscribe(
        (data: any) => {
          this.revise = data;
          this.ClearRevisedList(this.revise.RBP_PD_Id_FK, this.revise.RBP_Cat_Id_Fk, this.revise.RBP_Prop_Id_Fk)

          document.getElementById('loader-spinner').style.display = "none";
          if (data.PropertiesforAuctionModel != null) {
            let totalplinth = 0;
            this.Revisedproperties = data.PropertiesforAuctionModel;
            if (this.revise.RBP_ApproveDate != null)
              this.revise.RBP_ApproveDate = ((this.revise.RBP_ApproveDate).split('T'))[0];
            if (this.revise.RBP_File != null)
              this.RBP_File_Show = "show";
            for (let i = 0; i < this.Revisedproperties.length; i++) {
              totalplinth = this.Revisedproperties[i].PR_Plot_Area * 10.764;
              this.Revisedproperties[i].AreaSqft = totalplinth;
            }
          }
          //this.isUpdate=true;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }


  GetPropertiesforBPUpdation(SE, PD_Id: any, Ca_Id: any, Prop_Id: any) {

    this.isSearch = true;
    let searchText = SE.SearchText;
    let searchCriteria = SE.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null
      || PD_Id == "" || PD_Id == null || Ca_Id == "" || Ca_Id == null || Prop_Id == "" || Prop_Id == null)
      swal("Warning!", "Please enter the Project Name,Category Name,Property Type,search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.GetPropertiesforBPUpdation(searchCriteria, searchText, PD_Id, Ca_Id, Prop_Id)
        .subscribe(
          (data: any) => {
            document.getElementById('loader-spinner').style.display = "none";
            //this.auctionnot = data;
            this.Reviseproperties = data;
            let percent, amt, total, totalplinth;

            // for (let i = 0; i < this.Reviseproperties.length; i++) {
            //   total = this.Reviseproperties[i].PR_Plot_Area * 10.764;
            //   this.Reviseproperties[i].baseAmt = total * this.Reviseproperties[i].Price;
            // }

            for (let i = 0; i < this.Reviseproperties.length; i++) {
              totalplinth = this.Reviseproperties[i].PR_Plot_Area * 10.764;
              this.Reviseproperties[i].AreaSqft = totalplinth;
              this.Reviseproperties[i].PR_ReviseBaseprice = false;
            }

          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            this.errorHandler.handleError(error);
          });
    }
  }

  changeCheckbox(PR_Id, PR_ReviseBaseprice) {

    for (let i = 0; i < this.Reviseproperties.length; i++) {
      if (this.Reviseproperties[i].PR_Id == PR_Id) {
        if (this.Reviseproperties[i].PR_ReviseBaseprice == false) {
          this.Reviseproperties[i].PR_ReviseBaseprice = true;
          this.Revisedproperties.push(this.Reviseproperties[i]);
          break;
        }
        else {
          this.Reviseproperties[i].PR_ReviseBaseprice = false;
          for (let j = 0; j < this.Revisedproperties.length; j++)
            if (this.Revisedproperties[j].PR_Id == PR_Id) {
              this.Revisedproperties.splice(j, 1);
            }
        }
        break;
      }
    }
  }

  AddTotalPrice(baseprice, Type) {

    let percent, amt, total, totalplinth;
    if (Type == "sqft") {
      for (let i = 0; i < this.Revisedproperties.length; i++) {
        total = this.Revisedproperties[i].PR_Plot_Area * 10.764;
        this.Revisedproperties[i].baseAmt = total * baseprice;
      }
    }
    if (Type == "bulk") {
      for (let i = 0; i < this.Revisedproperties.length; i++) {
        //total = this.Revisedproperties[i].PR_Plot_Area * 10.764;
        this.Revisedproperties[i].baseAmt = baseprice;
      }
    }
  }

  ClearRevisedList(Pd_Id, Ca_Id, Prop_Id) {
    this.Revisedproperties = [];
    if (Pd_Id != null) {
      for (let i = 0; i < this.Projects.length; i++) {
        if (this.Projects[i].PD_Id == Pd_Id) {
          this.ProjName = this.Projects[i].PD_Project_Name;
        }
      }
    }
    if (Ca_Id != null) {
      for (let i = 0; i < this.Categories.length; i++) {
        if (this.Categories[i].CA_Id == Ca_Id) {
          this.CatName = this.Categories[i].CA_CategoryName;
        }
      }
    }
    if (Prop_Id != null) {
      for (let i = 0; i < this.Properties.length; i++) {
        if (this.Properties[i].PT_Id == Prop_Id) {
          this.PropType = this.Properties[i].PT_Property_Type;
        }
      }
    }
  }

  SaveRevisedProperties(revise: any) {
    revise.RBP_File = this.getLTPPDFUrl();
    if (this.Revisedproperties == '' || this.Revisedproperties == undefined || this.Revisedproperties == null) {
      swal('Warning!', "Please select the properties", 'warning');
      return true;
    }
    revise.PropertiesforAuctionModel = this.Revisedproperties;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.SaveRevisedProperties(revise)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          swal('', 'Saved Successfully!', 'success');
          this.router.navigate(['/home/revise-base-price']);
          //this.GetProjectDetailsforLandtoTown(Pd_Id);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  RBPFileInput(file: FileList) {

    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.pdef|.pdf|.PDF)$/;
    // let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png)$/;

    let s: any = file.item(0).size / 1024;
    let size: any = parseFloat(s).toFixed(2);
    let uploadedFilename = file.item(0).name;
    if (uploadedFilename.match(regex) && (size <= 200000)) {
      this.fileToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        // this.LayoutPDFUrl = event.target.result;
      }
      reader.readAsDataURL(this.fileToUpload);
      const data = new FormData();
      data.append("UploadedImage", file.item(0));
      let x = this.userService.uploadImage(data);
      x.subscribe(
        (response) => {


        }, (error) => {
          let i: any = document.getElementById('RBP_File');
          i.value = "";
          if (error.status == 400) {
            // this.LayoutPDFUrl = "assets/images/image-default.png";
            swal('Warning!', error.error.Message, 'warning');
          }
        });
    }
    else {
      let i: any = document.getElementById('RBP_File');
      i.value = "";
      if (!uploadedFilename.match(regex))
        swal('Warning!', "Please upload image file with extension pdf or pdef", 'warning');
      else if (size > 2048)
        swal('Warning!', "Please upload image file less than 2mb", 'warning');
    }
  }

  getLTPPDFUrl() {
    let imagename = null;
    try {
      imagename = document.getElementById('RBP_File');
      return imagename.files[0].name;
    }
    catch (e) {
      return null;
    }
  }

  DeletePublishDetails(pos, PR_Id) {
    if (pos != null) {
      swal({
        title: 'Are you sure?', text: "You want to delete!", type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.Revisedproperties.splice(pos, 1);

          for (let i = 0; i < this.Reviseproperties.length; i++) {
            if (this.Reviseproperties[i].PR_Id == PR_Id) {
              if (this.Reviseproperties[i].PR_ReviseBaseprice == true) {
                this.Reviseproperties[i].PR_ReviseBaseprice = false;
                break;
              }
            }
          }

        }
      })
    }
  }
}


