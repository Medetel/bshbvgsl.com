import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/user.service';

@Component({
  selector: 'app-change-propertygrid',
  templateUrl: './change-propertygrid.component.html',
  styleUrls: ['./change-propertygrid.component.css']
})
export class ChangePropertygridComponent implements OnInit {
  title = "Change Property";
  changepropertyquotalist: any={};
  totalItems: any;
  isSearch: boolean;
  data: any;
 // userService: any;
  itemsPerPage: number = 5;
  currentPage: number = 5;
  pageNo: number = 1;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.GetAllchangepropertyquota(this.itemsPerPage,this.pageNo)
  }

  GetAllchangepropertyquota(itemsPerPage: number, pageNo: number){
    this.isSearch = false;
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.GetAllchangepropertyquota(itemsPerPage,pageNo);
   
    this.data.subscribe(
         (response: any) => {  
        
          this.changepropertyquotalist= response.propertyModels;    
          this.totalItems= response.TotalItemsCount;
          this.itemsPerPage = itemsPerPage;
          //this.currentPage = pageNo;       
                  // console.log(this.Paymonthfinalizedlist)
          document.getElementById('loader-spinner').style.display = "none";
         },    
          (error) => {
            document.getElementById('loader-spinner').style.display = "none";
          }
      );    
  }

}
