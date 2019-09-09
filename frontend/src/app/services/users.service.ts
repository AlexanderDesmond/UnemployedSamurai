import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { User } from "../user.interface";

// export interface User {
//   username: String;
//   email: String;
//   password: String;
//   /*
//   created: Date;
//   lastLogin: Date;
//   isAdmin: Boolean;
//   */
// }

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>("http://localhost:3000/users/");
  // }

  // getUser(username: String): Observable<User> {
  //   return this.http.get<User>("http://localhost:3000/users/" + username);
  // }

  createUser(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:3000/users/", user);
  }

  updateUser(user: User): Observable<void> {
    return this.http.put<void>(
      "http://localhost3000/users/" + user.username,
      user
    );
  }

  deleteUser(username: string) {
    return this.http.delete("http://localhost3000/users/" + username);
  }

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
