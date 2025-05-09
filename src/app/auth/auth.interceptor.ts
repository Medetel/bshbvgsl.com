/*
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tokenInfo = localStorage.getItem('accessToken');
        if (tokenInfo) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenInfo}`
                }
            });
        }
        
        return next.handle(request).pipe(
            catchError((error: any) => {
                if (error.status === 401 || error.status === 403) {
                    // Unauthorized or Forbidden error
                    // Handle accordingly, for example, redirect to login page
                    this.router.navigate(['auth/login']);
                }
                return (error);
                //return({ title: 'Error', text: 'An error has occurred, please try again later.', type: 'error' });
            })
        );
    }
}
*/





import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UserService } from "../shared/user.service";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
 
@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
        let tokenInfo = localStorage.getItem('accessToken');
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenInfo}`
                }
            });
        return newRequest.handle(request);       
    }
 
    
    // constructor(private router: Router) { }
 
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (req.headers.get('No-Auth') == "True")
    //         return next.handle(req.clone());
 
       
    // }
    
}

