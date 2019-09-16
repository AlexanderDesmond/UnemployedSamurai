import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UsersService } from "../../../services/users.service";
import { AuthenticationService } from "../../../services/authentication.service";
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
  //user: User;
  users: User[];
  isError: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {

    // restrict access if user already logged in
    if (this.authService.getCurrentUser())
      this.router.navigate(['/']);

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
    this.authService
      .login(this.username.value, this.password.value)
      .subscribe(
        response => {
          // console.log(response);

          // show alert to user
          // alert("Login Successful :)");
          this.isError = false;

          // redirect to homepage
          this.router.navigate(["/"]);
        },
        error => {
          // alert("Login Unsuccessful :(");
          this.isError = true;
        }
      );
  }

  // Test
  getUsers() {
    // this.userService.getUsers().subscribe(
    //   response => {
    //     console.log("response is ", response);
    //   },
    //   error => {
    //     console.log("error is", error);
    //   }
    // );

    this.userService.getUsers().subscribe(data => (this.users = data));
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
