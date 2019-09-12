import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UsersService } from "../../../services/users.service";
import { User } from "src/app/user.interface";

import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  // temp
  user: User;
  users: User[];

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.getUsers();
    this.getUser();
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onSubmit() {
    this.userService
      .loginUser(this.username.value, this.password.value)
      .subscribe(
        response => {

          // show alert to user
          alert("Login Successful :)");

          // save token to localstorage

          // redirect to homepage
          this.router.navigate(["/"]);
        },
        error => {
          alert("Login Unsuccessful :(");
        }
      );

  }

  // Test
  getUsers() {
    this.userService.getUsers().subscribe(
      response => {
        console.log("response is ", response);
      },
      error => {
        console.log("error is", error);
      }
    );
  }

  getUser() {
    this.userService.getUser("admin").subscribe(
      response => {
        console.log("response is ", response);
      },
      error => {
        console.log("error is", error);
      }
    );
  }
}
