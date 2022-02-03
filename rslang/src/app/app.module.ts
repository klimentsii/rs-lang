import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { MainPageComponent } from './main-page/main-page.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { GameOasisComponent } from './pages/mini-games/game-oasis/game-oasis.component';
import { GameSavannahComponent } from './pages/mini-games/game-savannah/game-savannah.component';
import { GameSprintComponent } from './pages/mini-games/game-sprint/game-sprint.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BookPageComponent,
    StatisticsPageComponent,
    GameOasisComponent,
    GameSavannahComponent,
    GameSprintComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
