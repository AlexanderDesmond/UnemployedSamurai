import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.scss"]
})
export class PageNotFoundComponent implements OnInit {
  image: string;

  constructor() {}

  ngOnInit() {
    this.image = "assets/images/website/Farquaad Muffin Man.jpg";
  }
}
