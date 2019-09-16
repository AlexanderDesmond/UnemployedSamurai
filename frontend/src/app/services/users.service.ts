import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { User } from "../user.interface";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // This is implemented in the frontend!
  loginUser(username: string, password: string) {
    return this.http.post("/api/login/", { username, password });
  }

  registerUser(username: string, email: string, password: string) {
    return this.http.post("/api/users/", { username, email, password });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/users/");
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>("/api/users/" + username);
  }
}
