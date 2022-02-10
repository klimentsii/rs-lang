import { Component, ElementRef, ViewChild } from "@angular/core";

const MAX_COUNT_LEVELS = 1;

const URL = "https://react-learnwords-example.herokuapp.com";

const MAX_PAGE = 29;

const MIN_PAGE = 0;
@Component({
  selector: "app-page-games",
  templateUrl: "./page-games.component.html",
  styleUrls: ["./page-games.component.css"]
})
export class PageGamesComponent {

  items: string[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

  activeLvl: HTMLElement[] = [];

  db: unknown;

  async selectLevel(el: Event, i: number, start: HTMLElement): Promise<void> {

    this.activeLvl.push(el.target as HTMLElement);
    start.classList.add("active");

    if (this.activeLvl.length > MAX_COUNT_LEVELS) {
      this.activeLvl[0].classList.remove("active");
      this.activeLvl.shift();
    }

    this.activeLvl[0].classList.add("active");
    start.removeAttribute("disabled");

    const page = this.getRandomPage();

    this.db = await fetch(`${URL}/words?page=${page}&group=${i}`)
      .then(response => response.json())
      .then(data => data);
  }

  getRandomPage(): number {
    return Math.round(Math.random() * MAX_PAGE);
  }

  async saveDb(): Promise<void> {
    localStorage.setItem("db", JSON.stringify(this.db));
  }

}
