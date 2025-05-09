import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import { Search } from '../../shared/user.model';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  title = "Query";
  s: Search;
  CaseDetails: any = [];
  data: any = {};
  petDetails: any = [];
  advDetails: any = [];
  allAdvocatelist: any = [];
  previousCases: any = {};
  CaseNosearch: boolean = false;
  CaseListsearch: boolean = false;
  QueryCasesList: any = [];
  CaseProceedinglist: any = [];
  AdvocateDetails: any = [];
  LastCaseProceedinglist: any = [];
  AdvocatesCasesbilllist: any = [];
  paybill: boolean = false;
  Name: string = '';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) {
    this.s = new Search();
  }

  ngOnInit() {
    this.GetDefaultData()

    this.route.params.subscribe(params => {
      if (params['CaseId'] != null) {
        this.s.SearchCriteria = "Case_No";
        this.s.SearchText = params['CaseId'];
        this.onSearch(this.s)
      }

    });

  }

  GetDefaultData() {
    this.data = this.userService.GetAllAdvocates();
    this.data.subscribe(
      (response: any) => {
        this.allAdvocatelist = response.Result;
      }
    )
  }


  onSearch(s) {

    var searchText = this.s.SearchText;
    var searchCriteria = this.s.SearchCriteria;
    if (searchText == "" || searchText == null || searchCriteria == "" || searchCriteria == null)
      swal("Warning!", "Please enter the searchby  and search text.", "warning");
    else {
      this.Name = searchCriteria;
      document.getElementById('loader-spinner').style.display = "block";
      //If searchCriteria is Case No 
      if (searchCriteria == "Case_No") {
        this.CaseNosearch = true;
        this.CaseListsearch = false;

        this.userService.GetCaseQuery(searchText)
          .subscribe(
            (data: any) => {
              this.CaseDetails = data;
              document.getElementById('loader-spinner').style.display = "none";
              this.GetByIdCseRegistration(data.Case_Id);
            }
          )

        this.userService.GetAdvocatesOfCaseQuery(searchText)
          .subscribe(
            (data: any) => {
              this.AdvocateDetails = data.Result;
              document.getElementById('loader-spinner').style.display = "none";
            }
          )

        this.userService.GetLastCaseProceedingforCaseQuery(searchText)
          .subscribe(
            (data: any) => {
              this.LastCaseProceedinglist = data.Result[0];
              document.getElementById('loader-spinner').style.display = "none";
            }
          )
      }

      else {
        this.CaseListsearch = true;
        this.CaseNosearch = false;
        this.GetAllCaselistofLegalqueryOnSearch(searchCriteria, searchText)
      }
    }
  }

  GetByIdCseRegistration(CaseId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetByIdCseRegistration(CaseId);
    this.data.subscribe(
      (response: any) => {
        response;

        if (response.CasePetitionerModels! = null)
          this.petDetails = response.CasePetitionerModels;
        if (response.AdvocatesOfCasesModels! = null)
          this.advDetails = response.AdvocatesOfCasesModels;

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetPreviousCases(caseNo) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllPreviousCasesforQuery(caseNo);
    this.data.subscribe(
      (response: any) => {
        this.previousCases = response.Result;

        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetAllCaselistofLegalqueryOnSearch(SearchBy, SearchText) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllCaselistofLegalqueryOnSearch(SearchBy, SearchText);
    this.data.subscribe(
      (response: any) => {
        this.QueryCasesList = response;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      });
  }

  GetBillDetails(advId, CaseId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllAdvocatesCasesBillDetails(CaseId, advId);
    this.data.subscribe(
      (response: any) => {
        this.paybill = true;
        this.AdvocatesCasesbilllist = response.Result;

        document.getElementById('loader-spinner').style.display = "none";
      },
      (error) => {
        document.getElementById('loader-spinner').style.display = "none";
      }
    );
  }

  view(id) {
    this.router.navigate(['/home/Query/case', id]);
  }

}