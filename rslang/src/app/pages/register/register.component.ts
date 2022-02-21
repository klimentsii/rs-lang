import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit {

  email: string;

  password: string;
  password2: string;

  constructor() {
    this.email = "";
    this.password = "";
    this.password2 = "";
  }

  ngOnInit(): void {
    // empty
  }

  async createUser(user: object) {
    const arr = document.querySelectorAll("input.auth-input");

    if (arr[0].getAttribute("ng-reflect-model")!.length < 1) {
      document.querySelector(".auth")?.append(this.createError("Please enter your email"));
    } else if(String(arr[0].getAttribute("ng-reflect-model")).indexOf("@") < 0) {
      document.querySelector(".auth")?.append(this.createError("Please add @ in your email"));
    } else if(String(arr[0].getAttribute("ng-reflect-model")).indexOf(".") < 0) {
      document.querySelector(".auth")?.append(this.createError("Please add . in your email"));
    } else if (arr[1].getAttribute("ng-reflect-model")!.length < 8) {
      document.querySelector(".auth")?.append(this.createError("Please enter your password(min 8 symbols)"));
    }  else if (arr[1].getAttribute("ng-reflect-model") !== arr[2].getAttribute("ng-reflect-model")) {
      document.querySelector(".auth")?.append(this.createError("Password must be the same"));
    } else {
      const rawResponse = await fetch("https://app-name-rslang.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (rawResponse.status === 417) {
        document.querySelector(".auth")?.append(this.createMessage("This mail alredy registered"));
      } else if(rawResponse.status === 422) {
        document.querySelector(".auth")?.append(this.createError("Email entered incorrectly"));
      } else {
        document.querySelector(".auth")?.append(this.createMessage("Registered"));
        return rawResponse;
      }
    }

    return false;
  }

  createError(text: string) {
    const el = document.createElement("div");
    el.classList.add("auth-error");
    el.textContent = text;
    el.setAttribute("style", `
      border: 1px #F06171 solid; background-color: #4d010152; color: #F06171; padding: 10px 20px;
      margin: 10px; left: 0; border-radius: 10px; font-size: 24px; transition: all 0.5s
    `);
    this.more3();
    return el;
  }

  createMessage(text: string) {
    const el = document.createElement("div");
    el.classList.add("auth-error");
    el.textContent = text;
    el.setAttribute("style", `
      border: 1px #4FEE97 solid; background-color: #4d010152; color: #4FEE97; padding: 10px 20px;
      margin: 10px; left: 0; border-radius: 10px; font-size: 24px; transition: all 0.5s
    `);
    this.more3();
    return el;
  }

  more3() {
    if (Number(document.querySelector(".auth")?.childElementCount) > 5) {
      document.querySelector(".auth")?.children[1].remove();
    }
  }
}
