import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit {

  email: string;

  password: string;
  password2: string;

  reg: HTMLElement;

  constructor() {
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.reg = document.createElement("a");
  }

  ngOnInit(): void {
    // empty
  }

  async createUser(user: object) {
    const arr = document.querySelectorAll("input.auth-input");

    if (arr[0].getAttribute("ng-reflect-model")!.length < 1) {
      document.querySelector(".auth")!.append(this.createError("Please enter your email"));
    } else if(String(arr[0].getAttribute("ng-reflect-model")).Contains()) {

    } else if (arr[1].getAttribute("ng-reflect-model")!.length < 8) {
      document.querySelector(".auth")!.append(this.createError("Please enter your password(min 8 symbols)"));
    }  else if (arr[1].getAttribute("ng-reflect-model") !== arr[2].getAttribute("ng-reflect-model")) {
      document.querySelector(".auth")!.append(this.createError("Password must be the same"));
    } else {
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

  createError(text: string) {
    const el = document.createElement("div");
    el.classList.add("auth-error");
    el.textContent = text;
    el.setAttribute("style", `
      border: 1px #F06171 solid; background-color: #4d010152; color: #F06171; padding: 10px 20px;
      margin: 10px; left: 0; border-radius: 10px; font-size: 24px; transition: all 0.5s
    `);
    return el;
  }
}
