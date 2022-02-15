import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  styles: [":host {width: 100%}"]
})

export class HeaderComponent {
  gamesTitle = "Мини-игры";

  logInTitle = "Вход";

  bookTitle = "Учебник";

  statisticsTitle = "Статистика";

  dictionaryTitle = "Словарь";

  constructor() {
    // empty
  }
}
