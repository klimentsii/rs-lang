import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-statistics-page",
  templateUrl: "./statistics-page.component.html",
  styleUrls: ["./statistics-page.component.css"]
})
export class StatisticsPageComponent implements OnInit {
  obj = JSON.parse(localStorage.getItem("obj") as string);
  titleGames: string[] = ["спринт", "аудиовызов"];
  resInfo: string[] = ["слов изучено", "правильных ответов"];
  wordsLearned: number[] = [0, 0];
  procentTrueWords: number[] = [0, 0];
  maxCombo: number[] = [0, 0];
  overallResults: string[] = ["0", "0"];

  ngOnInit(): void {
    this.getResultsSprint();
    this.getResultsAudioCall();
    this.getResultsOverall();
    this.clearLocalStorage();
  }

  getResultsSprint(): void {
    this.wordsLearned[0] = this.obj.sprint.countTrueWords;
    this.procentTrueWords[0] = this.obj.sprint.procentTrueWords;
    this.maxCombo[0] = this.obj.sprint.maxCombo;
  }

  getResultsAudioCall(): void {
    this.wordsLearned[1] = this.obj.audiocall.countTrueWords;
    this.procentTrueWords[1] = this.obj.audiocall.procentTrueWords;
    this.maxCombo[1] = this.obj.audiocall.maxCombo;
  }

  getResultsOverall(): void {
    this.obj.overall.countTrueWords = this.obj.sprint.countTrueWords + this.obj.audiocall.countTrueWords;
    this.obj.overall.countFalseWords = this.obj.sprint.countFalseWords + this.obj.audiocall.countFalseWords;
    this.obj.overall.countAllWords = this.obj.overall.countTrueWords + this.obj.overall.countFalseWords;

    if (this.obj.overall.countTrueWords !== 0 && this.obj.overall.countAllWords !== 0)
      this.obj.overall.procentTrueWords = Math.round(this.obj.overall.countTrueWords / this.obj.overall.countAllWords * 100);

    this.overallResults[0] = this.obj.overall.countTrueWords;
    this.overallResults[1] = this.obj.overall.procentTrueWords + "%";

    localStorage.setItem("obj", JSON.stringify(this.obj));
  }

  clearLocalStorage() {
    const date = new Date();
    if (date.getHours() === 0) localStorage.removeItem("obj");
  }
}
