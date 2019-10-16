import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../user.interface";

/**
 * References:
 * https://www.youtube.com/watch?v=_05v0mrNLh0
 * https://angular.io/tutorial/toh-pt6
 */

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

  // retrieves from the api and returns an array of
  // observable User objects
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/users/");
  }

  // Returns a single User observable based on username.
  getUser(username: string): Observable<User> {
    return this.http.get<User>("/api/users/" + username);
  }
}
