import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../../shared/ErrorHandler';

@Component({
  selector: 'app-claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.css']
})
export class ClaimFormComponent implements OnInit {
  title = "Claims";
  roleId: string;
  roleName: string;
  officeName: string;
  claimsList: any;
  data: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandler) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roleId = params['roleId']
      this.roleName = params['roleName']    
    });
    if (this.roleId != null && this.roleName != null)
      this.GetAllClaimsForTheRole(this.roleId);
  }

  GetAllClaimsForTheRole(roleId) {
    document.getElementById('loader-spinner').style.display = "block";
    this.userService.getAllClaimsForTheRole(roleId)
      .subscribe(
        (data) => {
          this.claimsList = data;
          document.getElementById('loader-spinner').style.display = "none";
        }, (error) => {
          document.getElementById('loader-spinner').style.display = "none";
          this.errorHandler.handleError(error);
        });
  }

  SaveClaims(claimsList) {
    document.getElementById('loader-spinner').style.display = "block";
    this.data = this.userService.saveClaims(claimsList, this.roleId)
    this.data.subscribe(
      (response) => {
        swal('', 'Success! Note: This changes will come into effect when the user log out and log in again.', 'success');
        this.router.navigate(['/home/claimslist']);
        document.getElementById('loader-spinner').style.display = "none";

      }, (error) => {
        document.getElementById('loader-spinner').style.display = "none";
        if (error.status == 401)

          this.errorHandler.handleError(error);
      });
  }

  changeCheckbox(menuPos, pagePos, claimPos) {
    for (let i = 0; i < this.claimsList.length; i++) {
      if (i == menuPos) {
        for (let j = 0; j < this.claimsList[i].BSHB_PagesList.length; j++) {
          if (j == pagePos) {
            for (let k = 0; k < this.claimsList[i].BSHB_PagesList[j].KHB_PageFunctionClaim.length; k++) {
              if (k == claimPos) {
                let val: boolean = null;
                if (this.claimsList[i].BSHB_PagesList[j].KHB_PageFunctionClaim[k].ClaimValue == true)
                  val = false;
                else
                  val = true;
                this.claimsList[i].BSHB_PagesList[j].KHB_PageFunctionClaim[k].ClaimValue = val;
              }
            }
          }
        }
      }
    }
  }

  //For sub menu functions
  changeCheckbox1(menuPos, pagePos, subpagepos, claimPos) {
    for (let i = 0; i < this.claimsList.length; i++) {
      if (i == menuPos) {
        for (let j = 0; j < this.claimsList[i].BSHB_PagesList.length; j++) {
          if (j == pagePos) {

            for (let m = 0; m < this.claimsList[i].BSHB_PagesList[j].KHB_SubPagesModels.length; m++) {
              if (m == subpagepos) {
                for (let h = 0; h < this.claimsList[i].BSHB_PagesList[j].KHB_SubPagesModels[m].ClaimsModels.length; h++) {
                  if (h == claimPos) {
                    let val: boolean = null;
                    if (this.claimsList[i].BSHB_PagesList[j].KHB_SubPagesModels[m].ClaimsModels[h].ClaimValue == true)
                      val = false;
                    else
                      val = true;
                    this.claimsList[i].BSHB_PagesList[j].KHB_SubPagesModels[m].ClaimsModels[h].ClaimValue = val;
                  }
                }
              }
            }

          }
        }
      }
    }
  }
}