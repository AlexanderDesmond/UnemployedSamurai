import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UsersService } from "../../../services/users.service";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", Validators.required, Validators.email],
      password: [
        "",
        Validators.required,
        Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$")
      ]
    });
  }

  get username() {
    return this.registerForm.get("username");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  getConfirmPassword() {
    return this.registerForm.get("confirmPassword");
  }

  onSubmit() {
    //this.userService.createUser(this.username.value, this.email.value, this.password.value);
  }
}
