import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";

const off = "off";

const on = "on";

@Component({
  selector: "app-mini-icons",
  templateUrl: "./mini-icons.component.html",
  styleUrls: ["./mini-icons.component.css"]
})
export class MiniIconsComponent implements OnInit {
  visileAlarm = false;
  sub: Subscription;

  constructor(private router: Router) {
    this.sub = router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        switch (event.url) {
          case ("/games/sprint"):
            this.visileAlarm = true;
            break;
          case ("/games/audio-call"):
            this.visileAlarm = false;
            break;
        }
    });
  }

  ngOnInit(): void {
    localStorage.setItem("volume", on);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    localStorage.removeItem("volume");
  }

  openFullscreen(e: Event): void {
    const img = e.target as HTMLImageElement;
    if (document.fullscreenElement) {
      img.src = "../../../../assets/svg/fullscreen.png";
      document.exitFullscreen();
    } else {
      img.src = "../../../../assets/svg/exit-fullscreen.png";
      document.documentElement.requestFullscreen();
    }
  }

  muteVolume(e: Event): void {
    const img = e.target as HTMLImageElement;
    if (!localStorage.getItem("volume")) {
      localStorage.setItem("volume", on);
    }

    if (localStorage.getItem("volume") === off) {
      img.src = "../../../../assets/svg/alarm.png";
      localStorage.setItem("volume", on);
    } else {
      img.src = "../../../../assets/svg/muted-alarm.png";
      localStorage.setItem("volume", off);
    }
  }

}
