import { Component, OnInit } from "@angular/core";

const obj = JSON.parse(localStorage.getItem("count-words-sprint") as string);

@Component({
  selector: "app-statistics-page",
  templateUrl: "./statistics-page.component.html",
  styleUrls: ["./statistics-page.component.css"]
})
export class StatisticsPageComponent implements OnInit {
  titleGames: string[] = ["sprint", "audio-call"];
  resInfo: string[] = ["слов изучено", "правильных ответов"];
  wordsLearned: number[] = [0, 0];
  procentTrueWords: number[] = [0, 0];
  maxCombo: number[] = [1, 1];

  ngOnInit(): void {
    this.getResults();
  }

  getResults(): void {
    this.wordsLearned[0] = obj.countTrueWords;
    this.procentTrueWords[0] = obj.procentTrueWords;
    this.maxCombo[0] = obj.maxCombo;
  }
}
