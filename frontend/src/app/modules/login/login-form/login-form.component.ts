import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UsersService } from "../../../services/users.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.userService.getLogin().subscribe(
      response => {
        console.log("response is ", response);
      },
      error => {
        console.log("error is", error);
      }
    );
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
      .subscribe();

    // bad debugging ;)
    alert(
      "username:" + this.username.value + "/n password: " + this.password.value
    );
  }
}
