import { Component, OnInit } from "@angular/core";



@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"],
  styles: [":host { width: 100% }"]
})
export class MainPageComponent implements OnInit {

  titleCard: string[] = ["Учебник", "Словарь", "Игры", "Статистика"];

  pathPictures: string[] = ["open-book", "book", "console", "statistics"];

  infoAboutCard: string[] = [
    "Более 3500 тысяч слов для изучения, разбитых на разделы по уровню твоей подготовки с удобной навигацией.",
    "Создай свой персональный словарь для изучения слов - добавляй слова, которым хочешь уделить особое внимание и удаляй, если слово тебе уже известно.",
    "2 увлекательных игры на развитие запоминания слов, восприятия на слух и письма.",
    "Отслеживай свой прогресс в индивидуальной статистике, ставь цели и вдохновляйся на и достижение новых результатов каждый день!"
  ];

  constructor() {
    // empty
  }

  ngOnInit(): void {

    // empty
  }

}
