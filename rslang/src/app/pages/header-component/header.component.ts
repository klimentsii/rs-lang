import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})

export class HeaderComponent {
  constructor() {
    console.log(document.getElementsByClassName("header-inner")[0]);
  }

  popup() {
    document.querySelector(".header-ul")?.classList.toggle("active");
  }
}
