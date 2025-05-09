import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandler } from '../../../shared/ErrorHandler';

@Component({
  selector: 'app-project-names',
  templateUrl: './project-names.component.html',
  styleUrls: ['./project-names.component.css']
})
export class ProjectNamesComponent implements OnInit {
  title = "Project Names";
  cancellayoutlist;
  data:any;
  Sch_Id:any;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.Sch_Id = params['Sch_Id']
    );
    if(this.Sch_Id!=null)
    this.GetAllLayout(this.Sch_Id);
  }

  GetAllLayout(Sch_Id) {
    debugger;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllLayout(Sch_Id);
    this.data.subscribe(
      (response: any) => {
        this.cancellayoutlist = response.AllotmentCancellationModel;
        document.getElementById('loader-spinner').style.display = "none";
      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        this.errorHandler.handleError(error);
      });
  }
}
