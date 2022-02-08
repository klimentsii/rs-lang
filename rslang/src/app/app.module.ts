import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { BookPageComponent } from "./pages/book-page/book-page.component";
import { StatisticsPageComponent } from "./pages/statistics-page/statistics-page.component";
import { GameOasisComponent } from "./pages/mini-games/game-oasis/game-oasis.component";
import { GameSavannahComponent } from "./pages/mini-games/game-savannah/game-savannah.component";
import { GameSprintComponent } from "./pages/mini-games/game-sprint/game-sprint.component";
import { HeaderComponent } from "./pages/header-component/header.component";
import { PageGamesComponent } from "./pages/page-games/page-games.component";

const appRoutes: Routes = [
  { path: "", component: MainPageComponent },
  { path: "statistics", component: StatisticsPageComponent },
  { path: "games", component: PageGamesComponent },
  { path: "book", component: BookPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BookPageComponent,
    StatisticsPageComponent,
    GameOasisComponent,
    GameSavannahComponent,
    GameSprintComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
