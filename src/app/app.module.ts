import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { LocationStrategy, HashLocationStrategy, TitleCasePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppComponent } from './app.component';
import { ErrorHandler } from './shared/ErrorHandler';
import { HeaderComponent } from './common/header/header.component';
import { Level1menuComponent } from './common/level1menu/level1menu.component';
import { HomepageComponent } from '../app/homepage/homepage.component';
import { FooterComponent } from '../app/common/footer/footer.component';
import { ReportsComponent } from '../app/reports/reports.component';
import { AuthGuard } from './auth/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './shared/user.service'; // Import UserService
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Level1menuComponent,
    HomepageComponent,
    FooterComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    UserService, ErrorHandler, AuthGuard, { provide: LocationStrategy, useClass: HashLocationStrategy },
    TitleCasePipe
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorHandler,
    //   multi: true
    // }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }