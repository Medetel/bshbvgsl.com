import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-htc-ltc-sanction-grid',
  templateUrl: './htc-ltc-sanction-grid.component.html',
  styleUrls: ['./htc-ltc-sanction-grid.component.css']
})
export class HtcLtcSanctionGridComponent implements OnInit {
  title = "HTC/LTC Sanction";



  s: Search;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  totalItems: number;
  isSearch: boolean;
  fileToUpload: File = null;
  filedata: any;
  Districtlist: any = {};
  DI_Id: any = {};
  d: any = {};
  Remarks: any = {};
  LVCONS_ID: any = {};
  Medicallist: any = [];
  m: any = {};
  MEDI_CLAIM_ID1: number;
  data: any;
  state: number;
  pageChanged: any;
  itemsPerPageChanged:any;
  mode:any;
  
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetallData();
    this.m.DivisionId = +localStorage.getItem('divisonId');
    this.GetAllHTCDetialsSanc(this.itemsPerPage, 1, this.m.DivisionId);
  }
  GetallData() {

    this.data = this.userService.GetAllDistrictHTCSan();
    this.data.subscribe(
      (response: any) => {
        this.Districtlist = response.Result;
      })
  }

  //get for approval 
  GetAllHTCDetialsSanc(itemsPerPage: number, pageNo: number, DI_Id) {

    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetAllHTCDetialsSanc(itemsPerPage, pageNo, DI_Id)
      .subscribe(
        (data: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.Medicallist = data.HTCModel;
          this.totalItems = data.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          console.log("result");
          console.log(this.data);
          console.log(data.ComplaintRegisterAuthModel);
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  GotoView(LVCONS_ID) {

    localStorage.removeItem('gotoAuth')
    localStorage.setItem('gotoAuth', '1')
    this.router.navigate(['/home/emp-claims/htc-ltc-authorization', LVCONS_ID, 'view']);
  }


  handleChange1(LVCONS_ID) {

    this.state = 21;
    this.LVCONS_ID = LVCONS_ID;
    this.data = this.userService.UpdateHTCSanction(this.LVCONS_ID);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'sanction is done', 'success');
        this.router.navigate(['/home/emp-claims/htc-ltc-sanction']);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );

  }

  save(Remarks, LVCONS_ID) {

    this.Remarks = this.Remarks
    this.data = this.userService.UpdateHTCSancttion2(Remarks, LVCONS_ID);
    this.data.subscribe(
      (response: any) => {
        swal('Success!', 'Rejected', 'success');
        this.router.navigate(['/home/emp-claims/htc-ltc-sanction']);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  handleChange2(Remarks, LVCONS_ID) {


    this.Remarks = Remarks
    this.m.LVCONS_ID = LVCONS_ID;
    this.state = 2;

  }

  onSearch(s, itemsPerPage: number, pageNo: number) {


    this.isSearch = true;
    let searchText = this.s.SearchText;
    let searchCriteria = this.s.SearchCriteria;
    if (searchCriteria == 'DOC_CODE') {
      const [name, street, unit] = searchText.split('/');
      let searchtxt = name;
      let searchtxt1 = street;
      let searchtxt2 = unit;
      searchText = searchtxt + searchtxt1 + searchtxt2;
    }
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.userService.SearchHTC(searchCriteria, searchText, itemsPerPage, pageNo)
        .subscribe(
          (data: any) => {
            this.Medicallist = data.HTCModel;
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
