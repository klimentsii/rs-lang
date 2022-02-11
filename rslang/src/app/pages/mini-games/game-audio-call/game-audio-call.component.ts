import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Location } from "@angular/common";

const MAX_WORDS = 5;

const MAX_DATA = 20;

const URL = "https://react-learnwords-example.herokuapp.com/";
@Component({
  selector: "app-game-audio-call",
  templateUrl: "./game-audio-call.component.html",
  styleUrls: ["./game-audio-call.component.css"]
})

// interface IDb {
//   id: string,
//   group: number,
//   page: number,
//   word: string,
//   image: string,
//   audio: string,
//   audioMeaning: string,
//   audioExample: string,
//   textMeaning: string,
//   textExample: string,
//   transcription: string,
//   textExampleTranslate: string,
//   textMeaningTranslate: string,
//   wordTranslate: string
// }

export class GameAudioCallComponent implements OnInit {
  @ViewChild("image") image!: ElementRef;

  db: any;

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

  audioTrue?: string;

  audioFalse?: string;

  answer?: boolean = false;

  countWords = 0;

  btnWord!: HTMLElement;

  resultWordsOnPage!: string[];

  secDb: any;

  r!: number;

  countSecWords = 0;

  constructor(private _location: Location, private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    try {
      this.getDb();
      this.randomWord();
      this.audioPlay();
      this.randomize();
      this.getSecondDb();
    }

    catch (err) {
      if (this.db === null || undefined) this._location.back();
    }
  }

  getDb() {
    this.db = JSON.parse(localStorage.getItem("db") as any);

    localStorage.clear();
  }

  async getSecondDb() {
    this.secDb = await fetch(`${URL}words?page=${this.page -= 1}`)
      .then(response => response.json())
      .then(data => data);
  }

  audioPlay() {
    const voiceAudio = new Audio(`${URL}${this.audio}`);
    voiceAudio.play();
  }

  randomWord(): void {
    this.r = Math.floor(Math.random() * MAX_DATA);

    for (let i = 0; i < this.db.length; i += 1) {
      const data = this.db[this.r];
      this.page = data.page;
      this.group = data.group;
      this.trueWord = data.word;
      this.audio = data.audio;
      this.wordTranslate = data.wordTranslate;
      this.trueImage = data.image;
      this.audioTrue = data.audioMeaning;
      this.audioFalse = data.audioExample;
    }

  }

  randomize() {
    this.rand = Math.floor(Math.random() * MAX_WORDS);
    this.arrWords = this.db.map((v: { wordTranslate: string; }) => v.wordTranslate).splice(this.countWords, MAX_WORDS);

    this.arrWords[this.rand] = this.wordTranslate;

    if (this.countWords <= MAX_DATA - 5) {
      this.countWords += MAX_WORDS;

    } else if (this.countWords >= MAX_DATA && this.countWords <= MAX_DATA * 2 - MAX_WORDS) {
      this.arrWords = this.secDb.map((v: { wordTranslate: string; }) => { v.wordTranslate }).splice(this.countSecWords, MAX_WORDS);
      this.countSecWords += MAX_WORDS;
      console.log(this.arrWords);
    }

    this.resultWordsOnPage = this.arrWords.filter((v, i, arr) => arr.indexOf(v) === i);

    if (this.resultWordsOnPage.length === MAX_WORDS - 1) {
      this.resultWordsOnPage.unshift(this.secDb[this.r].wordTranslate);
    }

  }

  nextWords(img: HTMLImageElement, imgVolume: HTMLImageElement) {
    const audio = new Audio(`./assets/audio/${this.answer}-music.mp3`);
    img.src = `${URL}${this.trueImage}`;
    img.classList.remove("hide");
    img.classList.add("show");
    imgVolume.classList.add("small-image");

    if (this.showEl === true) {
      imgVolume.classList.remove("small-image");
      this.randomWord();
      this.randomize();
      this.showEl = false;
      img.style.display = "none";
      this.audioPlay();
      this.nextBtn = "Не знаю";

      if (this.btnWord.classList.contains("green-bg")) {
        this.btnWord.classList.remove("green-bg");
      }
      if (this.btnWord.classList.contains("red-bg")) {
        this.btnWord.classList.remove("red-bg");
      }

    } else {
      audio.play();
      this.showEl = true;
      img.style.display = "block";
      this.nextBtn = "Дальше";
    }
  }

  showTrueWord(e: Event) {
    this.btnWord = e.target as HTMLElement;
    if (this.btnWord.textContent === this.wordTranslate) {
      this.btnWord.classList.add("green-bg");
      this.answer = true;
    } else {
      this.answer = false;
      this.btnWord.classList.add("red-bg");
    }
  }
}
