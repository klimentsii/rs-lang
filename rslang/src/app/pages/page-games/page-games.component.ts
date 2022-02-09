import { Component } from "@angular/core";

@Component({
  selector: "app-page-games",
  templateUrl: "./page-games.component.html",
  styleUrls: ["./page-games.component.css"]
})
export class PageGamesComponent {
  items: string[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

}
