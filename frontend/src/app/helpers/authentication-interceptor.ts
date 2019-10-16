import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {


    // This class is used to intercept all HTTP requests made from
    // the frontend. If the user is logged in, this class then adds the
    // the stored authentication token to the request headers.

    // Reference: https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

    constructor (private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if user is logged in, adds the authentication token
        // into all requests being made
        const token = this.authService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    "x-access-token": `${token}`
                }
            });
        }

        return next.handle(request);

    }

}
