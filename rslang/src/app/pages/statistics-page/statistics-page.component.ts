import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-statistics-page",
  templateUrl: "./statistics-page.component.html",
  styleUrls: ["./statistics-page.component.css"]
})
export class StatisticsPageComponent implements OnInit {
  titleGames: string[] = ["sprint", "audio-call"];
  resInfo: string[] = ["слов изучено", "правильных ответов"];

  ngOnInit(): void {
    //
  }

}
