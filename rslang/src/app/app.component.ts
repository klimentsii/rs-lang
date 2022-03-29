import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  styles: [":host { width: 100%; min-height: 100%; }"]
})
export class AppComponent {
  title = "RS-lang";
  visibleFooter = true;
  sub: Subscription;

  constructor(private router: Router) {
    this.sub = router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        switch (event.url) {
          case ("/games/sprint"):
            this.visibleFooter = false;
            break;
          case ("/games/audio-call"):
            this.visibleFooter = false;
            break;
          default: this.visibleFooter = true;
        }
    });
  }
}
