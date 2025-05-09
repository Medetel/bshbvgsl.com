import { Component, OnInit, ErrorHandler } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-freehold-form',
  templateUrl: './freehold-form.component.html',
  styleUrls: ['./freehold-form.component.css']
})
export class FreeholdFormComponent implements OnInit {

  title = "Free Hold Calculation";
  data: any = {};
  freeholdList: any = [];
  searchText: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler,) { }

  ngOnInit() {
  }

  GetAllFreeholddetailsBySearch(searchText) {
    debugger;
    console.log(searchText)
    if (searchText == "" || searchText == null)
      swal("Warning!", "Please enter the search criteria and search text.", "warning");
    else {
      document.getElementById('loader-spinner').style.display = "block";
      this.data = this.userService.GetAllFreeholddetailsBySearch(searchText);
      this.data.subscribe(
        (response: any) => {
          this.freeholdList = response;
          console.log("applicant:", response);
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
    }
  }

}
