import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";


import { dataBase } from "../../../interfaces/interfaces";
import { URL, MAX_WORDS, MAX_DATA, LAST_PAGE, FIRST_PAGE, randN, elseRandN } from "../../../constants/constants";

const TEN_POINTS = 10;

const MAX_AMOUNT_FOR_BONUS = 3;

const MIN_BONUS = 1;

const ZEROING = 0;

const ONE_SEC = 1;

const MAX_SEC_OF_TIMER = 9999;


@Component({
  selector: "app-game-sprint",
  templateUrl: "./game-sprint.component.html",
  styleUrls: ["./game-sprint.component.css"]
})

export class GameSprintComponent implements OnInit {

  db: dataBase = [];

  word!: string;

  wordTranslate!: string;

  points = ZEROING;

  bonus = ZEROING;

  timeOut = MAX_SEC_OF_TIMER;

  combo = ZEROING;

  r1!: number;

  r2!: number;

  saveCombo = MIN_BONUS;

  showPopup?: boolean = false;

  calcSumm!: number;

  showSum?: boolean = false;

  falseResultsWord: string[] = [];
  falseResultsWordTranslate: string[] = [];

  trueResultsWord: string[] = [];
  trueResultsWordTranslate: string[] = [];

  fiftyProc?: boolean;

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


    this.fiftyProc = this.fiftyFifty();

    // if (this.fiftyProc === true) {
    //   this.r1 = this.r2;
    // } else {
    //   this.r1 = randN();
    //   this.r2 = elseRandN();
    // }

    switch (this.fiftyFifty()) {
      case (true):
        this.r1 = this.r2;
        break;
      case (false):
        this.r1 = randN();
        this.r2 = elseRandN();
        break;
    }

    this.word = this.db[this.r1].word;
    this.wordTranslate = this.db[this.r2].wordTranslate;

    console.log(`${this.r1}  ${this.r2}`);

    this.keysPress();
  }

  fiftyFifty() {
    return Math.random() < 0.5;
  }

  trueAnswer(): void {
    const circle = document.querySelectorAll(".circle");
    this.showSum = true;

    if (this.combo === MAX_AMOUNT_FOR_BONUS) {
      this.combo = ZEROING;
      circle.forEach((v => v.classList.remove("green-coloring")));
    }


    if (this.r1 === this.r2) {
      this.soundTrue();
      this.calcSumm = TEN_POINTS;
      circle[this.combo].classList.add("green-coloring");

      this.calcSumm = TEN_POINTS * this.saveCombo;
      if (circle[2].classList.contains("green-coloring")) {
        this.saveCombo += MIN_BONUS;
      }
      this.points += this.calcSumm;
      this.bonus += MIN_BONUS;
      this.combo += MIN_BONUS;

      this.trueResultsWord.push(this.word);
      this.trueResultsWordTranslate.push(this.db[this.r1].wordTranslate);
    } else {
      this.soundFalse();
      this.falseResultsWord.push(this.word);
      this.falseResultsWordTranslate.push(this.db[this.r1].wordTranslate);
      this.bonus = ZEROING;
      this.combo -= MIN_BONUS;
      if (this.combo < ZEROING) this.combo = ZEROING;
      circle[this.combo].classList.remove("green-coloring");
      if (this.combo === ZEROING) {
        this.saveCombo -= MIN_BONUS;
        this.calcSumm -= TEN_POINTS;
      }
      if (this.saveCombo === ZEROING) {
        this.saveCombo = MIN_BONUS;
        this.calcSumm = ZEROING;
      }
      this.calcSumm = ZEROING;

    }

    this.assignDataWords();
  }

  falseAnswer(): void {
    const circle = document.querySelectorAll(".circle");
    this.showSum = true;

    if (this.combo === MAX_AMOUNT_FOR_BONUS) {
      this.combo = ZEROING;
      circle.forEach((v => v.classList.remove("green-coloring")));
    }

    if (this.r1 !== this.r2) {
      this.soundTrue();

      circle[this.combo].classList.add("green-coloring");


      this.calcSumm = TEN_POINTS * this.saveCombo;
      if (circle[2].classList.contains("green-coloring")) {
        this.saveCombo += MIN_BONUS;
      }
      this.points += this.calcSumm;

      this.bonus += MIN_BONUS;
      this.combo += MIN_BONUS;
      this.trueResultsWord.push(this.word);
      this.trueResultsWordTranslate.push(this.db[this.r1].wordTranslate);
    } else {
      this.soundFalse();
      this.falseResultsWord.push(this.word);
      this.falseResultsWordTranslate.push(this.db[this.r1].wordTranslate);
      this.bonus = ZEROING;
      this.combo -= MIN_BONUS;
      if (this.combo < ZEROING) this.combo = ZEROING;
      circle[this.combo].classList.remove("green-coloring");
      if (this.combo === ZEROING) {
        this.saveCombo -= MIN_BONUS;
        this.calcSumm -= TEN_POINTS;
      }
      if (this.saveCombo === ZEROING) {
        this.saveCombo = MIN_BONUS;
      }
      this.calcSumm = ZEROING;

    }
    this.assignDataWords();
  }

  timeOfGame() {
    const int = setInterval(() => {
      this.timeOut -= ONE_SEC;
      if (this.timeOut === ZEROING) {
        clearInterval(int);
        this.showPopup = true;
      }
    }, ONE_SEC * 1000);
  }

  keysPress() {
    document.onkeyup = (e) => {
      if (this.showPopup === false) {
        switch (e.key) {
          case ("ArrowLeft"):
            this.falseAnswer();
            break;
          case ("ArrowRight"):
            this.trueAnswer();
            break;
        }
      }
    };
  }

  soundTrue() {
    const audio = new Audio(`./assets/audio/${true}-music.mp3`);
    audio.play();
  }

  soundFalse() {
    const audio = new Audio(`./assets/audio/${false}-music.mp3`);
    audio.play();
  }
}
