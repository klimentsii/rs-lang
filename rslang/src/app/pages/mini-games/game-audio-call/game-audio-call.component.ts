import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-game-audio-call",
  templateUrl: "./game-audio-call.component.html",
  styleUrls: ["./game-audio-call.component.css"]
})
export class GameAudioCallComponent implements OnInit {

  wordAnswers: string[] = ["hello", "bye", "incupsulation", "world", "nothing"];
  
  constructor() { }

  ngOnInit(): void {
  }

}
