import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Location } from "@angular/common";

const MAX_WORDS = 5;

const MAX_DATA = 20;
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

export class GameAudioCallComponent {
  @ViewChild("image") image!: ElementRef;

  db: any;

  audio!: string;

  trueWord!: string;

  wordTranslate!: string;

  trueImage!: string;

  arrWords!: string[];

  nextBtn = "Не знаю";

  showEl = false;

  rand!: number;

  constructor(private _location: Location) {
    try {
      this.getDb();
      this.randomWord();
      this.audioPlay();
      this.randomize();
    }

    catch (err) {
      if (this.db === null || undefined) this._location.back();
    }
  }

  getDb() {
    this.db = JSON.parse(localStorage.getItem("db") as any);

    localStorage.clear();
  }

  writeWords() {
    return this.arrWords;
  }

  audioPlay() {
    const audio = new Audio(`https://react-learnwords-example.herokuapp.com/${this.audio}`);
    audio.play();
  }

  randomWord(): void {
    const r = Math.floor(Math.random() * MAX_DATA);

    for (let i = 0; i < this.db.length; i += 1) {
      const data = this.db[r];
      this.trueWord = data.word;
      this.audio = data.audio;
      this.wordTranslate = data.wordTranslate;
      this.trueImage = data.image;
    }
  }

  randomize() {
    this.rand = Math.floor(Math.random() * MAX_WORDS);
    this.arrWords = this.db.map((v: { wordTranslate: string; }) => v.wordTranslate).slice(0, MAX_WORDS);

    this.arrWords[this.rand] = this.wordTranslate;
    return this.arrWords;
  }

  nextWords(img: HTMLImageElement, imgVolume: HTMLImageElement): void {
    img.src = `https://react-learnwords-example.herokuapp.com/${this.trueImage}`;
    img.classList.remove("hide");
    img.classList.add("show");
    imgVolume.classList.add("small-image");

    this.showEl = true;
    this.nextBtn = "Дальше";
  }

  showTrueWord(e: Event) {
    if ((e.target as HTMLElement).textContent === this.wordTranslate) {
      (e.target as HTMLElement).style.backgroundColor = 'green'
      console.log('good');
    } else {
      (e.target as HTMLElement).style.backgroundColor = 'red'
      console.log('bad');

    }
  }
}
