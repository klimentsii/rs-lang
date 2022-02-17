import { Component, OnInit } from "@angular/core";

interface Word {
  userId: string,
  wordId: string,
  word: object
}

@Component({
  selector: "app-book-page",
  templateUrl: "./book-page.component.html",
  styleUrls: ["./book-page.component.css"]
})

export class BookPageComponent implements OnInit {

  // db: dataBase = [];

  token: string;

  constructor() {

    // this.db = await fetch(${URL}words?page=${this.page}&group=${this.group})
    // .then(response => response.json())
    // .then(data => data);

    this.token = "";
    if (localStorage.getItem("token")) {
      this.token = String(localStorage.getItem("token"));
    }

    // this.createUserWord({
    //   userId: "5ec993df4ca9d600178740ae",
    //   wordId: "5e9f5ee35eb9e72bc21af716",
    //   word: { "difficulty": "weak", "optional": {testFieldString: "test", testFieldBoolean: true} }
    // });
  }

  ngOnInit(): void {
    // e
  }

  async createUserWord({ userId, wordId, word }: Word) {
    const rawResponse = await fetch(`https://app-name-rslang.com/users/${userId}/words/${wordId}`, {
      method: "POST",
      // withCredentials: true,
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(word)
    });
    const content = await rawResponse.json();

    console.log(content);
  }
}
