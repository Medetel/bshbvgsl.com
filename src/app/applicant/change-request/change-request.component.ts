import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../shared/ErrorHandler';
import swal from 'sweetalert2';

@Component({
    selector: 'app-change-request',
    templateUrl: './change-request.component.html',
    styleUrls: ['./change-request.component.css']
})
export class ChangeRequestComponent implements OnInit {

    title = "Applicant Change Request";
    ApplicantDetails: any;
    Applicant:any={};
    app:any={};
    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

    ngOnInit() {
    }
    // searchText;
    // heroes = [
    //     { id: 11, name: 'Mr. Nice', country: 'India' },
    //     { id: 12, name: 'Narco', country: 'USA' },
    //     { id: 13, name: 'Bombasto', country: 'UK' },
    //     { id: 14, name: 'Celeritas', country: 'Canada' },
    //     { id: 15, name: 'Magneta', country: 'Russia' },
    //     { id: 16, name: 'RubberMan', country: 'China' },
    //     { id: 17, name: 'Dynama', country: 'Germany' },
    //     { id: 18, name: 'Dr IQ', country: 'Hong Kong' },
    //     { id: 19, name: 'Magma', country: 'South Africa' },
    //     { id: 20, name: 'Tornado', country: 'Sri Lanka' }
    // ];

    GetApplicantDetailsById(AppId: any) {
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.GetApplicantDetailsforCRbyAppId(AppId)
        .subscribe(
          (response: any) => {
            this.Applicant = response;
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          });
    }

    GetApplicantDetails(SearchValue: any, SearchName: any) {
        
        if (SearchValue == "" && SearchName == "") {
            this.ApplicantDetails = null;
            return
        }
        if (SearchValue == "" || SearchValue == undefined) { SearchValue = "empty" } if (SearchName == "" || SearchName == undefined) { SearchName = "empty" }
        this.userService.GetApplicantDetailsforCR(SearchValue, SearchName)
            .subscribe(
                (data: any) => {
                    this.ApplicantDetails = data;
                }, (error) => {
                    this.errorHandler.handleError(error);
                });
    }
    EditApplicantDetails(Applicant){
        document.getElementById('loader-spinner').style.display = "block";
        this.userService.EditApplicantDetails(Applicant)
        .subscribe(
          (response: any) => {
            this.Applicant={};
            this.ApplicantDetails=[];
            this.app={};
            swal('success', 'Applicant Details Updated Successfully!', 'success');
            document.getElementById('loader-spinner').style.display = "none";
          }, (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          });
    }
}
