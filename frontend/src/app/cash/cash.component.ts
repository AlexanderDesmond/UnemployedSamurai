import { Component, OnInit } from "@angular/core";

import { UsersService } from "../services/users.service";

@Component({
  selector: "app-cash",
  templateUrl: "./cash.component.html",
  styleUrls: ["./cash.component.scss"]
})
export class CashComponent implements OnInit {
  amount: number;
  total: number;

  constructor(private userService: UsersService) {
    this.amount = 0;
    this.total = 0;
  }

  ngOnInit() {}

  handleClick() {
    console.log("Add button clicked.");

    this.add(this.amount);

    this.userService.addCash(this.amount).subscribe(
      response => {
        console.log("response is ", response);
      },
      error => {
        console.log("error is", error);
      }
    );
  }

  add(amount: number) {
    this.total = this.total + amount;
  }
}
