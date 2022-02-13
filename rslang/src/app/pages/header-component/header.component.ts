import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  styles: [":host {width: 100%}"]
})

export class HeaderComponent {

  titleLinks: string[] = ["Мини-игры", "Учебник", "Статистика", "Вход"];

  links: string[] = ["/games", "/book", "/statistics", ""];

  constructor() {
    // empty
  }
}
