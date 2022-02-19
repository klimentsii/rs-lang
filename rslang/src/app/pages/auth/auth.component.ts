import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {

  email: string;

  password: string;

  reg: HTMLElement;

  constructor() {
    this.email = "";
    this.password = "";
    this.reg = document.createElement("a");
    // em
  }

  ngOnInit(): void {
    // em
  }

  async loginUser(user: object) {
    const rawResponse = await fetch("https://app-name-rslang.herokuapp.com/signin", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    const content = await rawResponse.json();

    if (content.message === "Authorized") {
      localStorage.setItem("token", content.token);
    }

    return content && alert(content.message);
  }

}
