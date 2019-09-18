import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

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
