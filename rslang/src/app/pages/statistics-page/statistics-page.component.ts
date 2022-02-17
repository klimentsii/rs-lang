import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-statistics-page",
  templateUrl: "./statistics-page.component.html",
  styleUrls: ["./statistics-page.component.css"]
})
export class StatisticsPageComponent implements OnInit {
  titleGames: string[] = ["Sprint", "Audio-call"];
  resInfo: string[] = ["Слов изучено", "Правильных ответов"];
  constructor() { }

  ngOnInit(): void {
  }

}
