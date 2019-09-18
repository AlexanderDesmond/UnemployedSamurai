import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from "../user.interface";
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // used to notify subscribing objects to change in login
  public getLoggedIn = new Subject();

  constructor(private http: HttpClient) {

    // set value depending on if currentUser exists in local storage
    this.getLoggedIn.next(localStorage.getItem("currentUser") != null);
  }

  getCurrentUser(): String {
    return localStorage.getItem("currentUser");
  }

  getToken(): String {
    return localStorage.getItem("loginToken");
  }

  login(username: string, password: string) {
    return this.http.post("/api/login/", { username, password })
      .pipe(map(response => {
        // store user data
        localStorage.setItem("loginToken", response["token"]);
        localStorage.setItem("currentUser", response["user"].username);
        this.getLoggedIn.next(true);
      }));
  }

  logout() {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("currentUser");
    this.getLoggedIn.next(false);
  }

}
