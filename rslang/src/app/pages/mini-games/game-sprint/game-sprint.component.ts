import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";


import { dataBase } from "../../../interfaces/interfaces";
import { URL, MAX_DATA, LAST_PAGE, randN, elseRandN } from "../../../constants/constants";

const TEN_POINTS = 10;

const MAX_AMOUNT_FOR_BONUS = 3;

const MIN_BONUS = 1;

const ZEROING = 0;

const ONE_SEC = 1;

@Component({
  selector: "app-game-sprint",
  templateUrl: "./game-sprint.component.html",
  styleUrls: ["./game-sprint.component.css"]
})

export class GameSprintComponent implements OnInit {

  db: dataBase = [];
  word!: string;
  wordTranslate!: string;
  page!: number;
  group?: number;

  points = ZEROING;
  combo = ZEROING;

  timeOut = 60;
  saveCombo = MIN_BONUS;

  r1!: number;
  r2!: number;
  calcSumm!: number;

  showPopup?: boolean = false;
  showSum?: boolean = false;

  falseResultsWord: string[] = [];
  falseResultsWordTranslate: string[] = [];

  trueResultsWord: string[] = [];
  trueResultsWordTranslate: string[] = [];

  fiftyProc?: boolean;
  arrRandNumbers: number[] = [];

  arrMaxCombo: number[] = [];
  maxCombo = 1;

  obj = JSON.parse(localStorage.getItem("obj") as string);

  constructor(protected _location: Location) {
  }

  async ngOnInit(): Promise<void> {
    await this.notFoundDb();
    this.getDb();
  }

  async notFoundDb(): Promise<void> {
    if (JSON.parse(localStorage.getItem("db") as string) === null) {
      this.db = await fetch(`${URL}words?page=${0}&group=${0}`)
        .then(response => response.json())
        .then(data => data);
      localStorage.setItem("db", JSON.stringify(this.db));
    }
  }

  getDb(): void {
    this.db = JSON.parse(localStorage.getItem("db") as string);

    if (this.db) {
      this.assignDataWords();
      this.timeOfGame();
    }
  }

  assignDataWords(): void {
    this.r1 = randN();
    this.r2 = elseRandN();

    this.fiftyProc = this.fiftyFifty();

    switch (this.fiftyFifty()) {
      case (true):
        this.r1 = this.r2;
        break;
      case (false):
        this.r1 = randN();
        this.r2 = elseRandN();
        break;
    }
    this.deleteDupl();

    this.word = this.db[this.r1].word;
    this.wordTranslate = this.db[this.r2].wordTranslate;

    this.keysPress();
  }

  deleteDupl(): void {
    if (this.arrRandNumbers.indexOf(this.r1) === -1) {
      this.arrRandNumbers.push(this.r1);
    } else if (this.arrRandNumbers.length < MAX_DATA) {
      while (this.arrRandNumbers.indexOf(this.r1) !== -1) {
        this.r1 = randN();
      }
      this.arrRandNumbers.push(this.r1);
    }
    if (this.arrRandNumbers.length === MAX_DATA) {
      this.page = this.db[this.r1].page;
      this.group = this.db[this.r1].group;
      this.arrRandNumbers = [];
      this.newBd();
    }
  }

  async newBd(): Promise<void> {
    if (this.page === ZEROING) this.page = LAST_PAGE;
    this.page -= 1;
    this.db = await fetch(`${URL}words?page=${this.page}&group=${this.group}`)
      .then(response => response.json())
      .then(data => data);
  }

  fiftyFifty(): boolean {
    return Math.random() < 0.5;
  }

  saveTrueWords(): void {
    this.trueResultsWord.push(this.word);
    this.trueResultsWordTranslate.push(this.db[this.r1].wordTranslate);
  }

  saveFalseWords(): void {
    this.falseResultsWord.push(this.word);
    this.falseResultsWordTranslate.push(this.db[this.r1].wordTranslate);
  }

  trueAnswer(): void {
    const circle = document.querySelectorAll(".circle");
    this.showSum = true;

    if (this.combo === MAX_AMOUNT_FOR_BONUS) {
      this.combo = ZEROING;
      circle.forEach((v => v.classList.remove("green-coloring")));
    }

    if (this.r1 === this.r2) {
      circle[this.combo].classList.add("green-coloring");
      this.calcPoints();
      if (circle[2].classList.contains("green-coloring")) {
        this.saveCombo += MIN_BONUS;
        this.arrMaxCombo.push(this.saveCombo);
      }
      this.soundTrue();
      this.saveTrueWords();
    } else {
      this.soundFalse();
      this.saveFalseWords();
      this.resetCombo();
      circle[this.combo].classList.remove("green-coloring");
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
      circle[this.combo].classList.add("green-coloring");
      this.calcPoints();
      if (circle[2].classList.contains("green-coloring")) {
        this.saveCombo += MIN_BONUS;
        this.arrMaxCombo.push(this.saveCombo);
      }
      this.soundTrue();
      this.saveTrueWords();
    } else {
      this.soundFalse();
      this.saveFalseWords();
      this.resetCombo();
      circle[this.combo].classList.remove("green-coloring");
    }
    this.assignDataWords();
  }

  calcPoints(): void {
    this.calcSumm = TEN_POINTS;
    this.calcSumm = TEN_POINTS * this.saveCombo;
    this.points += this.calcSumm;
    this.combo += MIN_BONUS;
  }

  resetCombo(): void {
    this.combo -= MIN_BONUS;

    if (this.combo < ZEROING) this.combo = ZEROING;

    if (this.combo === ZEROING) {
      this.saveCombo -= MIN_BONUS;
      this.calcSumm -= TEN_POINTS;
    }

    if (this.saveCombo === ZEROING) this.saveCombo = MIN_BONUS;

    this.calcSumm = ZEROING;
  }

  timeOfGame(): void {
    const int = setInterval(() => {
      this.timeOut -= ONE_SEC;
      if (this.timeOut === ZEROING) {
        clearInterval(int);
        this.showPopup = true;
        this.saveResToLocalStorage();
      }
    }, 1000);

  }

  saveResToLocalStorage(): void {
    if (this.arrMaxCombo.length > ZEROING)
      this.maxCombo = Math.max(...this.arrMaxCombo);
    if (this.showPopup === true) {
      this.obj.sprint.countTrueWords += this.trueResultsWord.length;
      this.obj.sprint.countFalseWords += this.falseResultsWord.length;

      if (this.maxCombo > this.obj.sprint.maxCombo) this.obj.sprint.maxCombo = this.maxCombo;

      const allWords = this.obj.sprint.countTrueWords + this.obj.sprint.countFalseWords;

      if (this.obj.sprint.countTrueWords !== 0 && allWords !== 0)
        this.obj.sprint.procentTrueWords = Math.round(this.obj.sprint.countTrueWords / allWords * 100);
      localStorage.setItem("obj", JSON.stringify(this.obj));
    }
  }

  keysPress(): void {
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

  soundTrue(): void {
    const audio = new Audio(`./assets/audio/${true}-music.mp3`);
    if (localStorage.getItem("volume") !== "off") audio.play();
  }

  soundFalse(): void {
    const audio = new Audio(`./assets/audio/${false}-music.mp3`);
    if (localStorage.getItem("volume") !== "off") audio.play();
  }

  ngOnDestroy(): void {
    document.onkeyup = (e) => e.preventDefault();
  }
}
