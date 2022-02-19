import { Component, OnInit } from "@angular/core";
import { dataBase } from "../../interfaces/interfaces";
import { URL } from "src/app/constants/constants";

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

  db: dataBase = [];
  token: string;

  page: number;
  word: number;

  levels: Array<string> = ["A1", "A2", "B1", "B2", "C1", "B2"];
  counts: Array<string> = ["1-600", "601-1200", "1201-1800", "1801-2400", "2401-3000", "3001-3600"];

  constructor() {

    if (!localStorage.getItem("page")) localStorage.setItem("page", "0");
    this.page = Number(localStorage.getItem("page")) + 1;

    if (!localStorage.getItem("group")) localStorage.setItem("group", "0");

    this.token = "";
    if (localStorage.getItem("token")) this.token = String(localStorage.getItem("token"));

    if (!localStorage.getItem("word")) localStorage.setItem("word", "0");
    this.word = Number(localStorage.getItem("word"));

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

    // this.activeWord(0);
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
    this.db = await fetch(`${URL}words?page=${this.page - 1}&group=${i}`)
    .then(response => response.json())
    .then(data => data);

    document.querySelectorAll(".book-level")[Number(localStorage.getItem("group"))].classList.remove("active");
    document.querySelectorAll(".book-level")[i].classList.add("active");
    localStorage.setItem("group", `${i}`);
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
      if (this.page === 30) {
        this.page = 1;
        arr[0].textContent = String(30);
        arr[2].textContent = String(2);
      } else if (this.page === 29) {
        this.page = 30;
        arr[0].textContent = String(29);
        arr[2].textContent = String(1);
      } else {
        this.page += 1;
        if (this.page === 1) {
          arr[0].textContent = String(30);
        } else {
          arr[0].textContent = String(this.page - 1);
        }
        arr[2].textContent = String(this.page + 1);
      }
    } else if (bool === false) {
      if (this.page === 1) {
        this.page = 30;
        arr[0].textContent = String(29);
        arr[2].textContent = String(1);
      } else if (this.page === 2) {
        this.page = 1;
        arr[0].textContent = String(30);
        arr[2].textContent = String(2);
      } else {
        this.page -= 1;
        arr[0].textContent = String(this.page - 1);
        arr[2].textContent = String(this.page + 1);
      }
    }

    arr[1].textContent = String(this.page);

    this.importWord(this.word);
  }
}
