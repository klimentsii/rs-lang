import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameSprintComponent } from "./game-sprint.component";

describe("GameSprintComponent", () => {
  let component: GameSprintComponent;
  let fixture: ComponentFixture<GameSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSprintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
