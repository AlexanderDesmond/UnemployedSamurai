import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface User {
  username: String;
  email: String;
  password: String;
  /*
  created: Date;
  lastLogin: Date;
  isAdmin: Boolean;
  */
}

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/users/");
  }

  getUser(username: String): Observable<User> {
    return this.http.get<User>("http://localhost:3000/users/" + username);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:3000/users/", user);
  }

  updateUser(user: User): Observable<void> {
    return this.http.put<void>(
      "http://localhost3000/users/" + user.username,
      user
    );
  }

  deleteUser(username: String) {
    return this.http.delete("http://localhost3000/users/" + username);
  }

  /*
  loginUser(username: String, password: String): Observable<void> {
    console.log("loginUser called: /n"); // Debugging line
    return this.http.post<void>("http://localhost3000/login/", {
      username,
      password
    });
  }
  */

  loginUser(username: String, password: String) {
    return this.http.post("/api/login/", { username, password });
  }

  getLogin() {
    return this.http.get("http:localhost:3000/login/");
  }

  // CASH STUFF!!!
  addCash(amount: number) {
    return this.http.post("/api/cash", amount);
  }

  getCash() {
    return this.http.get("/api/cash");
  }
}
