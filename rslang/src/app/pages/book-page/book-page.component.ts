import { Component, OnInit } from "@angular/core";
import { dataBase } from "../../interfaces/interfaces";
import { URL, LAST_PAGE, LAST_PAGE_ON_PAGINATION, FIRST_PAGE } from "src/app/constants/constants";

const FIRST_GROUP = "0";

const FIRST_WORD = "0";

const MAX_WORDS = 6;

const SECOND_PAGE = 1;

// interface Word {
//   userId: string,
//   wordId: string,
//   word: object
// }

@Component({
  selector: "app-book-page",
  templateUrl: "./book-page.component.html",
  styleUrls: ["./book-page.component.css"]
})

export class BookPageComponent implements OnInit {

  titleCard: string[] = ["Спринт", "Аудиовызов"];

  pathPictures: string[] = ["time", "hear"];

  linksOfGames: string[] = ["/games/sprint", "/games/audio-call"];

  db: dataBase = [];
  token: string;

  page: number;
  pages: Array<number> = [];
  word: number;
  hard: Array<Array<string | number>>;
  green: Array<string>;

  levels: Array<string> = ["A1", "A2", "B1", "B2", "C1", "C2", "Словарь"];
  counts: Array<string> = ["1-600", "601-1200", "1201-1800", "1801-2400", "2401-3000", "3001-3600"];

  constructor() {

    if (!localStorage.getItem("page")) localStorage.setItem("page", String(FIRST_PAGE));
    this.page = Number(localStorage.getItem("page")) + 1;

    if (!localStorage.getItem("pages")) localStorage.setItem("pages", JSON.stringify([LAST_PAGE_ON_PAGINATION, SECOND_PAGE, 2]));
    this.pages = JSON.parse(localStorage.getItem("pages")!);

    if (!localStorage.getItem("group")) localStorage.setItem("group", FIRST_GROUP);

    this.token = "";
    if (localStorage.getItem("token")) this.token = String(localStorage.getItem("token"));

    if (!localStorage.getItem("word")) localStorage.setItem("word", FIRST_WORD);
    this.word = Number(localStorage.getItem("word"));

    if (!localStorage.getItem("hard")) localStorage.setItem("hard", "[]");
    this.hard = JSON.parse(localStorage.getItem("hard")!);

    if (!localStorage.getItem("green")) localStorage.setItem("green", "[]");
    this.green = JSON.parse(localStorage.getItem("green")!);

    // this.createUserWord({
    //   userId: "5ec993df4ca9d600178740ae",
    //   wordId: "5e9f5ee35eb9e72bc21af716",
    //   word: { "difficulty": "weak", "optional": {testFieldString: "test", testFieldBoolean: true} }
    // });
  }

  ngOnInit(): void {
    // empty
  }

  ngAfterContentInit(): void {
    this.importWord(Number(localStorage.getItem("group")));

    if (localStorage.getItem("auth") === "") document.querySelector(".word-info-button")?.classList.add("hidden");
  }

  ngAfterViewInit(): void {
    this.gg();
  }

  gg() {
    document.querySelectorAll(".word-item").forEach(e =>
      this.hard.map(g => g[0]).indexOf(String(e.getElementsByClassName("word-item-word")[0].textContent)) > -1
    ? e.classList.add("hard")
    : e);

    document.querySelectorAll(".word-item").forEach(e => this.green.indexOf(String(e.getElementsByClassName("word-item-word")[0].textContent)) > -1 ? e.classList.add("green") : e);
  }

  // async createUserWord({ userId, wordId, word }: Word) {
  //   const rawResponse = await fetch(`https://app-name-rslang.com/users/${userId}/words/${wordId}`, {
  //     method: "POST",
  //     // withCredentials: true,
  //     headers: {
  //       "Authorization": `Bearer ${this.token}`,
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(word)
  //   });
  //   const content = await rawResponse.json();

  //   console.log(content);
  // }

  async importWord(i: number) {
    if (i < MAX_WORDS) {
      this.db = await fetch(`${URL}words?page=${this.page - SECOND_PAGE}&group=${i}`)
      .then(response => response.json())
      .then(data => data);

      document.querySelector(".word-pagination")?.setAttribute("style", "display: flex;");
      document.querySelector(".box-about-project-inner")?.setAttribute("style", "display: flex;");
    } else {
      // document.querySelector(".word-list")!.innerHTML = "";
      this.hard.map(async e => {
        const word = await fetch(`${URL}words?page=${e[1]}&group=${e[2]}`)
          .then(response => response.json())
          .then(data => data);

        document.querySelector(".word-list")?.append(this.createWordItem(word[e[3]].word, word[e[3]].wordTranslate));
      });
      document.querySelector(".word-pagination")?.setAttribute("style", "display: none;");
      document.querySelector(".box-about-project-inner")?.setAttribute("style", "display: none;");
    }

    document.querySelectorAll(".book-level")[Number(localStorage.getItem("group"))].classList.remove("active");
    document.querySelectorAll(".book-level")[i].classList.add("active");
    localStorage.setItem("group", `${i}`);

    document.querySelector(".word-info-avatar")?.setAttribute("src", `${URL}${this.db[this.word].image}`);
  }

  activeWord(i: number) {
    document.querySelectorAll(".word-item")[Number(localStorage.getItem("word"))].classList.remove("active");
    document.querySelectorAll(".word-item")[i].classList.add("active");
    localStorage.setItem("word", `${i}`);
    this.word = i;

    document.querySelector(".word-info-avatar")?.setAttribute("src", `${URL}${this.db[i].image}`);
  }

  pagin(bool: boolean) {
    const arr = document.querySelectorAll(".word-pagination-number");

    if (bool === true) {
      if (this.page === LAST_PAGE_ON_PAGINATION) {
        this.page = SECOND_PAGE;
        arr[0].textContent = String(LAST_PAGE_ON_PAGINATION);
        arr[2].textContent = String(2);
      } else if (this.page === LAST_PAGE) {
        this.page = LAST_PAGE_ON_PAGINATION;
        arr[0].textContent = String(LAST_PAGE);
        arr[2].textContent = String(1);
      } else {
        this.page += 1;
        if (this.page === SECOND_PAGE) {
          arr[0].textContent = String(LAST_PAGE_ON_PAGINATION);
        } else {
          arr[0].textContent = String(this.page - 1);
        }
        arr[2].textContent = String(this.page + 1);
      }
    } else if (bool === false) {
      if (this.page === SECOND_PAGE) {
        this.page = LAST_PAGE_ON_PAGINATION;
        arr[0].textContent = String(LAST_PAGE);
        arr[2].textContent = String(1);
      } else if (this.page === 2) {
        this.page = SECOND_PAGE;
        arr[0].textContent = String(LAST_PAGE_ON_PAGINATION);
        arr[2].textContent = String(2);
      } else {
        this.page -= 1;
        arr[0].textContent = String(this.page - 1);
        arr[2].textContent = String(this.page + 1);
      }
    }

    arr[1].textContent = String(this.page);

    localStorage.setItem("page", `${this.page - 1}`);
    localStorage.setItem("pages", JSON.stringify([Number(arr[0].textContent), this.page, Number(arr[2].textContent)]));

    this.importWord(Number(localStorage.getItem("group")));

    this.gg();
    location.reload();
  }

  inToHard() {
    if (this.hard.map(e => e[0]).indexOf(this.db[this.word].word) < 0) {
      this.hard.push([this.db[this.word].word,  this.page, Number(localStorage.getItem("group")), this.word]);
    }
    localStorage.setItem("hard", `${JSON.stringify(this.hard)}`);
    location.reload();
  }

  inToGreen() {
    if (this.green.indexOf(this.db[this.word].word) < 0) {
      this.green.push(this.db[this.word].word);
    }
    localStorage.setItem("green", `${JSON.stringify(this.green)}`);
    location.reload();
  }

  soundOfWord() {
    const audio = new Audio();
    const audio2 = new Audio();
    audio.src = `${URL}${this.db[this.word].audio}`;
    audio2.src = `${URL}${this.db[this.word].audioExample}`;
    audio.play();
    if (audio.ended) {
      audio2.play();
    }
  }

  saveDb(): void {
    localStorage.setItem("db", JSON.stringify(this.db));
  }

  createWordItem(text1: string, text2: string) {
    const wI = document.createElement("div");
    const wIw = document.createElement("div");
    const wIt = document.createElement("div");
    wI.append(wIw, wIt);
    wIw.textContent = text1;
    wIt.textContent = text2;
    wI.setAttribute("style", `
      width: 20%;
      margin: 20px;
      padding: 10px 20px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      cursor: pointer;

      transition: all .3s;
      display: flex;
      justify-content: center;
      flex-direction: column;
    `);
    wIw.setAttribute("style", `
      font-size: 20px;
      font-weight: bold;
    `);
    wIt.setAttribute("style", `
      font-size: 14px;
    `);
    return wI;
  }
}
