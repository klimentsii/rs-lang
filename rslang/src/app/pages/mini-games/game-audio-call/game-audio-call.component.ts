import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Location } from "@angular/common";

import { dataBase } from "../../../interfaces/interfaces";
import { URL, MAX_WORDS, MAX_DATA, LAST_PAGE, FIRST_PAGE } from "../../../constants/constants";

@Component({
  selector: "app-game-audio-call",
  templateUrl: "./game-audio-call.component.html",
  styleUrls: ["./game-audio-call.component.css"]
})

export class GameAudioCallComponent implements OnInit {
  @ViewChild("image") image!: ElementRef;

  db!: dataBase;

  secDb!: dataBase;

  audio!: string;

  trueWord!: string;

  wordTranslate!: string;

  trueImage!: string;

  arrWords: string[] = [];

  nextBtn = "Не знаю";

  showEl = false;

  rand!: number;

  red = false;

  group!: number;

  page!: number;

  audioTrue!: string;

  audioFalse!: string;

  answer = false;

  countWords = 0;

  btnWord!: HTMLElement;

  resultWordsOnPage!: string[];

  r!: number;

  countSecWords = 0;

  countsTrueTranslatedWords: string[] = [];

  countsTrueEngWords: string[] = [];

  countsOfUnansweredWords: string[] = [];

  countsOfUnansweredTransWords: string[] = [];

  showPopup = false;

  voiceAudio!: HTMLAudioElement;

  constructor(protected _location: Location) {

  }

  ngOnInit(): void {
    this.getDb();
  }

  getDb(): void {
    this.db = JSON.parse(localStorage.getItem("db") as string);

    if (this.db === null || undefined) this._location.back();

    localStorage.clear();


    if (this.db) {
      this.randomWord();
      this.randomize();
      this.getSecondDb();
      this.audioPlay();
    }

  }

  async getSecondDb(): Promise<void> {
    this.page -= 1;
    if (this.page < FIRST_PAGE) this.page = LAST_PAGE;

    this.secDb = await fetch(`${URL}words?page=${this.page}`)
      .then(response => response.json())
      .then(data => data);
  }

  audioPlay(): void {
    if (this.showPopup !== true) {
      this.voiceAudio = new Audio(`${URL}${this.audio}`);
      this.voiceAudio.play();
    }
  }

  randomWord(): void {
    this.r = Math.floor(Math.random() * MAX_DATA);

    for (let i = 0; i < this.db.length; i += 1) {
      let data = this.db[this.r];
      if (this.countWords === MAX_DATA) {
        data = this.secDb[this.r];
      }
      this.page = data.page;
      this.trueWord = data.word;
      this.audio = data.audio;
      this.wordTranslate = data.wordTranslate;
      this.trueImage = data.image;
    }
  }

  async randomize(): Promise<void> {
    this.rand = Math.floor(Math.random() * MAX_WORDS);
    this.arrWords = this.db.map((v) => v.wordTranslate).splice(this.countWords, MAX_WORDS);

    if (this.countWords <= MAX_DATA - MAX_WORDS) {
      this.countWords += MAX_WORDS;

    } else if (this.countWords === MAX_DATA && this.countSecWords <= MAX_DATA - MAX_WORDS) {
      this.arrWords = this.secDb.map((v: { wordTranslate: string; }) => v.wordTranslate).splice(this.countSecWords, MAX_WORDS);
      this.countSecWords += MAX_WORDS;

    } else if (this.countSecWords === MAX_DATA) {
      this.showPopup = true;
    }

    this.arrWords[this.rand] = this.wordTranslate;

    this.resultWordsOnPage = this.arrWords.filter((v, i, arr) => arr.indexOf(v) === i);

    if (this.secDb === undefined) {
      this.secDb = await fetch(`${URL}words?page=${this.page}`)
        .then(response => response.json())
        .then(data => data);
    }

    if (this.resultWordsOnPage.length < MAX_WORDS) this.resultWordsOnPage.push(this.secDb[this.r].wordTranslate);
  }

  nextWords(img: HTMLImageElement, imgVolume: HTMLImageElement): void {
    const audio = new Audio(`./assets/audio/${this.answer}-music.mp3`);
    img.src = `${URL}${this.trueImage}`;
    img.classList.remove("hide");
    img.classList.add("show");
    imgVolume.classList.add("small-image");
    this.showOrHideEl(img, imgVolume, audio);
  }

  showTrueWord(e: Event): void {
    this.btnWord = e.target as HTMLElement;

    if (this.btnWord.textContent === this.wordTranslate) {
      this.countsTrueTranslatedWords.push(this.btnWord.textContent);
      this.countsTrueEngWords.push(this.trueWord);

      this.btnWord.classList.add("green-bg");
      this.answer = true;
    } else {
      this.btnWord.classList.add("red-bg");
      this.answer = false;
    }
  }

  setResultsPopup(): void {
    this.countsOfUnansweredWords.push(this.trueWord);
    this.countsOfUnansweredTransWords.push(this.wordTranslate);
  }

  removeStyles(): void {
    if (this.btnWord) {
      this.btnWord.classList.remove("green-bg");
      this.btnWord.classList.remove("red-bg");
    }
  }

  showOrHideEl(img: HTMLImageElement, imgVolume: HTMLImageElement, aud: HTMLAudioElement): void {
    if (this.showEl === true) {
      this.randomWord();
      this.randomize();
      this.audioPlay();
      this.removeStyles();

      this.showEl = false;

      imgVolume.classList.remove("small-image");
      img.style.display = "none";

      this.nextBtn = "Не знаю";

    } else {
      if (this.answer === false) {
        this.setResultsPopup();
      }
      aud.play();
      this.showEl = true;
      img.style.display = "block";
      this.nextBtn = "Дальше";
      this.answer = false;
    }
  }
}
