import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit {

  email: string;

  password: string;

  reg: HTMLElement;

  constructor() {
    this.email = "";
    this.password = "";
    this.reg = document.createElement("a");
    // empty
  }

  ngOnInit(): void {
    // empty
  }

  async createUser(user: object) {
    const rawResponse = await fetch("https://app-name-rslang.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

    return rawResponse.ok ? rawResponse && this.reg.classList.add("active") : alert("error");
  }
}
