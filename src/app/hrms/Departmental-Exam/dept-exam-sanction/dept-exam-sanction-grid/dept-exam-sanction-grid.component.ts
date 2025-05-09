import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Search } from '../../../../shared/user.model';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dept-exam-sanction-grid',
  templateUrl: './dept-exam-sanction-grid.component.html',
  styleUrls: ['./dept-exam-sanction-grid.component.css']
})
export class DeptExamSanctionGridComponent implements OnInit {

  title="View Departmental Exam Sanction";
  mode:any;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  data: any = [];
  totalItems: number;
  s: Search;
  isSearch: boolean;  
  c: any = []
  districtlist: any = [];
  filter: boolean = true;
  state: number;  
  a : any =[];
  TanferDeatils: any=[];
  EXAMINATION_ID: number;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
    this.isSearch = false;
  }

  ngOnInit() {
    this.GetAllDeptsanDetails(this.itemsPerPage, this.currentPage)
    this.data = this.userService.GetDristic();
    this.data.subscribe(
      (response) => {
        this.districtlist = response.DivisionModel;
      })
  }

  itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
    if (this.isSearch)
      this.onSearch(this.s, itemsPerPage, pageNo);
    else
      this.GetAllDeptsanDetails(itemsPerPage, pageNo);
  }

  pageChanged(pageNumber: number) {
    if (this.isSearch)
      this.onSearch(this.s, this.itemsPerPage, pageNumber);
    else
      this.GetAllDeptsanDetails(this.itemsPerPage, pageNumber);
  }


  GetAllDeptsanDetails(itemsPerPage: number, pageNo: number) {
    this.filter = true;
    setTimeout(() => {

      this.isSearch = false;
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllDeptsanDetails(itemsPerPage, pageNo);
      this.data.subscribe(
        (response: any) => {         
          this.TanferDeatils = response.DepartmentExamModel;   
          // if(this.TanferDeatils.length>0)            
          this.totalItems = response.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          this.currentPage = pageNo;
          document.getElementById('loader-spinner').style.display = "none";
        },
        (error) => {
          document.getElementById('loader-spinner').style.display = "none";
        }
      );
    }, 500)

  } 


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
      if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
        swal("Warning!", "Please enter the search criteria and search text.", "warning");
      else {
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.SearchDeptExam(searchCriteria, searchText, itemsPerPage, pageNo)
          .subscribe(
            (data: any) => {
              this.TanferDeatils = data.DepartmentExamModel;
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


  

  handleChange1(EXAMINATION_ID) {
   
    debugger;
    this.EXAMINATION_ID = EXAMINATION_ID;
    this.state = 2;
    //alert(this.state)
  }

  handleChange2(EXAMINATION_ID) {
    // alert('1')
    debugger;
    this.EXAMINATION_ID = EXAMINATION_ID;
    this.state = 1;
    //this.save(null)   
  }


  save(Remarks){ 
    // alert(this.state)

    this.data = this.userService.UpdateExamSan(this.state,Remarks,this.EXAMINATION_ID);
    this.data.subscribe(
      (response: any) => {  
        swal('Success!', 'Updated', 'success');
        this.GetAllDeptsanDetails(this.itemsPerPage, this.currentPage);
        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }


  View(ID){
    localStorage.setItem('switchurl','/home/deptexam/dept-exam-sanction')
    this.router.navigate(['/home/deptexam/deptexam-form',ID,'View']);
  }
 

}

