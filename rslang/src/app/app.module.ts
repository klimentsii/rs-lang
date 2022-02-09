import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { BookPageComponent } from "./pages/book-page/book-page.component";
import { StatisticsPageComponent } from "./pages/statistics-page/statistics-page.component";
import { GameSprintComponent } from "./pages/mini-games/game-sprint/game-sprint.component";
import { HeaderComponent } from "./pages/header-component/header.component";
import { PageGamesComponent } from "./pages/page-games/page-games.component";
import { GameAudioCallComponent } from "./pages/mini-games/game-audio-call/game-audio-call.component";

const appRoutes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "statistics", component: StatisticsPageComponent },
  { path: "games", component: PageGamesComponent },
  { path: "book", component: BookPageComponent },
  { path: "games/sprint", component: GameSprintComponent },
  { path: "games/audio-call", component: GameAudioCallComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BookPageComponent,
    StatisticsPageComponent,
    GameSprintComponent,
    HeaderComponent,
    PageGamesComponent,
    GameAudioCallComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
