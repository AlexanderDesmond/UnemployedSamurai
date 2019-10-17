import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { UsersService } from "../../../services/users.service";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    // restrict access to registration if user already logged in
    if (this.authService.getCurrentUser()) this.router.navigate(["/"]);

    /* 
      Angular Material forms:
      https://angularfirebase.com/lessons/basics-reactive-forms-in-angular/
    */

    // Initialise form.
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          //Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$")
          Validators.pattern(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          )
        ]
      ]
    });
  }

  // Get fields from form:

  get username() {
    return this.registerForm.get("username");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get ConfirmPassword() {
    return this.registerForm.get("confirmPassword");
  }

  onStrengthChanged(strength: number) {
    console.log("password strength = ", strength);
  }

  // Attempt to create a new account when the Sign In button is pressed.
  onSubmit() {
    this.userService
      .registerUser(this.username.value, this.email.value, this.password.value)
      .subscribe(
        response => {
          alert("Account successfully created :)");
          this.router.navigate(["/login"]);
        },
        error => {
          alert("Account could not be created :(");
        }
      );
  }
}
