import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {

  email: string;

  password: string;

  constructor() {
    this.email = "";
    this.password = "";
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

    if (rawResponse.status === 404) {
      document.querySelector(".auth")?.append(this.createError("Not found"));
      return false;
    } else if(rawResponse.status === 403) {
      document.querySelector(".auth")?.append(this.createError("Forbidden"));
      return false;
    } else {
      const content = await rawResponse.json();
      localStorage.setItem("token", content.token);
      document.querySelector(".auth")?.append(this.createMessage("Authorized"));
      return content;
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

  createMessage(text: string) {
    const el = document.createElement("div");
    el.classList.add("auth-error");
    el.textContent = text;
    el.setAttribute("style", `
      border: 1px #4FEE97 solid; background-color: #4d010152; color: #4FEE97; padding: 10px 20px;
      margin: 10px; left: 0; border-radius: 10px; font-size: 24px; transition: all 0.5s
    `);
    return el;
  }
}
