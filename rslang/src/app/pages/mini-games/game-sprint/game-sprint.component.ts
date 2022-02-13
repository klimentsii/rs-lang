import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";


import { dataBase } from "../../../interfaces/interfaces";
import { URL, MAX_WORDS, MAX_DATA, LAST_PAGE, FIRST_PAGE, randN, elseRandN } from "../../../constants/constants";

@Component({
  selector: "app-game-sprint",
  templateUrl: "./game-sprint.component.html",
  styleUrls: ["./game-sprint.component.css"]
})
export class GameSprintComponent implements OnInit {

  db: dataBase = [];

  word!: string;

  wordTranslate!: string;

  points: number = 0;

  bonus: number = 0;

  timeOut: number = 5;

  r1!: number;
  r2!: number;

  constructor(protected _location: Location) { }

  ngOnInit(): void {
    this.getDb();
  }

  getDb(): void {
    this.db = JSON.parse(localStorage.getItem("db") as string);

    localStorage.clear();

    if (this.db) {
      this.assignDataWords();
      this.timeOfGame();
    } else {
      this._location.back();
    }
  }

  assignDataWords() {
    this.r1 = randN();
    this.r2 = elseRandN();

    this.word = this.db[this.r1].word;
    this.wordTranslate = this.db[this.r2].wordTranslate;

    console.log(`${this.r1}  ${this.r2}`);
  }

  trueAnswer() {
    if (this.r1 === this.r2) {
      this.points += 10;
      this.bonus += 1;
    } else {
      this.bonus = 0;
    }

    if (this.bonus >= 3) {
      this.points += 20;
    }
    this.assignDataWords();
  }

  wrongAnswer() {
    if (this.r1 !== this.r2) {
      this.points += 10;
      this.bonus += 1;
    } else {
      this.bonus = 0;
    }

    if (this.bonus >= 3) {
      this.points += 20;
    }
    this.assignDataWords();
  }

  timeOfGame() {
    const int = setInterval(() => {
      this.timeOut -= 1;
      if (this.timeOut === 0) {
        clearInterval(int);
        alert("geme over")
      }
    }, 1000);
  }
}
