import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from "../user.interface";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser : Observable<User>;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post("/api/login/", { username, password })
      .pipe(map(response => {
        // store user data
        localStorage.setItem("loginToken", response["token"]);

        // add to currentUser
        this.currentUser = response["user"];
      }));
  }

  logout() {
    localStorage.removeItem("loginToken");
    this.currentUser = null;
  }

}
