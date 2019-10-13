import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { User } from "../user.interface";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // Sends user login information to the backend.
  loginUser(username: string, password: string) {
    return this.http.post("/api/login/", { username, password });
  }

  // Uploads new user to the database.
  registerUser(username: string, email: string, password: string) {
    return this.http.post("/api/users/", { username, email, password });
  }

  // Returns a list of users.
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/users/");
  }

  // Returns a user based on username.
  getUser(username: string): Observable<User> {
    return this.http.get<User>("/api/users/" + username);
  }
}
