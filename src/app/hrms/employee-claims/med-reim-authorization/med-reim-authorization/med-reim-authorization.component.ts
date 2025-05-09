import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-med-reim-authorization',
  templateUrl: './med-reim-authorization.component.html',
  styleUrls: ['./med-reim-authorization.component.css']
})
export class MedReimAuthorizationComponent implements OnInit {

  title="Medical Reimbursment Approval";
 
  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata:any;
  Districtlist:any={};
  DI_Id:any={};
d: any={};
Remarks: any={};
MEDI_CLAIM_ID: any={};
Medicallist:any=[];
m:any={};
MEDI_CLAIM_ID1:number;
  data: any;
  state: number;
  mode:any;
  itemsPerPageChanged:any;
  constructor(private userService: UserService,private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { 
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetallData();
    this.m.DivisionId = +localStorage.getItem('divisonId');
    this.GetAllMedicalApporvalDetails(this.itemsPerPage, 1,this.m.DivisionId);
  }
  GetallData(){
  
   this.data = this.userService.GetAllDistrictMedical();
   this.data.subscribe(
     (response: any) => {
       this.Districtlist = response.Result;
     })  
  }

  //get for approval 
  GetAllMedicalApporvalDetails(itemsPerPage: number, pageNo: number,DI_Id) {
 
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetMedicalApproval(itemsPerPage, pageNo,DI_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.Medicallist = data.MedicalRemModel; 
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          console.log("result");
          console.log( this.data); 
          console.log(data.ComplaintRegisterAuthModel) ;      
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }
 
  GotoView(MEDI_CLAIM_ID){
   
    localStorage.removeItem('gotoAuth')
    localStorage.setItem('gotoAuth','1')
    this.router.navigate(['/home/emp-claims/medical-reimburesment-form',MEDI_CLAIM_ID,'view']);
  }


  handleChange1(MEDI_CLAIM_ID) {
   
   // this.state = 21;
    this.MEDI_CLAIM_ID = MEDI_CLAIM_ID;
    this.data = this.userService.UpdateMedicalApproval(this.MEDI_CLAIM_ID);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'Autherization is done', 'success');
        this.router.navigate(['/home/emp-claims/medical-reim-authorization']);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );

  }
 
save(Remarks,MEDI_CLAIM_ID)
{
 
  this.Remarks=this.Remarks
  this.data = this.userService.UpdateMedicalApproval2(Remarks,MEDI_CLAIM_ID);
  this.data.subscribe(
    (response: any) => {
      swal('Success!', 'Rejected', 'success');
      this.router.navigate(['/home/emp-claims/medical-reim-authorization']);
      document.getElementById('loader-spinner').style.display = "none";
    },
    (error) => {
      document.getElementById('loader-spinner').style.display = "none";
    }
  ); 
}


handleChange2(Remarks,MEDI_CLAIM_ID) {
  
  
    this.Remarks=Remarks
    this.m.MEDI_CLAIM_ID= MEDI_CLAIM_ID;
    this.state = 2;
   
  }


//   save(Remarks){ 
//     this.data = this.userService.UpdateAutherization(this.MEDI_CLAIM_ID,Remarks,this.state);
//     this.data.subscribe(
//       (response: any) => {
//         swal('Success!', 'Autherization is done', 'success');
//         this.router.navigate(['/home/leaveapp/leave-authorization']);
//         document.getElementById('loader-spinner').style.display = "none";
//       },
//       (error) => {
//         document.getElementById('loader-spinner').style.display = "none";
//       }
//     );
//   }


onSearch(s, itemsPerPage: number, pageNo: number) {
  
  debugger;
  this.isSearch = true;
  let searchText = this.s.SearchText;
  let searchCriteria = this.s.SearchCriteria;
    if(searchCriteria=='DOC_CODE'){
      const [name, street, unit] = searchText.split('/');
      let searchtxt=name;
      let searchtxt1=street;
      let searchtxt2=unit;
      searchText=searchtxt+searchtxt1+searchtxt2;
    }
    // if(searchCriteria=='DOC_CODE1'){
    //   const [name, street, unit] = searchText.split('/');
    //   let searchtxt=name;
    //   let searchtxt1=street;
    //   let searchtxt2=unit;
    //   searchText=searchtxt+searchtxt1+searchtxt2;
    // }
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchMedical(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.Medicallist = data.MedicalRemModel;
            this.totalItems = data.TotalItemsCount;
            this.currentPage = pageNo;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
            //swal('Search Failed.');
            this.errorHandler.handleError(error);
          });
    }
  }

 }
