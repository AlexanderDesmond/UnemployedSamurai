import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from "../user.interface";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  getCurrentUser(): String {
    return localStorage.getItem("currentUser");
  }

  login(username: string, password: string) {
    return this.http.post("/api/login/", { username, password })
      .pipe(map(response => {
        // store user data
        localStorage.setItem("loginToken", response["token"]);
        localStorage.setItem("currentUser", response["user"].username);
      }));
  }

  logout() {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("currentUser");
  }

}
