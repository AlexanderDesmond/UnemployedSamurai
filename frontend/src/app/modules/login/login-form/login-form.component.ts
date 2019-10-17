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
    if (this.authService.getCurrentUser()) this.router.navigate(["/"]);

    /* 
      Angular Material forms:
      https://angularfirebase.com/lessons/basics-reactive-forms-in-angular/
    */
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // Return username field from login form.
  get username() {
    return this.loginForm.get("username");
  }

  // Return password field from login field.
  get password() {
    return this.loginForm.get("password");
  }

  // Handles login. Shows error message on login fail.
  onSubmit() {
    this.authService.login(this.username.value, this.password.value).subscribe(
      response => {
        // Hide error message.
        this.isError = false;

        // Redirect to homepage
        this.router.navigate(["/"]);
      },
      error => {
        // Show error message.
        this.isError = true;
      }
    );
  }
}
