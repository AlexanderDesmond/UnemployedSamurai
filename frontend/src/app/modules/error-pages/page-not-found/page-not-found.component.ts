import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"]
})
export class PageNotFoundComponent implements OnInit {
  image: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.image = "assets/images/website/farquaad2.gif";

    // Navigate back to home page after 10 second delay.
    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 10000);
  }
}
