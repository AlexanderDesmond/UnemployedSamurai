import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from "../user.interface";
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // used to notify subscribing objects to change in login
  public getLoggedIn = new BehaviorSubject(this.getCurrentUser() != null);

  constructor(private http: HttpClient) {

    // set value depending on if currentUser exists in local storage
    this.getLoggedIn.next(localStorage.getItem("currentUser") != null);
  }

  // returns current username
  getCurrentUser(): String {
    return localStorage.getItem("currentUser");
  }

  // returns current login token
  getToken(): String {
    return localStorage.getItem("loginToken");
  }

  // calls login endpoint, and stores token from returned
  // request into local storage
  login(username: string, password: string) {
    return this.http.post("/api/login/", { username, password })
      .pipe(map(response => {
        // store user data
        localStorage.setItem("loginToken", response["token"]);
        localStorage.setItem("currentUser", response["user"].username);
        this.getLoggedIn.next(true);
      }));
  }

  // call refreshtoken endpoint in order to retrieive and
  // update token and prolong expiration time
  refreshLogin() {
    return this.http.get("/api/refreshtoken/")
      .subscribe(
        response => {
          if (response["auth"] == true) {
            localStorage.setItem("loginToken", response["token"]);
            localStorage.setItem("currentUser", response["user"].username);
            this.getLoggedIn.next(true); // to update listeners
          } else {
            alert("Your session has expired");
            this.logout();
          }
        },
        error => {
          this.logout();
          alert("Your session has expired");
        }
      );
  }

  // remove token from localstorage to mark logout
  logout() {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("currentUser");
    this.getLoggedIn.next(false); // to update listeners
  }

}
