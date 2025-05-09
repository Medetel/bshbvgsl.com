import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Alert } from 'selenium-webdriver';
import { UserService } from '../../shared/user.service';
import { ErrorHandler } from '../../shared/ErrorHandler';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

  GetApplicantTransactionDetails: any = [];
  DebitTotal: number;
  CreditTotal: number;
  ClosingBalance: number;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number;
  data: any;
  APP_No: string;
  t: any = [];
  j: any = [];
  constructor(private userService: UserService, private errorHandler: ErrorHandler) {

  }

  ngOnInit() {
    
    // this.ApplicantTransactionDetails(this.itemsPerPage, 1)
  }

  // pageChanged(pageNumber: number) {
  //   this.ApplicantTransactionDetails(this.itemsPerPage, pageNumber);
  // }

  // itemsPerPageChanged(itemsPerPage: number, pageNo: number) {
  //   this.ApplicantTransactionDetails(this.itemsPerPage, pageNo);
  // }
  // GetByIdApplicant(APP_No: string) {
  //   debugger;
  //   this.APP_No = APP_No
  //   // if (!APP_No) {
  //   //   console.error('Application number is required');
  //   //   return;
  //   // }
  
  //   // Show loader
  //   document.getElementById('loader-spinner').style.display = "block";
  
  //   // Call the service to fetch applicant data by APP_No
  //   this.userService.GetByIdApplicantTransaction(APP_No).subscribe(
  //     (response: any) => {
  //       // Hide loader
  //       document.getElementById('loader-spinner').style.display = "none";
        
  //       // Handle successful response
  //       this.j = response;
  //       this.ApplicantTransactionDetails(this.APP_No)
  //       console.log('Fetched applicant data:', this.j);
  //     },
  //     (error) => {
  //       // Hide loader on error
  //       document.getElementById('loader-spinner').style.display = "none";
  //       console.error('Error fetching applicant data:', error);
  //     }
  //   );
  // }
  GetByIdApplicant(APP_No:any) {
    debugger
    this.DebitTotal = null;
    this.CreditTotal = null;
    this.ClosingBalance = null;
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.GetByIdApplicantTransaction(APP_No)
      .subscribe(
        (data: any) => {
          this.GetApplicantTransactionDetails = data.TransactionModels;
          console.log(this.GetApplicantTransactionDetails);
          if(this.GetApplicantTransactionDetails.length == 0)
          {
            swal('Warning!', 'Transaction details not found', 'warning');
            document.getElementById('loader-spinner').style.display = "none";
            this.DebitTotal = null;
            this.CreditTotal = null;
            this.ClosingBalance = null;
            return;
          }
          
          this.totalItems = data.TotalItemsCount;
          // this.itemsPerPage = itemsPerPage;
          // this.currentPage = pageNo;
          this.GetDebitTotal();
          this.GetCreditTotal();
          this.GetClosingBalance();
          
          document.getElementById('loader-spinner').style.display = "none";
        }, (error: any) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
        
  }
  // GetByIdApplicant(APP_No) {
  //   debugger
  //   this.APP_No = APP_No;
  //   document.getElementById('loader-spinner').style.display = "block";
  //   this.data = this.userService.GetByIdApplicantTransaction(APP_No);
  //   this.data.subscribe(
  //     (response: any) => {
  //       this.t = response.TransactionModels;
  //       this.GetDebitTotal();
  //       this.GetCreditTotal();
  //       this.GetClosingBalance();
  //       // this.ChangeOfDivision(response.EMP_DIVISION_ID)     
  //       // this.ChangeOfEmployee(response.EMP_ID);
  //       document.getElementById('loader-spinner').style.display = "none";
  //     }, (error) => {
  //       document.getElementById('loader-spinner').style.display = "none";
  //     });
  // }

  GetDebitTotal() {
    
    let totals = 0;
    for (let i = 0; i < this.GetApplicantTransactionDetails.length; i++) {
      totals += this.GetApplicantTransactionDetails[i].Debit;
    }
    this.DebitTotal = totals;
  }

  GetCreditTotal() {
    let totals = 0;
    for (let i = 0; i < this.GetApplicantTransactionDetails.length; i++) {
      totals += this.GetApplicantTransactionDetails[i].Credit;
    }
    this.CreditTotal = totals;
  }

  GetClosingBalance() {
    this.ClosingBalance = this.DebitTotal - this.CreditTotal;
  }

  print(): void {
    const printContents = document.getElementById('print-section').innerHTML;
    const stylesHtml = this.getTagsHtml('style');
    const linksHtml = this.getTagsHtml('link');
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
    <html>
        <head>
            <title>Applicant Not Found</title>
            ${linksHtml}
            ${stylesHtml}
        </head>
        <body onload="window.print(); window.close()">
            ${printContents}
        </body>
    </html>
    `
    );
    popupWin.document.close();
  }

  private getTagsHtml(tagName: keyof HTMLElementTagNameMap): string {
    const htmlStr: string[] = [];
    const elements = document.getElementsByTagName(tagName);
    for (let idx = 0; idx < elements.length; idx++) {
      htmlStr.push(elements[idx].outerHTML);
    }

    return htmlStr.join('\r\n');
  }
}
