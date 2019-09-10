import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UsersService } from "../../../services/users.service";
import { User } from "src/app/user.interface";

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

  constructor(private fb: FormBuilder, private userService: UsersService) {}

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
          console.log("response is ", response);
        },
        error => {
          console.log("error is", error);
        }
      );

    // bad debugging ;)
    alert(
      "username:" + this.username.value + "/n password: " + this.password.value
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
